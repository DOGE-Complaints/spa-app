import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

/** NF-23: classic `#/board` replace-redirects to next feed — smoke the live host. */
const BASE_URL = 'http://127.0.0.1:4173/#/board'
const FEED_HASH_PREFIX = '#/next/feed'

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: process.cwd(),
      stdio: 'pipe',
    },
  )
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) {
        return
      }
    } catch {
      // Ignore connection errors while Vite starts.
    }
    await sleep(500)
  }

  throw new Error('Vite dev server did not become ready in time')
}

async function run() {
  const devServer = startViteDevServer()

  try {
    await waitForServer('http://127.0.0.1:4173')

    const launchOpts = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
    }
    const browser = await puppeteer.launch(launchOpts)
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    // Vite HMR websockets keep networkidle0 from settling; DOM ready is enough for shell smoke.
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForFunction(
      (prefix) => (location.hash || '').startsWith(prefix),
      { timeout: 20000 },
      FEED_HASH_PREFIX,
    )
    await page.waitForSelector('[data-testid="next-feed-host"]', { timeout: 20000 })

    const pageUrl = page.url()
    if (pageUrl.includes('/login')) {
      throw new Error(`Board shell redirected to login; url=${pageUrl}`)
    }
    if (!pageUrl.includes('/next/feed')) {
      throw new Error(`NF-23 expected #/board → #/next/feed; url=${pageUrl}`)
    }

    // Next-feed host under next-shell chrome (ProfileRail + empty right). Classic shelter class retired with /board mount.
    const requiredSelectors = [
      '.board-shell',
      '.header-strip',
      '.board-main',
      '.next-shell-route',
      '[data-testid="next-feed-host"]',
      '[data-testid="feed-host"]',
      '[data-show-sidebar="yes"]',
      '.board-main--with-right',
      '[data-testid="profile-rail"]',
      '[data-testid="next-shell-right-slot"]',
      '[data-testid="feed-toolbar"]',
      '[data-testid="feed-list"], [data-testid="board-feed-state"], [data-testid="feed-civic-post"]',
      '.board-footer',
    ]

    for (const selector of requiredSelectors) {
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`Missing required selector on board shell: ${selector}`)
      }
    }

    const workspaceLabel = await page.$('.board-sidebar-workspace')
    if (workspaceLabel) {
      throw new Error('Expected no WORKSPACE sidebar label on public board (PH-09 / NS-05 ProfileRail)')
    }

    // PH-04: single feed — no status/kanban columns
    const columnsCount = await page.$$eval('.board-column', (nodes) => nodes.length)
    if (columnsCount !== 0) {
      throw new Error(`Expected 0 board columns after PH-04, received ${columnsCount}`)
    }

    const classicShelter = await page.$('.next-shell-classic-shelter')
    if (classicShelter) {
      throw new Error('NF-23: classic shelter class must not remain after #/board → #/next/feed')
    }

    await browser.close()
  } finally {
    if (!devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exitCode = 1
})
