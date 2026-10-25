/**
 * NF-26 Path A — Filters mobile scroll + body lock.
 * Evidence PNG + NF-25 M175 held · OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF26_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-26-filters-mobile-scroll-lock',
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
const base = process.env.NF26_BASE || 'http://127.0.0.1:5173'

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
  copyFileSync(dest, path.join(baselineDir, file))
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
  await sleep(300)
}

async function openFilterPanel() {
  await page.waitForSelector('.board-filter-panel-toggle', { timeout: 20000 })
  const open = await page.$('.board-filter-panel-body')
  if (!open) {
    await page.click('.board-filter-panel-toggle')
    await page.waitForSelector('.board-filter-panel-body', { visible: true, timeout: 10000 })
  }
  await sleep(400)
}

async function probePanel() {
  return page.evaluate(() => {
    const body = document.querySelector('.board-filter-panel-body')
    const scroll = document.querySelector('.board-filter-panel-scroll')
    const footer = document.querySelector('.board-filter-panel-footer')
    const nav = document.querySelector('[data-testid="mobile-bottom-nav"]')
    if (!body) return { present: false }
    const bodyStyle = getComputedStyle(body)
    const scrollStyle = scroll ? getComputedStyle(scroll) : null
    const bodyRect = body.getBoundingClientRect()
    const navRect = nav ? nav.getBoundingClientRect() : null
    const scrollH = scroll ? scroll.scrollHeight : 0
    const clientH = scroll ? scroll.clientHeight : 0
    return {
      present: true,
      lab25: body.getAttribute('data-lab-nf25'),
      harmony25: body.getAttribute('data-nf25-harmony'),
      lab26: body.getAttribute('data-lab-nf26'),
      harmony26: body.getAttribute('data-nf26-harmony'),
      scrollLab: scroll?.getAttribute('data-lab-nf26-scroll'),
      bodyLock: document.documentElement.getAttribute('data-nf26-body-lock'),
      bodyOverflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction,
      scrollOverflowY: scrollStyle?.overflowY || null,
      overscroll: scrollStyle?.overscrollBehavior || scrollStyle?.overscrollBehaviorY || null,
      touchPan: scrollStyle?.touchAction || null,
      bodyBottom: bodyStyle.bottom,
      bodyZ: bodyStyle.zIndex,
      bodyBottomPx: bodyRect.bottom,
      navTopPx: navRect ? navRect.top : null,
      clearsNav: navRect ? bodyRect.bottom <= navRect.top + 1 : null,
      canScroll: scrollH > clientH + 2 || clientH > 0,
      scrollHeight: scrollH,
      clientHeight: clientH,
      hasFooter: Boolean(footer),
      width: parseFloat(bodyStyle.width),
    }
  })
}

try {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector(
    '.board-filter-panel, [data-testid="feed-toolbar"], [data-testid="mobile-bottom-nav"]',
    { timeout: 30000 },
  )
  await sleep(600)
  await setTheme('light')
  await openFilterPanel()

  probes.mobile = await probePanel()
  if (!probes.mobile.present) fails.push('panel-absent')
  if (probes.mobile.lab26 !== 'true') fails.push('lab-nf26')
  if (probes.mobile.harmony26 !== 'scroll-lock') fails.push('harmony-nf26')
  if (probes.mobile.lab25 !== 'true') fails.push('lab-nf25-held')
  if (probes.mobile.harmony25 !== 'm175') fails.push('harmony-m175-held')
  if (probes.mobile.bodyLock !== 'true') fails.push('body-lock-attr')
  if (probes.mobile.bodyOverflow !== 'hidden') fails.push('body-overflow')
  if (probes.mobile.scrollOverflowY !== 'auto') fails.push('scroll-overflow')
  if (probes.mobile.clearsNav !== true) fails.push('sheet-over-nav')

  const body = await page.$('.board-filter-panel-body')
  if (body) {
    await capture('01-filters-mobile-sheet-scroll-390x844.png', body)
  } else {
    fails.push('no-body-shot')
  }

  const pageShot = path.join(outDir, '02-filters-mobile-page-with-nav-390x844.png')
  await page.screenshot({ path: pageShot, fullPage: false })
  {
    const md5 = createHash('md5').update(readFileSync(pageShot)).digest('hex')
    console.log(`02-filters-mobile-page-with-nav-390x844.png ${md5}`)
    md5s.push({ file: '02-filters-mobile-page-with-nav-390x844.png', md5, prefix: md5.slice(0, 12) })
    copyFileSync(pageShot, path.join(storyShotDir, '02-filters-mobile-page-with-nav-390x844.png'))
    copyFileSync(pageShot, path.join(baselineDir, '02-filters-mobile-page-with-nav-390x844.png'))
  }

  // close → lock cleared
  await page.click('.board-filter-panel-toggle')
  await sleep(300)
  probes.closed = await page.evaluate(() => ({
    bodyLock: document.documentElement.getAttribute('data-nf26-body-lock'),
    bodyOverflow: document.body.style.overflow,
    panelOpen: Boolean(document.querySelector('.board-filter-panel-body')),
  }))
  if (probes.closed.bodyLock != null) fails.push('lock-persist-after-close')
  if (probes.closed.panelOpen) fails.push('panel-still-open')

  await openFilterPanel()
  await setTheme('dark')
  probes.dark = await probePanel()
  const bodyDark = await page.$('.board-filter-panel-body')
  if (bodyDark) {
    await capture('03-filters-mobile-sheet-dark-390x844.png', bodyDark)
  }

  const meta = {
    story: 'STORY-SPA-NF-26-filters-mobile-scroll-lock',
    pkg: 'pkg-000233',
    gate: 'BLOCK',
    reason: 'OP eye Absent · Partial visual=BLOCK · structure probes only · no invent PASS · no invent filter keys',
    op_eye: 'Absent',
    harmony: 'scroll-lock',
    m175_held: true,
    fails,
    probes,
    md5s,
    utc: new Date().toISOString(),
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probes: { mobile: probes.mobile, closed: probes.closed } }))
  if (fails.length) {
    console.error('STRUCTURE_FAILS', fails)
    process.exitCode = 1
  } else {
    console.log('STRUCTURE_PASS fails:[] · gate BLOCK (OP eye Absent)')
  }
} finally {
  await browser.close()
}
