/**
 * PH-17 Path A — Privacy dark icons + Contact story CTA.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / GPT URL / new art.
 *
 * Env: PH17_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta',
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
const base = process.env.PH17_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 1600 })
const md5s = []
const fails = []

async function shot(dir, file, el) {
  const dest = path.join(dir, file)
  await el.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
  return dest
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

try {
  await page.goto(`${base}/#/privacy`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(800)
  await setTheme('dark')

  const privacyRoot = await page.waitForSelector(
    '[data-testid="public-static-page"][data-ph17="privacy-icons"]',
    { timeout: 15000 },
  )

  const privacyProbe = await page.evaluate(() => {
    const icon = document.querySelector('.public-static-privacy-card__icon')
    const dl = document.querySelector('.public-static-privacy-card__dl-icon')
    const styleIcon = icon ? getComputedStyle(icon) : null
    const styleDl = dl ? getComputedStyle(dl) : null
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      cardCount: document.querySelectorAll('[data-testid^="public-static-privacy-card-"]').length,
      iconFilter: styleIcon?.filter || null,
      dlFilter: styleDl?.filter || null,
      iconVisible: icon ? styleIcon.visibility !== 'hidden' && styleIcon.display !== 'none' : false,
    }
  })

  if (privacyProbe.theme !== 'dark') fails.push('privacy-not-dark')
  if (privacyProbe.cardCount !== 3) fails.push('privacy-card-count')
  if (!/invert\(1\)/.test(privacyProbe.iconFilter || '')) fails.push('privacy-icon-filter')
  if (!/invert\(1\)/.test(privacyProbe.dlFilter || '')) fails.push('privacy-dl-filter')
  if (!privacyProbe.iconVisible) fails.push('privacy-icon-hidden')

  console.log('PRIVACY_PROBE', JSON.stringify(privacyProbe))
  await shot(outDir, '01-privacy-dark-icons.png', privacyRoot)

  await page.goto(`${base}/#/contact`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(800)
  await setTheme('light')

  const contactRoot = await page.waitForSelector(
    '[data-testid="public-static-page"][data-ph17="contact-cta"]',
    { timeout: 15000 },
  )

  const contactProbe = await page.evaluate(() => {
    const hint = document.querySelector('[data-testid="public-static-contact-story-hint"]')
    const cta = document.querySelector('[data-testid="public-static-contact-story-cta"]')
    const href = cta?.getAttribute('href') || null
    return {
      hasHint: Boolean(hint),
      hasCta: Boolean(cta),
      ctaHref: href,
      ctaLabel: cta?.textContent?.trim() || null,
      hrefOk: href === '#' || /^https?:\/\//i.test(href || ''),
      noHardcodedGptId: !/g-RkVU9xLWN/i.test(document.querySelector('[data-testid="public-static-contact"]')?.innerHTML || ''),
    }
  })

  if (!contactProbe.hasHint) fails.push('contact-hint-missing')
  if (!contactProbe.hasCta) fails.push('contact-cta-missing')
  if (!contactProbe.hrefOk) fails.push('contact-cta-href-invalid')
  if (!contactProbe.ctaLabel) fails.push('contact-cta-label')

  console.log('CONTACT_PROBE', JSON.stringify(contactProbe))
  await shot(outDir, '02-contact-story-cta.png', contactRoot)

  await page.setViewport({ width: 390, height: 844 })
  await sleep(400)
  await setTheme('dark')
  await page.goto(`${base}/#/privacy`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  const mobile = await page.waitForSelector('[data-testid="public-static-privacy"]', {
    timeout: 10000,
  })
  await shot(outDir, '03-privacy-dark-mobile.png', mobile)

  const map = [
    ['01-privacy-dark-icons.png', '01-story-root-privacy-dark.png', '01-ui-baseline-privacy-dark.png'],
    ['02-contact-story-cta.png', '02-story-root-contact-cta.png', '02-ui-baseline-contact-cta.png'],
    ['03-privacy-dark-mobile.png', '03-story-root-privacy-mobile.png', '03-ui-baseline-privacy-mobile.png'],
  ]
  for (const [src, story, baseName] of map) {
    const from = path.join(outDir, src)
    copyFileSync(from, path.join(storyShotDir, story))
    copyFileSync(from, path.join(baselineDir, baseName))
  }

  const meta = {
    story: 'STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta',
    utc: new Date().toISOString(),
    privacyProbe,
    contactProbe,
    md5s,
    fails,
    note: 'OP eye Absent · Partial visual=BLOCK · no invent PASS / GPT URL / new art',
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', JSON.stringify(fails))
  if (fails.length) process.exitCode = 1
} finally {
  await browser.close()
}
