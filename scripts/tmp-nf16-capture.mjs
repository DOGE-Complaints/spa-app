/**
 * NF-16 Path A — More (⋮) deferred · feed-civic-post-more Absent.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · keep more.svg.
 *
 * Env: NF16_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-16-more-menu-deferred',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NF16_BASE || process.env.NF15_BASE || 'http://127.0.0.1:5173'
const moreAsset = path.resolve(__dirname, '../public/icons/next-feed/actions/more.svg')

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

if (!existsSync(moreAsset)) fails.push('more.svg missing on disk')

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await sleep(400)
{
  const el = (await page.$('main')) || (await page.$('body'))
  await capture(baselineDir, 'ui0-next-feed-host.png', el)
  await capture(outDir, '01-next-feed-host.png', el)
}

const listProbe = await page.evaluate(() => {
  const posts = document.querySelectorAll('[data-testid="feed-civic-post"]')
  const moreCount = document.querySelectorAll('[data-testid="feed-civic-post-more"]').length
  return { postCount: posts.length, moreCount }
})
console.log('listProbe', JSON.stringify(listProbe))
if (listProbe.moreCount !== 0) fails.push(`list moreCount=${listProbe.moreCount}`)

{
  const el =
    (await page.$('[data-testid="feed-civic-post"]')) ||
    (await page.$('main')) ||
    (await page.$('body'))
  await capture(outDir, '02-more-absent-list.png', el)
}

const detailLink = await page.$('[data-testid="feed-civic-post-hit"]')
if (detailLink) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }).catch(() => null),
    detailLink.click(),
  ])
  await sleep(500)
} else {
  await page.goto(`${base}/#/next/feed/issue/NF16-PATH-A`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  })
  await sleep(400)
}

const detailProbe = await page.evaluate(() => {
  const moreCount = document.querySelectorAll('[data-testid="feed-civic-post-more"]').length
  const post = document.querySelector('[data-testid="feed-civic-post"]')
  return {
    moreCount,
    hit: post?.getAttribute('data-civic-hit') || null,
    hasPost: Boolean(post),
  }
})
console.log('detailProbe', JSON.stringify(detailProbe))
if (detailProbe.moreCount !== 0) fails.push(`detail moreCount=${detailProbe.moreCount}`)

{
  const el =
    (await page.$('[data-testid="feed-civic-post"]')) ||
    (await page.$('main')) ||
    (await page.$('body'))
  await capture(outDir, '03-more-absent-detail.png', el)
}
{
  const el =
    (await page.$('[data-testid="issue-identity-header"]')) ||
    (await page.$('[data-testid="feed-civic-post"]')) ||
    (await page.$('main'))
  await capture(outDir, '04-header-no-more.png', el)
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await sleep(300)
{
  const el =
    (await page.$('[data-testid="feed-civic-post"]')) ||
    (await page.$('main')) ||
    (await page.$('body'))
  await capture(outDir, '05-narrow-no-more.png', el)
}

const meta = {
  story: 'STORY-SPA-NF-16-more-menu-deferred',
  captured_at: new Date().toISOString(),
  base,
  visual_gate: 'BLOCK',
  path_a: 'code_lock',
  more_asset_present: existsSync(moreAsset),
  listProbe,
  detailProbe,
  fails,
  shots: md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify({ fails, count: md5s.length }))
await browser.close()
if (fails.length) process.exit(1)
