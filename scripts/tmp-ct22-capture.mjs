/**
 * CT-22 Path A — M153a residual comment attachment preview · #/lab/feed stands.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / MIME / HTTP.
 *
 * Env: CT22_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-22-comment-attachment-preview/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT22_BASE || 'http://127.0.0.1:5173'

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
await page.waitForSelector('[data-testid="feed-lab-ct22-stands"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)

async function shotStand(standId, file) {
  const sel = `[data-testid="feed-lab-ct22-stand-${standId}"]`
  await page.waitForSelector(sel, { timeout: 10000 })
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ block: 'center' })
  }, sel)
  await sleep(200)
  const el = await page.$(sel)
  if (!el) {
    fails.push(`missing ${standId}`)
    return
  }
  await capture(file, el)
}

await shotStand('A-image-local', '01-image-local-node.png')
await shotStand('B-image-published', '02-image-published-node.png')
await shotStand('C-markdown', '03-markdown-cue.png')
await shotStand('D-pdf-cue', '04-pdf-cue.png')
await shotStand('E-denied-omit', '05-denied-omit.png')
await shotStand('G-narrow', '06-narrow-local.png')

/* F · Attach+Post full cycle */
{
  const standSel = '[data-testid="feed-lab-ct22-stand-F-composer-post"]'
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ block: 'center' })
  }, standSel)
  await sleep(200)
  const entry = await page.$(`${standSel} [data-testid="tm-empty-entry"], ${standSel} button`)
  if (entry) {
    await entry.click()
    await sleep(300)
  }
  await page.waitForSelector(`${standSel} [data-testid="tm-composer-file-input"]`, {
    timeout: 10000,
  })
  const tmpImg = path.join(outDir, '_tmp-ct22.png')
  writeFileSync(
    tmpImg,
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    ),
  )
  const fileInput = await page.$(`${standSel} [data-testid="tm-composer-file-input"]`)
  await fileInput.uploadFile(tmpImg)
  await sleep(350)
  await page.type(`${standSel} textarea, ${standSel} [data-testid="tm-composer-input"]`, 'CT-22 post with image', {
    delay: 5,
  })
  await page.click(`${standSel} [data-testid="tm-composer-post"]`)
  await sleep(600)
  const posted = await page.evaluate((s) => {
    const root = document.querySelector(s)
    const nodeAttach = root?.querySelector('[data-testid="tm-comment-attachments"]')
    const img = root?.querySelector('[data-tm-attach-kind="image"]')
    const local = img?.getAttribute('data-tm-attach-local')
    const honesty = root?.textContent?.includes('Local preview · not published')
    const chipGone = !root?.querySelector('[data-tm-attach-status="ready"]')
    return {
      hasNode: Boolean(nodeAttach),
      local,
      honesty,
      chipGone,
      body: root?.textContent?.includes('CT-22 post with image'),
    }
  }, standSel)
  console.log('07-post-cycle', JSON.stringify(posted))
  if (!posted.hasNode || !posted.body) fails.push(`07 post ${JSON.stringify(posted)}`)
  if (posted.local !== 'true') fails.push(`07 local ${posted.local}`)
  if (!posted.honesty) fails.push('07 honesty')
  const el = await page.$(standSel)
  await capture('07-attach-post-node.png', el)
}

/* E assertions */
{
  const m = await page.evaluate(() => {
    const e = document.querySelector('[data-testid="feed-lab-ct22-stand-E-denied-omit"]')
    return {
      denied: Boolean(e?.querySelector('[data-testid="tm-comment-attach-ct22-att-denied"]')),
      ready: Boolean(e?.querySelector('[data-testid="tm-comment-attach-ct22-att-ready-only"]')),
      md: Boolean(e?.querySelector('[data-tm-attach-kind="markdown"]')),
    }
  })
  console.log('E-assert', JSON.stringify(m))
  if (m.denied) fails.push('E denied visible')
  if (!m.ready || !m.md) fails.push(`E ready/md ${JSON.stringify(m)}`)
}

/* A local assert */
{
  const m = await page.evaluate(() => {
    const a = document.querySelector('[data-testid="feed-lab-ct22-stand-A-image-local"]')
    const img = a?.querySelector('[data-tm-attach-kind="image"]')
    return {
      local: img?.getAttribute('data-tm-attach-local'),
      honesty: a?.textContent?.includes('Local preview · not published'),
      src: img?.querySelector('img')?.getAttribute('src')?.slice(0, 12) || '',
    }
  })
  console.log('A-assert', JSON.stringify(m))
  if (m.local !== 'true') fails.push(`A local ${m.local}`)
  if (!m.honesty) fails.push('A honesty')
  if (!m.src.startsWith('blob:')) fails.push(`A src ${m.src}`)
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-22-comment-attachment-preview',
      ui_gate: 'auto',
      path: 'A',
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

await browser.close()
if (fails.length) {
  console.error('FAILS', fails)
  process.exit(1)
}
console.log('CT22 capture OK · shots', md5s.length, '· gate stays BLOCK (OP eye Absent)')
