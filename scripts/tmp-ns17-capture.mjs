/**
 * NS-17 Path A — Mobile AppBar brand + burger drawer (M177).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent Wallet.
 *
 * Env: NS17_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-17-mobile-appbar-burger-drawer',
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
const base = process.env.NS17_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []
const probes = {}

async function capture(file, el) {
  const dest = path.join(outDir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
  copyFileSync(dest, path.join(storyShotDir, file))
  copyFileSync(dest, path.join(baselineDir, file))
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
  await sleep(300)
}

async function probe() {
  return page.evaluate(() => {
    const bar = document.querySelector('[data-testid="mobile-app-bar"]')
    if (!bar) return { present: false }
    const brand = bar.querySelector('[data-testid="mobile-app-bar-brand"] img')
    const title = bar.querySelector('[data-testid="mobile-app-bar-title"]')
    const drawer = document.querySelector('[data-testid="mobile-app-bar-drawer"]')
    const wallet = drawer?.textContent?.match(/Wallet/i)
    const shell = document.querySelector('.app-shell.next-shell-route')
    const main = document.querySelector('.app-shell.next-shell-route .board-workspace')
    return {
      present: true,
      lab: bar.getAttribute('data-lab-ns17'),
      harmony: bar.getAttribute('data-ns17-harmony'),
      hasBrand: Boolean(brand),
      brandSrc: brand?.getAttribute('src') || null,
      hasWipTitle: Boolean(title),
      drawerOpen: Boolean(drawer),
      hasAccount: Boolean(document.querySelector('[data-testid="mobile-drawer-nav-account"]')),
      hasFeed: Boolean(document.querySelector('[data-testid="mobile-drawer-nav-feed"]')),
      hasMyStories: Boolean(document.querySelector('[data-testid="mobile-drawer-nav-my-stories"]')),
      hasCta: Boolean(document.querySelector('[data-testid="mobile-drawer-cta-submit"]')),
      hasWallet: Boolean(wallet),
      shellWidth: shell ? shell.getBoundingClientRect().width : null,
      mainMax: main ? getComputedStyle(main).maxWidth : null,
    }
  })
}

try {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="mobile-app-bar"]', { timeout: 25000 })
  await setTheme('light')

  probes.closed = await probe()
  if (!probes.closed.present) fails.push('bar-absent')
  if (probes.closed.lab !== 'true') fails.push('lab')
  if (probes.closed.harmony !== 'm177') fails.push('harmony')
  if (!probes.closed.hasBrand) fails.push('brand')
  if (probes.closed.hasWipTitle) fails.push('wip-title')
  if (probes.closed.brandSrc && /logo-big/i.test(probes.closed.brandSrc)) fails.push('logo-big')

  const bar = await page.$('[data-testid="mobile-app-bar"]')
  if (bar) await capture('01-mobile-appbar-brand-closed-390x844.png', bar)

  await page.click('[data-testid="mobile-app-bar-leading"]')
  await page.waitForSelector('[data-testid="mobile-app-bar-drawer"]', { visible: true, timeout: 5000 })
  await sleep(300)
  probes.open = await probe()
  if (!probes.open.drawerOpen) fails.push('drawer')
  if (!probes.open.hasAccount || !probes.open.hasFeed || !probes.open.hasMyStories) fails.push('primary-ia')
  if (!probes.open.hasCta) fails.push('cta')
  if (probes.open.hasWallet) fails.push('wallet-invent')

  const shell = await page.$('.app-shell.next-shell-route')
  if (shell) await capture('02-mobile-drawer-open-ia-390x844.png', shell)
  else {
    const drawer = await page.$('[data-testid="mobile-app-bar-drawer"]')
    if (drawer) await capture('02-mobile-drawer-open-ia-390x844.png', drawer)
  }

  await page.click('[data-testid="mobile-app-bar-drawer-close"]')
  await sleep(200)
  if (shell) await capture('03-mobile-viewport-fullbleed-390x844.png', shell)

  await setTheme('dark')
  await page.click('[data-testid="mobile-app-bar-leading"]')
  await page.waitForSelector('[data-testid="mobile-app-bar-drawer"]', { visible: true })
  await sleep(200)
  probes.dark = await probe()
  if (shell) await capture('04-mobile-drawer-dark-390x844.png', shell)

  await page.setViewport({ width: 1536, height: 1024 })
  await sleep(400)
  probes.desktop = await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="mobile-app-bar"]')
    if (!bar) return { display: null }
    return { display: getComputedStyle(bar).display }
  })

  const meta = {
    story: 'STORY-SPA-NS-17-mobile-appbar-burger-drawer',
    pkg: 'pkg-000230',
    gate: 'BLOCK',
    reason: 'OP eye Absent · Partial visual=BLOCK · structure probes only · no invent PASS · no invent Wallet',
    op_eye: 'Absent',
    fails,
    probes,
    md5s,
    utc: new Date().toISOString(),
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probes: { closed: probes.closed, open: probes.open } }))
  if (fails.length) {
    console.error('STRUCTURE_FAILS', fails)
    process.exitCode = 1
  } else {
    console.log('STRUCTURE_PASS fails:[] · gate BLOCK (OP eye Absent)')
  }
} finally {
  await browser.close()
}
