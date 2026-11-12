/**
 * P6 REQ21-04 gap capture → story-root screenshots/full-cycle/
 * States A dark · B light · C reload-restore (mockup-150).
 * Run from spa-app/:
 *   node docs/tasks/epics/.../screenshots/full-cycle/_capture-req21-04-p6.mjs
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../../../../../../../..')
const OUT_DIR = __dirname
const BASE = process.env.REQ21_URL ?? 'http://127.0.0.1:4174'
const USE_EXISTING = Boolean(process.env.REQ21_URL)

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4174', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: { ...process.env, VITE_IDENTITY_MOCK_MODE: 'true' },
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
  throw new Error('Vite did not become ready')
}

async function shot(page, name) {
  const out = path.join(OUT_DIR, name)
  await page.screenshot({ path: out, fullPage: false })
  console.log('wrote', out)
  return out
}

async function waitHeader(page) {
  await page.waitForSelector('[data-testid="public-header-theme-toggle"]', { timeout: 30000 })
  await page.waitForSelector('[data-testid="public-header"], .header-strip, [data-testid="app-shell"]', {
    timeout: 15000,
  })
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  let devServer = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  }
  const browser = await puppeteer.launch(launchOpts)
  const page = await browser.newPage()
  await page.setViewport({ width: 1536, height: 1024 })

  try {
    // A — Dark (clear theme key → default dark)
    await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.evaluate(() => {
      localStorage.removeItem('dogestonia.theme')
    })
    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 90000 })
    await waitHeader(page)
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') === 'dark',
      { timeout: 10000 },
    )
    await shot(page, '01-dark.png')

    // B — Light (click ThemeToggle)
    await page.click('[data-testid="public-header-theme-toggle"]')
    await page.waitForFunction(
      () =>
        document.documentElement.getAttribute('data-theme') === 'light' &&
        localStorage.getItem('dogestonia.theme') === 'light',
      { timeout: 10000 },
    )
    await sleep(300)
    await shot(page, '02-light.png')

    // C — Reload restore (keep light in storage)
    await page.reload({ waitUntil: 'networkidle0', timeout: 90000 })
    await waitHeader(page)
    await page.waitForFunction(
      () =>
        document.documentElement.getAttribute('data-theme') === 'light' &&
        localStorage.getItem('dogestonia.theme') === 'light',
      { timeout: 10000 },
    )
    await sleep(200)
    await shot(page, '03-reload-restore.png')

    console.log('REQ21-04 P6 capture OK')
  } finally {
    await browser.close()
    if (devServer && !devServer.killed) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
