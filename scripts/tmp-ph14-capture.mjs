/**
 * PH-14 Path A — How It Works deep redesign (M171).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS / ET / Telegram URL.
 *
 * Env: PH14_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-14-how-it-works-deep-redesign',
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
const base = process.env.PH14_BASE || 'http://127.0.0.1:5173'

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

  const root = await page.waitForSelector('[data-testid="how-it-works-page"][data-ph14="true"]', {
    timeout: 15000,
  })

  const probe = await page.evaluate(() => {
    const html = document.body?.innerText || ''
    const feed = document.querySelector('[data-testid="how-it-works-cta-feed"]')
    const inline = document.querySelector('[data-testid="how-it-works-inline-feed"]')
    const landing = document.querySelector('[data-testid="how-it-works-cta-landing"]')
    const telegram = document.querySelector('[data-testid="how-it-works-cta-telegram"]')
    const submit = document.querySelector('[data-testid="how-it-works-cta-submit"]')
    const ctaRow = document.querySelector('[data-testid="how-it-works-cta-row"]')
    const steps = document.querySelectorAll('[data-testid="how-it-works-step"]')
    const visuals = document.querySelectorAll('[data-testid^="how-it-works-visual-"]')
    const ctaStyle = ctaRow ? getComputedStyle(ctaRow) : null
    return {
      hasBoardHint: /Opens\s*`?\/board|Internal navigation to\s*`?\/board|Go to Dashboard/i.test(
        html,
      ),
      hasGptHandoff: /DOGEstonia GPT|Submit Through DOGEstonia GPT|Submit a story/i.test(
        document.querySelector('[data-testid="how-it-works-page"]')?.innerText || '',
      ),
      feedHref: feed?.getAttribute('href') || null,
      inlineHref: inline?.getAttribute('href') || null,
      landingHref: landing?.getAttribute('href') || null,
      landingLabel: landing?.textContent?.trim() || null,
      telegramLabel: telegram?.textContent?.trim() || null,
      hasTelegram: Boolean(telegram),
      hasSubmit: Boolean(submit),
      stepCount: steps.length,
      visualCount: visuals.length,
      ctaJustify: ctaStyle?.justifyContent || null,
      noticeTitle: /Notice what matters/.test(html),
      feedLabel: feed?.textContent?.trim() || null,
    }
  })

  if (probe.hasBoardHint) fails.push('board-hint-visible')
  if (probe.hasGptHandoff) fails.push('gpt-handoff-visible')
  const feedOk = (h) =>
    h === '/next/feed' || h === '#/next/feed' || (typeof h === 'string' && h.endsWith('/next/feed'))
  if (!feedOk(probe.feedHref) || !feedOk(probe.inlineHref)) {
    fails.push('feed-href')
  }
  if (!probe.landingHref?.includes('uus-veerenni-civic.dogestonia.me/#how-it-works')) {
    fails.push('landing-href')
  }
  if (!probe.landingLabel?.includes('Concept')) fails.push('landing-label')
  if (!probe.hasTelegram) fails.push('telegram-cta-missing')
  if (!probe.telegramLabel?.includes('Telegram')) fails.push('telegram-label')
  if (probe.hasSubmit) fails.push('gpt-submit-still-present')
  if (probe.stepCount !== 4) fails.push('step-count')
  if (probe.visualCount !== 4) fails.push('visual-count')
  if (probe.ctaJustify !== 'flex-start') fails.push('cta-not-leftward')
  if (!probe.noticeTitle) fails.push('m171-title-missing')

  await shot(outDir, '01-page-desktop.png', root)

  const ctaRow = await page.$('[data-testid="how-it-works-cta-row"]')
  await shot(outDir, '02-cta-leftward.png', ctaRow || root)

  const step02 = await page.$('[data-step="telegramStory"]')
  await shot(outDir, '03-step02-telegram.png', step02 || root)

  const step03 = await page.$('[data-step="publicIssue"]')
  await shot(outDir, '04-step03-feed.png', step03 || root)

  await page.setViewport({ width: 390, height: 2400 })
  await sleep(400)
  const rootMobile = await page.$('[data-testid="how-it-works-page"]')
  await shot(outDir, '05-page-mobile-390.png', rootMobile || root)

  copyFileSync(
    path.join(outDir, '01-page-desktop.png'),
    path.join(storyShotDir, '01-story-root-hiw-desktop.png'),
  )
  copyFileSync(
    path.join(outDir, '02-cta-leftward.png'),
    path.join(storyShotDir, '02-story-root-cta-left.png'),
  )
  copyFileSync(
    path.join(outDir, '05-page-mobile-390.png'),
    path.join(storyShotDir, '03-story-root-mobile.png'),
  )

  for (const f of [
    '01-page-desktop.png',
    '02-cta-leftward.png',
    '03-step02-telegram.png',
    '04-step03-feed.png',
    '05-page-mobile-390.png',
  ]) {
    copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
  }

  const meta = {
    story: 'STORY-SPA-PH-14-how-it-works-deep-redesign',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_et: false,
    invent_telegram_url: false,
    invent_gpt_url: false,
    fails,
    probe,
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
        story: 'STORY-SPA-PH-14-how-it-works-deep-redesign',
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
