/**
 * CT-28 Path A — next/feed ThreadMount Live · lab Fixture held.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP.
 *
 * Env: CT28_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT28_BASE || 'http://127.0.0.1:5173'

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
  await page.waitForSelector('[data-testid="feed-lab-ct28-stand"]', { timeout: 15000 })
  await page.waitForSelector('[data-testid="feed-thread-mount"][data-feed-ct28="true"]', {
    timeout: 15000,
  })
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

/* 02–03 — CT-28 Live stand */
await openLab()
const probe = await page.evaluate(() => {
  const host = document.querySelector(
    '[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]',
  )
  const tm = document.querySelector(
    '[data-testid="feed-lab-ct28-stand"] [data-testid="tm-thread-mount"]',
  )
  const old = document.querySelector(
    '[data-testid="feed-lab-ct28-stand"] [data-testid="feed-discussion-block"]',
  )
  return {
    ct28: host?.getAttribute('data-feed-ct28'),
    liveHost: host?.getAttribute('data-feed-thread-host'),
    liveBound: host?.getAttribute('data-feed-live-bound'),
    status: host?.getAttribute('data-feed-thread-status'),
    reason: host?.getAttribute('data-feed-live-reason'),
    tmPresent: Boolean(tm),
    discussionBlock: Boolean(old),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.ct28 !== 'true') fails.push(`ct28=${probe.ct28}`)
if (probe.liveHost !== 'live') fails.push(`liveHost=${probe.liveHost}`)
if (probe.liveBound !== 'true') fails.push(`liveBound=${probe.liveBound}`)
if (probe.discussionBlock) fails.push('FeedDiscussionBlock still Done surface')
if (!probe.tmPresent) fails.push('tm-thread-mount Absent')
if (probe.reason === 'live-adapter-unwired') fails.push('live-adapter-unwired')

{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]')
  await capture('02-thread-mount-live.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"]')
  await capture('03-discussion-block-not-done.png', el)
}

/* 04 — lab Fixture held */
const lab = await page.evaluate(() => {
  const m = document.querySelector(
    '[data-testid="feed-lab-greenfield-section"] [data-testid="feed-lab-thread-mount"]',
  )
  return {
    present: Boolean(m),
    host: m?.getAttribute('data-lab-thread-host'),
    ct08: m?.getAttribute('data-lab-ct08'),
  }
})
console.log('lab', JSON.stringify(lab))
if (!lab.present) fails.push('lab thread mount Absent')
if (lab.host !== 'fixture') fails.push(`lab host=${lab.host}`)
{
  const el = await page.$(
    '[data-testid="feed-lab-greenfield-section"] [data-testid="feed-lab-thread-mount"]',
  )
  await capture('04-lab-fixture-held.png', el)
}

/* 05 — narrow */
await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 1 })
await openLab()
{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]')
  await capture('05-narrow-next-feed.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-28-next-feed-thread-mount-live-cutover',
      mockup: 'gap-analysis-next-feed-cutover',
      captured_utc: new Date().toISOString(),
      op_eye: 'Absent',
      partial: 'BLOCK',
      probe,
      lab,
      md5s,
      fails,
    },
    null,
    2,
  ),
)

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exitCode = 1
} else {
  console.log('CAPTURE ok · fails: [] · op_eye Absent · partial BLOCK')
}
