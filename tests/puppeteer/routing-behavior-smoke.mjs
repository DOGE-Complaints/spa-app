import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')

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
    await waitForServer('http://127.0.0.1:4173')
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    // Scenario A + query normalization (labels matching new mocks: bureaucracy, pensions)
    await page.goto('http://127.0.0.1:4173/#/board?status=NEW&type=complaint&labels=bureaucracy,pensions&foo=bar', {
      waitUntil: 'networkidle0',
    })
    const querySummary = await page.$eval('.board-routing-query', (node) => node.textContent?.trim() ?? '')
    if (querySummary.includes('foo=')) {
      throw new Error(`Unknown query key leaked into normalized state: ${querySummary}`)
    }
    await page.waitForSelector('a.issue-card', { timeout: 5000 })
    await page.click('a.issue-card')
    await page.waitForFunction(() => /^#\/issue\/DE-\d{3}(?:\?|$)/.test(location.hash))

    // Scenario B: back to board with restored filters
    await page.click('.issue-back-button')
    await page.waitForFunction(() => location.hash.startsWith('#/board'))
    const hashAfterBack = await page.evaluate(() => location.hash)
    if (!hashAfterBack.includes('status=NEW') || !hashAfterBack.includes('type=complaint')) {
      throw new Error(`Back to board did not restore expected query: ${hashAfterBack}`)
    }

    // Scenario C: direct open details + not-found
    await page.goto('http://127.0.0.1:4173/#/issue/DE-001', { waitUntil: 'networkidle0' })
    await page.waitForSelector('.issue-details-state-default')
    await page.goto('http://127.0.0.1:4173/#/issue/UNKNOWN-ID', { waitUntil: 'networkidle0' })
    await page.waitForSelector('.issue-details-state-not-found')

    // Scenario D: invalid route redirect
    await page.goto('http://127.0.0.1:4173/#/unknown', { waitUntil: 'networkidle0' })
    await page.waitForFunction(() => location.hash.startsWith('#/board'))

    await fs.mkdir(SCREENSHOT_DIR, { recursive: true })
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'routing-board-current.png'), fullPage: true })
    await page.goto('http://127.0.0.1:4173/#/issue/UNKNOWN-ID', { waitUntil: 'networkidle0' })
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'routing-not-found-current.png'), fullPage: true })

    await browser.close()
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exitCode = 1
})
