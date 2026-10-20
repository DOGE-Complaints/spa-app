/**
 * CT-20 Path A — LAB-1…4 residual stands + dual-append + picker · #/lab/feed.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / HTTP.
 *
 * Env: CT20_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-20-lab-audit-fixtures/screenshots/full-cycle',
)
mkdirSync(outDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT20_BASE || 'http://127.0.0.1:5173'

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

await page.setViewport({ width: 1536, height: 2800, deviceScaleFactor: 1 })
await page.goto('about:blank')
await page.goto(`${base}/#/lab/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
await page.waitForSelector('[data-testid="feed-lab-ct20-stands"]', { timeout: 10000 })
await sleep(300)

/* hide CT-08 for cleaner CT-20 crops */
await page.evaluate(() => {
  document.querySelectorAll('[data-lab-ct08-stand]').forEach((n) => {
    n.style.display = 'none'
  })
})

/* 01 LAB-1 loading/empty/unavailable */
{
  const snap = await page.evaluate(() => {
    const statuses = ['LAB1-load', 'LAB1-empty', 'LAB1-unavail'].map((id) => {
      const stand = document.querySelector(`[data-testid="feed-lab-ct20-stand-${id}"]`)
      const host = stand?.querySelector('[data-testid="feed-lab-thread-mount"]')
      return { id, status: host?.getAttribute('data-lab-thread-status') }
    })
    return statuses
  })
  console.log('01-lab1', JSON.stringify(snap))
  const expectMap = {
    'LAB1-load': 'loading',
    'LAB1-empty': 'empty',
    'LAB1-unavail': 'unavailable',
  }
  for (const row of snap) {
    if (row.status !== expectMap[row.id]) fails.push(`01 ${row.id}=${row.status}`)
  }
  const section = await page.$('[data-testid="feed-lab-ct20-stands"]')
  await capture('01-lab1-status-stands.png', section)
}

/* 02 LAB-2 forcePostFail */
{
  const stand = await page.$('[data-testid="feed-lab-ct20-stand-LAB2-fail"]')
  const hostFail = await page.evaluate(() => {
    const standEl = document.querySelector('[data-testid="feed-lab-ct20-stand-LAB2-fail"]')
    return standEl
      ?.querySelector('[data-testid="feed-lab-thread-mount"]')
      ?.getAttribute('data-lab-force-post-fail')
  })
  if (hostFail !== 'true') fails.push(`02 forcePostFail=${hostFail}`)
  await capture('02-lab2-force-post-fail.png', stand)
}

/* 03 LAB-3 attach-off */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct20-stand-LAB3-attach-off"]')
    return {
      avail: stand
        ?.querySelector('[data-testid="feed-lab-thread-mount"]')
        ?.getAttribute('data-lab-attachments-available'),
      attach: Boolean(stand?.querySelector('[data-testid="tm-composer-attach"]')),
      file: Boolean(stand?.querySelector('[data-testid="tm-composer-file-input"]')),
    }
  })
  console.log('03-lab3', JSON.stringify(snap))
  if (snap.avail !== 'false' || snap.attach || snap.file) fails.push(`03 attach-off ${JSON.stringify(snap)}`)
  const stand = await page.$('[data-testid="feed-lab-ct20-stand-LAB3-attach-off"]')
  await capture('03-lab3-attach-off.png', stand)
}

/* 04 LAB-4 maxDepth Reply block */
{
  const snap = await page.evaluate(() => {
    const stand = document.querySelector('[data-testid="feed-lab-ct20-stand-LAB4-maxdepth"]')
    const deep = stand?.querySelector('[data-testid="tm-comment-node-ct20-t-a1a"]')
    const mid = stand?.querySelector('[data-testid="tm-comment-node-ct20-t-a1"]')
    return {
      maxDepth: stand
        ?.querySelector('[data-testid="tm-thread-mount"]')
        ?.getAttribute('data-tm-max-depth'),
      deepReply: Boolean(deep?.querySelector('[data-testid="tm-comment-reply"]')),
      midReply: Boolean(mid?.querySelector('[data-testid="tm-comment-reply"]')),
      deepDepth: deep?.getAttribute('data-tm-depth'),
    }
  })
  console.log('04-lab4', JSON.stringify(snap))
  if (snap.maxDepth !== '2' || snap.deepReply || !snap.midReply || snap.deepDepth !== '2') {
    fails.push(`04 maxDepth ${JSON.stringify(snap)}`)
  }
  const stand = await page.$('[data-testid="feed-lab-ct20-stand-LAB4-maxdepth"]')
  await capture('04-lab4-maxdepth-reply-block.png', stand)
}

/* 05 harness dual-append + picker on greenfield card */
{
  await page.evaluate(() => {
    document.querySelectorAll('[data-lab-ct20-stand]').forEach((n) => {
      n.style.display = 'none'
    })
  })
  await sleep(200)
  const cardId = await page.evaluate(() => {
    const gf = document.querySelector('[data-testid="feed-lab-greenfield-section"]')
    const card = [...(gf?.querySelectorAll('[data-testid^="feed-post-card-"]') || [])].find((c) =>
      /002/.test(c.getAttribute('data-public-id') || ''),
    )
    return card?.getAttribute('data-testid') || null
  })
  if (!cardId) fails.push('05 no nest card 002')
  else {
    const sel = `[data-testid="${cardId}"]`
    await page.evaluate((s) => {
      const card = document.querySelector(s)
      const view = [...(card?.querySelectorAll('button, a, [role="button"]') || [])].find((b) =>
        /view discussion|view replies|comment/i.test(b.textContent || ''),
      )
      view?.click()
    }, sel)
    await sleep(600)
    await page.waitForSelector(`${sel} [data-testid="tm-thread-composer"]`, { timeout: 10000 })

    const picker = await page.evaluate((s) => {
      const card = document.querySelector(s)
      const composer = card?.querySelector('[data-testid="tm-thread-composer"]')
      return {
        chips: composer?.querySelectorAll('[data-tm-attach-status]')?.length || 0,
        file: Boolean(composer?.querySelector('[data-testid="tm-composer-file-input"]')),
        attach: Boolean(composer?.querySelector('[data-testid="tm-composer-attach"]')),
        fileType: composer
          ?.querySelector('[data-testid="tm-composer-file-input"]')
          ?.getAttribute('type'),
      }
    }, sel)
    console.log('05-picker', JSON.stringify(picker))
    if (picker.chips !== 0 || !picker.file || !picker.attach || picker.fileType !== 'file') {
      fails.push(`05 picker ${JSON.stringify(picker)}`)
    }

    /* reply post unique ids */
    await page.evaluate((s) => {
      const card = document.querySelector(s)
      const reply = card?.querySelector('[data-testid="tm-comment-reply"]')
      reply?.click()
    }, sel)
    await sleep(300)
    await page.evaluate((s) => {
      const card = document.querySelector(s)
      const ta = card?.querySelector('[data-testid="tm-thread-composer"] textarea, [data-testid="tm-thread-composer"] [contenteditable]')
      if (ta) {
        if (ta.tagName === 'TEXTAREA' || ta.tagName === 'INPUT') {
          ta.value = 'CT-20 dual-append reply assert'
          ta.dispatchEvent(new Event('input', { bubbles: true }))
        } else {
          ta.textContent = 'CT-20 dual-append reply assert'
          ta.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
    }, sel)
    await sleep(100)
    await page.evaluate((s) => {
      document.querySelector(`${s} [data-testid="tm-composer-post"]`)?.click()
    }, sel)
    await sleep(500)

    const treeSnap = await page.evaluate((s) => {
      const card = document.querySelector(s)
      const tree = card?.querySelector('[data-testid="tm-comment-tree"]')
      const ids = [...(card?.querySelectorAll('[data-testid^="tm-comment-node-"]') || [])].map(
        (n) => n.getAttribute('data-testid'),
      )
      const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
      return {
        owner: card
          ?.querySelector('[data-testid="tm-thread-mount"]')
          ?.getAttribute('data-tm-comment-write-owner'),
        forest: tree?.getAttribute('data-tm-forest'),
        fallback: tree?.getAttribute('data-tm-fallback-reason'),
        dup: [...new Set(dup)],
      }
    }, sel)
    console.log('05-dual', JSON.stringify(treeSnap))
    if (
      treeSnap.dup.length ||
      treeSnap.forest === 'flat' ||
      treeSnap.fallback === 'duplicate-id' ||
      treeSnap.owner !== 'host'
    ) {
      fails.push(`05 dual-append ${JSON.stringify(treeSnap)}`)
    }

    const card = await page.$(sel)
    await capture('05-harness-dual-append-picker.png', card)
  }
}

writeFileSync(
  path.join(outDir, 'CAPTURE-META.json'),
  JSON.stringify(
    {
      utc: new Date().toISOString(),
      story: 'STORY-SPA-CT-20-lab-audit-fixtures',
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
console.log('CT-20 capture PASS · Partial=BLOCK · OP Absent')
