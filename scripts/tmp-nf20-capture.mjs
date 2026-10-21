/**
 * NF-20 Path A — cluster leaves reachable (ARCH-DELTA §8).
 * getClusterLeaves → list/sheet · OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF20_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-20-map-cluster-leaves-reachable',
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
const base =
  process.env.NF20_BASE || process.env.NF19_BASE || 'http://127.0.0.1:5173'

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

async function openFeedMap() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    try {
      localStorage.setItem('dogestonia.theme', 'light')
    } catch {
      /* ignore */
    }
  })
  await sleep(300)
  await page.evaluate(() => {
    const btns = document.querySelectorAll('[data-testid="feed-list-map-toggle"] button')
    if (btns[1]) btns[1].click()
  })
  await page.waitForSelector('[data-testid="feed-map-area"]', { timeout: 20000 }).catch(() => {})
  await page.waitForSelector('[data-testid="maplibre-map"]', { timeout: 25000 }).catch(() => {})
  await sleep(1800)
}

async function probeLeaves() {
  return page.evaluate(() => {
    const root = document.querySelector('[data-testid="board-issues-map"]')
    const sheet = document.querySelector('[data-testid="board-map-cluster-leaves"]')
    const list = document.querySelector('[data-testid="board-map-cluster-leaves-list"]')
    const leafLinks = document.querySelectorAll('[data-testid^="board-map-cluster-leaf-"]')
    return {
      hasMap: Boolean(document.querySelector('[data-testid="maplibre-map"]')),
      hasBoardMap: Boolean(root),
      nf20Leaves: root?.getAttribute('data-nf20-leaves') || null,
      sheetPresent: Boolean(sheet),
      leafCount: leafLinks.length,
      listPresent: Boolean(list),
    }
  })
}

/** Click approximate cluster center in map canvas (best-effort). */
async function tryClickCluster() {
  return page.evaluate(async () => {
    const canvas = document.querySelector('[data-testid="maplibre-map"] canvas')
    const mapRoot = document.querySelector('[data-testid="maplibre-map"]')
    if (!canvas || !mapRoot) return { ok: false, reason: 'no-canvas' }
    const rect = canvas.getBoundingClientRect()
    // Sample a grid; MapLibre cluster layers respond to synthetic click if hit.
    const pts = [
      [0.5, 0.45],
      [0.48, 0.5],
      [0.52, 0.5],
      [0.45, 0.48],
      [0.55, 0.48],
      [0.5, 0.55],
    ]
    for (const [fx, fy] of pts) {
      const x = rect.left + rect.width * fx
      const y = rect.top + rect.height * fy
      const el = document.elementFromPoint(x, y) || canvas
      for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
        el.dispatchEvent(
          new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            view: window,
          }),
        )
      }
      await new Promise((r) => setTimeout(r, 200))
      if (document.querySelector('[data-testid="board-map-cluster-leaves"]')) {
        return { ok: true, reason: 'sheet', x, y }
      }
      if (document.querySelector('[data-testid="board-map-pin-popup"]')) {
        return { ok: true, reason: 'popup', x, y }
      }
    }
    return { ok: false, reason: 'no-hit' }
  })
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(baselineDir, 'ui0-next-feed-host.png', el)
  await capture(outDir, '01-next-feed-map-host.png', el)
  await capture(storyShotDir, '01-story-root-host.png', el)
}

await openFeedMap()
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '02-map-with-clusters.png', el)
  await capture(storyShotDir, '02-story-root-map.png', el)
}

const clickResult = await tryClickCluster()
console.log('click-cluster', JSON.stringify(clickResult))
await sleep(800)
let probe = await probeLeaves()
console.log('probe-after-click', JSON.stringify(probe))
if (!probe.hasMap) fails.push('maplibre-map missing')
if (!probe.hasBoardMap) fails.push('board-issues-map missing')

{
  const el =
    (await page.$('[data-testid="board-map-cluster-leaves"]')) ||
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '03-cluster-leaves-or-map.png', el)
  await capture(storyShotDir, '03-story-root-leaves.png', el)
}

if (probe.sheetPresent && probe.leafCount >= 2) {
  const firstLeaf = await page.$('[data-testid^="board-map-cluster-leaf-"]')
  if (firstLeaf) {
    await firstLeaf.click()
    await sleep(1200)
  }
}
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(outDir, '04-after-leaf-or-map.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await openFeedMap()
await tryClickCluster()
await sleep(600)
probe = await probeLeaves()
console.log('probe-narrow', JSON.stringify(probe))
{
  const el =
    (await page.$('[data-testid="feed-map-area"]')) ||
    (await page.$('[data-testid="maplibre-map"]')) ||
    (await page.$('main'))
  await capture(outDir, '05-narrow-map.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-20-map-cluster-leaves-reachable',
  utc: new Date().toISOString(),
  visual_gate: 'BLOCK',
  partial: true,
  op_eye: 'Absent',
  fails,
  md5s,
  clickResult,
  probe_final: probe,
  note:
    'Structure via vitest getClusterLeaves; live sheet Present when cluster hit. OP eye Absent = BLOCK.',
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify(meta, null, 2))

await browser.close()
if (fails.length) {
  console.error('STRUCTURE_FAILS', fails)
  process.exit(1)
}
console.log('STRUCTURE_OK visual_gate=BLOCK')
