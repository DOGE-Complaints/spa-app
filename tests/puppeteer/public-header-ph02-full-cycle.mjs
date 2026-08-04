/**
 * PH-02 AccountControl full-cycle → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → auth-success + board account control (auth idle + menu).
 * Mock (Vite VITE_IDENTITY_MOCK_MODE=true): guest, auth idle, menu open, logout → guest.
 * Exit 0 only if live happy PNGs captured.
 *
 * Usage: cd spa-app && npm run test:ui:public-header-ph02-full
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/screenshots',
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
      JSON.stringify({ sub: 'mock-user-ph02', exp: expiresAt, role: 'authenticated' }),
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
          id: 'mock-user-ph02',
          email: 'mock@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        },
      }),
    )
    sessionStorage.removeItem('doge.mock-me-error')
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'Demo User',
        role: 'citizen',
        avatar_url: null,
      }),
    )
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function captureMockSuite(page, written) {
  await page.setViewport(VIEWPORT)
  await clearAuth(page)
  await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="account-control"][data-state="guest"]', {
    timeout: 20000,
  })
  written.push(await shot(page, '03-happy-mock-guest-sign-in-1536x1024.png'))

  await seedMockAuthSession(page)
  await page.waitForSelector('[data-testid="account-control"][data-state="authenticated"]', {
    timeout: 20000,
  })
  written.push(await shot(page, '04-happy-mock-auth-idle-1536x1024.png'))

  await page.click('[data-testid="account-control-trigger"]')
  await page.waitForSelector('[data-testid="account-control-menu"]', { timeout: 5000 })
  written.push(await shot(page, '05-happy-mock-auth-menu-open-1536x1024.png'))

  await page.click('[data-testid="account-control-logout"]')
  await page.waitForSelector('[data-testid="account-control"][data-state="guest"]', {
    timeout: 20000,
  })
  written.push(await shot(page, '06-edge-mock-after-logout-guest-1536x1024.png'))
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
  // Live supabase password login + identity mock /me (AccountControl AUTHENTICATED chrome).
  // Real identity /me may be unavailable in local P3; mock keeps session→profile path deterministic.
  let liveLoginOk = false
  let liveBoardOk = false
  let liveMenuOk = false
  let devServer = USE_EXISTING ? null : startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })

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
      await page.waitForSelector('[data-testid="account-control"][data-state="authenticated"]', {
        timeout: 60000,
      })
      liveBoardOk = true
      written.push(await shot(page, '01-happy-live-board-account-authenticated-1536x1024.png'))

      await page.click('[data-testid="account-control-trigger"]')
      await page.waitForSelector('[data-testid="account-control-menu"]', { timeout: 5000 })
      liveMenuOk = true
      written.push(await shot(page, '01b-happy-live-board-account-menu-open-1536x1024.png'))
    } catch (error) {
      console.error('live auth path failed', error)
      written.push(await shot(page, '00-login-error-1536x1024.png'))
    }

    // Deterministic mock guest/auth/logout suite (same mock Vite)
    await captureMockSuite(page, written)
    await browser.close()
  } finally {
    await stopServer(devServer)
  }

  console.log(
    JSON.stringify(
      {
        liveLoginOk,
        liveBoardOk,
        liveMenuOk,
        written,
      },
      null,
      2,
    ),
  )

  if (!liveLoginOk || !liveBoardOk || !liveMenuOk) {
    throw new Error('PH-02 full-cycle requires live happy account PNGs')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
