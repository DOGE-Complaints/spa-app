/**
 * CR-28 Path A — peer Reactions empty affordance (M176).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / people HTTP.
 *
 * Env: CR28_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-28-peer-reactions-empty-affordance',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR28_BASE || process.env.CR27_BASE || 'http://127.0.0.1:5173'

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
}

async function openLabStand() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-ct23-stand"]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await page.waitForSelector('[data-testid="feed-lab-ct23-stand"][data-lab-cr28="true"]', {
    timeout: 15000,
  })
  await sleep(900)
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await openLabStand()

/* wait tree lift → peer known */
await page.waitForFunction(
  () => {
    const peer = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-action-reactions"]',
    )
    return peer && peer.getAttribute('data-feed-cr28-peer') !== 'pending'
  },
  { timeout: 20000 },
)

await page.click('[data-testid="feed-lab-cr28-clear-peer"]')
await sleep(900)
await page.waitForFunction(
  () => {
    const peer = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-action-reactions"]',
    )
    return peer && peer.getAttribute('data-feed-cr28-peer') === 'empty'
  },
  { timeout: 15000 },
)

const emptyProbe = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const peer = stand?.querySelector('[data-testid="feed-civic-action-reactions"]')
  const icon = stand?.querySelector('[data-testid="feed-civic-peer-empty-icon"]')
  const label = stand?.querySelector('[data-testid="feed-civic-peer-label"]')
  const comment = stand?.querySelector('[data-testid="feed-civic-action-comment"]')
  const share = stand?.querySelector('[data-testid="feed-civic-action-share"]')
  const pr = peer?.getBoundingClientRect()
  const cr = comment?.getBoundingClientRect()
  const sr = share?.getBoundingClientRect()
  return {
    labCr28: stand?.getAttribute('data-lab-cr28'),
    peerState: peer?.getAttribute('data-feed-cr28-peer'),
    hasEmptyIcon: Boolean(icon),
    labelText: label?.textContent?.trim() || null,
    peerTop: pr ? Math.round(pr.top) : null,
    commentTop: cr ? Math.round(cr.top) : null,
    shareTop: sr ? Math.round(sr.top) : null,
  }
})
probes.empty = emptyProbe
console.log('emptyProbe', JSON.stringify(emptyProbe))
if (emptyProbe.labCr28 !== 'true') fails.push(`labCr28=${emptyProbe.labCr28}`)
if (emptyProbe.peerState !== 'empty') fails.push(`peerState=${emptyProbe.peerState}`)
if (!emptyProbe.hasEmptyIcon) fails.push('empty-icon-absent')

const stripEmpty = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
)
await capture('01-peer-empty-icon-above-label-1536x1024.png', stripEmpty)

const peerEmpty = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-action-reactions"]',
)
await capture('02-peer-empty-entry-crop-1536x1024.png', peerEmpty)

await page.click('[data-testid="feed-lab-cr28-fill-peer"]')
await sleep(900)
await page.waitForFunction(
  () => {
    const peer = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-action-reactions"]',
    )
    return peer && peer.getAttribute('data-feed-cr28-peer') === 'filled'
  },
  { timeout: 15000 },
)

const filledProbe = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const peer = stand?.querySelector('[data-testid="feed-civic-action-reactions"]')
  const icon = stand?.querySelector('[data-testid="feed-civic-peer-empty-icon"]')
  const chips = stand?.querySelector('[data-testid="feed-civic-peer-chips"]')
  const comment = stand?.querySelector('[data-testid="feed-civic-action-comment"]')
  const pr = peer?.getBoundingClientRect()
  const cr = comment?.getBoundingClientRect()
  return {
    peerState: peer?.getAttribute('data-feed-cr28-peer'),
    hasEmptyIcon: Boolean(icon),
    chipCount: chips?.getAttribute('data-peer-chip-count'),
    peerH: pr ? Math.round(pr.height) : null,
    commentH: cr ? Math.round(cr.height) : null,
  }
})
probes.filled = filledProbe
console.log('filledProbe', JSON.stringify(filledProbe))
if (filledProbe.peerState !== 'filled') fails.push(`filledState=${filledProbe.peerState}`)
if (filledProbe.hasEmptyIcon) fails.push('filled-still-has-empty-icon')
if (filledProbe.chipCount !== '2') fails.push(`chipCount=${filledProbe.chipCount}`)

const stripFilled = await page.$(
  '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
)
await capture('03-peer-filled-chips-1536x1024.png', stripFilled)

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(400)
await capture('04-peer-narrow-390x844.png', stripFilled)

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
await sleep(400)
await capture('05-peer-dark-parity-1536x1024.png', stripFilled)

const meta = {
  story: 'STORY-SPA-CR-28-peer-reactions-empty-affordance',
  pkg: 'pkg-000226',
  path: 'A',
  mapping: 'M176 rev2 · catalog /icons/next-feed/actions/reactions.svg · no invent people HTTP',
  inventPeopleHttp: false,
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
  `# CR-28 full-cycle captures\n\nPath A · M176 peer empty · OP eye Absent → Partial=**BLOCK** · no invent PASS.\n\nFails: ${fails.length ? fails.join(', ') : '(none structure)'}\n`,
)

for (const { file } of md5s) {
  copyFileSync(path.join(outDir, file), path.join(storyShotDir, file))
}
copyFileSync(path.join(outDir, 'CAPTURE-META.json'), path.join(storyShotDir, 'CAPTURE-META.json'))

await browser.close()
console.log(JSON.stringify({ fails, md5Count: md5s.length, inventPass: false, gateHint: 'BLOCK' }))
process.exit(0)
