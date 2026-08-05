/**
 * PH-05 How it works full-cycle → story-root screenshots/full-cycle/
 * Live: USER_EMAIL / USER_PASSWORD → /#/how-it-works tutorial.
 * Mock: same static page (deterministic State A).
 */
import { mkdir, readFile, copyFile, readdir } from 'node:fs/promises'
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
  'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page',
)
const SCREENSHOTS_ROOT = path.join(STORY_ROOT, 'screenshots')
const OUT_DIR = path.join(SCREENSHOTS_ROOT, 'full-cycle')
const ARCHIVE_DIR = path.join(SCREENSHOTS_ROOT, 'archive')
const UI_BASELINE = path.join(STORY_ROOT, 'task-spa-ph-05-t02-four-step-layout/ui-baseline')
const ENV_PATH = path.join(SPA_ROOT, '.env')
const BASE = process.env.PUBLIC_HIW_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HIW_URL)
const VIEWPORT = { width: 1536, height: 1024 }

async function loadDotEnv(filePath) {
  const text = await readFile(filePath, 'utf8')
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

function startVite(extraEnv = {}) {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_STORY_GPT_URL:
          process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-example-dogestonia',
        ...extraEnv,
      },
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
  throw new Error('Vite not ready')
}

async function archiveBaselines() {
  await mkdir(ARCHIVE_DIR, { recursive: true })
  for (const phase of ['pre-implement', 'post-implement']) {
    const dir = path.join(UI_BASELINE, phase)
    try {
      const files = await readdir(dir)
      for (const f of files) {
        if (!f.endsWith('.png')) continue
        await copyFile(path.join(dir, f), path.join(ARCHIVE_DIR, `${phase}-${f}`))
      }
    } catch {
      // optional
    }
  }
}

async function main() {
  await loadDotEnv(ENV_PATH).catch(() => {})
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASSWORD
  if (!email || !password) {
    throw new Error('USER_EMAIL / USER_PASSWORD required in spa-app/.env for live happy')
  }

  await mkdir(OUT_DIR, { recursive: true })
  await archiveBaselines()

  let server = null
  if (!USE_EXISTING) {
    server = startVite()
    await waitForServer(BASE)
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: VIEWPORT,
  })

  const written = []
  try {
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    // Live happy: login then how-it-works
    await page.goto(`${BASE}/#/login`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 30000 })
    const emailSel = (await page.$('input[type="email"]'))
      ? 'input[type="email"]'
      : 'input[name="email"]'
    const passSel = (await page.$('input[type="password"]'))
      ? 'input[type="password"]'
      : 'input[name="password"]'
    await page.click(emailSel, { clickCount: 3 })
    await page.type(emailSel, email, { delay: 10 })
    await page.click(passSel, { clickCount: 3 })
    await page.type(passSel, password, { delay: 10 })
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 90000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ])
    await sleep(1500)
    // Continue if present
    const continueBtn = await page.$('button')
    if (continueBtn) {
      const label = await page.evaluate((el) => el.textContent || '', continueBtn)
      if (/continue|продолж|jätka/i.test(label)) {
        await continueBtn.click()
        await sleep(800)
      }
    }

    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="how-it-works-page"]', { timeout: 30000 })
    await sleep(600)
    written.push(
      await page.screenshot({
        path: path.join(OUT_DIR, '01-happy-live-how-it-works-1536x1024.png'),
      }),
    )

    // Deterministic mock State A (same static page; clear auth for guest chrome)
    await page.evaluate(() => {
      try {
        localStorage.clear()
        sessionStorage.clear()
      } catch {
        // ignore
      }
    })
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('[data-testid="how-it-works-page"]', { timeout: 20000 })
    const steps = await page.$$('[data-testid="how-it-works-step"]')
    if (steps.length !== 4) throw new Error(`mock expected 4 steps, got ${steps.length}`)
    await sleep(400)
    written.push(
      await page.screenshot({
        path: path.join(OUT_DIR, '02-happy-mock-default-tutorial-1536x1024.png'),
      }),
    )

    console.log('PH05 full-cycle PASS', written.length, 'pngs →', OUT_DIR)
  } finally {
    await browser.close()
    if (server) {
      server.kill('SIGTERM')
      await sleep(400)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
