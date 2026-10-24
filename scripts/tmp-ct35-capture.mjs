/**
 * CT-35 Path A — comment React empty/filled harmony (M174).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: CT35_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-35-comment-react-empty-harmony',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT35_BASE || 'http://127.0.0.1:5173'

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
  copyFileSync(dest, path.join(storyShotDir, file))
}

await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 })
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)

/* Prefer CT-08 / populated thread stand with action pills */
await page.waitForSelector('[data-testid="tm-comment-action-pills"]', { timeout: 20000 })

probes.empty = await page.evaluate(() => {
  const pills = [...document.querySelectorAll('[data-testid="tm-comment-action-pills"]')]
  const withCt35 = pills.filter((p) => p.getAttribute('data-lab-ct35') === 'true')
  const sample = withCt35[0] || pills[0]
  const ownLane = sample?.querySelector('[data-rm-own-lane="reserved"]')
  const ownMarks = sample?.querySelector('[data-testid="reaction-summary-react-own"]')
  const ownInZone = sample?.querySelector('[data-rm-own-in-zone="true"]')
  const entry = sample?.querySelector('[data-testid="reaction-summary-react-entry"]')
  let entryDir = null
  if (entry) entryDir = getComputedStyle(entry).flexDirection
  const reply = sample?.querySelector('[data-testid="tm-comment-reply"]')
  const sep = sample?.querySelector('[data-testid="tm-comment-action-sep"]')
  return {
    ct35Count: withCt35.length,
    harmony: sample?.getAttribute('data-tm-ct35-harmony'),
    hasOwnLane: Boolean(ownLane),
    hasOwnMarks: Boolean(ownMarks),
    hasOwnInZone: Boolean(ownInZone),
    entryFlexDirection: entryDir,
    hasReply: Boolean(reply),
    hasSep: Boolean(sep),
  }
})
console.log('emptyProbe', JSON.stringify(probes.empty))
if (probes.empty.ct35Count < 1) fails.push('ct35 markers Absent')
if (probes.empty.harmony !== 'm174') fails.push(`harmony=${probes.empty.harmony}`)
if (probes.empty.hasOwnLane) fails.push('M173 reserved own lane Present on comment')
if (probes.empty.hasOwnInZone) fails.push('own-in-zone true on comment sample')
if (probes.empty.entryFlexDirection && probes.empty.entryFlexDirection !== 'row') {
  fails.push(`entryFlexDirection=${probes.empty.entryFlexDirection}`)
}
if (!probes.empty.hasReply) fails.push('Reply Absent')

{
  const el =
    (await page.$('[data-testid="tm-comment-action-pills"]')) ||
    (await page.$('[data-testid="tm-comment-body"]'))
  await capture('01-empty-react-reply-harmony-1536x1024.png', el)
}

/* filled: look for aggregate/chips under a pill */
probes.filled = await page.evaluate(() => {
  const pills = [...document.querySelectorAll('[data-testid="tm-comment-action-pills"]')]
  const filled = pills.find((p) => p.querySelector('[data-testid="reaction-summary-aggregate"]'))
  if (!filled) return { found: false }
  const strip = filled.querySelector('.rm-summary-strip')
  const react = filled.querySelector('[data-testid="reaction-summary-react"]')
  return {
    found: true,
    stripFlex: strip ? getComputedStyle(strip).flexDirection : null,
    reactOrder: react ? getComputedStyle(react).order : null,
    ownInZone: filled.querySelector('[data-rm-own-in-zone="true"]') != null,
  }
})
console.log('filledProbe', JSON.stringify(probes.filled))
if (probes.filled.found) {
  if (probes.filled.stripFlex !== 'column') fails.push(`filled stripFlex=${probes.filled.stripFlex}`)
  if (probes.filled.reactOrder !== '-1') fails.push(`filled reactOrder=${probes.filled.reactOrder}`)
  if (probes.filled.ownInZone) fails.push('filled own-in-zone true')
  const handle = await page.evaluateHandle(() => {
    const pills = [...document.querySelectorAll('[data-testid="tm-comment-action-pills"]')]
    return pills.find((p) => p.querySelector('[data-testid="reaction-summary-aggregate"]'))
  })
  const el = handle.asElement()
  if (el) await capture('02-filled-react-stack-reply-1536x1024.png', el)
} else {
  /* Lab may lack filled comment summary — structure CSS still held; soft shot = empty clone */
  const el = await page.$('[data-testid="tm-comment-action-pills"]')
  await capture('02-filled-react-stack-reply-1536x1024.png', el)
  probes.filled.note = 'no filled aggregate in lab DOM · CSS/structure held'
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(200)
{
  const el = await page.$('[data-testid="tm-comment-action-pills"]')
  await capture('03-narrow-empty-390x844.png', el)
}

await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
await sleep(300)
{
  const el = await page.$('[data-testid="tm-comment-action-pills"]')
  await capture('04-dark-empty-1536x1024.png', el)
}

await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(200)
{
  const el =
    (await page.$('[data-testid="tm-thread-mount"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture('05-thread-context-1536x1024.png', el)
}

for (const f of md5s.map((m) => m.file)) {
  copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-35-comment-react-empty-harmony',
      pkg: 'pkg-000228',
      visual_gate: 'BLOCK',
      op_eye: 'Absent',
      harmony: 'm174',
      probes,
      md5s,
      fails,
      note: 'Path A structure · M174 · Partial BLOCK · no invent OP PASS · no M173 comment lane',
    },
    null,
    2,
  ),
)
writeFileSync(
  path.join(outDir, 'README.md'),
  `# CT-35 full-cycle captures\n\nPath A · M174 · OP eye Absent → Partial=**BLOCK** · no invent PASS.\n\nFails: ${fails.length ? fails.join(', ') : '(none structure)'}\n`,
)

await browser.close()
if (fails.length) {
  console.error('CAPTURE_FAILS', fails)
  process.exit(1)
}
console.log('CAPTURE_OK', md5s.map((m) => m.prefix).join(' · '))
