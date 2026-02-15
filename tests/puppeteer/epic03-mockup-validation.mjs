import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const VIEWPORT = { width: 1536, height: 1024 }
const TOLERANCE = 0.1

const EXEC_LOG_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-execution-log.md')
const REPORT_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-puppeteer-validation-report.md')
const CHECKLIST_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-personal-ui-validation-checklist.md')
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')
const HISTORY_PATH = path.join(ROOT, 'docs/analysis/validation/epic03/run-history.md')

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    { cwd: ROOT, stdio: 'pipe' },
  )
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) return
    } catch {
      // server not ready yet
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready in time')
}

function withinTolerance(actual, target, tolerance = TOLERANCE) {
  return Math.abs(actual - target) <= target * tolerance
}

function parseStoryStatuses(logContent) {
  const result = new Map()
  for (const line of logContent.split('\n')) {
    const match = line.match(/- `(S03-[^`]+)` — (.+)$/)
    if (match) result.set(match[1], match[2].trim())
  }
  return result
}

async function collectBoardMetrics(page) {
  await page.goto('http://127.0.0.1:4173/#/board', { waitUntil: 'networkidle0' })

  const selectors = [
    '.board-shell',
    '.header-strip',
    '.board-main',
    '.board-sidebar',
    '.board-toolbar',
    '.board-columns',
    '.board-column',
    '.board-footer',
    '.header-locale-trigger',
  ]
  for (const selector of selectors) {
    if (!(await page.$(selector))) throw new Error(`Missing selector: ${selector}`)
  }

  const metrics = await page.evaluate(() => {
    const rect = (selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { width: r.width, height: r.height }
    }

    const columns = Array.from(document.querySelectorAll('.board-column')).map((el) => el.getBoundingClientRect().width)
    const logo = document.querySelector('.header-brand-logo')
    const logoLoaded = logo instanceof HTMLImageElement ? logo.complete && logo.naturalWidth > 0 : false

    return {
      headerHeight: rect('.header-strip')?.height ?? 0,
      sidebarWidth: rect('.board-sidebar')?.width ?? 0,
      toolbarHeight: rect('.board-toolbar')?.height ?? 0,
      columnsCount: columns.length,
      columnWidths: columns,
      hasLogoImageLoaded: logoLoaded,
      statusBadgesCount: document.querySelectorAll('.status-badge').length,
      inReviewLabel: (document.querySelector('.status-badge-in-review .status-badge-label')?.textContent ?? '').trim(),
    }
  })

  const avgWidth = metrics.columnWidths.length
    ? metrics.columnWidths.reduce((sum, item) => sum + item, 0) / metrics.columnWidths.length
    : 0
  const spread = metrics.columnWidths.length ? Math.max(...metrics.columnWidths) - Math.min(...metrics.columnWidths) : 0

  const checks = [
    { name: 'Header height ~= 72px (±10%)', pass: withinTolerance(metrics.headerHeight, 72), actual: metrics.headerHeight.toFixed(2) },
    { name: 'Sidebar width ~= 270px (±10%)', pass: withinTolerance(metrics.sidebarWidth, 270), actual: metrics.sidebarWidth.toFixed(2) },
    { name: 'Toolbar height ~= 64px (±10%)', pass: withinTolerance(metrics.toolbarHeight, 64), actual: metrics.toolbarHeight.toFixed(2) },
    { name: 'Board has exactly 4 columns', pass: metrics.columnsCount === 4, actual: String(metrics.columnsCount) },
    { name: 'Columns are near-equal width (spread <= 10% of avg)', pass: avgWidth > 0 ? spread <= avgWidth * TOLERANCE : false, actual: `avg=${avgWidth.toFixed(2)}, spread=${spread.toFixed(2)}` },
    { name: 'Header logo image is loaded', pass: metrics.hasLogoImageLoaded, actual: metrics.hasLogoImageLoaded ? 'yes' : 'no' },
    { name: 'Status badge system renders 4 badges', pass: metrics.statusBadgesCount >= 4, actual: String(metrics.statusBadgesCount) },
    {
      name: 'IN_REVIEW enum has localized display label',
      pass: ['IN REVIEW', 'НА РАССМОТРЕНИИ', 'LÄBIVAATUSEL'].includes(metrics.inReviewLabel),
      actual: metrics.inReviewLabel || 'empty',
    },
  ]

  const routeBefore = page.url()
  await page.$eval('.header-locale-trigger', (node) => node.click())
  await page.waitForFunction(() => Boolean(document.querySelector('.header-locale-menu')))
  const localeOptions = await page.$$eval('.header-locale-option', (nodes) => nodes.map((node) => node.textContent?.trim() ?? ''))
  const localeFlagsCount = await page.$$eval('.header-locale-menu .header-locale-flag', (nodes) => nodes.length)
  const localeButtons = await page.$$('.header-locale-option')
  if (localeButtons[1]) {
    await localeButtons[1].click()
    await page.waitForFunction(
      () => document.querySelector('.board-toolbar h2')?.textContent?.trim() === 'Доска',
      { timeout: 3000 },
    )
  }

  const routeAfter = page.url()
  const storedLocale = await page.evaluate(() => localStorage.getItem('doge.locale'))
  checks.push(
    {
      name: 'Language selector open-state exposes Eesti/Русский/English options',
      pass: localeOptions.length === 3 && localeOptions[0] === 'Eesti' && localeOptions[1] === 'Русский' && localeOptions[2] === 'English',
      actual: localeOptions.join(' | '),
    },
    {
      name: 'Locale switch keeps hash route unchanged',
      pass: routeBefore === routeAfter,
      actual: `${routeBefore} -> ${routeAfter}`,
    },
    {
      name: 'Locale is persisted to localStorage',
      pass: storedLocale === 'ru',
      actual: String(storedLocale),
    },
    {
      name: 'Language selector renders flags for all options',
      pass: localeFlagsCount === 3,
      actual: String(localeFlagsCount),
    },
  )

  return { checks }
}

async function captureScreenshots(page) {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true })
  const boardPath = path.join(SCREENSHOT_DIR, 'board-default-current.png')
  await page.goto('http://127.0.0.1:4173/#/board', { waitUntil: 'networkidle0' })
  await page.screenshot({ path: boardPath, fullPage: true })

  const detailsPath = path.join(SCREENSHOT_DIR, 'issue-details-current.png')
  await page.goto('http://127.0.0.1:4173/#/issue/DE-042', { waitUntil: 'networkidle0' })
  await page.screenshot({ path: detailsPath, fullPage: true })

  return { boardPath, detailsPath }
}

function renderReport(storyStatuses, boardResult, screenshots) {
  const lines = []
  lines.push('# EPIC-03 Puppeteer Validation Report', '', '- Viewport: `1536x1024`', '- Mockup tolerance: `10%`', '- Note: mockups are AI-generated; small visual deviations are accepted within tolerance.', '', '## Automated checks (available now)', '')
  for (const check of boardResult.checks) lines.push(`- ${check.pass ? '✅' : '❌'} ${check.name} (actual: ${check.actual})`)
  lines.push('', '## Story coverage matrix', '', '| Story | Execution status | Puppeteer status | Notes |', '|---|---|---|---|')

  const stories = ['S03-1', 'S03-1A', 'S03-1B', 'S03-10', 'S03-9', 'S03-2', 'S03-3', 'S03-6', 'S03-5', 'S03-4', 'S03-7', 'S03-8']
  for (const story of stories) {
    const status = storyStatuses.get(story) ?? 'unknown'
    if (story === 'S03-1' || story === 'S03-1A' || story === 'S03-1B') {
      const pass = boardResult.checks.every((item) => item.pass)
      const note = story === 'S03-1B' ? 'Status badges checked (4 variants, IN REVIEW label)' : 'Shell layout and geometry checked with ±10% tolerance'
      lines.push(`| ${story} | ${status} | ${pass ? '✅ automated' : '❌ automated'} | ${note} |`)
    } else if (story === 'S03-10') {
      const i18nCheckNames = new Set([
        'Language selector open-state exposes Eesti/Русский/English options',
        'Locale switch keeps hash route unchanged',
        'Locale is persisted to localStorage',
        'Language selector renders flags for all options',
      ])
      const i18nChecks = boardResult.checks.filter((check) => i18nCheckNames.has(check.name))
      const pass = i18nChecks.length === i18nCheckNames.size && i18nChecks.every((check) => check.pass)
      lines.push(`| ${story} | ${status} | ${pass ? '✅ automated' : '❌ automated'} | I18n switcher contract checked (M17/M20): options, route stability, locale persistence |`)
    } else {
      lines.push(`| ${story} | ${status} | ⏳ planned | Auto-validation scenario reserved; activates when story is implemented |`)
    }
  }

  lines.push('', '## Current screenshots for manual review', '', `- Board current: \`${path.relative(ROOT, screenshots.boardPath)}\``, `- Issue details current: \`${path.relative(ROOT, screenshots.detailsPath)}\``, '')
  return `${lines.join('\n')}\n`
}

function renderChecklist(storyStatuses) {
  const lines = []
  lines.push('# EPIC-03 Personal UI Validation Checklist', '', 'Use this checklist to manually compare runtime UI to mockup specs with **10% tolerance** on minor details.', '', '## Tolerance rules', '', '- Geometry tolerance for key blocks: `<= 10%`.', '- Minor text/icon/pixel noise from AI mockups is acceptable.', '- Semantic structure and state behavior must match SSOT exactly.', '', '## Validation by story', '')

  const checks = [
    ['S03-1/S03-1A', 'M01, M19', 'Header strip, sidebar, toolbar, 4 columns, board footer'],
    ['S03-1B', 'M03', 'Status badge system and visual hierarchy'],
    ['S03-10', 'M17, M20', 'Language trigger behavior/open-state and locale switching'],
    ['S03-9', 'M15', 'Routing scenarios A/B/C/D and URL-state recovery'],
    ['S03-2', 'M02, M04, M16', 'Issue card fields and interaction states'],
    ['S03-3', 'M10, M11, M12, M13', 'Filters, clear/reset, query-state'],
    ['S03-6', 'M05, M06, M07, M08', 'Loading/empty/no-results/error states'],
    ['S03-5', 'M16, M18', 'Service lifecycle wiring to state components'],
    ['S03-4', 'M09, M14, M18', 'Details screen and metadata variants'],
    ['S03-7', 'M19 + design system', 'Branding and VERIFIED UI'],
    ['S03-8', 'M01 + UX rules', 'Create Issue CTA to Custom GPT'],
  ]
  for (const [story, mockups, scope] of checks) {
    const key = story.split('/')[0]
    const status = storyStatuses.get(key) ?? 'unknown'
    lines.push(`- [ ] ${story} (${status}) — ${mockups} — ${scope}`)
  }

  lines.push('', '## Evidence files', '', '- `docs/analysis/EPIC-03-puppeteer-validation-report.md`', '- `docs/analysis/validation/epic03/board-default-current.png`', '- `docs/analysis/validation/epic03/issue-details-current.png`', '')
  return `${lines.join('\n')}\n`
}

function renderHistoryEntry(boardResult) {
  const timestamp = new Date().toISOString()
  const passed = boardResult.checks.filter((check) => check.pass).length
  const total = boardResult.checks.length
  const failed = boardResult.checks.filter((check) => !check.pass)
  const lines = []
  lines.push(`## Run ${timestamp}`, '', `- Result: ${passed}/${total} checks passed`, '- Command: `npm run test:ui:epic03`')
  if (failed.length) {
    lines.push('- Failed checks:')
    for (const check of failed) lines.push(`  - ${check.name} (actual: ${check.actual})`)
  } else {
    lines.push('- Failed checks: none')
  }
  lines.push('')
  return `${lines.join('\n')}\n`
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer('http://127.0.0.1:4173')
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    const storyStatuses = parseStoryStatuses(await fs.readFile(EXEC_LOG_PATH, 'utf8'))
    const boardResult = await collectBoardMetrics(page)
    const screenshots = await captureScreenshots(page)

    await browser.close()

    await fs.writeFile(REPORT_PATH, renderReport(storyStatuses, boardResult, screenshots), 'utf8')
    await fs.writeFile(CHECKLIST_PATH, renderChecklist(storyStatuses), 'utf8')
    try {
      await fs.access(HISTORY_PATH)
    } catch {
      await fs.writeFile(HISTORY_PATH, '# EPIC-03 Puppeteer Run History\n\n', 'utf8')
    }
    await fs.appendFile(HISTORY_PATH, renderHistoryEntry(boardResult), 'utf8')
  } finally {
    if (!devServer.killed) devServer.kill('SIGTERM')
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exitCode = 1
})
