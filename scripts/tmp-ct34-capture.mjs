/**
 * CT-34 Path A — comment attach preview residual (local objectURL + published).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / CDN / policy B.
 *
 * Env: CT34_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-34-comment-attach-preview-residual',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT34_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []
const probes = {}

async function capture(file, el) {
  const dest = path.join(outDir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
  copyFileSync(dest, path.join(storyShotDir, file))
}

await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 })

await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct22-stand-A-image-local"]', {
  timeout: 15000,
})
await sleep(500)

probes.local = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct22-stand-A-image-local"]')
  const fig = stand?.querySelector('[data-tm-attach-kind="image"]')
  const img = fig?.querySelector('img')
  const list = stand?.querySelector('[data-testid="tm-comment-attachments"]')
  const textPlate = Boolean(
    stand &&
      [...stand.querySelectorAll('.tm-comment-attach__cue-label')].some(
        (el) => el.textContent?.trim() === 'Selected image',
      ) &&
      !img,
  )
  return {
    ct34: list?.getAttribute('data-lab-ct34'),
    hasImg: Boolean(img),
    imgSrc: img?.getAttribute('src') || null,
    local: fig?.getAttribute('data-tm-attach-local'),
    textPlateOnly: textPlate,
  }
})
console.log('localProbe', JSON.stringify(probes.local))
if (probes.local.ct34 !== 'true') fails.push(`local ct34=${probes.local.ct34}`)
if (!probes.local.hasImg) fails.push('local img Absent')
if (probes.local.textPlateOnly) fails.push('local text-only plate')
if (probes.local.local !== 'true') fails.push(`local flag=${probes.local.local}`)

{
  const el =
    (await page.$('[data-testid="feed-lab-ct22-stand-A-image-local"] [data-testid="tm-comment-body"]')) ||
    (await page.$('[data-testid="feed-lab-ct22-stand-A-image-local"]'))
  await capture('01-local-objecturl-preview-1536x1024.png', el)
}

probes.published = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct22-stand-B-image-published"]')
  const fig = stand?.querySelector('[data-tm-attach-kind="image"]')
  const img = fig?.querySelector('img')
  const textPlate = Boolean(
    stand &&
      [...stand.querySelectorAll('.tm-comment-attach__cue-label')].some(
        (el) => el.textContent?.trim() === 'Selected image',
      ) &&
      !img,
  )
  return {
    hasImg: Boolean(img),
    imgSrc: img?.getAttribute('src') || null,
    local: fig?.getAttribute('data-tm-attach-local'),
    textPlateOnly: textPlate,
  }
})
console.log('publishedProbe', JSON.stringify(probes.published))
if (!probes.published.hasImg) fails.push('published img Absent')
if (probes.published.textPlateOnly) fails.push('published text-only plate')
if (probes.published.local === 'true') fails.push('published marked local')

{
  const el =
    (await page.$(
      '[data-testid="feed-lab-ct22-stand-B-image-published"] [data-testid="tm-comment-body"]',
    )) || (await page.$('[data-testid="feed-lab-ct22-stand-B-image-published"]'))
  await capture('02-published-preview-1536x1024.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(200)
{
  const el =
    (await page.$('[data-testid="feed-lab-ct22-stand-G-narrow"] [data-testid="tm-comment-body"]')) ||
    (await page.$('[data-testid="feed-lab-ct22-stand-G-narrow"]')) ||
    (await page.$('[data-testid="feed-lab-ct22-stand-A-image-local"]'))
  await capture('03-narrow-local-390x844.png', el)
}

await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
await sleep(300)
{
  const el =
    (await page.$('[data-testid="feed-lab-ct22-stand-A-image-local"] [data-testid="tm-comment-body"]')) ||
    (await page.$('[data-testid="feed-lab-ct22-stand-A-image-local"]'))
  await capture('04-local-dark-1536x1024.png', el)
}

await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(200)
{
  const el =
    (await page.$('[data-testid="feed-lab-ct22-stands"]')) ||
    (await page.$('[data-testid="feed-lab-page"]'))
  await capture('05-ct22-stands-overview-1536x1024.png', el)
}

/* post-implement baseline alias */
for (const f of md5s.map((m) => m.file)) {
  copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      story: 'STORY-SPA-CT-34-comment-attach-preview-residual',
      pkg: 'pkg-000227',
      visual_gate: 'BLOCK',
      op_eye: 'Absent',
      policy: 'A',
      probes,
      md5s,
      fails,
      note: 'Path A structure · local+published img · Partial BLOCK · no invent OP PASS / CDN / policy B',
    },
    null,
    2,
  ),
)
writeFileSync(
  path.join(outDir, 'README.md'),
  `# CT-34 full-cycle captures\n\nPath A · M11 residual · OP eye Absent → Partial=**BLOCK** · no invent PASS.\n\nFails: ${fails.length ? fails.join(', ') : '(none structure)'}\n`,
)

await browser.close()
if (fails.length) {
  console.error('CAPTURE_FAILS', fails)
  process.exit(1)
}
console.log('CAPTURE_OK', md5s.map((m) => m.prefix).join(' · '))
