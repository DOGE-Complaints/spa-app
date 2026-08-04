/**
 * PH-02 AccountControl screenshots → T01 ui-baseline/
 *   PH02_PHASE=pre-implement node tests/puppeteer/public-header-ph02-screenshot.mjs
 *   PH02_PHASE=post-implement node tests/puppeteer/public-header-ph02-screenshot.mjs
 * Env: PUBLIC_HEADER_URL=http://127.0.0.1:4173 to reuse Vite.
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/task-spa-ph-02-t01-account-control-guest-auth/ui-baseline',
)

const BASE = process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HEADER_URL)
const PHASE = process.env.PH02_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'
const VIEWPORT = { width: 1536, height: 1024 }

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
  throw new Error('Vite dev server did not become ready')
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

async function shot(page, filename) {
  const out = path.join(UI_BASELINE, PHASE, filename)
  await mkdir(path.dirname(out), { recursive: true })
  await page.screenshot({ path: out, fullPage: false })
  console.log('wrote', out)
  return out
}

async function run() {
  await mkdir(path.join(UI_BASELINE, PHASE), { recursive: true })
  const devServer = USE_EXISTING ? null : startViteDevServer()
  try {
    if (!USE_EXISTING) await waitForServer(`${BASE}/`)

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    // State A — Guest
    await clearAuth(page)
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('[data-testid="public-header"]', { timeout: 15000 })
    await page.waitForSelector('[data-testid="header-account-slot"]', { timeout: 10000 })
    await shot(page, 'a-guest-idle-board-1536x1024.png')

    // State B — Authenticated idle (post only meaningful; pre still captures slot)
    await seedMockAuthSession(page)
    await page.waitForSelector('[data-testid="public-header"]', { timeout: 15000 })
    if (PHASE === 'post-implement') {
      await page.waitForSelector('[data-testid="account-control"][data-state="authenticated"]', {
        timeout: 20000,
      })
    }
    await shot(page, 'b-auth-idle-board-1536x1024.png')

    // State C — Menu open
    if (PHASE === 'post-implement') {
      await page.click('[data-testid="account-control-trigger"]')
      await page.waitForSelector('[data-testid="account-control-menu"]', { timeout: 5000 })
    }
    await shot(page, 'c-auth-menu-open-board-1536x1024.png')

    await browser.close()
  } finally {
    if (devServer) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
