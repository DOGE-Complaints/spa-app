import { Button } from '../../components/Button'
import {
  ActiveFilterChips,
  DateRangeFilter,
  FilterPanel,
  GeoFilter,
  InstitutionFilter,
  TypeFilter,
  LabelsFilter,
  ResetFiltersControl,
} from '../../components/Filters/index.js'
import { BoardSearchField } from './search/index.js'
import { BoardHeading, ResultsContext } from './board/index.js'
import { selectResultsContextStatus } from './semantics/resultsContext.js'
import { FeedListMapToggle } from './FeedListMapToggle.jsx'
import './board/BoardChrome.css'

const RESULTS_LABEL_KEY = Object.freeze({
  populated: 'nextFeed.toolbar.resultsPopulated',
  refreshing: 'nextFeed.toolbar.resultsRefreshing',
  filtered: 'nextFeed.toolbar.resultsFiltered',
  search: 'nextFeed.toolbar.resultsSearch',
  idle: 'nextFeed.toolbar.resultsIdle',
})

/**
 * Next-feed toolbar: DS BoardHeading + ResultsContext (VL-08 / M149) + BoardSearchField (VL-02).
 * Classic `#/board` toolbar unchanged. Closed `search` wiring stays in host (NF-12 Related).
 */
export function FeedToolbar({
  t,
  locale,
  normalizedSearch,
  searchDraft,
  setSearchDraft,
  pending,
  setPending,
  isPanelOpen,
  togglePanel,
  isDirty,
  hasActiveFilters,
  apply,
  reset,
  availableInstitutions,
  availableGeoOptions,
  availableLabels,
  formatInstitution,
  activeFilterChips,
  removeChip,
  showResults = false,
  loading = false,
  showFilteredEmpty = false,
  searchActive = false,
  feedView = 'list',
  setFeedView,
  mapEligible = false,
}) {
  const resultsStatus = selectResultsContextStatus({
    showResults,
    loading,
    showFilteredEmpty,
    searchActive: searchActive || Boolean(String(searchDraft || '').trim()),
  })
  const resultsLabel = t(RESULTS_LABEL_KEY[resultsStatus] || RESULTS_LABEL_KEY.idle)

  return (
    <header className="feed-toolbar" data-testid="feed-toolbar">
      <div className="feed-toolbar-left">
        <div className="feed-toolbar-copy">
          <BoardHeading title={t('nextFeed.toolbar.title')} subtitle={t('nextFeed.toolbar.subtitle')} />
          <ResultsContext status={resultsStatus} label={resultsLabel} />
          {/* Dev/debug only — not ResultsContext Done surface (anti-mixing FR-VL-08). */}
          <span className="feed-routing-query" hidden aria-hidden="true" data-routing-query={normalizedSearch || ''}>
            {normalizedSearch || '(no query)'}
          </span>
        </div>
        <div className="feed-filters-row">
          <div className="feed-search" data-testid="feed-search">
            <BoardSearchField
              value={searchDraft}
              onChange={setSearchDraft}
              placeholder={t('nextFeed.toolbar.searchPlaceholder')}
              ariaLabel={t('nextFeed.toolbar.searchAria')}
              clearAriaLabel={t('nextFeed.toolbar.searchClear')}
            />
          </div>
          <img
            className="feed-icon"
            src="/icons/next-feed/actions/filter.svg"
            alt=""
            aria-hidden="true"
            data-testid="feed-filter-icon"
          />
          <FilterPanel
            open={isPanelOpen}
            onToggle={togglePanel}
            title={t('nextFeed.toolbar.filters')}
            institutionSlot={
              <InstitutionFilter
                institution={pending.institution}
                availableInstitutions={availableInstitutions}
                onChange={(institution) => setPending((current) => ({ ...current, institution }))}
                formatInstitution={formatInstitution}
                t={t}
                variant="panel"
              />
            }
            dateSlot={
              <DateRangeFilter
                createdAfter={pending.created_after}
                createdBefore={pending.created_before}
                onChangeAfter={(created_after) => setPending((current) => ({ ...current, created_after }))}
                onChangeBefore={(created_before) => setPending((current) => ({ ...current, created_before }))}
                t={t}
                locale={locale}
                variant="panel"
              />
            }
            geoSlot={
              <GeoFilter
                geo={{
                  geo_district: pending.geo_district,
                  geo_settlement: pending.geo_settlement,
                  geo_region: pending.geo_region,
                  geo_country: pending.geo_country,
                  geo_postal_code: pending.geo_postal_code,
                }}
                availableOptions={availableGeoOptions}
                onChange={(field, values) => setPending((current) => ({ ...current, [field]: values }))}
                t={t}
                variant="panel"
              />
            }
            footer={
              <>
                <ResetFiltersControl
                  hasActiveFilters={hasActiveFilters}
                  isDirty={isDirty}
                  onReset={reset}
                  t={t}
                />
                <Button
                  type="button"
                  hierarchy="primary"
                  className="board-filter-apply"
                  disabled={!isDirty}
                  onClick={apply}
                >
                  {t('filterApply')}
                </Button>
              </>
            }
          >
            <TypeFilter
              type={pending.type}
              onChange={(type) => setPending((current) => ({ ...current, type }))}
              t={t}
              variant="panel"
            />
            <LabelsFilter
              labels={pending.labels}
              availableLabels={availableLabels}
              onChange={(labels) => setPending((current) => ({ ...current, labels }))}
              t={t}
              locale={locale}
              variant="panel"
            />
          </FilterPanel>
          <ResetFiltersControl
            hasActiveFilters={hasActiveFilters}
            isDirty={isDirty}
            onReset={reset}
            t={t}
          />
        </div>
        <ActiveFilterChips chips={activeFilterChips} onRemove={removeChip} />
        {showResults ? (
          <FeedListMapToggle
            view={feedView}
            onChange={setFeedView}
            mapEligible={mapEligible}
            t={t}
          />
        ) : null}
      </div>
    </header>
  )
}
