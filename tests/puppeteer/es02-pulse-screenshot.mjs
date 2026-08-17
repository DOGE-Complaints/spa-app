/**
 * ES-02 Network Pulse screenshots.
 *
 *   PHASE=pre-implement node tests/puppeteer/es02-pulse-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/es02-pulse-screenshot.mjs
 *
 * Intercepts Issues empty so discovery is visible. Pulse omit/bound via /tallinn/network-pulse.
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
const STORY_ROOT = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-02-network-pulse-block',
)
const PHASE = process.env.PHASE || 'post-implement'
const BASE = process.env.PUBLIC_BOARD_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const PULSE_BOUND = {
  data: {
    stories_collected: 42,
    languages: [
      { key: 'et', count: 20 },
      { key: 'ru', count: 12 },
    ],
    areas: [{ key: 'Kesklinn', count: 8 }],
    topics: [{ label: 'roads', axis: 'theme', count: 5 }],
    recent_stories_7d: 7,
  },
  trace_id: 'es02-shot',
}

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_LIFE_REALITY_MODE: 'GFL-DRIVEN',
        VITE_GATEWAY_BASE_URL: process.env.VITE_GATEWAY_BASE_URL || 'http://127.0.0.1:8765',
      },
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

async function gotoBoard(page) {
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
}

async function installRoutes(page, pulseMode) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    if (req.method() === 'GET' && /\/tallinn\/issues(\?|$)/.test(url) && !/\/tallinn\/issues\/[^/?\s]+/.test(url)) {
      await req
        .respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { issues: [] } }),
        })
        .catch(() => {})
      return
    }
    if (req.method() === 'GET' && /\/tallinn\/network-pulse(\?|$)/.test(url)) {
      if (pulseMode === 'omit') {
        await req
          .respond({
            status: 500,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'fail' }),
          })
          .catch(() => {})
        return
      }
      if (pulseMode === 'bound') {
        await req
          .respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(PULSE_BOUND),
          })
          .catch(() => {})
        return
      }
    }
    await req.continue().catch(() => {})
  })
}

function launchOpts() {
  return {
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }
}

async function shot(page, filePath, viewport) {
  await page.setViewport(viewport)
  await page.screenshot({ path: filePath })
}

async function main() {
  let devServer = null
  let browser = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  try {
    browser = await puppeteer.launch(launchOpts())

    if (PHASE === 'pre-implement') {
      const outDir = path.join(STORY_ROOT, 'task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/pre-implement')
      await mkdir(outDir, { recursive: true })
      const page = await browser.newPage()
      await installRoutes(page, 'none')
      await page.setViewport({ width: 1536, height: 1024 })
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="early-signal-slot-pulse"]', { timeout: 5000 })
      await shot(page, path.join(outDir, '01-board-default-1536x1024.png'), { width: 1536, height: 1024 })
      console.log(`ES02 UI-0 → ${outDir}`)
      return
    }

    const postDir = path.join(STORY_ROOT, 'task-spa-es-02-t02-pulse-omit-bound-ui/ui-baseline/post-implement')
    const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
    await mkdir(postDir, { recursive: true })
    await mkdir(storyDir, { recursive: true })

    const page = await browser.newPage()

    await installRoutes(page, 'omit')
    await page.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(page)
    await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 20000 })
    await page.waitForSelector('[data-testid="network-pulse-omit"]', { timeout: 20000 })
    await shot(page, path.join(postDir, '01-pulse-omit-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(page, path.join(storyDir, 'es02-pulse-omit-desktop.png'), { width: 1536, height: 1024 })

    await page.close()
    const pageBound = await browser.newPage()
    await installRoutes(pageBound, 'bound')
    await pageBound.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageBound)
    await pageBound.waitForSelector('[data-testid="network-pulse-bound"]', { timeout: 20000 })
    await shot(pageBound, path.join(postDir, '02-pulse-bound-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageBound, path.join(storyDir, 'es02-pulse-bound-desktop.png'), { width: 1536, height: 1024 })

    await shot(pageBound, path.join(postDir, '03-pulse-bound-390x844.png'), { width: 390, height: 844 })
    await shot(pageBound, path.join(storyDir, 'es02-pulse-bound-narrow.png'), { width: 390, height: 844 })

    await pageBound.close()
    const pageNarrowOmit = await browser.newPage()
    await installRoutes(pageNarrowOmit, 'omit')
    await pageNarrowOmit.setViewport({ width: 390, height: 844 })
    await gotoBoard(pageNarrowOmit)
    await pageNarrowOmit.waitForSelector('[data-testid="network-pulse-omit"]', { timeout: 20000 })
    await shot(pageNarrowOmit, path.join(storyDir, 'es02-pulse-omit-narrow.png'), { width: 390, height: 844 })

    console.log(`ES02 UI-3 + story-root → ${postDir} · ${storyDir}`)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
