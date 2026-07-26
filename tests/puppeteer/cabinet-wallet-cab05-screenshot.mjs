/**
 * CAB-05 Wallet Status screenshots → T01 ui-baseline/
 * Usage:
 *   CAB05_PHASE=pre-implement node tests/puppeteer/cabinet-wallet-cab05-screenshot.mjs
 *   CAB05_PHASE=post-implement node tests/puppeteer/cabinet-wallet-cab05-screenshot.mjs
 * Env: CABINET_WALLET_URL=http://127.0.0.1:4173 to reuse existing Vite.
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-05-wallet-status-card/task-spa-cab-05-t01-mount-wallet-status-card/ui-baseline',
)

const BASE = process.env.CABINET_WALLET_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_WALLET_URL)
const PHASE = process.env.CAB05_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'
const VIEWPORT = { width: 1536, height: 1024 }

const POST_STATES = [
  { letter: 'a', slug: 'unlinked-stub', preview: 'unlinked' },
  { letter: 'b', slug: 'linked-coming-soon', preview: 'linked' },
  { letter: 'c', slug: 'connect-coming-soon', preview: 'connect' },
]

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

async function seedMockAuthSession(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-cab05', exp: expiresAt, role: 'authenticated' }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh',
        expires_at: expiresAt,
        user: { id: 'mock-user-cab05', email: 'cab05@example.com' },
      }),
    )
    sessionStorage.removeItem('doge.force-cabinet-loading')
    sessionStorage.removeItem('doge.civic-preview')
    sessionStorage.removeItem('doge.story-activity-preview')
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'CAB-05 Demo',
        role: 'citizen',
        phone_verified: true,
        phone_verified_at: '2026-06-01T12:00:00Z',
        phone_dial_prefix: '+372',
      }),
    )
  })
}

async function openProfileWithPreview(page, preview) {
  await seedMockAuthSession(page)
  await page.evaluate((flag) => {
    if (flag) sessionStorage.setItem('doge.wallet-preview', flag)
    else sessionStorage.removeItem('doge.wallet-preview')
  }, preview)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="cabinet-slot-wallet"]', { timeout: 30000 })
  await sleep(400)
}

async function shot(page, filename) {
  const outPath = path.join(UI_BASELINE, PHASE, filename)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  console.log(`wrote ${outPath}`)
}

async function run() {
  let devServer = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: VIEWPORT,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)

  try {
    if (PHASE === 'pre-implement') {
      await openProfileWithPreview(page, null)
      await shot(page, 'a-wallet-slot-placeholder-1536x1024.png')
    } else {
      for (const state of POST_STATES) {
        await openProfileWithPreview(page, state.preview)
        await page.waitForSelector('[data-wallet-status-card]', { timeout: 15000 })
        await shot(page, `${state.letter}-${state.slug}-1536x1024.png`)
      }
    }
  } finally {
    await browser.close()
    await stopServer(devServer)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
