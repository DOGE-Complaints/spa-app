/**
 * GFL-DRIVEN board data smoke — requires live gateway at VITE_GATEWAY_BASE_URL.
 * Fails with contract details when API issues lack id/status (board columns stay empty).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const ROOT = process.cwd()
const BASE = 'http://127.0.0.1:4173'
const GATEWAY = (process.env.VITE_GATEWAY_BASE_URL ?? 'http://127.0.0.1:8000').replace(/\/+$/, '')
const VALIDATION_DIR = path.join(ROOT, 'docs/analysis/validation')

const REQUIRED_KEYS = ['id', 'status', 'type', 'labels', 'title', 'summary', 'description']
const ALLOWED_STATUS = new Set(['NEW', 'IN_REVIEW', 'PUBLISHED'])

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    { cwd: ROOT, stdio: 'pipe', env: { ...process.env } },
  )
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) return
    } catch {
      // boot
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready in time')
}

async function fetchGatewayContract() {
  const response = await fetch(`${GATEWAY}/tallinn/issues`)
  if (!response.ok) {
    throw new Error(`Gateway ${GATEWAY}/tallinn/issues returned ${response.status}`)
  }
  const envelope = await response.json()
  const issues = envelope?.data?.issues ?? []
  const violations = []
  for (let i = 0; i < issues.length; i += 1) {
    const issue = issues[i]
    for (const key of REQUIRED_KEYS) {
      if (!(key in issue)) violations.push(`issues[${i}] missing ${key}`)
    }
    if (issue.status && !ALLOWED_STATUS.has(issue.status)) {
      violations.push(`issues[${i}] invalid status ${JSON.stringify(issue.status)}`)
    }
  }
  const withStatus = issues.filter((issue) => ALLOWED_STATUS.has(issue.status))
  return { issues, violations, withStatus }
}

async function run() {
  const { issues, violations, withStatus } = await fetchGatewayContract()
  console.log(`[gfl-smoke] gateway issues count=${issues.length} contract_violations=${violations.length}`)

  if (violations.length > 0) {
    console.error('[gfl-smoke] API contract violations (backend fix required):')
    violations.slice(0, 20).forEach((v) => console.error(`  - ${v}`))
    if (issues[0]) {
      console.error('[gfl-smoke] sample issue keys:', Object.keys(issues[0]).join(', '))
    }
    process.exitCode = 1
    return
  }

  const devServer = startViteDevServer()
  try {
    await waitForServer(BASE)
    await fs.mkdir(VALIDATION_DIR, { recursive: true })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    await page.goto(`${BASE}/#/board`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('.board-columns', { timeout: 15000 })

    const cardCount = await page.$$eval('.issue-card', (els) => els.length)
    const columnCounts = await page.$$eval('.board-column-header span', (spans) =>
      spans.map((s) => s.textContent?.trim() ?? ''),
    )

    await page.screenshot({
      path: path.join(VALIDATION_DIR, 'gfl-driven-board-smoke.png'),
      fullPage: true,
    })

    await browser.close()

    console.log('[gfl-smoke] column counts:', columnCounts.join(', '))
    console.log('[gfl-smoke] issue cards in DOM:', cardCount)

    if (cardCount === 0 && withStatus.length > 0) {
      throw new Error('Gateway contract OK but no .issue-card in DOM — frontend regression')
    }
    if (cardCount === 0) {
      throw new Error('No issue cards rendered')
    }

    console.log('[gfl-smoke] PASS')
  } finally {
    devServer.kill('SIGTERM')
  }
}

run().catch((err) => {
  console.error('[gfl-smoke] FAIL:', err.message)
  process.exitCode = 1
})
