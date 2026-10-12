import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { FeedIssueDetail } from '../FeedIssueDetail.jsx'
import { FeedIssueMount } from '../FeedIssueMount.jsx'
import {
  NEXT_FEED_ICON_CATALOG_URLS,
  NEXT_FEED_SHELL_REUSE_URLS,
} from '../nextFeedIconCatalog.js'
import { FEED_NARROW_MQ } from '../useFeedNarrow.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_ROOT = path.resolve(__dirname, '../../../../public')

const DEMO = {
  id: 'DEMO-NF06-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: 'A trusted neighbour network for pet care',
  summary:
    'Residents need a simple way to find trusted neighbours for dog sitting, cat visits and short-term pet care close to home.',
  labels: ['Pets', 'Mutual help'],
  geo: { lat: 59.43, lon: 24.75, label: 'Uus Veerenni' },
  created_at: '2026-10-10T12:00:00Z',
}

vi.mock('../../../services/issueService.js', () => ({
  issueService: {
    getIssue: vi.fn(async (id) => (id === 'DEMO-NF06-1' ? DEMO : null)),
    getIssues: vi.fn(async () => [DEMO]),
  },
}))

function renderUi(ui, initial = '/next/feed/issue/DEMO-NF06-1') {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/next/feed/issue/:id" element={ui} />
          <Route path="/next/feed" element={<div data-testid="feed-list-stub" />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('NF-06 mounts + verify', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query) => ({
        matches: query === FEED_NARROW_MQ ? false : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('exposes nextFeed.mount.* and verify.smokeNote keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.mount.close')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.mount.openAsPage')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.verify.smokeNote')
  })

  it('renders shared detail civic + thread slot', () => {
    const t = (k) => k
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <FeedIssueDetail
            issueId={DEMO.id}
            issue={DEMO}
            loading={false}
            error={null}
            notFound={false}
            onRetry={() => {}}
            onBack={() => {}}
            locale="en"
            resolveLocalizedText={(v) => (typeof v === 'string' ? v : v?.en || '')}
            t={t}
            meProfile={null}
          />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('data-testid="feed-issue-detail"')
    expect(html).toContain('data-issue-status="ready"')
    expect(html).toContain('DEMO-NF06-1')
    expect(html).toContain('data-testid="feed-civic-post"')
    expect(html).toContain('data-testid="feed-discussion-block"')
  })

  it('modal presentation exposes dialog chrome and close icon reuse', () => {
    const t = (k) =>
      ({
        'nextFeed.mount.close': 'Close',
        'nextFeed.mount.openAsPage': 'Open as page',
        issuePlaceholder: 'Loading…',
      })[k] || k
    const html = renderUi(
      <FeedIssueMount
        issueId="DEMO-NF06-1"
        t={t}
        locale="en"
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        presentation="modal"
        feedUrlForBack="/next/feed"
      />,
    )
    expect(html).toContain('data-testid="feed-issue-mount"')
    expect(html).toContain('data-presentation="modal"')
    expect(html).toContain('role="dialog"')
    expect(html).toContain('/icons/next-shell/actions/close.svg')
    expect(html).toContain('Open as page')
    expect(html).toContain('Close')
  })

  it('sheet and route presentations differ by data-presentation', () => {
    const t = (k) => k
    const sheet = renderUi(
      <FeedIssueMount
        issueId="DEMO-NF06-1"
        t={t}
        locale="en"
        resolveLocalizedText={() => ''}
        presentation="sheet"
      />,
    )
    const route = renderUi(
      <FeedIssueMount
        issueId="DEMO-NF06-1"
        t={t}
        locale="en"
        resolveLocalizedText={() => ''}
        presentation="route"
      />,
    )
    expect(sheet).toContain('data-presentation="sheet"')
    expect(route).toContain('data-presentation="route"')
    expect(route).not.toContain('data-testid="feed-issue-mount-scrim"')
  })

  it('catalog 24 next-feed URLs resolve on disk under public/', () => {
    expect(NEXT_FEED_ICON_CATALOG_URLS).toHaveLength(24)
    for (const url of NEXT_FEED_ICON_CATALOG_URLS) {
      const rel = url.replace(/^\//, '')
      const file = path.join(PUBLIC_ROOT, rel)
      expect(fs.existsSync(file), `missing ${url}`).toBe(true)
    }
    for (const url of NEXT_FEED_SHELL_REUSE_URLS) {
      const rel = url.replace(/^\//, '')
      expect(fs.existsSync(path.join(PUBLIC_ROOT, rel)), `missing ${url}`).toBe(true)
    }
  })

  it('theme stress: mount CSS uses semantic token vars (no invent hex dual palette in JSX)', () => {
    const chrome = fs.readFileSync(
      path.resolve(__dirname, '../presentation/PresentationChrome.css'),
      'utf8',
    )
    const detail = fs.readFileSync(path.resolve(__dirname, '../FeedIssueMount.css'), 'utf8')
    expect(chrome).toContain('var(--color-bg-secondary')
    expect(chrome).toContain('var(--color-text-primary')
    expect(detail).toContain('@media (max-width: 719px)')
  })
})
