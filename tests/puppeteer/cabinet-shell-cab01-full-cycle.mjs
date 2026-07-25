/**
 * CAB-01 full happy + edge Puppeteer cycle → story-root screenshots/full-cycle/
 *
 * Live path: USER_EMAIL / USER_PASSWORD → 02 auth-success, 03 live profile, 04–10, 05 logged_out.
 * Mock path (Vite restart VITE_IDENTITY_MOCK_MODE=true): 06 skeleton, 11–14 overlays via doge.mock-me-error.
 * Exit 0 only if live 02+03 captured; else exit 1.
 *
 * Usage: cd spa-app && npm run test:ui:cabinet-shell-cab01-full
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-01-profile-cabinet-shell-assembly/screenshots',
)
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.CABINET_SHELL_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_SHELL_URL)
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

async function ensureOrigin(page) {
  const url = page.url()
  if (!url.startsWith(BASE)) {
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  }
}

async function clearAuth(page) {
  await ensureOrigin(page)
  await page.evaluate(() => {
    localStorage.removeItem('dogestonia-auth')
    sessionStorage.removeItem('dogestonia-auth')
    sessionStorage.removeItem('doge.force-cabinet-loading')
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
  })
  await page.goto(`${BASE}/#/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function seedMockAuthSession(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-cab01', exp: expiresAt, role: 'authenticated' }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh-token',
        expires_at: expiresAt,
        expires_in: 3600,
        token_type: 'bearer',
        user: {
          id: 'mock-user-cab01',
          email: 'mock@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        },
      }),
    )
    sessionStorage.removeItem('dogestonia-auth')
    sessionStorage.removeItem('doge.mock-me-error')
    sessionStorage.removeItem('doge.force-cabinet-loading')
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'Demo User',
        role: 'citizen',
        email: 'zara@example.com',
        created_at: '2026-06-14T10:22:00Z',
        status: 'active',
      }),
    )
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function openProfileAuthed(page) {
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 90000 })
  await page.waitForSelector('[data-testid="cabinet-grid"]', { timeout: 60000 })
  await page.waitForSelector('[data-testid="account-summary"]', { timeout: 90000 })
}

async function assertSlots(page) {
  for (const id of [
    'cabinet-slot-civic',
    'cabinet-slot-story',
    'cabinet-slot-contribution',
    'cabinet-slot-account',
    'cabinet-slot-wallet',
  ]) {
    const el = await page.$(`[data-testid="${id}"]`)
    if (!el) throw new Error(`Missing slot ${id}`)
  }
}

async function setLocale(page, locale) {
  await page.evaluate((next) => {
    localStorage.setItem('doge.locale', next)
  }, locale)
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

/**
 * Trigger mock /me error overlay on /profile (requires VITE_IDENTITY_MOCK_MODE=true).
 * @param {import('puppeteer').Page} page
 * @param {string} flag
 * @param {string} stateAttr data-session-shell-state value
 */
async function captureMockMeErrorOverlay(page, flag, stateAttr) {
  await seedMockAuthSession(page)
  await page.evaluate((errorFlag) => {
    sessionStorage.setItem('doge.mock-me-error', errorFlag)
  }, flag)
  // session unchanged → must reload to re-run fetchMe with the error flag
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector(
    `[data-testid="session-shell-overlay"] [data-session-shell-state="${stateAttr}"]`,
    { timeout: 60000 },
  )
}

/**
 * Live happy-path after auth-success Continue: 03–10, 09, 05.
 * @returns {Promise<void>}
 */
async function captureLiveShellSuite(page, written) {
  await openProfileAuthed(page)
  await assertSlots(page)
  written.push(await shot(page, '03-profile-default-live-1536x1024.png'))

  const nav = await page.$('[data-testid="app-shell-nav-profile"]')
  if (!nav) throw new Error('Missing app-shell-nav-profile')
  const navClass = await page.$eval('[data-testid="app-shell-nav-profile"]', (el) => el.className)
  if (!navClass.includes('board-nav-item-active')) {
    throw new Error(`Profile nav not active: ${navClass}`)
  }
  const navOut = path.join(OUT_DIR, '04-profile-nav-active-1536x1024.png')
  await nav.screenshot({ path: navOut })
  written.push(navOut)

  await setLocale(page, 'en')
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 60000 })
  const enTitle = await page.$eval('[data-testid="user-cabinet-page"] h1', (el) => el.textContent)
  if (enTitle !== 'Profile') throw new Error(`Expected en title Profile, got ${enTitle}`)
  written.push(await shot(page, '10-locale-en-profile-1536x1024.png'))

  await setLocale(page, 'et')
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 60000 })
  const etTitle = await page.$eval('[data-testid="user-cabinet-page"] h1', (el) => el.textContent)
  if (etTitle !== 'Profiil') throw new Error(`Expected et title Profiil, got ${etTitle}`)
  written.push(await shot(page, '07-locale-et-profile-1536x1024.png'))

  await setLocale(page, 'ru')
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 60000 })
  const ruTitle = await page.$eval('[data-testid="user-cabinet-page"] h1', (el) => el.textContent)
  if (ruTitle !== 'Профиль') throw new Error(`Expected ru title Профиль, got ${ruTitle}`)
  written.push(await shot(page, '08-locale-ru-profile-1536x1024.png'))

  await setLocale(page, 'en')
  await page.goto(`${BASE}/#/dashboard`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="dashboard-page"]', { timeout: 60000 })
  if (await page.$('[data-testid="user-cabinet-page"]')) {
    throw new Error('user-cabinet-page unexpectedly on /dashboard')
  }
  written.push(await shot(page, '09-dashboard-unchanged-1536x1024.png'))

  await clearAuth(page)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="session-shell-overlay"]', { timeout: 60000 })
  written.push(await shot(page, '05-logged-out-overlay-1536x1024.png'))
}

/**
 * Mock-mode Tier-1 skeleton + Tier-2 overlays (11–14).
 */
async function captureMockOverlaySuite(page, written) {
  await seedMockAuthSession(page)
  await openProfileAuthed(page)
  await page.evaluate(() => {
    sessionStorage.setItem('doge.force-cabinet-loading', '1')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="cabinet-shell-skeleton"]', { timeout: 60000 })
  written.push(await shot(page, '06-shell-loading-skeleton-1536x1024.png'))
  await page.evaluate(() => {
    sessionStorage.removeItem('doge.force-cabinet-loading')
  })

  // S12 — restoring: delay in fetchMe keeps RESTORING; overlay + page skeleton together
  await seedMockAuthSession(page)
  await page.evaluate(() => {
    sessionStorage.setItem('doge.mock-me-error', 'restoring')
  })
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="session-shell-restoring"]', { timeout: 15000 })
  await page.waitForSelector('[data-testid="cabinet-shell-skeleton"]', { timeout: 15000 })
  written.push(await shot(page, '11-restoring-overlay-1536x1024.png'))
  await page.evaluate(() => {
    sessionStorage.removeItem('doge.mock-me-error')
  })
  // wait out remaining delay so next seed is clean
  await sleep(2800)

  await captureMockMeErrorOverlay(page, 'session_expired', 'session_expired')
  written.push(await shot(page, '12-session-expired-overlay-1536x1024.png'))

  await captureMockMeErrorOverlay(page, 'backend_unavailable', 'backend_unavailable')
  written.push(await shot(page, '13a-backend-unavailable-overlay-1536x1024.png'))

  // View Status: prefer both branches when /ready is reachable (plan G-SS-5)
  async function clickViewStatus() {
    const handle = await page.evaluateHandle(() => {
      const buttons = [...document.querySelectorAll('.session-shell-button')]
      return buttons.find((b) => /status|olek|статус/i.test(b.textContent || '')) || null
    })
    const el = handle.asElement()
    if (!el) throw new Error('View Status button not found on backend_unavailable overlay')
    await el.click()
  }

  await clickViewStatus()
  await page.waitForSelector('[data-testid="session-shell-status-message"]', { timeout: 15000 })
  let statusText = await page.$eval(
    '[data-testid="session-shell-status-message"]',
    (el) => el.textContent || '',
  )
  const readyLike =
    /ready|готов|valmis/i.test(statusText) && !/unavailable|недоступ|pole/i.test(statusText)
  if (readyLike) {
    written.push(await shot(page, '13b-backend-status-ready-1536x1024.png'))

    await page.setRequestInterception(true)
    const abortReady = (request) => {
      if (request.url().includes('/ready')) {
        void request.abort('failed')
        return
      }
      void request.continue()
    }
    page.on('request', abortReady)
    await clickViewStatus()
    await page.waitForFunction(
      () => {
        const el = document.querySelector('[data-testid="session-shell-status-message"]')
        const text = el?.textContent || ''
        return /unavailable|недоступ|pole/i.test(text)
      },
      { timeout: 15000 },
    )
    written.push(await shot(page, '13c-backend-status-unavailable-1536x1024.png'))
    page.off('request', abortReady)
    await page.setRequestInterception(false)
  } else {
    written.push(await shot(page, '13c-backend-status-unavailable-1536x1024.png'))
  }

  await captureMockMeErrorOverlay(page, 'network_error', 'network_error')
  written.push(await shot(page, '14-network-error-overlay-1536x1024.png'))
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
  let liveProfileOk = false
  let devServer = USE_EXISTING ? null : startViteDevServer()

  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    await clearAuth(page)
    await page.goto(`${BASE}/#/login?redirect=/profile`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    await page.waitForSelector('[data-auth-state="login"]', { timeout: 60000 })
    written.push(await shot(page, '01-login-form-1536x1024.png'))

    await page.click('[data-testid="auth-email"]', { clickCount: 3 })
    await page.type('[data-testid="auth-email"]', email, { delay: 10 })
    await page.click('[data-testid="auth-password"]', { clickCount: 3 })
    await page.type('[data-testid="auth-password"]', password, { delay: 10 })
    await page.click('[data-testid="auth-submit"]')

    try {
      await page.waitForSelector('[data-auth-state="auth-success"]', { timeout: 45000 })
      liveLoginOk = true
      written.push(await shot(page, '02-auth-success-1536x1024.png'))
      const continueBtn = await page.$('[data-auth-state="auth-success"] [data-testid="auth-submit"]')
      if (continueBtn) await continueBtn.click()
      await captureLiveShellSuite(page, written)
      liveProfileOk = true
      await browser.close()
    } catch (err) {
      written.push(await shot(page, '00-login-error-1536x1024.png'))
      console.error(
        'LIVE_LOGIN=FAIL (invalid_credentials or timeout). Hard-stop: live 02/03 required for PASS.',
      )
      console.error(String(err?.message || err))
      await browser.close()
      await stopServer(devServer)
      for (const file of written) console.log(file)
      process.exitCode = 1
      return
    }

    if (USE_EXISTING) {
      throw new Error('CABINET_SHELL_URL set — cannot restart Vite with mock mode for overlays')
    }

    await stopServer(devServer)
    devServer = startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })
    await waitForServer(BASE)

    const browser2 = await puppeteer.launch({ headless: true })
    const page2 = await browser2.newPage()
    await page2.setViewport(VIEWPORT)
    await captureMockOverlaySuite(page2, written)
    await browser2.close()

    console.log(
      liveLoginOk && liveProfileOk
        ? 'cabinet-shell-cab01-full-cycle: PASS (live 02/03 + mock overlays)'
        : 'cabinet-shell-cab01-full-cycle: FAIL',
    )
    for (const file of written) {
      console.log(file)
    }

    if (!liveLoginOk || !liveProfileOk) {
      process.exitCode = 1
    }
  } finally {
    await stopServer(devServer)
  }
}

run().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
