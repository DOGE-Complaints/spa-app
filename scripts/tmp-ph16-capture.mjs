/**
 * PH-16 Path A — HIW env CTAs (Story GPT + Landing FAQ).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / GPT URL / landing host.
 *
 * Env: PH16_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq',
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
const base = process.env.PH16_BASE || 'http://127.0.0.1:5173'

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
  await sleep(250)
}

try {
  await page.goto(`${base}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(900)
  await setTheme('light')

  const root = await page.waitForSelector('[data-testid="how-it-works-page"][data-ph16="true"]', {
    timeout: 15000,
  })

  const probe = await page.evaluate(() => {
    const interview = document.querySelector('[data-testid="how-it-works-cta-telegram"]')
    const landing = document.querySelector('[data-testid="how-it-works-cta-landing"]')
    const feed = document.querySelector('[data-testid="how-it-works-cta-feed"]')
    const pageEl = document.querySelector('[data-testid="how-it-works-page"]')
    return {
      ph16: pageEl?.getAttribute('data-ph16') === 'true',
      interviewHref: interview?.getAttribute('href') || null,
      landingHref: landing?.getAttribute('href') || null,
      feedHref: feed?.getAttribute('href') || null,
      interviewLabel: interview?.textContent?.trim() || null,
      landingLabel: landing?.textContent?.trim() || null,
      // Hardcoded host must not appear except as live env href (never invent in source).
      landingIsCalmHash: (landing?.getAttribute('href') || '') === '#',
    }
  })

  if (!probe.ph16) fails.push('missing-ph16-marker')
  if (!probe.interviewHref) fails.push('interview-href-missing')
  // Env may be set (local .env) or empty → `#`; code must not invent URL.
  if (probe.interviewHref !== '#' && !/^https?:\/\//i.test(probe.interviewHref)) {
    fails.push('interview-href-invalid')
  }
  if (!probe.landingHref) fails.push('landing-href-missing')
  // Empty FAQ env → calm `#` (no invent host). Hash-router Link must not rewrite `#` → `#/…`.
  if (probe.landingHref !== '#' && !/^https?:\/\//i.test(probe.landingHref)) {
    fails.push('landing-href-invalid')
  }
  if (probe.landingHref?.startsWith('#/') ) fails.push('landing-hash-rewritten-by-router')
  if (!probe.interviewLabel?.includes('interview') && !probe.interviewLabel?.includes('Telegram')) {
    fails.push('interview-label')
  }
  if (!probe.landingLabel?.includes('Concept')) fails.push('landing-label')
  const feedOk = (h) =>
    h === '/next/feed' || h === '#/next/feed' || (typeof h === 'string' && h.endsWith('/next/feed'))
  if (!feedOk(probe.feedHref)) fails.push('feed-href')

  console.log('PROBE', JSON.stringify(probe))

  await shot(outDir, '01-hiw-interview-cta.png', root)
  const landingEl = await page.$('[data-testid="how-it-works-cta-landing"]')
  const ctaRow = await page.$('[data-testid="how-it-works-cta-row"]')
  if (ctaRow) await shot(outDir, '02-hiw-landing-faq-cta.png', ctaRow)
  else if (landingEl) await shot(outDir, '02-hiw-landing-faq-cta.png', landingEl)
  else fails.push('landing-shot-missing')

  await page.setViewport({ width: 390, height: 844 })
  await sleep(400)
  const rootM = await page.waitForSelector('[data-testid="how-it-works-page"]', { timeout: 10000 })
  await shot(outDir, '03-hiw-mobile.png', rootM)

  const map = [
    ['01-hiw-interview-cta.png', '01-story-root-interview-cta.png', '01-ui-baseline-interview.png'],
    ['02-hiw-landing-faq-cta.png', '02-story-root-landing-faq.png', '02-ui-baseline-landing.png'],
    ['03-hiw-mobile.png', '03-story-root-mobile.png', '03-ui-baseline-mobile.png'],
  ]
  for (const [src, story, baseName] of map) {
    const from = path.join(outDir, src)
    copyFileSync(from, path.join(storyShotDir, story))
    copyFileSync(from, path.join(baselineDir, baseName))
  }

  const meta = {
    story: 'STORY-SPA-PH-16-env-cta-story-gpt-landing-faq',
    utc: new Date().toISOString(),
    probe,
    md5s,
    fails,
    note: 'OP eye Absent · Partial visual=BLOCK · no invent PASS / GPT URL / landing host',
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META fails:', JSON.stringify(fails))
  if (fails.length) process.exitCode = 1
} finally {
  await browser.close()
}
