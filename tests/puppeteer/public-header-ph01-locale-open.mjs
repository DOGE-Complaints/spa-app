/**
 * One-shot: capture M129 State C locale menu open → story-root full-cycle/
 * Usage: cd spa-app && node tests/puppeteer/public-header-ph01-locale-open.mjs
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
const OUT = path.resolve(
  SPA_ROOT,
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/screenshots/full-cycle/07-edge-mock-locale-menu-open-1536x1024.png',
)
const BASE = process.env.PUBLIC_HEADER_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HEADER_URL)

function startVite() {
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
  throw new Error('Vite not ready')
}

async function run() {
  await mkdir(path.dirname(OUT), { recursive: true })
  const dev = USE_EXISTING ? null : startVite()
  try {
    if (!USE_EXISTING) await waitForServer(`${BASE}/`)
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.evaluate(() => {
      localStorage.setItem('doge.locale', 'en')
    })
    await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('[data-testid="public-header"] .header-locale-trigger', {
      timeout: 15000,
    })
    await page.click('[data-testid="public-header"] .header-locale-trigger')
    await page.waitForSelector('[data-testid="public-header"] .header-locale[data-open="yes"]', {
      timeout: 5000,
    })
    await page.waitForSelector('[data-testid="public-header"] .header-locale-menu', {
      timeout: 5000,
    })
    await page.screenshot({ path: OUT, fullPage: false })
    console.log('wrote', OUT)
    await browser.close()
  } finally {
    if (dev) dev.kill('SIGTERM')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
