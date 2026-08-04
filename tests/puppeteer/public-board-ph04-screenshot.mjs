/**
 * PH-04 Board feed screenshots → T01 ui-baseline/
 *   PH04_PHASE=pre-implement|post-implement node tests/puppeteer/public-board-ph04-screenshot.mjs
 * Env: PUBLIC_BOARD_URL / PUBLIC_HEADER_URL to reuse Vite on :4173.
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
const UI_BASELINE = path.resolve(
  SPA_ROOT,
  process.env.PH04_UI_BASELINE ??
    'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-04-board-feed-home/task-spa-ph-04-t01-remove-columns-single-feed/ui-baseline',
)

const BASE = process.env.PUBLIC_BOARD_URL ?? process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_BOARD_URL || process.env.PUBLIC_HEADER_URL)
const PHASE = process.env.PH04_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

const MOCK_ISSUES = [
  {
    id: 'ISSUE-PH04-1',
    status: 'NEW',
    type: 'complaint',
    title: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    summary: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    labels: ['roads'],
    created_at: '2026-08-01T10:00:00Z',
  },
  {
    id: 'ISSUE-PH04-2',
    status: 'IN_REVIEW',
    type: 'proposal',
    title: { en: 'Mock feed item two', et: 'Mock kaks', ru: 'Мок два' },
    summary: { en: 'Mock feed item two', et: 'Mock kaks', ru: 'Мок два' },
    labels: ['parks'],
    created_at: '2026-08-02T10:00:00Z',
  },
]

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
        // Force gateway fetch so request interception can drive M132 states
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

async function shot(page, outDir, name) {
  await page.screenshot({ path: path.join(outDir, name) })
}

async function gotoBoard(page, search = '') {
  const q = search ? (search.startsWith('?') ? search : `?${search}`) : ''
  // Force remount/refetch even when hash path is unchanged between mock modes
  await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.goto(`${BASE}/#/board${q}`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('.board-shell', { timeout: 30000 })
}

/** @param {import('puppeteer').Page} page @param {{ mode: string }} route */
async function installIssuesRoute(page, route) {
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    if (
      req.method() === 'GET' &&
      /\/tallinn\/issues(\?|$)/.test(url) &&
      !/\/tallinn\/issues\/[^/?\s]+/.test(url)
    ) {
      const mode = route.mode
      try {
        if (mode === 'hang') return
        if (mode === 'error') {
          await req.respond({
            status: 500,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'fail' }),
          })
          return
        }
        const issues = mode === 'empty' ? [] : MOCK_ISSUES
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { issues } }),
        })
        return
      } catch {
        return
      }
    }
    await req.continue().catch(() => {})
  })
}

async function main() {
  const outDir = path.join(UI_BASELINE, PHASE)
  await mkdir(outDir, { recursive: true })

  let devServer = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
  let page = await browser.newPage()
  const route = { mode: 'results' }

  try {
    await page.setViewport({ width: 1536, height: 1024 })

    if (PHASE === 'pre-implement') {
      await gotoBoard(page)
      await page.waitForSelector('.board-columns, .board-feed, [data-testid="board-empty"]', { timeout: 30000 })
      await shot(page, outDir, 'c-legacy-columns-or-current-board-1536x1024.png')
    } else {
      // A — Loading
      route.mode = 'hang'
      await installIssuesRoute(page, route)
      await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
      await page.waitForSelector('.board-feed[aria-busy="true"], .board-skeleton-card', { timeout: 15000 })
      await shot(page, outDir, 'a-loading-board-feed-skeleton-1536x1024.png')
      await page.close()
      page = await browser.newPage()
      await page.setViewport({ width: 1536, height: 1024 })

      // B — Empty
      route.mode = 'empty'
      await installIssuesRoute(page, route)
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-empty"]', { timeout: 20000 })
      await shot(page, outDir, 'b-empty-board-feed-1536x1024.png')

      // C — Results
      route.mode = 'results'
      await gotoBoard(page)
      await page.waitForSelector('.issue-card', { timeout: 20000 })
      await shot(page, outDir, 'c-results-board-feed-1536x1024.png')

      // D — Filtered empty
      await gotoBoard(page, 'search=zzznomatchph04')
      await page.waitForSelector('[data-testid="board-filtered-empty"]', { timeout: 20000 })
      await shot(page, outDir, 'd-filtered-empty-board-feed-1536x1024.png')

      // E — Load error
      route.mode = 'error'
      await gotoBoard(page)
      await page.waitForSelector('[data-testid="board-load-error"]', { timeout: 20000 })
      await shot(page, outDir, 'e-load-error-board-feed-1536x1024.png')
    }

    const readme = `# PH-04 ui-baseline (${PHASE})

- **UTC capture:** see run stdout / story gate
- **Route:** \`/#/board\`
- **Viewport:** 1536×1024
- **Phase:** ${PHASE}
`
    await writeFile(path.join(UI_BASELINE, 'README.md'), `# PH-04 Board feed — ui-baseline

Anchor: \`task-spa-ph-04-t01-remove-columns-single-feed\`

| Phase | Purpose |
|-------|---------|
| pre-implement | UI-0 columns/legacy board before cutover |
| post-implement | UI-3 M132 states A–E |

Mockup SSOT: \`docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md\`

Last phase written: **${PHASE}**
`, 'utf8')
    console.log(`PH04 ${PHASE} screenshots → ${outDir}`)
  } finally {
    await browser.close()
    if (devServer) {
      devServer.kill('SIGTERM')
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
