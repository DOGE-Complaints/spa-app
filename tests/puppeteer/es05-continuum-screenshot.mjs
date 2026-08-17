/**
 * ES-05 Issues continuum screenshots (M140).
 *
 *   PHASE=pre-implement node tests/puppeteer/es05-continuum-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/es05-continuum-screenshot.mjs
 *
 * Intercepts Issues ≥ 1 so PH-04 feed is visible.
 * Post-implement H1 = Pulse/Emerging omit; H2/N1 = bound residual (byte-distinct).
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
  'docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-05-issues-continuum-regression',
)
const PHASE = process.env.PHASE || 'post-implement'
const BASE = process.env.PUBLIC_BOARD_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const ISSUE_FIXTURE = {
  data: {
    issues: [
      {
        id: 'ISS-100',
        status: 'PUBLISHED',
        type: 'IMPROVEMENT',
        labels: ['waste'],
        title: {
          en: 'Waste collection delay',
          et: 'Jäätmete veo viivitus',
          ru: 'Задержка вывоза отходов',
        },
        summary: {
          en: 'Bins overflow on the collection day in Lasnamäe.',
          et: 'Konteinerid ületäituvad veopäeval Lasnamäel.',
          ru: 'Контейнеры переполняются в день вывоза в Ласнамяэ.',
        },
        created_at: '2026-08-01T00:00:00Z',
      },
    ],
  },
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
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-es05-test',
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

function residualBodies(mode) {
  if (mode === 'omit') {
    return {
      pulse: { data: {}, trace_id: 'es05-pulse-omit' },
      emerging: { data: { signals: [], top_n: 10 }, trace_id: 'es05-emerging-omit' },
    }
  }
  return {
    pulse: {
      data: { stories_collected: 4, areas: ['Lasnamäe'], languages: ['et'], topics: ['mobility'] },
      trace_id: 'es05-shot',
    },
    emerging: {
      data: {
        signals: [{ label: 'Night lighting', axis: 'area', story_count: 3 }],
        top_n: 10,
      },
      trace_id: 'es05-emerging',
    },
  }
}

async function installRoutes(page, residualMode = 'bound') {
  const bodies = residualBodies(residualMode)
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
          body: JSON.stringify(ISSUE_FIXTURE),
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
          body: JSON.stringify(bodies.pulse),
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
          body: JSON.stringify(bodies.emerging),
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
  await page.screenshot({ path: filePath, timeout: 120000 })
}

async function assertOmitResidual(page) {
  const pulse = await page.$('[data-testid="continuum-pulse"]')
  const emerging = await page.$('[data-testid="continuum-emerging"]')
  if (pulse) throw new Error('H1 omit: continuum-pulse must be absent')
  if (emerging) throw new Error('H1 omit: continuum-emerging must be absent')
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
      const outDir = path.join(STORY_ROOT, 'task-spa-es-05-t01-continuum-layout/ui-baseline/pre-implement')
      await mkdir(outDir, { recursive: true })
      const page = await browser.newPage()
      await installRoutes(page)
      await page.setViewport({ width: 1536, height: 1024 })
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
      await page.waitForSelector('.issue-card', { timeout: 10000 })
      await shot(page, path.join(outDir, '01-board-feed-1536x1024.png'), { width: 1536, height: 1024 })
      await shot(page, path.join(outDir, '02-board-narrow-390x844.png'), { width: 390, height: 844 })
      console.log(`ES05 UI-0 → ${outDir}`)
      return
    }

    const postDir = path.join(STORY_ROOT, 'task-spa-es-05-t01-continuum-layout/ui-baseline/post-implement')
    const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
    await mkdir(postDir, { recursive: true })
    await mkdir(storyDir, { recursive: true })

    const pageH1 = await browser.newPage()
    await installRoutes(pageH1, 'omit')
    await pageH1.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageH1)
    await pageH1.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
    await pageH1.waitForSelector('.issue-card', { timeout: 10000 })
    await pageH1.waitForSelector('[data-testid="continuum-residual"]', { timeout: 10000 })
    await pageH1.waitForSelector('[data-testid="continuum-missing"]', { timeout: 8000 })
    await sleep(400)
    await assertOmitResidual(pageH1)
    await shot(pageH1, path.join(postDir, '01-continuum-feed-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageH1, path.join(storyDir, 'es05-continuum-feed-desktop.png'), { width: 1536, height: 1024 })
    await pageH1.close()

    const pageH2 = await browser.newPage()
    await installRoutes(pageH2, 'bound')
    await pageH2.setViewport({ width: 1536, height: 1024 })
    await gotoBoard(pageH2)
    await pageH2.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
    await pageH2.waitForSelector('[data-testid="continuum-residual"]', { timeout: 10000 })
    await pageH2.waitForSelector('[data-testid="continuum-pulse"]', { timeout: 8000 })
    await pageH2.waitForSelector('[data-testid="continuum-emerging"]', { timeout: 8000 })
    await shot(pageH2, path.join(postDir, '02-continuum-residual-1536x1024.png'), { width: 1536, height: 1024 })
    await shot(pageH2, path.join(storyDir, 'es05-continuum-residual-desktop.png'), { width: 1536, height: 1024 })
    await pageH2.close()

    const pageNarrow = await browser.newPage()
    await installRoutes(pageNarrow, 'bound')
    await pageNarrow.setViewport({ width: 390, height: 844 })
    await gotoBoard(pageNarrow)
    await pageNarrow.waitForSelector('[data-testid="continuum-residual"]', { timeout: 20000 })
    await pageNarrow.waitForSelector('[data-testid="continuum-emerging"]', { timeout: 8000 })
    await shot(pageNarrow, path.join(postDir, '03-continuum-narrow-390x844.png'), { width: 390, height: 844 })
    await shot(pageNarrow, path.join(storyDir, 'es05-continuum-narrow.png'), { width: 390, height: 844 })

    console.log(`ES05 UI-3 + story-root → ${postDir} · ${storyDir}`)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
