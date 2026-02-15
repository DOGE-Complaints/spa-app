import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const VIEWPORT = { width: 1536, height: 1024 }
const TOLERANCE = 0.1

const ROOT = process.cwd()
const EXEC_LOG_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-execution-log.md')
const REPORT_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-puppeteer-validation-report.md')
const CHECKLIST_PATH = path.join(ROOT, 'docs/analysis/EPIC-03-personal-ui-validation-checklist.md')
const SCREENSHOT_DIR = path.join(ROOT, 'docs/analysis/validation/epic03')

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
      if (response.ok || response.status === 304) {
        return
      }
    } catch {
      // wait for server startup
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
  const lines = logContent.split('\n')
  for (const line of lines) {
    const match = line.match(/- `(S03-[^`]+)` — (.+)$/)
    if (!match) continue
    result.set(match[1], match[2].trim())
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
  ]
  for (const selector of selectors) {
    const node = await page.$(selector)
    if (!node) {
      throw new Error(`Missing selector: ${selector}`)
    }
  }

  const metrics = await page.evaluate(() => {
    const getRect = (selector) => {
      const node = document.querySelector(selector)
      if (!node) return null
      const rect = node.getBoundingClientRect()
      return { width: rect.width, height: rect.height }
    }

    const columns = Array.from(document.querySelectorAll('.board-column')).map((node) => {
      const rect = node.getBoundingClientRect()
      return rect.width
    })

    return {
      headerHeight: getRect('.header-strip')?.height ?? 0,
      sidebarWidth: getRect('.board-sidebar')?.width ?? 0,
      toolbarHeight: getRect('.board-toolbar')?.height ?? 0,
      columnsCount: columns.length,
      columnWidths: columns,
    }
  })

  const avgWidth =
    metrics.columnWidths.length > 0
      ? metrics.columnWidths.reduce((sum, value) => sum + value, 0) / metrics.columnWidths.length
      : 0
  const widthSpread =
    metrics.columnWidths.length > 0
      ? Math.max(...metrics.columnWidths) - Math.min(...metrics.columnWidths)
      : 0

  const checks = [
    {
      name: 'Header height ~= 72px (±10%)',
      pass: withinTolerance(metrics.headerHeight, 72),
      actual: metrics.headerHeight.toFixed(2),
    },
    {
      name: 'Sidebar width ~= 270px (±10%)',
      pass: withinTolerance(metrics.sidebarWidth, 270),
      actual: metrics.sidebarWidth.toFixed(2),
    },
    {
      name: 'Toolbar height ~= 64px (±10%)',
      pass: withinTolerance(metrics.toolbarHeight, 64),
      actual: metrics.toolbarHeight.toFixed(2),
    },
    {
      name: 'Board has exactly 4 columns',
      pass: metrics.columnsCount === 4,
      actual: String(metrics.columnsCount),
    },
    {
      name: 'Columns are near-equal width (spread <= 10% of avg)',
      pass: avgWidth > 0 ? widthSpread <= avgWidth * TOLERANCE : false,
      actual: `avg=${avgWidth.toFixed(2)}, spread=${widthSpread.toFixed(2)}`,
    },
  ]

  return { checks, metrics }
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
  lines.push('# EPIC-03 Puppeteer Validation Report')
  lines.push('')
  lines.push(`- Viewport: \`${VIEWPORT.width}x${VIEWPORT.height}\``)
  lines.push(`- Mockup tolerance: \`10%\``)
  lines.push('- Note: mockups are AI-generated; small visual deviations are accepted within tolerance.')
  lines.push('')
  lines.push('## Automated checks (available now)')
  lines.push('')
  for (const check of boardResult.checks) {
    lines.push(`- ${check.pass ? '✅' : '❌'} ${check.name} (actual: ${check.actual})`)
  }
  lines.push('')
  lines.push('## Story coverage matrix')
  lines.push('')
  lines.push('| Story | Execution status | Puppeteer status | Notes |')
  lines.push('|---|---|---|---|')

  const stories = [
    'S03-1',
    'S03-1A',
    'S03-1B',
    'S03-10',
    'S03-9',
    'S03-2',
    'S03-3',
    'S03-6',
    'S03-5',
    'S03-4',
    'S03-7',
    'S03-8',
  ]

  for (const story of stories) {
    const status = storyStatuses.get(story) ?? 'unknown'
    if (story === 'S03-1' || story === 'S03-1A') {
      const allPass = boardResult.checks.every((check) => check.pass)
      lines.push(
        `| ${story} | ${status} | ${allPass ? '✅ automated' : '❌ automated'} | Shell layout and geometry checked with ±10% tolerance |`,
      )
    } else {
      lines.push(
        `| ${story} | ${status} | ⏳ planned | Auto-validation scenario reserved; activates when story is implemented |`,
      )
    }
  }

  lines.push('')
  lines.push('## Current screenshots for manual review')
  lines.push('')
  lines.push(`- Board current: \`${path.relative(ROOT, screenshots.boardPath)}\``)
  lines.push(`- Issue details current: \`${path.relative(ROOT, screenshots.detailsPath)}\``)
  lines.push('')

  return `${lines.join('\n')}\n`
}

function renderChecklist(storyStatuses) {
  const lines = []
  lines.push('# EPIC-03 Personal UI Validation Checklist')
  lines.push('')
  lines.push('Use this checklist to manually compare runtime UI to mockup specs with **10% tolerance** on minor details.')
  lines.push('')
  lines.push('## Tolerance rules')
  lines.push('')
  lines.push('- Geometry tolerance for key blocks: `<= 10%`.')
  lines.push('- Minor text/icon/pixel noise from AI mockups is acceptable.')
  lines.push('- Semantic structure and state behavior must match SSOT exactly.')
  lines.push('')
  lines.push('## Validation by story')
  lines.push('')

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

  lines.push('')
  lines.push('## Evidence files')
  lines.push('')
  lines.push('- `docs/analysis/EPIC-03-puppeteer-validation-report.md`')
  lines.push('- `docs/analysis/validation/epic03/board-default-current.png`')
  lines.push('- `docs/analysis/validation/epic03/issue-details-current.png`')
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

    const logContent = await fs.readFile(EXEC_LOG_PATH, 'utf8')
    const storyStatuses = parseStoryStatuses(logContent)

    const boardResult = await collectBoardMetrics(page)
    const screenshots = await captureScreenshots(page)

    await browser.close()

    const report = renderReport(storyStatuses, boardResult, screenshots)
    const checklist = renderChecklist(storyStatuses)
    await fs.writeFile(REPORT_PATH, report, 'utf8')
    await fs.writeFile(CHECKLIST_PATH, checklist, 'utf8')
  } finally {
    if (!devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exitCode = 1
})
