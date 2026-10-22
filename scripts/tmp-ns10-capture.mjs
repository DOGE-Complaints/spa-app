/**
 * NS-10 Path A — Header brand light/scale/dark SVG.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / mascot / CDN.
 *
 * Env: NS10_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-10-header-logo-light-scale',
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
const base = process.env.NS10_BASE || 'http://127.0.0.1:5173'

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
  await page.waitForSelector('[data-testid="public-header-brand"]', { timeout: 20000 })
  await sleep(800)
}

async function probe() {
  return page.evaluate(() => {
    const brand = document.querySelector('[data-testid="public-header-brand"]')
    const logo = brand?.querySelector('img.header-brand-logo')
    const cs = logo ? getComputedStyle(logo) : null
    const heightPx = cs ? parseFloat(cs.height) : null
    const src = logo?.getAttribute('src') || ''
    const rect = logo?.getBoundingClientRect()
    // Sample a few pixels behind logo for "dark plate" — look at header bg under brand
    const canvasProbe = (() => {
      if (!logo) return { ok: false }
      const r = logo.getBoundingClientRect()
      // sample just outside logo left padding on header
      return {
        logoH: r.height,
        logoW: r.width,
        top: r.top,
      }
    })()
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      brandPresent: Boolean(brand),
      ns10: brand?.getAttribute('data-ns10') === 'brand',
      href: brand?.getAttribute('href') || null,
      src,
      logoTheme: logo?.getAttribute('data-ns10-logo') || null,
      heightPx,
      isSvg: /\.svg(\?|$)/i.test(src),
      isMasterPng: /DOGEstonia-logo-horizontal\.png$/i.test(src),
      isLightAsset: /horizontal-light\.svg$/i.test(src),
      isDarkAsset: /horizontal-dark\.svg$/i.test(src),
      canvasProbe,
      rectH: rect?.height ?? null,
    }
  })
}

try {
  await openFeed()
  await setTheme('light')
  let p = await probe()
  if (!p.brandPresent) fails.push('brand-absent')
  if (!p.ns10) fails.push('ns10-marker-absent')
  if (!p.href || !/\/next\/feed\/?$/.test(p.href.replace(/^#/, ''))) fails.push('home-href-miss')
  if (!p.isSvg || p.isMasterPng) fails.push('light-not-svg')
  if (!p.isLightAsset) fails.push('light-asset-miss')
  if (p.heightPx == null || p.heightPx < 40 || p.heightPx > 48) fails.push('scale-out-of-band')

  const header = await page.$('[data-testid="public-header"]')
  const brand = await page.$('[data-testid="public-header-brand"]')
  const shell = await page.$('.app-shell, [data-testid="public-header"]')

  await capture(outDir, '01-host-light.png', shell || header)
  await capture(outDir, '02-logo-light-no-plate.png', brand || header)
  await capture(outDir, '03-logo-scale-band.png', brand || header)
  await capture(outDir, '05-logo-home-href.png', brand || header)

  await setTheme('dark')
  p = await probe()
  if (!p.isDarkAsset || !p.isSvg) fails.push('dark-asset-miss')
  if (p.heightPx == null || p.heightPx < 40 || p.heightPx > 48) fails.push('dark-scale-out-of-band')
  await capture(outDir, '04-logo-dark-continuous.png', brand || header)

  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(storyShotDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-logo-light-no-plate.png'), path.join(storyShotDir, '02-story-root-logo-light.png'))
  copyFileSync(path.join(outDir, '04-logo-dark-continuous.png'), path.join(storyShotDir, '03-story-root-logo-dark.png'))
  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-logo-light-no-plate.png'), path.join(baselineDir, '02-story-root-logo-light.png'))
  copyFileSync(path.join(outDir, '04-logo-dark-continuous.png'), path.join(baselineDir, '03-story-root-logo-dark.png'))

  const meta = {
    story: 'STORY-SPA-NS-10-header-logo-light-scale',
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
  console.error('NS10 capture fails', fails)
  process.exit(1)
}
