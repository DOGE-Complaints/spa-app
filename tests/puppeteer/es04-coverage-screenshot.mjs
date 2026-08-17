/**
 * ES-04 Coverage trio screenshots (M139).
 *
 *   PHASE=pre-implement node tests/puppeteer/es04-coverage-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/es04-coverage-screenshot.mjs
 *
 * Intercepts Issues empty so discovery is visible. No coverage HTTP.
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
  'docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution',
)
const PHASE = process.env.PHASE || 'post-implement'
const BASE = process.env.PUBLIC_BOARD_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

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
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-es04-test',
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

async function installRoutes(page) {
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
      await req
        .respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
            data: { stories_collected: 4, areas: ['Lasnamäe'], languages: ['et'], topics: ['mobility'] },
            trace_id: 'es04-shot',
          }),
        })
        .catch(() => {})
      return
    }
    if (req.method() === 'GET' && /\/tallinn\/emerging-signals(\?|$)/.test(url)) {
      await req
        .respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'es04-empty' }),
        })
        .catch(() => {})
      return
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
      const outDir = path.join(STORY_ROOT, 'task-spa-es-04-t01-whats-missing-abstract/ui-baseline/pre-implement')
      await mkdir(outDir, { recursive: true })
      const page = await browser.newPage()
      await installRoutes(page)
      await page.setViewport({ width: 1536, height: 1024 })
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="early-signal-slot-missing"]', { timeout: 5000 })
      await shot(page, path.join(outDir, '01-board-default-1536x1024.png'), { width: 1536, height: 1024 })
      await shot(page, path.join(outDir, '02-board-narrow-390x844.png'), { width: 390, height: 844 })
      console.log(`ES04 UI-0 → ${outDir}`)
      return
    }

    const postDir = path.join(STORY_ROOT, 'task-spa-es-04-t01-whats-missing-abstract/ui-baseline/post-implement')
    const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
    await mkdir(postDir, { recursive: true })
    await mkdir(storyDir, { recursive: true })

    const page = await browser.newPage()
    await installRoutes(page)
    await page.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(page)
    await page.waitForSelector('[data-testid="picture-forming"]', { timeout: 20000 })
    await page.waitForSelector('[data-testid="whats-missing"]', { timeout: 5000 })
    await page.waitForSelector('[data-testid="help-complete-picture"]', { timeout: 5000 })
    await shot(page, path.join(postDir, '01-coverage-default-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(page, path.join(storyDir, 'es04-coverage-default-desktop.png'), { width: 1536, height: 1024 })

    await page.waitForSelector('[data-testid="help-complete-cta"]', { timeout: 5000 })
    await shot(page, path.join(postDir, '02-coverage-cta-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(page, path.join(storyDir, 'es04-coverage-cta-desktop.png'), { width: 1536, height: 1024 })
    await page.close()

    const pageNarrow = await browser.newPage()
    await installRoutes(pageNarrow)
    await pageNarrow.setViewport({ width: 390, height: 844 })
    await gotoBoard(pageNarrow)
    await pageNarrow.waitForSelector('[data-testid="picture-forming"]', { timeout: 20000 })
    await shot(pageNarrow, path.join(postDir, '03-coverage-narrow-390x844.png'), { width: 390, height: 844 })
    await shot(pageNarrow, path.join(storyDir, 'es04-coverage-narrow.png'), { width: 390, height: 844 })

    console.log(`ES04 UI-3 + story-root → ${postDir} · ${storyDir}`)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
