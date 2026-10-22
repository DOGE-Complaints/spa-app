/**
 * NS-08 Path A — locale chevron icon + ES frozen tooltip.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / ES dictionary.
 *
 * Env: NS08_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-08-locale-chevron-es-frozen',
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
const base = process.env.NS08_BASE || 'http://127.0.0.1:5173'

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
  await page.waitForSelector('[data-testid="locale-selector"], [data-testid="public-header"]', {
    timeout: 20000,
  }).catch(() => {})
  await sleep(600)
}

async function openLocaleMenu() {
  await page.evaluate(() => {
    const trigger = document.querySelector('[data-testid="locale-selector-trigger"]')
    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') trigger.click()
  })
  await page.waitForSelector('[data-testid="locale-selector-menu"]', { timeout: 5000 }).catch(() => {})
  await sleep(400)
}

async function probe() {
  await openLocaleMenu()
  return page.evaluate(() => {
    const host = document.querySelector('[data-testid="locale-selector"]')
    const chevron = document.querySelector('[data-testid="locale-selector-chevron"]')
    const frozen = document.querySelector('[data-testid="locale-option-es-frozen"]')
    const et = document.querySelector('[data-testid="locale-option-et"]')
    const menu = document.querySelector('[data-testid="locale-selector-menu"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      hostPresent: Boolean(host),
      chevronMask: chevron?.getAttribute('data-ns07') === 'mask',
      chevronSrc: chevron?.getAttribute('data-ns07-icon-src'),
      menuOpen: Boolean(menu),
      etPresent: Boolean(et),
      esFrozen: Boolean(frozen),
      esDisabled: frozen ? frozen.disabled || frozen.getAttribute('aria-disabled') === 'true' : false,
      esTitle: frozen?.getAttribute('title') || frozen?.closest('li')?.getAttribute('title') || null,
    }
  })
}

try {
  await openFeed()
  await setTheme('light')
  await capture(outDir, '01-next-feed-host-light.png', await page.$('body'))

  await setTheme('dark')
  const locale =
    (await page.$('[data-testid="locale-selector"]')) ||
    (await page.$('[data-testid="public-header"]')) ||
    (await page.$('body'))
  await capture(outDir, '02-locale-trigger-dark.png', locale)

  const probeOpen = await probe()
  console.log('PROBE', JSON.stringify(probeOpen))
  if (!probeOpen.chevronMask) fails.push('chevron-mask-absent')
  if (!probeOpen.esFrozen) fails.push('es-frozen-absent')
  if (probeOpen.esFrozen && !probeOpen.esDisabled) fails.push('es-not-disabled')

  const menuEl =
    (await page.$('[data-testid="locale-selector-menu"]')) ||
    (await page.$('[data-testid="locale-selector"]')) ||
    (await page.$('body'))
  await capture(outDir, '03-locale-menu-es-frozen.png', menuEl)

  const frozenBtn = await page.$('[data-testid="locale-option-es-frozen"]')
  if (frozenBtn) {
    await frozenBtn.hover()
    await sleep(300)
    await capture(outDir, '05-es-frozen-hover.png', frozenBtn)
  } else {
    await capture(outDir, '05-es-frozen-hover.png', menuEl)
    fails.push('es-hover-soft-fallback')
  }

  await setTheme('light')
  await openFeed()
  await setTheme('light')
  await capture(outDir, '04-light-theme-hold.png', await page.$('body'))

  const aliases = [
    ['01-next-feed-host-light.png', '01-story-root-host.png'],
    ['02-locale-trigger-dark.png', '02-story-root-locale-dark.png'],
    ['03-locale-menu-es-frozen.png', '03-story-root-menu-es.png'],
  ]
  for (const [src, dest] of aliases) {
    copyFileSync(path.join(outDir, src), path.join(storyShotDir, dest))
    copyFileSync(path.join(outDir, src), path.join(baselineDir, dest))
  }

  const meta = {
    story: 'STORY-SPA-NS-08-locale-chevron-es-frozen',
    captured_at: new Date().toISOString(),
    base,
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails: fails.filter((f) => !f.includes('soft')),
    soft_fails: fails.filter((f) => f.includes('soft')),
    probe: probeOpen,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails: meta.fails, chevronMask: probeOpen.chevronMask, esFrozen: probeOpen.esFrozen }))
} finally {
  await browser.close()
}
