/**
 * CT-31 Path A — policy A auth fetch+blob host markers · lab Fixture held.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / CDN / HTTP-09.
 *
 * Env: CT31_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-31-live-attach-preview-consumable/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT31_BASE || 'http://127.0.0.1:5173'

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

/* 02–03 — lab CT-28 Live stand · CT-31 host marker */
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
    ct31: host?.getAttribute('data-feed-ct31'),
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
if (liveProbe.ct31 !== 'true') fails.push(`ct31=${liveProbe.ct31}`)
if (liveProbe.liveHost !== 'live') fails.push(`liveHost=${liveProbe.liveHost}`)
if (!liveProbe.tm) fails.push('tm Absent on live stand')

{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"] [data-testid="feed-thread-mount"]')
  await capture('02-attach-published-paint.png', el)
}

{
  const el = await page.$('[data-testid="feed-lab-ct28-stand"]')
  await capture('03-loading-or-blob.png', el)
}

/* 04 — honesty plane (host chrome · null/deny is vitest) */
{
  const el =
    (await page.$('[data-testid="feed-lab-ct28-stand"] [data-testid="tm-thread-mount"]')) ||
    (await page.$('[data-testid="feed-lab-ct28-stand"]'))
  await capture('04-honesty-null-deny.png', el)
}

/* 05 — lab Fixture held */
const fxProbe = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-lab-thread-host="fixture"]')]
  const ct31OnFixture = hosts.some((h) =>
    Boolean(h.querySelector('[data-testid="tm-comment-attachments"][data-lab-ct31="true"]')),
  )
  return { fixtureCount: hosts.length, ct31OnFixture }
})
console.log('fxProbe', JSON.stringify(fxProbe))
if (fxProbe.fixtureCount < 1) fails.push('fixture host Absent')
if (fxProbe.ct31OnFixture) fails.push('Lab Fixture must not carry data-lab-ct31')
{
  const el =
    (await page.$('[data-lab-thread-host="fixture"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture('05-lab-fixture-held.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-31-live-attach-preview-consumable',
      policy: 'A',
      visual_gate: 'BLOCK',
      op_eye: 'Absent',
      liveProbe,
      fxProbe,
      md5s,
      fails,
      note: 'Path A structure · policy A host wire · Partial BLOCK · no invent OP PASS / CDN / HTTP-09',
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
