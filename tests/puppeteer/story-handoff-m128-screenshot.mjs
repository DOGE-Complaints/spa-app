/**
 * Capture M128 story handoff states for ID-12 anchor T08.
 * Usage: PHASE=pre-implement|post-implement node ./tests/puppeteer/story-handoff-m128-screenshot.mjs
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
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t08-ui-anchor-m128-icons/ui-baseline',
  PHASE,
)

/** @type {Array<{ slug: string, url: string, selector: string }>} */
const CAPTURES = [
  {
    slug: 'a-resolving-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=resolving',
    selector: '[data-testid="story-handoff-resolving"]',
  },
  {
    slug: 'b-login-m128',
    url: '/#/story/submit?dev_handoff_phase=login_required',
    selector: '[data-testid="story-handoff-login"]',
  },
  {
    slug: 'c-preview-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=preview',
    selector: '[data-testid="story-handoff-preview"]',
  },
  {
    slug: 'd-verify-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=verify',
    selector: '[data-testid="story-handoff-verify"]',
  },
  {
    slug: 'e-submitting-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=submitting',
    selector: '[data-testid="story-handoff-submitting"]',
  },
  {
    slug: 'f-submitted-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=submitted',
    selector: '[data-testid="story-handoff-success"]',
  },
  {
    slug: 'g-expired-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=expired',
    selector: '[data-testid="story-handoff-expired"]',
  },
  {
    slug: 'h-service-down-m128',
    url: '/#/story/submit?draft_id=mock-draft-1&dev_handoff_phase=service_down',
    selector: '[data-testid="story-handoff-service-down"]',
  },
  {
    slug: 'e0-empty-m128',
    url: '/#/story/submit?dev_handoff_phase=empty',
    selector: '[data-testid="story-handoff-empty"]',
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
