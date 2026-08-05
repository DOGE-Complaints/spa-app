/**
 * PH-05 How it works screenshots → T02 ui-baseline/
 *   PH05_PHASE=pre-implement|post-implement node tests/puppeteer/how-it-works-ph05-screenshot.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SPA_ROOT = path.resolve(__dirname, '../..')
const UI_BASELINE = path.resolve(
  SPA_ROOT,
  process.env.PH05_UI_BASELINE ??
    'docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page/task-spa-ph-05-t02-four-step-layout/ui-baseline',
)

const BASE = process.env.PUBLIC_HIW_URL ?? process.env.PUBLIC_BOARD_URL ?? 'http://127.0.0.1:4173'
const USE_EXISTING = Boolean(process.env.PUBLIC_HIW_URL || process.env.PUBLIC_BOARD_URL)
const PHASE = process.env.PH05_PHASE === 'pre-implement' ? 'pre-implement' : 'post-implement'

function startViteDevServer() {
  return spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: SPA_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        VITE_IDENTITY_MOCK_MODE: 'true',
        VITE_STORY_GPT_URL:
          process.env.VITE_STORY_GPT_URL || 'https://chatgpt.com/g/g-example-dogestonia',
      },
    },
  )
}

async function waitForServer(url, attempts = 50) {
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

async function main() {
  const outDir = path.join(UI_BASELINE, PHASE)
  await mkdir(outDir, { recursive: true })

  let devServer = null
  if (!USE_EXISTING) {
    devServer = startViteDevServer()
    await waitForServer(BASE)
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1536, height: 1024 },
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1536, height: 1024 })
    await page.goto(`${BASE}/#/how-it-works`, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForSelector('.board-shell', { timeout: 30000 })
    await sleep(800)

    if (PHASE === 'pre-implement') {
      await page.waitForSelector('[data-testid="how-it-works-stub"], [data-testid="how-it-works-page"]', {
        timeout: 15000,
      })
      await page.screenshot({
        path: path.join(outDir, 'a-stub-or-default-how-it-works-1536x1024.png'),
      })
    } else {
      await page.waitForSelector('[data-testid="how-it-works-page"]', { timeout: 20000 })
      await page.waitForSelector('[data-testid="how-it-works-step"]', { timeout: 10000 })
      await page.screenshot({
        path: path.join(outDir, 'a-default-tutorial-page-1536x1024.png'),
      })
    }

    await writeFile(
      path.join(UI_BASELINE, 'README.md'),
      `# PH-05 How it works — ui-baseline

Anchor: \`task-spa-ph-05-t02-four-step-layout\`

| Phase | Purpose |
|-------|---------|
| pre-implement | UI-0 stub /how-it-works before M133 tutorial |
| post-implement | UI-3 State A default tutorial page |

- **Route:** \`/#/how-it-works\`
- **Viewport:** 1536×1024
- **Last phase:** **${PHASE}**
- **UTC:** see P3 run / gate

Mockup SSOT: \`docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md\`
`,
      'utf8',
    )
    console.log(`PH05 ${PHASE} screenshots → ${outDir}`)
  } finally {
    await browser.close()
    if (devServer) devServer.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
