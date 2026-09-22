/**
 * THR-04 Invite organization stub screenshots (M146 Path A).
 *
 *   PHASE=post-implement node tests/puppeteer/thr04-escalation-screenshot.mjs
 * Prefer Chrome for Testing ≤142 if screenshot hangs on newer builds.
 */
import { mkdir, writeFile } from 'node:fs/promises'
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
  'docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-04-escalation-stub',
)
const PORT = process.env.THR04_PORT || '4206'
const BASE = process.env.PUBLIC_BOARD_URL ?? `http://127.0.0.1:${PORT}`
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const ISSUE = {
  id: 'ISS-THR-04-DEMO',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: { en: 'Broken streetlight', et: 'Katkine latern', ru: 'Сломанный фонарь' },
  summary: { en: 'Lamp out near the square.', et: 'Lamp.', ru: 'Фонарь.' },
  created_at: '2026-09-20T00:00:00Z',
}

const SCENES = [
  { scene: 'idle', file: '01-thr-e-a-idle-1536x1024.png', sel: '[data-testid="thread-action-invite"]', w: 1536, h: 1024 },
  { scene: 'activated', file: '02-thr-e-b-activated-1536x1024.png', sel: '[data-testid="invite-stub-feedback"]', w: 1536, h: 1024 },
  { scene: 'soon', file: '03-thr-e-c-soon-1536x1024.png', sel: '[data-testid="invite-soon-helper"]', w: 1536, h: 1024 },
  { scene: 'idle', file: '04-thr-e-a-idle-mobile-480x900.png', sel: '[data-testid="thread-action-invite"]', w: 480, h: 900 },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'ignore',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_LIFE_REALITY_MODE: 'GFL-DRIVEN',
        VITE_GATEWAY_BASE_URL: process.env.VITE_GATEWAY_BASE_URL || 'http://127.0.0.1:8765',
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-thr04-test',
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
          body: JSON.stringify({ data: {}, trace_id: 'thr04-pulse' }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/emerging-signals/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'thr04-emerging' }),
        })
        return
      }
      if (/basemaps\.cartocdn\.com|demotiles\.maplibre\.org|tile\.openstreetmap\.org/i.test(url)) {
        await req.abort()
        return
      }
      await req.continue()
    } catch {
      try {
        await req.continue()
      } catch {
        // ignore
      }
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
  await writeFile(filePath, buf)
}

async function captureScene(browser, edge, storyDir) {
  console.log(`THR04 scene ${edge.scene} ${edge.w}x${edge.h}…`)
  const page = await browser.newPage()
  await page.setViewport({ width: edge.w, height: edge.h })
  await page.evaluateOnNewDocument((scene) => {
    window.__THR01_FORCE_THREAD_STATUS__ = 'populated'
    window.__THR02_FORCE_SCENE__ = 'nested'
    window.__THR04_FORCE_SCENE__ = scene
  }, edge.scene)
  await installRoutes(page)
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
  await page.waitForSelector('[data-testid="board-issue-post"]', { timeout: 20000 })
  await page.waitForSelector(edge.sel, { timeout: 15000 })
  await page.$eval(edge.sel, (el) => {
    el.scrollIntoView({ block: 'center', inline: 'nearest' })
  }).catch(() => {})
  await sleep(400)
  const out = path.join(storyDir, edge.file)
  console.log(`  screenshot ${edge.file}`)
  await snap(page, out)
  await page.close().catch(() => {})
  console.log(`story-root → ${out}`)
}

async function main() {
  const storyDir = path.join(STORY_ROOT, 'screenshots/full-cycle')
  await mkdir(storyDir, { recursive: true })

  let devServer = null
  let browser = null
  if (!USE_EXISTING) {
    console.log(`starting vite on ${PORT}`)
    devServer = startViteDevServer()
    await waitForServer(BASE)
    console.log('vite ready')
  }

  try {
    console.log('launching chrome', process.env.PUPPETEER_EXECUTABLE_PATH || 'bundled')
    browser = await puppeteer.launch({
      headless: true,
      protocolTimeout: 300000,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    })
    console.log('chrome launched')

    for (const edge of SCENES) {
      await captureScene(browser, edge, storyDir)
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
