/**
 * PH-01 public header full-cycle → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → auth-success + board header (account slot host).
 * Mock (Vite VITE_IDENTITY_MOCK_MODE=true): desktop board, how-it-works active, mobile menu.
 * Exit 0 only if live happy PNGs captured.
 *
 * Usage: cd spa-app && npm run test:ui:public-header-ph01-full
 */
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const SCREENSHOTS_ROOT = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/screenshots',
)
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HEADER_URL)
const VIEWPORT = { width: 1536, height: 1024 }

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
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
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
  if (!devServer || devServer.killed) return
  devServer.kill('SIGTERM')
  await sleep(800)
}

async function shot(page, filename) {
  const outPath = path.join(OUT_DIR, filename)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  return outPath
}

async function clearAuth(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    try {
      localStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('dogestonia-auth')
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
  await page.goto(`${BASE}/#/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function captureMockSuite(page, written) {
  await page.setViewport(VIEWPORT)
  await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"]', { timeout: 15000 })
  written.push(await shot(page, '03-happy-mock-board-header-desktop-1536x1024.png'))

  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-nav-how-it-works"].header-nav-item-active', {
    timeout: 10000,
  })
  written.push(await shot(page, '04-happy-mock-how-it-works-active-1536x1024.png'))

  await page.setViewport({ width: 390, height: 844 })
  await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.click('[data-testid="public-header-menu-toggle"]')
  await page.waitForSelector('[data-testid="public-header-mobile-nav"]', { timeout: 5000 })
  written.push(await shot(page, '05-edge-mock-mobile-menu-open-390x844.png'))

  await page.setViewport(VIEWPORT)
  await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('doge.locale', 'et')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"]', { timeout: 15000 })
  written.push(await shot(page, '06-edge-mock-locale-et-board-header-1536x1024.png'))

  // E3 / M129 State C — locale selector menu open
  await page.evaluate(() => {
    localStorage.setItem('doge.locale', 'en')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"] .header-locale-trigger', {
    timeout: 15000,
  })
  await page.click('[data-testid="public-header"] .header-locale-trigger')
  await page.waitForSelector('[data-testid="public-header"] .header-locale[data-open="yes"]', {
    timeout: 5000,
  })
  await page.waitForSelector('[data-testid="public-header"] .header-locale-menu', { timeout: 5000 })
  written.push(await shot(page, '07-edge-mock-locale-menu-open-1536x1024.png'))
}

async function run() {
  const env = await loadDotEnv(ENV_PATH)
  const email = env.USER_EMAIL || process.env.USER_EMAIL
  const password = env.USER_PASSWORD || process.env.USER_PASSWORD
  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set in spa-app/.env')
  }

  await mkdir(OUT_DIR, { recursive: true })
  const written = []
  let liveLoginOk = false
  let liveBoardOk = false
  let devServer = USE_EXISTING ? null : startViteDevServer()

  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
      liveLoginOk = true
      written.push(await shot(page, '02-happy-live-auth-success-1536x1024.png'))
      const continueBtn = await page.$(
        '[data-auth-state="auth-success"] [data-testid="auth-submit"]',
      )
      if (continueBtn) await continueBtn.click()
      await page.waitForSelector('[data-testid="public-header"]', { timeout: 60000 })
      await page.waitForSelector('[data-testid="header-account-slot"]', { timeout: 15000 })
      written.push(await shot(page, '01-happy-live-board-header-authenticated-1536x1024.png'))
      liveBoardOk = true
      await browser.close()
    } catch (err) {
      written.push(await shot(page, '00-login-error-1536x1024.png'))
      console.error('LIVE_LOGIN=FAIL. Hard-stop: live happy required for PASS.')
      console.error(String(err?.message || err))
      await browser.close()
      await stopServer(devServer)
      for (const file of written) console.log(file)
      process.exitCode = 1
      return
    }

    if (USE_EXISTING) {
      throw new Error('PUBLIC_HEADER_URL set — cannot restart Vite with mock mode')
    }

    await stopServer(devServer)
    devServer = startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })
    await waitForServer(BASE)

    const browser2 = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page2 = await browser2.newPage()
    await captureMockSuite(page2, written)
    await browser2.close()

    console.log(
      liveLoginOk && liveBoardOk
        ? 'public-header-ph01-full-cycle: PASS (live + mock suite)'
        : 'public-header-ph01-full-cycle: FAIL',
    )
    for (const file of written) console.log(file)

    if (!liveLoginOk || !liveBoardOk) process.exitCode = 1
  } finally {
    await stopServer(devServer)
  }
}

run().catch((error) => {
  console.error(error.message || error)
  if (error.stack) console.error(error.stack)
  process.exit(1)
})
