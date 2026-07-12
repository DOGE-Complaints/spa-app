import { mkdir, writeFile } from 'node:fs/promises'
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-02-account-summary-block/task-spa-cab-02-t01-account-summary-slot-profile-data/ui-baseline',
)

const BASE = process.env.ACCOUNT_SUMMARY_URL ?? 'http://localhost:4173'
const USE_EXISTING = Boolean(process.env.ACCOUNT_SUMMARY_URL)

const STATES = [
  {
    slug: 'missing-email',
    file: 'post-implement/missing-email-account-summary-1536x1024.png',
    profile: { display_name: 'Demo User', role: 'citizen' },
    expectedState: 'missing-email',
  },
  {
    slug: 'minimal-data',
    file: 'post-implement/minimal-data-account-summary-1536x1024.png',
    profile: {
      display_name: 'Demo User',
      role: 'citizen',
      email: 'user@example.com',
    },
    expectedState: 'minimal-data',
  },
  {
    slug: 'complete',
    file: 'post-implement/complete-account-summary-1536x1024.png',
    profile: {
      display_name: 'Demo User',
      role: 'citizen',
      email: 'zara@example.com',
      created_at: '2026-06-14T10:22:00Z',
      status: 'active',
    },
    expectedState: 'complete',
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
    sessionStorage.setItem('doge.mock-profile', JSON.stringify(nextProfile))
  }, profile)
}

async function captureState(page, spec) {
  await setMockProfile(page, spec.profile)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="account-summary"]', { timeout: 60000 })
  const actualState = await page.$eval('[data-testid="account-summary"]', (el) => el.getAttribute('data-state'))
  if (actualState !== spec.expectedState) {
    throw new Error(`Expected data-state=${spec.expectedState}, got ${actualState} for ${spec.slug}`)
  }
  const card = await page.$('[data-testid="account-summary"]')
  const outPath = path.join(UI_BASELINE, spec.file)
  await mkdir(path.dirname(outPath), { recursive: true })
  await card.screenshot({ path: outPath })
  return outPath
}

async function run() {
  await mkdir(path.join(UI_BASELINE, 'post-implement'), { recursive: true })
  const devServer = USE_EXISTING ? null : startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await seedMockAuthSession(page)

    const written = []
    for (const spec of STATES) {
      written.push(await captureState(page, spec))
    }

    await browser.close()
    console.log('account-summary-cab02-screenshot: PASS')
    for (const file of written) {
      console.log(file)
    }
  } finally {
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch(async (error) => {
  console.error(error)
  process.exit(1)
})
