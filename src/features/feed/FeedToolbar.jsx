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
  SearchInput,
} from '../../components/Filters/index.js'
import { FeedListMapToggle } from './FeedListMapToggle.jsx'

/**
 * Next-feed toolbar: live text search (M149 / AD-VP-03) + structural filters + List|Map.
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
  feedView = 'list',
  setFeedView,
  mapEligible = false,
}) {
  return (
    <header className="feed-toolbar" data-testid="feed-toolbar">
      <div className="feed-toolbar-left">
        <div className="feed-toolbar-copy">
          <h2>{t('nextFeed.toolbar.title')}</h2>
          <p className="feed-routing-query" aria-label={t('nextFeed.toolbar.queryAria')}>
            {normalizedSearch || '(no query)'}
          </p>
        </div>
        <div className="feed-filters-row">
          <div className="feed-search" data-testid="feed-search">
            <SearchInput
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
                <Button type="button" hierarchy="primary" disabled={!isDirty} onClick={apply}>
                  {t('filterApply')}
                </Button>
                <ResetFiltersControl hasActiveFilters={hasActiveFilters} onReset={reset} t={t} />
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
          <ResetFiltersControl hasActiveFilters={hasActiveFilters} onReset={reset} t={t} />
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
