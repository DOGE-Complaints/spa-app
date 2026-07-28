/**
 * CAB-07 UI-0 / UI-3 anchor screenshots → task ui-baseline/{pre,post}-implement/
 * Usage:
 *   CAB07_PHASE=pre-implement node ./tests/puppeteer/cabinet-page-states-cab07-screenshot.mjs
 *   CAB07_PHASE=post-implement node ./tests/puppeteer/cabinet-page-states-cab07-screenshot.mjs
 * Expects Vite on :4173 with VITE_IDENTITY_MOCK_MODE=true (or set CAB07_URL).
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const PHASE = process.env.CAB07_PHASE === 'post-implement' ? 'post-implement' : 'pre-implement'
const OUT_DIR = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-07-cabinet-page-states/task-spa-cab-07-t01-m23-composite-new-user-empty/ui-baseline',
  PHASE,
)
const BASE = process.env.CAB07_URL ?? 'http://127.0.0.1:4173'
const VIEWPORT = { width: 1536, height: 1024 }

async function seedMockAuth(page, { profile = {}, mockMeError = null } = {}) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(
    ({ profileOverride, errorFlag }) => {
      localStorage.setItem('dogestonia-remember-me', 'true')
      const expiresAt = Math.floor(Date.now() / 1000) + 7200
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const payload = btoa(
        JSON.stringify({ sub: 'mock-user-cab07', exp: expiresAt, role: 'authenticated' }),
      )
      localStorage.setItem(
        'dogestonia-auth',
        JSON.stringify({
          access_token: `${header}.${payload}.mock-signature`,
          refresh_token: 'mock-refresh-token',
          expires_at: expiresAt,
          expires_in: 7200,
          token_type: 'bearer',
          user: {
            id: 'mock-user-cab07',
            email: 'mock@example.com',
            aud: 'authenticated',
            role: 'authenticated',
          },
        }),
      )
      sessionStorage.removeItem('dogestonia-auth')
      sessionStorage.removeItem('doge.force-cabinet-loading')
      sessionStorage.removeItem('doge.civic-preview')
      sessionStorage.removeItem('doge.story-activity-preview')
      sessionStorage.removeItem('doge.wallet-preview')
      sessionStorage.removeItem('doge.contrib-preview')
      if (errorFlag) {
        sessionStorage.setItem('doge.mock-me-error', errorFlag)
        sessionStorage.removeItem('doge.mock-profile')
      } else {
        sessionStorage.removeItem('doge.mock-me-error')
        sessionStorage.setItem(
          'doge.mock-profile',
          JSON.stringify({
            display_name: 'New User',
            role: 'citizen',
            email: 'newuser@example.com',
            created_at: '2026-07-28T12:00:00Z',
            status: 'active',
            phone_verified: false,
            phone_verified_at: null,
            phone_dial_prefix: null,
            ...profileOverride,
          }),
        )
      }
    },
    { profileOverride: profile, errorFlag: mockMeError },
  )
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function shot(page, name) {
  const outPath = path.join(OUT_DIR, `${name}-1536x1024.png`)
  await page.screenshot({ path: outPath, fullPage: false })
  console.log('wrote', outPath)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)

  // State A — M23 new-user composite
  await seedMockAuth(page, {})
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"]', { timeout: 90000 })
  await sleep(800)
  await shot(page, 'm23-new-user-composite-empty')

  // State B — M22 profile load error (post: in-page ErrorPanel)
  await seedMockAuth(page, { mockMeError: 'profile_load_failed' })
  await page.goto(`${BASE}/#/profile`, { waitUntil: 'networkidle0', timeout: 90000 })
  await page.waitForSelector('[data-testid="cabinet-profile-error"]', { timeout: 90000 }).catch(() => null)
  await sleep(1200)
  await shot(page, 'm22-profile-load-error')

  await browser.close()
  console.log(`CAB-07 ${PHASE} screenshots done`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
