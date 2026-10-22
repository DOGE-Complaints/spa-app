/**
 * NS-09 Path A — ProfileRail Feed cleanup.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / activity API.
 *
 * Env: NS09_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-09-profile-rail-feed-cleanup',
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
const base = process.env.NS09_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 800 })
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
  await sleep(300)
}

async function openFeed() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="profile-rail"], [data-testid="public-header"]', {
    timeout: 20000,
  }).catch(() => {})
  await sleep(600)
}

async function probe() {
  return page.evaluate(() => {
    const rail = document.querySelector('[data-testid="profile-rail"]')
    const summary = document.querySelector('[data-testid="profile-rail-summary"]')
    const empty = document.querySelector('[data-testid="profile-rail-empty"]')
    const feedLabel = document.querySelector('[data-testid="profile-rail-nav-feed-label"]')
    const feedLink = document.querySelector('[data-testid="profile-rail-nav-board"]')
    const profileNav = document.querySelector('[data-testid="profile-rail-nav-profile"]')
    const bodyText = rail?.textContent || ''
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      railPresent: Boolean(rail),
      ns09: rail?.getAttribute('data-ns09') === 'rail',
      summaryAbsent: !summary,
      emptyAbsent: !empty,
      noStoriesAbsent: !/No stories yet/i.test(bodyText),
      feedLabel: feedLabel?.textContent?.trim() || null,
      feedHref: feedLink?.getAttribute('href') || null,
      profileNavPresent: Boolean(profileNav),
    }
  })
}

try {
  await openFeed()
  await setTheme('light')
  let p = await probe()
  if (!p.railPresent) fails.push('rail-absent')
  if (!p.summaryAbsent) fails.push('summary-present')
  if (!p.emptyAbsent || !p.noStoriesAbsent) fails.push('empty-present')
  if (!p.ns09) fails.push('ns09-marker-absent')
  if (!/^Feed$/i.test(p.feedLabel || '')) fails.push('feed-label-miss')
  if (!p.feedHref || !/\/next\/feed\/?$/.test(p.feedHref.replace(/^#/, ''))) fails.push('feed-href-miss')

  const shell = await page.$('.app-shell, [data-testid="profile-rail"]')
  const rail = await page.$('[data-testid="profile-rail"]')
  await capture(outDir, '01-host-light.png', shell || rail)
  await capture(outDir, '04-host-light-hold.png', shell || rail)

  await setTheme('dark')
  p = await probe()
  await capture(outDir, '02-rail-dark-feed.png', rail || shell)
  await capture(outDir, '03-rail-nav-profile.png', rail || shell)

  await page.setViewport({ width: 390, height: 844 })
  await openFeed()
  await setTheme('light')
  const mobileNav = await page.$('[data-testid="mobile-bottom-nav"]')
  if (mobileNav) {
    const mobileText = await page.evaluate((el) => el.textContent, mobileNav)
    if (!/Feed/i.test(mobileText || '')) fails.push('mobile-feed-miss')
    await capture(outDir, '05-mobile-feed-soft.png', mobileNav)
  } else {
    fails.push('mobile-nav-absent')
    await capture(outDir, '05-mobile-feed-soft.png', await page.$('body'))
  }

  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(storyShotDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-rail-dark-feed.png'), path.join(storyShotDir, '02-story-root-rail-dark.png'))
  copyFileSync(path.join(outDir, '03-rail-nav-profile.png'), path.join(storyShotDir, '03-story-root-rail-empty.png'))
  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-rail-dark-feed.png'), path.join(baselineDir, '02-story-root-rail-dark.png'))
  copyFileSync(path.join(outDir, '03-rail-nav-profile.png'), path.join(baselineDir, '03-story-root-rail-empty.png'))

  const meta = {
    story: 'STORY-SPA-NS-09-profile-rail-feed-cleanup',
    captured_utc: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial: 'BLOCK',
    fails,
    probe: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probe: p }))
} finally {
  await browser.close()
}

if (fails.length) {
  console.error('NS09 capture fails', fails)
  process.exit(1)
}
