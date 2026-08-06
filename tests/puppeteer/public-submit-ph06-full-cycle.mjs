/**
 * PH-06 Submit GPT CTA full-cycle → story-root screenshots/full-cycle/
 *
 * Live: USER_EMAIL / USER_PASSWORD → /#/board with nav + board Submit CTAs.
 * Board feed backdrop: intentional results via PH-07 helper (not gateway health).
 * Mock (VITE_IDENTITY_MOCK_MODE=true): board Submit, how-it-works Submit.
 * Exit 0 only if live happy PNG captured + no accidental board-load-error.
 *
 * Usage: cd spa-app && npm run test:ui:submit-ph06-full
 */
import { mkdir, readFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'
import {
  assertBoardMockResults,
  assertNoBoardLoadError,
  installBoardFeedBackdrop,
} from './lib/boardFeedBackdrop.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const PH06_SCREENSHOTS = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/screenshots',
)
const PH07_SCREENSHOTS = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/screenshots',
)
const OUT_DIR = path.join(PH06_SCREENSHOTS, 'full-cycle')
const PH07_OUT = path.join(PH07_SCREENSHOTS, 'full-cycle')
const ENV_PATH = path.join(SPA_ROOT, '.env')

const BASE = process.env.PUBLIC_SUBMIT_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_SUBMIT_URL)
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

async function shot(page, filename, { fullPage = false, alsoPh07 = false } = {}) {
  const outPath = path.join(OUT_DIR, filename)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage })
  console.log('wrote', outPath)
  if (alsoPh07) {
    await mkdir(PH07_OUT, { recursive: true })
    const ph07Name = filename.replace('happy-live-board-submit-ctas', 'chrome-live-board-results-backdrop')
      .replace('happy-mock-board-submit-ctas', 'chrome-mock-board-results-backdrop')
    const ph07Path = path.join(PH07_OUT, ph07Name)
    await copyFile(outPath, ph07Path)
    console.log('wrote', ph07Path)
  }
  return outPath
}

async function shotInView(page, selector, filename) {
  await page.waitForSelector(selector, { timeout: 15000 })
  await page.$eval(selector, (el) => {
    el.scrollIntoView({ block: 'center', inline: 'nearest' })
  })
  await sleep(350)
  return shot(page, filename, { fullPage: false })
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
}

/**
 * Intentional results backdrop + chrome CTAs.
 * Remount board after install (PH-04 pattern): same-hash goto after clearAuth/login
 * leaves live React state and never re-fetches under intercept.
 */
async function captureBoardChrome(page, filename) {
  await installBoardFeedBackdrop(page, 'results')
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-nav-submit"]', { timeout: 15000 })
  await page.waitForSelector('[data-testid="board-submit-cta"]', { timeout: 15000 })
  await assertBoardMockResults(page)
  await assertNoBoardLoadError(page)
  return shot(page, filename, { alsoPh07: true })
}

async function run() {
  const env = await loadDotEnv(ENV_PATH)
  const email = env.USER_EMAIL || process.env.USER_EMAIL
  const password = env.USER_PASSWORD || process.env.USER_PASSWORD
  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set in spa-app/.env')
  }

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(PH07_OUT, { recursive: true })
  const written = []
  let liveOk = false
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
      const continueBtn = await page.$(
        '[data-auth-state="auth-success"] [data-testid="auth-submit"]',
      )
      if (continueBtn) await continueBtn.click()
      await page.waitForSelector('[data-testid="public-header"]', { timeout: 60000 })
      written.push(await captureBoardChrome(page, '01-happy-live-board-submit-ctas-1536x1024.png'))
      liveOk = true
      await browser.close()
    } catch (err) {
      written.push(await shot(page, '00-login-error-1536x1024.png'))
      console.error('LIVE_LOGIN=FAIL. Hard-stop: live happy required for PASS.')
      console.error(String(err?.message || err))
      await browser.close()
      await stopServer(devServer)
      process.exitCode = 1
      return
    }

    if (USE_EXISTING) {
      throw new Error('PUBLIC_SUBMIT_URL set — cannot restart Vite with mock mode')
    }

    await stopServer(devServer)
    devServer = startViteDevServer({ VITE_IDENTITY_MOCK_MODE: 'true' })
    await waitForServer(BASE)

    const browser2 = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page2 = await browser2.newPage()
    await page2.setViewport(VIEWPORT)
    await clearAuth(page2)

    written.push(await captureBoardChrome(page2, '02-happy-mock-board-submit-ctas-1536x1024.png'))

    await page2.goto(`${BASE}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 60000 })
    written.push(
      await shotInView(
        page2,
        '[data-testid="how-it-works-cta-submit"]',
        '03-happy-mock-how-it-works-submit-cta-1536x1024.png',
      ),
    )

    // PH-07 labeled load-error path (M132 error goal)
    await installBoardFeedBackdrop(page2, 'error')
    await page2.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page2.waitForSelector('[data-testid="board-load-error"]', { timeout: 20000 })
    const errPath = path.join(PH07_OUT, '03-edge-mock-load-error-labeled-1536x1024.png')
    await page2.screenshot({ path: errPath, fullPage: false })
    console.log('wrote', errPath)
    written.push(errPath)

    await browser2.close()

    if (!liveOk) {
      throw new Error('Live happy screenshot missing')
    }
    console.log('PH-06/PH-07 full-cycle PASS', written.length, 'files')
    for (const file of written) console.log(file)
  } finally {
    await stopServer(devServer)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
