/**
 * CAB-03 Civic Status screenshots → T01 ui-baseline/
 * Usage:
 *   CAB03_PHASE=pre-implement node tests/puppeteer/cabinet-civic-cab03-screenshot.mjs
 *   CAB03_PHASE=post-implement node tests/puppeteer/cabinet-civic-cab03-screenshot.mjs
 * Env: CABINET_CIVIC_URL=http://127.0.0.1:4173 to reuse existing Vite.
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
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-03-civic-status-in-cabinet/task-spa-cab-03-t01-mount-civic-status-card/ui-baseline',
)

const BASE = process.env.CABINET_CIVIC_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.CABINET_CIVIC_URL)
const PHASE = process.env.CAB03_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'
const VIEWPORT = { width: 1536, height: 1024 }

/** M28 states A–E; pre-implement only captures placeholder profile. */
const POST_STATES = [
  { letter: 'a', slug: 'unverified', preview: 'unverified', phone_verified: false },
  { letter: 'b', slug: 'verification-available', preview: 'available', phone_verified: false },
  { letter: 'c', slug: 'verification-in-progress', preview: 'in_progress', phone_verified: false },
  { letter: 'd', slug: 'verified', preview: 'verified', phone_verified: true },
  { letter: 'e', slug: 'verification-failed', preview: 'failed', phone_verified: false },
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

async function shot(page, outDir, filename) {
  const outPath = path.join(outDir, filename)
  await mkdir(path.dirname(outPath), { recursive: true })
  await page.screenshot({ path: outPath, fullPage: false })
  return outPath
}

async function run() {
  const outDir = path.join(UI_BASELINE, PHASE)
  await mkdir(outDir, { recursive: true })
  const written = []
  let devServer = USE_EXISTING ? null : startViteDevServer()

  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    if (PHASE === 'pre-implement') {
      await seedMockAuthSession(page, { phone_verified: false })
      await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
      await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 90000 })
      await page.waitForSelector('[data-testid="cabinet-slot-civic"]', { timeout: 60000 })
      written.push(
        await shot(page, outDir, 'pre-implement-civic-slot-placeholder-1536x1024.png'),
      )
    } else {
      for (const state of POST_STATES) {
        await seedMockAuthSession(page, {
          phone_verified: state.phone_verified,
          phone_verified_at: state.phone_verified ? '2026-06-01T12:00:00Z' : null,
          phone_dial_prefix: state.phone_verified ? '+372' : null,
        })
        await page.evaluate((preview) => {
          sessionStorage.setItem('doge.civic-preview', preview)
        }, state.preview)
        await page.goto(`${BASE}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
        await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
        await page.waitForSelector('[data-testid="cabinet-slot-civic"]', { timeout: 90000 })
        await page.waitForSelector('[data-civic-status-card]', { timeout: 60000 })
        const expected =
          state.preview === 'unverified'
            ? 'unverified'
            : state.preview === 'available'
              ? 'verification_available'
              : state.preview === 'in_progress'
                ? 'verification_in_progress'
                : state.preview === 'verified'
                  ? 'verified'
                  : 'verification_failed'
        await page.waitForSelector(
          `[data-civic-status-card][data-civic-status-state="${expected}"]`,
          { timeout: 30000 },
        )
        written.push(
          await shot(
            page,
            outDir,
            `${state.letter}-${state.slug}-civic-cabinet-1536x1024.png`,
          ),
        )
      }
    }

    await browser.close()
    console.log(`cabinet-civic-cab03-screenshot: ${PHASE} OK`)
    for (const file of written) console.log(file)
  } finally {
    await stopServer(devServer)
  }
}

run().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
