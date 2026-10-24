/**
 * NS-16 Path A — default theme light when unset · stored dark held.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NS16_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-16-default-theme-light',
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
const base = process.env.NS16_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function probe(page) {
  return page.evaluate(() => ({
    themeAttr: document.documentElement.getAttribute('data-theme'),
    colorScheme: document.documentElement.style.colorScheme || null,
    stored: (() => {
      try {
        return localStorage.getItem('dogestonia.theme')
      } catch {
        return null
      }
    })(),
    header: Boolean(document.querySelector('[data-testid="public-header"]')),
  }))
}

try {
  // --- Unset → light ---
  const pageLight = await browser.newPage()
  await pageLight.setViewport({ width: 1536, height: 1024 })
  await pageLight.evaluateOnNewDocument(() => {
    try {
      localStorage.removeItem('dogestonia.theme')
    } catch {
      /* ignore */
    }
  })
  await pageLight.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await pageLight.waitForSelector('[data-testid="public-header"]', { timeout: 20000 })
  await sleep(700)
  let p = await probe(pageLight)
  console.log('probeUnset', JSON.stringify(p))
  if (p.themeAttr !== 'light') fails.push(`unset themeAttr=${p.themeAttr}`)
  if (!p.header) fails.push('missing public-header')

  const header = await pageLight.$('[data-testid="public-header"]')
  const shell = await pageLight.$('.app-shell')
  await capture(outDir, '01-default-unset-light.png', header || shell || (await pageLight.$('body')))
  await capture(outDir, '02-shell-default-light.png', shell || (await pageLight.$('body')))
  await pageLight.close()

  // --- Stored dark held (fresh page · no clear hook) ---
  const pageDark = await browser.newPage()
  await pageDark.setViewport({ width: 1536, height: 1024 })
  await pageDark.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem('dogestonia.theme', 'dark')
    } catch {
      /* ignore */
    }
  })
  await pageDark.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await pageDark.waitForSelector('[data-testid="public-header"]', { timeout: 20000 })
  await sleep(700)
  p = await probe(pageDark)
  console.log('probeStoredDark', JSON.stringify(p))
  if (p.themeAttr !== 'dark') fails.push(`stored dark themeAttr=${p.themeAttr}`)
  if (p.stored !== 'dark') fails.push(`stored dark storage=${p.stored}`)

  await capture(
    outDir,
    '03-stored-dark-held.png',
    (await pageDark.$('[data-testid="public-header"]')) || (await pageDark.$('body')),
  )
  await capture(outDir, '04-shell-stored-dark.png', (await pageDark.$('.app-shell')) || (await pageDark.$('body')))
  await capture(
    outDir,
    '05-honesty.png',
    (await pageDark.$('[data-testid="public-header"]')) || (await pageDark.$('body')),
  )
  await pageDark.close()

  copyFileSync(
    path.join(outDir, '01-default-unset-light.png'),
    path.join(storyShotDir, '01-story-root-default-unset-light.png'),
  )
  copyFileSync(
    path.join(outDir, '03-stored-dark-held.png'),
    path.join(storyShotDir, '02-story-root-stored-dark-held.png'),
  )
  copyFileSync(
    path.join(outDir, '02-shell-default-light.png'),
    path.join(storyShotDir, '03-story-root-shell-default-light.png'),
  )
  copyFileSync(path.join(outDir, '01-default-unset-light.png'), path.join(baselineDir, '01-default-unset-light.png'))
  copyFileSync(path.join(outDir, '03-stored-dark-held.png'), path.join(baselineDir, '02-stored-dark-held.png'))

  const meta = {
    story: 'STORY-SPA-NS-16-default-theme-light',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_os_theme: false,
    default_unset: 'light',
    stored_dark_held: p.themeAttr === 'dark',
    fails,
    probeStoredDark: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', fails)
  if (fails.length) process.exitCode = 2
} finally {
  await browser.close()
}
