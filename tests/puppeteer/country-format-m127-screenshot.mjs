/**
 * Capture M127 states A/B/C/D for ID-11 anchor T04.
 * Usage: PHASE=pre-implement|post-implement node ./tests/puppeteer/country-format-m127-screenshot.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = process.env.VERIFY_HOST_URL ?? 'http://localhost:4173'
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_HOST_URL)
const PHASE = process.env.PHASE ?? 'post-implement'
const OUTPUT_DIR = resolve(
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-11-per-country-phone-format-validation/task-spa-id-11-t04-phone-input-panel-m127-validation-ui/ui-baseline',
  PHASE,
)

/** @type {Array<{ slug: string, setup: (page: import('puppeteer').Page) => Promise<void> }>} */
const CAPTURES = [
  {
    slug: 'valid-ee-m127a',
    async setup(page) {
      await openPhonePanel(page)
      await fillLocalDigits(page, '55555555')
    },
  },
  {
    slug: 'invalid-ee-m127b',
    async setup(page) {
      await openPhonePanel(page)
      await fillLocalDigits(page, '55555')
    },
  },
  {
    slug: 'different-country-de-m127c',
    async setup(page) {
      await openPhonePanel(page)
      await selectCountry(page, 'DE')
    },
  },
  {
    slug: 'empty-m127d',
    async setup(page) {
      await openPhonePanel(page)
    },
  },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', 'localhost', '--port', '4173', '--strictPort'],
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
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: 'mock-user-unverified',
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
        user: {
          id: 'mock-user-unverified',
          email: 'mock@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        },
      }),
    )
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

/** @param {import('puppeteer').Page} page */
async function openPhonePanel(page) {
  await page.goto(`${BASE}/#/verify`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="phone-verification-disclosure-send"]', { timeout: 15000 })
  await page.click('[data-testid="phone-verification-disclosure-send"]')
  await page.waitForSelector('[data-testid="phone-verification-phone-input"]', { timeout: 15000 })
}

/** @param {import('puppeteer').Page} page */
async function fillLocalDigits(page, digits) {
  const input = await page.$('[data-testid="phone-verification-local-input"]')
  if (!input) throw new Error('phone-verification-local-input missing')
  await input.click({ clickCount: 3 })
  await input.type(digits)
}

/** @param {import('puppeteer').Page} page */
async function selectCountry(page, code) {
  await page.click('[data-testid="phone-country-selector-trigger"]')
  await page.waitForSelector('[data-testid="phone-country-selector-dropdown"]', { timeout: 10000 })
  await page.click(`[data-testid="phone-country-option-${code}"]`)
  await page.waitForSelector(`[data-testid="phone-verification-phone-input"][data-phone-country-supported]`, {
    timeout: 10000,
  })
}

/** @param {import('puppeteer').Page} page */
async function screenshotPanel(page, outputPath) {
  const panel = await page.$('[data-testid="phone-verification-phone-input"]')
  if (!panel) throw new Error('phone-verification-phone-input not found')
  await writeFile(outputPath, await panel.screenshot({ type: 'png' }))
  process.stdout.write(`saved: ${outputPath}\n`)
}

async function run() {
  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    await waitForServer(`${BASE}/`)
    await mkdir(OUTPUT_DIR, { recursive: true })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await seedMockAuthSession(page)

    for (const capture of CAPTURES) {
      await seedMockAuthSession(page)
      await capture.setup(page)
      await screenshotPanel(page, resolve(OUTPUT_DIR, `${capture.slug}-1536x1024.png`))
    }

    await browser.close()
  } finally {
    if (devServer && !devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
