import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')
const BASE = 'http://127.0.0.1:4173'

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

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    // Open board and ensure filter controls visible
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.board-filters-row')
    await page.waitForSelector('.board-filter-trigger')
    await page.waitForSelector('.board-filter-reset')

    // Apply status filter (VERIFIED) — demo has only NEW, so list becomes empty
    const triggers = await page.$$('.board-filter-trigger')
    await triggers[0].click()
    await sleep(150)
    await page.waitForSelector('.board-filter-dropdown', { visible: true })
    const options = await page.$$('.board-filter-option')
    for (const opt of options) {
      const text = await page.evaluate((el) => el.textContent?.trim(), opt)
      if (text === 'VERIFIED') {
        await opt.click()
        break
      }
    }
    await page.waitForFunction(
      () => location.hash.includes('status=VERIFIED'),
      { timeout: 3000 },
    )
    const hashAfterFilter = await page.evaluate(() => location.hash)
    if (!hashAfterFilter.includes('status=VERIFIED')) {
      throw new Error(`Expected status=VERIFIED in URL after filter: ${hashAfterFilter}`)
    }

    // No-results state (demo has only NEW)
    await page.waitForSelector('.board-no-results', { timeout: 2000 }).catch(() => null)
    const noResultsText = await page.$eval('.board-no-results', (el) => el.textContent?.trim()).catch(() => '')
    if (!noResultsText.includes('No issues match') && !noResultsText.includes('match current filters')) {
      // May be localized; at least reset button should be present in no-results
      const resetInNoResults = await page.$('.board-no-results .board-filter-reset')
      if (!resetInNoResults) throw new Error('No-results block should contain Reset Filters')
    }

    // Reset filters (toolbar button)
    const resetBtn = await page.$('.board-toolbar .board-filter-reset')
    if (!resetBtn) throw new Error('Reset Filters button not found in toolbar')
    const disabled = await page.evaluate((el) => el.hasAttribute('disabled'), resetBtn)
    if (disabled) throw new Error('Reset Filters should be enabled when filters active')
    await resetBtn.click()
    await sleep(500)
    const hashAfterReset = await page.evaluate(() => location.hash)
    if (hashAfterReset.includes('status=') || hashAfterReset.includes('type=')) {
      throw new Error(`Reset should clear query: ${hashAfterReset}`)
    }

    // Direct open with query — filters restored from URL
    await page.goto(`${BASE}/#/board?status=NEW&type=complaint`, { waitUntil: 'networkidle0' })
    await sleep(400)
    const querySummary = await page.$eval('.board-routing-query', (el) => el.textContent?.trim() ?? '')
    if (!querySummary.includes('status') || !querySummary.includes('type')) {
      throw new Error(`Board should show filter query in toolbar: ${querySummary}`)
    }

    await fs.mkdir(SCREENSHOT_DIR, { recursive: true })
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'filters-board-current.png'), fullPage: true })

    await browser.close()
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
