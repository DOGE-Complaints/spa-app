import { useEffect, useMemo, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  buildChipDescriptors,
} from '../components/Filters/index.js'
import { Button } from '../components/Button'
import { IssueCard } from '../components/IssueCard/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useBoardFilterDraft } from '../hooks/useBoardFilterDraft.js'
import { useDebouncedBoardSearch } from '../hooks/useDebouncedBoardSearch.js'
import { hasActiveBoardFilters } from '../router/boardFilterState.js'
import { issueMatchesSearchQuery } from '../router/issueSearchMatch.js'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery, serializeServerBoardQuery } from '../router/boardQuery.js'
import { issueService } from '../services/issueService.js'
import { collectLabelKeysFromIssues } from '../i18n/collectLabelKeysFromIssues.js'
import {
  collectInstitutionsFromIssues,
  institutionFilterValue,
} from '../i18n/collectInstitutionsFromIssues.js'
import { collectGeoAdminOptionsFromIssues } from '../i18n/collectGeoAdminOptionsFromIssues.js'
import { GEO_ADMIN_FILTER_KEYS } from '../i18n/geoAdminFilterKeys.js'
import { AppShell, Header, PublicFooter, Sidebar } from '../components/AppShell/index.js'

function BoardFeedSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="board-skeleton-card" aria-hidden="true" />
      ))}
    </>
  )
}

export function BoardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { locale, t, resolveLocalizedText } = useI18n()
  const boardFilters = parseBoardQuery(location.search)
  const normalizedSearch = normalizeBoardSearch(location.search)
  const boardUrlForBack = `/board${normalizedSearch}`
  const serverFilterKey = useMemo(
    () => serializeServerBoardQuery(boardFilters),
    [
      boardFilters.status.join(','),
      boardFilters.type,
      boardFilters.labels.join(','),
      boardFilters.institution,
      boardFilters.created_after,
      boardFilters.created_before,
      ...GEO_ADMIN_FILTER_KEYS.map((key) => boardFilters[key].join(',')),
    ],
  )

  const {
    pending,
    setPending,
    isPanelOpen,
    togglePanel,
    isDirty,
    hasActiveFilters,
    apply,
    reset,
    removeChip,
  } = useBoardFilterDraft({
    applied: boardFilters,
    navigate,
  })

  function fetchIssues() {
    setLoading(true)
    setError(null)
    const options = {
      status: boardFilters.status.length > 0 ? boardFilters.status : undefined,
      type: boardFilters.type || undefined,
      labels: boardFilters.labels.length > 0 ? boardFilters.labels : undefined,
      institution: boardFilters.institution || undefined,
      created_after: boardFilters.created_after || undefined,
      created_before: boardFilters.created_before || undefined,
    }
    for (const key of GEO_ADMIN_FILTER_KEYS) {
      if (boardFilters[key].length > 0) options[key] = boardFilters[key]
    }
    issueService
      .getIssues(options)
      .then((list) => {
        setIssues(list)
      })
      .catch((err) => {
        setError(err)
        setIssues([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchIssues()
  }, [serverFilterKey])

  function applyFilters(next) {
    const q = serializeBoardQuery(next)
    navigate({ pathname: '/board', search: q }, { replace: true })
  }

  const commitSearch = useCallback(
    (search) => {
      applyFilters({ ...boardFilters, search })
    },
    [boardFilters, navigate],
  )

  const { searchDraft, setSearchDraft } = useDebouncedBoardSearch(boardFilters.search, commitSearch)

  const filteredIssues = useMemo(() => {
    if (!boardFilters.search || !boardFilters.search.trim()) return issues
    return issues.filter((issue) => issueMatchesSearchQuery(issue, boardFilters.search))
  }, [issues, boardFilters.search])
  const availableLabels = useMemo(
    () => collectLabelKeysFromIssues(issues, { includeCore: false }),
    [issues],
  )
  const availableInstitutions = useMemo(
    () => collectInstitutionsFromIssues(issues),
    [issues],
  )
  const availableGeoOptions = useMemo(
    () => collectGeoAdminOptionsFromIssues(issues),
    [issues],
  )
  const formatInstitution = useCallback(
    (value) => {
      const match = issues.find((issue) => institutionFilterValue(issue.institution) === value)
      if (match?.institution) return resolveLocalizedText(match.institution)
      return value
    },
    [issues, resolveLocalizedText],
  )
  const activeFilterChips = useMemo(
    () => buildChipDescriptors(boardFilters, t, locale, formatInstitution),
    [boardFilters, t, locale, formatInstitution],
  )

  const showEmptyBoard = !loading && !error && !hasActiveBoardFilters(boardFilters) && issues.length === 0
  const showFilteredEmpty =
    !loading && !error && hasActiveBoardFilters(boardFilters) && filteredIssues.length === 0
  const showResults = !loading && !error && filteredIssues.length > 0

  return (
    <main className="board-shell" aria-label="Issue Board">
      <AppShell
        header={<Header />}
        sidebar={<Sidebar activeNav="board" />}
        footer={<PublicFooter />}
      >
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
            </div>
            <a
              href="https://chatgpt.com/g/g-RkVU9xLWN-dogestonia"
              target="_blank"
              rel="noopener noreferrer"
              className="board-cta"
            >
              {t('createIssue')}
            </a>
          </header>

          {error ? (
            <div className="board-feed-state board-load-error" data-testid="board-load-error" role="alert">
              <img
                className="board-feed-state-icon"
                src="/icons/story-handoff/ic-cloud-error.png"
                alt=""
                aria-hidden="true"
              />
              <h3>{t('publicHome.board.error.title')}</h3>
              <p>{t('publicHome.board.error.message')}</p>
              <Button type="button" hierarchy="primary" intent="retry" onClick={fetchIssues}>
                {t('publicHome.board.error.retry')}
              </Button>
            </div>
          ) : null}

          {loading ? (
            <section
              className="board-feed"
              data-testid="board-feed"
              aria-busy="true"
              aria-label={t('publicHome.board.loading.accessible')}
            >
              <BoardFeedSkeleton />
            </section>
          ) : null}

          {!loading && showEmptyBoard ? (
            <div className="board-feed-state board-no-issues" data-testid="board-empty" role="status">
              <img
                className="board-feed-state-icon"
                src="/icons/public-home/ic-empty-board.png"
                alt=""
                aria-hidden="true"
              />
              <h3>{t('publicHome.board.empty.title')}</h3>
              <p>{t('publicHome.board.empty.message')}</p>
            </div>
          ) : null}

          {!loading && showFilteredEmpty ? (
            <div className="board-feed-state board-no-results" data-testid="board-filtered-empty" role="status">
              <h3>{t('publicHome.board.filteredEmpty.title')}</h3>
              <p>{t('publicHome.board.filteredEmpty.message')}</p>
              <div className="board-no-results-actions">
                <Button type="button" hierarchy="secondary" onClick={reset}>
                  {t('publicHome.board.filteredEmpty.reset')}
                </Button>
              </div>
            </div>
          ) : null}

          {showResults ? (
            <section className="board-feed" data-testid="board-feed" aria-label="Issue feed">
              {filteredIssues.map((item) => (
                <IssueCard
                  key={item.id}
                  issue={item}
                  locale={locale}
                  resolveLocalizedText={resolveLocalizedText}
                  t={t}
                  showOpenAffordance
                  to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                />
              ))}
            </section>
          ) : null}

      </AppShell>
    </main>
  )
}
