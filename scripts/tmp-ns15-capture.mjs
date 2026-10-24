/**
 * NS-15 Path A — OP tip PNG dual · footer no adjacent text · masters Present (copy).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent PNG.
 *
 * Env: NS15_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { accessSync, constants, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-15-brand-op-light-png-footer-dual',
)
const assetsRoot = path.resolve(__dirname, '../public/assets')
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

function masterPresent(name) {
  try {
    accessSync(path.join(assetsRoot, name), constants.F_OK)
    return true
  } catch {
    return false
  }
}

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.NS15_BASE || 'http://127.0.0.1:5173'

const brandLight = masterPresent('dogestonia-brand-light.png')
const brandDark = masterPresent('dogestonia-brand-dark.png')
const mastersPresent = brandLight && brandDark

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
  await sleep(400)
}

async function openFeed() {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="public-header"], [data-testid="public-footer"]', {
    timeout: 20000,
  })
  await sleep(800)
}

async function probe() {
  return page.evaluate(() => {
    const header = document.querySelector('[data-testid="public-header"]')
    const brandImg = document.querySelector('[data-testid="public-header-brand"] img')
    const footer = document.querySelector('[data-testid="public-footer"]')
    const footerLogo = document.querySelector('[data-testid="public-footer-logo"]')
    const tagline = document.querySelector('[data-testid="public-footer-tagline"]')
    const brandName = document.querySelector('.public-footer__brand-name')
    return {
      themeAttr: document.documentElement.getAttribute('data-theme'),
      header: Boolean(header),
      brandSrc: brandImg?.getAttribute('src') || null,
      footer: Boolean(footer),
      ns14: footer?.getAttribute('data-ns14') || null,
      ns15: footer?.getAttribute('data-ns15') || null,
      footerSrc: footerLogo?.getAttribute('src') || null,
      tagline: Boolean(tagline),
      brandNameText: Boolean(brandName),
    }
  })
}

try {
  if (!mastersPresent) fails.push('tip masters Absent in public/assets (promote required)')
  console.log('asset_status', mastersPresent ? 'MASTERS_PRESENT' : 'MASTERS_ABSENT')

  await openFeed()
  await setTheme('light')
  let p = await probe()
  console.log('probeLight', JSON.stringify(p))

  if (!p.header) fails.push('missing public-header')
  if (!p.footer) fails.push('missing public-footer')
  if (p.tagline) fails.push('footer tagline still Present')
  if (p.brandNameText) fails.push('footer adjacent brand text Present')
  if (p.ns14 !== 'no-tagline') fails.push(`ns14 attr ${p.ns14}`)
  if (p.ns15 !== 'brand-png-dual') fails.push(`ns15 attr ${p.ns15}`)
  if (!(p.brandSrc || '').includes('dogestonia-brand-light.png')) {
    fails.push(`header light src ${p.brandSrc}`)
  }
  if (!(p.footerSrc || '').includes('dogestonia-brand-light.png')) {
    fails.push(`footer light src ${p.footerSrc}`)
  }
  if ((p.footerSrc || '').includes('logo-big')) fails.push('footer still logo-big')

  const header = await page.$('[data-testid="public-header"]')
  const footer = await page.$('[data-testid="public-footer"]')
  const shell = await page.$('.app-shell')
  await capture(outDir, '01-header-brand-light.png', header || shell || (await page.$('body')))
  await capture(outDir, '02-footer-brand-light-no-text.png', footer || shell || (await page.$('body')))

  await setTheme('dark')
  p = await probe()
  console.log('probeDark', JSON.stringify(p))
  if (!(p.brandSrc || '').includes('dogestonia-brand-dark.png')) {
    fails.push(`header dark src ${p.brandSrc}`)
  }
  if (!(p.footerSrc || '').includes('dogestonia-brand-dark.png')) {
    fails.push(`footer dark src ${p.footerSrc}`)
  }
  if (p.tagline || p.brandNameText) fails.push('footer text Present in dark')
  await capture(
    outDir,
    '03-header-brand-dark.png',
    (await page.$('[data-testid="public-header"]')) || shell || (await page.$('body')),
  )
  await capture(
    outDir,
    '04-footer-brand-dark.png',
    (await page.$('[data-testid="public-footer"]')) || shell || (await page.$('body')),
  )
  await capture(
    outDir,
    '05-brand-honesty.png',
    (await page.$('[data-testid="public-header"]')) || shell || (await page.$('body')),
  )

  copyFileSync(path.join(outDir, '01-header-brand-light.png'), path.join(storyShotDir, '01-story-root-header-brand-light.png'))
  copyFileSync(
    path.join(outDir, '02-footer-brand-light-no-text.png'),
    path.join(storyShotDir, '02-story-root-footer-brand-light-no-text.png'),
  )
  copyFileSync(path.join(outDir, '03-header-brand-dark.png'), path.join(storyShotDir, '03-story-root-header-brand-dark.png'))
  copyFileSync(path.join(outDir, '04-footer-brand-dark.png'), path.join(storyShotDir, '04-story-root-footer-brand-dark.png'))
  copyFileSync(path.join(outDir, '01-header-brand-light.png'), path.join(baselineDir, '01-story-root-host.png'))
  copyFileSync(path.join(outDir, '02-footer-brand-light-no-text.png'), path.join(baselineDir, '02-story-root-footer.png'))
  copyFileSync(path.join(outDir, '03-header-brand-dark.png'), path.join(baselineDir, '03-story-root-header-dark.png'))

  const meta = {
    story: 'STORY-SPA-NS-15-brand-op-light-png-footer-dual',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_png_masters: false,
    asset_status: mastersPresent ? 'MASTERS_PRESENT' : 'MASTERS_ABSENT',
    promote: 'copy_tip_shelf_only',
    header_wire: 'dogestonia-brand-{light,dark}.png',
    footer_wire: 'dogestonia-brand-{light,dark}.png',
    footer_adjacent_text: 'Absent',
    logo_big_footer: false,
    fails,
    probeDark: p,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', fails)
  if (fails.length) process.exitCode = 2
} finally {
  await browser.close()
}
