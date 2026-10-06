import { Button } from '../../components/Button'
import {
  ActiveFilterChips,
  DateRangeFilter,
  FilterPanel,
  GeoFilter,
  InstitutionFilter,
  StatusFilter,
  TypeFilter,
  LabelsFilter,
  ResetFiltersControl,
  SearchInput,
} from '../../components/Filters/index.js'
import { ListMapToggle } from '../../components/map/index.js'

/**
 * Board toolbar: title, search, filter panel, chips, list/map toggle, submit CTA.
 * Presentational — state/handlers owned by BoardPage orchestrator.
 */
export function BoardToolbar({
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
  showResults,
  boardView,
  setBoardView,
  mapEligible,
  submitHref,
  submitExternal,
}) {
  return (
    <header className="board-toolbar">
      <div className="board-toolbar-left">
        <div className="board-toolbar-copy">
          <h2>{t('board')}</h2>
          <p className="board-routing-query" aria-label="Board query state">
            {normalizedSearch || '(no query)'}
          </p>
        </div>
        <div className="board-filters-row">
          <SearchInput
            value={searchDraft}
            onChange={setSearchDraft}
            placeholder={t('searchPlaceholder')}
            ariaLabel={t('searchPlaceholder')}
            clearAriaLabel={t('clear')}
          />
          <FilterPanel
            open={isPanelOpen}
            onToggle={togglePanel}
            title={t('openFilters')}
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
                <Button
                  type="button"
                  hierarchy="primary"
                  disabled={!isDirty}
                  onClick={apply}
                >
                  {t('filterApply')}
                </Button>
                <ResetFiltersControl
                  hasActiveFilters={hasActiveFilters}
                  onReset={reset}
                  t={t}
                />
              </>
            }
          >
            <StatusFilter
              status={pending.status}
              onChange={(status) => setPending((current) => ({ ...current, status }))}
              locale={locale}
              t={t}
              variant="panel"
            />
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
            onReset={reset}
            t={t}
          />
        </div>
        <ActiveFilterChips chips={activeFilterChips} onRemove={removeChip} />
        {showResults ? (
          <ListMapToggle
            view={boardView}
            onChange={setBoardView}
            mapEligible={mapEligible}
            t={t}
          />
        ) : null}
      </div>
      <a
        href={submitHref}
        target={submitExternal ? '_blank' : undefined}
        rel={submitExternal ? 'noopener noreferrer' : undefined}
        className="board-cta"
        data-testid="board-submit-cta"
        aria-label={t('howItWorks.cta.submitAccessibleLabel')}
      >
        <span>{t('publicHome.nav.submitStory')}</span>
        {submitExternal ? (
          <img
            className="board-cta-external-icon"
            src="/icons/public-home/ic-external-link.png"
            alt=""
            aria-hidden="true"
          />
        ) : null}
      </a>
    </header>
  )
}
