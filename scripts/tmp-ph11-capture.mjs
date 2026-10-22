/**
 * PH-11 Path A — Footer scale + static About/Privacy/Contact (M166).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent legal prose.
 *
 * Env: PH11_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-11-footer-static-pages',
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
const base = process.env.PH11_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
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

function feedOk(h) {
  return (
    h === '/next/feed' ||
    h === '#/next/feed' ||
    (typeof h === 'string' && h.endsWith('/next/feed'))
  )
}

function routeOk(h, expected) {
  return (
    h === expected ||
    h === `#${expected}` ||
    (typeof h === 'string' && (h.endsWith(expected) || h.includes(expected)))
  )
}

try {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(800)
  await setTheme('light')

  const footer = await page.waitForSelector('[data-testid="public-footer"][data-ph11="true"]', {
    timeout: 15000,
  })

  const probe = await page.evaluate(() => {
    const footerEl = document.querySelector('[data-testid="public-footer"]')
    const logo = document.querySelector('[data-testid="public-footer-logo"]')
    const tagline = document.querySelector('[data-testid="public-footer-tagline"]')
    const brand = document.querySelector('[data-testid="public-footer-brand-link"]')
    const about = document.querySelector('[data-testid="public-footer-about"]')
    const privacy = document.querySelector('[data-testid="public-footer-privacy"]')
    const contact = document.querySelector('[data-testid="public-footer-contact"]')
    const logoRect = logo?.getBoundingClientRect()
    const cs = logo ? getComputedStyle(logo) : null
    return {
      tagline: tagline?.textContent?.trim() || null,
      brandHref: brand?.getAttribute('href') || null,
      aboutHref: about?.getAttribute('href') || null,
      privacyHref: privacy?.getAttribute('href') || null,
      contactHref: contact?.getAttribute('href') || null,
      logoCssW: logoRect?.width ?? 0,
      logoCssH: logoRect?.height ?? 0,
      logoStyleW: cs ? parseFloat(cs.width) : 0,
      logoStyleH: cs ? parseFloat(cs.height) : 0,
      hasTbd: Boolean(footerEl?.textContent?.includes('TAGLINE_TBD')),
    }
  })

  if (probe.hasTbd) fails.push('tagline-tbd')
  if (probe.tagline !== 'Civic issues, structured.') fails.push('tagline-mismatch')
  if (probe.logoCssW < 40 || probe.logoCssH < 40 || probe.logoStyleW < 40 || probe.logoStyleH < 40) {
    fails.push('logo-under-40')
  }
  if (!feedOk(probe.brandHref)) fails.push('brand-href')
  if (!routeOk(probe.aboutHref, '/about')) fails.push('about-href')
  if (!routeOk(probe.privacyHref, '/privacy')) fails.push('privacy-href')
  if (!routeOk(probe.contactHref, '/contact')) fails.push('contact-href')

  await shot(outDir, '01-footer-mark-scale.png', footer)

  const tagEl = (await page.$('[data-testid="public-footer-tagline"]')) || footer
  await shot(outDir, '02-footer-tagline.png', tagEl)

  const brandEl = (await page.$('[data-testid="public-footer-brand"]')) || footer
  await shot(outDir, '04-brand-next-feed.png', brandEl)

  const linksEl = (await page.$('[data-testid="public-footer-links"]')) || footer
  await shot(outDir, '05-footer-links.png', linksEl)

  // Static shells — one composite via about page + H1 check all three
  const pageProbe = { pages: [] }
  for (const [route, key, title] of [
    ['/about', 'about', 'About'],
    ['/privacy', 'privacy', 'Privacy'],
    ['/contact', 'contact', 'Contact'],
  ]) {
    await page.goto(`${base}/#${route}`, { waitUntil: 'networkidle0', timeout: 60000 })
    await sleep(500)
    await setTheme('light')
    const info = await page.evaluate(
      (k, expectedTitle) => {
        const root = document.querySelector(`[data-testid="public-static-${k}"]`)
        const h1 = root?.querySelector('h1')
        const pending = document.querySelector(`[data-testid="public-static-${k}-pending"]`)
        return {
          hasRoot: Boolean(root),
          h1: h1?.textContent?.trim() || null,
          pending: pending?.textContent?.trim() || null,
          inventedLegal: /shall|pursuant|GDPR Article|§\s*\d/i.test(pending?.textContent || ''),
        }
      },
      key,
      title,
    )
    pageProbe.pages.push({ route, key, ...info })
    if (!info.hasRoot || info.h1 !== title) fails.push(`shell-${key}`)
    if (info.inventedLegal) fails.push(`invented-legal-${key}`)
  }

  const aboutRoot = await page.waitForSelector('[data-testid="public-static-contact"]', {
    timeout: 10000,
  })
  // re-open about for the shell shot
  await page.goto(`${base}/#/about`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(400)
  await setTheme('light')
  const aboutShot = await page.waitForSelector('[data-testid="public-static-about"]', {
    timeout: 10000,
  })
  await shot(outDir, '03-static-pages-shell.png', aboutShot || aboutRoot)

  // story-root copies
  copyFileSync(path.join(outDir, '01-footer-mark-scale.png'), path.join(storyShotDir, '01-story-root-footer-mark.png'))
  copyFileSync(path.join(outDir, '02-footer-tagline.png'), path.join(storyShotDir, '02-story-root-tagline.png'))
  copyFileSync(path.join(outDir, '03-static-pages-shell.png'), path.join(storyShotDir, '03-story-root-static-shell.png'))
  copyFileSync(path.join(outDir, '04-brand-next-feed.png'), path.join(storyShotDir, '04-story-root-brand-feed.png'))
  copyFileSync(path.join(outDir, '05-footer-links.png'), path.join(storyShotDir, '05-story-root-footer-links.png'))

  for (const f of [
    '01-footer-mark-scale.png',
    '02-footer-tagline.png',
    '03-static-pages-shell.png',
    '04-brand-next-feed.png',
    '05-footer-links.png',
  ]) {
    copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
  }

  const meta = {
    story: 'STORY-SPA-PH-11-footer-static-pages',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_legal_prose: false,
    invent_cdn: false,
    fails,
    probe,
    pageProbe,
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
        story: 'STORY-SPA-PH-11-footer-static-pages',
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
