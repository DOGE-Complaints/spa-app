/**
 * SSR-03 Board list|map screenshots (M142).
 *
 *   PHASE=pre-implement node tests/puppeteer/ssr03-list-map-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/ssr03-list-map-screenshot.mjs
 *   EDGE_ONLY=1 PHASE=post-implement …  # Edge pack only (skip Happy map)
 */
import { mkdir, copyFile } from 'node:fs/promises'
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
  'docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle',
)
const ANCHOR_BASELINE = path.join(
  STORY_ROOT,
  'task-spa-ssr-03-t02-map-pins-cluster-popup/ui-baseline',
)
const PHASE = process.env.PHASE || 'post-implement'
const EDGE_ONLY = process.env.EDGE_ONLY === '1'
const PORT = process.env.SSR03_PORT || '4180'
const BASE = process.env.PUBLIC_BOARD_URL ?? `http://127.0.0.1:${PORT}`
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const WITH_GEO = {
  id: 'ISS-SSR-03-GEO',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: { en: 'Streetlamp outage', et: 'Tänavalambi rike', ru: 'Неисправность фонаря' },
  summary: { en: 'Lamp dark on the corner.', et: 'Lamp.', ru: 'Фонарь.' },
  created_at: '2026-09-01T00:00:00Z',
  geo: { lat: 59.437, lon: 24.7536, label: 'Vabaduse väljak' },
}

const CIVIC_ONLY = {
  id: 'ISS-SSR-03-CIVIC',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: { en: 'Noise complaint', et: 'Müra', ru: 'Шум' },
  summary: { en: 'Late music.', et: 'Muusika.', ru: 'Музыка.' },
  created_at: '2026-09-01T00:00:00Z',
}

function listFixture(mode) {
  if (mode === 'geo') return { data: { issues: [WITH_GEO, CIVIC_ONLY] } }
  if (mode === 'civic') return { data: { issues: [CIVIC_ONLY] } }
  return { data: { issues: [WITH_GEO, CIVIC_ONLY] } }
}

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_LIFE_REALITY_MODE: 'GFL-DRIVEN',
        VITE_GATEWAY_BASE_URL: process.env.VITE_GATEWAY_BASE_URL || 'http://127.0.0.1:8765',
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-ssr03-test',
      },
    },
  )
}

async function waitForServer(url, attempts = 60) {
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

async function installRoutes(page, mode) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    const headers = { 'Access-Control-Allow-Origin': '*' }
    try {
      if (req.method() === 'GET' && /\/(?:node|tallinn)\/issues(\?|$)/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify(listFixture(mode)),
        })
        return
      }
      if (/\/(?:node|tallinn)\/network-pulse/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: {}, trace_id: 'ssr03-pulse' }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/emerging-signals/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'ssr03-emerging' }),
        })
        return
      }
      // Avoid CDP screenshot hangs on MapLibre/Carto tile streaming (not the maplibre-gl JS module)
      if (/basemaps\.cartocdn\.com|demotiles\.maplibre\.org|tile\.openstreetmap\.org/i.test(url)) {
        await req.abort()
        return
      }
      await req.continue()
    } catch {
      // ignore
    }
  })
}

async function gotoBoard(page) {
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
}

async function snap(page, filePath) {
  // Drop canvases (MapLibre/WebGL) that can stall CDP Element.screenshot
  await page.evaluate(() => {
    document.querySelectorAll('canvas').forEach((c) => c.remove())
  }).catch(() => {})
  const buf = await page.screenshot({
    type: 'png',
    encoding: 'binary',
    captureBeyondViewport: false,
  })
  const { writeFile } = await import('node:fs/promises')
  await writeFile(filePath, buf)
}

async function main() {
  const outDir =
    PHASE === 'pre-implement'
      ? path.join(ANCHOR_BASELINE, 'pre-implement')
      : path.join(ANCHOR_BASELINE, 'post-implement')
  const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
  await mkdir(outDir, { recursive: true })
  await mkdir(storyDir, { recursive: true })

  let devServer = null
  let browser = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  try {
    browser = await puppeteer.launch({
      headless: true,
      protocolTimeout: 300000,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
      ],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    if (PHASE === 'pre-implement') {
      await installRoutes(page, 'geo')
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
      const boardPath = path.join(outDir, '01-board-1536x1024.png')
      await page.screenshot({ path: boardPath, timeout: 120000 })
      const toggle = await page.$('[data-testid="list-map-toggle"]')
      if (toggle) throw new Error('pre-implement: list-map-toggle must be absent')
      console.log(`SSR03 UI-0 → ${boardPath}`)
      return
    }

    if (!EDGE_ONLY) {
      await installRoutes(page, 'geo')
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="list-map-toggle"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="board-feed"]', { timeout: 15000 })
      await sleep(400)
      const listPath = path.join(outDir, '01-board-list-1536x1024.png')
      await page.screenshot({ path: listPath, timeout: 120000 })

      await page.click('[data-testid="board-view-map"]')
      await page.waitForSelector('[data-testid="board-issues-map"]', { timeout: 20000 })
      await sleep(2500)
      const mapPath = path.join(outDir, '02-board-map-1536x1024.png')
      await page.screenshot({ path: mapPath, timeout: 120000 })

      const happyList = path.join(storyDir, '01-board-list-happy-1536x1024.png')
      const happyMap = path.join(storyDir, '02-board-map-happy-1536x1024.png')
      await copyFile(listPath, happyList)
      await copyFile(mapPath, happyMap)
      console.log(`SSR03 UI-3 → ${outDir}`)
      console.log(`story-root → ${happyList} · ${happyMap}`)
    }

    // Edge SSR-M-ineligible: civic-only → Map disabled + helper (list only)
    console.log('Edge: ineligible…')
    await page.setViewport({ width: 1536, height: 1024 })
    await installRoutes(page, 'civic')
    await gotoBoard(page)
    console.log('Edge: board ready')
    await page.waitForSelector('[data-testid="list-map-toggle"]', { timeout: 20000 })
    await page.waitForSelector('[data-testid="board-map-ineligible"]', { timeout: 10000 })
    const mapBtnDisabled = await page.$eval('[data-testid="board-view-map"]', (el) => el.disabled)
    if (!mapBtnDisabled) throw new Error('Edge ineligible: Map button must be disabled')
    await sleep(500)
    const edgeIneligible = path.join(storyDir, '03-board-edge-ineligible-1536x1024.png')
    console.log('Edge: snap ineligible')
    await snap(page, edgeIneligible)

    // Edge SSR-M-filtered: geo fixture + search query in hash
    console.log('Edge: filtered…')
    await installRoutes(page, 'geo')
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.goto(`${BASE}/#/board?search=Streetlamp`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    })
    await page.waitForSelector('.board-shell', { timeout: 30000 })
    await page.waitForSelector('[data-testid="list-map-toggle"]', { timeout: 20000 })
    await sleep(500)
    const edgeFiltered = path.join(storyDir, '04-board-edge-filtered-1536x1024.png')
    console.log('Edge: snap filtered')
    await snap(page, edgeFiltered)

    // Edge SSR-M-narrow
    console.log('Edge: narrow…')
    await page.setViewport({ width: 480, height: 900 })
    await installRoutes(page, 'geo')
    await gotoBoard(page)
    await page.waitForSelector('[data-testid="list-map-toggle"]', { timeout: 20000 })
    await sleep(500)
    const edgeNarrow = path.join(storyDir, '05-board-edge-narrow-480x900.png')
    console.log('Edge: snap narrow')
    await snap(page, edgeNarrow)
    console.log(`story-root Edge → ${edgeIneligible} · ${edgeFiltered} · ${edgeNarrow}`)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
