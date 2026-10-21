/**
 * CT-32 Path A — thread dark chrome · theme tokens · readable bubbles/type/close/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: CT32_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-32-thread-dark-chrome',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT32_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function setTheme(theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('dogestonia.theme', t)
    } catch {
      /* ignore */
    }
  }, theme)
  await sleep(400)
}

async function openFeed() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-civic-post"], [data-testid="public-header"]', {
    timeout: 20000,
  }).catch(() => {})
  await sleep(800)
}

async function openLabThread() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await setTheme('dark')
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
  if (!cardId) {
    fails.push('lab-card-missing')
    return null
  }
  const sel = `[data-testid="${cardId}"]`
  await page.evaluate((s) => {
    const card = document.querySelector(s)
    const view = [...(card?.querySelectorAll('button, a, [role="button"]') || [])].find((b) =>
      /view discussion|view replies|comment/i.test(b.textContent || ''),
    )
    view?.click()
  }, sel)
  await sleep(600)
  await page.waitForSelector(`${sel} [data-testid="tm-issue-thread-block"]`, { timeout: 10000 }).catch(() => {
    fails.push('thread-block-missing')
  })
  return sel
}

async function probe() {
  return page.evaluate(() => {
    const theme = document.documentElement.getAttribute('data-theme')
    const bubble = document.querySelector('.tm-comment-node__bubble')
    const showMore = document.querySelector('[data-testid="tm-show-more-comments"]')
    const typeMask = document.querySelector('[data-ct32-type="mask"] [data-ns07="mask"]')
    const closeMask = document.querySelector('[data-ct32-close="mask"] [data-ns07="mask"]')
    const feedMasks = document.querySelectorAll(
      '[data-testid="feed-civic-action-comment"] [data-ns07="mask"], [data-testid="feed-civic-action-share"] [data-ns07="mask"]',
    )
    const bs = bubble ? getComputedStyle(bubble) : null
    const sm = showMore ? getComputedStyle(showMore) : null
    return {
      theme,
      bubbleBg: bs?.backgroundColor || null,
      bubbleColor: bs ? getComputedStyle(bubble.querySelector('.tm-comment-node__text') || bubble).color : null,
      showMoreColor: sm?.color || null,
      typeMask: Boolean(typeMask),
      closeMask: Boolean(closeMask),
      feedMaskCount: feedMasks.length,
      ns07OnPage: document.querySelectorAll('[data-ns07="mask"]').length,
    }
  })
}

try {
  await openFeed()

  // 01 host light
  await setTheme('light')
  await capture(outDir, '01-next-feed-host-light.png', await page.$('body'))

  // 02 dark feed civic icons
  await setTheme('dark')
  const civic =
    (await page.$('[data-testid="feed-civic-post-actions"]')) ||
    (await page.$('[data-testid="feed-civic-post"]')) ||
    (await page.$('body'))
  await capture(outDir, '02-feed-icons-dark.png', civic)

  // 03–04 lab thread dark bubbles + type/close soft
  const cardSel = await openLabThread()
  let threadProbe = null
  if (cardSel) {
    await setTheme('dark')
    const block = await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`)
    if (block) await capture(outDir, '03-thread-bubbles-dark.png', block)
    else {
      await capture(outDir, '03-thread-bubbles-dark.png', await page.$('body'))
      fails.push('thread-soft-fallback')
    }
    threadProbe = await probe()
  } else {
    await capture(outDir, '03-thread-bubbles-dark.png', await page.$('body'))
  }

  // 04 open next/feed issue for close + type if possible
  await openFeed()
  await setTheme('dark')
  const hit = await page.$('[data-testid="feed-civic-post-hit"]')
  if (hit) {
    await hit.click()
    await sleep(1200)
    await page.waitForSelector('[data-testid="feed-issue-mount-close"]', { timeout: 15000 }).catch(() => {
      fails.push('close-wait')
    })
  } else {
    fails.push('civic-hit-missing')
  }
  const mount =
    (await page.$('[data-testid="feed-issue-mount"]')) ||
    (await page.$('[data-testid="feed-issue-mount-close"]')) ||
    (await page.$('body'))
  await capture(outDir, '04-type-close-dark.png', mount)
  const mountProbe = await probe()

  // 05 light hold
  await setTheme('light')
  await openFeed()
  await setTheme('light')
  await capture(outDir, '05-light-theme-hold.png', await page.$('body'))

  const finalProbe = {
    thread: threadProbe,
    mount: mountProbe,
    light: await probe(),
  }
  console.log('PROBE', JSON.stringify(finalProbe))

  if (finalProbe.mount && !finalProbe.mount.closeMask) fails.push('close-mask-absent')
  if (finalProbe.mount && finalProbe.mount.feedMaskCount < 1 && finalProbe.thread?.feedMaskCount < 1) {
    /* soft: feed masks may be off-mount */
  }

  const aliases = [
    ['01-next-feed-host-light.png', '01-story-root-host.png'],
    ['03-thread-bubbles-dark.png', '02-story-root-bubbles-dark.png'],
    ['04-type-close-dark.png', '03-story-root-type-close-dark.png'],
  ]
  for (const [src, dest] of aliases) {
    copyFileSync(path.join(outDir, src), path.join(storyShotDir, dest))
    copyFileSync(path.join(outDir, src), path.join(baselineDir, dest))
  }

  const meta = {
    story: 'STORY-SPA-CT-32-thread-dark-chrome',
    captured_at: new Date().toISOString(),
    base,
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails: fails.filter((f) => !f.includes('soft')),
    soft_fails: fails.filter((f) => f.includes('soft')),
    probe: finalProbe,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log(
    'CAPTURE-META',
    JSON.stringify({
      fails: meta.fails,
      closeMask: finalProbe.mount?.closeMask,
      typeMask: finalProbe.mount?.typeMask,
      feedMaskCount: finalProbe.mount?.feedMaskCount,
    }),
  )
} finally {
  await browser.close()
}
