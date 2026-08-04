/**
 * PH-03 PublicFooter full-cycle → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → board PublicFooter.
 * Mock shots: desktop, how-it-works, narrow (same Vite session after live).
 * Exit 0 only if live happy PNG captured.
 *
 * Usage: cd spa-app && npm run test:ui:public-footer-ph03-full
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-03-public-footer/screenshots',
)
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.PUBLIC_FOOTER_URL ?? process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_FOOTER_URL || process.env.PUBLIC_HEADER_URL)
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
  if (!devServer) return
  devServer.kill('SIGTERM')
  await sleep(500)
}

async function shot(page, fileName) {
  await page.evaluate(() => {
    document.querySelector('[data-testid="public-footer"]')?.scrollIntoView({ block: 'end' })
  })
  await sleep(200)
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

async function run() {
  const env = await loadDotEnv(ENV_PATH)
  const email = env.USER_EMAIL || process.env.USER_EMAIL
  const password = env.USER_PASSWORD || process.env.USER_PASSWORD
  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set in spa-app/.env')
  }

  await mkdir(OUT_DIR, { recursive: true })
  const written = []
  let liveOk = false
  let devServer = USE_EXISTING ? null : startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })

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
      await page.waitForSelector('[data-testid="public-header"]', { timeout: 60000 })
      await page.waitForSelector('[data-testid="public-footer"]', { timeout: 20000 })
      const tagline = await page.$eval('[data-testid="public-footer-tagline"]', (el) => el.textContent)
      if (tagline !== '[TAGLINE_TBD]') {
        throw new Error(`expected [TAGLINE_TBD], got ${tagline}`)
      }
      liveOk = true
      written.push(await shot(page, '01-happy-live-board-public-footer-1536x1024.png'))
    } catch (error) {
      console.error('live auth/footer path failed', error)
      written.push(await shot(page, '00-login-or-footer-error-1536x1024.png'))
    }

    await clearAuth(page)
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="public-footer"]', { timeout: 20000 })
    written.push(await shot(page, '02-happy-mock-board-public-footer-desktop-1536x1024.png'))

    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="public-footer"]', { timeout: 20000 })
    written.push(await shot(page, '03-happy-mock-how-it-works-public-footer-1536x1024.png'))

    await page.setViewport({ width: 390, height: 844 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="public-footer"]', { timeout: 20000 })
    written.push(await shot(page, '04-edge-mock-board-public-footer-narrow-390x844.png'))

    const social = await page.$$('[data-testid^="public-footer-social"]')
    if (social.length) throw new Error('social footer icons present')

    await browser.close()
    console.log(JSON.stringify({ liveOk, written }, null, 2))
  } finally {
    await stopServer(devServer)
  }

  if (!liveOk) {
    throw new Error('PH-03 full-cycle requires live happy footer PNG')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
