/**
 * CR-26 Path A — own React empty/filled harmony (M173).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / glyph catalog.
 *
 * Env: CR26_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-26-own-react-empty-harmony',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR26_BASE || process.env.CR25_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []

async function capture(file, el) {
  const dest = path.join(outDir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function openLabStand() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await page.waitForSelector('[data-testid="feed-lab-ct23-stand"]', { timeout: 15000 })
  await page.waitForSelector(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-reactions-mount"]',
    { timeout: 15000 },
  )
  await sleep(800)
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await openLabStand()

const probe0 = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const strip = stand?.querySelector('[data-testid="feed-civic-post-actions"]')
  const react = stand?.querySelector('[data-testid="reaction-summary-react"]')
  return {
    labCr26: stand?.getAttribute('data-lab-cr26'),
    stripHarmony: strip?.getAttribute('data-cr26-harmony'),
    reactHarmony: react?.getAttribute('data-rm-cr26-harmony'),
    ownInZone: stand?.querySelector('[data-rm-own-in-zone="true"]') != null,
    zones: strip?.getAttribute('data-action-zones'),
  }
})
console.log('probe0', JSON.stringify(probe0))
if (probe0.labCr26 !== 'true') fails.push(`labCr26=${probe0.labCr26}`)
if (probe0.stripHarmony !== 'm173') fails.push(`stripHarmony=${probe0.stripHarmony}`)
if (probe0.reactHarmony !== 'm173') fails.push(`reactHarmony=${probe0.reactHarmony}`)
if (!probe0.ownInZone) fails.push('ownInZone missing')
if (probe0.zones !== '4') fails.push(`zones=${probe0.zones}`)

/* empty own */
await page.click('[data-testid="feed-lab-cr26-clear-own"]')
await sleep(900)
await page.waitForFunction(
  () => {
    const react = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="reaction-summary-react"]',
    )
    return react && react.getAttribute('data-rm-own-count') === '0'
  },
  { timeout: 15000 },
)

const stripEmpty = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
)
await capture('01-own-react-empty-comment-align.png', stripEmpty)

/* filled 3 */
await page.click('[data-testid="feed-lab-cr26-fill-own"]')
await sleep(900)
await page.waitForFunction(
  () => {
    const react = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="reaction-summary-react"]',
    )
    return react && react.getAttribute('data-rm-own-count') === '3'
  },
  { timeout: 15000 },
)
const stripFilled = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
)
await capture('02-own-react-filled-comment-align.png', stripFilled)

const ownLane = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="reaction-summary-react-own"]',
)
await capture('03-three-slot-lane.png', ownLane)

const reactBtn = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="reaction-summary-react"]',
)
await capture('04-strip-order.png', stripFilled)

/* dark */
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
await sleep(400)
await capture('05-dark-harmony.png', stripFilled)

/* geometry probe — equal hit height React vs Comment */
const geo = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const react = stand?.querySelector('[data-testid="reaction-summary-react"]')
  const comment = stand?.querySelector('[data-testid="feed-civic-action-comment"]')
  const rr = react?.getBoundingClientRect()
  const cr = comment?.getBoundingClientRect()
  const entry = react?.querySelector('[data-testid="reaction-summary-react-entry"]')
  const entryStyle = entry ? getComputedStyle(entry) : null
  return {
    reactH: rr ? Math.round(rr.height) : null,
    commentH: cr ? Math.round(cr.height) : null,
    entryDir: entryStyle?.flexDirection || null,
    ownCount: react?.getAttribute('data-rm-own-count'),
    hasOwnClass: react?.className?.includes('has-own') || false,
  }
})
console.log('geo', JSON.stringify(geo))
if (geo.entryDir !== 'column') fails.push(`entryDir=${geo.entryDir}`)
if (!geo.hasOwnClass) fails.push('missing has-own')
if (geo.reactH == null || geo.commentH == null) fails.push('missing heights')
else if (Math.abs(geo.reactH - geo.commentH) > 8) {
  fails.push(`hitHeightDelta react=${geo.reactH} comment=${geo.commentH}`)
}

const storyMap = [
  ['01-story-root-own-react-empty.png', '01-own-react-empty-comment-align.png'],
  ['02-story-root-own-react-filled.png', '02-own-react-filled-comment-align.png'],
  ['03-story-root-own-react-dark.png', '05-dark-harmony.png'],
]
for (const [story, src] of storyMap) {
  copyFileSync(path.join(outDir, src), path.join(storyShotDir, story))
}

const meta = {
  story: 'STORY-SPA-CR-26-own-react-empty-harmony',
  generated_utc: new Date().toISOString(),
  visual_gate: 'BLOCK',
  op_eye: 'Absent',
  partial: 'BLOCK',
  note: 'Path A structure · OP eye Absent · no invent PASS',
  fails,
  md5s,
  probe0,
  geo,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))

await browser.close()
if (fails.length) {
  console.error('CAPTURE fails', fails)
  process.exit(1)
}
console.log('CAPTURE-META fails: []')
