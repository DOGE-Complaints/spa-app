/**
 * SSR-02 Schema card overlay screenshots (M141).
 *
 *   PHASE=pre-implement node tests/puppeteer/ssr02-overlay-screenshot.mjs
 *   PHASE=post-implement node tests/puppeteer/ssr02-overlay-screenshot.mjs
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
  'docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay',
)
const ANCHOR_BASELINE = path.join(
  STORY_ROOT,
  'task-spa-ssr-02-t01-overlay-compact-card/ui-baseline',
)
const PHASE = process.env.PHASE || 'post-implement'
const PORT = process.env.SSR02_PORT || '4175'
const BASE = process.env.PUBLIC_BOARD_URL ?? `http://127.0.0.1:${PORT}`
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL)

const CIVIC_ISSUE = {
  id: 'ISS-SSR-CIVIC',
  status: 'PUBLISHED',
  type: 'INCIDENT',
  labels: ['district'],
  title: {
    en: 'Streetlamp outage',
    et: 'Tänavalambi rike',
    ru: 'Неисправность фонаря',
  },
  summary: {
    en: 'Lamp dark on the corner.',
    et: 'Lamp on nurgas pime.',
    ru: 'Фонарь на углу не горит.',
  },
  created_at: '2026-09-01T00:00:00Z',
}

const OVERLAY_ISSUE = {
  ...CIVIC_ISSUE,
  id: 'ISS-SSR-02',
  schema_card: {
    'signals.desired_outcome': 'fix lighting',
    'signals.affected_group': 'residents',
    'signals.service_object': 'streetlamp',
  },
}

/** Edge SSR-C-many: ≥5 leaves → compact collapse + showMore */
const MANY_ISSUE = {
  ...CIVIC_ISSUE,
  id: 'ISS-SSR-02-MANY',
  schema_card: {
    'signals.desired_outcome': 'fix lighting',
    'signals.affected_group': 'residents',
    'signals.service_object': 'streetlamp',
    'signals.urgency': 'high',
    'signals.location_hint': 'corner',
  },
}

function listFixture(issue) {
  return { data: { issues: [issue] } }
}

function detailFixture(issue) {
  return { data: { issue } }
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
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-ssr02-test',
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

async function installRoutes(page, issue) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    const headers = { 'Access-Control-Allow-Origin': '*' }
    try {
      if (req.method() === 'GET' && /\/(?:node|tallinn)\/issues\/[^/?]+/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify(detailFixture(issue)),
        })
        return
      }
      if (req.method() === 'GET' && /\/(?:node|tallinn)\/issues(\?|$)/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify(listFixture(issue)),
        })
        return
      }
      if (/\/(?:node|tallinn)\/network-pulse/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: {}, trace_id: 'ssr02-pulse-omit' }),
        })
        return
      }
      if (/\/(?:node|tallinn)\/emerging-signals/.test(url)) {
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers,
          body: JSON.stringify({ data: { signals: [], top_n: 10 }, trace_id: 'ssr02-emerging-omit' }),
        })
        return
      }
      await req.continue()
    } catch {
      // ignore aborted
    }
  })
}

async function main() {
  const withOverlay = PHASE === 'post-implement'
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
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    const happyIssue = withOverlay ? OVERLAY_ISSUE : CIVIC_ISSUE
    await installRoutes(page, happyIssue)
    await gotoBoard(page)
    await page.waitForSelector('[data-testid="board-feed"]', { timeout: 20000 })
    await page.waitForSelector('.issue-card', { timeout: 15000 })
    await sleep(300)

    const boardPath = path.join(outDir, '01-board-1536x1024.png')
    await page.screenshot({ path: boardPath, timeout: 120000 })

    if (withOverlay) {
      const overlayPresent = await page.$('[data-testid="schema-card-overlay"]')
      if (!overlayPresent) {
        throw new Error('post-implement: schema-card-overlay missing on board card')
      }
      await page.goto(`${BASE}/#/issue/${OVERLAY_ISSUE.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await page.waitForSelector('.issue-details-state-default', { timeout: 20000 })
      await page.waitForSelector('[data-testid="schema-card-overlay"]', { timeout: 10000 })
      const detailPath = path.join(outDir, '02-issue-detail-1536x1024.png')
      await page.screenshot({ path: detailPath, timeout: 120000 })

      const happyBoard = path.join(storyDir, '01-board-overlay-happy-1536x1024.png')
      const happyDetail = path.join(storyDir, '02-detail-overlay-happy-1536x1024.png')
      await copyFile(boardPath, happyBoard)
      await copyFile(detailPath, happyDetail)
      console.log(`SSR02 UI-3 → ${outDir}`)
      console.log(`story-root → ${happyBoard} · ${happyDetail}`)

      // Edge SSR-C-many: ≥5 leaves → schema-card-overlay-more
      await page.setViewport({ width: 1536, height: 1024 })
      await installRoutes(page, MANY_ISSUE)
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="schema-card-overlay"]', { timeout: 15000 })
      await page.waitForSelector('[data-testid="schema-card-overlay-more"]', { timeout: 10000 })
      await sleep(300)
      const edgeMany = path.join(storyDir, '03-board-overlay-edge-many-1536x1024.png')
      await page.screenshot({ path: edgeMany, timeout: 120000 })

      // Edge SSR-C-narrow: ≤520px stacked label-above-value
      await page.setViewport({ width: 480, height: 900 })
      await installRoutes(page, OVERLAY_ISSUE)
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="schema-card-overlay"]', { timeout: 15000 })
      await sleep(300)
      const edgeNarrow = path.join(storyDir, '04-board-overlay-edge-narrow-480x900.png')
      await page.screenshot({ path: edgeNarrow, timeout: 120000 })
      console.log(`story-root Edge → ${edgeMany} · ${edgeNarrow}`)
    } else {
      const overlay = await page.$('[data-testid="schema-card-overlay"]')
      if (overlay) throw new Error('pre-implement: overlay must be absent')
      console.log(`SSR02 UI-0 → ${boardPath}`)
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
