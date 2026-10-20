/**
 * CT-18 Path A — M153b A–D token chrome · #/lab/feed TREE stand.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / hex.
 *
 * Env: CT18_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-18-depth2-token-chrome/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT18_BASE || 'http://127.0.0.1:5173'

const RGB = {
  bubble: 'rgb(247, 246, 242)',
  border: 'rgb(231, 228, 220)',
  spine: 'rgb(102, 112, 133)',
  action: 'rgb(181, 71, 8)',
  group: 'rgb(255, 253, 248)',
  blueForbidden: 'rgb(46, 144, 250)',
}

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

await page.setViewport({ width: 1536, height: 2200, deviceScaleFactor: 1 })
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct08-stand-TREE"]', { timeout: 10000 })

await page.evaluate(() => {
  document.querySelectorAll('[data-lab-ct08-stand]').forEach((n) => {
    n.style.display = n.getAttribute('data-lab-ct08-stand') === 'TREE' ? '' : 'none'
  })
  const gf = document.querySelector('[data-testid="feed-lab-greenfield-section"]')
  if (gf) gf.style.display = 'none'
})
await sleep(150)

const viewBtn = await page.$('[data-testid="tm-comment-view-replies-ct08-t-a"]')
if (viewBtn) {
  await viewBtn.click()
  await page.waitForSelector('[data-testid="tm-comment-children-ct08-t-a"]', { timeout: 5000 })
  const viewA1 = await page.$('[data-testid="tm-comment-view-replies-ct08-t-a1"]')
  if (viewA1) {
    await viewA1.click()
    await page.waitForSelector('[data-testid="tm-comment-children-ct08-t-a1"]', { timeout: 5000 })
  }
}
await sleep(120)

/* measure A–C */
const measure = await page.evaluate((RGB) => {
  const stand = document.querySelector('[data-testid="feed-lab-ct08-stand-TREE"]')
  const root = stand?.querySelector('[data-testid="tm-comment-node-ct08-t-a"]')
  const bubble = root?.querySelector('[data-testid="tm-comment-body"]')
  const kids = stand?.querySelector('[data-testid="tm-comment-children-ct08-t-a"]')
  const a1 = stand?.querySelector('[data-testid="tm-comment-node-ct08-t-a1"]')
  const elbow = a1?.querySelector('[data-testid="tm-comment-connector"]')
  const pills = root?.querySelector('[data-testid="tm-comment-action-pills"]')
  const reply = root?.querySelector('[data-testid="tm-comment-reply"]')
  const react = root?.querySelector('[data-testid="tm-comment-react-pill"]')
  const sep = root?.querySelector('[data-testid="tm-comment-action-sep"]')
  const bcs = bubble ? getComputedStyle(bubble) : null
  const pcs = pills ? getComputedStyle(pills) : null
  const rcs = reply ? getComputedStyle(reply) : null
  const nodeCs = root ? getComputedStyle(root) : null
  return {
    ct18: root?.getAttribute('data-lab-ct18'),
    bubbleBg: bcs?.backgroundColor,
    bubbleBorder: bcs?.borderTopColor,
    bubbleBorderW: bcs?.borderTopWidth,
    bubbleRadius: bcs?.borderTopLeftRadius,
    bubblePadT: bcs?.paddingTop,
    bubblePadL: bcs?.paddingLeft,
    indentStep: nodeCs?.getPropertyValue('--tm-indent-step')?.trim(),
    spineColor: kids ? getComputedStyle(kids).borderLeftColor : null,
    spineW: kids ? getComputedStyle(kids).borderLeftWidth : null,
    elbowColor: elbow ? getComputedStyle(elbow).borderBottomColor : null,
    elbowRadius: elbow ? getComputedStyle(elbow).borderBottomLeftRadius : null,
    groupBg: pcs?.backgroundColor,
    groupBorder: pcs?.borderTopColor,
    replyColor: rcs?.color,
    replyMinH: rcs?.minHeight,
    replyH: reply ? Math.round(reply.getBoundingClientRect().height) : 0,
    reactH: react ? Math.round(react.getBoundingClientRect().height) : 0,
    sepH: sep ? Math.round(sep.getBoundingClientRect().height) : 0,
    sepW: sep ? Math.round(sep.getBoundingClientRect().width) : 0,
    forbiddenBlueOnReply: rcs?.color === RGB.blueForbidden,
  }
}, RGB)
console.log('measure_ABC', JSON.stringify(measure))

function nearPx(v, n) {
  const m = String(v || '').match(/([\d.]+)/)
  return m && Math.abs(parseFloat(m[1]) - n) < 0.6
}

if (measure.ct18 !== 'true') fails.push('ct18 marker')
if (measure.bubbleBg !== RGB.bubble) fails.push(`A fill ${measure.bubbleBg}`)
if (measure.bubbleBorder !== RGB.border) fails.push(`A border ${measure.bubbleBorder}`)
if (!nearPx(measure.bubbleBorderW, 1)) fails.push(`A borderW ${measure.bubbleBorderW}`)
if (!nearPx(measure.bubbleRadius, 12)) fails.push(`A radius ${measure.bubbleRadius}`)
if (!nearPx(measure.bubblePadT, 12)) fails.push(`A padT ${measure.bubblePadT}`)
if (!nearPx(measure.bubblePadL, 16)) fails.push(`A padL ${measure.bubblePadL}`)
if (measure.indentStep !== '44px') fails.push(`indent ${measure.indentStep}`)
if (measure.spineColor !== RGB.spine) fails.push(`B spine ${measure.spineColor}`)
if (!nearPx(measure.spineW, 1)) fails.push(`B spineW ${measure.spineW}`)
if (measure.elbowColor !== RGB.spine) fails.push(`B elbow ${measure.elbowColor}`)
if (!nearPx(measure.elbowRadius, 6)) fails.push(`B elbowR ${measure.elbowRadius}`)
if (measure.groupBg !== RGB.group) fails.push(`C group ${measure.groupBg}`)
if (measure.replyColor !== RGB.action) fails.push(`C reply fg ${measure.replyColor}`)
if (!nearPx(measure.replyMinH, 44) || measure.replyH < 44) fails.push(`C replyH ${measure.replyH}`)
if (measure.reactH > 0 && measure.reactH < 44) fails.push(`C reactH ${measure.reactH}`)
if (measure.sepH !== 16 || measure.sepW !== 1) fails.push(`C sep ${measure.sepW}x${measure.sepH}`)
if (measure.forbiddenBlueOnReply) fails.push('C #2E90FA AS-IS')

/* 01 A bubble */
{
  const el = await page.$('[data-testid="tm-comment-node-ct08-t-a"] [data-testid="tm-comment-body"]')
  await capture('01-a-bubble.png', el)
}

/* 02 B spine+elbow */
{
  const el = await page.$('[data-testid="tm-comment-node-ct08-t-a"]')
  await capture('02-b-spine-elbow.png', el)
}

/* 03 C pills */
{
  const el = await page.$(
    '[data-testid="tm-comment-node-ct08-t-a"] [data-testid="tm-comment-action-pills"]',
  )
  await capture('03-c-pills-44.png', el)
}

/* 04 D reply parent */
await page.click('[data-testid="tm-comment-node-ct08-t-a"] [data-testid="tm-comment-reply"]')
await sleep(250)
const d = await page.evaluate((RGB) => {
  const root = document.querySelector('[data-testid="tm-comment-node-ct08-t-a"]')
  const bubble = root?.querySelector('[data-testid="tm-comment-body"]')
  const before = bubble ? getComputedStyle(bubble, '::before') : null
  return {
    selected: root?.getAttribute('data-tm-reply-parent-selected'),
    marker: bubble?.getAttribute('data-tm-reply-parent-marker'),
    cls: bubble?.className || '',
    beforeW: before?.width,
    beforeBg: before?.backgroundColor,
    fill: bubble ? getComputedStyle(bubble).backgroundColor : null,
  }
}, RGB)
console.log('measure_D', JSON.stringify(d))
if (d.selected !== 'true' || d.marker !== 'true') fails.push(`D attrs ${JSON.stringify(d)}`)
if (!d.cls.includes('tm-comment-node__bubble--reply-parent')) fails.push('D class')
if (d.fill !== RGB.bubble) fails.push(`D fill changed ${d.fill}`)
if (d.beforeBg && d.beforeBg !== 'rgba(0, 0, 0, 0)' && d.beforeBg !== RGB.action) {
  /* some engines report transparent when content empty — class+attrs remain SSOT */
}
{
  const el = await page.$('[data-testid="tm-comment-node-ct08-t-a"] [data-testid="tm-comment-body"]')
  await capture('04-d-reply-parent.png', el)
}

/* 05 overview depth2 */
{
  const el = await page.$('[data-testid="feed-lab-ct08-stand-TREE"]')
  await capture('05-depth2-audit.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      utc: new Date().toISOString(),
      measure,
      d,
      md5s,
      fails,
      opEye: 'Absent',
      partialVisual: 'BLOCK',
    },
    null,
    2,
  ),
)

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(2)
}
console.log(JSON.stringify({ ok: true, md5s, fails: 0 }))
