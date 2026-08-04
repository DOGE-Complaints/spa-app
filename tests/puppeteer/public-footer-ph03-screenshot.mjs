/**
 * PH-03 PublicFooter screenshots → T01 ui-baseline/
 *   PH03_PHASE=pre-implement|post-implement node tests/puppeteer/public-footer-ph03-screenshot.mjs
 * Env: PUBLIC_FOOTER_URL=http://127.0.0.1:4173 to reuse Vite.
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
const UI_BASELINE = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-03-public-footer/task-spa-ph-03-t01-public-footer-layout/ui-baseline',
)

const BASE = process.env.PUBLIC_FOOTER_URL ?? process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_FOOTER_URL || process.env.PUBLIC_HEADER_URL)
const PHASE = process.env.PH03_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, VITE_IDENTITY_MOCK_MODE: 'true' },
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
  const page = await browser.newPage()

  try {
    await page.setViewport({ width: 1536, height: 1024 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await page.waitForSelector('[data-testid="public-header"], .header-strip', { timeout: 30000 })

    if (PHASE === 'post-implement') {
      await page.waitForSelector('[data-testid="public-footer"]', { timeout: 15000 })
      await page.evaluate(() => {
        document.querySelector('[data-testid="public-footer"]')?.scrollIntoView({ block: 'end' })
      })
      await page.screenshot({
        path: path.join(outDir, 'a-desktop-board-public-footer-1536x1024.png'),
      })
      const footer = await page.$('[data-testid="public-footer"]')
      if (footer) {
        await footer.screenshot({ path: path.join(outDir, 'a-desktop-public-footer-crop.png') })
      }

      await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 90000 })
      await page.waitForSelector('[data-testid="public-footer"]', { timeout: 15000 })
      await page.evaluate(() => {
        document.querySelector('[data-testid="public-footer"]')?.scrollIntoView({ block: 'end' })
      })
      await page.screenshot({
        path: path.join(outDir, 'a-desktop-how-it-works-public-footer-1536x1024.png'),
      })

      await page.setViewport({ width: 390, height: 844 })
      await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
      await page.waitForSelector('[data-testid="public-footer"]', { timeout: 15000 })
      await page.evaluate(() => {
        document.querySelector('[data-testid="public-footer"]')?.scrollIntoView({ block: 'end' })
      })
      await page.screenshot({
        path: path.join(outDir, 'b-narrow-board-public-footer-390x844.png'),
      })
      const narrowFooter = await page.$('[data-testid="public-footer"]')
      if (narrowFooter) {
        await narrowFooter.screenshot({ path: path.join(outDir, 'b-narrow-public-footer-crop.png') })
      }
    } else {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.screenshot({
        path: path.join(outDir, 'a-desktop-board-legacy-footer-1536x1024.png'),
      })
    }

    console.log(`PH-03 ${PHASE} screenshots OK → ${outDir}`)
  } finally {
    await browser.close()
    if (devServer) {
      devServer.kill('SIGTERM')
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
