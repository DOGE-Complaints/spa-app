/**
 * CR-24 Path A — React wide underlay · own vs people (M163/M164).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / CDN / M163 PNG.
 *
 * Env: CR24_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-24-react-underlay-own-vs-people',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR24_BASE || process.env.CR23_BASE || 'http://127.0.0.1:5173'

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
  const stand =
    (await page.$('[data-testid="feed-lab-ct23-stand"]')) ||
    (await page.$('[data-testid="feed-lab-nf15-stand"]'))
  if (!stand) throw new Error('lab stand Absent')
  await page.waitForSelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
    { timeout: 15000 },
  )
  await sleep(500)
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

/* 01 — next/feed host */
await page.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(500)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture('01-react-wide-underlay.png', el)
}

await openLabStand()

const probe = await page.evaluate(() => {
  const strip =
    document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
    ) ||
    document.querySelector(
      '[data-testid="feed-lab-nf15-stand"] [data-testid="feed-civic-post-actions"]',
    ) ||
    document.querySelector('[data-testid="feed-civic-post-actions"]')
  const react = strip?.querySelector('[data-testid="reaction-summary-react"]')
  const reactCs = react ? getComputedStyle(react) : null
  const marks = strip?.querySelector('.feed-civic-post-reaction-marks')
  const reactions = strip?.querySelector('[data-testid="feed-civic-action-reactions"]')
  const rm = strip?.querySelector('[data-testid="feed-reactions-mount"]')
  return {
    cr24: strip?.getAttribute('data-cr24-underlay'),
    ownInZone: rm?.getAttribute('data-rm-own-in-zone'),
    underlay: react?.getAttribute('data-rm-react-underlay'),
    textOnly: reactions?.getAttribute('data-rm-reactions-text-only'),
    marksAbsent: !marks,
    reactBg: reactCs?.backgroundColor || null,
    reactMinH: reactCs?.minHeight || null,
    zeroClass: react?.className?.includes('react--zero') || false,
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.cr24 !== 'm163') fails.push(`cr24=${probe.cr24}`)
if (probe.ownInZone !== 'true') fails.push(`ownInZone=${probe.ownInZone}`)
if (probe.underlay !== 'wide') fails.push(`underlay=${probe.underlay}`)
if (probe.textOnly !== 'true') fails.push(`textOnly=${probe.textOnly}`)
if (!probe.marksAbsent) fails.push('glyph stack still Present')
if (!probe.zeroClass) fails.push('zero class Absent')

{
  const el =
    (await page.$(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]',
    )) ||
    (await page.$(
      '[data-testid="feed-lab-nf15-stand"] [data-testid="feed-civic-post-actions"]',
    )) ||
    (await page.$('[data-testid="feed-civic-post-actions"]'))
  await capture('02-react-opens-picker.png', el || (await page.$('body')))
}

/* React → picker */
{
  const react = await page.$('[data-testid="reaction-summary-react"]')
  if (react) {
    await react.click()
    await sleep(300)
  }
  const picker = await page.$('[data-testid="rm-reaction-picker"]')
  if (!picker) fails.push('picker Absent after React click')
  const people = await page.$('[data-testid="rm-reactors-popover"]')
  if (people) fails.push('people opened on React click')
  const el =
    (await page.$('[data-testid="feed-civic-post-actions"]')) || (await page.$('body'))
  await capture('02-react-opens-picker.png', el)
  if (picker) {
    await page.keyboard.press('Escape')
    await sleep(200)
  }
}

/* Reactions → people (honesty OK if fail-closed) */
{
  const btn = await page.$('[data-testid="feed-civic-action-reactions"]')
  if (btn) {
    await btn.click()
    await sleep(400)
  }
  const picker = await page.$('[data-testid="rm-reaction-picker"]')
  if (picker) fails.push('picker opened on Reactions click')
  const el =
    (await page.$('[data-testid="feed-civic-post-actions"]')) || (await page.$('body'))
  await capture('03-reactions-opens-people.png', el)
}

/* Own / zero structure (zero selected default) */
{
  const el =
    (await page.$('[data-testid="reaction-summary-react"]')) ||
    (await page.$('[data-testid="feed-civic-post-actions"]')) ||
    (await page.$('body'))
  await capture('04-own-icons-in-zone.png', el)
  await capture('05-zero-selected-thumb.png', el)
}

/* story-root copies */
const storyMap = [
  ['01-react-wide-underlay.png', '01-story-root-react-underlay.png'],
  ['04-own-icons-in-zone.png', '02-story-root-own-in-zone.png'],
  ['03-reactions-opens-people.png', '03-story-root-react-vs-people.png'],
]
for (const [src, dest] of storyMap) {
  try {
    copyFileSync(path.join(outDir, src), path.join(storyShotDir, dest))
  } catch (e) {
    fails.push(`story-root copy ${dest}: ${e.message}`)
  }
}

const meta = {
  story: 'STORY-SPA-CR-24-react-underlay-own-vs-people',
  captured_at: new Date().toISOString(),
  visual_gate: 'BLOCK',
  op_eye: 'Absent',
  partial: 'BLOCK',
  path_a: 'M163/M164',
  probe,
  fails,
  md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log(
  'CAPTURE-META',
  JSON.stringify({ fails, prefixes: md5s.map((m) => m.prefix), probe }),
)

await browser.close()
if (fails.length) process.exitCode = 1
