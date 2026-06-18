import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ISSUE_STATUS } from '../domain/types.js'
import {
  ActiveFilterChips,
  FilterPanel,
  StatusFilter,
  TypeFilter,
  LabelsFilter,
  ResetFiltersControl,
  SearchInput,
  buildChipDescriptors,
} from '../components/Filters/index.js'
import { EmptyState } from '../components/EmptyState/index.js'
import { IssueCard } from '../components/IssueCard/index.js'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { useBoardFilterDraft } from '../hooks/useBoardFilterDraft.js'
import { hasActiveBoardFilters } from '../router/boardFilterState.js'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery, serializeServerBoardQuery } from '../router/boardQuery.js'
import { issueService } from '../services/issueService.js'
import { collectLabelKeysFromIssues } from '../i18n/collectLabelKeysFromIssues.js'
import { LOCALE_SELECTOR_OPTIONS } from '../i18n/core.js'

function BoardColumnPlaceholder({ count = 3 }) {
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
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false)
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { locale, setLocale, t, resolveLocalizedText } = useI18n()
  const selectedLocaleOption = LOCALE_SELECTOR_OPTIONS.find((option) => option.value === locale) ?? LOCALE_SELECTOR_OPTIONS[0]
  const boardFilters = parseBoardQuery(location.search)
  const normalizedSearch = normalizeBoardSearch(location.search)
  const boardUrlForBack = `/board${normalizedSearch}`
  const serverFilterKey = useMemo(
    () => serializeServerBoardQuery(boardFilters),
    [boardFilters.status.join(','), boardFilters.type, boardFilters.labels.join(',')],
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

  const filteredIssues = (() => {
    if (!boardFilters.search || !boardFilters.search.trim()) return issues
    const q = boardFilters.search.toLowerCase().trim()
    return issues.filter((issue) => {
      const text = `${resolveLocalizedText(issue.title)} ${resolveLocalizedText(issue.description)}`.toLowerCase()
      return text.includes(q)
    })
  })()
  const availableLabels = useMemo(
    () => collectLabelKeysFromIssues(issues, { includeCore: false }),
    [issues],
  )
  const activeFilterChips = useMemo(
    () => buildChipDescriptors(boardFilters, t, locale),
    [boardFilters, t, locale],
  )

  function handleLocaleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsLocaleMenuOpen(false)
  }

  function applyFilters(next) {
    const q = serializeBoardQuery(next)
    navigate({ pathname: '/board', search: q }, { replace: true })
  }

  const showEmptyBoard = !loading && !hasActiveBoardFilters(boardFilters) && issues.length === 0

  return (
    <main className="board-shell" aria-label="Issue Board">
      <header className="header-strip" aria-label="Header strip">
        <div className="header-brand">
          <img
            src={logoSrc}
            alt="DOGEstonia logo"
            className="header-brand-logo"
            onError={() => setLogoSrc('/assets/DOGEstonia-logo-fallback.svg')}
          />
        </div>

        <div className="header-controls">
          <span className="header-status" aria-label="Sync status">
            {t('synced')}
          </span>
          <div className="header-locale" data-open={isLocaleMenuOpen ? 'yes' : 'no'}>
            <button
              type="button"
              className="header-locale-trigger"
              aria-label="Language selector"
              aria-expanded={isLocaleMenuOpen}
              onClick={() => setIsLocaleMenuOpen(!isLocaleMenuOpen)}
            >
              <img src={selectedLocaleOption.flagSrc} alt="" className="header-locale-flag" />
              <span className="header-locale-text">{selectedLocaleOption.nativeLabel}</span>
              <span aria-hidden="true">{isLocaleMenuOpen ? '^' : 'v'}</span>
            </button>
            {isLocaleMenuOpen ? (
              <ul className="header-locale-menu" role="listbox" aria-label="Locale options">
                {LOCALE_SELECTOR_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={`header-locale-option ${locale === option.value ? 'header-locale-option-active' : ''}`}
                      onClick={() => handleLocaleSelect(option.value)}
                    >
                      <img src={option.flagSrc} alt="" className="header-locale-flag" />
                      <span className="header-locale-text">{option.nativeLabel}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <section className="board-main">
        <aside className="board-sidebar" aria-label="Sidebar">
          <p className="board-sidebar-workspace">{t('workspace')}</p>
          <nav className="board-nav" aria-label="Board navigation">
            <button type="button" className="board-nav-item board-nav-item-active">
              {t('board')}
            </button>
            <button type="button" className="board-nav-item" disabled>
              {t('issues')}
            </button>
            <button type="button" className="board-nav-item" disabled>
              {t('settings')}
            </button>
          </nav>
        </aside>

        <section className="board-workspace">
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
                  value={boardFilters.search}
                  onChange={(search) => applyFilters({ ...boardFilters, search })}
                  placeholder={t('searchPlaceholder')}
                  ariaLabel={t('searchPlaceholder')}
                />
                <FilterPanel
                  open={isPanelOpen}
                  onToggle={togglePanel}
                  title={t('openFilters')}
                  footer={
                    <>
                      <button
                        type="button"
                        className="board-filter-apply"
                        disabled={!isDirty}
                        onClick={apply}
                      >
                        {t('filterApply')}
                      </button>
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
            <div className="board-load-error">
              <h3>{t('loadErrorTitle')}</h3>
              <p>{t('loadErrorSubtitle')}</p>
              <button type="button" className="board-retry-button" onClick={fetchIssues}>
                {t('retry')}
              </button>
            </div>
          ) : showEmptyBoard ? (
            <div className="board-no-issues">
              <EmptyState message={t('noIssuesRecorded')} />
            </div>
          ) : hasActiveFilters && filteredIssues.length === 0 ? (
            <div className="board-no-results">
              <p>{t('noResultsMatch')}</p>
              <div className="board-no-results-actions">
                <ResetFiltersControl
                  hasActiveFilters={true}
                  onReset={reset}
                  t={t}
                />
              </div>
            </div>
          ) : null}

          <section className="board-columns" aria-label="Board columns scaffold">
            <section className="board-column" aria-label="Status NEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.NEW} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.NEW).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {loading ? (
                  <BoardColumnPlaceholder />
                ) : (
                  filteredIssues
                    .filter((item) => item.status === ISSUE_STATUS.NEW)
                    .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      t={t}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))
                )}
              </div>
            </section>

            <section className="board-column" aria-label="Status IN REVIEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.IN_REVIEW} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.IN_REVIEW).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {loading ? (
                  <BoardColumnPlaceholder />
                ) : (
                  filteredIssues
                    .filter((item) => item.status === ISSUE_STATUS.IN_REVIEW)
                    .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      t={t}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))
                )}
              </div>
            </section>

            <section className="board-column" aria-label="Status PUBLISHED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.PUBLISHED} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.PUBLISHED).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {loading ? (
                  <BoardColumnPlaceholder />
                ) : (
                  filteredIssues
                    .filter((item) => item.status === ISSUE_STATUS.PUBLISHED)
                    .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      t={t}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))
                )}
              </div>
            </section>
          </section>

          <footer className="board-footer">
            {t('footer')}
          </footer>
        </section>
      </section>
    </main>
  )
}
