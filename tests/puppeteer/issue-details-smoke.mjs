import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()

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

    // Direct open details with existing id
    await page.goto('http://127.0.0.1:4173/#/issue/DE-042', { waitUntil: 'networkidle0' })
    await page.waitForSelector('.issue-details-state-default', { timeout: 3000 })

    const hasHeader = await page.$('.issue-details-header')
    const hasId = await page.$('.issue-details-id')
    const hasStatusBadge = await page.$('.status-badge')
    const hasTitle = await page.$('.issue-details-title')
    const hasMetadata = await page.$('.issue-details-metadata')
    const idText = await page.$eval('.issue-details-id', (el) => el.textContent?.trim() ?? '')
    const titleText = await page.$eval('.issue-details-title', (el) => el.textContent?.trim() ?? '')

    if (!hasHeader) throw new Error('Details header missing')
    if (!hasId) throw new Error('Issue id element missing')
    if (!hasStatusBadge) throw new Error('StatusBadge missing')
    if (!hasTitle) throw new Error('Details title missing')
    if (!hasMetadata) throw new Error('Metadata block missing')
    if (idText !== 'DE-042') throw new Error(`Expected id DE-042, got: ${idText}`)
    if (!titleText || titleText.length < 3) throw new Error(`Expected non-empty title, got: ${titleText}`)

    // Metadata: labels present for DE-042 (has labels: bureaucracy, infrastructure)
    const labelsRow = await page.$('.issue-details-metadata-row')
    if (!labelsRow) throw new Error('Metadata labels row missing')

    // Back to Board button
    const backButton = await page.$('.issue-back-button')
    if (!backButton) throw new Error('Back to Board button missing')

    // Not-found state
    await page.goto('http://127.0.0.1:4173/#/issue/UNKNOWN-ID', { waitUntil: 'networkidle0' })
    await page.waitForSelector('.issue-details-state-not-found', { timeout: 3000 })
    const notFoundTitle = await page.$eval('.issue-details-state-not-found h1', (el) => el.textContent?.trim() ?? '')
    if (!notFoundTitle) throw new Error('Not-found title missing')

    // Board -> Details -> Back (filter restoration)
    await page.goto('http://127.0.0.1:4173/#/board?status=NEW&type=complaint', { waitUntil: 'networkidle0' })
    await page.click('a.issue-card')
    await page.waitForSelector('.issue-details-state-default', { timeout: 3000 })
    await page.click('.issue-back-button')
    await page.waitForFunction(() => location.hash.startsWith('#/board'), { timeout: 3000 })
    const hashAfterBack = await page.evaluate(() => location.hash)
    if (!hashAfterBack.includes('status=NEW') || !hashAfterBack.includes('type=complaint')) {
      throw new Error(`Back to Board did not restore filters: ${hashAfterBack}`)
    }

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
