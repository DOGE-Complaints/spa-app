/**
 * NF-24 Path A — map leaves sheet / pin popup theme (ARCH-DELTA §12).
 * OP eye Absent · Partial visual = BLOCK · no invent PASS · no invent basemap.
 *
 * Env: NF24_BASE · PUPPETEER_EXECUTABLE_PATH
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
  '../docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-24-map-leaves-sheet-theme',
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
const base = process.env.NF24_BASE || 'http://127.0.0.1:5173'

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

function isNavyRgb(bg) {
  if (!bg) return false
  const m = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!m) return false
  const r = Number(m[1])
  const g = Number(m[2])
  const b = Number(m[3])
  return r <= 20 && g <= 28 && b <= 45
}

try {
  await page.goto(`${base}/#/next/feed`, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  await setTheme('light')

  // Open map pane when toggle Present
  await page.evaluate(() => {
    const btns = document.querySelectorAll('[data-testid="feed-list-map-toggle"] button')
    if (btns[1]) btns[1].click()
  })
  await sleep(1200)

  // Inject themed fixtures (CSS from BoardIssuesMap / MapChrome already loaded with map)
  await page.evaluate(() => {
    const host =
      document.querySelector('[data-testid="feed-map-area"]') ||
      document.querySelector('[data-testid="board-issues-map"]') ||
      document.body
    host.style.position = host.style.position || 'relative'
    host.style.minHeight = host.style.minHeight || '360px'

    const mk = (cls, testid, html) => {
      let el = document.querySelector(`[data-testid="${testid}"]`)
      if (!el) {
        el = document.createElement('div')
        el.className = cls
        el.setAttribute('data-testid', testid)
        el.setAttribute('data-nf24', 'true')
        el.setAttribute('role', 'dialog')
        host.appendChild(el)
      }
      el.innerHTML = html
      return el
    }

    mk(
      'board-issues-map-leaves',
      'board-map-cluster-leaves',
      `<h3>Issues here</h3>
       <ul class="board-issues-map-leaves-list" data-testid="board-map-cluster-leaves-list">
         <li><a class="board-issues-map-leaves-link" href="#"><span class="board-issues-map-leaves-title">Leaf A</span><span class="board-issues-map-leaves-label">Tallinn</span></a></li>
         <li><a class="board-issues-map-leaves-link" href="#"><span class="board-issues-map-leaves-title">Leaf B</span></a></li>
       </ul>
       <button type="button" class="board-issues-map-popup-close" aria-label="Close">×</button>`,
    )

    mk(
      'board-issues-map-popup',
      'board-map-pin-popup',
      `<h3>Pin title</h3><p class="board-issues-map-popup-label">Label</p>
       <a class="board-issues-map-popup-open" href="#">Open</a>
       <button type="button" class="board-issues-map-popup-close" aria-label="Close">×</button>`,
    )

    mk(
      'map-issue-preview',
      'map-issue-preview',
      `<h3 class="map-issue-preview__title">Preview</h3>
       <p class="map-issue-preview__context">Public context</p>
       <a class="map-issue-preview__open" href="#">Open issue</a>
       <button type="button" class="map-issue-preview__close" aria-label="Close">×</button>`,
    )
  })
  await sleep(300)

  const probeLight = await page.evaluate(() => {
    const leaves = document.querySelector('[data-testid="board-map-cluster-leaves"]')
    const popup = document.querySelector('[data-testid="board-map-pin-popup"]')
    const preview = document.querySelector('[data-testid="map-issue-preview"]')
    const cs = (el) => (el ? getComputedStyle(el) : null)
    return {
      leavesBg: cs(leaves)?.backgroundColor || null,
      leavesColor: cs(leaves)?.color || null,
      popupBg: cs(popup)?.backgroundColor || null,
      previewBg: cs(preview)?.backgroundColor || null,
      leavesNf24: leaves?.getAttribute('data-nf24') || null,
      popupNf24: popup?.getAttribute('data-nf24') || null,
      previewNf24: preview?.getAttribute('data-nf24') || null,
    }
  })

  if (isNavyRgb(probeLight.leavesBg)) fails.push('leaves-navy-light')
  if (isNavyRgb(probeLight.popupBg)) fails.push('popup-navy-light')
  if (isNavyRgb(probeLight.previewBg)) fails.push('preview-navy-light')

  const leavesEl = await page.waitForSelector('[data-testid="board-map-cluster-leaves"]', {
    timeout: 10000,
  })
  await shot(outDir, '01-leaves-sheet-light.png', leavesEl)

  const popupEl = await page.$('[data-testid="board-map-pin-popup"]')
  await shot(outDir, '02-pin-popup-theme.png', popupEl || leavesEl)

  const previewEl = await page.$('[data-testid="map-issue-preview"]')
  await shot(outDir, '03-map-issue-preview-light.png', previewEl || leavesEl)

  await setTheme('dark')
  await sleep(300)
  const probeDark = await page.evaluate(() => {
    const leaves = document.querySelector('[data-testid="board-map-cluster-leaves"]')
    const cs = leaves ? getComputedStyle(leaves) : null
    return {
      leavesBg: cs?.backgroundColor || null,
      leavesColor: cs?.color || null,
    }
  })
  // Dark held: sheet still visible (non-transparent) · not invent PASS
  if (!probeDark.leavesBg || probeDark.leavesBg === 'rgba(0, 0, 0, 0)') {
    fails.push('dark-leaves-missing')
  }
  await shot(outDir, '04-leaves-dark-held.png', leavesEl)

  await setTheme('light')
  await sleep(200)
  await shot(outDir, '05-theme-toggle-honesty.png', leavesEl)

  copyFileSync(path.join(outDir, '01-leaves-sheet-light.png'), path.join(storyShotDir, '01-story-root-leaves-light.png'))
  copyFileSync(path.join(outDir, '02-pin-popup-theme.png'), path.join(storyShotDir, '02-story-root-popup.png'))
  copyFileSync(path.join(outDir, '03-map-issue-preview-light.png'), path.join(storyShotDir, '03-story-root-preview-light.png'))

  for (const f of [
    '01-leaves-sheet-light.png',
    '02-pin-popup-theme.png',
    '03-map-issue-preview-light.png',
    '04-leaves-dark-held.png',
    '05-theme-toggle-honesty.png',
  ]) {
    copyFileSync(path.join(outDir, f), path.join(baselineDir, f))
  }

  const meta = {
    story: 'STORY-SPA-NF-24-map-leaves-sheet-theme',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    partial_visual: 'BLOCK',
    invent_pass: false,
    invent_basemap: false,
    fails,
    probeLight,
    probeDark,
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
        story: 'STORY-SPA-NF-24-map-leaves-sheet-theme',
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
