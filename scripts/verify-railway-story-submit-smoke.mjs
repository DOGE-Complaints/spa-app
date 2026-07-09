/**
 * Railway live smoke: story submit handoff page + gateway/identity reachability.
 *
 * Usage:
 *   SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app \
 *   GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
 *   IDENTITY_BASE_URL=https://doge-identity-service-tallinn-demo.up.railway.app \
 *   DRAFT_ID=optional-existing-draft \
 *   PUPPETEER_TEST_EMAIL=... PUPPETEER_TEST_PASSWORD=... \
 *   node ./scripts/verify-railway-story-submit-smoke.mjs
 */
import puppeteer from 'puppeteer'

const SPA_BASE = String(process.env.SPA_BASE_URL ?? 'https://spa-app-tallinn-demo.up.railway.app').replace(/\/+$/, '')
const GATEWAY_BASE = String(process.env.GATEWAY_BASE_URL ?? 'https://dogestonia-tallinn.up.railway.app').replace(/\/+$/, '')
const IDENTITY_BASE = String(process.env.IDENTITY_BASE_URL ?? 'https://doge-identity-service-tallinn-demo.up.railway.app').replace(/\/+$/, '')
const DRAFT_ID = String(process.env.DRAFT_ID ?? '1DWMzza5Y2JCQ7Na98FkeA').trim()
const EMAIL = process.env.PUPPETEER_TEST_EMAIL
const PASSWORD = process.env.PUPPETEER_TEST_PASSWORD

function log(label, detail) {
  console.log(`[story-submit-smoke] ${label}: ${detail}`)
}

function fail(message) {
  console.error(`[story-submit-smoke] FAIL: ${message}`)
  process.exit(1)
}

async function probeCors(name, url, origin) {
  const response = await fetch(url, {
    method: 'OPTIONS',
    headers: {
      Origin: origin,
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'authorization,content-type',
    },
  })
  log(name, `OPTIONS ${url} → ${response.status}`)
  return response.status
}

async function probeGatewayDraft(draftId) {
  const response = await fetch(`${GATEWAY_BASE}/story-drafts/${encodeURIComponent(draftId)}`)
  const body = await response.json().catch(() => ({}))
  log('gateway GET draft (no auth)', `${response.status} code=${body?.error?.code ?? 'n/a'}`)
  return response.status
}

async function loginIfConfigured(page) {
  if (!EMAIL || !PASSWORD) {
    log('login', 'skipped (set PUPPETEER_TEST_EMAIL/PUPPETEER_TEST_PASSWORD for full flow)')
    return false
  }
  await page.goto(`${SPA_BASE}/#/login`, { waitUntil: 'networkidle0', timeout: 60_000 })
  await page.waitForSelector('[data-testid="auth-email"]', { timeout: 15_000 })
  await page.type('[data-testid="auth-email"]', EMAIL, { delay: 20 })
  await page.type('[data-testid="auth-password"]', PASSWORD, { delay: 20 })
  await page.click('[data-testid="auth-submit"]')
  await page.waitForFunction(
    () => !window.location.hash.includes('/login'),
    { timeout: 30_000 },
  )
  log('login', 'success')
  return true
}

async function readHandoffState(page) {
  const overlay = await page.$('[data-testid="session-shell-overlay"]')
  if (overlay) {
    const text = await page.evaluate((el) => el.textContent ?? '', overlay)
    return { kind: 'session_shell', phase: null, detail: text.replace(/\s+/g, ' ').trim().slice(0, 160) }
  }
  const pageEl = await page.$('[data-testid="story-submit-page"]')
  if (!pageEl) {
    return { kind: 'missing', phase: null, detail: `url=${page.url()}` }
  }
  const phase = await page.evaluate((el) => el.dataset.storyHandoffPhase ?? '', pageEl)
  return { kind: 'handoff', phase, detail: phase }
}

async function runBrowserPhase(draftId) {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        log('browser console', msg.text())
      }
    })

    const loggedIn = await loginIfConfigured(page)
    const submitUrl = `${SPA_BASE}/#/story/submit?draft_id=${encodeURIComponent(draftId)}`
    await page.goto(submitUrl, { waitUntil: 'networkidle0', timeout: 60_000 })

    let state = await readHandoffState(page)
    log('ui state', `${state.kind} ${state.detail}`)

    if (state.kind === 'session_shell' && !loggedIn) {
      log('result', 'protected route without session — login required (expected)')
      return 0
    }

    if (state.kind === 'missing') {
      const url = page.url()
      if (!loggedIn && url.includes('/login') && url.includes('draft_id')) {
        log('result', 'redirected to login with draft_id preserved (expected without credentials)')
        return 0
      }
      fail(`story submit page not found (${state.detail})`)
    }

    if (state.phase === 'expired') {
      fail('draft expired or not found — create new draft via GPT')
    }
    if (state.phase === 'service_down') {
      fail('service_down — check gateway IDENTITY_BASE_URL and identity CORS')
    }
    if (state.phase === 'login_required') {
      if (loggedIn) fail('still login_required after login — session/token issue')
      log('result', 'login_required (expected without credentials)')
      return 0
    }

    if (state.phase === 'preview' && loggedIn) {
      await page.click('[data-testid="story-handoff-submit"]')
      await page.waitForFunction(
        () => window.location.hash.includes('/profile'),
        { timeout: 60_000 },
      )
      const profilePlaceholder = await page.$('[data-testid="protected-route-placeholder"]')
      if (!profilePlaceholder) {
        fail('expected profile placeholder after submit redirect')
      }
      log('result', `submit → profile redirect ok (${page.url()})`)
      return 0
    }

    if (state.phase === 'preview') {
      log('result', 'preview loaded — handoff OK (set credentials for submit→profile)')
      return 0
    }

    fail(`unexpected phase: ${state.phase}`)
  } finally {
    browser.process()?.kill('SIGKILL')
  }
}

await probeCors('identity CORS', `${IDENTITY_BASE}/me`, SPA_BASE)
await probeCors('gateway CORS', `${GATEWAY_BASE}/story-drafts/${encodeURIComponent(DRAFT_ID)}`, SPA_BASE)
await probeGatewayDraft(DRAFT_ID)
await runBrowserPhase(DRAFT_ID)
log('ok', 'smoke completed')
