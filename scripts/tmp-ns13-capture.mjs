/**
 * NS-13 Path A — hide header search + notifications (Interview H7 · evidence 07).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · keep code gated.
 *
 * Env: NS13_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-13-hide-header-search-notifications',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NS13_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1536, height: 1024 })
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function setTheme(theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('dogestonia.theme', t)
    } catch {
      /* ignore */
    }
  }, theme)
  await sleep(400)
}

async function openFeed() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"]', { timeout: 20000 })
  await sleep(800)
}

async function probe() {
  return page.evaluate(() => {
    const header = document.querySelector('[data-testid="public-header"]')
    const search = document.querySelector('[data-testid="public-header-search-affordance"]')
    const notif = document.querySelector('[data-testid="public-header-notifications-chrome"]')
    const locale = document.querySelector('[data-testid="locale-selector"]')
    const theme = document.querySelector('[data-testid="public-header-theme-toggle"]')
    const account = document.querySelector('[data-testid="header-account-slot"]')
    const brand = document.querySelector('[data-testid="public-header-brand"]')
    return {
      themeAttr: document.documentElement.getAttribute('data-theme'),
      header: Boolean(header),
      ns13: header?.getAttribute('data-ns13') || null,
      search: Boolean(search),
      notif: Boolean(notif),
      locale: Boolean(locale),
      theme: Boolean(theme),
      account: Boolean(account),
      brand: Boolean(brand),
    }
  })
}

try {
  await openFeed()
  await setTheme('light')
  let p = await probe()
  console.log('probeLight', JSON.stringify(p))

  if (!p.header) fails.push('missing public-header')
  if (p.ns13 !== 'search-notifications-gated') fails.push(`ns13 attr ${p.ns13}`)
  if (p.search) fails.push('search still Present')
  if (p.notif) fails.push('notifications still Present')
  if (!p.locale) fails.push('missing locale')
  if (!p.theme) fails.push('missing theme')
  if (!p.account) fails.push('missing account')
  if (!p.brand) fails.push('missing brand')

  const header = await page.$('[data-testid="public-header"]')
  const controls = await page.$('.header-controls')
  const shell = await page.$('.app-shell')
  await capture(outDir, '01-header-no-search-notif-light.png', header || shell || (await page.$('body')))
  await capture(outDir, '02-peers-locale-theme-account.png', controls || header || shell || (await page.$('body')))

  await page.setViewport({ width: 390, height: 844 })
  await sleep(400)
  p = await probe()
  console.log('probeMobile', JSON.stringify(p))
  if (p.search) fails.push('search Present after narrow')
  if (p.notif) fails.push('notifications Present after narrow')
  // soft mobile: header may clip; prefer shell/body for raster honesty
  const mobileEl =
    (await page.$('.app-shell')) ||
    (await page.$('[data-testid="public-header"]')) ||
    (await page.$('body'))
  await capture(outDir, '03-mobile-header-soft.png', mobileEl)

  await page.setViewport({ width: 1536, height: 1024 })
  await setTheme('dark')
  p = await probe()
  console.log('probeDark', JSON.stringify(p))
  if (p.search) fails.push('search Present in dark')
  if (p.notif) fails.push('notifications Present in dark')
  await capture(
    outDir,
    '04-header-dark-held.png',
    (await page.$('[data-testid="public-header"]')) || shell || (await page.$('body')),
  )
  await capture(
    outDir,
    '05-header-honesty.png',
    (await page.$('[data-testid="public-header"]')) || shell || (await page.$('body')),
  )

  copyFileSync(
    path.join(outDir, '01-header-no-search-notif-light.png'),
    path.join(storyShotDir, '01-story-root-header-no-search-notif.png'),
  )
  copyFileSync(
    path.join(outDir, '02-peers-locale-theme-account.png'),
    path.join(storyShotDir, '02-story-root-peers-held.png'),
  )
  copyFileSync(
    path.join(outDir, '03-mobile-header-soft.png'),
    path.join(storyShotDir, '03-story-root-mobile-soft.png'),
  )
  copyFileSync(
    path.join(outDir, '01-header-no-search-notif-light.png'),
    path.join(baselineDir, '01-story-root-host.png'),
  )
  copyFileSync(
    path.join(outDir, '02-peers-locale-theme-account.png'),
    path.join(baselineDir, '02-story-root-header.png'),
  )
  copyFileSync(
    path.join(outDir, '03-mobile-header-soft.png'),
    path.join(baselineDir, '03-story-root-mobile.png'),
  )

  const meta = {
    story: 'STORY-SPA-NS-13-hide-header-search-notifications',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_search_api: false,
    invent_notification_center: false,
    fails,
    probeLight: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', fails)
  if (fails.length) process.exitCode = 2
} finally {
  await browser.close()
}
