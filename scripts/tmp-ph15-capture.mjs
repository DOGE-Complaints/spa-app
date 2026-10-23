/**
 * PH-15 Path A — static pages content (M172 + privacy downloads).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / legal body / RU-ET download labels.
 *
 * Env: PH15_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-15-static-pages-content',
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
const base = process.env.PH15_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 1800 })
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
  await sleep(200)
}

try {
  await page.goto(`${base}/#/about`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(700)
  await setTheme('light')

  const about = await page.waitForSelector('[data-testid="public-static-about"][data-ph15-page="about"], [data-testid="public-static-about"]', {
    timeout: 15000,
  })
  // data-ph15 is on parent route wrapper
  await page.waitForSelector('[data-ph15-page="about"]', { timeout: 5000 })

  let probe = await page.evaluate(() => {
    const root = document.querySelector('[data-testid="public-static-about"]')
    const text = root?.innerText || ''
    return {
      aboutH1: document.querySelector('[data-testid="public-static-about"] h1')?.textContent || null,
      hasPending: /OP to supply|placeholder/i.test(text),
      hasLocal: Boolean(document.querySelector('[data-testid="public-static-about-local"]')),
      dogeos: document.querySelector('[data-testid="public-static-about-dogeos"]')?.getAttribute('href'),
    }
  })
  if (probe.hasPending) fails.push('about-pending')
  if (!probe.hasLocal) fails.push('about-sections')
  if (probe.dogeos !== 'https://www.dogeos.com/') fails.push('dogeos-href')
  if (!probe.aboutH1?.includes('About')) fails.push('about-h1')

  await shot(outDir, '01-about-desktop.png', about)

  await page.goto(`${base}/#/privacy`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  await setTheme('light')
  const privacy = await page.waitForSelector('[data-testid="public-static-privacy"]', { timeout: 15000 })
  probe = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-testid^="public-static-privacy-card-"]')
    const hrefs = [...document.querySelectorAll('[data-testid^="public-static-privacy-download-"]')].map(
      (a) => a.getAttribute('href'),
    )
    const text = document.querySelector('[data-testid="public-static-privacy"]')?.innerText || ''
    return {
      cardCount: cards.length,
      hrefs,
      hasLegalProse: /GDPR|personal data controller|We process your/i.test(text),
      hasDownloadCta: /Download PDF/.test(text),
      hasPending: /OP to supply|placeholder/i.test(text),
    }
  })
  if (probe.cardCount !== 3) fails.push('privacy-card-count')
  if (!probe.hrefs.includes('/docs/privacy.pdf')) fails.push('privacy-pdf')
  if (!probe.hrefs.includes('/docs/terms.pdf')) fails.push('terms-pdf')
  if (!probe.hrefs.includes('/docs/participation_information.pdf')) fails.push('participation-pdf')
  if (probe.hasLegalProse) fails.push('invent-legal-body')
  if (!probe.hasDownloadCta) fails.push('download-cta')
  if (probe.hasPending) fails.push('privacy-pending')

  await shot(outDir, '02-privacy-downloads.png', privacy)

  await page.goto(`${base}/#/contact`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  await setTheme('light')
  const contact = await page.waitForSelector('[data-testid="public-static-contact"]', { timeout: 15000 })
  probe = await page.evaluate(() => ({
    site: document.querySelector('[data-testid="public-static-contact-site"]')?.getAttribute('href'),
    telegram: document
      .querySelector('[data-testid="public-static-contact-telegram"]')
      ?.getAttribute('href'),
    email: document.querySelector('[data-testid="public-static-contact-email"]')?.getAttribute('href'),
    hasFormPost: Boolean(document.querySelector('form[method="post"], form[action]')),
  }))
  if (probe.site !== 'https://zeya888.me') fails.push('contact-site')
  if (probe.telegram !== 'https://t.me/zeya888') fails.push('contact-telegram')
  if (probe.email !== 'mailto:zeya.metsapuu@gmail.com') fails.push('contact-email')
  if (probe.hasFormPost) fails.push('invent-form-post')

  await shot(outDir, '03-contact-outline.png', contact)

  await page.setViewport({ width: 390, height: 1600 })
  await page.goto(`${base}/#/privacy`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(500)
  await setTheme('light')
  const privacyMobile = await page.$('[data-testid="public-static-privacy"]')
  await shot(outDir, '04-privacy-mobile-390.png', privacyMobile || privacy)

  await page.setViewport({ width: 1280, height: 1800 })
  await page.goto(`${base}/#/about`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(500)
  await setTheme('light')
  const aboutTwin = await page.$('[data-testid="public-static-about"]')
  await shot(outDir, '05-about-copy-honesty.png', aboutTwin || about)

  copyFileSync(path.join(outDir, '01-about-desktop.png'), path.join(storyShotDir, '01-story-root-about.png'))
  copyFileSync(
    path.join(outDir, '02-privacy-downloads.png'),
    path.join(storyShotDir, '02-story-root-privacy.png'),
  )
  copyFileSync(
    path.join(outDir, '03-contact-outline.png'),
    path.join(storyShotDir, '03-story-root-contact.png'),
  )

  for (const f of [
    '01-about-desktop.png',
    '02-privacy-downloads.png',
    '03-contact-outline.png',
    '04-privacy-mobile-390.png',
    '05-about-copy-honesty.png',
  ]) {
    copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
  }

  const meta = {
    story: 'STORY-SPA-PH-15-static-pages-content',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_legal_body: false,
    invent_ru_et_download_labels: false,
    invent_form_post: false,
    fails,
    md5s,
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, prefixes: md5s.map((m) => m.prefix) }))
} catch (err) {
  fails.push(String(err?.message || err))
  writeFileSync(
    path.join(outDir, 'CAPTURE-META.json'),
    JSON.stringify(
      {
        story: 'STORY-SPA-PH-15-static-pages-content',
        captured_at: new Date().toISOString(),
        visual_gate: 'BLOCK',
        op_eye: 'Absent',
        fails,
        invent_pass: false,
      },
      null,
      2,
    ),
  )
  console.error(err)
  process.exitCode = 1
} finally {
  await browser.close()
}
