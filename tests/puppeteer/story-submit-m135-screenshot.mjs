/**
 * Capture M135 State F (post-submit path choice) for ID-14 anchor T05.
 * Usage:
 *   PHASE=pre-implement|post-implement node ./tests/puppeteer/story-submit-m135-screenshot.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const BASE = process.env.VERIFY_HOST_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING_SERVER = Boolean(process.env.VERIFY_HOST_URL)
const PHASE = process.env.PHASE ?? 'post-implement'
const ANCHOR_BASELINE = resolve(
  'docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/task-spa-id-14-t05-panel-parity-m135/ui-baseline',
)
const OUTPUT_DIR = resolve(ANCHOR_BASELINE, PHASE)

/** @type {Array<{ slug: string, url: string, selector: string, viewport?: { width: number, height: number } }>} */
const CAPTURES = [
  {
    slug: 'f-submitted-m135',
    url: '/#/story/submit?dev_handoff_phase=submitted',
    selector: '[data-testid="story-handoff-success"]',
  },
  {
    slug: 'f-narrow-submitted-m135',
    url: '/#/story/submit?dev_handoff_phase=submitted',
    selector: '[data-testid="story-handoff-success"]',
    viewport: { width: 390, height: 844 },
  },
  {
    slug: 'e-submitting-m135',
    url: '/#/story/submit?dev_handoff_phase=submitting',
    selector: '[data-testid="story-handoff-submitting"]',
  },
  {
    slug: 'e0-empty-m135',
    url: '/#/story/submit?dev_handoff_phase=empty',
    selector: '[data-testid="story-handoff-empty"]',
  },
]

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: process.cwd(),
      stdio: 'pipe',
      env: { ...process.env, VITE_IDENTITY_MOCK_MODE: 'true' },
    },
  )
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.status === 304) return
    } catch {
      // wait
    }
    await sleep(500)
  }
  throw new Error('Vite dev server did not become ready')
}

async function seedMockAuth(page) {
  await page.goto(`${BASE}/#/board`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.evaluate(() => {
    localStorage.setItem('dogestonia-remember-me', 'true')
    const expiresAt = Math.floor(Date.now() / 1000) + 3600
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({ sub: 'mock-user-id14', exp: expiresAt, role: 'authenticated' }),
    )
    const accessToken = `${header}.${payload}.mock-signature`
    localStorage.setItem(
      'dogestonia-auth',
      JSON.stringify({
        access_token: accessToken,
        refresh_token: 'mock-refresh-token',
        expires_at: expiresAt,
        expires_in: 3600,
        token_type: 'bearer',
        user: {
          id: 'mock-user-id14',
          email: 'mock-id14@example.com',
          aud: 'authenticated',
          role: 'authenticated',
        },
      }),
    )
    sessionStorage.setItem(
      'doge.mock-profile',
      JSON.stringify({
        display_name: 'ID14 Demo',
        role: 'citizen',
        email: 'mock-id14@example.com',
        status: 'active',
        phone_verified: true,
      }),
    )
  })
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const readmePath = resolve(ANCHOR_BASELINE, 'README.md')
  const capturedAt = new Date().toISOString()
  const devServer = USE_EXISTING_SERVER ? null : startViteDevServer()
  try {
    if (!USE_EXISTING_SERVER) {
      await waitForServer(BASE)
    }
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await seedMockAuth(page)

    for (const capture of CAPTURES) {
      const viewport = capture.viewport ?? { width: 1536, height: 1024 }
      await page.setViewport(viewport)
      await page.goto(`${BASE}${capture.url}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForSelector(capture.selector, { timeout: 60000 })
      // Ensure auth gate is not covering State F in mock mode
      await page.waitForFunction(
        () => !document.querySelector('[data-testid="auth-page"]'),
        { timeout: 15000 },
      ).catch(() => {})
      const sizeLabel = `${viewport.width}x${viewport.height}`
      const outPath = resolve(OUTPUT_DIR, `${capture.slug}-${sizeLabel}.png`)
      await page.screenshot({ path: outPath, fullPage: false })
      console.log(`saved ${outPath}`)
    }

    await browser.close()

    if (PHASE === 'pre-implement') {
      await writeFile(
        readmePath,
        [
          '# UI baseline — SPA-ID-14-T05 (M135 State F)',
          '',
          `- **Route:** \`/#/story/submit?dev_handoff_phase=submitted\` (and related phases)`,
          `- **Viewport primary:** 1536×1024 · narrow 390×844`,
          `- **Selector:** \`[data-testid="story-handoff-success"]\``,
          `- **UI-0 captured UTC:** ${capturedAt}`,
          `- **Phase folder:** \`pre-implement/\``,
          '',
          'Path A: `@mockup` M135 — see `ui-mockup-spec.md`.',
          '',
        ].join('\n'),
        'utf8',
      )
    } else {
      const existing = await import('node:fs/promises').then((fs) =>
        fs.readFile(readmePath, 'utf8').catch(() => ''),
      )
      await writeFile(
        readmePath,
        `${existing.trim()}\n\n## UI-3 post-implement\n\n- **Captured UTC:** ${capturedAt}\n- **Folder:** \`post-implement/\`\n- **Mock auth:** seeded JWT + \`doge.mock-profile\` before capture\n`,
        'utf8',
      )
    }
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
