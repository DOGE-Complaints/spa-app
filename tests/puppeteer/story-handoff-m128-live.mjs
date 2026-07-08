/**
 * Live E2E capture for M128 story handoff (STORY-SPA-ID-12).
 * Requires: gateway :8000, identity :8100, spa dev, env credentials.
 *
 * Usage:
 *   PUPPETEER_TEST_EMAIL=... PUPPETEER_TEST_PASSWORD=... \
 *   GATEWAY_SERVICE_API_TOKEN=... \
 *   npm run test:ui:story-handoff-m128-live
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = process.env.VERIFY_HOST_URL ?? 'http://127.0.0.1:4173'
const GATEWAY_BASE = (process.env.GATEWAY_BASE_URL ?? 'http://127.0.0.1:8000').replace(/\/+$/, '')
const IDENTITY_BASE = (process.env.IDENTITY_BASE_URL ?? 'http://127.0.0.1:8100').replace(/\/+$/, '')
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_HOST_URL)
const OUTPUT_DIR = resolve(
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t08-ui-anchor-m128-icons/ui-baseline/live-e2e',
)

/** @type {Record<string, 'live' | 'hybrid' | 'dev_handoff'>} */
const captureModes = {}

/**
 * @param {string} suffix
 */
function buildSeedPayload(suffix) {
  const title = {
    en: `Live Handoff Story ${suffix}`,
    et: `Live Handoff Lugu ${suffix}`,
    ru: `Live Handoff История ${suffix}`,
  }
  const summary = {
    en: 'Short summary for M128 live E2E preview.',
    et: 'Lühikokkuvõte live E2E eelvaateks.',
    ru: 'Краткое описание для live E2E предпросмотра.',
  }
  const description = {
    en: 'Full description body for civic story handoff live puppeteer test.',
    et: 'Täielik kirjeldus kodanikuloo live testiks.',
    ru: 'Полное описание для live теста handoff.',
  }
  const institution = {
    en: 'Tallinn City Hall',
    et: 'Tallinna Raekoda',
    ru: 'Таллиннская ратуша',
  }

  return {
    schema_version: 'm2.story_intake_envelope.v2',
    submitter: {
      external_user_id: `puppeteer-e2e-${suffix}`,
      identity_issuer: 'https://dogestonia.ee/eid',
    },
    narrative: {
      original_text: 'Live E2E handoff narrative for M128 story submit.',
      language: 'en',
      session_language: 'en',
      title,
      summary,
      description,
      institution,
      canonical_type: 'civic_issue',
      canonical_labels: ['transparency', 'participation'],
      location_query: 'Tallinn, Estonia',
    },
    narrative_title: title,
    narrative_summary: summary,
    narrative_description: description,
    narrative_institution: institution,
    narrative_canonical_type: 'civic_issue',
    narrative_canonical_labels: ['transparency', 'participation'],
    narrative_location_query: 'Tallinn, Estonia',
    narrative_session_language: 'en',
  }
}

async function preflight() {
  const checks = [
    { name: 'gateway', url: `${GATEWAY_BASE}/health` },
    { name: 'identity', url: `${IDENTITY_BASE}/health` },
  ]
  for (const check of checks) {
    const response = await fetch(check.url, { redirect: 'manual' })
    if (!response.ok) {
      throw new Error(`${check.name} health failed: ${check.url} → ${response.status}`)
    }
  }
}

async function resolveServiceToken() {
  if (process.env.GATEWAY_SERVICE_API_TOKEN?.trim()) {
    return process.env.GATEWAY_SERVICE_API_TOKEN.trim()
  }
  try {
    const envPath = resolve(process.cwd(), '../doge-complaints-gateway/.env')
    const raw = await readFile(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const match = line.match(/^SERVICE_API_TOKEN=(.+)$/)
      if (match && match[1].trim()) {
        return match[1].trim()
      }
    }
  } catch {
    // optional fallback
  }
  return null
}

/**
 * @param {string} serviceToken
 */
async function seedDraft(serviceToken) {
  const headers = {
    Authorization: `Bearer ${serviceToken}`,
    'X-Service-Token': serviceToken,
    'Content-Type': 'application/json',
  }
  const response = await fetch(`${GATEWAY_BASE}/story-drafts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildSeedPayload(`${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)),
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const hint =
      response.status === 401 && body?.error?.message?.includes('Missing service API token')
        ? ' Gateway SERVICE_API_TOKEN may be empty (check doge-complaints-gateway/.env — last duplicate wins). Restart gateway with a non-empty token.'
        : ''
    throw new Error(`seed draft failed: ${response.status} ${JSON.stringify(body)}.${hint}`)
  }
  const draftId = body?.data?.draft_id
  if (!draftId) {
    throw new Error(`seed draft missing draft_id: ${JSON.stringify(body)}`)
  }
  return draftId
}

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: process.cwd(),
      stdio: 'pipe',
      env: { ...process.env },
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

/**
 * @param {import('puppeteer').Page} page
 * @param {string} slug
 * @param {string} [selector]
 */
async function capture(page, slug, selector) {
  if (selector) {
    await page.waitForSelector(selector, { timeout: 60000 })
  }
  const outPath = resolve(OUTPUT_DIR, `${slug}-1536x1024.png`)
  await page.screenshot({ path: outPath, fullPage: false })
  console.log(`saved ${outPath}`)
  return outPath
}

/**
 * @param {import('puppeteer').Page} page
 * @param {string} email
 * @param {string} password
 * @param {string} [returnPath]
 */
async function login(page, email, password, returnPath) {
  const loginUrl = returnPath
    ? `${BASE}/#/login?next=${encodeURIComponent(returnPath)}`
    : `${BASE}/#/login`
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="auth-email"]', { timeout: 60000 })
  await page.$eval('[data-testid="auth-email"]', (el) => {
    el.value = ''
  })
  await page.$eval('[data-testid="auth-password"]', (el) => {
    el.value = ''
  })
  await page.type('[data-testid="auth-email"]', email, { delay: 15 })
  await page.type('[data-testid="auth-password"]', password, { delay: 15 })
  await page.click('[data-testid="auth-submit"]')
  await page.waitForSelector('[data-auth-state="auth-success"]', { timeout: 60000 })
  await page.click('[data-testid="auth-submit"]')
  await sleep(500)
}

async function run() {
  const email = process.env.PUPPETEER_TEST_EMAIL
  const password = process.env.PUPPETEER_TEST_PASSWORD
  const serviceToken = await resolveServiceToken()

  if (!email || !password) {
    throw new Error('Set PUPPETEER_TEST_EMAIL and PUPPETEER_TEST_PASSWORD env vars')
  }
  if (!serviceToken) {
    throw new Error(
      'Set GATEWAY_SERVICE_API_TOKEN env var or configure non-empty SERVICE_API_TOKEN in doge-complaints-gateway/.env',
    )
  }

  await mkdir(OUTPUT_DIR, { recursive: true })
  await preflight()

  let happyDraftId
  let seedLive = true
  try {
    happyDraftId = await seedDraft(serviceToken)
    console.log(`seeded happy=${happyDraftId}`)
  } catch (seedError) {
    seedLive = false
    happyDraftId = 'mock-draft-live-fallback'
    console.warn(`gateway seed failed — falling back to dev_handoff phases after live login: ${seedError.message}`)
  }

  /** @type {Record<string, 'live' | 'hybrid' | 'dev_handoff'>} */
  const modes = captureModes

  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    if (!USE_EXISTING_SERVER) {
      await waitForServer(BASE)
    }

    const browser = await puppeteer.launch({ headless: true })
    const submitPath = seedLive
      ? `/story/submit?draft_id=${encodeURIComponent(happyDraftId)}`
      : '/story/submit?dev_handoff_phase=preview'

    // --- State B: unauthenticated redirect to login (live) ---
    const pageB = await browser.newPage()
    await pageB.setViewport({ width: 1536, height: 1024 })
    const bTarget = seedLive
      ? `${BASE}/#/story/submit?draft_id=${encodeURIComponent(happyDraftId)}`
      : `${BASE}/#/story/submit?draft_id=live-b-${Date.now()}`
    await pageB.goto(bTarget, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await pageB.waitForFunction(
      () => window.location.hash.includes('/login'),
      { timeout: 60000 },
    )
    captureModes['b-login-m128'] = 'live'
    await capture(pageB, 'b-login-m128', '[data-testid="auth-page"]')
    await pageB.close()

    // --- Authenticated happy path ---
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await login(page, email, password, submitPath)

    if (!seedLive) {
      for (const [slug, phase, selector, mode] of [
        ['a-resolving-m128', 'resolving', '[data-testid="story-handoff-resolving"]', 'hybrid'],
        ['c-preview-m128', 'preview', '[data-testid="story-handoff-preview"]', 'hybrid'],
        ['d-verify-m128', 'verify', '[data-testid="story-handoff-verify"]', 'hybrid'],
        ['e-submitting-m128', 'submitting', '[data-testid="story-handoff-submitting"]', 'hybrid'],
        ['f-submitted-m128', 'submitted', '[data-testid="story-handoff-success"]', 'hybrid'],
      ]) {
        modes[slug] = mode
        await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=${phase}`, {
          waitUntil: 'domcontentloaded',
          timeout: 60000,
        })
        await capture(page, slug, selector)
      }
    } else {
    // --- State A: resolving (live, re-navigate to catch loader) ---
    await page.goto(`${BASE}/#${submitPath}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    try {
      await page.waitForSelector('[data-testid="story-handoff-resolving"]', { timeout: 2500 })
      captureModes['a-resolving-m128'] = 'live'
      await capture(page, 'a-resolving-m128')
    } catch {
      captureModes['a-resolving-m128'] = 'live'
      await capture(page, 'a-resolving-m128', '[data-testid="story-submit-page"]')
    }

    // --- State C: preview (live) ---
    captureModes['c-preview-m128'] = 'live'
    await capture(page, 'c-preview-m128', '[data-testid="story-handoff-preview"]')

    // --- State E + D/F: submit click ---
    await page.click('[data-testid="story-handoff-submit"]')
    const branch = await Promise.race([
      page
        .waitForSelector('[data-testid="story-handoff-submitting"]', { timeout: 8000 })
        .then(() => 'submitting'),
      page
        .waitForSelector('[data-testid="story-handoff-verify"]', { timeout: 8000 })
        .then(() => 'verify'),
      page
        .waitForSelector('[data-testid="story-handoff-success"]', { timeout: 8000 })
        .then(() => 'success'),
      page
        .waitForSelector('[data-testid="story-handoff-expired"]', { timeout: 8000 })
        .then(() => 'expired'),
      page
        .waitForSelector('[data-testid="story-handoff-service-down"]', { timeout: 8000 })
        .then(() => 'service_down'),
    ]).catch(() => 'unknown')

    if (branch === 'submitting') {
      captureModes['e-submitting-m128'] = 'live'
      await capture(page, 'e-submitting-m128')
      await page.waitForSelector('[data-testid="story-handoff-success"]', { timeout: 60000 })
      captureModes['f-submitted-m128'] = 'live'
      await capture(page, 'f-submitted-m128', '[data-testid="story-handoff-success"]')
      captureModes['d-verify-m128'] = 'hybrid'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=verify`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'd-verify-m128', '[data-testid="story-handoff-verify"]')
    } else if (branch === 'verify') {
      captureModes['d-verify-m128'] = 'live'
      await capture(page, 'd-verify-m128', '[data-testid="story-handoff-verify"]')
      captureModes['e-submitting-m128'] = 'hybrid'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=submitting`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'e-submitting-m128', '[data-testid="story-handoff-submitting"]')
      captureModes['f-submitted-m128'] = 'hybrid'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=submitted`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'f-submitted-m128', '[data-testid="story-handoff-success"]')
    } else if (branch === 'success') {
      captureModes['e-submitting-m128'] = 'hybrid'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=submitting`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'e-submitting-m128', '[data-testid="story-handoff-submitting"]')
      captureModes['f-submitted-m128'] = 'live'
      await capture(page, 'f-submitted-m128', '[data-testid="story-handoff-success"]')
      captureModes['d-verify-m128'] = 'hybrid'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=verify`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'd-verify-m128', '[data-testid="story-handoff-verify"]')
    } else {
      console.warn(`unexpected submit branch: ${branch}; using dev_handoff for D/E/F`)
      for (const [slug, phase, selector] of [
        ['d-verify-m128', 'verify', '[data-testid="story-handoff-verify"]'],
        ['e-submitting-m128', 'submitting', '[data-testid="story-handoff-submitting"]'],
        ['f-submitted-m128', 'submitted', '[data-testid="story-handoff-success"]'],
      ]) {
        captureModes[slug] = 'dev_handoff'
        await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=${phase}`, {
          waitUntil: 'domcontentloaded',
          timeout: 60000,
        })
        await capture(page, slug, selector)
      }
    }
    }

    // --- State G: expired ---
    try {
      await page.goto(`${BASE}/#/story/submit?draft_id=expired-draft-not-found-e2e`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'g-expired-m128', '[data-testid="story-handoff-expired"]')
      captureModes['g-expired-m128'] = seedLive ? 'live' : 'hybrid'
    } catch (error) {
      console.warn(`expired live capture failed, using dev_handoff: ${error.message}`)
      captureModes['g-expired-m128'] = 'dev_handoff'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=expired`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'g-expired-m128', '[data-testid="story-handoff-expired"]')
    }

    // --- State H: service down (dev_handoff) ---
    captureModes['h-service-down-m128'] = 'dev_handoff'
    await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=service_down`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    await capture(page, 'h-service-down-m128', '[data-testid="story-handoff-service-down"]')

    // --- State E0: empty ---
    try {
      await page.evaluate(() => {
        sessionStorage.removeItem('dogestonia.story_handoff.draft_id')
      })
      await page.goto(`${BASE}/#/story/submit`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await capture(page, 'e0-empty-m128', '[data-testid="story-handoff-empty"]')
      captureModes['e0-empty-m128'] = 'live'
    } catch (error) {
      console.warn(`empty live capture failed, using dev_handoff: ${error.message}`)
      captureModes['e0-empty-m128'] = 'dev_handoff'
      await page.goto(`${BASE}/#/story/submit?dev_handoff_phase=empty`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await capture(page, 'e0-empty-m128', '[data-testid="story-handoff-empty"]')
    }

    await writeFile(
      resolve(OUTPUT_DIR, 'capture-modes.json'),
      `${JSON.stringify(captureModes, null, 2)}\n`,
    )

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
