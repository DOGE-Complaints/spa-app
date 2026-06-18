import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const BASE = 'http://127.0.0.1:4173'
const EPIC03_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')
const UI_BASELINE_DIR = path.join(
  ROOT,
  'docs/tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-02-filter-panel-shell/task-spa-search-02-t03-filter-panel-shell/ui-baseline',
)
const POST_IMPLEMENT_DIR = path.join(UI_BASELINE_DIR, 'post-implement')

/** Status enum order matches StatusFilter / ISSUE_STATUS */
const STATUS_PUBLISHED_INDEX = 2

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    { cwd: ROOT, stdio: 'pipe' },
  )
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) return
    } catch {
      // server boot
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready in time')
}

async function ensureDirs() {
  await fs.mkdir(EPIC03_DIR, { recursive: true })
  await fs.mkdir(POST_IMPLEMENT_DIR, { recursive: true })
}

async function screenshot(page, filePath) {
  await page.screenshot({ path: filePath, fullPage: true })
}

async function openFilterPanel(page) {
  await page.waitForSelector('.board-filter-panel-toggle')
  await page.click('.board-filter-panel-toggle')
  await page.waitForSelector('.board-filter-panel-body', { visible: true })
}

async function selectPublishedStatusInPanel(page) {
  const statusTrigger = await page.$('.board-filter-panel-primary .board-filter-trigger')
  if (!statusTrigger) throw new Error('Status filter trigger not found inside panel')
  await statusTrigger.click()
  await page.waitForSelector('.board-filter-panel-body .board-filter-dropdown', { visible: true })
  const options = await page.$$('.board-filter-panel-primary .board-filter-option')
  if (options.length <= STATUS_PUBLISHED_INDEX) {
    throw new Error(`Expected at least ${STATUS_PUBLISHED_INDEX + 1} status options`)
  }
  await options[STATUS_PUBLISHED_INDEX].click()
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer(BASE)
    await ensureDirs()

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    // 1) Default board — panel closed
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.board-filters-row')
    await page.waitForSelector('.board-filter-panel-toggle')
    await page.waitForSelector('.board-toolbar .board-filter-reset')
    await screenshot(page, path.join(UI_BASELINE_DIR, '01-board-default.png'))

    // 2) Panel open — no applied filters yet
    await openFilterPanel(page)
    await page.waitForSelector('.board-filter-date-display')
    await screenshot(page, path.join(UI_BASELINE_DIR, '02-panel-open.png'))

    // 3) Pending status selection → Apply → URL update (batch)
    await selectPublishedStatusInPanel(page)
    const applyBtn = await page.$('.board-filter-apply')
    if (!applyBtn) throw new Error('Apply button not found in panel footer')
    const applyDisabled = await page.evaluate((el) => el.hasAttribute('disabled'), applyBtn)
    if (applyDisabled) throw new Error('Apply should be enabled after pending status change')
    await applyBtn.click()
    await page.waitForFunction(
      () => location.hash.includes('status=PUBLISHED'),
      { timeout: 5000 },
    )

    // Chips or filtered list state
    await page
      .waitForSelector('.board-active-filter-chips, .board-no-results', { timeout: 3000 })
      .catch(() => null)
    await screenshot(page, path.join(POST_IMPLEMENT_DIR, '01-board-applied-filters.png'))
    await screenshot(page, path.join(EPIC03_DIR, 'filters-board-current.png'))

    const hashAfterFilter = await page.evaluate(() => location.hash)
    if (!hashAfterFilter.includes('status=PUBLISHED')) {
      throw new Error(`Expected status=PUBLISHED in URL after Apply: ${hashAfterFilter}`)
    }

    // 4) Toolbar Reset clears all filters
    const resetBtn = await page.$('.board-toolbar .board-filter-reset')
    if (!resetBtn) throw new Error('Reset Filters button not found in toolbar')
    const resetDisabled = await page.evaluate((el) => el.hasAttribute('disabled'), resetBtn)
    if (resetDisabled) throw new Error('Reset Filters should be enabled when filters active')
    await resetBtn.click()
    await sleep(400)
    const hashAfterReset = await page.evaluate(() => location.hash)
    if (hashAfterReset.includes('status=') || hashAfterReset.includes('type=')) {
      throw new Error(`Reset should clear query: ${hashAfterReset}`)
    }

    // 5) Deep link restores applied filters
    await page.goto(`${BASE}/#/board?status=NEW&type=INCIDENT`, { waitUntil: 'networkidle0' })
    await sleep(400)
    const chips = await page.$('.board-active-filter-chips')
    const hashDeepLink = await page.evaluate(() => location.hash)
    if (!hashDeepLink.includes('status=NEW') || !hashDeepLink.includes('type=INCIDENT')) {
      throw new Error(`Deep link should preserve filters in URL: ${hashDeepLink}`)
    }
    if (!chips) {
      throw new Error('Active filter chips should appear after deep link with filters')
    }

    // 6) Narrow viewport — drawer / bottom-sheet
    await openFilterPanel(page)
    await page.setViewport({ width: 390, height: 844 })
    await sleep(300)
    await screenshot(page, path.join(POST_IMPLEMENT_DIR, '02-narrow-drawer.png'))

    await browser.close()
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
