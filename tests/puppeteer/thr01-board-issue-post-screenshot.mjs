/**
 * SSR THR-01 BoardIssuePost / IssueThreadBlock screenshots (M143/M148).
 *
 *   PHASE=pre-implement|post-implement node tests/puppeteer/thr01-board-issue-post-screenshot.mjs
 *   EDGE_ONLY=1 PHASE=post-implement …
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
  'docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts',
)
const ANCHOR_BASELINE = path.join(
  STORY_ROOT,
  'task-spa-thr-01-t01-board-issue-post-wrap/ui-baseline',
)
const PHASE = process.env.PHASE || 'post-implement'
const EDGE_ONLY = process.env.EDGE_ONLY === '1'
const PORT = process.env.THR01_PORT || '4195'
const BASE = process.env.PUBLIC_BOARD_URL ?? `http://127.0.0.1:${PORT}`
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const ISSUE = {
  id: 'ISS-THR-01-DEMO',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: { en: 'Broken streetlight', et: 'Katkine latern', ru: 'Сломанный фонарь' },
  summary: { en: 'Lamp out near the square.', et: 'Lamp.', ru: 'Фонарь.' },
  created_at: '2026-09-20T00:00:00Z',
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
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-thr01-test',
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

async function installRoutes(page) {
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
          body: JSON.stringify({ data: { issues: [ISSUE] } }),
        })
        return
      }
      if (req.method() === 'GET' && /\/(?:node|tallinn)\/issues\//.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { issue: ISSUE } }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/network-pulse/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: {}, trace_id: 'thr01-pulse' }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/emerging-signals/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'thr01-emerging' }),
        })
        return
      }
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
    await installRoutes(page)

    if (PHASE === 'pre-implement') {
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
      const boardPath = path.join(outDir, '01-board-1536x1024.png')
      await snap(page, boardPath)
      const post = await page.$('[data-testid="board-issue-post"]')
      if (post) throw new Error('pre-implement: board-issue-post must be absent')
      console.log(`THR01 UI-0 → ${boardPath}`)
      return
    }

    if (!EDGE_ONLY) {
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-issue-post"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="issue-thread-block"]', { timeout: 10000 })
      await sleep(400)
      const boardPath = path.join(outDir, '01-board-post-1536x1024.png')
      await snap(page, boardPath)
      const happyBoard = path.join(storyDir, '01-board-issue-post-happy-1536x1024.png')
      await copyFile(boardPath, happyBoard)

      await page.goto(`${BASE}/#/issue/${ISSUE.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 90000,
      })
      await page.waitForSelector('[data-testid="issue-thread-block"]', { timeout: 20000 })
      await sleep(400)
      const issuePath = path.join(outDir, '02-issue-thread-1536x1024.png')
      await snap(page, issuePath)
      const happyIssue = path.join(storyDir, '02-issue-thread-happy-1536x1024.png')
      await copyFile(issuePath, happyIssue)
      console.log(`THR01 UI-3 → ${outDir}`)
      console.log(`story-root → ${happyBoard} · ${happyIssue}`)
    }

    if (!EDGE_ONLY) {
      await page.setViewport({ width: 480, height: 900 })
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-issue-post"]', { timeout: 20000 })
      await sleep(400)
      const narrow = path.join(storyDir, '03-board-issue-post-narrow-480x900.png')
      await snap(page, narrow)
      console.log(`story-root Edge narrow → ${narrow}`)
    }

    // Edge pack (F1): force local status via window — no invent social HTTP
    const edgeStatuses = [
      { status: 'loading', file: '04-board-edge-loading-1536x1024.png', sel: '[data-testid="issue-thread-loading"]' },
      { status: 'populated', file: '05-board-edge-populated-1536x1024.png', sel: '[data-testid="issue-thread-populated"]' },
      { status: 'unavailable', file: '06-board-edge-unavailable-1536x1024.png', sel: '[data-testid="issue-thread-unavailable"]' },
    ]
    for (const edge of edgeStatuses) {
      console.log(`Edge: board ${edge.status}…`)
      const edgePage = await browser.newPage()
      await edgePage.setViewport({ width: 1536, height: 1024 })
      await edgePage.evaluateOnNewDocument((s) => {
        window.__THR01_FORCE_THREAD_STATUS__ = s
      }, edge.status)
      await installRoutes(edgePage)
      await gotoBoard(edgePage)
      await edgePage.waitForSelector('[data-testid="board-issue-post"]', { timeout: 20000 })
      await edgePage.waitForSelector(edge.sel, { timeout: 10000 })
      await sleep(400)
      const out = path.join(storyDir, edge.file)
      await snap(edgePage, out)
      await edgePage.close().catch(() => {})
      console.log(`story-root Edge → ${out}`)
    }

    // M148 non-empty parity + narrow
    console.log('Edge: issue populated…')
    {
      const edgePage = await browser.newPage()
      await edgePage.setViewport({ width: 1536, height: 1024 })
      await edgePage.evaluateOnNewDocument(() => {
        window.__THR01_FORCE_THREAD_STATUS__ = 'populated'
      })
      await installRoutes(edgePage)
      await edgePage.goto(`${BASE}/#/issue/${ISSUE.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 90000,
      })
      await edgePage.waitForSelector('[data-testid="issue-thread-populated"]', { timeout: 20000 })
      await sleep(400)
      const out = path.join(storyDir, '07-issue-edge-populated-1536x1024.png')
      await snap(edgePage, out)
      await edgePage.close().catch(() => {})
      console.log(`story-root Edge → ${out}`)
    }
    console.log('Edge: issue narrow populated…')
    {
      const edgePage = await browser.newPage()
      await edgePage.setViewport({ width: 480, height: 900 })
      await edgePage.evaluateOnNewDocument(() => {
        window.__THR01_FORCE_THREAD_STATUS__ = 'populated'
      })
      await installRoutes(edgePage)
      await edgePage.goto(`${BASE}/#/issue/${ISSUE.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 90000,
      })
      await edgePage.waitForSelector('[data-testid="issue-thread-populated"]', { timeout: 20000 })
      await sleep(400)
      const out = path.join(storyDir, '08-issue-edge-narrow-populated-480x900.png')
      await snap(edgePage, out)
      await edgePage.close().catch(() => {})
      console.log(`story-root Edge → ${out}`)
    }
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
