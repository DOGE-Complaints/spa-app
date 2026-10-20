/**
 * CT-27 Path A — M152d Share · Instagram disabled · Copy text-only · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP / Graph.
 *
 * Env: CT27_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-27-share-instagram-disabled-copy-text/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT27_BASE || 'http://127.0.0.1:5173'

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

async function openShareOnFirstCard() {
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
  await page.click(`${sel} [data-testid="feed-post-action-share"]`)
  await page.waitForSelector('[data-testid="feed-post-share-surface"]', { timeout: 10000 })
  return sel
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await openShareOnFirstCard()

const probe = await page.evaluate(() => {
  const surface = document.querySelector('[data-testid="feed-post-share-surface"]')
  const ig = document.querySelector('[data-testid="feed-post-share-row-instagram"]')
  const copy = document.querySelector('[data-testid="feed-post-share-row-copy"]')
  return {
    ct27: surface?.getAttribute('data-lab-ct27'),
    igDisabled: ig?.getAttribute('data-share-disabled'),
    igAria: ig?.getAttribute('aria-disabled'),
    igDisabledProp: ig?.disabled ?? null,
    copyTextOnly: copy?.getAttribute('data-share-copy-text-only'),
    copyHasGlyph: Boolean(copy?.textContent?.includes('⎘')),
    copyHasIconClass: Boolean(copy?.querySelector('.feed-post-share-surface__row-icon--copy')),
    copyHasImg: Boolean(copy?.querySelector('img')),
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.ct27 !== 'true') fails.push(`ct27=${probe.ct27}`)
if (probe.igDisabled !== 'true') fails.push(`igDisabled=${probe.igDisabled}`)
if (probe.copyTextOnly !== 'true') fails.push(`copyTextOnly=${probe.copyTextOnly}`)
if (probe.copyHasGlyph || probe.copyHasIconClass || probe.copyHasImg) {
  fails.push('copy still has icon/glyph')
}

/* 01 — Share open · IG disabled in list */
{
  const el = await page.$('[data-testid="feed-post-share-surface"]')
  await capture('01-share-ig-disabled-list.png', el)
}

/* 02 — IG click · no copy toast */
{
  await page.evaluate(() => {
    document.querySelector('[data-testid="feed-post-share-row-instagram"]')?.click()
  })
  await sleep(400)
  const toast = await page.$('[data-testid="feed-post-share-copied"]')
  if (toast) fails.push('IG click produced Link copied toast')
  const el = await page.$('[data-testid="feed-post-share-surface"]')
  if (el) await capture('02-ig-click-no-copy.png', el)
  else {
    /* surface may stay open when disabled; re-open if closed */
    fails.push('surface missing after IG click')
  }
}

/* 03 — Copy link text-only */
{
  let surface = await page.$('[data-testid="feed-post-share-surface"]')
  if (!surface) {
    await page.click('[data-testid^="feed-post-card-"] [data-testid="feed-post-action-share"]')
    await page.waitForSelector('[data-testid="feed-post-share-surface"]', { timeout: 5000 })
    surface = await page.$('[data-testid="feed-post-share-surface"]')
  }
  const copy = await page.$('[data-testid="feed-post-share-row-copy"]')
  await capture('03-copy-link-text-only.png', copy || surface)
}

/* 04 — other networks unchanged (icons Present) */
{
  const surface = await page.$('[data-testid="feed-post-share-surface"]')
  const icons = await page.evaluate(() =>
    ['telegram', 'x', 'whatsapp', 'facebook'].map((id) =>
      Boolean(document.querySelector(`[data-testid="feed-post-share-icon-${id}"]`)),
    ),
  )
  if (icons.some((x) => !x)) fails.push(`network icons ${icons}`)
  await capture('04-other-networks-unchanged.png', surface)
}

/* 05 — narrow sheet */
{
  await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 1 })
  await page.reload({ waitUntil: 'networkidle0' })
  await sleep(300)
  await openShareOnFirstCard()
  const el = await page.$('[data-testid="feed-post-share-surface"]')
  const mode = await page.evaluate(() =>
    document.querySelector('[data-testid="feed-post-share-surface"]')?.getAttribute('data-lab-share-surface'),
  )
  console.log('narrow mode', mode)
  await capture('05-narrow-sheet.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-27-share-instagram-disabled-copy-text',
      mockup: 'M152d',
      captured_utc: new Date().toISOString(),
      op_eye: 'Absent',
      partial: 'BLOCK',
      probe,
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
