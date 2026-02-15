import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    { cwd: process.cwd(), stdio: 'pipe' },
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
      // wait for startup
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready in time')
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer('http://127.0.0.1:4173')

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await page.goto('http://127.0.0.1:4173/#/board', { waitUntil: 'networkidle0' })

    const badges = await page.$$('.status-badge')
    if (badges.length < 4) {
      throw new Error(`Expected at least 4 status badges, received ${badges.length}`)
    }

    const inReviewLabel = await page.$eval('.status-badge-in-review .status-badge-label', (node) => node.textContent)
    if ((inReviewLabel ?? '').trim() !== 'IN REVIEW') {
      throw new Error(`Expected IN REVIEW label, got "${inReviewLabel}"`)
    }

    await browser.close()
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
