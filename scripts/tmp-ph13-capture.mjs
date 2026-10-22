/**
 * PH-13 Path A — How It Works content + CTA (M168).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent landing HTML.
 *
 * Env: PH13_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-13-how-it-works-content-cta',
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
const base = process.env.PH13_BASE || 'http://127.0.0.1:5173'

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
  await sleep(250)
}

try {
  await page.goto(`${base}/#/how-it-works`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(800)
  await setTheme('light')

  const root = await page.waitForSelector('[data-testid="how-it-works-page"][data-ph13="true"]', {
    timeout: 15000,
  })

  const probe = await page.evaluate(() => {
    const html = document.body?.innerText || ''
    const feed = document.querySelector('[data-testid="how-it-works-cta-feed"]')
    const inline = document.querySelector('[data-testid="how-it-works-inline-feed"]')
    const landing = document.querySelector('[data-testid="how-it-works-cta-landing"]')
    const submit = document.querySelector('[data-testid="how-it-works-cta-submit"]')
    const stepHead = document.querySelector('.how-it-works-step-head')
    return {
      hasBoardHint: /Opens\s*`?\/board|Internal navigation to\s*`?\/board|Go to Dashboard/i.test(
        html,
      ),
      feedHref: feed?.getAttribute('href') || null,
      inlineHref: inline?.getAttribute('href') || null,
      landingHref: landing?.getAttribute('href') || null,
      landingLabel: landing?.textContent?.trim() || null,
      hasSubmit: Boolean(submit),
      hasStepHead: Boolean(stepHead),
      feedLabel: feed?.textContent?.trim() || null,
    }
  })

  if (probe.hasBoardHint) fails.push('board-hint-visible')
  const feedOk = (h) =>
    h === '/next/feed' || h === '#/next/feed' || (typeof h === 'string' && h.endsWith('/next/feed'))
  if (!feedOk(probe.feedHref) || !feedOk(probe.inlineHref)) {
    fails.push('feed-href')
  }
  if (!probe.landingHref?.includes('uus-veerenni-civic.dogestonia.me/#how-it-works')) {
    fails.push('landing-href')
  }
  if (!probe.landingLabel?.includes('Concept')) fails.push('landing-label')
  if (!probe.hasSubmit) fails.push('submit-missing')
  if (!probe.hasStepHead) fails.push('step-head-missing')

  // 01 — no board hints (full page crop)
  await shot(outDir, '01-no-board-hints.png', root)

  // 02 — feed CTAs
  const ctaRow = await page.$('[data-testid="how-it-works-cta-row"]')
  const feedBlock = ctaRow || root
  await shot(outDir, '02-cta-next-feed.png', feedBlock)

  // 03 — step head density
  const head = await page.$('.how-it-works-step-head')
  await shot(outDir, '03-step-head-density.png', head || root)

  // 04 — landing FAQ CTA
  const landingEl = await page.$('[data-testid="how-it-works-cta-landing"]')
  await shot(outDir, '04-landing-faq-cta.png', landingEl || root)

  // 05 — copy locales honesty (EN page body)
  await shot(outDir, '05-copy-locales.png', root)

  // story-root copies
  copyFileSync(
    path.join(outDir, '02-cta-next-feed.png'),
    path.join(storyShotDir, '01-story-root-hiw-cta.png'),
  )
  copyFileSync(
    path.join(outDir, '03-step-head-density.png'),
    path.join(storyShotDir, '02-story-root-step-head.png'),
  )
  copyFileSync(
    path.join(outDir, '01-no-board-hints.png'),
    path.join(storyShotDir, '03-story-root-no-board-hint.png'),
  )

  // baseline mirrors
  for (const f of [
    '01-no-board-hints.png',
    '02-cta-next-feed.png',
    '03-step-head-density.png',
    '04-landing-faq-cta.png',
    '05-copy-locales.png',
  ]) {
    copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
  }

  const meta = {
    story: 'STORY-SPA-PH-13-how-it-works-content-cta',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_landing_html: false,
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
        story: 'STORY-SPA-PH-13-how-it-works-content-cta',
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
