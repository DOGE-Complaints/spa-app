import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedToolbar } from '../FeedToolbar.jsx'
import { FeedListArea } from '../FeedListArea.jsx'
import {
  BoardHeading,
  ResultsContext,
  StaleResultsNotice,
  BoardFeedState,
} from '../board/index.js'
import { selectResultsContextStatus } from '../semantics/resultsContext.js'

function makeT(map = {}) {
  return (key) => map[key] ?? key
}

const tMap = {
  'nextFeed.toolbar.title': 'Feed',
  'nextFeed.toolbar.subtitle': 'Published issues from your community',
  'nextFeed.toolbar.resultsPopulated': 'Showing published issues',
  'nextFeed.toolbar.resultsRefreshing': 'Updating results…',
  'nextFeed.toolbar.resultsFiltered': 'No matches for the current filters',
  'nextFeed.toolbar.resultsSearch': 'No matches for this search',
  'nextFeed.toolbar.resultsIdle': 'Browse published issues',
  'nextFeed.toolbar.queryAria': 'Feed query',
  'nextFeed.toolbar.searchPlaceholder': 'Search issues…',
  'nextFeed.toolbar.searchAria': 'Search published issues',
  'nextFeed.toolbar.searchClear': 'Clear search',
  'nextFeed.toolbar.filters': 'Filters',
  'nextFeed.list.stale': 'Showing last loaded results',
  'nextFeed.list.retry': 'Try again',
  'nextFeed.list.error': 'Could not load the feed',
  'nextFeed.list.empty': 'No published issues',
  'nextFeed.list.loading': 'Loading feed…',
  'nextFeed.list.accessible': 'Published issues feed',
  'nextFeed.list.filteredEmptyTitle': 'No issues match these filters',
  'nextFeed.list.filteredEmptyMessage': 'Clear filters',
  'nextFeed.list.searchEmptyTitle': 'No issues match this search',
  'nextFeed.list.searchEmptyMessage': 'Clear search',
  resetFilters: 'Reset',
}

const pending = {
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
}

describe('NF-VL-08 board heading / results context', () => {
  it('exports named DS surfaces and status helper', () => {
    expect(typeof BoardHeading).toBe('function')
    expect(typeof ResultsContext).toBe('function')
    expect(typeof StaleResultsNotice).toBe('function')
    expect(typeof BoardFeedState).toBe('function')
    expect(selectResultsContextStatus({ showResults: true })).toBe('populated')
    expect(selectResultsContextStatus({ showResults: true, loading: true })).toBe('refreshing')
    expect(selectResultsContextStatus({ showFilteredEmpty: true, searchActive: true })).toBe(
      'search',
    )
  })

  it('FeedToolbar wires BoardHeading + ResultsContext without (no query) Done surface', () => {
    const html = renderToStaticMarkup(
      <FeedToolbar
        t={makeT(tMap)}
        locale="en"
        normalizedSearch=""
        searchDraft=""
        setSearchDraft={() => {}}
        pending={pending}
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
        showResults
      />,
    )
    expect(html).toContain('data-vl-done-surface="BoardHeading"')
    expect(html).toContain('data-vl-done-surface="ResultsContext"')
    expect(html).toContain('Published issues from your community')
    expect(html).toContain('Showing published issues')
    expect(html).toContain('data-search-surface="BoardSearchField"')
    // hidden debug dump may remain; must not be the named ResultsContext text
    expect(html).not.toMatch(
      /data-vl-done-surface="ResultsContext"[^>]*>[^<]*\(no query\)/,
    )
    expect(html).not.toMatch(
      /data-testid="results-context"[^>]*>[^<]*\(no query\)/,
    )
  })

  it('FeedListArea uses StaleResultsNotice and BoardFeedState', () => {
    const wrap = (ui) =>
      renderToStaticMarkup(
        <I18nProvider>
          <MemoryRouter>{ui}</MemoryRouter>
        </I18nProvider>,
      )
    const stale = wrap(
      <FeedListArea
        t={makeT(tMap)}
        locale="en"
        error={new Error('x')}
        loading={false}
        stale
        fetchIssues={() => {}}
        showEmpty={false}
        showFilteredEmpty={false}
        reset={() => {}}
        showResults
        issues={[{ id: '1', title: 'A', type: 'IMPROVEMENT', status: 'PUBLISHED' }]}
        resolveLocalizedText={(v) => (typeof v === 'string' ? v : '')}
        feedUrlForBack="/next/feed"
        meProfile={null}
      />,
    )
    expect(stale).toContain('data-vl-done-surface="StaleResultsNotice"')
    expect(stale).toContain('data-testid="feed-stale"')

    const empty = wrap(
      <FeedListArea
        t={makeT(tMap)}
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
        resolveLocalizedText={() => ''}
        feedUrlForBack="/next/feed"
        meProfile={null}
      />,
    )
    expect(empty).toContain('data-vl-done-surface="BoardFeedState"')
    expect(empty).toContain('data-feed-state="empty"')
  })

  it('board modules do not invent metrics APIs', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const { fileURLToPath } = await import('node:url')
    const dir = path.dirname(fileURLToPath(import.meta.url))
    for (const name of [
      'BoardHeading.jsx',
      'ResultsContext.jsx',
      'StaleResultsNotice.jsx',
      'BoardFeedState.jsx',
    ]) {
      const src = fs.readFileSync(path.resolve(dir, `../board/${name}`), 'utf8')
      expect(src).not.toMatch(/fetch\(|axios|metrics|\/api\//i)
    }
  })
})
