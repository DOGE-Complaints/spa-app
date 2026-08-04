/**
 * PH-04 Board feed full-cycle → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → /board feed (no columns).
 * Mock M132 states via request interception (empty / results / filtered / error).
 * Exit 0 only if live happy PNG captured.
 *
 * Usage: cd spa-app && npm run test:ui:board-feed-ph04-full
 */
import { mkdir, readFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const STORY_ROOT = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-04-board-feed-home',
)
const SCREENSHOTS_ROOT = path.join(STORY_ROOT, 'screenshots')
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ARCHIVE_DIR = path.join(SCREENSHOTS_ROOT, 'archive')
const UI_BASELINE = path.join(
  STORY_ROOT,
  'task-spa-ph-04-t01-remove-columns-single-feed/ui-baseline',
)
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.PUBLIC_BOARD_URL ?? process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL || process.env.PUBLIC_HEADER_URL)
const VIEWPORT = { width: 1536, height: 1024 }

const MOCK_ISSUES = [
  {
    id: 'ISSUE-PH04-1',
    status: 'NEW',
    type: 'complaint',
    title: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    summary: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    labels: ['roads'],
    created_at: '2026-08-01T10:00:00Z',
  },
]

async function loadDotEnv(filePath) {
  const text = await readFile(filePath, 'utf8')
  const out = {}
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
    if (process.env[key] === undefined) process.env[key] = value
  }
  return out
}

function startViteDevServer(extraEnv = {}) {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, ...extraEnv },
    },
  )
}

async function waitForServer(url, attempts = 60) {
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

async function stopServer(devServer) {
  if (!devServer) return
  devServer.kill('SIGTERM')
  await sleep(500)
}

async function shot(page, fileName) {
  const filePath = path.join(OUT_DIR, fileName)
  await page.screenshot({ path: filePath })
  return filePath
}

async function clearAuth(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    try {
      localStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('doge.mock-profile')
      sessionStorage.removeItem('doge.mock-me-error')
      for (const store of [localStorage, sessionStorage]) {
        const keys = []
        for (let i = 0; i < store.length; i += 1) {
          const key = store.key(i)
          if (key && (key.includes('auth') || key.includes('supabase'))) keys.push(key)
        }
        for (const key of keys) store.removeItem(key)
      }
    } catch {
      // ignore
    }
  })
}

async function installIssuesRoute(page, route) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    if (req.method() === 'GET' && /\/tallinn\/issues(\?|$)/.test(url) && !/\/tallinn\/issues\/[^/?\s]+/.test(url)) {
      const mode = typeof route === 'string' ? route : route.mode
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
        const issues = mode === 'empty' ? [] : MOCK_ISSUES
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { issues } }),
        })
        return
      } catch {
        return
      }
    }
    await req.continue().catch(() => {})
  })
}

async function assertNoColumns(page) {
  const columnsCount = await page.$$eval('.board-column', (nodes) => nodes.length)
  if (columnsCount !== 0) {
    throw new Error(`expected 0 .board-column, got ${columnsCount}`)
  }
}

async function run() {
  const env = await loadDotEnv(ENV_PATH)
  const email = env.USER_EMAIL || process.env.USER_EMAIL
  const password = env.USER_PASSWORD || process.env.USER_PASSWORD
  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set in spa-app/.env')
  }

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(ARCHIVE_DIR, { recursive: true })
  const written = []
  let liveOk = false
  const gatewayFromEnv = (env.VITE_GATEWAY_BASE_URL || process.env.VITE_GATEWAY_BASE_URL || '').trim()
  let devServer = USE_EXISTING
    ? null
    : startViteDevServer({
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_LIFE_REALITY_MODE: 'GFL-DRIVEN',
        // Prefer real gateway for live happy; mock states override via interception
        VITE_GATEWAY_BASE_URL: gatewayFromEnv || 'http://127.0.0.1:8765',
      })

  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    await clearAuth(page)
    await page.goto(`${BASE}/#/login?redirect=/board`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    await page.waitForSelector('[data-auth-state="login"]', { timeout: 60000 })
    await page.click('[data-testid="auth-email"]', { clickCount: 3 })
    await page.type('[data-testid="auth-email"]', email, { delay: 10 })
    await page.click('[data-testid="auth-password"]', { clickCount: 3 })
    await page.type('[data-testid="auth-password"]', password, { delay: 10 })
    await page.click('[data-testid="auth-submit"]')

    try {
      await page.waitForSelector('[data-auth-state="auth-success"]', { timeout: 45000 })
      const continueBtn = await page.$(
        '[data-auth-state="auth-success"] [data-testid="auth-submit"]',
      )
      if (continueBtn) await continueBtn.click()
      await page.waitForSelector('.board-shell', { timeout: 60000 })
      await page.waitForSelector(
        '.board-feed, [data-testid="board-empty"], [data-testid="board-load-error"], [data-testid="board-filtered-empty"]',
        { timeout: 30000 },
      )
      await assertNoColumns(page)
      liveOk = true
      written.push(await shot(page, '01-happy-live-board-feed-1536x1024.png'))
    } catch (error) {
      console.error('live auth/board feed path failed', error)
      written.push(await shot(page, '00-login-or-board-error-1536x1024.png'))
    }

    await clearAuth(page)

    const route = { mode: 'results' }
    await installIssuesRoute(page, route)
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('.issue-card', { timeout: 20000 })
    await assertNoColumns(page)
    written.push(await shot(page, '02-happy-mock-results-feed-1536x1024.png'))

    route.mode = 'empty'
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="board-empty"]', { timeout: 20000 })
    written.push(await shot(page, '03-edge-mock-empty-board-1536x1024.png'))

    route.mode = 'results'
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.goto(`${BASE}/#/board?search=zzznomatchph04`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="board-filtered-empty"]', { timeout: 20000 })
    written.push(await shot(page, '04-edge-mock-filtered-empty-1536x1024.png'))

    route.mode = 'error'
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="board-load-error"]', { timeout: 20000 })
    written.push(await shot(page, '05-edge-mock-load-error-1536x1024.png'))

    await browser.close()

    // Archive UI-0/UI-3 baselines into story screenshots/archive/
    for (const phase of ['pre-implement', 'post-implement']) {
      const srcDir = path.join(UI_BASELINE, phase)
      try {
        const { readdir } = await import('node:fs/promises')
        const files = await readdir(srcDir)
        for (const file of files) {
          if (!file.endsWith('.png')) continue
          const dest = path.join(ARCHIVE_DIR, `${phase}-${file}`)
          await copyFile(path.join(srcDir, file), dest)
        }
      } catch {
        // phase dir may be incomplete
      }
    }

    console.log(JSON.stringify({ liveOk, written }, null, 2))
  } finally {
    await stopServer(devServer)
  }

  if (!liveOk) {
    throw new Error('PH-04 full-cycle requires live happy board-feed PNG')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
