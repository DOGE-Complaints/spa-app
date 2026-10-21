/**
 * NF-17 Path A — civic chrome residual (M162 soft · ARCH-DELTA §5).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · CR-23 host held.
 *
 * Env: NF17_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-17-civic-chrome-residual',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base =
  process.env.NF17_BASE || process.env.NF15_BASE || 'http://127.0.0.1:5173'

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
  const post = card?.querySelector('[data-testid="feed-civic-post"]')
  const strip = card?.querySelector('[data-testid="feed-civic-post-actions"]')
  const mark = strip?.querySelector('.feed-civic-post-reaction-mark')
  const summary = post?.querySelector('.feed-civic-post-summary')
  const commentIcon = strip?.querySelector(
    '[data-testid="feed-civic-action-comment"] .feed-civic-post-icon',
  )
  const stripCs = strip ? getComputedStyle(strip) : null
  const markCs = mark ? getComputedStyle(mark) : null
  const summaryCs = summary ? getComputedStyle(summary) : null
  const iconCs = commentIcon ? getComputedStyle(commentIcon) : null
  const rootFs = getComputedStyle(document.documentElement).fontSize
  return {
    density: strip?.getAttribute('data-nf15-density') || null,
    nf17: strip?.getAttribute('data-nf17-chrome') || null,
    zones: strip?.getAttribute('data-action-zones') || null,
    cr23: strip?.getAttribute('data-feed-cr23-strip') || null,
    borderTop: stripCs?.borderTopWidth || null,
    paddingTop: stripCs?.paddingTop || null,
    marginTop: stripCs?.marginTop || null,
    minH: stripCs?.minHeight || null,
    markW: markCs?.width || null,
    markH: markCs?.height || null,
    summaryFs: summaryCs?.fontSize || null,
    rootFs,
    summaryIs1rem: Boolean(summaryCs && rootFs && summaryCs.fontSize === rootFs),
    commentIconW: iconCs?.width || null,
    hostLive: Boolean(
      strip?.querySelector('[data-testid="feed-reactions-mount"][data-feed-cr23="true"]'),
    ),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.density !== 'm162') fails.push(`density=${probe.density}`)
if (probe.nf17 !== 'residual') fails.push(`nf17=${probe.nf17}`)
if (probe.zones !== '4') fails.push(`zones=${probe.zones}`)
if (probe.cr23 !== 'true') fails.push(`cr23=${probe.cr23}`)
if (!probe.hostLive) fails.push('CR-23 host missing')
if (probe.borderTop && probe.borderTop !== '0px') fails.push(`borderTop=${probe.borderTop}`)
if (probe.paddingTop && probe.paddingTop !== '4px') fails.push(`paddingTop=${probe.paddingTop}`)
if (probe.marginTop && probe.marginTop !== '0px') fails.push(`marginTop=${probe.marginTop}`)
if (probe.minH && parseFloat(probe.minH) < 44) fails.push(`minH=${probe.minH}`)
if (probe.markW && probe.markW !== '20px') fails.push(`markW=${probe.markW}`)
if (probe.markH && probe.markH !== '20px') fails.push(`markH=${probe.markH}`)
if (!probe.summaryIs1rem) fails.push(`summaryFs=${probe.summaryFs} root=${probe.rootFs}`)
if (probe.commentIconW && probe.commentIconW !== '24px') {
  fails.push(`commentIconW=${probe.commentIconW}`)
}

{
  const el = await page.$('[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post"]')
  await capture(outDir, '02-no-hairline.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '03-reaction-marks-20.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '04-density-pad.png', el)
}
{
  const el = await page.$('[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post"]')
  await capture(outDir, '05-summary-1rem.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-17-civic-chrome-residual',
  captured_at: new Date().toISOString(),
  base,
  visual_gate: 'BLOCK',
  path_a: 'M162',
  probe,
  fails,
  shots: md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META fails', fails)
await browser.close()
process.exit(fails.length ? 1 : 0)
