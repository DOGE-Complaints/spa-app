/**
 * NS-12 Path A — freeze My stories in ProfileRail (Interview R4).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · keep code gated.
 *
 * Env: NS12_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-12-freeze-rail-my-stories',
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
const base = process.env.NS12_BASE || 'http://127.0.0.1:5173'

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
  await page.waitForSelector('[data-testid="profile-rail"], [data-testid="public-header"]', {
    timeout: 20000,
  })
  await sleep(800)
}

async function probe() {
  return page.evaluate(() => {
    const rail = document.querySelector('[data-testid="profile-rail"]')
    const myStories = document.querySelector('[data-testid="profile-rail-nav-my-stories"]')
    const feed = document.querySelector('[data-testid="profile-rail-nav-board"]')
    const profile = document.querySelector('[data-testid="profile-rail-nav-profile"]')
    const mobile = document.querySelector('[data-testid="mobile-bottom-nav"]')
    const mobileMy = document.querySelector('[data-testid="mobile-bottom-nav-my-stories"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      rail: Boolean(rail),
      ns12: rail?.getAttribute('data-ns12') || null,
      myStories: Boolean(myStories),
      feed: Boolean(feed),
      feedHref: feed?.getAttribute('href') || null,
      profile: Boolean(profile),
      profileHref: profile?.getAttribute('href') || null,
      mobile: Boolean(mobile),
      mobileNs12: mobile?.getAttribute('data-ns12') || null,
      mobileMyStories: Boolean(mobileMy),
    }
  })
}

try {
  await openFeed()
  await setTheme('light')
  let p = await probe()
  console.log('probeLight', JSON.stringify(p))

  if (!p.rail) fails.push('missing profile-rail')
  if (p.ns12 !== 'my-stories-gated') fails.push(`ns12 attr ${p.ns12}`)
  if (p.myStories) fails.push('My stories still Present')
  if (!p.feed) fails.push('missing Feed')
  if (!p.profile) fails.push('missing Profile')
  if (p.mobileMyStories) fails.push('mobile My stories Present')

  const rail = await page.$('[data-testid="profile-rail"]')
  const shell = await page.$('.app-shell')
  await capture(outDir, '01-rail-no-my-stories-light.png', rail || shell || (await page.$('body')))
  await capture(outDir, '02-feed-profile-held.png', rail || shell || (await page.$('body')))

  // soft mobile: force narrow viewport
  await page.setViewport({ width: 390, height: 844 })
  await sleep(400)
  p = await probe()
  console.log('probeMobile', JSON.stringify(p))
  if (p.mobileMyStories) fails.push('mobile My stories after narrow')
  const mobile = await page.$('[data-testid="mobile-bottom-nav"]')
  await capture(outDir, '03-mobile-soft.png', mobile || shell || (await page.$('body')))

  await page.setViewport({ width: 1536, height: 1024 })
  await setTheme('dark')
  p = await probe()
  console.log('probeDark', JSON.stringify(p))
  if (p.myStories) fails.push('My stories Present in dark')
  await capture(outDir, '04-rail-dark-held.png', (await page.$('[data-testid="profile-rail"]')) || shell || (await page.$('body')))
  await capture(outDir, '05-rail-honesty.png', (await page.$('[data-testid="profile-rail"]')) || shell || (await page.$('body')))

  copyFileSync(path.join(outDir, '01-rail-no-my-stories-light.png'), path.join(storyShotDir, '01-story-root-rail-no-my-stories.png'))
  copyFileSync(path.join(outDir, '02-feed-profile-held.png'), path.join(storyShotDir, '02-story-root-feed-profile-held.png'))
  copyFileSync(path.join(outDir, '03-mobile-soft.png'), path.join(storyShotDir, '03-story-root-mobile-soft.png'))
  copyFileSync(path.join(outDir, '01-rail-no-my-stories-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-feed-profile-held.png'), path.join(baselineDir, '02-story-root-rail.png'))
  copyFileSync(path.join(outDir, '03-mobile-soft.png'), path.join(baselineDir, '03-story-root-mobile.png'))

  const meta = {
    story: 'STORY-SPA-NS-12-freeze-rail-my-stories',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_story_list: false,
    invent_cab08: false,
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
