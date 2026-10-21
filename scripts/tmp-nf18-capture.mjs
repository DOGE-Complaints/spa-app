/**
 * NF-18 Path A — strip React density residual (M162 soft · ARCH-DELTA §6).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · CR-23 host held.
 *
 * Env: NF18_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-18-strip-react-density-residual',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base =
  process.env.NF18_BASE || process.env.NF17_BASE || 'http://127.0.0.1:5173'

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

await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(baselineDir, 'ui0-next-feed-host.png', el)
  await capture(outDir, '01-next-feed-host.png', el)
}

await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-nf15-stand"]', { timeout: 15000 })
await sleep(600)

const probe = await page.evaluate(() => {
  const card = document.querySelector('[data-testid="feed-lab-nf15-card"]')
  const strip = card?.querySelector('[data-testid="feed-civic-post-actions"]')
  const slot = strip?.querySelector('[data-testid="feed-civic-action-react"]')
  const reactBtn = strip?.querySelector('.rm-summary-strip__react')
  const commentIcon = strip?.querySelector(
    '[data-testid="feed-civic-action-comment"] .feed-civic-post-icon',
  )
  const reactIcon = reactBtn?.querySelector('.rm-icon')
  const slotCs = slot ? getComputedStyle(slot) : null
  const reactCs = reactBtn ? getComputedStyle(reactBtn) : null
  const iconCs = commentIcon ? getComputedStyle(commentIcon) : null
  const reactIconCs = reactIcon ? getComputedStyle(reactIcon) : null
  return {
    density: strip?.getAttribute('data-nf15-density') || null,
    nf17: strip?.getAttribute('data-nf17-chrome') || null,
    nf18: strip?.getAttribute('data-nf18-density') || null,
    zones: strip?.getAttribute('data-action-zones') || null,
    cr23: strip?.getAttribute('data-feed-cr23-strip') || null,
    slotPad: slotCs?.padding || null,
    slotBg: slotCs?.backgroundColor || null,
    reactPad: reactCs?.padding || null,
    reactMinH: reactCs?.minHeight || null,
    commentIconW: iconCs?.width || null,
    reactIconW: reactIconCs?.width || null,
    hostLive: Boolean(
      strip?.querySelector('[data-testid="feed-reactions-mount"][data-feed-cr23="true"]'),
    ),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.density !== 'm162') fails.push(`density=${probe.density}`)
if (probe.nf18 !== 'residual') fails.push(`nf18=${probe.nf18}`)
if (probe.zones !== '4') fails.push(`zones=${probe.zones}`)
if (probe.cr23 !== 'true') fails.push(`cr23=${probe.cr23}`)
if (!probe.hostLive) fails.push('CR-23 host missing')
if (probe.slotPad && probe.slotPad !== '0px') fails.push(`slotPad=${probe.slotPad}`)
if (probe.reactPad && probe.reactPad !== '4px 8px') fails.push(`reactPad=${probe.reactPad}`)
if (probe.reactMinH && parseFloat(probe.reactMinH) < 44) fails.push(`reactMinH=${probe.reactMinH}`)
if (probe.commentIconW && probe.commentIconW !== '28px') {
  fails.push(`commentIconW=${probe.commentIconW}`)
}
if (probe.reactIconW && probe.reactIconW !== '28px') {
  fails.push(`reactIconW=${probe.reactIconW}`)
}

{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '02-react-flat-chrome.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '03-glyphs-28.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-action-react"]',
  )
  await capture(outDir, '04-pad-stack-mh44.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(400)
{
  const el =
    (await page.$('[data-testid="feed-lab-nf15-stand"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture(outDir, '05-narrow-focus.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-18-strip-react-density-residual',
  captured_at: new Date().toISOString(),
  base,
  visual_gate: 'BLOCK',
  op_eye: 'Absent',
  path_a: 'M162 soft · ARCH-DELTA §6',
  probe,
  fails,
  md5s,
  note: 'Path A structure · Partial BLOCK · CR-23 held · no invent OP PASS',
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META fails', fails)
if (fails.length) {
  console.error('CAPTURE_FAILS', fails)
  await browser.close()
  process.exit(1)
}
console.log('CAPTURE_OK', md5s.map((m) => m.prefix).join(' · '))
await browser.close()
