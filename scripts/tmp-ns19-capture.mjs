/**
 * NS-19 Path A — Mobile bottom nav density + frozen Wallet (M179).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no CAB-08 unfreeze.
 *
 * Env: NS19_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen',
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
const base = process.env.NS19_BASE || 'http://127.0.0.1:5173'

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
    const nav = document.querySelector('[data-testid="mobile-bottom-nav"]')
    const feed = document.querySelector('[data-testid="mobile-bottom-nav-board"]')
    const profile = document.querySelector('[data-testid="mobile-bottom-nav-profile"]')
    const wallet = document.querySelector('[data-testid="mobile-bottom-nav-wallet"]')
    const navStyle = nav ? getComputedStyle(nav) : null
    const itemStyle = feed ? getComputedStyle(feed) : null
    const walletHref = wallet?.getAttribute('href')
    const drawer = document.querySelector('[data-testid="mobile-app-bar-drawer"]')
    return {
      present: Boolean(nav),
      display: navStyle?.display || null,
      lab: nav?.getAttribute('data-lab-ns19'),
      harmony: nav?.getAttribute('data-ns19-harmony'),
      cab08: nav?.getAttribute('data-ns19-cab08'),
      navHeight: nav ? nav.getBoundingClientRect().height : null,
      itemMinH: itemStyle?.minHeight || null,
      itemMinW: itemStyle?.minWidth || null,
      feedHref: feed?.getAttribute('href') || null,
      profileHref: profile?.getAttribute('href') || null,
      walletFrozen: wallet?.getAttribute('data-ns19-wallet') || null,
      walletAriaDisabled: wallet?.getAttribute('aria-disabled') || null,
      walletHref,
      walletTag: wallet?.tagName?.toLowerCase() || null,
      drawerWallet: drawer ? /Wallet/i.test(drawer.textContent || '') : null,
    }
  })
}

try {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="mobile-bottom-nav"], [data-testid="mobile-app-bar"]', {
    timeout: 30000,
  })
  await sleep(800)
  await setTheme('light')

  probes.feedLight = await probe()
  if (!probes.feedLight.present) fails.push('nav-absent')
  if (probes.feedLight.lab !== 'true') fails.push('lab')
  if (probes.feedLight.harmony !== 'm179') fails.push('harmony')
  if (probes.feedLight.cab08 !== 'held') fails.push('cab08')
  const feedOk = /(?:^|#)\/next\/feed\/?$/.test(probes.feedLight.feedHref || '')
  const profileOk = /(?:^|#)\/profile\/?$/.test(probes.feedLight.profileHref || '')
  if (!feedOk) fails.push('feed-href')
  if (!profileOk) fails.push('profile-href')
  if (probes.feedLight.walletFrozen !== 'frozen') fails.push('wallet-not-frozen')
  if (probes.feedLight.walletAriaDisabled !== 'true') fails.push('wallet-aria')
  if (probes.feedLight.walletHref) fails.push('wallet-href-invent')
  if (probes.feedLight.walletTag === 'a') fails.push('wallet-is-link')
  if (probes.feedLight.navHeight != null && probes.feedLight.navHeight > 80) fails.push('nav-still-tall')

  const navEl = await page.$('[data-testid="mobile-bottom-nav"]')
  const shellEl = await page.$('.app-shell')
  if (navEl) await capture('01-bottom-nav-feed-frozen-wallet-390x844.png', navEl)
  else if (shellEl) await capture('01-bottom-nav-feed-frozen-wallet-390x844.png', shellEl)

  await page.goto(`${base}/#/profile`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  probes.profileLight = await probe()
  if (probes.profileLight.walletFrozen !== 'frozen') fails.push('profile-wallet-not-frozen')
  const nav2 = await page.$('[data-testid="mobile-bottom-nav"]')
  const shell2 = await page.$('.app-shell')
  if (nav2) await capture('02-bottom-nav-profile-frozen-wallet-390x844.png', nav2)
  else if (shell2) await capture('02-bottom-nav-profile-frozen-wallet-390x844.png', shell2)

  await setTheme('dark')
  await sleep(200)
  probes.dark = await probe()
  const darkNav = (await page.$('[data-testid="mobile-bottom-nav"]')) || (await page.$('.app-shell'))
  if (darkNav) await capture('03-bottom-nav-dark-390x844.png', darkNav)

  const meta = {
    story: 'STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen',
    pkg: 'pkg-000232',
    gate: 'BLOCK',
    reason:
      'OP eye Absent · Partial visual=BLOCK · structure probes only · no invent PASS · no CAB-08 unfreeze · glyph soft handoff',
    op_eye: 'Absent',
    fails,
    probes,
    md5s,
    utc: new Date().toISOString(),
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(
    path.join(outDir, 'README.md'),
    '# NS-19 Path A captures\n\nOP eye Absent → gate **BLOCK** · Partial visual · no invent PASS.\n',
  )
  writeFileSync(
    path.join(storyShotDir, 'README.md'),
    '# NS-19 story-root screenshots\n\nMirror of full-cycle · gate **BLOCK**.\n',
  )
  console.log('CAPTURE-META', JSON.stringify({ fails, probes: probes.feedLight }))
  if (fails.length) {
    console.error('STRUCTURE_FAILS', fails)
    process.exitCode = 1
  } else {
    console.log('STRUCTURE_PASS fails:[] · gate BLOCK (OP eye Absent)')
  }
} finally {
  await browser.close()
}
