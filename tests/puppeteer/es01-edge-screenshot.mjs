/**
 * ES-01 T09 — recapture load-error + filtered-empty into story-root screenshots/full-cycle/.
 * Does not replace happy discovery PNGs. Does not mock filled Pulse/Emerging.
 *
 *   node tests/puppeteer/es01-edge-screenshot.mjs
 * Env: PUBLIC_BOARD_URL to reuse Vite on :4173.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const OUT_DIR = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/screenshots/full-cycle',
)

const BASE = process.env.PUBLIC_BOARD_URL ?? process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL || process.env.PUBLIC_HEADER_URL)

const MOCK_ISSUES = [
  {
    id: 'ISSUE-ES01-1',
    status: 'NEW',
    type: 'complaint',
    title: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    summary: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    labels: ['roads'],
    created_at: '2026-08-01T10:00:00Z',
  },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_LIFE_REALITY_MODE: 'GFL-DRIVEN',
        VITE_GATEWAY_BASE_URL: process.env.VITE_GATEWAY_BASE_URL || 'http://127.0.0.1:8765',
      },
    },
  )
}

async function waitForServer(url, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) return
    } catch {
      // wait
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready')
}

async function gotoBoard(page, search = '') {
  const q = search ? (search.startsWith('?') ? search : `?${search}`) : ''
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.goto(`${BASE}/#/board${q}`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
}

async function installIssuesRoute(page, route) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    if (
      req.method() === 'GET' &&
      /\/tallinn\/issues(\?|$)/.test(url) &&
      !/\/tallinn\/issues\/[^/?\s]+/.test(url)
    ) {
      const mode = route.mode
      try {
        if (mode === 'error') {
          await req.respond({
            status: 500,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'fail' }),
          })
          return
        }
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { issues: MOCK_ISSUES } }),
        })
        return
      } catch {
        return
      }
    }
    await req.continue().catch(() => {})
  })
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  let devServer = null
  let browser = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    let page = await browser.newPage()
    const route = { mode: 'results' }

    await page.setViewport({ width: 1536, height: 1024 })

    route.mode = 'error'
    await installIssuesRoute(page, route)
    await gotoBoard(page)
    await page.waitForSelector('[data-testid="board-load-error"]', { timeout: 20000 })
    await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 2000 }).then(
      () => {
        throw new Error('discovery must not render on load-error')
      },
      () => {},
    )
    await page.screenshot({ path: path.join(OUT_DIR, 'es01-board-load-error-desktop.png') })

    await page.close()
    page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    route.mode = 'results'
    await installIssuesRoute(page, route)
    await gotoBoard(page, 'search=zzznomatches01')
    await page.waitForSelector('[data-testid="board-filtered-empty"]', { timeout: 20000 })
    await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 2000 }).then(
      () => {
        throw new Error('discovery must not render on filtered-empty')
      },
      () => {},
    )
    await page.screenshot({ path: path.join(OUT_DIR, 'es01-board-filtered-empty-desktop.png') })

    console.log(`ES01 T09 edge screenshots → ${OUT_DIR}`)
  } finally {
    if (browser) {
      await browser.close().catch(() => {})
    }
    if (devServer) {
      devServer.kill('SIGTERM')
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
