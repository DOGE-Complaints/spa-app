/**
 * NF-22 Path A — Reset Filters actionable + pointer when dirty∨active.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF22_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-22-reset-filters-actionable',
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
const base = process.env.NF22_BASE || 'http://127.0.0.1:5173'
const STATUS_PUBLISHED_INDEX = 2

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1536, height: 1024 })
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
  await sleep(300)
}

async function openFilterPanel() {
  await page.waitForSelector('.board-filter-panel-toggle', { timeout: 20000 })
  await page.click('.board-filter-panel-toggle')
  await page.waitForSelector('.board-filter-panel-body', { visible: true, timeout: 10000 })
  await sleep(300)
}

async function selectPublishedStatus() {
  const statusTrigger = await page.$('.board-filter-panel-primary .board-filter-trigger')
  if (!statusTrigger) throw new Error('Status filter trigger not found')
  await statusTrigger.click()
  await page.waitForSelector('.board-filter-panel-body .board-filter-dropdown', { visible: true })
  const options = await page.$$('.board-filter-panel-primary .board-filter-option')
  if (options.length <= STATUS_PUBLISHED_INDEX) {
    throw new Error(`Expected status options >= ${STATUS_PUBLISHED_INDEX + 1}`)
  }
  await options[STATUS_PUBLISHED_INDEX].click()
  await sleep(300)
}

async function probeReset() {
  return page.evaluate(() => {
    const resets = [...document.querySelectorAll('.board-filter-reset')]
    const first = resets[0]
    if (!first) return { count: 0 }
    const style = getComputedStyle(first)
    return {
      count: resets.length,
      disabled: first.disabled || first.getAttribute('aria-disabled') === 'true',
      cursor: style.cursor,
      className: first.className,
    }
  })
}

try {
  await page.goto(`${base}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('.board-filters-row', { timeout: 20000 })
  await setTheme('light')
  await openFilterPanel()

  const shell = (await page.$('.app-shell, .board-shell, body')) || (await page.$('body'))
  const panel =
    (await page.$('.board-filter-panel')) ||
    (await page.$('.board-filter-panel-body')) ||
    shell

  await capture(outDir, '01-host-light.png', shell)

  // Dirty only: pending status without Apply
  await selectPublishedStatus()
  let p = await probeReset()
  if (p.count < 1) fails.push('reset-absent')
  if (p.disabled) fails.push('dirty-still-disabled')
  if (p.cursor !== 'pointer') fails.push(`dirty-cursor:${p.cursor}`)
  await capture(outDir, '02-reset-dirty-enabled.png', panel)

  // Apply → active filters
  const applyBtn =
    (await page.$('.board-filter-panel-footer button[data-hierarchy="primary"]')) ||
    (await page.$('.board-filter-panel-footer button.ds-btn--primary')) ||
    (await page.$('.board-filter-apply'))
  if (!applyBtn) fails.push('apply-absent')
  else {
    await applyBtn.click()
    await page.waitForFunction(() => location.hash.includes('status=PUBLISHED'), { timeout: 5000 })
  }
  await sleep(400)
  if (!(await page.$('.board-filter-panel-body'))) {
    await openFilterPanel()
  }
  p = await probeReset()
  if (p.disabled) fails.push('active-still-disabled')
  if (p.cursor !== 'pointer') fails.push(`active-cursor:${p.cursor}`)
  await capture(outDir, '03-reset-active-enabled.png', panel)

  // Reset → clean
  const resetBtn = await page.$('.board-filter-reset')
  if (resetBtn) {
    await resetBtn.click()
    await sleep(500)
  } else {
    fails.push('reset-click-miss')
  }
  if (!(await page.$('.board-filter-panel-body'))) {
    await openFilterPanel()
  }
  p = await probeReset()
  if (!p.disabled) fails.push('clean-not-disabled')
  await capture(outDir, '04-reset-disabled-clean.png', panel)

  await setTheme('dark')
  await capture(outDir, '05-host-dark-hold.png', shell)

  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(storyShotDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-reset-dirty-enabled.png'), path.join(storyShotDir, '02-story-root-reset-dirty.png'))
  copyFileSync(path.join(outDir, '03-reset-active-enabled.png'), path.join(storyShotDir, '03-story-root-reset-active.png'))
  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-reset-dirty-enabled.png'), path.join(baselineDir, '02-story-root-reset-dirty.png'))
  copyFileSync(path.join(outDir, '03-reset-active-enabled.png'), path.join(baselineDir, '03-story-root-reset-active.png'))

  const meta = {
    story: 'STORY-SPA-NF-22-reset-filters-actionable',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails,
    md5s,
    probe: await probeReset(),
    note: 'Partial visual=BLOCK · no invent OP PASS',
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, prefixes: md5s.map((m) => m.prefix) }))
  if (fails.length) process.exitCode = 1
} catch (err) {
  console.error(err)
  fails.push(String(err?.message || err))
  writeFileSync(
    path.join(outDir, 'CAPTURE-META.json'),
    JSON.stringify({ story: 'STORY-SPA-NF-22', fails, error: String(err) }, null, 2),
  )
  process.exitCode = 1
} finally {
  await browser.close()
}
