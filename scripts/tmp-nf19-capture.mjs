/**
 * NF-19 Path A — map basemap follows data-theme (ARCH-DELTA §7).
 * tip: Carto positron (light) · dark-matter (dark)
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF19_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-19-map-basemap-follows-theme',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base =
  process.env.NF19_BASE || process.env.NF18_BASE || 'http://127.0.0.1:5173'

const POSITRON = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const DARK_MATTER = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function openFeedMap(theme) {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('dogestonia.theme', t)
    } catch {
      /* ignore */
    }
  }, theme)
  await sleep(300)
  const mapBtn = await page.$('[data-testid="feed-list-map-toggle"] button:nth-child(2)')
  if (mapBtn) {
    await mapBtn.click()
  } else {
    // fallback: any map toggle control
    await page.evaluate(() => {
      const btns = document.querySelectorAll('[data-testid="feed-list-map-toggle"] button')
      if (btns[1]) btns[1].click()
    })
  }
  await page.waitForSelector('[data-testid="feed-map-area"]', { timeout: 20000 }).catch(() => {})
  await page.waitForSelector('[data-testid="maplibre-map"]', { timeout: 25000 }).catch(() => {})
  await sleep(1200)
}

async function probeBasemap() {
  return page.evaluate(() => {
    const root = document.querySelector('[data-testid="maplibre-map"]')
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      basemap: root?.getAttribute('data-nf19-basemap') || null,
      styleUrl: root?.getAttribute('data-map-style-url') || null,
      hasMap: Boolean(root),
      mapArea: Boolean(document.querySelector('[data-testid="feed-map-area"]')),
    }
  })
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

// UI-0 baseline (light host before map toggle)
await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(baselineDir, 'ui0-next-feed-host.png', el)
  await capture(outDir, '01-next-feed-map-host.png', el)
}

await openFeedMap('light')
let probe = await probeBasemap()
console.log('probe-light', JSON.stringify(probe))
if (!probe.hasMap) fails.push('maplibre-map missing (light)')
if (probe.basemap !== 'light') fails.push(`basemap=${probe.basemap} expected light`)
if (probe.styleUrl !== POSITRON) fails.push(`styleUrl light=${probe.styleUrl}`)
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '02-light-positron.png', el)
}

await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
  try {
    localStorage.setItem('dogestonia.theme', 'dark')
  } catch {
    /* ignore */
  }
})
await sleep(1500)
probe = await probeBasemap()
console.log('probe-dark', JSON.stringify(probe))
if (probe.basemap !== 'dark') fails.push(`basemap=${probe.basemap} expected dark`)
if (probe.styleUrl !== DARK_MATTER) fails.push(`styleUrl dark=${probe.styleUrl}`)
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '03-dark-matter.png', el)
}

await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'light')
  try {
    localStorage.setItem('dogestonia.theme', 'light')
  } catch {
    /* ignore */
  }
})
await sleep(1500)
probe = await probeBasemap()
console.log('probe-toggle', JSON.stringify(probe))
if (probe.basemap !== 'light') fails.push(`toggle basemap=${probe.basemap}`)
if (probe.styleUrl !== POSITRON) fails.push(`toggle styleUrl=${probe.styleUrl}`)
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '04-theme-toggle-setstyle.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(800)
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '05-narrow-map.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-19-map-basemap-follows-theme',
  utc: new Date().toISOString(),
  visual_gate: 'BLOCK',
  partial: true,
  op_eye: 'Absent',
  fails,
  md5s,
  probe_final: probe,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify(meta, null, 2))

await browser.close()
if (fails.length) {
  console.error('STRUCTURE_FAILS', fails)
  process.exit(1)
}
console.log('STRUCTURE_OK visual_gate=BLOCK')
