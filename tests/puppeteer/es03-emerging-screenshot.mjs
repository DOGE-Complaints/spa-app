/**
 * ES-03 Emerging Signals screenshots.
 *
 *   PHASE=pre-implement node tests/puppeteer/es03-emerging-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/es03-emerging-screenshot.mjs
 *
 * Intercepts Issues empty so discovery is visible. Emerging empty/cards via /tallinn/emerging-signals.
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
  'docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-03-emerging-signals-provisional',
)
const PHASE = process.env.PHASE || 'post-implement'
const BASE = process.env.PUBLIC_BOARD_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const EMERGING_CARDS = {
  data: {
    signals: [
      { label: 'Public transport reliability', axis: 'mobility', story_count: 6 },
      { label: 'Evening access to local services', axis: 'access', story_count: 3 },
    ],
    top_n: 10,
  },
  trace_id: 'es03-shot',
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

async function installRoutes(page, emergingMode) {
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
          status: 500,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'fail' }),
        })
        .catch(() => {})
      return
    }
    if (req.method() === 'GET' && /\/tallinn\/emerging-signals(\?|$)/.test(url)) {
      if (emergingMode === 'fail') {
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
      if (emergingMode === 'empty') {
        await req
          .respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'es03-empty' }),
          })
          .catch(() => {})
        return
      }
      if (emergingMode === 'cards') {
        await req
          .respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(EMERGING_CARDS),
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
      const outDir = path.join(STORY_ROOT, 'task-spa-es-03-t02-emerging-cards-empty/ui-baseline/pre-implement')
      await mkdir(outDir, { recursive: true })
      const page = await browser.newPage()
      await installRoutes(page, 'none')
      await page.setViewport({ width: 1536, height: 1024 })
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="early-signal-slot-emerging"]', { timeout: 5000 })
      await shot(page, path.join(outDir, '01-board-default-1536x1024.png'), { width: 1536, height: 1024 })
      console.log(`ES03 UI-0 → ${outDir}`)
      return
    }

    const postDir = path.join(STORY_ROOT, 'task-spa-es-03-t02-emerging-cards-empty/ui-baseline/post-implement')
    const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
    await mkdir(postDir, { recursive: true })
    await mkdir(storyDir, { recursive: true })

    const pageEmpty = await browser.newPage()
    await installRoutes(pageEmpty, 'empty')
    await pageEmpty.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageEmpty)
    await pageEmpty.waitForSelector('[data-testid="board-early-signal-discovery"]', { timeout: 20000 })
    await pageEmpty.waitForSelector('[data-testid="emerging-signals-empty"]', { timeout: 20000 })
    await shot(pageEmpty, path.join(postDir, '01-emerging-empty-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageEmpty, path.join(storyDir, 'es03-emerging-empty-desktop.png'), { width: 1536, height: 1024 })
    await pageEmpty.close()

    const pageFail = await browser.newPage()
    await installRoutes(pageFail, 'fail')
    await pageFail.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageFail)
    await pageFail.waitForSelector('[data-testid="emerging-signals-empty"]', { timeout: 20000 })
    await shot(pageFail, path.join(postDir, '02-emerging-fail-omit-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageFail, path.join(storyDir, 'es03-emerging-fail-omit-desktop.png'), { width: 1536, height: 1024 })
    await pageFail.close()

    const pageCards = await browser.newPage()
    await installRoutes(pageCards, 'cards')
    await pageCards.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageCards)
    await pageCards.waitForSelector('[data-testid="emerging-signals"]', { timeout: 20000 })
    await pageCards.waitForSelector('[data-testid="emerging-signal-card"]', { timeout: 10000 })
    await shot(pageCards, path.join(postDir, '03-emerging-cards-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageCards, path.join(storyDir, 'es03-emerging-cards-desktop.png'), { width: 1536, height: 1024 })
    await shot(pageCards, path.join(postDir, '04-emerging-cards-390x844.png'), { width: 390, height: 844 })
    await shot(pageCards, path.join(storyDir, 'es03-emerging-cards-narrow.png'), { width: 390, height: 844 })
    await pageCards.close()

    const pageNarrowEmpty = await browser.newPage()
    await installRoutes(pageNarrowEmpty, 'empty')
    await pageNarrowEmpty.setViewport({ width: 390, height: 844 })
    await gotoBoard(pageNarrowEmpty)
    await pageNarrowEmpty.waitForSelector('[data-testid="emerging-signals-empty"]', { timeout: 20000 })
    await shot(pageNarrowEmpty, path.join(storyDir, 'es03-emerging-empty-narrow.png'), { width: 390, height: 844 })

    console.log(`ES03 UI-3 + story-root → ${postDir} · ${storyDir}`)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
