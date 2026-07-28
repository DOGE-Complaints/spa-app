/**
 * CAB-06 Contribution Layer full happy + edge → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → auth-success + profile contrib stub (A1/B1/C1).
 * Mock: key M53 previews + locales + retry → comingSoon.
 * Exit 0 only if live H1+H2 captured; else exit 1.
 *
 * P6 V1 harden: free :4173 before start/restart; assert no Session Expired before mock shots;
 * re-seed JWT before each mock capture.
 *
 * Usage: cd spa-app && npm run test:ui:cabinet-contrib-cab06-full
 */
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, execSync } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const SCREENSHOTS_ROOT = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-06-contribution-layer/screenshots',
)
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.CABINET_CONTRIB_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_CONTRIB_URL)
const VIEWPORT = { width: 1536, height: 1024 }
const PORT = 4173

const SESSION_EXPIRED_RE =
  /Session Expired|Sessioon aegus|Сессия истекла|session expired/i

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

function freePort(port) {
  try {
    const pids = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim()
    if (!pids) return
    for (const pid of pids.split('\n')) {
      try {
        process.kill(Number(pid), 'SIGKILL')
      } catch {
        // already gone
      }
    }
  } catch {
    // no listeners
  }
}

function startViteDevServer(extraEnv = {}) {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, ...extraEnv },
    },
  )
}

async function waitForServer(url, attempts = 80) {
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
  await sleep(500)
  if (!devServer.killed) {
    try {
      devServer.kill('SIGKILL')
    } catch {
      // ignore
    }
  }
  await sleep(800)
  freePort(PORT)
  await sleep(400)
}

async function shot(page, filename) {
  const outPath = path.join(OUT_DIR, filename)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  return outPath
}

async function ensureOrigin(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
}

async function clearAuth(page) {
  await ensureOrigin(page)
  await page.evaluate(() => {
    try {
      localStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('doge.force-cabinet-loading')
      sessionStorage.removeItem('doge.mock-profile')
      sessionStorage.removeItem('doge.mock-me-error')
      sessionStorage.removeItem('doge.civic-preview')
      sessionStorage.removeItem('doge.story-activity-preview')
      sessionStorage.removeItem('doge.wallet-preview')
      sessionStorage.removeItem('doge.contrib-preview')
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

async function seedMockAuthSession(page, profileOverride = {}) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate((profile) => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    // Fresh TTL every seed (V1 harden — avoid stale JWT / leftover shell)
    const expiresAt = Math.floor(Date.now() / 1000) + 7200
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-cab06', exp: expiresAt, role: 'authenticated' }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh-token',
        expires_at: expiresAt,
        expires_in: 7200,
        token_type: 'bearer',
        user: {
          id: 'mock-user-cab06',
          email: 'mock@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        },
      }),
    )
    sessionStorage.removeItem('dogestonia-auth')
    sessionStorage.removeItem('doge.mock-me-error')
    sessionStorage.removeItem('doge.force-cabinet-loading')
    sessionStorage.removeItem('doge.civic-preview')
    sessionStorage.removeItem('doge.story-activity-preview')
    sessionStorage.removeItem('doge.wallet-preview')
    sessionStorage.removeItem('doge.contrib-preview')
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'Demo User',
        role: 'citizen',
        email: 'zara@example.com',
        created_at: '2026-06-14T10:22:00Z',
        status: 'active',
        phone_verified: true,
        phone_verified_at: '2026-06-01T12:00:00Z',
        phone_dial_prefix: '+372',
        ...profile,
      }),
    )
  }, profileOverride)
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function assertNoSessionExpired(page, label) {
  const bodyText = await page.evaluate(() => document.body?.innerText || '')
  if (SESSION_EXPIRED_RE.test(bodyText)) {
    throw new Error(`Session Expired overlay present before shot (${label})`)
  }
  const overlay = await page.$('[data-testid="session-shell-overlay"]')
  if (overlay) {
    const overlayText = await page.evaluate((el) => el.textContent || '', overlay)
    if (SESSION_EXPIRED_RE.test(overlayText)) {
      throw new Error(`session-shell-overlay shows Session Expired (${label})`)
    }
  }
}

async function assertMockProfileReady(page, label) {
  await page.waitForSelector('[data-testid="account-summary"]', { timeout: 60000 })
  await page.waitForFunction(() => {
    const summary = document.querySelector('[data-testid="account-summary"]')
    if (!summary) return false
    const text = summary.textContent || ''
    return !text.includes('Not Available') && !text.includes('Недоступно') && !text.includes('Pole saadaval')
  }, { timeout: 60000 })
  await assertNoSessionExpired(page, label)
}

async function openProfileWithContrib(page) {
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 90000 })
  await page.waitForSelector('[data-testid="cabinet-slot-contribution"]', { timeout: 60000 })
  await page.waitForSelector('[data-contribution-layer]', { timeout: 60000 })
  await page.waitForFunction(() => {
    const overlay = document.querySelector('[data-testid="session-shell-overlay"]')
    if (!overlay) return true
    const text = overlay.textContent || ''
    return !text.includes('NETWORK_ERROR') && !text.includes('Connection Problem')
  }, { timeout: 90000 })
  await page.waitForFunction(() => {
    const summary = document.querySelector('[data-testid="account-summary"]')
    if (!summary) return false
    return !summary.textContent.includes('Not Available')
  }, { timeout: 60000 })
  await assertNoSessionExpired(page, 'live-profile')
}

async function setLocale(page, locale) {
  const url = page.url()
  if (!url.startsWith(BASE)) {
    await ensureOrigin(page)
  }
  await page.evaluate((next) => {
    localStorage.setItem('doge.locale', next)
  }, locale)
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function captureContribPreview(page, preview, expectedReceiptsState, label) {
  await seedMockAuthSession(page)
  await page.evaluate((flag) => {
    if (flag) sessionStorage.setItem('doge.contrib-preview', flag)
    else sessionStorage.removeItem('doge.contrib-preview')
  }, preview)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-contribution-layer]', { timeout: 60000 })
  if (expectedReceiptsState) {
    await page.waitForSelector(
      `[data-contrib-receipts][data-contrib-receipts-state="${expectedReceiptsState}"]`,
      { timeout: 30000 },
    )
  }
  await assertMockProfileReady(page, label)
}

async function captureMockContribSuite(page, written) {
  await setLocale(page, 'en')

  await captureContribPreview(page, null, 'empty', '03-stub')
  written.push(await shot(page, '03-happy-mock-contrib-a1-b1-c1-stub-1536x1024.png'))

  await captureContribPreview(page, 'receipts-populated', 'populated', '04-receipts-populated')
  written.push(await shot(page, '04-happy-mock-receipts-populated-1536x1024.png'))

  await captureContribPreview(page, 'receipts-unavailable', 'unavailable', '05-receipts-unavailable')
  written.push(await shot(page, '05-edge-mock-receipts-unavailable-1536x1024.png'))

  await page.waitForSelector('[data-testid="contrib-receipts-retry"]', { timeout: 10000 })
  await page.$eval('[data-testid="contrib-receipts-retry"]', (el) => el.click())
  await page.waitForSelector('[data-testid="contribution-coming-soon"]', { timeout: 10000 })
  await assertNoSessionExpired(page, '06-retry-coming-soon')
  written.push(await shot(page, '06-edge-mock-retry-coming-soon-1536x1024.png'))

  await captureContribPreview(page, 'records-populated', 'empty', '07-records-populated')
  await page.waitForSelector(
    '[data-contrib-records][data-contrib-records-state="populated"]',
    { timeout: 30000 },
  )
  await assertNoSessionExpired(page, '07-records-populated')
  written.push(await shot(page, '07-happy-mock-records-populated-1536x1024.png'))

  await captureContribPreview(page, 'reputation-available', 'empty', '08-reputation-available')
  await page.waitForSelector(
    '[data-contrib-reputation][data-contrib-reputation-state="available"]',
    { timeout: 30000 },
  )
  await assertNoSessionExpired(page, '08-reputation-available')
  written.push(await shot(page, '08-happy-mock-reputation-available-1536x1024.png'))

  await captureContribPreview(page, null, 'empty', '09-locale-et-prep')
  await setLocale(page, 'et')
  await page.waitForSelector('[data-contribution-layer]', { timeout: 60000 })
  await assertMockProfileReady(page, '09-locale-et')
  written.push(await shot(page, '09-edge-mock-locale-et-contrib-stub-1536x1024.png'))

  await setLocale(page, 'ru')
  await page.waitForSelector('[data-contribution-layer]', { timeout: 60000 })
  await assertMockProfileReady(page, '10-locale-ru')
  written.push(await shot(page, '10-edge-mock-locale-ru-contrib-stub-1536x1024.png'))
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
  let devServer = null

  if (!USE_EXISTING) {
    freePort(PORT)
    await sleep(500)
    devServer = startViteDevServer()
  }

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
      await openProfileWithContrib(page)
      written.push(await shot(page, '01-happy-live-profile-contrib-stub-1536x1024.png'))
      liveProfileOk = true
      await browser.close()
    } catch (err) {
      written.push(await shot(page, '00-login-error-1536x1024.png'))
      console.error(
        'LIVE_LOGIN=FAIL (invalid_credentials or timeout). Hard-stop: live H1/H2 required for PASS.',
      )
      console.error(String(err?.message || err))
      await browser.close()
      await stopServer(devServer)
      for (const file of written) console.log(file)
      process.exitCode = 1
      return
    }

    if (USE_EXISTING) {
      throw new Error('CABINET_CONTRIB_URL set — cannot restart Vite with mock mode')
    }

    await stopServer(devServer)
    freePort(PORT)
    await sleep(800)
    // Force mock identity so /me never 401s mock JWT → Session Expired overlay (audit V1)
    devServer = startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })
    await waitForServer(BASE)

    const browser2 = await puppeteer.launch({ headless: true })
    const page2 = await browser2.newPage()
    await page2.setViewport(VIEWPORT)
    await captureMockContribSuite(page2, written)
    await browser2.close()

    console.log(
      liveLoginOk && liveProfileOk
        ? 'cabinet-contrib-cab06-full-cycle: PASS (live H1/H2 + mock contrib suite, no Session Expired)'
        : 'cabinet-contrib-cab06-full-cycle: FAIL',
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
  if (error.stack) console.error(error.stack)
  process.exit(1)
})
