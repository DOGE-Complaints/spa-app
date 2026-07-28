/**
 * CAB-06 Contribution Layer screenshots → T01 ui-baseline/
 * Usage:
 *   CAB06_PHASE=pre-implement node tests/puppeteer/cabinet-contrib-cab06-screenshot.mjs
 *   CAB06_PHASE=post-implement node tests/puppeteer/cabinet-contrib-cab06-screenshot.mjs
 * Env: CABINET_CONTRIB_URL=http://127.0.0.1:4173 to reuse existing Vite.
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-06-contribution-layer/task-spa-cab-06-t01-mount-contribution-layer/ui-baseline',
)

const BASE = process.env.CABINET_CONTRIB_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_CONTRIB_URL)
const PHASE = process.env.CAB06_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'
const VIEWPORT = { width: 1536, height: 1024 }

/** Post-implement: default MVP + key module previews */
const POST_STATES = [
  { letter: 'a1', slug: 'receipts-empty-default', preview: null },
  { letter: 'a2', slug: 'receipts-populated', preview: 'receipts-populated' },
  { letter: 'a3', slug: 'receipts-unavailable', preview: 'receipts-unavailable' },
  { letter: 'b2', slug: 'records-populated', preview: 'records-populated' },
  { letter: 'b3', slug: 'records-unavailable', preview: 'records-unavailable' },
  { letter: 'c1', slug: 'reputation-later-default', preview: 'reputation-later' },
  { letter: 'c2', slug: 'reputation-available', preview: 'reputation-available' },
  { letter: 'c3', slug: 'reputation-unavailable', preview: 'reputation-unavailable' },
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
      JSON.stringify({ sub: 'mock-user-cab06', exp: expiresAt, role: 'authenticated' }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh',
        expires_at: expiresAt,
        user: { id: 'mock-user-cab06', email: 'cab06@example.com' },
      }),
    )
    sessionStorage.removeItem('doge.force-cabinet-loading')
    sessionStorage.removeItem('doge.civic-preview')
    sessionStorage.removeItem('doge.story-activity-preview')
    sessionStorage.removeItem('doge.wallet-preview')
    sessionStorage.removeItem('doge.contrib-preview')
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'CAB-06 Demo',
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
    if (flag) sessionStorage.setItem('doge.contrib-preview', flag)
    else sessionStorage.removeItem('doge.contrib-preview')
  }, preview)
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="cabinet-slot-contribution"]', { timeout: 30000 })
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
      await shot(page, 'a1-contribution-slot-placeholder-1536x1024.png')
    } else {
      for (const state of POST_STATES) {
        await openProfileWithPreview(page, state.preview)
        await page.waitForSelector('[data-contribution-layer]', { timeout: 15000 })
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
