/**
 * BUG-01 T01 evidence capture — local SPA + gateway.
 * Prints sanitized YAML only (no Bearer / tokens).
 *
 * Usage: cd spa-app && node ./scripts/bug01-capture-submit-http.mjs
 */
import { spawn } from 'node:child_process'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import process from 'node:process'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '..')
const GW_ROOT = path.resolve(SPA_ROOT, '../doge-complaints-gateway')
const OUT_DIR = path.join(SPA_ROOT, 'docs/analysis')
const SPA_BASE = process.env.SPA_BASE_URL ?? 'http://127.0.0.1:4173'
const GATEWAY_BASE = process.env.GATEWAY_BASE_URL ?? 'http://127.0.0.1:8000'

async function loadEnv(filePath) {
  const text = await readFile(filePath, 'utf8')
  const out = {}
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
    if (process.env[key] === undefined) process.env[key] = value
  }
  return out
}

function startVite() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    { cwd: SPA_ROOT, stdio: 'pipe', env: { ...process.env } },
  )
}

async function waitForUrl(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'manual' })
      if (res.ok || res.status === 304) return
    } catch {
      // wait
    }
    await sleep(500)
  }
  throw new Error(`Server not ready: ${url}`)
}

async function createDraft(serviceToken) {
  // Wire shape: StoryDraftStashRequest (GW-DRAFT-01 / intake v2) — no submitter
  const body = {
    schema_version: 'm2.story_intake_envelope.v2',
    narrative: {
      original_text: 'BUG-01 evidence: road issue near district center.',
      language: 'en',
      session_language: 'en',
      title: {
        en: 'BUG01 evidence draft',
        et: 'BUG01 tõend',
        ru: 'BUG01 доказательство',
      },
      description: {
        en: 'Full description for BUG-01 reproduce',
        et: 'Kirjeldus BUG-01',
        ru: 'Описание BUG-01',
      },
      summary: {
        en: 'Evidence summary',
        et: 'Kokkuvõte',
        ru: 'Сводка',
      },
      canonical_type: 'complaint',
      canonical_labels: ['roads'],
      location_query: 'Tallinn',
    },
  }
  const res = await fetch(`${GATEWAY_BASE}/story-drafts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serviceToken}`,
    },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  const draftId = json?.data?.draft_id ?? json?.draft_id
  if (!res.ok || !draftId) {
    throw new Error(
      `create draft failed status=${res.status} code=${json?.error?.code ?? 'n/a'}`,
    )
  }
  return String(draftId)
}

function redactBody(raw) {
  if (!raw || typeof raw !== 'object') return raw
  const clone = JSON.parse(JSON.stringify(raw))
  const scrub = (obj) => {
    if (!obj || typeof obj !== 'object') return
    for (const key of Object.keys(obj)) {
      const lower = key.toLowerCase()
      if (
        lower.includes('token') ||
        lower.includes('authorization') ||
        lower.includes('password') ||
        lower.includes('email') ||
        lower.includes('bearer')
      ) {
        obj[key] = '[redacted]'
      } else if (typeof obj[key] === 'object') {
        scrub(obj[key])
      }
    }
  }
  scrub(clone)
  return clone
}

async function run() {
  const spaEnv = await loadEnv(path.join(SPA_ROOT, '.env'))
  const gwEnv = await loadEnv(path.join(GW_ROOT, '.env'))
  const email = process.env.USER_EMAIL || spaEnv.USER_EMAIL
  const password = process.env.USER_PASSWORD || spaEnv.USER_PASSWORD
  // Prefer process.env so Railway live capture can override local .env token
  const serviceToken = process.env.SERVICE_API_TOKEN || gwEnv.SERVICE_API_TOKEN
  if (!email || !password) throw new Error('USER_EMAIL/USER_PASSWORD required')
  if (!serviceToken) throw new Error('SERVICE_API_TOKEN required (env or gateway .env)')

  const draftId = await createDraft(serviceToken)
  const draftIdRedacted = `${draftId.slice(0, 8)}…`

  let vite = null
  try {
    await waitForUrl(SPA_BASE, 3)
  } catch {
    vite = startVite()
    await waitForUrl(SPA_BASE)
  }

  const captured = {
    preview_get: { method: 'GET', path: '/story-drafts/{id}', status: null, status_text: '', response_content_type: '', response_body_sanitized: '', cors_failed: false },
    submit_post: { method: 'POST', path: '/story-drafts/{id}/submit', status: null, status_text: '', response_content_type: '', response_body_sanitized: '', cors_failed: false },
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    page.on('response', async (response) => {
      try {
        const url = response.url()
        if (!url.includes('/story-drafts/')) return
        const req = response.request()
        const method = req.method()
        const ct = response.headers()['content-type'] || ''
        let body = {}
        try {
          body = await response.json()
        } catch {
          body = { _parse: 'non-json' }
        }
        const entry = {
          method,
          path: url.replace(GATEWAY_BASE, '').split('?')[0].replace(/\/[^/]+$/, '/{id}') +
            (url.includes('/submit') ? '/submit'.replace('/submit', '') : ''),
          status: response.status(),
          status_text: response.statusText(),
          response_content_type: ct,
          response_body_sanitized: JSON.stringify(redactBody(body)).slice(0, 800),
          cors_failed: false,
        }
        // fix path labeling
        if (method === 'GET' && /\/story-drafts\/[^/]+$/.test(url) && !url.includes('/submit')) {
          captured.preview_get = {
            method: 'GET',
            path: '/story-drafts/{id}',
            status: response.status(),
            status_text: response.statusText(),
            response_content_type: ct,
            response_body_sanitized: JSON.stringify(redactBody(body)).slice(0, 800),
            cors_failed: false,
          }
        }
        if (method === 'POST' && url.includes('/submit')) {
          captured.submit_post = {
            method: 'POST',
            path: '/story-drafts/{id}/submit',
            status: response.status(),
            status_text: response.statusText(),
            response_content_type: ct,
            response_body_sanitized: JSON.stringify(redactBody(body)).slice(0, 800),
            cors_failed: false,
          }
        }
      } catch {
        // ignore listener errors
      }
    })

    page.on('requestfailed', (req) => {
      const url = req.url()
      if (url.includes('/submit')) {
        captured.submit_post.status = 0
        captured.submit_post.cors_failed = true
        captured.submit_post.status_text = req.failure()?.errorText || 'requestfailed'
      }
    })

    await page.goto(`${SPA_BASE}/#/login?redirect=${encodeURIComponent(`/story/submit?draft_id=${draftId}`)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    await page.waitForSelector('[data-testid="auth-email"]', { timeout: 30000 })
    await page.click('[data-testid="auth-email"]', { clickCount: 3 })
    await page.type('[data-testid="auth-email"]', email, { delay: 10 })
    await page.click('[data-testid="auth-password"]', { clickCount: 3 })
    await page.type('[data-testid="auth-password"]', password, { delay: 10 })
    await page.click('[data-testid="auth-submit"]')

    try {
      await page.waitForSelector('[data-auth-state="auth-success"]', { timeout: 45000 })
      const continueBtn = await page.$(
        '[data-auth-state="auth-success"] [data-testid="auth-submit"]',
      )
      if (continueBtn) await continueBtn.click()
    } catch {
      // may already land on handoff
    }

    await page.goto(`${SPA_BASE}/#/story/submit?draft_id=${encodeURIComponent(draftId)}`, {
      waitUntil: 'networkidle0',
      timeout: 90000,
    })
    await page.waitForSelector('[data-testid="story-submit-page"]', { timeout: 30000 })
    // Wait until resolving settles (preview / service_down / expired / …)
    await page.waitForFunction(
      () => {
        const el = document.querySelector('[data-testid="story-submit-page"]')
        const phase = el?.dataset?.storyHandoffPhase || ''
        return phase && phase !== 'resolving'
      },
      { timeout: 45000 },
    )
    await sleep(500)

    let phaseBefore = await page.$eval(
      '[data-testid="story-submit-page"]',
      (el) => el.dataset.storyHandoffPhase || '',
    )

    // If login redirected away and we landed without token, retry once after short wait
    if (phaseBefore === 'login_required' || phaseBefore === 'service_down') {
      await sleep(1500)
      await page.goto(`${SPA_BASE}/#/story/submit?draft_id=${encodeURIComponent(draftId)}`, {
        waitUntil: 'networkidle0',
        timeout: 90000,
      })
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-testid="story-submit-page"]')
          const phase = el?.dataset?.storyHandoffPhase || ''
          return phase && phase !== 'resolving'
        },
        { timeout: 45000 },
      )
      phaseBefore = await page.$eval(
        '[data-testid="story-submit-page"]',
        (el) => el.dataset.storyHandoffPhase || '',
      )
    }

    const submitBtn = await page.$('[data-testid="story-handoff-submit"]')
    if (submitBtn) {
      await submitBtn.click()
      await sleep(2500)
    } else {
      console.warn('No submit button; phase_before=', phaseBefore)
    }

    let phaseAfter = await page.$eval(
      '[data-testid="story-submit-page"]',
      (el) => el.dataset.storyHandoffPhase || '',
    ).catch(() => 'navigated-away')

    const serviceDown = Boolean(await page.$('[data-testid="story-handoff-service-down"]'))
    // AC: Submit + one Retry (or Retry alone if already service_down from failed GET)
    const retry = await page.$('[data-testid="story-handoff-retry"]')
    if (retry) {
      await retry.click()
      await sleep(2500)
      phaseAfter = await page.$eval(
        '[data-testid="story-submit-page"]',
        (el) => el.dataset.storyHandoffPhase || '',
      ).catch(() => phaseAfter)
    }

    const capturedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
    const yaml = `# Evidence capture — BUG-01 T01 (sanitized)
bug_key: STORY-SPA-BUG-01
uat_id: FE-HANDOFF-03
captured_at_utc: "${capturedAt}"
env:
  spa_origin: "${SPA_BASE}"
  gateway_base_observed: "${GATEWAY_BASE}"
draft_id_redacted: "${draftIdRedacted}"
preview_get:
  method: GET
  path: "/story-drafts/{id}"
  status: ${captured.preview_get.status ?? 'null'}
  status_text: "${captured.preview_get.status_text || ''}"
  response_content_type: "${captured.preview_get.response_content_type || ''}"
  response_body_sanitized: ${JSON.stringify(captured.preview_get.response_body_sanitized || '')}
  cors_failed: ${captured.preview_get.cors_failed}
submit_post:
  method: POST
  path: "/story-drafts/{id}/submit"
  status: ${captured.submit_post.status ?? 'null'}
  status_text: "${captured.submit_post.status_text || ''}"
  response_content_type: "${captured.submit_post.response_content_type || ''}"
  response_body_sanitized: ${JSON.stringify(captured.submit_post.response_body_sanitized || '')}
  cors_failed: ${captured.submit_post.cors_failed}
ui:
  phase_before_submit: "${phaseBefore}"
  phase_testid: "${serviceDown ? 'story-handoff-service-down' : phaseAfter}"
  phase_after: "${phaseAfter}"
  retry_same: ${serviceDown}
board_after:
  new_story_visible: null
`

    await mkdir(OUT_DIR, { recursive: true })
    const outPath = path.join(OUT_DIR, `evidence-STORY-SPA-BUG-01-submit-http-${capturedAt.replace(/[:.]/g, '')}.md`)
    const md = `# Evidence — STORY-SPA-BUG-01 submit HTTP (T01)

\`\`\`yaml
${yaml}
\`\`\`

## Notes
- Secrets redacted; draft id truncated.
- Captured via puppeteer against local SPA + gateway (${GATEWAY_BASE}).
`
    await writeFile(outPath, md, 'utf8')
    console.log('WROTE', outPath)
    console.log('preview_status', captured.preview_get.status)
    console.log('submit_status', captured.submit_post.status)
    console.log('service_down', serviceDown)
    console.log('phase_after', phaseAfter)
  } finally {
    await browser.close()
    if (vite && !vite.killed) {
      vite.kill('SIGTERM')
      await sleep(500)
    }
  }
}

run().catch((err) => {
  console.error(String(err?.stack || err))
  process.exit(1)
})
