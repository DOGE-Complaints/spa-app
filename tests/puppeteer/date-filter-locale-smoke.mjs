import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const BASE = 'http://127.0.0.1:4173'
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/search04-date-locale')

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

async function screenshot(page, filePath) {
  await page.screenshot({ path: filePath, fullPage: true })
}

async function switchToRussian(page) {
  await page.waitForSelector('.header-locale-trigger')
  await page.$eval('.header-locale-trigger', (node) => node.click())
  await page.waitForFunction(() => Boolean(document.querySelector('.header-locale-menu')))
  const localeButtons = await page.$$('.header-locale-option')
  if (!localeButtons[1]) {
    throw new Error('RU locale option is missing')
  }
  await localeButtons[1].click()
  await page.waitForFunction(
    () => document.documentElement.lang === 'ru',
    { timeout: 3000 },
  )
}

async function openFilterPanel(page) {
  await page.waitForSelector('.board-filter-panel-toggle')
  await page.click('.board-filter-panel-toggle')
  await page.waitForSelector('.board-filter-panel-body', { visible: true })
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer(BASE)
    await fs.mkdir(SCREENSHOT_DIR, { recursive: true })

    const browser = await puppeteer.launch({
      headless: process.env.DEBUG !== '1',
      args: ['--lang=ru'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0' })
    await switchToRussian(page)
    await screenshot(page, path.join(SCREENSHOT_DIR, '01-panel-ru-closed.png'))

    await openFilterPanel(page)
    await page.waitForSelector('.board-filter-date-display')

    const langState = await page.evaluate(() => {
      const displays = [...document.querySelectorAll('.board-filter-date-display')]
      const natives = [...document.querySelectorAll('.board-filter-date-native')]
      return {
        htmlLang: document.documentElement.lang,
        displayLangs: displays.map((node) => node.getAttribute('lang')),
        nativeLangs: natives.map((node) => node.getAttribute('lang')),
        placeholders: displays.map((node) => node.getAttribute('placeholder') ?? ''),
      }
    })

    if (langState.htmlLang !== 'ru') {
      throw new Error(`Expected document lang=ru, got ${langState.htmlLang}`)
    }
    if (!langState.displayLangs.every((value) => value === 'ru')) {
      throw new Error(`Expected display lang=ru, got ${JSON.stringify(langState.displayLangs)}`)
    }
    if (!langState.nativeLangs.every((value) => value === 'ru')) {
      throw new Error(`Expected native lang=ru, got ${JSON.stringify(langState.nativeLangs)}`)
    }
    if (!langState.placeholders.some((value) => value.includes('дд'))) {
      throw new Error(`Expected RU date placeholder, got ${JSON.stringify(langState.placeholders)}`)
    }

    await screenshot(page, path.join(SCREENSHOT_DIR, '02-date-fields-ru.png'))

    await page.evaluate(() => {
      const native = document.querySelector('.board-filter-date-native')
      if (native && typeof native.showPicker === 'function') {
        native.showPicker()
      } else {
        native?.focus()
      }
    })
    await sleep(400)
    await screenshot(page, path.join(SCREENSHOT_DIR, '03-date-picker-open.png'))

    await browser.close()
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
