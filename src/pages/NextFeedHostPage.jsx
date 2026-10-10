import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildChipDescriptors } from '../components/Filters/index.js'
import { useOptionalSessionShell } from '../auth/SessionShellContext.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useBoardFilterDraft } from '../hooks/useBoardFilterDraft.js'
import { hasActiveBoardFilters } from '../router/boardFilterState.js'
import {
  normalizeBoardSearch,
  parseBoardQuery,
  serializeBoardQuery,
  serializeServerBoardQuery,
} from '../router/boardQuery.js'
import { issueService } from '../services/issueService.js'
import { buildFeedListOptions } from '../features/feed/buildFeedListOptions.js'
import { collectLabelKeysFromIssues } from '../i18n/collectLabelKeysFromIssues.js'
import {
  collectInstitutionsFromIssues,
  institutionFilterValue,
} from '../i18n/collectInstitutionsFromIssues.js'
import { collectGeoAdminOptionsFromIssues } from '../i18n/collectGeoAdminOptionsFromIssues.js'
import { GEO_ADMIN_FILTER_KEYS } from '../i18n/geoAdminFilterKeys.js'
import { isMapEligible } from '../map/issueGeo.js'
import { FeedToolbar, FeedListArea } from '../features/feed/index.js'
import './NextFeedHostPage.css'
import '../features/feed/FeedHost.css'

const FEED_PATH = '/next/feed'

/** Strip live search from feed URL (DUI-Q12 — FE enable later). */
function stripFeedSearch(filters) {
  return { ...filters, search: '' }
}

/**
 * Thin L2 host for `#/next/feed` — feed visual plane in `features/feed/`.
 * Shell chrome OOS (next-shell Done). Public list locks `status=PUBLISHED`.
 */
export function NextFeedHostPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stale, setStale] = useState(false)
  const [feedView, setFeedView] = useState('list')
  const { locale, t, resolveLocalizedText } = useI18n()
  const sessionShell = useOptionalSessionShell()
  const meProfile = sessionShell?.profile ?? null

  const rawFilters = parseBoardQuery(location.search)
  const boardFilters = useMemo(() => stripFeedSearch(rawFilters), [
    rawFilters.status.join(','),
    rawFilters.type,
    rawFilters.labels.join(','),
    rawFilters.institution,
    rawFilters.created_after,
    rawFilters.created_before,
    ...GEO_ADMIN_FILTER_KEYS.map((key) => rawFilters[key].join(',')),
  ])

  const normalizedSearch = normalizeBoardSearch(
    serializeBoardQuery(stripFeedSearch(boardFilters)),
  )
  const feedUrlForBack = `${FEED_PATH}${normalizedSearch}`

  const serverFilterKey = useMemo(
    () => serializeServerBoardQuery(boardFilters),
    [
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
    pathname: FEED_PATH,
  })

  const fetchIssues = useCallback(() => {
    setLoading(true)
    setError(null)
    const options = buildFeedListOptions(boardFilters)
    issueService
      .getIssues(options)
      .then((list) => {
        setIssues(list)
        setStale(false)
        setError(null)
      })
      .catch((err) => {
        setError(err)
        setIssues((current) => {
          if (current.length > 0) setStale(true)
          return current
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [
    boardFilters.type,
    boardFilters.labels.join(','),
    boardFilters.institution,
    boardFilters.created_after,
    boardFilters.created_before,
    serverFilterKey,
    ...GEO_ADMIN_FILTER_KEYS.map((key) => boardFilters[key].join(',')),
  ])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

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

  const filtersActive = hasActiveBoardFilters(boardFilters)
  const showEmpty = !loading && !error && !filtersActive && issues.length === 0
  const showFilteredEmpty = !loading && !error && filtersActive && issues.length === 0
  const showResults = issues.length > 0
  const showStale = Boolean(stale && error && issues.length > 0)
  const mapEligible = useMemo(() => isMapEligible(issues), [issues])

  useEffect(() => {
    if (!mapEligible && feedView === 'map') {
      setFeedView('list')
    }
  }, [mapEligible, feedView])

  return (
    <div className="board-shell next-feed-host-route" data-testid="next-feed-host">
      <main className="feed-host" data-testid="feed-host" aria-label={t('nextFeed.list.accessible')}>
        <FeedToolbar
          t={t}
          locale={locale}
          normalizedSearch={normalizedSearch}
          pending={pending}
          setPending={setPending}
          isPanelOpen={isPanelOpen}
          togglePanel={togglePanel}
          isDirty={isDirty}
          hasActiveFilters={hasActiveFilters}
          apply={apply}
          reset={reset}
          availableInstitutions={availableInstitutions}
          availableGeoOptions={availableGeoOptions}
          availableLabels={availableLabels}
          formatInstitution={formatInstitution}
          activeFilterChips={activeFilterChips}
          removeChip={removeChip}
          showResults={showResults || showStale}
          feedView={feedView}
          setFeedView={setFeedView}
          mapEligible={mapEligible}
        />
        <FeedListArea
          t={t}
          locale={locale}
          error={error}
          loading={loading}
          stale={showStale}
          fetchIssues={fetchIssues}
          showEmpty={showEmpty}
          showFilteredEmpty={showFilteredEmpty}
          reset={reset}
          showResults={showResults || showStale}
          issues={issues}
          resolveLocalizedText={resolveLocalizedText}
          feedUrlForBack={feedUrlForBack}
          meProfile={meProfile}
          feedView={feedView}
          mapEligible={mapEligible}
          onReturnToList={() => setFeedView('list')}
        />
      </main>
    </div>
  )
}
