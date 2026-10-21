/**
 * CT-30 Path A — next/feed Live attach wire · lab Fixture held.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / CDN.
 *
 * Env: CT30_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-30-live-attach-ref-wire/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT30_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

/* 01 — next/feed host */
await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture('01-next-feed-host.png', el)
}

/* 02 — lab CT-28 Live stand (upload wire host marker) */
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct28-stand"]', { timeout: 15000 })
await sleep(400)

const liveProbe = await page.evaluate(() => {
  const host = document.querySelector(
    '[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]',
  )
  return {
    ct30: host?.getAttribute('data-feed-ct30'),
    ct28: host?.getAttribute('data-feed-ct28'),
    liveHost: host?.getAttribute('data-feed-thread-host'),
    liveBound: host?.getAttribute('data-feed-live-bound'),
    tm: Boolean(
      document.querySelector(
        '[data-testid="feed-lab-ct28-stand"] [data-testid="tm-thread-mount"]',
      ),
    ),
  }
})
console.log('liveProbe', JSON.stringify(liveProbe))
if (liveProbe.ct30 !== 'true') fails.push(`ct30=${liveProbe.ct30}`)
if (liveProbe.liveHost !== 'live') fails.push(`liveHost=${liveProbe.liveHost}`)
if (!liveProbe.tm) fails.push('tm Absent on live stand')

{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]')
  await capture('02-attach-upload-live.png', el)
}

/* 03 — structure stand (published_url map is code/vitest; visual = host chrome) */
{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"]')
  await capture('03-published-url-preview.png', el)
}

/* 04 — lab Fixture held */
const fxProbe = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-lab-thread-host="fixture"]')]
  return { fixtureCount: hosts.length }
})
console.log('fxProbe', JSON.stringify(fxProbe))
if (fxProbe.fixtureCount < 1) fails.push('fixture host Absent')
{
  const el =
    (await page.$('[data-lab-thread-host="fixture"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture('04-lab-fixture-held.png', el)
}

/* 05 — narrow */
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(400)
{
  const el =
    (await page.$('[data-testid="feed-lab-ct28-stand"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture('05-narrow-honesty.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-30-live-attach-ref-wire',
      visual_gate: 'BLOCK',
      op_eye: 'Absent',
      liveProbe,
      fxProbe,
      md5s,
      fails,
      note: 'Path A structure · Partial BLOCK · no invent OP PASS / CDN',
    },
    null,
    2,
  ),
)

await browser.close()
if (fails.length) {
  console.error('CAPTURE_FAILS', fails)
  process.exit(1)
}
console.log('CAPTURE_OK', md5s.map((m) => m.prefix).join(' · '))
