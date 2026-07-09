import puppeteer from 'puppeteer'

const FORBIDDEN_LOCALHOST = /localhost|127\.0\.0\.1/i

function fail(message) {
  console.error(`[verify-railway-live-smoke] ${message}`)
  process.exit(1)
}

const rawBase = String(process.env.SPA_BASE_URL ?? '').trim()
if (!rawBase) {
  fail('set SPA_BASE_URL (e.g. https://your-spa.railway.app or http://127.0.0.1:4173 with ALLOW_LOCAL_SMOKE=1)')
}

const allowLocal = process.env.ALLOW_LOCAL_SMOKE === '1'
if (!allowLocal && FORBIDDEN_LOCALHOST.test(rawBase)) {
  fail('SPA_BASE_URL must be a public Railway URL (set ALLOW_LOCAL_SMOKE=1 for local preview smoke)')
}

const baseUrl = rawBase.replace(/\/+$/, '')
const boardUrl = `${baseUrl}/#/board`

async function verifyShell() {
  const response = await fetch(`${baseUrl}/`, { redirect: 'follow' })
  if (!response.ok) {
    fail(`GET ${baseUrl}/ returned ${response.status}`)
  }
  const html = await response.text()
  if (html.includes('Blocked request. This host') && html.includes('preview.allowedHosts')) {
    fail(
      'response looks like vite preview Host block — production should use static serve (npm start → serve -s dist)',
    )
  }
  if (!html.includes('id="root"')) {
    fail('response missing <div id="root"> — not spa shell')
  }
  if (!html.includes('/assets/') && !html.includes('/src/main.jsx')) {
    fail('response missing vite assets marker (/assets/ or dev /src/main.jsx)')
  }
  if (!html.includes('DOGEstonia')) {
    fail('response missing DOGEstonia title marker')
  }
  console.log(`[verify-railway-live-smoke] shell ok: ${baseUrl}/`)
}

async function verifyBoardPublic() {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.goto(boardUrl, { waitUntil: 'networkidle0', timeout: 60_000 })
    const onLogin = page.url().includes('/login')
    if (onLogin) {
      fail(`board route redirected to login — M-5 public path broken (${page.url()})`)
    }
    await page.waitForSelector('.board-shell', { timeout: 15_000 })
    const hasBoardMain = await page.$('.board-main')
    if (!hasBoardMain) {
      fail('board shell loaded but .board-main missing')
    }
    console.log(`[verify-railway-live-smoke] M-5 ok: ${boardUrl} (no login redirect)`)
    await page.close()
  } finally {
    const proc = browser.process()
    proc?.kill('SIGKILL')
  }
}

await verifyShell()
await verifyBoardPublic()
console.log('[verify-railway-live-smoke] ok')
process.exit(0)
