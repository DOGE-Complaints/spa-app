import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedIssueMount } from '../FeedIssueMount.jsx'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import {
  IssuePresentationLayout,
  KeyboardComposerLayout,
  OverlayHost,
  OverlayLayout,
  toIssuePresentationVariant,
  toOverlayLayoutVariant,
} from '../presentation/index.js'
import { FEED_NARROW_MQ } from '../useFeedNarrow.js'

const DEMO = {
  id: 'DEMO-NFVL07-1',
  type: 'IMPROVEMENT',
  status: 'PUBLISHED',
  title: 'Presentation overlay layouts',
  summary: 'Named DS layouts on next-feed mounts.',
  labels: ['VL-07'],
  geo: { lat: 59.43, lon: 24.75, label: 'Tallinn' },
  created_at: '2026-10-12T12:00:00Z',
}

vi.mock('../../../services/issueService.js', () => ({
  issueService: {
    getIssue: vi.fn(async (id) => (id === 'DEMO-NFVL07-1' ? DEMO : null)),
    getIssues: vi.fn(async () => [DEMO]),
  },
}))

function renderUi(ui, initial = '/next/feed/issue/DEMO-NFVL07-1') {
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

describe('NF-VL-07 presentation / overlay layouts', () => {
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

  it('exports named DS surfaces and variant maps', () => {
    expect(toIssuePresentationVariant('route')).toBe('page')
    expect(toIssuePresentationVariant('sheet')).toBe('fullScreenSheet')
    expect(toIssuePresentationVariant('modal')).toBe('modal')
    expect(toOverlayLayoutVariant('sheet')).toBe('fullScreenSheet')
    expect(toOverlayLayoutVariant('modal')).toBe('centeredDialog')
    expect(typeof IssuePresentationLayout).toBe('function')
    expect(typeof OverlayHost).toBe('function')
    expect(typeof OverlayLayout).toBe('function')
    expect(typeof KeyboardComposerLayout).toBe('function')
  })

  it('modal mount wires OverlayHost + OverlayLayout + IssuePresentationLayout', () => {
    const t = (k) =>
      ({
        'nextFeed.mount.close': 'Close',
        'nextFeed.mount.openAsPage': 'Open as page',
      })[k] || k
    const html = renderUi(
      <FeedIssueMount
        issueId="DEMO-NFVL07-1"
        t={t}
        locale="en"
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        presentation="modal"
        feedUrlForBack="/next/feed"
      />,
    )
    expect(html).toContain('data-vl-done-surface="OverlayHost"')
    expect(html).toContain('data-focus-return="true"')
    expect(html).toContain('data-vl-done-surface="OverlayLayout"')
    expect(html).toContain('data-vl-done-surface="IssuePresentationLayout"')
    expect(html).toContain('data-layout-variant="modal"')
    expect(html).toContain('data-presentation="modal"')
    expect(html).toContain('role="dialog"')
    expect(html).toContain('data-testid="feed-issue-mount-scrim"')
  })

  it('OverlayHost source owns focus-return restore (F1)', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const { fileURLToPath } = await import('node:url')
    const dir = path.dirname(fileURLToPath(import.meta.url))
    const src = fs.readFileSync(path.resolve(dir, '../presentation/OverlayHost.jsx'), 'utf8')
    expect(src).toContain('document.activeElement')
    expect(src).toContain('restoreFocusRef')
    expect(src).toMatch(/target\.focus/)
    expect(src).toContain('data-focus-return')
  })


  it('sheet and route use fullScreenSheet / page variants without inventing routes', () => {
    const t = (k) => k
    const sheet = renderUi(
      <FeedIssueMount
        issueId="DEMO-NFVL07-1"
        t={t}
        locale="en"
        resolveLocalizedText={() => ''}
        presentation="sheet"
      />,
    )
    const route = renderUi(
      <FeedIssueMount
        issueId="DEMO-NFVL07-1"
        t={t}
        locale="en"
        resolveLocalizedText={() => ''}
        presentation="route"
      />,
    )
    expect(sheet).toContain('data-layout-variant="fullScreenSheet"')
    expect(sheet).toContain('data-overlay-variant="fullScreenSheet"')
    expect(route).toContain('data-layout-variant="page"')
    expect(route).toContain('data-presentation="route"')
    expect(route).not.toContain('data-testid="overlay-host"')
    expect(route).not.toContain('data-testid="feed-issue-mount-scrim"')
  })

  it('discussion composer slot wraps KeyboardComposerLayout', () => {
    const t = (k) => k
    const html = renderToStaticMarkup(
      <I18nProvider>
        <MemoryRouter>
          <FeedDiscussionBlock status="empty" t={t} issueId="DEMO-NFVL07-1" showInviteStub={false} />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(html).toContain('data-vl-done-surface="KeyboardComposerLayout"')
    expect(html).toContain('data-vl-done-surface="DiscussionLayout"')
  })

  it('presentation modules do not import classic board modal chrome', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const { fileURLToPath } = await import('node:url')
    const dir = path.dirname(fileURLToPath(import.meta.url))
    const files = [
      'IssuePresentationLayout.jsx',
      'OverlayHost.jsx',
      'OverlayLayout.jsx',
      'KeyboardComposerLayout.jsx',
    ]
    for (const name of files) {
      const src = fs.readFileSync(path.resolve(dir, `../presentation/${name}`), 'utf8')
      expect(src).not.toMatch(/components\/board|BoardIssueModal|classic.*modal/i)
      expect(src).not.toMatch(/from ['"].*IssueModal/)
    }
  })
})
