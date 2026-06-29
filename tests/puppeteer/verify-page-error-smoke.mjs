import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const DEFAULT_BASE = 'http://localhost:4173'
const BASE = process.env.VERIFY_ERROR_URL ?? DEFAULT_BASE
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_ERROR_URL)

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', 'localhost', '--port', '4173', '--strictPort'],
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

async function seedMockAuthSession(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: 'mock-user-unverified',
        exp: expiresAt,
        role: 'authenticated',
        email: 'mock@example.com',
      }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    const session = {
      access_token: accessToken,
      refresh_token: 'mock-refresh-token',
      expires_at: expiresAt,
      expires_in: 3600,
      token_type: 'bearer',
      user: {
        id: 'mock-user-unverified',
        email: 'mock@example.com',
        aud: 'authenticated',
        role: 'authenticated',
      },
    }
    localStorage.setItem('dogestonia-auth', JSON.stringify(session))
    sessionStorage.removeItem('dogestonia-auth')
  })
  await page.reload({ waitUntil: 'networkidle0', timeout: 60000 })
}

async function walkToOtpStep(page) {
  await page.goto(`${BASE}/#/verify`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('[data-testid="verify-page"][data-verify-host="flow-only"]', {
    timeout: 60000,
  })
  await page.click('[data-testid="phone-verification-disclosure-send"]')
  await page.waitForSelector('[data-testid="phone-verification-phone-input"]', { timeout: 60000 })
  await page.type('[data-testid="phone-verification-local-input"]', '55555555')
  await page.click('[data-testid="phone-verification-send-code"]')
  await page.waitForSelector('[data-testid="phone-verification-otp"]', { timeout: 60000 })
}

async function run() {
  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    await seedMockAuthSession(page)
    await walkToOtpStep(page)

    await page.type('[data-testid="phone-verification-otp-input"]', '999999')
    await page.click('[data-testid="phone-verification-verify"]')

    await page.waitForSelector('[data-testid="phone-verification-error-code-mismatch"]', {
      timeout: 60000,
    })

    const snapshot = await page.evaluate(() => ({
      title: document.querySelector('.phone-verification-error__title')?.textContent?.trim(),
      attempts: document
        .querySelector('[data-testid="phone-verification-error-attempts"]')
        ?.textContent?.trim(),
      trace: document
        .querySelector('[data-testid="phone-verification-error-trace-id"]')
        ?.textContent?.trim(),
    }))

    if (snapshot.title !== 'Incorrect verification code') {
      throw new Error(`Unexpected error title: ${snapshot.title}`)
    }
    if (!snapshot.attempts?.includes('Attempts remaining:')) {
      throw new Error(`Missing attempts line: ${snapshot.attempts}`)
    }
    if (snapshot.trace !== 'puppeteer-smoke-trace') {
      throw new Error(`Missing trace_id: ${snapshot.trace}`)
    }

    const screenshotPath = fileURLToPath(
      new URL(
        '../../docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-05-verification-error-states/task-spa-id-05-t02-phone-verification-error-state-shell-m37/ui-baseline/post-implement/code-mismatch-1536x1024.png',
        import.meta.url,
      ),
    )
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    })

    await browser.close()
    console.log(`verify-page-error-smoke: PASS (${BASE})`)
  } finally {
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
