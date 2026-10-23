/**
 * NS-11 Path A — /profile next shell (Header + ProfileRail + PublicFooter).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / CDN / CAB-08 / NS-12.
 *
 * Env: NS11_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-11-profile-next-shell',
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
const base = process.env.NS11_BASE || 'http://127.0.0.1:5173'

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
  await page.waitForSelector('.next-shell-profile, [data-testid="public-header"], [data-testid="app-shell"]', {
    timeout: 20000,
  })
  await sleep(800)
}

async function probe() {
  return page.evaluate(() => {
    const shell = document.querySelector('.app-shell')
    const profileShell = document.querySelector('.next-shell-route.next-shell-profile')
    const header = document.querySelector('[data-testid="public-header"]')
    const rail = document.querySelector('[data-testid="profile-rail"]')
    const footer = document.querySelector('[data-testid="public-footer"]')
    const workspace = document.querySelector('.board-sidebar-workspace')
    const classicBoard = document.querySelector('[data-testid="app-shell-nav-board"]')
    const classicProfile = document.querySelector('[data-testid="app-shell-nav-profile"]')
    const cabinet =
      document.querySelector('[data-testid="user-cabinet-page"]') ||
      document.querySelector('[data-testid="cabinet-shell-skeleton"]') ||
      document.querySelector('[data-testid="session-shell-overlay"]')
    const brand = document.querySelector('[data-testid="public-header-brand"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      profileShell: Boolean(profileShell),
      header: Boolean(header),
      rail: Boolean(rail),
      footer: Boolean(footer),
      workspaceLabel: Boolean(workspace),
      classicBoardNav: Boolean(classicBoard),
      classicProfileNav: Boolean(classicProfile),
      mainRegion: Boolean(cabinet),
      brandHref: brand?.getAttribute('href') || null,
      shellClass: shell?.className || '',
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
  if (p.workspaceLabel) fails.push('workspace label still present')
  if (p.classicBoardNav || p.classicProfileNav) fails.push('classic WORKSPACE nav still present')
  const brandOk =
    p.brandHref === '/next/feed' ||
    p.brandHref === '#/next/feed' ||
    (typeof p.brandHref === 'string' && p.brandHref.endsWith('/next/feed'))
  if (!brandOk) fails.push(`brand href ${p.brandHref}`)

  const shell = await page.$('.app-shell')
  const header = await page.$('[data-testid="public-header"]')
  const rail = await page.$('[data-testid="profile-rail"]')
  const footer = await page.$('[data-testid="public-footer"]')
  const main =
    (await page.$('[data-testid="user-cabinet-page"]')) ||
    (await page.$('[data-testid="cabinet-shell-skeleton"]')) ||
    (await page.$('.app-shell__main')) ||
    shell

  await capture(outDir, '01-profile-next-shell-light.png', shell || (await page.$('body')))
  await capture(outDir, '02-profile-no-workspace.png', rail || shell || (await page.$('body')))
  await capture(outDir, '03-profile-cabinet-main.png', main || shell || (await page.$('body')))
  await capture(outDir, '04-profile-footer.png', footer || shell || (await page.$('body')))

  await setTheme('dark')
  p = await probe()
  console.log('probeDark', JSON.stringify(p))
  if (!p.profileShell || !p.header || !p.rail) fails.push('dark shell markers missing')
  await capture(outDir, '05-profile-dark-held.png', shell || (await page.$('body')))

  // story-root + baseline copies
  copyFileSync(path.join(outDir, '01-profile-next-shell-light.png'), path.join(storyShotDir, '01-story-root-profile-header-rail.png'))
  copyFileSync(path.join(outDir, '02-profile-no-workspace.png'), path.join(storyShotDir, '02-story-root-no-workspace-sidebar.png'))
  copyFileSync(path.join(outDir, '04-profile-footer.png'), path.join(storyShotDir, '03-story-root-footer-parity.png'))
  copyFileSync(path.join(outDir, '01-profile-next-shell-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-profile-no-workspace.png'), path.join(baselineDir, '02-story-root-rail.png'))
  copyFileSync(path.join(outDir, '03-profile-cabinet-main.png'), path.join(baselineDir, '03-story-root-main.png'))

  const meta = {
    story: 'STORY-SPA-NS-11-profile-next-shell',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_cdn: false,
    invent_cab08: false,
    invent_ns12: false,
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
