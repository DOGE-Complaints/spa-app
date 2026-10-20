/**
 * CR-23 Path A — next/feed ReactionsMount Live · lab Fixture held.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP.
 *
 * Env: CR23_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR23_BASE || process.env.CT28_BASE || 'http://127.0.0.1:5173'

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

async function openLab() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await page.waitForSelector('[data-testid="feed-lab-ct23-stand"]', { timeout: 15000 })
  await page.waitForSelector(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-reactions-mount"]',
    { timeout: 15000 },
  )
  await sleep(400)
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

/* 01 — next/feed host */
await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture('01-next-feed-host.png', el)
}

/* 02–04 — CR-23 Live stand */
await openLab()
const probe = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const civicRm = stand?.querySelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
  )
  const rm = stand?.querySelector('[data-testid="reactions-mount"]')
  const strip = stand?.querySelector('[data-testid="feed-reactions-strip"]')
  const thread = stand?.querySelector('[data-testid="feed-thread-mount"]')
  const commentRm = stand?.querySelector(
    '[data-testid="feed-reactions-mount"][data-feed-reaction-target="comment"]',
  )
  const labFixture = document.querySelector(
    '[data-testid="feed-lab-greenfield-list"] [data-testid="feed-lab-reactions-mount"][data-rm-adapter="fixture"]',
  )
  return {
    civicLive: civicRm?.getAttribute('data-rm-adapter'),
    civicKind: civicRm?.getAttribute('data-rm-adapter-kind'),
    rmPresent: Boolean(rm),
    stripDone: Boolean(strip),
    threadCr23: thread?.getAttribute('data-feed-cr23'),
    commentPlug: Boolean(commentRm),
    labFixture: Boolean(labFixture),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.civicLive !== 'live') fails.push(`civicLive=${probe.civicLive}`)
if (probe.civicKind !== 'live') fails.push(`civicKind=${probe.civicKind}`)
if (!probe.rmPresent) fails.push('reactions-mount Absent')
if (probe.stripDone) fails.push('FeedReactionsStrip still on Done Path A stand')
if (probe.threadCr23 !== 'true') fails.push(`threadCr23=${probe.threadCr23}`)
if (!probe.commentPlug) fails.push('comment target plug Absent')
if (!probe.labFixture) fails.push('lab FixtureAdapter Absent')

{
  const el = await page.$(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
  )
  await capture('02-reactions-mount-live-strip.png', el || (await page.$('[data-testid="feed-lab-ct23-stand"]')))
}
{
  const el = await page.$(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-thread-mount"]',
  )
  await capture('03-comment-target-mount.png', el || (await page.$('[data-testid="feed-lab-ct23-stand"]')))
}
{
  const el = await page.$('[data-testid="feed-lab-ct23-stand"]')
  await capture('04-strip-not-done.png', el)
}

/* 05 — lab Fixture held */
{
  const el =
    (await page.$(
      '[data-testid="feed-lab-greenfield-list"] [data-testid="feed-lab-reactions-mount"][data-rm-adapter="fixture"]',
    )) || (await page.$('[data-testid="feed-lab-greenfield-list"]'))
  await capture('05-lab-fixture-held.png', el)
}

await browser.close()

const meta = {
  story: 'STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover',
  captured_at: new Date().toISOString(),
  base,
  fails,
  op_eye: 'Absent',
  partial: 'BLOCK',
  shots: md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2) + '\n')
console.log('CAPTURE-META', JSON.stringify(meta))
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(1)
}
