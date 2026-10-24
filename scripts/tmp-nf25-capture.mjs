/**
 * NF-25 Path A — Filters popover UX redesign (M175).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF25_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign',
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
const base = process.env.NF25_BASE || 'http://127.0.0.1:5173'

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
  await sleep(300)
}

async function probePanel() {
  return page.evaluate(() => {
    const body = document.querySelector('.board-filter-panel-body')
    if (!body) return { present: false }
    const style = getComputedStyle(body)
    const footer = body.querySelector('.board-filter-panel-footer')
    const reset = footer?.querySelector('.board-filter-reset')
    const apply = footer?.querySelector('.board-filter-apply, .ds-btn--primary')
    const dateWrap = body.querySelector('.board-filter-date-input-wrap')
    const dateDisplay = body.querySelector('.board-filter-date-display')
    const dateStyle = dateDisplay ? getComputedStyle(dateDisplay) : null
    const wrapStyle = dateWrap ? getComputedStyle(dateWrap) : null
    const footerChildren = footer
      ? [...footer.children].map((el) => ({
          cls: el.className,
          tag: el.tagName,
        }))
      : []
    const resetIdx = footerChildren.findIndex((c) => String(c.cls).includes('board-filter-reset'))
    const applyIdx = footerChildren.findIndex(
      (c) => String(c.cls).includes('board-filter-apply') || String(c.cls).includes('ds-btn--primary'),
    )
    return {
      present: true,
      lab: body.getAttribute('data-lab-nf25'),
      harmony: body.getAttribute('data-nf25-harmony'),
      width: parseFloat(style.width),
      minWidth: style.minWidth,
      padding: style.padding,
      dateMinH: wrapStyle ? parseFloat(wrapStyle.minHeight) : null,
      dateBg: dateStyle?.backgroundColor || null,
      dateOpacity: dateStyle?.opacity || null,
      dateDisabled: dateDisplay?.disabled || dateDisplay?.getAttribute('disabled') != null,
      hasReset: Boolean(reset),
      hasApply: Boolean(apply),
      resetBeforeApply: resetIdx >= 0 && applyIdx >= 0 ? resetIdx < applyIdx : null,
      footerJustify: footer ? getComputedStyle(footer).justifyContent : null,
    }
  })
}

try {
  await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 })
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-toolbar"], .feed-toolbar, .board-filter-panel', {
    timeout: 25000,
  })
  await setTheme('light')
  await openFilterPanel()

  probes.light = await probePanel()
  if (!probes.light.present) fails.push('panel-absent')
  if (probes.light.lab !== 'true') fails.push('lab-nf25')
  if (probes.light.harmony !== 'm175') fails.push('harmony-m175')
  if (!(probes.light.width >= 340)) fails.push('width-lt-340')
  if (!(probes.light.dateMinH >= 44)) fails.push('date-minh')
  if (probes.light.dateDisabled) fails.push('date-disabled')
  if (probes.light.dateOpacity && Number(probes.light.dateOpacity) < 0.95) fails.push('date-opacity')
  if (probes.light.resetBeforeApply !== true) fails.push('footer-order')

  const body = await page.$('.board-filter-panel-body')
  if (body) {
    await capture('01-filters-popover-width-rows-light-1536x1024.png', body)
    await capture('02-filters-dates-active-light-1536x1024.png', body)
    await capture('03-filters-apply-reset-hierarchy-light-1536x1024.png', body)
  } else {
    fails.push('no-body-shot')
  }

  await setTheme('dark')
  await openFilterPanel()
  probes.dark = await probePanel()
  if (probes.dark.lab !== 'true') fails.push('dark-lab')
  const bodyDark = await page.$('.board-filter-panel-body')
  if (bodyDark) {
    await capture('04-filters-popover-dark-1536x1024.png', bodyDark)
  }

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.reload({ waitUntil: 'networkidle0' })
  await setTheme('light')
  await openFilterPanel()
  probes.narrow = await probePanel()
  const bodyNarrow = await page.$('.board-filter-panel-body')
  if (bodyNarrow) {
    await capture('05-filters-popover-narrow-390x844.png', bodyNarrow)
  }

  const meta = {
    story: 'STORY-SPA-NF-25-filters-popover-ux-redesign',
    pkg: 'pkg-000229',
    gate: fails.length ? 'BLOCK' : 'BLOCK',
    reason: 'OP eye Absent · Partial visual=BLOCK · structure probes only · no invent PASS',
    op_eye: 'Absent',
    fails,
    probes,
    md5s,
    utc: new Date().toISOString(),
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probes: { light: probes.light, dark: probes.dark } }))
  if (fails.length) {
    console.error('STRUCTURE_FAILS', fails)
    process.exitCode = 1
  } else {
    console.log('STRUCTURE_PASS fails:[] · gate BLOCK (OP eye Absent)')
  }
} finally {
  await browser.close()
}
