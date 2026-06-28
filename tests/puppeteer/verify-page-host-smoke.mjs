import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

/** Vite dev on macOS often binds IPv6 localhost only — use localhost, not 127.0.0.1. */
const DEFAULT_BASE = 'http://localhost:4173'
const BASE = process.env.VERIFY_HOST_URL ?? DEFAULT_BASE
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_HOST_URL)

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

async function snapshotVerifyPage(page) {
  return page.evaluate(() => {
    const verifyPage = document.querySelector('[data-testid="verify-page"]')
    const cardsInVerify = verifyPage
      ? verifyPage.querySelectorAll('[data-civic-status-card]').length
      : -1
    return {
      host: verifyPage?.getAttribute('data-verify-host'),
      cardsInVerify,
      cardsGlobal: document.querySelectorAll('[data-civic-status-card]').length,
      hasFlow: !!document.querySelector('[data-testid="phone-verification-flow"]'),
      hasDisclosure: !!document.querySelector('[data-testid="phone-verification-disclosure"]'),
      hasVerifiedStatus: !!document.querySelector('[data-testid="verify-page-verified-status"]'),
      verifyAccountButtons: [...document.querySelectorAll('button')].filter((button) =>
        /verify account/i.test(button.textContent ?? ''),
      ).length,
      overlay: !!document.querySelector('[data-testid="session-shell-overlay"]'),
    }
  })
}

function assertUnverifiedVerifyHost(snapshot) {
  if (snapshot.overlay) {
    throw new Error('Session shell overlay still blocks /verify — mock auth seed failed')
  }
  if (snapshot.host !== 'flow-only') {
    throw new Error(`Expected data-verify-host=flow-only, received ${snapshot.host}`)
  }
  if (snapshot.cardsInVerify !== 0) {
    throw new Error(`Expected 0 CivicStatusCard inside verify-page, received ${snapshot.cardsInVerify}`)
  }
  if (snapshot.cardsGlobal !== 0) {
    throw new Error(`Expected 0 CivicStatusCard on /verify, received ${snapshot.cardsGlobal}`)
  }
  if (!snapshot.hasFlow || !snapshot.hasDisclosure) {
    throw new Error('PhoneVerificationFlow disclosure host missing on /verify')
  }
  if (snapshot.verifyAccountButtons !== 0) {
    throw new Error(`Duplicate Verify Account CTA found: ${snapshot.verifyAccountButtons}`)
  }
  if (snapshot.hasVerifiedStatus) {
    throw new Error('verify-page-verified-status should not render for unverified profile')
  }
}

async function run() {
  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    await waitForServer(BASE)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })

    await seedMockAuthSession(page)

    await page.goto(`${BASE}/#/verify`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('[data-testid="verify-page"][data-verify-host="flow-only"]', {
      timeout: 60000,
    })
    assertUnverifiedVerifyHost(await snapshotVerifyPage(page))

    await page.goto(`${BASE}/#/dashboard`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('[data-testid="dashboard-page"] [data-civic-status-card]', {
      timeout: 60000,
    })
    const dashboardCards = await page.evaluate(
      () => document.querySelectorAll('[data-testid="dashboard-page"] [data-civic-status-card]').length,
    )
    if (dashboardCards !== 1) {
      throw new Error(`Expected 1 CivicStatusCard on dashboard, received ${dashboardCards}`)
    }

    await page.click('[data-testid="dashboard-page"] .civic-status-card__button--primary')
    await page.waitForFunction(
      () => window.location.hash === '#/verify',
      { timeout: 60000 },
    )
    await page.waitForSelector('[data-testid="verify-page"][data-verify-host="flow-only"]', {
      timeout: 60000,
    })
    assertUnverifiedVerifyHost(await snapshotVerifyPage(page))

    await browser.close()
    console.log(`verify-page-host-smoke: PASS (${BASE})`)
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
