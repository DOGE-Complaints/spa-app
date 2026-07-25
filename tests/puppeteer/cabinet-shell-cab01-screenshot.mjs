/**
 * CAB-01 cabinet shell screenshots → T02 anchor ui-baseline/
 * Usage:
 *   CAB01_PHASE=pre-implement node tests/puppeteer/cabinet-shell-cab01-screenshot.mjs
 *   CAB01_PHASE=post-implement node tests/puppeteer/cabinet-shell-cab01-screenshot.mjs
 * Env: CABINET_SHELL_URL=http://localhost:4173 to reuse existing Vite.
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
const UI_BASELINE = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-01-profile-cabinet-shell-assembly/screenshots/archive',
)

const BASE = process.env.CABINET_SHELL_URL ?? 'http://localhost:4173'
const USE_EXISTING = Boolean(process.env.CABINET_SHELL_URL)
const PHASE = process.env.CAB01_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

const STATES = [
  {
    slug: 'default',
    file: `${PHASE}-default-cabinet-shell-1536x1024.png`,
    profile: {
      display_name: 'Demo User',
      role: 'citizen',
      email: 'zara@example.com',
      created_at: '2026-06-14T10:22:00Z',
      status: 'active',
    },
    mode: 'authenticated',
  },
  {
    slug: 'loading',
    file: `${PHASE}-loading-cabinet-shell-1536x1024.png`,
    profile: null,
    mode: 'loading',
  },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', 'localhost', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, VITE_IDENTITY_MOCK_MODE: 'true' },
    },
  )
}

async function waitForServer(url, attempts = 40) {
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

async function seedMockAuthSession(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({ sub: 'mock-user-unverified', exp: expiresAt, role: 'authenticated' }))
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh-token',
        expires_at: expiresAt,
        expires_in: 3600,
        token_type: 'bearer',
        user: { id: 'mock-user-unverified', email: 'mock@example.com', aud: 'authenticated', role: 'authenticated' },
      }),
    )
    sessionStorage.removeItem('dogestonia-auth')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function setMockProfile(page, profile) {
  await page.evaluate((nextProfile) => {
    if (nextProfile) {
      sessionStorage.setItem('doge.mock-profile', JSON.stringify(nextProfile))
    } else {
      sessionStorage.removeItem('doge.mock-profile')
    }
  }, profile)
}

async function captureDefault(page, spec) {
  await setMockProfile(page, spec.profile)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 60000 })
  if (PHASE === 'post-implement') {
    await page.waitForSelector('[data-testid="cabinet-grid"]', { timeout: 60000 })
  }
  const outPath = path.join(UI_BASELINE, spec.file)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  return outPath
}

async function captureLoading(page, spec) {
  await setMockProfile(page, {
    display_name: 'Demo User',
    role: 'citizen',
    email: 'zara@example.com',
  })
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    sessionStorage.setItem('doge.force-cabinet-loading', '1')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="cabinet-shell-skeleton"]', { timeout: 60000 })
  const outPath = path.join(UI_BASELINE, spec.file)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  await page.evaluate(() => {
    sessionStorage.removeItem('doge.force-cabinet-loading')
  })
  return outPath
}

async function run() {
  await mkdir(UI_BASELINE, { recursive: true })
  const devServer = USE_EXISTING ? null : startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await seedMockAuthSession(page)

    const written = []
    for (const spec of STATES) {
      if (spec.mode === 'loading') {
        written.push(await captureLoading(page, spec))
      } else {
        written.push(await captureDefault(page, spec))
      }
    }

    await browser.close()
    console.log(`cabinet-shell-cab01-screenshot (${PHASE}): PASS`)
    for (const file of written) {
      console.log(file)
    }
  } finally {
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
