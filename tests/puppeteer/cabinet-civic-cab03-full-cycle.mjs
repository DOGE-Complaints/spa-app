/**
 * CAB-03 civic full happy + edge → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → 02 auth-success, 01 profile civic from /me.
 * Mock (Vite restart VITE_IDENTITY_MOCK_MODE=true): M28 states + locales + dashboard + verify CTA.
 * Exit 0 only if live H1+H2 captured; else exit 1.
 *
 * Usage: cd spa-app && npm run test:ui:cabinet-civic-cab03-full
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/screenshots',
)
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.CABINET_CIVIC_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_CIVIC_URL)
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
      for (const store of [localStorage, sessionStorage]) {
        const keys = []
        for (let i = 0; i < store.length; i += 1) {
          const key = store.key(i)
          if (key && (key.includes('auth') || key.includes('supabase'))) keys.push(key)
        }
        for (const key of keys) store.removeItem(key)
      }
    } catch {
      // ignore opaque-origin storage errors; next navigation reseeds
    }
  })
  await page.goto(`${BASE}/#/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function seedMockAuthSession(page, profileOverride = {}) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate((profile) => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-cab03', exp: expiresAt, role: 'authenticated' }),
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
          id: 'mock-user-cab03',
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
        phone_verified: false,
        phone_verified_at: null,
        phone_dial_prefix: null,
        ...profile,
      }),
    )
  }, profileOverride)
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function openProfileWithCivic(page) {
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 90000 })
  await page.waitForSelector('[data-testid="cabinet-slot-civic"]', { timeout: 60000 })
  await page.waitForSelector('[data-civic-status-card]', { timeout: 60000 })
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

async function captureCivicPreview(page, preview, profileOverride, expectedState) {
  await seedMockAuthSession(page, profileOverride)
  await page.evaluate((flag) => {
    sessionStorage.setItem('doge.civic-preview', flag)
  }, preview)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-civic-status-card]', { timeout: 60000 })
  await page.waitForSelector(
    `[data-civic-status-card][data-civic-status-state="${expectedState}"]`,
    { timeout: 30000 },
  )
}

/**
 * Mock suite: H3–H5 + E1–E6
 */
async function captureMockCivicSuite(page, written) {
  await setLocale(page, 'en')

  // H3 — unverified + Verify CTA
  await captureCivicPreview(page, 'unverified', { phone_verified: false }, 'unverified')
  written.push(
    await shot(page, '03-happy-mock-civic-unverified-verify-cta-1536x1024.png'),
  )

  // H4 — verified no re-prompt
  await captureCivicPreview(
    page,
    'verified',
    {
      phone_verified: true,
      phone_verified_at: '2026-06-01T12:00:00Z',
      phone_dial_prefix: '+372',
    },
    'verified',
  )
  written.push(
    await shot(page, '04-happy-mock-civic-verified-no-reprompt-1536x1024.png'),
  )

  // H5 — dashboard civic reuse
  await seedMockAuthSession(page, { phone_verified: false })
  await page.evaluate(() => {
    sessionStorage.removeItem('doge.civic-preview')
  })
  await page.goto(`${BASE}/#/dashboard`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="dashboard-page"]', { timeout: 60000 })
  await page.waitForSelector('[data-civic-status-card]', { timeout: 60000 })
  written.push(await shot(page, '05-happy-mock-dashboard-civic-reuse-1536x1024.png'))

  // E1 — verification_available
  await captureCivicPreview(page, 'available', { phone_verified: false }, 'verification_available')
  written.push(
    await shot(page, '06-edge-mock-civic-verification-available-1536x1024.png'),
  )

  // E2 — in_progress
  await captureCivicPreview(
    page,
    'in_progress',
    { phone_verified: false },
    'verification_in_progress',
  )
  written.push(
    await shot(page, '07-edge-mock-civic-verification-in-progress-1536x1024.png'),
  )

  // E3 — failed
  await captureCivicPreview(page, 'failed', { phone_verified: false }, 'verification_failed')
  written.push(await shot(page, '08-edge-mock-civic-verification-failed-1536x1024.png'))

  // E4 — locale et
  await captureCivicPreview(page, 'unverified', { phone_verified: false }, 'unverified')
  await setLocale(page, 'et')
  await page.waitForSelector(
    '[data-civic-status-card][data-civic-status-state="unverified"]',
    { timeout: 60000 },
  )
  written.push(await shot(page, '09-edge-mock-locale-et-civic-unverified-1536x1024.png'))

  // E5 — locale ru
  await setLocale(page, 'ru')
  await page.waitForSelector(
    '[data-civic-status-card][data-civic-status-state="unverified"]',
    { timeout: 60000 },
  )
  written.push(await shot(page, '10-edge-mock-locale-ru-civic-unverified-1536x1024.png'))

  // E6 — Verify CTA → /verify
  await setLocale(page, 'en')
  await captureCivicPreview(page, 'unverified', { phone_verified: false }, 'unverified')
  const verifyBtn = await page.evaluateHandle(() => {
    const buttons = [...document.querySelectorAll('button')]
    return (
      buttons.find((b) => /verify account|kontrolli|проверь|вериф/i.test(b.textContent || '')) ||
      null
    )
  })
  const el = verifyBtn.asElement()
  if (!el) throw new Error('Verify CTA button not found on unverified civic card')
  await el.click()
  await page.waitForFunction(
    () => /#\/verify/.test(window.location.hash),
    { timeout: 15000 },
  )
  await sleep(500)
  written.push(
    await shot(page, '11-edge-mock-verify-cta-navigates-to-verify-1536x1024.png'),
  )
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

    await page.click('[data-testid="auth-email"]', { clickCount: 3 })
    await page.type('[data-testid="auth-email"]', email, { delay: 10 })
    await page.click('[data-testid="auth-password"]', { clickCount: 3 })
    await page.type('[data-testid="auth-password"]', password, { delay: 10 })
    await page.click('[data-testid="auth-submit"]')

    try {
      await page.waitForSelector('[data-auth-state="auth-success"]', { timeout: 45000 })
      liveLoginOk = true
      // H2 — auth-success (plan order: H1 profile, H2 auth — capture auth first then profile)
      written.push(await shot(page, '02-happy-live-auth-success-1536x1024.png'))
      const continueBtn = await page.$(
        '[data-auth-state="auth-success"] [data-testid="auth-submit"]',
      )
      if (continueBtn) await continueBtn.click()
      await openProfileWithCivic(page)
      written.push(await shot(page, '01-happy-live-profile-civic-from-me-1536x1024.png'))
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
      throw new Error('CABINET_CIVIC_URL set — cannot restart Vite with mock mode')
    }

    await stopServer(devServer)
    devServer = startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })
    await waitForServer(BASE)

    const browser2 = await puppeteer.launch({ headless: true })
    const page2 = await browser2.newPage()
    await page2.setViewport(VIEWPORT)
    await captureMockCivicSuite(page2, written)
    await browser2.close()

    console.log(
      liveLoginOk && liveProfileOk
        ? 'cabinet-civic-cab03-full-cycle: PASS (live H1/H2 + mock civic suite)'
        : 'cabinet-civic-cab03-full-cycle: FAIL',
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
