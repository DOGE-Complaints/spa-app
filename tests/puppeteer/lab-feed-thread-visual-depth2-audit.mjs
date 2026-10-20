/**
 * Depth 2.0 — atom chrome audit (getComputedStyle + bbox + crops).
 * CT-18: M153b A–D token Match → HARD_FAIL on mismatch (Partial visual=BLOCK until OP eye).
 *
 *   PUBLIC_BOARD_URL=http://127.0.0.1:5173 node tests/puppeteer/lab-feed-thread-visual-depth2-audit.mjs
 *
 * Evidence: spa-app/docs/analysis/lab-feed-thread-visual-depth2-2026-10-20/
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const EVIDENCE = path.resolve(
  SPA_ROOT,
  'docs/analysis/lab-feed-thread-visual-depth2-2026-10-20',
)
const BASE = process.env.PUBLIC_BOARD_URL || 'http://127.0.0.1:5173'
const LAB_URL = `${BASE.replace(/\/$/, '')}/#/lab/feed`

const STYLE_PROPS = [
  'color',
  'background-color',
  'border-top-width',
  'border-top-style',
  'border-top-color',
  'border-right-width',
  'border-right-style',
  'border-right-color',
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color',
  'border-left-width',
  'border-left-style',
  'border-left-color',
  'border-radius',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'gap',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'box-shadow',
  'opacity',
  'min-height',
  'min-width',
  'width',
  'height',
]

/** @type {Array<{ id: string, state: string, scope: string, sel: string, required?: boolean }>} */
const ATOMS = [
  // collapsed card 001
  { id: 'A-block', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="tm-issue-thread-block"]', required: true },
  { id: 'A-heading', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="tm-thread-heading-title"]', required: true },
  { id: 'A-preview', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="tm-thread-preview-body"]', required: true },
  { id: 'A-view', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="tm-thread-view-discussion"]', required: true },
  { id: 'A-entry-pill', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="tm-thread-composer-entry"]', required: true },
  { id: 'H-strip', state: 'collapsed-001', scope: 'card-001', sel: '[data-testid="feed-post-action-strip"]', required: true },

  // residents 002 collapsed
  { id: 'A-residents', state: 'collapsed-002', scope: 'card-002', sel: '[data-testid="tm-thread-residents-row"]', required: true },

  // expanded nest 002
  { id: 'T-tree', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-tree"]', required: true },
  { id: 'T-bubble', state: 'expand-002', scope: 'card-002', sel: '.tm-comment-node__bubble', required: true },
  { id: 'T-body', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-body"]', required: true },
  { id: 'T-actions', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-actions"]', required: true },
  { id: 'T-pill-reply', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-reply"]', required: true },
  { id: 'T-pill-react', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-react-pill"]', required: false },
  { id: 'T-sep', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-action-sep"]', required: false },
  { id: 'T-reply-icon', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-comment-reply-icon"]', required: false },
  { id: 'T-branch-view', state: 'expand-002', scope: 'card-002', sel: '[data-testid^="tm-comment-view-replies-"]', required: false },
  { id: 'C-shell', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-thread-composer"]', required: true },
  { id: 'C-root-label', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-root-label"]', required: true },
  { id: 'C-textarea', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-textarea"]', required: true },
  { id: 'C-attach', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-attach"]', required: true },
  { id: 'C-attach-icon', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-attach-icon"]', required: true },
  { id: 'C-post', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-post"]', required: true },
  { id: 'C-send-icon', state: 'expand-002', scope: 'card-002', sel: '[data-testid="tm-composer-send-icon"]', required: true },

  // after branch expand — spine/elbow
  { id: 'T-spine-children', state: 'branch-002', scope: 'card-002', sel: '[data-tm-spine="true"]', required: false },
  { id: 'T-elbow', state: 'branch-002', scope: 'card-002', sel: '[data-tm-spine-elbow="true"]', required: false },

  // reply armed
  { id: 'C-reply-ctx', state: 'reply-002', scope: 'card-002', sel: '[data-testid="tm-composer-reply-context"]', required: true },
  { id: 'C-excerpt', state: 'reply-002', scope: 'card-002', sel: '[data-testid="tm-composer-parent-excerpt"]', required: false },
  { id: 'C-cancel', state: 'reply-002', scope: 'card-002', sel: '[data-testid="tm-composer-cancel-reply"]', required: true },
  { id: 'C-post-reply', state: 'reply-002', scope: 'card-002', sel: '[data-testid="tm-composer-post"]', required: true },

  // attach chip · CT-17 native pick required · click-only no longer paints chip (CT-19 §7 paint)
  { id: 'C-chip', state: 'attach-001', scope: 'card-001', sel: '[data-tm-attach-status]', required: false },
  { id: 'C-chip-ready', state: 'attach-001', scope: 'card-001', sel: '[data-testid="tm-attachment-ready"]', required: false },
  { id: 'C-chip-remove', state: 'attach-001', scope: 'card-001', sel: '[data-testid^="tm-attachment-remove-"]', required: false },

  // narrow 004 expanded
  { id: 'C-shell-narrow', state: 'narrow-004', scope: 'card-004', sel: '[data-testid="tm-thread-composer"]', required: true },
  { id: 'T-bubble-narrow', state: 'narrow-004', scope: 'card-004', sel: '.tm-comment-node__bubble', required: true },

  // CT-08 stands
  { id: 'A-empty-icon', state: 'ct08-empty', scope: 'ct08-B', sel: '[data-testid="tm-thread-empty-icon"]', required: false },
  { id: 'A-empty-lead', state: 'ct08-empty', scope: 'ct08-B', sel: '[data-testid="tm-thread-empty"] .tm-issue-thread-block__lead', required: false },
  { id: 'A-skeleton', state: 'ct08-loading', scope: 'ct08-A', sel: '[data-testid="tm-thread-skeleton"] span', required: false },
  { id: 'A-retry', state: 'ct08-unavail', scope: 'ct08-D', sel: '[data-testid="tm-thread-retry"]', required: false },
  { id: 'C-fail', state: 'ct08-fail', scope: 'ct08', sel: '[data-testid="tm-composer-fail"]', required: false },
  { id: 'T-max-depth', state: 'ct08-tree', scope: 'ct08', sel: '[data-testid="tm-comment-max-depth"]', required: false },
]

const hardFails = []
const notes = []
/** @type {Record<string, object>} */
const byState = {}

function cardSel(scope) {
  if (scope === 'card-001') return '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-001"]'
  if (scope === 'card-002') return '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]'
  if (scope === 'card-004') return '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-004"]'
  if (scope.startsWith('ct08')) return '[data-testid="feed-lab-ct08-stands"]'
  return 'body'
}

async function waitLab(page) {
  await page.goto('about:blank')
  await page.goto(LAB_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 30000 })
  await page.waitForFunction(
    () => document.querySelectorAll('[data-testid^="feed-post-card-DOGEstonia"]').length >= 5,
    { timeout: 15000 },
  )
  await sleep(400)
}

async function expandCard(page, publicId) {
  const id = `DOGEstonia-UusVeerenni-${publicId}`
  await page.$eval(`[data-testid="feed-post-card-${id}"]`, (el) =>
    el.scrollIntoView({ block: 'center' }),
  )
  await sleep(100)
  await page.evaluate((pid) => {
    const card = document.querySelector(`[data-testid="feed-post-card-${pid}"]`)
    const m = card?.querySelector('[data-testid="tm-thread-mount"]')
    if (m?.getAttribute('data-tm-expanded') === 'true') return
    card?.querySelector('[data-testid="tm-thread-view-discussion"]')?.click()
  }, id)
  await page.waitForFunction(
    (pid) => {
      const card = document.querySelector(`[data-testid="feed-post-card-${pid}"]`)
      return (
        card?.querySelector('[data-testid="tm-thread-mount"]')?.getAttribute('data-tm-expanded') ===
        'true'
      )
    },
    { timeout: 10000 },
    id,
  )
  await sleep(200)
}

async function measureAtom(page, atom) {
  const root = cardSel(atom.scope)
  const result = await page.evaluate(
    (rootSel, sel, props) => {
      const root = document.querySelector(rootSel) || document.body
      const el = root.querySelector(sel)
      if (!el) return { ok: false, reason: 'missing' }
      el.scrollIntoView({ block: 'center', inline: 'nearest' })
      const cs = getComputedStyle(el)
      const styles = {}
      for (const p of props) styles[p] = cs.getPropertyValue(p)
      const r = el.getBoundingClientRect()
      const cssVars = {}
      for (const name of [
        '--tm-indent-step',
        '--tm-spine-color',
        '--tm-bubble-fill',
        '--tm-bubble-border',
        '--tm-action-group-fill',
        '--tm-action-text',
        '--tm-reply-parent-marker',
        '--color-border-default',
        '--color-action-yellow',
        '--color-text-primary',
        '--color-text-secondary',
        '--color-surface-elevated',
        '--color-page-bg',
        '--color-text-link',
      ]) {
        const v = cs.getPropertyValue(name).trim()
        if (v) cssVars[name] = v
      }
      return {
        ok: true,
        styles,
        cssVars,
        bbox: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height),
        },
        tag: el.tagName.toLowerCase(),
        testid: el.getAttribute('data-testid') || null,
      }
    },
    root,
    atom.sel,
    STYLE_PROPS,
  )
  return result
}

async function cropAtom(page, atom, fileBase) {
  const root = cardSel(atom.scope)
  const handle = await page.evaluateHandle(
    (rootSel, sel) => {
      const root = document.querySelector(rootSel) || document.body
      return root.querySelector(sel)
    },
    root,
    atom.sel,
  )
  const el = handle.asElement()
  if (!el) return null
  const file = path.join(EVIDENCE, 'crops', `${fileBase}.png`)
  try {
    await el.screenshot({ path: file })
    return path.relative(EVIDENCE, file)
  } catch {
    return null
  } finally {
    await handle.dispose()
  }
}

async function prepareState(page, state) {
  if (state === 'collapsed-001' || state === 'collapsed-002') {
    await waitLab(page)
    return
  }
  if (state === 'expand-002') {
    await waitLab(page)
    await expandCard(page, '002')
    return
  }
  if (state === 'branch-002') {
    await waitLab(page)
    await expandCard(page, '002')
    await page.evaluate(() => {
      const card = document.querySelector(
        '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
      )
      card?.querySelector('[data-testid^="tm-comment-view-replies-"]')?.click()
    })
    await sleep(500)
    return
  }
  if (state === 'reply-002') {
    await waitLab(page)
    await expandCard(page, '002')
    await page.evaluate(() => {
      const card = document.querySelector(
        '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
      )
      card?.querySelector('[data-testid="tm-comment-reply"]')?.click()
    })
    await sleep(300)
    return
  }
  if (state === 'attach-001') {
    await waitLab(page)
    await expandCard(page, '001')
    await page.evaluate(() => {
      const card = document.querySelector(
        '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-001"]',
      )
      card?.querySelector('[data-testid="tm-composer-attach"]')?.click()
    })
    await sleep(300)
    return
  }
  if (state === 'narrow-004') {
    await waitLab(page)
    await expandCard(page, '004')
    return
  }
  if (state.startsWith('ct08-')) {
    await waitLab(page)
    await page.evaluate(() => {
      document.querySelector('[data-testid="feed-lab-ct08-stands"]')?.scrollIntoView({
        block: 'start',
      })
    })
    await sleep(300)
    return
  }
}

async function main() {
  await mkdir(path.join(EVIDENCE, 'crops'), { recursive: true })
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : undefined)
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  const states = [...new Set(ATOMS.map((a) => a.state))]
  try {
    for (const state of states) {
      await prepareState(page, state)
      byState[state] = { state, atoms: {} }

      // optional root font-size for rem→px
      const rootFs = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)
      byState[state].rootFontSize = rootFs

      const atoms = ATOMS.filter((a) => a.state === state)
      for (const atom of atoms) {
        const key = `${atom.id}`
        const measured = await measureAtom(page, atom)
        if (!measured.ok) {
          byState[state].atoms[key] = {
            id: atom.id,
            sel: atom.sel,
            status: 'missing',
            required: Boolean(atom.required),
          }
          if (atom.required) {
            hardFails.push({ id: atom.id, state, detail: `required atom missing: ${atom.sel}` })
          } else {
            notes.push(`${atom.id}@${state}: unreachable/missing`)
          }
          continue
        }
        const cropRel = await cropAtom(page, atom, `${atom.id}__${state}`)
        byState[state].atoms[key] = {
          id: atom.id,
          sel: atom.sel,
          status: 'measured',
          ...measured,
          crop: cropRel,
        }
        if (!measured.styles || Object.keys(measured.styles).length === 0) {
          hardFails.push({ id: atom.id, state, detail: 'empty style dump' })
        }
      }

      // indent step from first comment node in nest states
      if (state === 'expand-002' || state === 'branch-002' || state === 'narrow-004') {
        const indent = await page.evaluate((scope) => {
          const root =
            document.querySelector(
              scope === 'narrow-004'
                ? '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-004"]'
                : '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
            ) || document.body
          const node = root.querySelector('.tm-comment-node')
          if (!node) return null
          const cs = getComputedStyle(node)
          return {
            indentStep: cs.getPropertyValue('--tm-indent-step').trim(),
            spineColor: cs.getPropertyValue('--tm-spine-color').trim(),
            bubbleFill: cs.getPropertyValue('--tm-bubble-fill').trim(),
          }
        }, state)
        byState[state].tmVars = indent
      }
    }

    // CT-18 M153b A–D HARD_FAIL gate (computedStyle Match · not OP eye)
    {
      await waitLab(page)
      await expandCard(page, '002')
      await page.evaluate(() => {
        const card = document.querySelector(
          '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
        )
        card?.querySelector('[data-testid^="tm-comment-view-replies-"]')?.click()
      })
      await sleep(500)
      const m153b = await page.evaluate(() => {
        const card = document.querySelector(
          '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
        )
        const node = card?.querySelector('.tm-comment-node')
        const bubble = card?.querySelector('.tm-comment-node__bubble')
        const kids = card?.querySelector('[data-tm-spine="true"]')
        const elbow = card?.querySelector('[data-tm-spine-elbow="true"]')
        const pills = card?.querySelector('[data-testid="tm-comment-action-pills"]')
        const reply = card?.querySelector('[data-testid="tm-comment-reply"]')
        const react = card?.querySelector('[data-testid="tm-comment-react-pill"]')
        const sep = card?.querySelector('[data-testid="tm-comment-action-sep"]')
        const b = bubble ? getComputedStyle(bubble) : null
        const n = node ? getComputedStyle(node) : null
        const p = pills ? getComputedStyle(pills) : null
        const r = reply ? getComputedStyle(reply) : null
        return {
          bubbleBg: b?.backgroundColor,
          bubbleBorder: b?.borderTopColor,
          bubbleBorderW: b?.borderTopWidth,
          bubbleRadius: b?.borderTopLeftRadius,
          bubblePadT: b?.paddingTop,
          bubblePadL: b?.paddingLeft,
          indentStep: n?.getPropertyValue('--tm-indent-step')?.trim(),
          spineColor: kids ? getComputedStyle(kids).borderLeftColor : null,
          spineW: kids ? getComputedStyle(kids).borderLeftWidth : null,
          elbowColor: elbow ? getComputedStyle(elbow).borderBottomColor : null,
          elbowRadius: elbow ? getComputedStyle(elbow).borderBottomLeftRadius : null,
          groupBg: p?.backgroundColor,
          replyColor: r?.color,
          replyMinH: r?.minHeight,
          replyH: reply ? Math.round(reply.getBoundingClientRect().height) : 0,
          reactH: react ? Math.round(react.getBoundingClientRect().height) : 0,
          sepH: sep ? Math.round(sep.getBoundingClientRect().height) : 0,
          sepW: sep ? Math.round(sep.getBoundingClientRect().width) : 0,
        }
      })
      await page.evaluate(() => {
        const card = document.querySelector(
          '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
        )
        card?.querySelector('[data-testid="tm-comment-reply"]')?.click()
      })
      await sleep(300)
      const m153bD = await page.evaluate(() => {
        const card = document.querySelector(
          '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]',
        )
        const selected = card?.querySelector('[data-tm-reply-parent-selected="true"]')
        const bubble = selected?.querySelector('[data-testid="tm-comment-body"]')
        return {
          selected: Boolean(selected),
          marker: bubble?.getAttribute('data-tm-reply-parent-marker'),
          cls: bubble?.className || '',
          fill: bubble ? getComputedStyle(bubble).backgroundColor : null,
        }
      })
      byState['m153b-ad'] = { m153b, m153bD }
      const RGB = {
        bubble: 'rgb(247, 246, 242)',
        border: 'rgb(231, 228, 220)',
        spine: 'rgb(102, 112, 133)',
        action: 'rgb(181, 71, 8)',
        group: 'rgb(255, 253, 248)',
        blue: 'rgb(46, 144, 250)',
      }
      const near = (v, n) => {
        const m = String(v || '').match(/([\d.]+)/)
        return m && Math.abs(parseFloat(m[1]) - n) < 0.6
      }
      if (m153b.bubbleBg !== RGB.bubble)
        hardFails.push({ id: 'M153b-A', state: 'm153b-ad', detail: `fill ${m153b.bubbleBg}` })
      if (m153b.bubbleBorder !== RGB.border)
        hardFails.push({ id: 'M153b-A', state: 'm153b-ad', detail: `border ${m153b.bubbleBorder}` })
      if (!near(m153b.bubbleBorderW, 1) || !near(m153b.bubbleRadius, 12))
        hardFails.push({
          id: 'M153b-A',
          state: 'm153b-ad',
          detail: `geom ${m153b.bubbleBorderW}/${m153b.bubbleRadius}`,
        })
      if (!near(m153b.bubblePadT, 12) || !near(m153b.bubblePadL, 16))
        hardFails.push({
          id: 'M153b-A',
          state: 'm153b-ad',
          detail: `pad ${m153b.bubblePadT}/${m153b.bubblePadL}`,
        })
      if (m153b.indentStep !== '44px')
        hardFails.push({ id: 'M153b-B', state: 'm153b-ad', detail: `indent ${m153b.indentStep}` })
      if (m153b.spineColor !== RGB.spine || !near(m153b.spineW, 1))
        hardFails.push({
          id: 'M153b-B',
          state: 'm153b-ad',
          detail: `spine ${m153b.spineColor}/${m153b.spineW}`,
        })
      if (m153b.elbowColor !== RGB.spine || !near(m153b.elbowRadius, 6))
        hardFails.push({
          id: 'M153b-B',
          state: 'm153b-ad',
          detail: `elbow ${m153b.elbowColor}/${m153b.elbowRadius}`,
        })
      if (m153b.groupBg !== RGB.group)
        hardFails.push({ id: 'M153b-C', state: 'm153b-ad', detail: `group ${m153b.groupBg}` })
      if (m153b.replyColor !== RGB.action)
        hardFails.push({ id: 'M153b-C', state: 'm153b-ad', detail: `reply fg ${m153b.replyColor}` })
      if (m153b.replyColor === RGB.blue)
        hardFails.push({ id: 'M153b-C', state: 'm153b-ad', detail: '#2E90FA AS-IS' })
      if (!near(m153b.replyMinH, 44) || m153b.replyH < 44)
        hardFails.push({ id: 'M153b-C', state: 'm153b-ad', detail: `replyH ${m153b.replyH}` })
      if (m153b.reactH > 0 && m153b.reactH < 44)
        hardFails.push({ id: 'M153b-C', state: 'm153b-ad', detail: `reactH ${m153b.reactH}` })
      if (m153b.sepH !== 16 || m153b.sepW !== 1)
        hardFails.push({
          id: 'M153b-C',
          state: 'm153b-ad',
          detail: `sep ${m153b.sepW}x${m153b.sepH}`,
        })
      if (!m153bD.selected || m153bD.marker !== 'true')
        hardFails.push({ id: 'M153b-D', state: 'm153b-ad', detail: `parent ${JSON.stringify(m153bD)}` })
      if (!m153bD.cls.includes('tm-comment-node__bubble--reply-parent'))
        hardFails.push({ id: 'M153b-D', state: 'm153b-ad', detail: 'missing reply-parent class' })
      if (m153bD.fill !== RGB.bubble)
        hardFails.push({ id: 'M153b-D', state: 'm153b-ad', detail: `fill drift ${m153bD.fill}` })
    }

    // full-page evidence shots
    await waitLab(page)
    await page.screenshot({
      path: path.join(EVIDENCE, '00-feed-desktop.png'),
      fullPage: true,
    })
    await expandCard(page, '002')
    await page.evaluate(() => {
      document
        .querySelector('[data-testid="feed-post-card-DOGEstonia-UusVeerenni-002"]')
        ?.scrollIntoView({ block: 'start' })
    })
    await sleep(200)
    await page.screenshot({
      path: path.join(EVIDENCE, '01-card-002-expanded.png'),
      fullPage: false,
    })

    // Phase B.2 narrow viewport pass on card 004
    await page.setViewport({ width: 390, height: 844 })
    await waitLab(page)
    await expandCard(page, '004')
    const narrowPass = await page.evaluate(() => {
      const card = document.querySelector(
        '[data-testid="feed-post-card-DOGEstonia-UusVeerenni-004"]',
      )
      const node = card?.querySelector('.tm-comment-node')
      const composer = card?.querySelector('[data-testid="tm-thread-composer"]')
      const strip = card?.querySelector('[data-testid="feed-post-action-strip"]')
      const pick = (el) => {
        if (!el) return null
        const cs = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return {
          indentStep: cs.getPropertyValue('--tm-indent-step').trim() || null,
          sticky: composer?.getAttribute('data-lab-sticky-keyboard') || null,
          minHeight: cs.minHeight,
          height: Math.round(r.height),
          width: Math.round(r.width),
          paddingLeft: cs.paddingLeft,
          paddingRight: cs.paddingRight,
        }
      }
      return {
        viewport: '390x844',
        node: pick(node),
        composer: pick(composer),
        strip: strip
          ? {
              minHeight: getComputedStyle(strip).minHeight,
              height: Math.round(strip.getBoundingClientRect().height),
            }
          : null,
      }
    })
    byState['viewport-390'] = narrowPass
    await page.screenshot({
      path: path.join(EVIDENCE, '02-narrow-390-card-004.png'),
      fullPage: true,
    })
  } finally {
    await browser.close()
  }

  const report = {
    utc: new Date().toISOString(),
    url: LAB_URL,
    hardFailCount: hardFails.length,
    hardFails,
    notes,
    states: byState,
  }
  await writeFile(path.join(EVIDENCE, 'computed-dump.json'), JSON.stringify(report, null, 2))

  const md = [
    '# Lab feed thread visual Depth 2.0 — raw run',
    '',
    `> **UTC:** ${report.utc}`,
    `> **URL:** ${LAB_URL}`,
    `> **HARD_FAIL (measurement):** ${hardFails.length}`,
    '',
    '## Hard fails',
    '',
    hardFails.length
      ? hardFails.map((f) => `- **${f.id}@${f.state}:** ${f.detail}`).join('\n')
      : '_None_',
    '',
    '## Notes (optional missing)',
    '',
    notes.map((n) => `- ${n}`).join('\n') || '_None_',
    '',
    '## States captured',
    '',
    ...Object.keys(byState).map((s) => {
      const st = byState[s]
      if (!st.atoms) return `- \`${s}\` — viewport/meta`
      const n = Object.keys(st.atoms).length
      const ok = Object.values(st.atoms).filter((a) => a.status === 'measured').length
      return `- \`${s}\` — measured ${ok}/${n}`
    }),
    '',
    'Full dump: `computed-dump.json` · crops in `crops/`.',
    '',
  ].join('\n')
  await writeFile(path.join(EVIDENCE, 'AUDIT-RUN.md'), md)

  console.log(
    JSON.stringify(
      { hardFailCount: hardFails.length, states: Object.keys(byState).length, notes: notes.length },
      null,
      2,
    ),
  )
  if (hardFails.length) process.exitCode = 2
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
