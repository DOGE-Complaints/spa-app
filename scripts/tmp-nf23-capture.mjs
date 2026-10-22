/**
 * NF-23 Path A — `#/board` → `#/next/feed` replace · soft CTA surfaces.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: NF23_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-23-board-deprecate-redirect',
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
const base = process.env.NF23_BASE || 'http://127.0.0.1:5173'

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

async function probeRedirect() {
  return page.evaluate(() => {
    const hash = location.hash || ''
    const host = document.querySelector('[data-testid="next-feed-host"]')
    const boardPage = document.querySelector('.board-page')
    const dash = document.querySelector('[data-testid="public-nav-dashboard"]')
    const brand =
      document.querySelector('.public-footer__brand-link') ||
      document.querySelector('[data-testid="public-footer-brand"]')
    return {
      hash,
      hasNextFeedHost: Boolean(host),
      hasBoardPage: Boolean(boardPage),
      dashboardHref: dash?.getAttribute('href') || null,
      footerBrandHref: brand?.getAttribute('href') || null,
    }
  })
}

try {
  await page.goto(`${base}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForFunction(
    () =>
      (location.hash || '').startsWith('#/next/feed') &&
      Boolean(document.querySelector('[data-testid="next-feed-host"]')),
    { timeout: 20000 },
  )
  await setTheme('light')
  await sleep(400)

  let p = await probeRedirect()
  if (!p.hash.startsWith('#/next/feed')) fails.push(`hash:${p.hash}`)
  if (!p.hasNextFeedHost) fails.push('next-feed-host-absent')
  if (p.hasBoardPage) fails.push('board-page-still-mounted')
  if (p.dashboardHref !== '/next/feed' && p.dashboardHref !== '#/next/feed') {
    fails.push(`dashboard-href:${p.dashboardHref}`)
  }

  const shell = (await page.$('.app-shell, .board-shell, body')) || (await page.$('body'))
  const header =
    (await page.$('[data-testid="public-header-nav"]')) ||
    (await page.$('header')) ||
    shell
  const footer =
    (await page.$('.public-footer')) ||
    (await page.$('footer')) ||
    shell

  await capture(outDir, '01-board-hash-redirect.png', shell)
  await capture(outDir, '02-feed-host-light.png', shell)
  await capture(outDir, '03-cta-header-soft.png', header)

  await page.evaluate(() => {
    const el = document.querySelector('.public-footer, footer')
    if (el) el.scrollIntoView({ block: 'center' })
  })
  await sleep(200)
  p = await probeRedirect()
  if (p.footerBrandHref && p.footerBrandHref !== '/next/feed' && p.footerBrandHref !== '#/next/feed') {
    fails.push(`footer-href:${p.footerBrandHref}`)
  }
  await capture(outDir, '04-cta-footer-soft.png', footer)

  await setTheme('dark')
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(300)
  await capture(outDir, '05-feed-host-dark-hold.png', shell)

  copyFileSync(path.join(outDir, '01-board-hash-redirect.png'), path.join(storyShotDir, '01-story-root-board-redirect.png'))
  copyFileSync(path.join(outDir, '02-feed-host-light.png'), path.join(storyShotDir, '02-story-root-feed-host.png'))
  copyFileSync(path.join(outDir, '03-cta-header-soft.png'), path.join(storyShotDir, '03-story-root-cta-soft.png'))
  copyFileSync(path.join(outDir, '01-board-hash-redirect.png'), path.join(baselineDir, '01-story-root-board-redirect.png'))
  copyFileSync(path.join(outDir, '02-feed-host-light.png'), path.join(baselineDir, '02-story-root-feed-host.png'))
  copyFileSync(path.join(outDir, '03-cta-header-soft.png'), path.join(baselineDir, '03-story-root-cta-soft.png'))

  const meta = {
    story: 'STORY-SPA-NF-23-board-deprecate-redirect',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails,
    md5s,
    probe: await probeRedirect(),
    note: 'Partial visual=BLOCK · no invent OP PASS · inventory Present · no mass-delete',
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, prefixes: md5s.map((m) => m.prefix) }))
  if (fails.length) process.exitCode = 1
} catch (err) {
  console.error(err)
  fails.push(String(err?.message || err))
  writeFileSync(
    path.join(outDir, 'CAPTURE-META.json'),
    JSON.stringify({ story: 'STORY-SPA-NF-23', fails, error: String(err) }, null, 2),
  )
  process.exitCode = 1
} finally {
  await browser.close()
}
