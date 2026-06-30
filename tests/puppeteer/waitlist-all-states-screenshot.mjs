/**
 * Capture all M123 waitlist states (A–D) for story anchor T03.
 * Usage: node ./tests/puppeteer/waitlist-all-states-screenshot.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = 'http://localhost:4173'
const OUTPUT_DIR = resolve(
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-07-country-waitlist/task-spa-id-07-t03-country-not-supported-panel-m123a/ui-baseline/post-implement',
)

/** @type {Array<{ slug: string, testId: string }>} */
const CAPTURES = [
  { slug: 'not-supported-m123a', testId: 'waitlist-not-supported-panel' },
  { slug: 'form-m123b', testId: 'waitlist-form-panel' },
  { slug: 'joined-m123c', testId: 'waitlist-joined-panel' },
  { slug: 'error-m123d-network', testId: 'waitlist-error-panel' },
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

/**
 * @param {import('puppeteer').Page} page
 */
async function triggerCountryNotAllowedHandoff(page) {
  await page.goto(`${BASE}/#/verify`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="phone-verification-disclosure-send"]', { timeout: 15000 })
  await page.click('[data-testid="phone-verification-disclosure-send"]')
  await page.click('[data-testid="phone-verification-local-input"]', { clickCount: 3 })
  await page.type('[data-testid="phone-verification-local-input"]', '88888888')
  await page.click('[data-testid="phone-verification-send-code"]')
  await page.waitForSelector('[data-testid="phone-verification-error-country-not-allowed"]', {
    timeout: 15000,
  })
  await page.click('[data-testid="phone-verification-error-primary"]')
  await page.waitForSelector('[data-testid="waitlist-not-supported-panel"]', { timeout: 15000 })
}

/**
 * @param {import('puppeteer').Page} page
 * @param {string} testId
 * @param {string} outputPath
 */
async function screenshotPanel(page, testId, outputPath) {
  const panel = await page.$(`[data-testid="${testId}"]`)
  if (!panel) throw new Error(`Panel not found: ${testId}`)
  const pngBuffer = await panel.screenshot({ type: 'png' })
  await writeFile(outputPath, pngBuffer)
  process.stdout.write(`saved: ${outputPath}\n`)
}

/**
 * @param {import('puppeteer').Page} page
 * @param {string} testId
 * @param {string} value
 */
async function fillInput(page, testId, value) {
  const selector = `[data-testid="${testId}"]`
  await page.waitForSelector(selector, { timeout: 15000 })
  await page.click(selector, { clickCount: 3 })
  await page.type(selector, value)
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer(`${BASE}/`)
    await mkdir(OUTPUT_DIR, { recursive: true })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await seedMockAuthSession(page)

    // State A — Country Not Supported
    await triggerCountryNotAllowedHandoff(page)
    await screenshotPanel(
      page,
      CAPTURES[0].testId,
      resolve(OUTPUT_DIR, `${CAPTURES[0].slug}-1536x1024.png`),
    )

    // State B — Waitlist Form
    await page.click('[data-testid="waitlist-join-cta"]')
    await page.waitForSelector(`[data-testid="${CAPTURES[1].testId}"]`, { timeout: 15000 })
    await screenshotPanel(
      page,
      CAPTURES[1].testId,
      resolve(OUTPUT_DIR, `${CAPTURES[1].slug}-1536x1024.png`),
    )

    // State C — Joined
    await fillInput(page, 'waitlist-form-email', `waitlist-${Date.now()}@example.com`)
    await page.click('[data-testid="waitlist-form-submit"]')
    await page.waitForSelector(`[data-testid="${CAPTURES[2].testId}"]`, { timeout: 15000 })
    await screenshotPanel(
      page,
      CAPTURES[2].testId,
      resolve(OUTPUT_DIR, `${CAPTURES[2].slug}-1536x1024.png`),
    )

    // State D — Submission Error (fresh page → form → network fixture)
    const errorPage = await browser.newPage()
    await errorPage.setViewport({ width: 1536, height: 1024 })
    await seedMockAuthSession(errorPage)
    await triggerCountryNotAllowedHandoff(errorPage)
    await errorPage.click('[data-testid="waitlist-join-cta"]')
    await errorPage.waitForSelector(`[data-testid="${CAPTURES[1].testId}"]`, { timeout: 15000 })
    await fillInput(errorPage, 'waitlist-form-email', 'network@test.com')
    await errorPage.click('[data-testid="waitlist-form-submit"]')
    await errorPage.waitForSelector(`[data-testid="${CAPTURES[3].testId}"]`, { timeout: 15000 })
    await screenshotPanel(
      errorPage,
      CAPTURES[3].testId,
      resolve(OUTPUT_DIR, `${CAPTURES[3].slug}-1536x1024.png`),
    )

    await errorPage.close()
    await browser.close()
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
