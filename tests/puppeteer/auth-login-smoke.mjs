import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = 'http://127.0.0.1:4173'

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: process.cwd(),
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
      },
    },
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
      // wait for vite
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready in time')
}

async function assertAuthState(page, state, urlSuffix = '') {
  const url = `${BASE}/#/login${urlSuffix}`
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector(`[data-auth-state="${state}"]`, { timeout: 60000 })
  const card = await page.$('[data-auth-state]')
  if (!card) {
    throw new Error(`Missing auth card for state ${state}`)
  }
}

async function run() {
  const devServer = startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    await assertAuthState(page, 'login')
    const loginEmail = await page.$('[data-testid="auth-email"]')
    const loginPassword = await page.$('[data-testid="auth-password"]')
    const loginSubmit = await page.$('[data-testid="auth-submit"]')
    if (!loginEmail || !loginPassword || !loginSubmit) {
      throw new Error('Missing login form selectors on state A')
    }

    await assertAuthState(page, 'magic-link-sent', '?dev_auth_state=magic-link-sent')
    await assertAuthState(page, 'auth-error', '?dev_auth_state=auth-error&dev_error_code=invalid_credentials')

    const errorCode = await page.$eval('[data-testid="auth-error-active"]', (node) =>
      node.getAttribute('data-auth-error-code'),
    )
    if (errorCode !== 'invalid_credentials') {
      throw new Error(`Expected invalid_credentials error state, received ${errorCode}`)
    }

    await browser.close()
  } finally {
    if (!devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
