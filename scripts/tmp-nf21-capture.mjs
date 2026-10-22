/**
 * NF-21 Path A — filter date color-scheme follows theme.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / custom calendar.
 *
 * Env: NF21_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-21-filter-date-color-scheme',
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
const base = process.env.NF21_BASE || 'http://127.0.0.1:5173'

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
  await sleep(350)
}

async function openBoardFilters() {
  await page.goto(`${base}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('.board-filter-panel-toggle', { timeout: 20000 })
  await page.click('.board-filter-panel-toggle')
  await page.waitForSelector('.board-filter-panel-body', { visible: true, timeout: 10000 })
  await page.waitForSelector('.board-filter-date-native', { timeout: 10000 })
  await sleep(400)
}

async function probe() {
  return page.evaluate(() => {
    const theme = document.documentElement.getAttribute('data-theme')
    const natives = [...document.querySelectorAll('.board-filter-date-native')]
    const schemes = natives.map((el) => getComputedStyle(el).colorScheme)
    return {
      theme,
      nativeCount: natives.length,
      schemes,
      firstScheme: natives[0] ? getComputedStyle(natives[0]).colorScheme : null,
      panelPresent: Boolean(document.querySelector('.board-filter-panel-body')),
    }
  })
}

try {
  await openBoardFilters()
  await setTheme('light')
  let p = await probe()
  if (p.nativeCount < 1) fails.push('native-absent')
  if (!p.schemes.every((s) => /light/i.test(s || ''))) fails.push('light-scheme-miss')

  const shell = await page.$('.app-shell, .board-shell, body')
  const panel =
    (await page.$('.board-filter-panel')) ||
    (await page.$('.board-filter-panel-body')) ||
    shell
  const dateWrap =
    (await page.$('.board-filter-date-wrap')) ||
    (await page.$('.board-filter-panel-body')) ||
    panel

  await capture(outDir, '01-host-light.png', shell)
  await capture(outDir, '02-date-light-scheme.png', dateWrap)

  await setTheme('dark')
  p = await probe()
  if (!p.schemes.every((s) => /dark/i.test(s || ''))) fails.push('dark-scheme-miss')
  await capture(outDir, '03-date-dark-scheme.png', dateWrap)
  await capture(outDir, '04-host-dark-hold.png', shell)
  await capture(outDir, '05-date-open-soft.png', panel)

  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(storyShotDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-date-light-scheme.png'), path.join(storyShotDir, '02-story-root-date-light.png'))
  copyFileSync(path.join(outDir, '03-date-dark-scheme.png'), path.join(storyShotDir, '03-story-root-date-dark.png'))
  copyFileSync(path.join(outDir, '01-host-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-date-light-scheme.png'), path.join(baselineDir, '02-story-root-date-light.png'))
  copyFileSync(path.join(outDir, '03-date-dark-scheme.png'), path.join(baselineDir, '03-story-root-date-dark.png'))

  const meta = {
    story: 'STORY-SPA-NF-21-filter-date-color-scheme',
    captured_utc: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial: 'BLOCK',
    fails,
    probe: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, probe: p }))
  if (fails.length) {
    console.error('NF21 capture fails', fails)
    process.exit(1)
  }
} finally {
  await browser.close()
}
