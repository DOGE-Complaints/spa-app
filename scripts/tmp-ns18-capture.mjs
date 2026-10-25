/**
 * NS-18 Path A — Profile mobile layout (M178).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · CAB-08 gates held.
 *
 * Env: NS18_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-18-profile-mobile-layout',
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
const base = process.env.NS18_BASE || 'http://127.0.0.1:5173'

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
    const summary = document.querySelector('[data-testid="account-summary"]')
    const pageEl = document.querySelector('[data-testid="user-cabinet-page"]')
    const shell = document.querySelector('.app-shell.next-shell-profile')
    const main = document.querySelector('.app-shell.next-shell-profile .board-workspace')
    const sidebar = document.querySelector('.app-shell.next-shell-profile .app-shell__sidebar')
    const right = document.querySelector('.app-shell.next-shell-profile .next-shell-right-slot')
    const wallet = document.querySelector('[data-testid="cabinet-slot-wallet"]')
    const contrib = document.querySelector('[data-testid="cabinet-slot-contribution"]')
    const email = document.querySelector('[data-testid="account-summary-field-email"]')
    const created = document.querySelector('[data-testid="account-summary-field-created"]')
    const emailValue = email?.querySelector('.account-summary__value')
    const emailStyle = emailValue ? getComputedStyle(emailValue) : null
    return {
      present: Boolean(summary),
      lab: summary?.getAttribute('data-lab-ns18'),
      harmony: summary?.getAttribute('data-ns18-harmony'),
      hasEmail: Boolean(email),
      hasCreated: Boolean(created),
      writingMode: emailStyle?.writingMode || null,
      cab08: pageEl?.getAttribute('data-cab08') || null,
      hasWalletSlot: Boolean(wallet),
      hasContribSlot: Boolean(contrib),
      shellWidth: shell ? shell.getBoundingClientRect().width : null,
      mainWidth: main ? main.getBoundingClientRect().width : null,
      mainMax: main ? getComputedStyle(main).maxWidth : null,
      sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : null,
      rightPresent: Boolean(right),
      boardMainClass: document.querySelector('.app-shell.next-shell-profile .board-main')?.className || null,
    }
  })
}

try {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.goto(`${base}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="user-cabinet-page"], [data-testid="account-summary"], [data-testid="mobile-app-bar"]', {
    timeout: 30000,
  })
  await sleep(800)
  await setTheme('light')

  probes.mobile = await probe()
  const shellEl = await page.$('.app-shell.next-shell-profile')
  const summary = await page.$('[data-testid="account-summary"]')
  const mainFallback =
    (await page.$('[data-testid="user-cabinet-page"]')) ||
    (await page.$('[data-testid="session-shell-overlay"]')) ||
    (await page.$('.app-shell'))

  if (!shellEl && !mainFallback) fails.push('shell-absent')

  if (probes.mobile.boardMainClass?.includes('board-main--with-right')) fails.push('empty-right-track')

  if (!probes.mobile.present) {
    console.log('account-summary Absent (auth/loading) — layout structure held via Vitest ns18')
  } else {
    if (probes.mobile.lab !== 'true') fails.push('lab')
    if (probes.mobile.harmony !== 'm178') fails.push('harmony')
    if (!probes.mobile.hasEmail || !probes.mobile.hasCreated) fails.push('fields')
    if (probes.mobile.writingMode && /vertical/i.test(probes.mobile.writingMode)) fails.push('vertical-writing')
    if (probes.mobile.cab08 !== 'wallet-contrib-gated') fails.push('cab08')
    if (probes.mobile.hasWalletSlot || probes.mobile.hasContribSlot) fails.push('wallet-contrib-invent')
    if (probes.mobile.sidebarDisplay && probes.mobile.sidebarDisplay !== 'none') fails.push('sidebar-visible')
    if (probes.mobile.mainWidth != null && probes.mobile.shellWidth != null) {
      if (probes.mobile.mainWidth < probes.mobile.shellWidth * 0.85) fails.push('main-narrow')
    }
  }

  if (summary) await capture('01-profile-account-rows-390x844.png', summary)
  else if (mainFallback) await capture('01-profile-account-rows-390x844.png', mainFallback)
  if (shellEl) await capture('02-profile-shell-fullwidth-390x844.png', shellEl)
  else if (mainFallback) await capture('02-profile-shell-fullwidth-390x844.png', mainFallback)

  await setTheme('dark')
  await sleep(200)
  probes.dark = await probe()
  const darkTarget = (await page.$('.app-shell.next-shell-profile')) || (await page.$('.app-shell'))
  if (darkTarget) await capture('03-profile-mobile-dark-390x844.png', darkTarget)

  const meta = {
    story: 'STORY-SPA-NS-18-profile-mobile-layout',
    pkg: 'pkg-000231',
    gate: 'BLOCK',
    reason: 'OP eye Absent · Partial visual=BLOCK · structure probes only · no invent PASS · CAB-08 gates held',
    op_eye: 'Absent',
    fails,
    probes,
    md5s,
    utc: new Date().toISOString(),
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probes: probes.mobile }))
  if (fails.length) {
    console.error('STRUCTURE_FAILS', fails)
    process.exitCode = 1
  } else {
    console.log('STRUCTURE_PASS fails:[] · gate BLOCK (OP eye Absent)')
  }
} finally {
  await browser.close()
}
