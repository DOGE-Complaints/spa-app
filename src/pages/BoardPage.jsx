import { useEffect, useMemo, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildChipDescriptors } from '../components/Filters/index.js'
import { useOptionalSessionShell } from '../auth/SessionShellContext.jsx'
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
import { isMapEligible } from '../map/issueGeo.js'
import { getStoryGptHref, hasStoryGptUrl } from '../config/storyGptUrl.js'
import { sortIssuesByDiscussionPriority } from '../board/sortIssuesByDiscussionPriority.js'
import { useBoardDiscussionFlags } from '../hooks/useBoardDiscussionFlags.js'
import { BoardToolbar, BoardFeedArea } from '../features/board/index.js'
import './BoardPage.css'

export function BoardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [boardView, setBoardView] = useState('list')
  const { locale, t, resolveLocalizedText } = useI18n()
  const sessionShell = useOptionalSessionShell()
  const meProfile = sessionShell?.profile ?? null
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()
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

  const discussionFlagsEnabled = !loading && !error && filteredIssues.length > 0
  const { flags: discussionFlags, ready: discussionFlagsReady } = useBoardDiscussionFlags(
    filteredIssues,
    { enabled: discussionFlagsEnabled },
  )
  const listIssues = useMemo(
    () => sortIssuesByDiscussionPriority(filteredIssues, discussionFlags),
    [filteredIssues, discussionFlags],
  )

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
  /** PH-12 Target: sort-before-stable-list — keep List skeleton until flags settle. */
  const showListPendingSort = showResults && boardView === 'list' && !discussionFlagsReady
  const mapEligible = useMemo(() => isMapEligible(filteredIssues), [filteredIssues])

  useEffect(() => {
    if (!mapEligible && boardView === 'map') {
      setBoardView('list')
    }
  }, [mapEligible, boardView])

  return (
    <main className="board-shell" aria-label="Issue Board">
      <BoardToolbar
        t={t}
        locale={locale}
        normalizedSearch={normalizedSearch}
        searchDraft={searchDraft}
        setSearchDraft={setSearchDraft}
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
        showResults={showResults}
        boardView={boardView}
        setBoardView={setBoardView}
        mapEligible={mapEligible}
        submitHref={submitHref}
        submitExternal={submitExternal}
      />
      <BoardFeedArea
        t={t}
        locale={locale}
        error={error}
        loading={loading}
        fetchIssues={fetchIssues}
        showEmptyBoard={showEmptyBoard}
        showFilteredEmpty={showFilteredEmpty}
        reset={reset}
        showResults={showResults}
        boardView={boardView}
        mapEligible={mapEligible}
        filteredIssues={filteredIssues}
        listIssues={listIssues}
        resolveLocalizedText={resolveLocalizedText}
        boardUrlForBack={boardUrlForBack}
        showListPendingSort={showListPendingSort}
        meProfile={meProfile}
      />
    </main>
  )
}
