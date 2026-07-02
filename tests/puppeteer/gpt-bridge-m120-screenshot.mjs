/**
 * Capture M120 GPT bridge states for ID-08 anchor T05.
 * Usage: PHASE=pre-implement|post-implement node ./tests/puppeteer/gpt-bridge-m120-screenshot.mjs
 */
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = process.env.VERIFY_HOST_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_HOST_URL)
const PHASE = process.env.PHASE ?? 'post-implement'
const OUTPUT_DIR = resolve(
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-08-gpt-verification-entry/task-spa-id-08-t05-gpt-bridge-ui-shell-m120-draft-banner-success/ui-baseline',
  PHASE,
)

/** @type {Array<{ slug: string, url: string, selector: string }>} */
const CAPTURES = [
  {
    slug: 'b-resolving-m120',
    url: '/#/login?oauth_request_id=mock-oauth-verify&dev_gpt_phase=resolving',
    selector: '[data-testid="gpt-bridge-resolving"]',
  },
  {
    slug: 'c-login-m120',
    url: '/#/login?oauth_request_id=mock-oauth-verify&dev_gpt_phase=login_required&dev_auth_state=login',
    selector: '[data-testid="gpt-bridge-login-context"]',
  },
  {
    slug: 'g-success-m120',
    url: '/#/login?oauth_request_id=mock-oauth-happy&dev_gpt_phase=success&dev_auth_state=auth-success',
    selector: '[data-testid="gpt-bridge-success"]',
  },
  {
    slug: 'h-already-verified-m120',
    url: '/#/verify?context=custom_gpt&dev_gpt_phase=already_verified',
    selector: '[data-testid="gpt-bridge-already-verified"]',
  },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: process.cwd(),
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
    sessionStorage.setItem('dogestonia.oauth_request_id', 'mock-oauth-happy')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: 'mock-user-verified',
        exp: expiresAt,
        role: 'authenticated',
        email: 'mock@example.com',
      }),
    )
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: `${header}.${payload}.mock-signature`,
        refresh_token: 'mock-refresh-token',
        expires_at: expiresAt,
        expires_in: 3600,
        token_type: 'bearer',
        user: { id: 'mock-user-verified', email: 'mock@example.com' },
      }),
    )
  })
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    if (!USE_EXISTING_SERVER) {
      await waitForServer(BASE)
    }
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    for (const capture of CAPTURES) {
      if (capture.slug.startsWith('h-')) {
        await seedMockAuthSession(page)
      }
      await page.goto(`${BASE}${capture.url}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForSelector(capture.selector, { timeout: 60000 })
      const outPath = resolve(OUTPUT_DIR, `${capture.slug}-1536x1024.png`)
      await page.screenshot({ path: outPath, fullPage: false })
      console.log(`saved ${outPath}`)
    }

    await browser.close()
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
