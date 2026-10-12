import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { ISSUE_STATUS } from '../../../domain/types.js'

vi.mock('../../../services/issueService.js', () => ({
  issueService: {
    getIssues: vi.fn(),
  },
}))

vi.mock('../../../auth/SessionShellContext.jsx', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSessionShell: () => ({
      shellState: 'logged_out',
      retry: () => {},
      profile: null,
    }),
    useOptionalSessionShell: () => null,
  }
})

import { NextFeedHostPage } from '../../../pages/NextFeedHostPage.jsx'
import { FeedToolbar } from '../FeedToolbar.jsx'
import { FeedListArea } from '../FeedListArea.jsx'
import { buildFeedListOptions } from '../buildFeedListOptions.js'

function renderFeed(initialPath = '/next/feed') {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/next/feed" element={<NextFeedHostPage />} />
          <Route path="/next/feed/issue/:id" element={<NextFeedHostPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('NF-01 feed list/toolbar host', () => {
  it('exposes nextFeed.list.* / nextFeed.toolbar.* flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.loading')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.empty')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.error')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.retry')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.stale')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.toolbar.filters')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.toolbar.searchPlaceholder')
  })

  it('renders feed host with toolbar and live search control', () => {
    const html = renderFeed('/next/feed')
    expect(html).toContain('data-testid="next-feed-host"')
    expect(html).toContain('data-testid="feed-host"')
    expect(html).toContain('data-testid="feed-toolbar"')
    expect(html).toContain('data-testid="feed-search"')
    expect(html).toContain('data-testid="board-search-field"')
    expect(html).not.toContain('data-testid="feed-search-unavailable"')
    expect(html).not.toContain('data-testid="next-feed-host-wip"')
    expect(html).not.toContain('Feed coming soon')
  })

  it('toolbar wires next-feed filter icon + search input', () => {
    const t = (key) => key
    const html = renderToStaticMarkup(
      <FeedToolbar
        t={t}
        locale="en"
        normalizedSearch=""
        searchDraft=""
        setSearchDraft={() => {}}
        pending={{
          status: [],
          type: '',
          labels: [],
          search: '',
          institution: '',
          created_after: '',
          created_before: '',
          geo_district: [],
          geo_settlement: [],
          geo_region: [],
          geo_country: [],
          geo_postal_code: [],
        }}
        setPending={() => {}}
        isPanelOpen={false}
        togglePanel={() => {}}
        isDirty={false}
        hasActiveFilters={false}
        apply={() => {}}
        reset={() => {}}
        availableInstitutions={[]}
        availableGeoOptions={{}}
        availableLabels={[]}
        formatInstitution={(v) => v}
        activeFilterChips={[]}
        removeChip={() => {}}
      />,
    )
    expect(html).toContain('data-testid="feed-search"')
    expect(html).toContain('/icons/next-feed/actions/filter.svg')
  })

  it('list area covers error / empty / loading icon slots', () => {
    const t = (key) => key
    const errorHtml = renderToStaticMarkup(
      <FeedListArea
        t={t}
        locale="en"
        error={new Error('boom')}
        loading={false}
        stale={false}
        fetchIssues={() => {}}
        showEmpty={false}
        showFilteredEmpty={false}
        reset={() => {}}
        showResults={false}
        issues={[]}
        resolveLocalizedText={(v) => v}
        feedUrlForBack="/next/feed"
        meProfile={null}
      />,
    )
    expect(errorHtml).toContain('data-testid="feed-load-error"')
    expect(errorHtml).toContain('/icons/next-feed/status/error.svg')
    expect(errorHtml).toContain('/icons/next-feed/actions/retry.svg')

    const emptyHtml = renderToStaticMarkup(
      <FeedListArea
        t={t}
        locale="en"
        error={null}
        loading={false}
        stale={false}
        fetchIssues={() => {}}
        showEmpty
        showFilteredEmpty={false}
        reset={() => {}}
        showResults={false}
        issues={[]}
        resolveLocalizedText={(v) => v}
        feedUrlForBack="/next/feed"
        meProfile={null}
      />,
    )
    expect(emptyHtml).toContain('data-testid="feed-empty"')
    expect(emptyHtml).toContain('/icons/next-feed/status/info.svg')
  })

  it('buildFeedListOptions locks PUBLISHED and passes trimmed search (NF-12)', () => {
    const opts = buildFeedListOptions({
      status: ['NEW'],
      type: 'INCIDENT',
      labels: ['waste'],
      search: '  pet care  ',
      institution: '',
      created_after: '',
      created_before: '',
      geo_district: [],
      geo_settlement: [],
      geo_region: [],
      geo_country: [],
      geo_postal_code: [],
    })
    expect(opts.status).toEqual([ISSUE_STATUS.PUBLISHED])
    expect(opts.type).toBe('INCIDENT')
    expect(opts.labels).toEqual(['waste'])
    expect(opts.search).toBe('pet care')
    const empty = buildFeedListOptions({ search: '   ' })
    expect(empty.search).toBeUndefined()
  })
})
