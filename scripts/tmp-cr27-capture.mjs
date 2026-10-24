/**
 * CR-27 Path A — list feed hydrate own reactions (reuse CR-25 tree lift).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / gateway schema.
 *
 * Env: CR27_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-27-list-own-reactions-hydrate',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR27_BASE || process.env.CR26_BASE || 'http://127.0.0.1:5173'

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
  return md5
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

/* 1) next/feed list — Prefer product list path */
await page.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await sleep(1500)
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))

const listProbe = await page.evaluate(() => {
  const list = document.querySelector('[data-testid="feed-list"]')
  const cards = [...document.querySelectorAll('[data-testid="feed-list-card-shelter"]')]
  const first = cards[0]
  const strip = first?.querySelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
  )
  const own = first?.querySelector('[data-testid^="reaction-summary-own-"]')
  return {
    listCr27: list?.getAttribute('data-feed-cr27-list'),
    cardCount: cards.length,
    cardCr27: first?.getAttribute('data-feed-cr27'),
    selectedCount: first?.getAttribute('data-feed-cr27-selected-count'),
    stripCr25: strip?.getAttribute('data-feed-cr25'),
    stripCount: strip?.getAttribute('data-feed-cr25-selected-count'),
    hasOwn: Boolean(own),
  }
})
probes.list = listProbe
console.log('listProbe', JSON.stringify(listProbe))

if (listProbe.listCr27 !== 'true' && listProbe.cardCount > 0) {
  fails.push(`listCr27=${listProbe.listCr27}`)
}

if (listProbe.cardCount > 0) {
  try {
    await page.waitForFunction(
      () => {
        const card = document.querySelector('[data-testid="feed-list-card-shelter"]')
        const n = card?.getAttribute('data-feed-cr27-selected-count')
        return n !== null && n !== undefined && Number(n) >= 0
      },
      { timeout: 20000 },
    )
  } catch {
    fails.push('list-hydrate-wait-timeout')
  }
  const after = await page.evaluate(() => {
    const card = document.querySelector('[data-testid="feed-list-card-shelter"]')
    const strip = card?.querySelector(
      '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
    )
    return {
      selectedCount: card?.getAttribute('data-feed-cr27-selected-count'),
      stripCount: strip?.getAttribute('data-feed-cr25-selected-count'),
      hasOwn: Boolean(card?.querySelector('[data-testid^="reaction-summary-own-"]')),
    }
  })
  probes.listHydrated = after
  console.log('listHydrated', JSON.stringify(after))
  const cardEl = await page.$('[data-testid="feed-list-card-shelter"]')
  if (cardEl) {
    await capture('01-list-card-hydrate-1536x1024.png', cardEl)
  }
  const stripEl = await page.$(
    '[data-testid="feed-list-card-shelter"] [data-testid="feed-civic-post-actions"]',
  )
  if (stripEl) {
    await capture('02-list-strip-own-1536x1024.png', stripEl)
  }
} else {
  fails.push('list-cards-absent-soft')
  console.log('list cards absent — soft structure via lab CR-25 path')
}

/* 2) lab stand — CR-25 tree path regression (same mapping list reuses) */
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-ct23-stand"]', { timeout: 15000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(800)
try {
  await page.waitForFunction(
    () => {
      const strip = document.querySelector(
        '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
      )
      return strip && strip.getAttribute('data-feed-cr25-selected-count') === '1'
    },
    { timeout: 15000 },
  )
} catch {
  fails.push('lab-cr25-hydrate-timeout')
}

const labProbe = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const strip = stand?.querySelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
  )
  return {
    labCr25: stand?.getAttribute('data-lab-cr25'),
    stripCount: strip?.getAttribute('data-feed-cr25-selected-count'),
    hasOwn: Boolean(stand?.querySelector('[data-testid="reaction-summary-own-acknowledge"]')),
  }
})
probes.lab = labProbe
console.log('labProbe', JSON.stringify(labProbe))
if (labProbe.stripCount !== '1') fails.push(`labStripCount=${labProbe.stripCount}`)
if (!labProbe.hasOwn) fails.push('lab-own-absent')

const standEl = await page.$('[data-testid="feed-lab-ct23-stand"]')
if (standEl) await capture('03-lab-cr25-tree-path-regression-1536x1024.png', standEl)

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(400)
const standNarrow = await page.$('[data-testid="feed-lab-ct23-stand"]')
if (standNarrow) await capture('04-lab-narrow-390x844.png', standNarrow)

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
await sleep(400)
const standDark = await page.$('[data-testid="feed-lab-ct23-stand"]')
if (standDark) await capture('05-lab-dark-regression-1536x1024.png', standDark)

const meta = {
  story: 'STORY-SPA-CR-27-list-own-reactions-hydrate',
  pkg: 'pkg-000225',
  path: 'A',
  mapping: 'CR-25 thread_root_reactions via FeedThreadMount.onThreadRootReactions → list FeedCivicPost',
  inventGatewaySchema: false,
  opEye: 'Absent',
  partialVisual: 'BLOCK',
  inventPass: false,
  probes,
  fails,
  md5s,
  captured_utc: new Date().toISOString(),
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
writeFileSync(
  path.join(outDir, 'README.md'),
  `# CR-27 full-cycle captures\n\nPath A · tree lift reuse · OP eye Absent → Partial=**BLOCK** · no invent PASS.\n\nFails: ${fails.length ? fails.join(', ') : '(none structure)'}\n`,
)

for (const { file } of md5s) {
  copyFileSync(path.join(outDir, file), path.join(storyShotDir, file))
}
copyFileSync(path.join(outDir, 'CAPTURE-META.json'), path.join(storyShotDir, 'CAPTURE-META.json'))

await browser.close()
console.log(JSON.stringify({ fails, md5Count: md5s.length, inventPass: false, gateHint: 'BLOCK' }))
process.exit(0)
