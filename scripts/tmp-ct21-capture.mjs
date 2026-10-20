/**
 * CT-21 Path A — M152c A–E · preview budget · Show more · no heading · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP.
 *
 * Env: CT21_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-21-preview-node-budget-default-expanded/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT21_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1536, height: 3200, deviceScaleFactor: 1 })
await page.goto('about:blank')
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct21-stands"]', { timeout: 10000 })
await sleep(300)

/* hide CT-08/CT-20 for cleaner CT-21 crops */
await page.evaluate(() => {
  document.querySelectorAll('[data-testid="feed-lab-ct08-stands"], [data-testid="feed-lab-ct20-stands"]').forEach((n) => {
    n.style.display = 'none'
  })
})

/* 01 A within budget */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct21-stand-A-within"]')
    const tree = stand?.querySelector('[data-testid="tm-comment-tree"]')
    const mount = stand?.querySelector('[data-testid="tm-thread-mount"]')
    return {
      expanded: mount?.getAttribute('data-tm-expanded'),
      truncated: tree?.getAttribute('data-tm-preview-truncated'),
      budget: tree?.getAttribute('data-tm-preview-budget'),
      showMore: Boolean(stand?.querySelector('[data-testid="tm-show-more-comments"]')),
      heading: Boolean(stand?.querySelector('[data-testid="tm-thread-heading"]')),
    }
  })
  console.log('01-A', JSON.stringify(snap))
  if (
    snap.expanded !== 'true' ||
    snap.truncated !== 'false' ||
    snap.budget !== '3' ||
    snap.showMore ||
    snap.heading
  ) {
    fails.push(`01 A ${JSON.stringify(snap)}`)
  }
  const stand = await page.$('[data-testid="feed-lab-ct21-stand-A-within"]')
  await capture('01-within-budget.png', stand)
}

/* 02 B truncated */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct21-stand-B-trunc"]')
    const tree = stand?.querySelector('[data-testid="tm-comment-tree"]')
    const more = stand?.querySelector('[data-testid="tm-show-more-comments"]')
    return {
      truncated: tree?.getAttribute('data-tm-preview-truncated'),
      copy: more?.textContent?.trim(),
      heading: Boolean(stand?.querySelector('[data-testid="tm-thread-heading"]')),
      b3: Boolean(stand?.querySelector('[data-testid="tm-comment-node-ct21-b3"]')),
    }
  })
  console.log('02-B', JSON.stringify(snap))
  if (
    snap.truncated !== 'true' ||
    snap.copy !== 'Show more comments' ||
    snap.heading ||
    snap.b3
  ) {
    fails.push(`02 B ${JSON.stringify(snap)}`)
  }
  const stand = await page.$('[data-testid="feed-lab-ct21-stand-B-trunc"]')
  await capture('02-truncated-show-more.png', stand)
}

/* 03 C after show more */
{
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="feed-lab-ct21-stand-C-reveal"] [data-testid="tm-show-more-comments"]')
      ?.click()
  })
  await sleep(200)
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct21-stand-C-reveal"]')
    const tree = stand?.querySelector('[data-testid="tm-comment-tree"]')
    return {
      truncated: tree?.getAttribute('data-tm-preview-truncated'),
      showMore: Boolean(stand?.querySelector('[data-testid="tm-show-more-comments"]')),
      b4: Boolean(stand?.querySelector('[data-testid="tm-comment-node-ct21-b4"]')),
    }
  })
  console.log('03-C', JSON.stringify(snap))
  if (snap.truncated !== 'false' || snap.showMore || !snap.b4) {
    fails.push(`03 C ${JSON.stringify(snap)}`)
  }
  const stand = await page.$('[data-testid="feed-lab-ct21-stand-C-reveal"]')
  await capture('03-after-show-more.png', stand)
}

/* 04 D empty · no heading */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct21-stand-D-empty"]')
    return {
      empty: Boolean(stand?.querySelector('[data-testid="tm-thread-empty"]')),
      heading: Boolean(stand?.querySelector('[data-testid="tm-thread-heading"]')),
    }
  })
  console.log('04-D', JSON.stringify(snap))
  if (!snap.empty || snap.heading) fails.push(`04 D ${JSON.stringify(snap)}`)
  const stand = await page.$('[data-testid="feed-lab-ct21-stand-D-empty"]')
  await capture('04-empty-no-heading.png', stand)
}

/* 05 E narrow truncate */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct21-stand-E-narrow"]')
    const host = stand?.querySelector('[data-testid="feed-lab-thread-mount"]')
    const tree = stand?.querySelector('[data-testid="tm-comment-tree"]')
    return {
      narrow: host?.getAttribute('data-lab-narrow'),
      truncated: tree?.getAttribute('data-tm-preview-truncated'),
      showMore: Boolean(stand?.querySelector('[data-testid="tm-show-more-comments"]')),
      heading: Boolean(stand?.querySelector('[data-testid="tm-thread-heading"]')),
    }
  })
  console.log('05-E', JSON.stringify(snap))
  if (
    snap.narrow !== 'true' ||
    snap.truncated !== 'true' ||
    !snap.showMore ||
    snap.heading
  ) {
    fails.push(`05 E ${JSON.stringify(snap)}`)
  }
  const stand = await page.$('[data-testid="feed-lab-ct21-stand-E-narrow"]')
  await capture('05-narrow-truncate.png', stand)
}

const readme = `# Screenshots — CT-21 preview node budget (Path A)

> P3 capture · \`#/lab/feed\` · Partial=**BLOCK** until OP eye · no invent OP PASS

| ID | File | Claim | md5 prefix |
|----|------|-------|------------|
${md5s.map((m, i) => `| 0${i + 1} | \`${m.file}\` | M152c | \`${m.prefix}\` |`).join('\n')}

No invent OP PASS · no invent HTTP · NO BRIEF.
`

writeFileSync(path.join(outDir, 'README.md'), readme)
writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      utc: new Date().toISOString(),
      story: 'STORY-SPA-CT-21-preview-node-budget-default-expanded',
      partialVisual: 'BLOCK',
      opEye: 'Absent',
      fails,
      md5s,
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
console.log('CT-21 capture PASS · Partial=BLOCK · OP Absent')
