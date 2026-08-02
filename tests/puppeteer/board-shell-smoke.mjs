import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE_URL = 'http://127.0.0.1:4173/#/board'

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
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' })

    const pageUrl = page.url()
    if (pageUrl.includes('/login')) {
      throw new Error(`Board shell redirected to login; url=${pageUrl}`)
    }

    const requiredSelectors = [
      '.board-shell',
      '.header-strip',
      '.board-main',
      '.board-sidebar',
      '.board-toolbar',
      '.board-columns',
      '.board-column',
      '.board-footer',
    ]

    for (const selector of requiredSelectors) {
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`Missing required selector on board shell: ${selector}`)
      }
    }

    // BoardPage.jsx scaffold: NEW / IN_REVIEW / PUBLISHED (3) — see BoardPage.shell.test.jsx
    const columnsCount = await page.$$eval('.board-column', (nodes) => nodes.length)
    if (columnsCount !== 3) {
      throw new Error(`Expected 3 board columns, received ${columnsCount}`)
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
