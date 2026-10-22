/**
 * CR-25 Path A — reaction selected hydrate persist (post + comment + anon).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / people API / gateway.
 *
 * Env: CR25_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-25-reaction-selected-hydrate-persist',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CR25_BASE || process.env.CR24_BASE || 'http://127.0.0.1:5173'

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

async function openLabStand() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
  await page.waitForSelector('[data-testid="feed-lab-ct23-stand"]', { timeout: 15000 })
  await page.waitForSelector(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-reactions-mount"]',
    { timeout: 15000 },
  )
  await sleep(800)
}

await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })

await openLabStand()

/* wait hydrate from tree lift */
await page.waitForFunction(
  () => {
    const strip = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
    )
    return strip && strip.getAttribute('data-feed-cr25-selected-count') === '1'
  },
  { timeout: 15000 },
)

const probe = await page.evaluate(() => {
  const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
  const stripRm = stand?.querySelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
  )
  const thread = stand?.querySelector('[data-testid="feed-thread-mount"]')
  const commentRm = stand?.querySelector(
    '[data-testid="feed-lab-ct23-thread"] [data-feed-reaction-target="comment"]',
  )
  const ownAck = stand?.querySelector('[data-testid="reaction-summary-own-acknowledge"]')
  const ownAgree = stand?.querySelector('[data-testid="reaction-summary-own-agree"]')
  const countEl = stand?.querySelector(
    '[data-testid="feed-civic-post-actions"] [data-testid="reaction-summary-count"]',
  )
  return {
    labCr25: stand?.getAttribute('data-lab-cr25'),
    stripCr25: stripRm?.getAttribute('data-feed-cr25'),
    stripCount: stripRm?.getAttribute('data-feed-cr25-selected-count'),
    threadCr25: thread?.getAttribute('data-feed-cr25'),
    threadRootCount: thread?.getAttribute('data-feed-cr25-root-selected-count'),
    commentCount: commentRm?.getAttribute('data-feed-cr25-selected-count'),
    ownAck: Boolean(ownAck),
    ownAgree: Boolean(ownAgree),
    summaryCountText: countEl?.textContent?.trim() || null,
  }
})
console.log('probe', JSON.stringify(probe))
if (probe.labCr25 !== 'true') fails.push(`labCr25=${probe.labCr25}`)
if (probe.stripCr25 !== 'true') fails.push(`stripCr25=${probe.stripCr25}`)
if (probe.stripCount !== '1') fails.push(`stripCount=${probe.stripCount}`)
if (!probe.ownAck) fails.push('post own acknowledge Absent')
if (probe.commentCount !== '1') fails.push(`commentCount=${probe.commentCount}`)
if (!probe.ownAgree) fails.push('comment own agree Absent')

{
  const el =
    (await page.$('[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]')) ||
    (await page.$('body'))
  await capture('01-post-selected-hydrate.png', el)
}

{
  const el =
    (await page.$('[data-testid="feed-lab-ct23-thread"]')) ||
    (await page.$('[data-testid="feed-thread-mount"]')) ||
    (await page.$('body'))
  await capture('02-comment-selected-hydrate.png', el)
}

{
  const el =
    (await page.$('[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]')) ||
    (await page.$('body'))
  await capture('03-summary-marks-hydrate.png', el)
}

/* PUT then reload path — click React → toggle agree (optimistic) → tree rehydrate */
{
  await page.evaluate(() => {
    document
      .querySelector(
        '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="reaction-summary-react"]',
      )
      ?.scrollIntoView({ block: 'center' })
  })
  await sleep(200)
  const react = await page.$(
    '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="reaction-summary-react"]',
  )
  if (react) {
    await react.click({ delay: 20 })
    await sleep(400)
  } else {
    fails.push('react strip Absent')
  }
  const optionClicked = await page.evaluate(() => {
    const opt = document.querySelector('[data-testid="rm-picker-option-agree"]')
    if (!opt) return false
    opt.click()
    return true
  })
  if (!optionClicked) fails.push('picker option agree Absent')
  await sleep(700)
  const afterWrite = await page.evaluate(() => {
    const stripRm = document.querySelector(
      '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
    )
    return {
      count: stripRm?.getAttribute('data-feed-cr25-selected-count'),
      hasAgree: Boolean(
        document.querySelector(
          '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="reaction-summary-own-agree"]',
        ),
      ),
      hasAck: Boolean(
        document.querySelector(
          '[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"] [data-testid="reaction-summary-own-acknowledge"]',
        ),
      ),
    }
  })
  console.log('afterWrite', JSON.stringify(afterWrite))
  if (afterWrite.count !== '2') fails.push(`afterWrite count=${afterWrite.count}`)
  if (!afterWrite.hasAgree) fails.push('afterWrite agree Absent')
  const el =
    (await page.$('[data-testid="feed-lab-ct23-stand"] [data-testid="feed-civic-post-actions"]')) ||
    (await page.$('body'))
  await capture('04-put-then-reload.png', el)
}

/* Anonymous omit */
{
  const toggle = await page.$('[data-testid="feed-lab-cr25-toggle-anon"]')
  if (toggle) {
    await toggle.click()
    await sleep(900)
  } else {
    fails.push('anon toggle Absent')
  }
  const anonProbe = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct23-stand"]')
    const stripRm = stand?.querySelector(
      '[data-testid="feed-civic-post-actions"] [data-testid="feed-reactions-mount"]',
    )
    const commentRm = stand?.querySelector(
      '[data-testid="feed-lab-ct23-thread"] [data-feed-reaction-target="comment"]',
    )
    return {
      anon: stand?.getAttribute('data-lab-cr25-anon'),
      stripCount: stripRm?.getAttribute('data-feed-cr25-selected-count'),
      commentCount: commentRm?.getAttribute('data-feed-cr25-selected-count'),
      ownAck: Boolean(stand?.querySelector('[data-testid="reaction-summary-own-acknowledge"]')),
      ownAgree: Boolean(stand?.querySelector('[data-testid="reaction-summary-own-agree"]')),
    }
  })
  console.log('anonProbe', JSON.stringify(anonProbe))
  if (anonProbe.anon !== 'true') fails.push(`anon=${anonProbe.anon}`)
  if (anonProbe.stripCount !== '0') fails.push(`anon stripCount=${anonProbe.stripCount}`)
  if (anonProbe.ownAck || anonProbe.ownAgree) fails.push('anon own marks still Present')
  const el =
    (await page.$('[data-testid="feed-lab-ct23-stand"]')) || (await page.$('body'))
  await capture('05-anonymous-omit-selected.png', el)
}

const storyMap = [
  ['01-post-selected-hydrate.png', '01-story-root-post-hydrate.png'],
  ['02-comment-selected-hydrate.png', '02-story-root-comment-hydrate.png'],
  ['04-put-then-reload.png', '03-story-root-write-reload.png'],
]
for (const [src, dest] of storyMap) {
  try {
    copyFileSync(path.join(outDir, src), path.join(storyShotDir, dest))
  } catch (e) {
    fails.push(`story-root copy ${dest}: ${e.message}`)
  }
}

const meta = {
  story: 'STORY-SPA-CR-25-reaction-selected-hydrate-persist',
  captured_at: new Date().toISOString(),
  visual_gate: 'BLOCK',
  op_eye: 'Absent',
  partial_visual: 'BLOCK',
  invent_pass: false,
  invent_people_api: false,
  invent_gateway: false,
  fails,
  md5s,
}
writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
console.log('CAPTURE-META', JSON.stringify(meta, null, 2))
await browser.close()
if (fails.length) {
  console.error('CR25 capture fails', fails)
  process.exit(1)
}
console.log('CR25 capture ok · visual_gate BLOCK')
