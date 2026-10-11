import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { FeedToolbar } from '../FeedToolbar.jsx'
import { FeedListArea } from '../FeedListArea.jsx'
import { buildFeedListOptions } from '../buildFeedListOptions.js'
import { __buildIssuesQueryForTests as buildIssuesQuery } from '../../../repositories/GatewayIssueRepository.js'
import { serializeServerBoardQuery } from '../../../router/boardQuery.js'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { ISSUE_STATUS } from '../../../domain/types.js'

function makeT(map = {}) {
  return (key) => map[key] ?? key
}

describe('NF-12 text search FE enable (AD-VP-03 / REQ-56)', () => {
  it('exposes search L10N flat keys (no searchUnavailable)', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.toolbar.searchPlaceholder')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.toolbar.searchAria')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.list.searchEmptyTitle')
    expect(NEXT_FEED_FLAT_KEYS).not.toContain('nextFeed.toolbar.searchUnavailable')
  })

  it('buildFeedListOptions + buildIssuesQuery wire gateway param search only', () => {
    const opts = buildFeedListOptions({ search: '  neighbour  ', type: 'IMPROVEMENT' })
    expect(opts.status).toEqual([ISSUE_STATUS.PUBLISHED])
    expect(opts.search).toBe('neighbour')
    const params = buildIssuesQuery(opts)
    expect(params.get('search')).toBe('neighbour')
    expect(params.get('status')).toBe(ISSUE_STATUS.PUBLISHED)
    expect(params.toString()).toContain('search=neighbour')
    expect(params.toString()).not.toContain('q=')
    expect(params.toString()).not.toContain('query=')

    const empty = buildIssuesQuery(buildFeedListOptions({ search: '   ' }))
    expect(empty.has('search')).toBe(false)
  })

  it('serializeServerBoardQuery keeps search in refetch key', () => {
    expect(serializeServerBoardQuery('?search=pet')).toBe('?search=pet')
    expect(serializeServerBoardQuery('?search=pet')).not.toBe(
      serializeServerBoardQuery('?search=dog'),
    )
  })

  it('toolbar renders live SearchInput (hide lifted)', () => {
    const html = renderToStaticMarkup(
      <FeedToolbar
        t={makeT({
          'nextFeed.toolbar.title': 'Feed',
          'nextFeed.toolbar.queryAria': 'Feed query',
          'nextFeed.toolbar.searchPlaceholder': 'Search issues…',
          'nextFeed.toolbar.searchAria': 'Search published issues',
          'nextFeed.toolbar.searchClear': 'Clear search',
          'nextFeed.toolbar.filters': 'Filters',
        })}
        locale="en"
        normalizedSearch="?search=pet"
        searchDraft="pet"
        setSearchDraft={() => {}}
        pending={{
          status: [],
          type: '',
          labels: [],
          search: 'pet',
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
        hasActiveFilters
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
    expect(html).toContain('board-search-input')
    expect(html).toContain('Search issues…')
    expect(html).not.toContain('feed-search-unavailable')
  })

  it('filtered empty uses search-specific copy when searchActive', () => {
    const html = renderToStaticMarkup(
      <FeedListArea
        t={makeT({
          'nextFeed.list.searchEmptyTitle': 'No issues match this search',
          'nextFeed.list.searchEmptyMessage': 'Clear search or filters…',
          'resetFilters': 'Reset',
        })}
        locale="en"
        error={null}
        loading={false}
        stale={false}
        fetchIssues={() => {}}
        showEmpty={false}
        showFilteredEmpty
        reset={() => {}}
        showResults={false}
        issues={[]}
        resolveLocalizedText={(v) => v}
        feedUrlForBack="/next/feed?search=zzz"
        meProfile={null}
        searchActive
      />,
    )
    expect(html).toContain('data-search-empty="true"')
    expect(html).toContain('No issues match this search')
    expect(html).toContain('Clear search or filters…')
  })
})
