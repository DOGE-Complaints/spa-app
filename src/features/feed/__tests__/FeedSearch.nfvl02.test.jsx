import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { BoardSearchField } from '../search/BoardSearchField.jsx'
import { FeedToolbar } from '../FeedToolbar.jsx'
import { buildFeedListOptions } from '../buildFeedListOptions.js'
import { __buildIssuesQueryForTests as buildIssuesQuery } from '../../../repositories/GatewayIssueRepository.js'

function makeT(map = {}) {
  return (key) => map[key] ?? key
}

describe('NF-VL-02 BoardSearchField (AD-VL-01/02 · DS §4)', () => {
  it('exports named surface with label, value, clear', () => {
    const html = renderToStaticMarkup(
      <BoardSearchField
        value="pet"
        onChange={() => {}}
        placeholder="Search…"
        ariaLabel="Search published issues"
        clearAriaLabel="Clear search"
        label="Board search"
      />,
    )
    expect(html).toContain('data-testid="board-search-field"')
    expect(html).toContain('data-search-surface="BoardSearchField"')
    expect(html).toContain('Board search')
    expect(html).toContain('value="pet"')
    expect(html).toContain('data-testid="board-search-field-clear"')
    expect(html).toContain('/icons/next-shell/navigation/search.svg')
    expect(html).not.toContain('board-search-input-wrap')
    expect(html).not.toContain('board-search-input')
  })

  it('omits clear when empty', () => {
    const html = renderToStaticMarkup(
      <BoardSearchField
        value=""
        onChange={() => {}}
        placeholder="Search…"
        ariaLabel="Search published issues"
        clearAriaLabel="Clear search"
      />,
    )
    expect(html).toContain('data-has-value="false"')
    expect(html).not.toContain('data-testid="board-search-field-clear"')
  })

  it('FeedToolbar Done path uses BoardSearchField not Filters SearchInput', () => {
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
    expect(html).toContain('data-search-surface="BoardSearchField"')
    expect(html).not.toContain('board-search-input-wrap')
  })

  it('Closed search param still wires via buildFeedListOptions (NF-12 Related)', () => {
    const params = buildIssuesQuery(buildFeedListOptions({ search: 'neighbour' }))
    expect(params.get('search')).toBe('neighbour')
    expect(params.toString()).not.toContain('q=')
  })
})
