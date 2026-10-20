/**
 * CT-29 Path A — next/feed civic media stub (dogefeed).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / image-gen HTTP.
 *
 * Env: CT29_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-29-next-feed-civic-media-stub',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT29_BASE || process.env.CT28_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

/* UI-0 / 01 — next/feed host */
await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(baselineDir, 'ui0-next-feed-host.png', el)
  await capture(outDir, '01-next-feed-host.png', el)
}

/* Lab CT-29 stand */
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct29-stand"]', { timeout: 15000 })
await page.waitForSelector(
  '[data-testid="feed-lab-ct29-list"] [data-testid="feed-civic-post-media-img"]',
  { timeout: 15000 },
)
await sleep(500)

const probe = await page.evaluate(() => {
  const listImg = document.querySelector(
    '[data-testid="feed-lab-ct29-list"] [data-testid="feed-civic-post-media-img"]',
  )
  const detailImg = document.querySelector(
    '[data-testid="feed-lab-ct29-detail"] [data-testid="feed-civic-post-media-img"]',
  )
  const listPost = document.querySelector(
    '[data-testid="feed-lab-ct29-list"] [data-testid="feed-civic-post"]',
  )
  const noMedia = document.querySelector(
    '[data-testid="feed-lab-ct29-stand"] [data-civic-variant="no-media"]',
  )
  return {
    listSrc: listImg?.getAttribute('src') || null,
    detailSrc: detailImg?.getAttribute('src') || null,
    variant: listPost?.getAttribute('data-civic-variant') || null,
    noMediaPresent: Boolean(noMedia),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.listSrc !== '/assets/dogefeed.png') fails.push(`listSrc=${probe.listSrc}`)
if (probe.detailSrc !== '/assets/dogefeed.png') fails.push(`detailSrc=${probe.detailSrc}`)
if (probe.listSrc !== probe.detailSrc) fails.push('list/detail src mismatch')
if (probe.variant !== 'media-stub') fails.push(`variant=${probe.variant}`)
if (probe.noMediaPresent) fails.push('no-media Done surface still Present')

{
  const el = await page.$('[data-testid="feed-lab-ct29-list"] [data-testid="feed-civic-post"]')
  await capture(outDir, '02-list-dogefeed-stub.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-ct29-detail"] [data-testid="feed-civic-post"]')
  await capture(outDir, '03-detail-dogefeed-stub.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-ct29-stand"]')
  await capture(outDir, '04-no-media-superseded.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
{
  const el = await page.$('[data-testid="feed-lab-ct29-list"] [data-testid="feed-civic-post"]')
  await capture(outDir, '05-narrow-list-stub.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-29-next-feed-civic-media-stub',
      generated_utc: new Date().toISOString(),
      base,
      probe,
      md5s,
      fails,
      visual_gate: 'BLOCK',
      note: 'OP eye Absent · Partial visual=BLOCK · no invent OP PASS',
    },
    null,
    2,
  ),
)
writeFileSync(
  path.join(baselineDir, 'README.md'),
  [
    '# UI-0 baseline — CT-29',
    '',
    `> Capture \`${new Date().toISOString()}\` · Path A gap + dogefeed · ui_gate: auto`,
    '',
    '| File | Note |',
    '|------|------|',
    '| `ui0-next-feed-host.png` | `#/next/feed` host plane (board may be empty) |',
    '',
    'UI-1: gap analysis + `/assets/dogefeed.png` stub SSOT · NO BRIEF · auto gate.',
    'Partial visual=**BLOCK** · OP eye Absent · no invent OP PASS.',
    '',
  ].join('\n'),
)

await browser.close()
if (fails.length) {
  console.error('CAPTURE_FAIL', fails.join('; '))
  process.exit(1)
}
console.log('CAPTURE_OK', md5s.map((m) => m.prefix).join(' · '))
