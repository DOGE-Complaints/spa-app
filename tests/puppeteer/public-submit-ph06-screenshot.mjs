/**
 * PH-06 Submit GPT CTA — T02 ui-baseline screenshots
 *   PH06_PHASE=pre-implement node tests/puppeteer/public-submit-ph06-screenshot.mjs
 *   PH06_PHASE=post-implement node tests/puppeteer/public-submit-ph06-screenshot.mjs
 * Env: PUBLIC_SUBMIT_URL=http://127.0.0.1:4173 to reuse Vite.
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-06-submit-story-gpt-cta/task-spa-ph-06-t02-wire-nav-submit/ui-baseline',
)

const BASE = process.env.PUBLIC_SUBMIT_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_SUBMIT_URL)
const PHASE = process.env.PH06_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

const STATES = [
  {
    slug: 'a-board-nav-submit',
    file: `${PHASE}/a-board-nav-submit-1536x1024.png`,
    viewport: { width: 1536, height: 1024 },
    path: '/#/board',
    wait: '[data-testid="public-nav-submit"]',
  },
  {
    slug: 'b-how-it-works-submit-cta',
    file: `${PHASE}/b-how-it-works-submit-cta-1536x1024.png`,
    viewport: { width: 1536, height: 1024 },
    path: '/#/how-it-works',
    wait: '[data-testid="how-it-works-cta-submit"], [data-testid="public-nav-submit"]',
  },
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

    for (const state of STATES) {
      await page.setViewport(state.viewport)
      await page.goto(`${BASE}${state.path}`, { waitUntil: 'networkidle0', timeout: 60000 })
      await page.waitForSelector('[data-testid="public-header"]', { timeout: 15000 })
      await page.waitForSelector(state.wait, { timeout: 15000 })
      const out = path.join(UI_BASELINE, state.file)
      await page.screenshot({ path: out, fullPage: false })
      console.log('wrote', out)
    }

    await browser.close()
  } finally {
    if (devServer) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
