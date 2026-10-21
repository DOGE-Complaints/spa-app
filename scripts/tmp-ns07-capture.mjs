/**
 * NS-07 Path A — shell dark icon chrome readable.
 * mask/currentColor · OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NS07_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-07-shell-dark-icon-chrome',
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
const base = process.env.NS07_BASE || 'http://127.0.0.1:5173'

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
  await sleep(400)
}

async function openFeed() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"]', { timeout: 20000 }).catch(() => {})
  await sleep(800)
}

async function probeIcons() {
  return page.evaluate(() => {
    const masks = [...document.querySelectorAll('[data-ns07="mask"]')]
    const header = document.querySelector('[data-testid="public-header"]')
    const rail = document.querySelector('[data-testid="profile-rail"]')
    const bottom = document.querySelector('[data-testid="mobile-bottom-nav"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      maskCount: masks.length,
      headerPresent: Boolean(header),
      headerMasks: header ? header.querySelectorAll('[data-ns07="mask"]').length : 0,
      railPresent: Boolean(rail),
      railMasks: rail ? rail.querySelectorAll('[data-ns07="mask"]').length : 0,
      bottomPresent: Boolean(bottom),
      searchSrc: header
        ?.querySelector('[data-testid="public-header-search-affordance"] [data-ns07-icon-src]')
        ?.getAttribute('data-ns07-icon-src'),
    }
  })
}

try {
  await openFeed()

  // 01 host light
  await setTheme('light')
  await capture(outDir, '01-next-feed-host-light.png', await page.$('body'))

  // 02 dark header chrome
  await setTheme('dark')
  const header = await page.$('[data-testid="public-header"]')
  if (header) await capture(outDir, '02-header-icons-dark.png', header)
  else fails.push('header-missing')

  // 03 dark rail
  const rail = await page.$('[data-testid="profile-rail"]')
  if (rail) await capture(outDir, '03-rail-icons-dark.png', rail)
  else {
    // soft: capture shell body if rail hidden on this layout
    const shell = (await page.$('[data-testid="app-shell"]')) || (await page.$('body'))
    await capture(outDir, '03-rail-icons-dark.png', shell)
    fails.push('rail-soft-fallback')
  }

  // 04 narrow dark mobile nav
  await page.setViewport({ width: 390, height: 844 })
  await sleep(500)
  await setTheme('dark')
  const bottom = await page.$('[data-testid="mobile-bottom-nav"]')
  if (bottom) await capture(outDir, '04-mobile-nav-icons-dark.png', bottom)
  else {
    await capture(outDir, '04-mobile-nav-icons-dark.png', await page.$('body'))
    fails.push('bottom-soft-fallback')
  }

  // 05 light hold (narrow)
  await setTheme('light')
  await capture(outDir, '05-light-theme-hold.png', await page.$('body'))

  const probe = await probeIcons()
  console.log('PROBE', JSON.stringify(probe))

  // story-root aliases
  const aliases = [
    ['01-next-feed-host-light.png', '01-story-root-host.png'],
    ['02-header-icons-dark.png', '02-story-root-header-dark.png'],
    ['03-rail-icons-dark.png', '03-story-root-rail-dark.png'],
  ]
  for (const [src, dest] of aliases) {
    copyFileSync(path.join(outDir, src), path.join(storyShotDir, dest))
    copyFileSync(path.join(outDir, src), path.join(baselineDir, dest))
  }

  const meta = {
    story: 'STORY-SPA-NS-07-shell-dark-icon-chrome',
    captured_at: new Date().toISOString(),
    base,
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails: fails.filter((f) => !f.includes('soft')),
    soft_fails: fails.filter((f) => f.includes('soft')),
    probe,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails: meta.fails, maskCount: probe.maskCount, theme: probe.theme }))
} finally {
  await browser.close()
}
