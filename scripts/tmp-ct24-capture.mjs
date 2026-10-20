/**
 * CT-24 Path A — M152d Share Issue link sheet · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP.
 *
 * Env: CT24_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-24-share-issue-link-sheet/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT24_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1280, height: 1600, deviceScaleFactor: 1 })
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

/* 01 desktop popover */
await page.click(`${cardSel} [data-testid="feed-post-action-share"]`)
await page.waitForSelector('[data-testid="feed-post-share-surface"]', { timeout: 5000 })
{
  const m = await page.evaluate(() => {
    const s = document.querySelector('[data-testid="feed-post-share-surface"]')
    return {
      surface: s?.getAttribute('data-lab-share-surface'),
      url: s?.getAttribute('data-lab-share-url'),
      rows: document.querySelectorAll('[data-share-row]').length,
      icons: [...document.querySelectorAll('[data-testid^="feed-post-share-icon-"]')].map((i) =>
        i.getAttribute('src'),
      ),
    }
  })
  console.log('assert-01', JSON.stringify(m))
  if (m.surface !== 'popover') fails.push(`surface ${m.surface}`)
  if (m.url !== 'present') fails.push(`url ${m.url}`)
  if (m.rows !== 6) fails.push(`rows ${m.rows}`)
  if (m.icons.length !== 5) fails.push(`icons ${m.icons.length}`)
}
const wrap = await page.$(`${cardSel} [data-testid="feed-post-strip-share-wrap"]`)
const surface = await page.$('[data-testid="feed-post-share-surface"]')
await capture('01-desktop-popover.png', wrap || surface)

/* 03 icons row crop */
await capture('03-icon-rows.png', surface)

/* 04 copy → Link copied */
await page.click('[data-testid="feed-post-share-row-copy"]')
await sleep(300)
await page.waitForSelector('[data-testid="feed-post-share-copied"]', { timeout: 3000 })
const toastHost = await page.$(`${cardSel} [data-testid="feed-post-strip-share-wrap"]`)
await capture('04-link-copied.png', toastHost || (await page.$(cardSel)))

/* close toast wait · open card without URL (002) for honesty */
await sleep(2100)
const card002 = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('[data-testid^="feed-post-card-"]')]
  const hit = cards.find((c) => (c.getAttribute('data-testid') || '').includes('002'))
  return hit?.getAttribute('data-testid') || null
})
if (!card002) fails.push('card-002 missing')
else {
  await page.click(`[data-testid="${card002}"] [data-testid="feed-post-action-share"]`)
  await page.waitForSelector('[data-testid="feed-post-share-unavailable"]', { timeout: 5000 })
  const honestySurface = await page.$('[data-testid="feed-post-share-surface"]')
  await capture('05-url-unavailable.png', honestySurface)
  await page.click('[data-testid="feed-post-share-close"]')
  await sleep(200)
}

/* 02 narrow bottom sheet — reopen card 001 */
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(400)
await page.click(`${cardSel} [data-testid="feed-post-action-share"]`)
await page.waitForSelector('[data-testid="feed-post-share-surface"][data-lab-share-surface="sheet"]', {
  timeout: 5000,
})
{
  const m = await page.evaluate(() =>
    document.querySelector('[data-testid="feed-post-share-surface"]')?.getAttribute('data-lab-share-surface'),
  )
  console.log('assert-02', m)
  if (m !== 'sheet') fails.push(`narrow ${m}`)
}
const sheet = await page.$('[data-testid="feed-post-share-surface"]')
await capture('02-narrow-bottom-sheet.png', sheet)

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-24-share-issue-link-sheet',
      ui_gate: 'auto',
      path: 'A',
      mockup: 'DOGEstonia-M152d-post-share-residual-states-spec-v1.0',
      partial: 'BLOCK',
      op_eye: 'Absent',
      invent_pass: false,
      invent_http: false,
      md5s,
      fails,
      capturedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
)

const readme = `# Screenshots — CT-24 share Issue link sheet (Path A)

> P3 capture · \`#/lab/feed\` · Partial=**BLOCK** until OP eye · no invent OP PASS  
> M152d · icons \`/icons/next-feed/share/*\` · pack Present

| ID | File | Claim | md5 prefix |
|----|------|-------|------------|
| 01 | 01-desktop-popover.png | Share → desktop popover · six rows | ${md5s.find((m) => m.file.startsWith('01'))?.prefix || '—'} |
| 02 | 02-narrow-bottom-sheet.png | Narrow 390 bottom sheet | ${md5s.find((m) => m.file.startsWith('02'))?.prefix || '—'} |
| 03 | 03-icon-rows.png | Five network SVGs | ${md5s.find((m) => m.file.startsWith('03'))?.prefix || '—'} |
| 04 | 04-link-copied.png | Link copied feedback | ${md5s.find((m) => m.file.startsWith('04'))?.prefix || '—'} |
| 05 | 05-url-unavailable.png | M152d D honesty | ${md5s.find((m) => m.file.startsWith('05'))?.prefix || '—'} |

No invent OP PASS · no invent HTTP · NO BRIEF · OP eye Absent = BLOCK.
`
writeFileSync(path.join(outDir, 'README.md'), readme)

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(1)
}
console.log('CT24 capture OK · shots', md5s.length, '· gate stays BLOCK (OP eye Absent)')
