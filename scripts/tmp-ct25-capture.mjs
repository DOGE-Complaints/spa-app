/**
 * CT-25 Path A — M153c composer AttachmentRef fileName chip · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP / MIME.
 *
 * Env: CT25_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-25-composer-attach-chip-preview-filename/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT25_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []
const tmpFiles = []

async function capture(file, el) {
  const dest = path.join(outDir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

function writeTmp(name, buf) {
  const p = path.join(outDir, name)
  writeFileSync(p, buf)
  tmpFiles.push(p)
  return p
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
  await page.waitForSelector(`${sel} [data-testid="tm-thread-composer"]`, { timeout: 10000 })
  return sel
}

async function clearChips(cardSel) {
  await page.evaluate((s) => {
    const card = document.querySelector(s)
    card?.querySelectorAll('[data-testid^="tm-attachment-remove-"]').forEach((b) => b.click())
  }, cardSel)
  await sleep(150)
}

async function pickAndSnap(cardSel, filePath, shot, assertFn) {
  await clearChips(cardSel)
  const fileInput = await page.$(`${cardSel} [data-testid="tm-composer-file-input"]`)
  await fileInput.uploadFile(filePath)
  await sleep(350)
  const snap = await page.evaluate((s) => {
    const card = document.querySelector(s)
    const chip = card?.querySelector('[data-testid^="tm-attachment-ref-"]')
    return {
      status: chip?.getAttribute('data-tm-attach-status'),
      filename: chip?.querySelector('[data-testid="tm-attachment-filename"]')?.getAttribute('title'),
      family: chip?.querySelector('[data-testid="tm-attachment-family"]')?.textContent,
      thumb: chip?.getAttribute('data-tm-attach-thumb'),
      cue: chip?.querySelector('[data-testid="tm-attachment-type-cue"]')?.getAttribute('data-tm-attach-cue'),
      ct25: chip?.getAttribute('data-lab-ct25'),
      visName: chip?.querySelector('.tm-attachment-ref__filename-vis')?.textContent?.trim(),
    }
  }, cardSel)
  console.log(shot, JSON.stringify(snap))
  assertFn(snap)
  const el =
    (await page.$(`${cardSel} [data-testid^="tm-attachment-ref-"]`)) ||
    (await page.$(`${cardSel} [data-testid="tm-thread-composer"]`))
  await capture(shot, el)
}

await page.setViewport({ width: 1280, height: 1600, deviceScaleFactor: 1 })
const cardSel = await expandFirstFeedCard()

const png1x1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)
const imgPath = writeTmp('courtyard-flowers.jpg', png1x1)
const mdPath = writeTmp(
  'pet-care-notes.md',
  Buffer.from('# notes\n', 'utf8'),
)
const pdfPath = writeTmp(
  'neighbourhood-plan.pdf',
  Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'binary'),
)
const longMd = writeTmp(
  'neighbourhood-pet-care-notes.md',
  Buffer.from('# long\n', 'utf8'),
)
const binPath = writeTmp('selected-file.bin', Buffer.from([0, 1, 2, 3]))

await pickAndSnap(cardSel, imgPath, '01-ready-image-thumb.png', (s) => {
  if (s.status !== 'ready') fails.push(`01 status ${s.status}`)
  if (s.filename !== 'courtyard-flowers.jpg') fails.push(`01 name ${s.filename}`)
  if (s.thumb !== 'true') fails.push(`01 thumb ${s.thumb}`)
  if (s.ct25 !== 'true') fails.push('01 ct25')
})

await pickAndSnap(cardSel, mdPath, '02-ready-markdown.png', (s) => {
  if (s.status !== 'ready') fails.push(`02 status ${s.status}`)
  if (s.filename !== 'pet-care-notes.md') fails.push(`02 name ${s.filename}`)
  if (s.cue !== 'MD') fails.push(`02 cue ${s.cue}`)
})

await pickAndSnap(cardSel, pdfPath, '03-ready-pdf.png', (s) => {
  if (s.status !== 'ready') fails.push(`03 status ${s.status}`)
  if (s.filename !== 'neighbourhood-plan.pdf') fails.push(`03 name ${s.filename}`)
  if (s.cue !== 'PDF') fails.push(`03 cue ${s.cue}`)
})

await pickAndSnap(cardSel, binPath, '04-denied-filename.png', (s) => {
  if (s.status !== 'denied') fails.push(`04 status ${s.status}`)
  if (s.filename !== 'selected-file.bin') fails.push(`04 name ${s.filename}`)
})

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
await pickAndSnap(cardSel, longMd, '05-narrow-ellipsis.png', (s) => {
  if (s.status !== 'ready') fails.push(`05 status ${s.status}`)
  if (s.filename !== 'neighbourhood-pet-care-notes.md') fails.push(`05 name ${s.filename}`)
  if (!s.visName?.includes('…')) fails.push(`05 vis ${s.visName}`)
  if (!s.visName?.endsWith('.md')) fails.push(`05 ext ${s.visName}`)
})

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-25-composer-attach-chip-preview-filename',
      ui_gate: 'auto',
      path: 'A',
      mockup: 'DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0',
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

const readme = `# Screenshots — CT-25 composer attach chip (Path A)

> P3 capture · \`#/lab/feed\` · Partial=**BLOCK** until OP eye · no invent OP PASS  
> M153c · keep M153b §7 paint · pack Present

| ID | File | Claim | md5 prefix |
|----|------|-------|------------|
| 01 | 01-ready-image-thumb.png | 48×48 thumb · fileName | ${md5s.find((m) => m.file.startsWith('01'))?.prefix || '—'} |
| 02 | 02-ready-markdown.png | MD cue · fileName | ${md5s.find((m) => m.file.startsWith('02'))?.prefix || '—'} |
| 03 | 03-ready-pdf.png | PDF cue · fileName | ${md5s.find((m) => m.file.startsWith('03'))?.prefix || '—'} |
| 04 | 04-denied-filename.png | Denied + known name | ${md5s.find((m) => m.file.startsWith('04'))?.prefix || '—'} |
| 05 | 05-narrow-ellipsis.png | Narrow middle ellipsis | ${md5s.find((m) => m.file.startsWith('05'))?.prefix || '—'} |

No invent OP PASS · no invent HTTP · NO BRIEF · OP eye Absent = BLOCK.
`
writeFileSync(path.join(outDir, 'README.md'), readme)

for (const f of tmpFiles) {
  try {
    unlinkSync(f)
  } catch {
    /* ignore */
  }
}

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(1)
}
console.log('CT25 capture OK · shots', md5s.length, '· gate stays BLOCK (OP eye Absent)')
