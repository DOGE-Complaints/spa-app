/**
 * Shared board-feed backdrop control for visual evidence (PH-07).
 * Modes: results | empty | error — request interception on GET /tallinn/issues.
 * Chrome/CTA shots must use results|empty; load-error only when goal is M132 error.
 */
export const FEED_BACKDROP_MODES = Object.freeze(['results', 'empty', 'error'])
export const CHROME_BACKDROP_MODES = Object.freeze(['results', 'empty'])

export const DEFAULT_MOCK_ISSUES = Object.freeze([
  {
    id: 'ISSUE-PH07-1',
    status: 'NEW',
    type: 'complaint',
    title: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    summary: { en: 'Mock feed item one', et: 'Mock üks', ru: 'Мок один' },
    labels: ['roads'],
    created_at: '2026-08-01T10:00:00Z',
  },
])

/** Visible EN title used as positive chrome-results marker (F4). */
export const MOCK_FEED_TITLE_EN = DEFAULT_MOCK_ISSUES[0].title.en
export const MOCK_FEED_ISSUE_ID = DEFAULT_MOCK_ISSUES[0].id

/**
 * @param {string} mode
 * @returns {'results'|'empty'|'error'}
 */
export function normalizeBackdropMode(mode) {
  const value = typeof mode === 'string' ? mode : mode?.mode
  if (!FEED_BACKDROP_MODES.includes(value)) {
    throw new Error(
      `Invalid board feed backdrop mode "${value}". Expected one of: ${FEED_BACKDROP_MODES.join(', ')}`,
    )
  }
  return value
}

/**
 * @param {string} mode
 * @returns {boolean}
 */
export function isChromeBackdropMode(mode) {
  return CHROME_BACKDROP_MODES.includes(normalizeBackdropMode(mode))
}

/**
 * Install (or rebind) GET /tallinn/issues interception.
 * `route` may be a string mode or a mutable `{ mode }` object (PH-04 pattern).
 *
 * @param {import('puppeteer').Page} page
 * @param {string|{mode: string}} route
 * @param {{ issues?: unknown[] }} [options]
 */
export async function installBoardFeedBackdrop(page, route, options = {}) {
  const issues = options.issues ?? DEFAULT_MOCK_ISSUES
  await page.setRequestInterception(true)
  page.removeAllListeners('request')
  page.on('request', async (req) => {
    const url = req.url()
    if (
      req.method() === 'GET' &&
      /\/tallinn\/issues(\?|$)/.test(url) &&
      !/\/tallinn\/issues\/[^/?\s]+/.test(url)
    ) {
      const mode = normalizeBackdropMode(typeof route === 'string' ? route : route.mode)
      try {
        if (mode === 'error') {
          await req.respond({
            status: 500,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'fail' }),
          })
          return
        }
        const bodyIssues = mode === 'empty' ? [] : issues
        await req.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ data: { issues: bodyIssues } }),
        })
        return
      } catch (err) {
        // Do not silently drop — hung requests look like live race / SPA cache bugs.
        console.error('[boardFeedBackdrop] respond failed:', err?.message || err)
        await req.abort('failed').catch(() => {})
        return
      }
    }
    await req.continue().catch(() => {})
  })
}

/**
 * Chrome/CTA evidence: fail if load-error UI is present.
 * @param {import('puppeteer').Page} page
 */
export async function assertNoBoardLoadError(page) {
  const handle = await page.$('[data-testid="board-load-error"]')
  if (handle) {
    await handle.dispose().catch(() => {})
    throw new Error(
      'Accidental board-load-error backdrop on chrome/CTA evidence — use results|empty via installBoardFeedBackdrop',
    )
  }
}

/**
 * Positive results marker: helper mock title must be visible (not live UUID feed).
 * @param {import('puppeteer').Page} page
 * @param {number} [timeout]
 */
export async function assertBoardMockResults(page, timeout = 20000) {
  const title = MOCK_FEED_TITLE_EN
  const id = MOCK_FEED_ISSUE_ID
  await page.waitForFunction(
    (markerTitle, markerId) => {
      const text = document.body?.innerText || ''
      return text.includes(markerTitle) || text.includes(markerId)
    },
    { timeout },
    title,
    id,
  )
  await assertNoBoardLoadError(page)
}

/**
 * M132 load-error evidence: require load-error UI.
 * @param {import('puppeteer').Page} page
 * @param {number} [timeout]
 */
export async function assertBoardLoadError(page, timeout = 20000) {
  await page.waitForSelector('[data-testid="board-load-error"]', { timeout })
}
