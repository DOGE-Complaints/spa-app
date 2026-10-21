/**
 * NF-14 Path A — civic card hit-target (retire Open issue).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF14_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-14-civic-card-hit-target',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NF14_BASE || process.env.NF13_BASE || 'http://127.0.0.1:5173'

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

/* Lab NF-14 stand */
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-nf14-stand"]', { timeout: 15000 })
await sleep(500)

const probe = await page.evaluate(() => {
  const list = document.querySelector('[data-testid="feed-lab-nf14-list"]')
  const detail = document.querySelector('[data-testid="feed-lab-nf14-detail"]')
  const listHit = list?.querySelector('[data-testid="feed-civic-post-hit"]')
  const listOpen = list?.querySelector('[data-testid="feed-civic-post-open"]')
  const listActions = list?.querySelector('[data-testid="feed-civic-post-actions"]')
  const listMedia = listHit?.querySelector('[data-testid="feed-civic-post-media"]')
  const detailHit = detail?.querySelector('[data-testid="feed-civic-post-hit"]')
  const detailOpen = detail?.querySelector('[data-testid="feed-civic-post-open"]')
  const actionsInsideHit = Boolean(
    listHit?.querySelector('[data-testid="feed-civic-post-actions"]'),
  )
  return {
    listHit: Boolean(listHit),
    listOpen: Boolean(listOpen),
    listMedia: Boolean(listMedia),
    listActions: Boolean(listActions),
    actionsInsideHit,
    detailHit: Boolean(detailHit),
    detailOpen: Boolean(detailOpen),
    hitHref: listHit?.getAttribute('href') || null,
    hitAria: listHit?.getAttribute('aria-label') || null,
  }
})
console.log('probe', JSON.stringify(probe))
if (!probe.listHit) fails.push('listHit missing')
if (probe.listOpen) fails.push('list still has open row')
if (!probe.listMedia) fails.push('media not inside hit')
if (!probe.listActions) fails.push('actions missing')
if (probe.actionsInsideHit) fails.push('actions inside hit')
if (probe.detailHit) fails.push('detail has hit Link')
if (probe.detailOpen) fails.push('detail has open row')

{
  const el = await page.$('[data-testid="feed-lab-nf14-list"] [data-testid="feed-civic-post"]')
  await capture(outDir, '02-list-hit-no-open-row.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-nf14-list"] [data-testid="feed-civic-post-actions"]')
  await capture(outDir, '03-strip-excluded.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-nf14-detail"] [data-testid="feed-civic-post"]')
  await capture(outDir, '04-detail-unchanged.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
{
  const el = await page.$('[data-testid="feed-lab-nf14-list"] [data-testid="feed-civic-post"]')
  await capture(outDir, '05-narrow-hit.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-14-civic-card-hit-target',
  captured_at: new Date().toISOString(),
  base,
  visual_gate: 'BLOCK',
  path_a: 'code-lock',
  probe,
  fails,
  shots: md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify({ fails, count: md5s.length }))
await browser.close()
if (fails.length) process.exit(1)
