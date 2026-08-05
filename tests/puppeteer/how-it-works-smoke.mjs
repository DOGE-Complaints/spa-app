/**
 * PH-05 smoke: /how-it-works tutorial page (4 steps, no stub).
 */
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer'

const SPA_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const BASE = process.env.PUBLIC_HIW_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HIW_URL)

function startVite() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_STORY_GPT_URL: process.env.VITE_STORY_GPT_URL || 'https://example.test/gpt',
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
  throw new Error('Vite not ready')
}

async function main() {
  let server = null
  if (!USE_EXISTING) {
    server = startVite()
    await waitForServer(BASE)
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 900 },
  })

  try {
    const page = await browser.newPage()
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="how-it-works-page"]', { timeout: 20000 })
    const stub = await page.$('[data-testid="how-it-works-stub"]')
    if (stub) throw new Error('stub still present')
    const steps = await page.$$('[data-testid="how-it-works-step"]')
    if (steps.length !== 4) throw new Error(`expected 4 steps, got ${steps.length}`)
    await page.waitForSelector('[data-testid="how-it-works-cta-dashboard"]', { timeout: 5000 })
    await page.waitForSelector('[data-testid="how-it-works-cta-submit"]', { timeout: 5000 })
    console.log('how-it-works-smoke PASS')
  } finally {
    await browser.close()
    if (server) server.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
