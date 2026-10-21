/**
 * NF-13 Path A — M161 issue-type identity icons.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / type aliases.
 *
 * Env: NF13_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-13-issue-type-identity-icon',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NF13_BASE || process.env.CT29_BASE || 'http://127.0.0.1:5173'

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

/* Lab NF-13 stand */
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-nf13-stand"]', { timeout: 15000 })
await sleep(500)

const probe = await page.evaluate(() => {
  const incident = document.querySelector(
    '[data-testid="feed-lab-nf13-card-INCIDENT"] [data-testid="issue-type-icon"] img',
  )
  const omit = document.querySelector(
    '[data-testid="feed-lab-nf13-omit"] [data-testid="issue-type-icon"]',
  )
  const omitImg = omit?.querySelector('img')
  const presentCount = document.querySelectorAll(
    '[data-testid="feed-lab-nf13-keys"] [data-civic-identity-icon="present"]',
  ).length
  return {
    incidentSrc: incident?.getAttribute('src') || null,
    incidentW: incident?.getAttribute('width') || null,
    omitState: omit?.getAttribute('data-civic-identity-icon') || null,
    omitHasImg: Boolean(omitImg),
    presentCount,
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.incidentSrc !== '/icons/next-feed/types/ic-issue-type-INCIDENT.svg') {
  fails.push(`incidentSrc=${probe.incidentSrc}`)
}
if (probe.incidentW !== '24') fails.push(`glyphW=${probe.incidentW}`)
if (probe.omitState !== 'omit-catalog-gap') fails.push(`omitState=${probe.omitState}`)
if (probe.omitHasImg) fails.push('omit still has img')
if (probe.presentCount < 5) fails.push(`presentCount=${probe.presentCount}`)

{
  const el = await page.$(
    '[data-testid="feed-lab-nf13-card-INCIDENT"] [data-testid="feed-civic-post"]',
  )
  await capture(outDir, '02-type-incident-icon.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-nf13-keys"]')
  await capture(outDir, '03-type-keys-sample.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf13-omit"] [data-testid="feed-civic-post"]',
  )
  await capture(outDir, '04-unknown-omit.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
{
  const el = await page.$(
    '[data-testid="feed-lab-nf13-card-INCIDENT"] [data-testid="issue-type-icon"]',
  )
  await capture(outDir, '05-narrow-identity.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-NF-13-issue-type-identity-icon',
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
    '# UI-0 baseline — NF-13',
    '',
    `> Capture \`${new Date().toISOString()}\` · Path A M161 · ui_gate: auto`,
    '',
    '| File | Note |',
    '|------|------|',
    '| `ui0-next-feed-host.png` | `#/next/feed` host plane |',
    '',
    'UI-1: M161 md+PNG SSOT · NO BRIEF · auto gate.',
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
