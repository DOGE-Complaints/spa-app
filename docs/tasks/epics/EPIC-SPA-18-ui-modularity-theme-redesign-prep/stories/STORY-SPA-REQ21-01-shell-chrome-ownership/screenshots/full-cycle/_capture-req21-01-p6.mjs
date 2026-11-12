/**
 * P6 REQ21-01 gap capture → story-root screenshots/full-cycle/
 * One-shot harness (docs evidence). Run from spa-app/:
 *   node docs/tasks/epics/.../screenshots/full-cycle/_capture-req21-01-p6.mjs
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../../../../../../../..')
const OUT_DIR = __dirname
const BASE = process.env.REQ21_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.REQ21_URL)

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, VITE_IDENTITY_MOCK_MODE: 'true' },
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
  throw new Error('Vite did not become ready')
}

async function scrollFooterIntoView(page) {
  await page.evaluate(() => {
    document.querySelector('[data-testid="public-footer"], .board-footer')?.scrollIntoView({
      block: 'end',
    })
  })
  await sleep(200)
}

async function seedMockAuth(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-cab01', exp: expiresAt, role: 'authenticated' }),
    )
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: `${header}.${payload}.mock-signature`,
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
  await page.reload({ waitUntil: 'networkidle0', timeout: 90000 })
}

async function clearAuth(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.evaluate(() => {
    localStorage.removeItem('dogestonia-auth')
    localStorage.removeItem('dogestonia-remember-me')
    sessionStorage.removeItem('dogestonia-auth')
    sessionStorage.removeItem('doge.mock-profile')
    sessionStorage.removeItem('doge.mock-me-error')
    sessionStorage.removeItem('doge.force-cabinet-loading')
    for (const store of [localStorage, sessionStorage]) {
      const keys = []
      for (let i = 0; i < store.length; i += 1) {
        const key = store.key(i)
        if (key && (key.includes('auth') || key.includes('supabase'))) keys.push(key)
      }
      for (const key of keys) store.removeItem(key)
    }
  })
  await page.goto(`${BASE}/#/login`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 90000 })
}

async function shot(page, name) {
  const out = path.join(OUT_DIR, name)
  await page.screenshot({ path: out, fullPage: false })
  console.log('wrote', out)
  return out
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  let devServer = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  }
  const browser = await puppeteer.launch(launchOpts)
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 1024 })

  try {
    // T07 — board + HIW with footer in frame
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await clearAuth(page)
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="app-shell"], .board-shell', { timeout: 30000 })
    await page.waitForSelector('[data-testid="public-footer"], .board-footer', { timeout: 15000 })
    await scrollFooterIntoView(page)
    await shot(page, '01-board-default-footer-1536x1024.png')

    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="public-footer"], .board-footer', { timeout: 15000 })
    await scrollFooterIntoView(page)
    await shot(page, '02-how-it-works-footer-1536x1024.png')

    // T08 — public issue (prefer live card; else not-found still shows layout chrome + back)
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await sleep(1500)
    const href = await page.evaluate(() => {
      const a =
        document.querySelector('a.issue-card') ||
        document.querySelector('.board-feed a[href*="/issue/"]') ||
        document.querySelector('a[href*="#/issue/"]')
      return a ? a.getAttribute('href') : null
    })
    if (href) {
      const hash = href.includes('#') ? href.slice(href.indexOf('#')) : href
      await page.goto(`${BASE}/${hash.replace(/^\//, '')}`, { waitUntil: 'networkidle0', timeout: 90000 })
    } else {
      await page.goto(`${BASE}/#/issue/UNKNOWN-ID`, { waitUntil: 'networkidle0', timeout: 90000 })
    }
    await page.waitForSelector('.issue-page-header, button', { timeout: 20000 })
    await page.waitForSelector('[data-testid="public-header"], .header-strip, [data-testid="app-shell"]', {
      timeout: 15000,
    })
    // keep top of page: public header + back control (do not scroll footer)
    await shot(page, '03-issue-chrome-back-1536x1024.png')

    // T08 — protected workspace sidebar-on (authenticated, no overlay)
    await seedMockAuth(page)
    await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="user-cabinet-page"], [data-testid="cabinet-grid"]', {
      timeout: 90000,
    })
    await page.waitForFunction(
      () => !document.querySelector('[data-testid="session-shell-overlay"]'),
      { timeout: 30000 },
    ).catch(() => null)
    await sleep(500)
    await shot(page, '04-protected-workspace-sidebar-1536x1024.png')

    // T08 — session overlay atop layout (mock /me error on protected)
    await seedMockAuth(page)
    await page.evaluate(() => {
      sessionStorage.setItem('doge.mock-me-error', 'session_expired')
    })
    await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="session-shell-overlay"]', { timeout: 60000 })
    await shot(page, '05-session-overlay-1536x1024.png')

    console.log('REQ21-01 P6 capture OK')
  } finally {
    await browser.close()
    if (devServer && !devServer.killed) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
