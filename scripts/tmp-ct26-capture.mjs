/**
 * CT-26 Path A — M153d density v2 borderless fill · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / denser / HTTP.
 *
 * Env: CT26_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-26-density-v2-borderless-fill/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT26_BASE || 'http://127.0.0.1:5173'

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

async function expandFirstFeedCard() {
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
  const sel = `[data-testid="${cardId}"]`
  await page.evaluate((s) => {
    const card = document.querySelector(s)
    const view = [...(card?.querySelectorAll('button, a, [role="button"]') || [])].find((b) =>
      /view discussion|view replies|comment/i.test(b.textContent || ''),
    )
    view?.click()
  }, sel)
  await sleep(500)
  await page.waitForSelector(`${sel} [data-testid="tm-issue-thread-block"]`, { timeout: 10000 })
  return sel
}

function assertDensity(metrics, label) {
  const issues = []
  if (metrics.bubbleBorderTop !== '0px') issues.push(`${label}: bubble borderTop ${metrics.bubbleBorderTop}`)
  if (metrics.bubbleBorderLeft !== '0px') issues.push(`${label}: bubble borderLeft ${metrics.bubbleBorderLeft}`)
  if (metrics.pillsBorderTop !== '0px') issues.push(`${label}: pills borderTop ${metrics.pillsBorderTop}`)
  if (metrics.bubblePadTop !== '8px') issues.push(`${label}: bubble padTop ${metrics.bubblePadTop}`)
  if (metrics.bubblePadLeft !== '12px') issues.push(`${label}: bubble padLeft ${metrics.bubblePadLeft}`)
  if (metrics.actionsMarginTop !== '4px') issues.push(`${label}: actions marginTop ${metrics.actionsMarginTop}`)
  if (Number.parseFloat(metrics.pillMinHeight) < 44) {
    issues.push(`${label}: pill minHeight ${metrics.pillMinHeight}`)
  }
  if (metrics.attachBorder && !/^1px/.test(metrics.attachBorder)) {
    issues.push(`${label}: AttachmentRef border ${metrics.attachBorder}`)
  }
  return issues
}

await page.setViewport({ width: 1280, height: 2200, deviceScaleFactor: 1 })
const cardSel = await expandFirstFeedCard()

/* Structure probe */
const metrics = await page.evaluate((s) => {
  const bubble = document.querySelector(`${s} .tm-comment-node__bubble`)
  const pills = document.querySelector(`${s} .tm-comment-node__action-pills`)
  const actions = document.querySelector(`${s} .tm-comment-node__actions`)
  const pill = document.querySelector(`${s} .tm-comment-node__pill`)
  const block = document.querySelector(`${s} [data-testid="tm-issue-thread-block"]`)
  const attach = document.querySelector(`${s} .tm-attachment-ref`)
  const bs = bubble ? getComputedStyle(bubble) : null
  const ps = pills ? getComputedStyle(pills) : null
  const as = actions ? getComputedStyle(actions) : null
  const pls = pill ? getComputedStyle(pill) : null
  const ats = attach ? getComputedStyle(attach) : null
  return {
    density: block?.getAttribute('data-tm-density'),
    bubbleBorderTop: bs?.borderTopWidth,
    bubbleBorderLeft: bs?.borderLeftWidth,
    bubblePadTop: bs?.paddingTop,
    bubblePadLeft: bs?.paddingLeft,
    pillsBorderTop: ps?.borderTopWidth,
    actionsMarginTop: as?.marginTop,
    pillMinHeight: pls?.minHeight,
    attachBorder: ats ? `${ats.borderTopWidth}` : null,
    attachPresent: Boolean(attach),
  }
}, cardSel)

console.log('metrics', JSON.stringify(metrics))
if (metrics.density !== 'm153d') fails.push(`density=${metrics.density}`)
fails.push(...assertDensity(metrics, 'desktop'))

/* 01 — borderless nested tree */
{
  const el = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
  await capture('01-borderless-nested-tree.png', el)
}

/* 02 — reply parent selected */
{
  await page.evaluate((s) => {
    const reply = [...document.querySelectorAll(`${s} .tm-comment-node__reply, ${s} button`)].find(
      (b) => /reply/i.test(b.textContent || ''),
    )
    reply?.click()
  }, cardSel)
  await sleep(400)
  const parent = await page.$(`${cardSel} .tm-comment-node__bubble--reply-parent`)
  const block = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
  await capture('02-reply-parent-selected.png', parent || block)
}

/* 03 — narrow 390 */
{
  await page.setViewport({ width: 390, height: 1200, deviceScaleFactor: 1 })
  await sleep(300)
  const el = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
  await capture('03-narrow-390.png', el)
  const narrowMetrics = await page.evaluate((s) => {
    const bubble = document.querySelector(`${s} .tm-comment-node__bubble`)
    const pills = document.querySelector(`${s} .tm-comment-node__action-pills`)
    const actions = document.querySelector(`${s} .tm-comment-node__actions`)
    const pill = document.querySelector(`${s} .tm-comment-node__pill`)
    const bs = bubble ? getComputedStyle(bubble) : null
    const ps = pills ? getComputedStyle(pills) : null
    const as = actions ? getComputedStyle(actions) : null
    const pls = pill ? getComputedStyle(pill) : null
    return {
      bubbleBorderTop: bs?.borderTopWidth,
      bubbleBorderLeft: bs?.borderLeftWidth,
      bubblePadTop: bs?.paddingTop,
      bubblePadLeft: bs?.paddingLeft,
      pillsBorderTop: ps?.borderTopWidth,
      actionsMarginTop: as?.marginTop,
      pillMinHeight: pls?.minHeight,
      attachBorder: null,
    }
  }, cardSel)
  fails.push(...assertDensity(narrowMetrics, 'narrow'))
}

/* 04 — before/after continuity note (current v2 tree crop) */
{
  await page.setViewport({ width: 1280, height: 2200, deviceScaleFactor: 1 })
  await sleep(200)
  const el = await page.$(`${cardSel} [data-testid="tm-comment-tree"], ${cardSel} .tm-comment-tree`)
  const block = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
  await capture('04-density-v2-tree.png', el || block)
}

/* 05 — AttachmentRef borders held · attach a local image if possible */
{
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
  const composer = await page.$(`${cardSel} [data-testid="tm-thread-composer"]`)
  let attachEl = await page.$(`${cardSel} .tm-attachment-ref`)
  if (!attachEl) {
    const input = await page.$(`${cardSel} input[type="file"]`)
    if (input) {
      const pngPath = path.resolve(
        __dirname,
        '../docs/UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png',
      )
      try {
        await input.uploadFile(pngPath)
        await sleep(600)
        attachEl = await page.$(`${cardSel} .tm-attachment-ref`)
      } catch (e) {
        console.warn('attach upload skipped', e?.message || e)
      }
    }
  }
  if (attachEl) {
    const ab = await page.evaluate(() => {
      const a = document.querySelector('.tm-attachment-ref')
      const s = a ? getComputedStyle(a) : null
      return s ? `${s.borderTopWidth} ${s.borderTopColor}` : null
    })
    console.log('attachBorder', ab)
    if (!ab || !/^1px/.test(ab)) fails.push(`attach border ${ab}`)
    await capture('05-attachment-ref-borders-held.png', attachEl)
  } else if (composer) {
    await capture('05-attachment-ref-borders-held.png', composer)
    fails.push('attach chip Absent · captured composer shell')
  } else {
    fails.push('no composer for shot 05')
  }
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-26-density-v2-borderless-fill',
      mockup: 'M153d',
      captured_utc: new Date().toISOString(),
      op_eye: 'Absent',
      partial: 'BLOCK',
      density: metrics.density,
      md5s,
      fails,
    },
    null,
    2,
  ),
)

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exitCode = 1
} else {
  console.log('CAPTURE ok · fails: [] · op_eye Absent · partial BLOCK')
}
