/**
 * CT-23 Path A — M152/M153/M153b density · #/lab/feed greenfield discussion.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / denser / HTTP.
 *
 * Env: CT23_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-23-thread-density-artboard-frames/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT23_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1280, height: 2200, deviceScaleFactor: 1 })
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-greenfield-section"]', { timeout: 10000 })
await page.evaluate(() => {
  document.querySelectorAll('[data-lab-ct08-stand], [data-testid^="feed-lab-ct2"]').forEach((n) => {
    n.style.display = 'none'
  })
})
await sleep(200)

const cardId = await page.evaluate(() => {
  const gf = document.querySelector('[data-testid="feed-lab-greenfield-section"]')
  const card = gf?.querySelector('[data-testid^="feed-post-card-"]')
  return card?.getAttribute('data-testid') || null
})
if (!cardId) throw new Error('no feed card')
const cardSel = `[data-testid="${cardId}"]`

await page.evaluate((s) => {
  const card = document.querySelector(s)
  const view = [...(card?.querySelectorAll('button, a, [role="button"]') || [])].find((b) =>
    /view discussion|view replies|comment/i.test(b.textContent || ''),
  )
  view?.click()
}, cardSel)
await sleep(500)
await page.waitForSelector(`${cardSel} [data-testid="tm-issue-thread-block"]`, { timeout: 10000 })

/* Assert no nested plate */
{
  const m = await page.evaluate((s) => {
    const host = document.querySelector(`${s} [data-testid="feed-post-thread-host"]`)
    const block = document.querySelector(`${s} [data-testid="tm-issue-thread-block"]`)
    const bubble = document.querySelector(`${s} .tm-comment-node__bubble`)
    const composer = document.querySelector(`${s} [data-testid="tm-thread-composer"]`)
    const hs = host ? getComputedStyle(host) : null
    const bs = block ? getComputedStyle(block) : null
    const bub = bubble ? getComputedStyle(bubble) : null
    const cs = composer ? getComputedStyle(composer) : null
    return {
      hostBorder: hs?.borderTopWidth,
      hostBg: hs?.backgroundColor,
      hostShadow: hs?.boxShadow,
      blockTop: bs?.borderTopWidth,
      blockLeft: bs?.borderLeftWidth,
      blockRight: bs?.borderRightWidth,
      blockBottom: bs?.borderBottomWidth,
      blockShadow: bs?.boxShadow,
      blockBg: bs?.backgroundColor,
      density: block?.getAttribute('data-tm-density'),
      bubbleBorder: bub?.borderTopColor,
      bubblePad: bub?.paddingTop,
      composerBg: cs?.backgroundColor,
      composerTop: cs?.borderTopWidth,
    }
  }, cardSel)
  console.log('assert', JSON.stringify(m))
  if (m.density !== 'artboard') fails.push(`density ${m.density}`)
  if (m.hostBorder !== '0px') fails.push(`host border ${m.hostBorder}`)
  if (m.hostShadow && m.hostShadow !== 'none') fails.push(`host shadow ${m.hostShadow}`)
  if (m.blockTop !== '1px') fails.push(`block top ${m.blockTop}`)
  if (m.blockLeft !== '0px' || m.blockRight !== '0px' || m.blockBottom !== '0px') {
    fails.push(`block sides ${m.blockLeft}/${m.blockRight}/${m.blockBottom}`)
  }
  if (m.blockShadow && m.blockShadow !== 'none') fails.push(`block shadow ${m.blockShadow}`)
  if (m.bubbleBorder !== 'rgb(231, 228, 220)') fails.push(`bubble ${m.bubbleBorder}`)
  if (m.bubblePad !== '12px') fails.push(`bubble pad ${m.bubblePad}`)
  if (m.composerTop !== '1px') fails.push(`composer top ${m.composerTop}`)
}

const threadHost = await page.$(`${cardSel} [data-testid="feed-post-thread-host"]`)
const block = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
const bubble = await page.$(`${cardSel} .tm-comment-node__bubble`)
const composer = await page.$(`${cardSel} [data-testid="tm-thread-composer"]`)
const card = await page.$(cardSel)

await capture('01-discussion-no-extra-plates.png', threadHost || block)
await capture('02-bubble-spine-pills.png', bubble || block)
await capture('03-node-composer-gaps.png', block)
await capture('04-host-card-anatomy.png', card)
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
const narrowBlock = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
await capture('05-narrow-density.png', narrowBlock || card)

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-23-thread-density-artboard-frames',
      ui_gate: 'auto',
      path: 'A',
      partial: 'BLOCK',
      op_eye: 'Absent',
      invent_pass: false,
      invent_denser: false,
      invent_http: false,
      md5s,
      fails,
      capturedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
)

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(1)
}
console.log('CT23 capture OK · shots', md5s.length, '· gate stays BLOCK (OP eye Absent)')
