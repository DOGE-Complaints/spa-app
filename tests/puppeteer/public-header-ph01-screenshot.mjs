/**
 * PH-01 public header screenshots → T01 ui-baseline/
 *   PH01_PHASE=pre-implement node tests/puppeteer/public-header-ph01-screenshot.mjs
 *   PH01_PHASE=post-implement node tests/puppeteer/public-header-ph01-screenshot.mjs
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/task-spa-ph-01-t01-public-header-zones/ui-baseline',
)

const BASE = process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HEADER_URL)
const PHASE = process.env.PH01_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

const PRE_STATES = [
  {
    slug: 'desktop-board',
    file: `${PHASE}/desktop-board-header-1536x1024.png`,
    viewport: { width: 1536, height: 1024 },
    path: '/#/board',
  },
  {
    slug: 'mobile-board',
    file: `${PHASE}/mobile-board-header-390x844.png`,
    viewport: { width: 390, height: 844 },
    path: '/#/board',
  },
]

const POST_STATES = [
  {
    slug: 'desktop-board',
    file: `${PHASE}/desktop-board-header-1536x1024.png`,
    viewport: { width: 1536, height: 1024 },
    path: '/#/board',
  },
  {
    slug: 'how-it-works-active',
    file: `${PHASE}/how-it-works-active-desktop-1536x1024.png`,
    viewport: { width: 1536, height: 1024 },
    path: '/#/how-it-works',
  },
  {
    slug: 'mobile-menu-open',
    file: `${PHASE}/mobile-menu-open-390x844.png`,
    viewport: { width: 390, height: 844 },
    path: '/#/board',
    openMenu: true,
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
  const states = PHASE === 'pre-implement' ? PRE_STATES : POST_STATES
  const devServer = USE_EXISTING ? null : startViteDevServer()
  try {
    if (!USE_EXISTING) await waitForServer(`${BASE}/`)

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    for (const state of states) {
      await page.setViewport(state.viewport)
      await page.goto(`${BASE}${state.path}`, { waitUntil: 'networkidle0', timeout: 60000 })
      await page.waitForSelector('.header-strip, [data-testid="app-shell"]', { timeout: 15000 })
      if (state.openMenu) {
        await page.waitForSelector('[data-testid="public-header-menu-toggle"]', { timeout: 10000 })
        await page.click('[data-testid="public-header-menu-toggle"]')
        await page.waitForSelector('[data-testid="public-header-mobile-nav"]', { timeout: 5000 })
      }
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
