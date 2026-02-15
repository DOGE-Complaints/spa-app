import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')
const SCREENSHOT_PATH = path.join(SCREENSHOT_DIR, 'i18n-switcher-current.png')

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
      // server not ready
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
    await page.goto('http://127.0.0.1:4173/#/board', { waitUntil: 'networkidle0' })

    await page.waitForSelector('.header-locale-trigger')
    await page.$eval('.header-locale-trigger', (node) => node.click())
    await page.waitForFunction(() => Boolean(document.querySelector('.header-locale-menu')))

    const options = await page.$$eval('.header-locale-option', (nodes) => nodes.map((node) => node.textContent?.trim() ?? ''))
    const expected = ['Eesti', 'Русский', 'English']
    if (JSON.stringify(options) !== JSON.stringify(expected)) {
      throw new Error(`Unexpected locale options: ${JSON.stringify(options)}`)
    }

    const flagsCount = await page.$$eval('.header-locale-option .header-locale-flag', (nodes) => nodes.length)
    if (flagsCount !== 3) {
      throw new Error(`Expected 3 flags in locale options, got ${flagsCount}`)
    }

    const beforeUrl = page.url()
    const localeButtons = await page.$$('.header-locale-option')
    if (!localeButtons[1]) {
      throw new Error('RU locale option is missing')
    }
    await localeButtons[1].click()
    await page.waitForFunction(
      () => document.querySelector('.board-toolbar h2')?.textContent?.trim() === 'Доска',
      { timeout: 3000 },
    )

    const afterUrl = page.url()
    if (beforeUrl !== afterUrl) {
      throw new Error(`Route changed after locale switch: ${beforeUrl} -> ${afterUrl}`)
    }

    const storedLocale = await page.evaluate(() => localStorage.getItem('doge.locale'))
    if (storedLocale !== 'ru') {
      throw new Error(`Expected localStorage doge.locale=ru, received ${storedLocale}`)
    }

    await page.reload({ waitUntil: 'networkidle0' })
    const persistedLocale = await page.$eval('.header-locale-trigger', (node) => node.textContent?.trim() ?? '')
    if (!persistedLocale.startsWith('Русский')) {
      throw new Error(`Expected trigger to restore Русский locale, got "${persistedLocale}"`)
    }

    await fs.mkdir(SCREENSHOT_DIR, { recursive: true })
    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true })

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
