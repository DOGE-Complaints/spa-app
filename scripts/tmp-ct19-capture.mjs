/**
 * CT-19 Path A — M153b §7 Ready/Denied paint · #/lab/feed + #/lab/thread.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / MIME / HTTP.
 *
 * Env: CT19_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-19-attachment-ref-token-paint/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT19_BASE || 'http://127.0.0.1:5173'

const RGB = {
  readyFill: 'rgb(255, 253, 248)',
  deniedFill: 'rgb(247, 246, 242)',
  border: 'rgb(231, 228, 220)',
  accent: 'rgb(181, 71, 8)',
  titleReady: 'rgb(16, 24, 40)',
  greenForbidden: 'rgb(6, 118, 71)',
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

function nearPx(v, n) {
  const m = String(v || '').match(/([\d.]+)/)
  return m && Math.abs(parseFloat(m[1]) - n) < 0.6
}

await page.setViewport({ width: 1536, height: 2400, deviceScaleFactor: 1 })

async function expandFirstFeedCard() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await page.waitForSelector('[data-testid="feed-lab-greenfield-section"]', { timeout: 10000 })
  await page.evaluate(() => {
    document.querySelectorAll('[data-lab-ct08-stand]').forEach((n) => {
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
  await page.waitForSelector(`${sel} [data-testid="tm-thread-composer"]`, { timeout: 10000 })
  return sel
}

const cardSel = await expandFirstFeedCard()

/* 01 C Ready */
{
  const fileInput = await page.$(`${cardSel} [data-testid="tm-composer-file-input"]`)
  const tmpImg = path.join(outDir, '_tmp-pick.png')
  writeFileSync(
    tmpImg,
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    ),
  )
  await fileInput.uploadFile(tmpImg)
  await sleep(350)
  const m = await page.evaluate((RGB) => {
    const chip = document.querySelector('[data-tm-attach-status="ready"]')
    const ready = chip?.querySelector('[data-testid="tm-attachment-ready"]')
    const remove = chip?.querySelector('[data-testid^="tm-attachment-remove-"]')
    const cs = chip ? getComputedStyle(chip) : null
    const rcs = ready ? getComputedStyle(ready) : null
    const rm = remove ? getComputedStyle(remove) : null
    return {
      text: ready?.textContent || '',
      fill: cs?.backgroundColor,
      border: cs?.borderTopColor,
      radius: cs?.borderTopLeftRadius,
      pad: cs?.paddingTop,
      titleColor: rcs?.color,
      removeColor: rm?.color,
      green: rcs?.color === RGB.greenForbidden,
      ct19: chip?.getAttribute('data-lab-ct19'),
      published: chip?.getAttribute('data-tm-attach-published'),
    }
  }, RGB)
  console.log('01-ready', JSON.stringify(m))
  if (m.text !== 'Ready to post') fails.push(`01 text ${m.text}`)
  if (m.fill !== RGB.readyFill) fails.push(`01 fill ${m.fill}`)
  if (m.border !== RGB.border) fails.push(`01 border ${m.border}`)
  if (!nearPx(m.radius, 12) || !nearPx(m.pad, 12)) fails.push(`01 geom ${m.radius}/${m.pad}`)
  if (m.titleColor !== RGB.titleReady) fails.push(`01 title ${m.titleColor}`)
  if (m.removeColor !== RGB.accent) fails.push(`01 remove ${m.removeColor}`)
  if (m.green || m.published !== 'false' || m.ct19 !== 'true') fails.push(`01 flags ${JSON.stringify(m)}`)
  const el = await page.$(`${cardSel} [data-tm-attach-status="ready"]`)
  await capture('01-c-ready.png', el)
  await page.evaluate((s) => {
    document.querySelector(`${s} [data-testid^="tm-attachment-remove-"]`)?.click()
  }, cardSel)
  await sleep(200)
}

/* 02 D Denied type */
{
  const fileInput = await page.$(`${cardSel} [data-testid="tm-composer-file-input"]`)
  const tmpBin = path.join(outDir, '_tmp-pick.bin')
  writeFileSync(tmpBin, Buffer.from([0, 1, 2, 3]))
  await fileInput.uploadFile(tmpBin)
  await sleep(350)
  const m = await page.evaluate((RGB) => {
    const chip = document.querySelector('[data-tm-attach-status="denied"]')
    const title = chip?.querySelector('[data-testid="tm-attachment-denied-title"]')
    const detail = chip?.querySelector('[data-testid="tm-attachment-denied-detail"]')
    const remove = chip?.querySelector('[data-testid^="tm-attachment-remove-"]')
    const cs = chip ? getComputedStyle(chip) : null
    const tcs = title ? getComputedStyle(title) : null
    const dcs = detail ? getComputedStyle(detail) : null
    const rm = remove ? getComputedStyle(remove) : null
    return {
      reason: chip?.getAttribute('data-tm-attach-deny-reason'),
      title: title?.textContent || '',
      detail: detail?.textContent || '',
      fill: cs?.backgroundColor,
      border: cs?.borderTopColor,
      titleColor: tcs?.color,
      titleWeight: tcs?.fontWeight,
      detailColor: dcs?.color,
      removeColor: rm?.color,
    }
  }, RGB)
  console.log('02-denied', JSON.stringify(m))
  if (m.reason !== 'type') fails.push(`02 reason ${m.reason}`)
  if (!/can’t be added/i.test(m.title)) fails.push(`02 title ${m.title}`)
  if (!/Allowed: images/i.test(m.detail)) fails.push(`02 detail ${m.detail}`)
  if (/safety/i.test(m.detail)) fails.push('02 safety on type')
  if (m.fill !== RGB.deniedFill) fails.push(`02 fill ${m.fill}`)
  if (m.border !== RGB.accent) fails.push(`02 border ${m.border}`)
  if (m.titleColor !== RGB.accent) fails.push(`02 titleColor ${m.titleColor}`)
  if (m.removeColor !== RGB.accent) fails.push(`02 remove ${m.removeColor}`)
  const el = await page.$(`${cardSel} [data-tm-attach-status="denied"]`)
  await capture('02-d-denied.png', el)
  const rm = await page.$(`${cardSel} [data-testid^="tm-attachment-remove-"]`)
  await capture('04-remove.png', rm)
  await page.evaluate((s) => {
    document.querySelector(`${s} [data-testid^="tm-attachment-remove-"]`)?.click()
  }, cardSel)
  await sleep(200)
}

/* 03 E safety — lab stand O */
{
  await page.goto(`${base}/#/lab/thread`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="tm-lab-canvas"], [data-lab-ct01]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await sleep(300)
  const m = await page.evaluate((RGB) => {
    const stand =
      document.querySelector('[data-testid="tm-lab-stand-O"]') ||
      document.querySelector('[data-lab-stand-id="O"]')
    const chip = stand?.querySelector('[data-tm-attach-status="denied"]')
    const detail = chip?.querySelector('[data-testid="tm-attachment-denied-detail"]')
    const cs = chip ? getComputedStyle(chip) : null
    return {
      missing: !stand || !chip,
      reason: chip?.getAttribute('data-tm-attach-deny-reason'),
      detail: detail?.textContent || '',
      fill: cs?.backgroundColor,
      border: cs?.borderTopColor,
    }
  }, RGB)
  console.log('03-safety', JSON.stringify(m))
  if (m.missing) fails.push('03 stand O missing')
  if (m.reason !== 'safety') fails.push(`03 reason ${m.reason}`)
  if (!/media safety rules/i.test(m.detail)) fails.push(`03 detail ${m.detail}`)
  if (m.fill !== RGB.deniedFill || m.border !== RGB.accent) fails.push(`03 paint ${m.fill}/${m.border}`)
  const el =
    (await page.$('[data-testid="tm-lab-stand-O"] [data-tm-attach-status="denied"]')) ||
    (await page.$('[data-lab-stand-id="O"] [data-tm-attach-status="denied"]'))
  await capture('03-e-denied-safety.png', el)
}

/* 05 honesty — Ready chip on feed again */
{
  const cardSel2 = await expandFirstFeedCard()
  const fileInput = await page.$(`${cardSel2} [data-testid="tm-composer-file-input"]`)
  const tmpImg = path.join(outDir, '_tmp-pick2.png')
  writeFileSync(
    tmpImg,
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    ),
  )
  await fileInput.uploadFile(tmpImg)
  await sleep(350)
  const m = await page.evaluate(() => {
    const local = document.querySelector('[data-testid="tm-attachment-local-intent"]')
    const chip = document.querySelector('[data-tm-attach-status="ready"]')
    return {
      honesty: local?.textContent || '',
      published: chip?.getAttribute('data-tm-attach-published'),
    }
  })
  console.log('05-honesty', JSON.stringify(m))
  if (!/Local intent/i.test(m.honesty) || m.published !== 'false') fails.push(`05 ${JSON.stringify(m)}`)
  /* Path A honesty · composer frame (distinct from 01 Ready crop) */
  const el = await page.$(`${cardSel2} [data-testid="tm-thread-composer"]`)
  await capture('05-honesty.png', el)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    { utc: new Date().toISOString(), md5s, fails, opEye: 'Absent', partialVisual: 'BLOCK' },
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
