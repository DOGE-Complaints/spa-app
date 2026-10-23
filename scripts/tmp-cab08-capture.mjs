/**
 * CAB-08 Path A — M170 cabinet layout · hide wallet/contrib · story-activity wire.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent contribution API.
 *
 * Env: CAB08_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire',
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
const base = process.env.CAB08_BASE || 'http://127.0.0.1:5173'

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

async function openProfile() {
  await page.goto(`${base}/#/profile`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector(
    '.next-shell-profile, [data-testid="public-header"], [data-testid="app-shell"]',
    { timeout: 20000 },
  )
  await sleep(1000)
}

async function probe() {
  return page.evaluate(() => {
    const cabinet = document.querySelector('[data-testid="user-cabinet-page"]')
    const wallet = document.querySelector('[data-testid="cabinet-slot-wallet"]')
    const contrib = document.querySelector('[data-testid="cabinet-slot-contribution"]')
    const story = document.querySelector('[data-testid="cabinet-slot-story"]')
    const civic = document.querySelector('[data-testid="cabinet-slot-civic"]')
    const goFeed = document.querySelector('[data-testid="story-activity-go-to-feed"]')
    const goBoard = document.querySelector('[data-testid="story-activity-go-to-board"]')
    const compact = document.querySelector('[data-civic-compact="true"]')
    const overlay = document.querySelector('[data-testid="session-shell-overlay"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      profileShell: Boolean(document.querySelector('.next-shell-route.next-shell-profile')),
      header: Boolean(document.querySelector('[data-testid="public-header"]')),
      rail: Boolean(document.querySelector('[data-testid="profile-rail"]')),
      footer: Boolean(document.querySelector('[data-testid="public-footer"]')),
      cabinet: Boolean(cabinet),
      cab08: cabinet?.getAttribute('data-cab08') || null,
      wallet: Boolean(wallet),
      contrib: Boolean(contrib),
      story: Boolean(story),
      civic: Boolean(civic),
      goFeed: Boolean(goFeed),
      goBoard: Boolean(goBoard),
      compact: Boolean(compact),
      overlay: Boolean(overlay),
      storyState:
        document.querySelector('[data-story-activity-card]')?.getAttribute('data-story-activity-state') ||
        null,
    }
  })
}

try {
  await openProfile()
  await setTheme('light')
  let p = await probe()
  console.log('probeLight', JSON.stringify(p))

  if (!p.profileShell) fails.push('missing next-shell-profile')
  if (!p.header) fails.push('missing public-header')
  if (!p.rail) fails.push('missing profile-rail')
  if (!p.footer) fails.push('missing public-footer')

  if (p.cabinet) {
    if (p.cab08 !== 'wallet-contrib-gated') fails.push(`cab08 attr ${p.cab08}`)
    if (p.wallet) fails.push('wallet slot still Present')
    if (p.contrib) fails.push('contribution slot still Present')
    if (!p.story) fails.push('missing story slot')
    if (p.goBoard) fails.push('legacy go-to-board CTA still Present')
  } else {
    console.log('cabinet_auth Absent (session overlay or loading) — structure held via Vitest')
  }

  const shell = await page.$('.app-shell')
  const header = await page.$('[data-testid="public-header"]')
  const rail = await page.$('[data-testid="profile-rail"]')
  const footer = await page.$('[data-testid="public-footer"]')
  const main =
    (await page.$('[data-testid="user-cabinet-page"]')) ||
    (await page.$('[data-testid="session-shell-overlay"]')) ||
    (await page.$('.app-shell__main')) ||
    shell

  await capture(outDir, '01-cab08-shell-light.png', shell || (await page.$('body')))
  await capture(outDir, '02-cab08-header-rail.png', header || rail || shell || (await page.$('body')))
  await capture(outDir, '03-cab08-cabinet-main.png', main || shell || (await page.$('body')))
  await capture(outDir, '04-cab08-footer.png', footer || shell || (await page.$('body')))

  await setTheme('dark')
  p = await probe()
  console.log('probeDark', JSON.stringify(p))
  await capture(outDir, '05-cab08-dark-held.png', shell || (await page.$('body')))

  copyFileSync(path.join(outDir, '01-cab08-shell-light.png'), path.join(storyShotDir, '01-story-root-shell.png'))
  copyFileSync(path.join(outDir, '03-cab08-cabinet-main.png'), path.join(storyShotDir, '02-story-root-cabinet.png'))
  copyFileSync(path.join(outDir, '04-cab08-footer.png'), path.join(storyShotDir, '03-story-root-footer.png'))
  copyFileSync(path.join(outDir, '01-cab08-shell-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '03-cab08-cabinet-main.png'), path.join(baselineDir, '02-story-root-main.png'))
  copyFileSync(path.join(outDir, '02-cab08-header-rail.png'), path.join(baselineDir, '03-story-root-chrome.png'))

  const meta = {
    story: 'STORY-SPA-CAB-08-cabinet-layout-story-activity-wire',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_contribution_api: false,
    cabinet_auth: p.cabinet ? 'Present' : 'Absent',
    fails,
    probeDark: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', fails)
  if (fails.length) process.exitCode = 2
} finally {
  await browser.close()
}
