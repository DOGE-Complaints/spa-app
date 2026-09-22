/**
 * THR-02 Comment tree / composer / attachments screenshots (M144).
 *
 *   PHASE=post-implement node tests/puppeteer/thr02-comment-tree-screenshot.mjs
 *   EDGE_ONLY=1 …
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
  'docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-02-comment-tree-composer-attachments',
)
const PORT = process.env.THR02_PORT || '4196'
const BASE = process.env.PUBLIC_BOARD_URL ?? `http://127.0.0.1:${PORT}`
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const ISSUE = {
  id: 'ISS-THR-02-DEMO',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: { en: 'Broken streetlight', et: 'Katkine latern', ru: 'Сломанный фонарь' },
  summary: { en: 'Lamp out near the square.', et: 'Lamp.', ru: 'Фонарь.' },
  created_at: '2026-09-20T00:00:00Z',
}

const SCENES = [
  { scene: 'nested', file: '01-thr-t-a-nested-1536x1024.png', sel: '[data-testid="issue-thread-tree"]' },
  { scene: 'max-depth', file: '02-thr-t-b-max-depth-1536x1024.png', sel: '[data-testid="comment-max-depth"]' },
  { scene: 'reply', file: '03-thr-t-c-reply-composer-1536x1024.png', sel: '[data-testid="issue-thread-reply-composer"]' },
  { scene: 'attach-allowed', file: '04-thr-t-d-attach-allowed-1536x1024.png', sel: '[data-testid="comment-attach-chip"]' },
  { scene: 'attach-denied', file: '05-thr-t-e-attach-denied-1536x1024.png', sel: '[data-testid="comment-attach-denied"]' },
  { scene: 'post-fail', file: '06-thr-t-f-post-fail-1536x1024.png', sel: '[data-testid="comment-post-fail"]' },
]

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
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-thr02-test',
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
          body: JSON.stringify({ data: {}, trace_id: 'thr02-pulse' }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/emerging-signals/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'thr02-emerging' }),
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
  const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
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

    for (const edge of SCENES) {
      console.log(`THR02 scene ${edge.scene}…`)
      const page = await browser.newPage()
      await page.setViewport({ width: 1536, height: 1024 })
      await page.evaluateOnNewDocument((scene) => {
        window.__THR01_FORCE_THREAD_STATUS__ = 'populated'
        window.__THR02_FORCE_SCENE__ = scene
      }, edge.scene)
      await installRoutes(page)
      await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
      await page.waitForSelector('.board-shell', { timeout: 30000 })
      await page.waitForSelector('[data-testid="board-issue-post"]', { timeout: 20000 })
      await page.waitForSelector(edge.sel, { timeout: 15000 })
      // For attach-denied: click attach to surface warning if not pre-shown
      if (edge.scene === 'attach-denied') {
        const denied = await page.$('[data-testid="comment-attach-denied"]')
        if (!denied) {
          await page.click('[data-testid="comment-attach-button"]')
          await page.waitForSelector('[data-testid="comment-attach-denied"]', { timeout: 5000 })
        }
      }
      // F3: nested — bring root composer into frame
      if (edge.scene === 'nested') {
        await page.$eval('[data-testid="issue-thread-composer"]', (el) => {
          el.scrollIntoView({ block: 'end', inline: 'nearest' })
        }).catch(() => {})
        await sleep(200)
      }
      await sleep(400)
      const out = path.join(storyDir, edge.file)
      await snap(page, out)
      await page.close().catch(() => {})
      console.log(`story-root → ${out}`)
    }

    // Narrow nested
    {
      const page = await browser.newPage()
      await page.setViewport({ width: 480, height: 900 })
      await page.evaluateOnNewDocument(() => {
        window.__THR01_FORCE_THREAD_STATUS__ = 'populated'
        window.__THR02_FORCE_SCENE__ = 'nested'
      })
      await installRoutes(page)
      await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
      await page.waitForSelector('[data-testid="issue-thread-tree"]', { timeout: 20000 })
      await sleep(400)
      const out = path.join(storyDir, '07-thr-t-a-nested-narrow-480x900.png')
      await snap(page, out)
      await page.close().catch(() => {})
      console.log(`story-root → ${out}`)
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
