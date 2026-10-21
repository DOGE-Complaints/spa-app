/**
 * NF-15 Path A — M162 action strip density + React unframe.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · CR-23 host held.
 *
 * Env: NF15_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-15-action-strip-density-unframe',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NF15_BASE || process.env.NF14_BASE || 'http://127.0.0.1:5173'

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
  const strip = document.querySelector(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  const reactBtn = strip?.querySelector('[data-testid="reaction-summary-react"]')
  const commentIcon = strip?.querySelector(
    '[data-testid="feed-civic-action-comment"] .feed-civic-post-icon',
  )
  const reactIcon = reactBtn?.querySelector('[data-testid="rm-icon"]')
  const cs = reactBtn ? getComputedStyle(reactBtn) : null
  const iconCs = reactIcon ? getComputedStyle(reactIcon) : null
  const commentIconCs = commentIcon ? getComputedStyle(commentIcon) : null
  return {
    density: strip?.getAttribute('data-nf15-density') || null,
    zones: strip?.getAttribute('data-action-zones') || null,
    cr23: strip?.getAttribute('data-feed-cr23-strip') || null,
    reactBorder: cs?.borderTopWidth || null,
    reactBg: cs?.backgroundColor || null,
    reactPad: cs ? `${cs.paddingTop}/${cs.paddingRight}` : null,
    reactMinH: cs?.minHeight || null,
    reactIconW: iconCs?.width || null,
    commentIconW: commentIconCs?.width || null,
    hostLive: Boolean(
      strip?.querySelector('[data-testid="feed-reactions-mount"][data-feed-cr23="true"]'),
    ),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.density !== 'm162') fails.push(`density=${probe.density}`)
if (probe.zones !== '4') fails.push(`zones=${probe.zones}`)
if (probe.cr23 !== 'true') fails.push(`cr23=${probe.cr23}`)
if (!probe.hostLive) fails.push('CR-23 host missing')
if (probe.reactBorder && probe.reactBorder !== '0px') fails.push(`reactBorder=${probe.reactBorder}`)
if (probe.reactIconW && probe.reactIconW !== '24px') fails.push(`reactIconW=${probe.reactIconW}`)
if (probe.commentIconW && probe.commentIconW !== '24px') {
  fails.push(`commentIconW=${probe.commentIconW}`)
}

{
  const el = await page.$('[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post"]')
  await capture(outDir, '02-strip-react-unframe.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '03-strip-icons-24.png', el)
}
{
  const el = await page.$(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post-actions"]',
  )
  await capture(outDir, '04-desktop-density.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(400)
const narrow = await page.evaluate(() => {
  const action = document.querySelector(
    '[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-action-comment"]',
  )
  const cs = action ? getComputedStyle(action) : null
  return {
    flexDir: cs?.flexDirection || null,
    gap: cs?.gap || null,
    minH: cs?.minHeight || null,
  }
})
console.log('narrow', JSON.stringify(narrow))
if (narrow.flexDir !== 'column') fails.push(`narrowFlex=${narrow.flexDir}`)
if (narrow.minH && parseFloat(narrow.minH) < 56) fails.push(`narrowMinH=${narrow.minH}`)

{
  const el = await page.$('[data-testid="feed-lab-nf15-card"] [data-testid="feed-civic-post"]')
  await capture(outDir, '05-narrow-stacked.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-15-action-strip-density-unframe',
  captured_at: new Date().toISOString(),
  base,
  visual_gate: 'BLOCK',
  path_a: 'M162',
  probe,
  narrow,
  fails,
  shots: md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify({ fails, count: md5s.length }))
await browser.close()
if (fails.length) process.exit(1)
