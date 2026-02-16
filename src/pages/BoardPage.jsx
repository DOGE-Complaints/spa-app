import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ISSUE_STATUS } from '../domain/types.js'
import {
  StatusFilter,
  TypeFilter,
  LabelsFilter,
  ResetFiltersControl,
} from '../components/Filters/index.js'
import { IssueCard } from '../components/IssueCard/index.js'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { normalizeBoardSearch, parseBoardQuery, serializeBoardQuery } from '../router/boardQuery.js'
import { issueService } from '../services/issueService.js'

const AVAILABLE_LABELS = ['bureaucracy', 'infrastructure']

const LANGUAGE_OPTIONS = Object.freeze([
  { value: 'et', nativeLabel: 'Eesti', flagSrc: '/assets/ET.svg' },
  { value: 'ru', nativeLabel: 'Русский', flagSrc: '/assets/RU.svg' },
  { value: 'en', nativeLabel: 'English', flagSrc: '/assets/US.svg' },
])

export function BoardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false)
  const [issues, setIssues] = useState([])
  const { locale, setLocale, t, resolveLocalizedText } = useI18n()
  const selectedLocaleOption = LANGUAGE_OPTIONS.find((option) => option.value === locale) ?? LANGUAGE_OPTIONS[0]
  const boardFilters = parseBoardQuery(location.search)
  const normalizedSearch = normalizeBoardSearch(location.search)
  const boardUrlForBack = `/board${normalizedSearch}`

  useEffect(() => {
    const options = {
      status: boardFilters.status.length > 0 ? boardFilters.status : undefined,
      type: boardFilters.type || undefined,
      labels: boardFilters.labels.length > 0 ? boardFilters.labels : undefined,
    }
    issueService.getIssues(options).then((list) => {
      setIssues(list)
    })
  }, [location.search])

  const filteredIssues = (() => {
    if (!boardFilters.search || !boardFilters.search.trim()) return issues
    const q = boardFilters.search.toLowerCase().trim()
    return issues.filter((issue) => {
      const text = `${resolveLocalizedText(issue.title)} ${resolveLocalizedText(issue.description)}`.toLowerCase()
      return text.includes(q)
    })
  })()

  function handleLocaleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsLocaleMenuOpen(false)
  }

  const hasActiveFilters =
    boardFilters.status.length > 0 ||
    !!boardFilters.type ||
    boardFilters.labels.length > 0 ||
    !!(boardFilters.search && boardFilters.search.trim())

  function applyFilters(next) {
    const q = serializeBoardQuery(next)
    navigate({ pathname: '/board', search: q }, { replace: true })
  }

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
                {LANGUAGE_OPTIONS.map((option) => (
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
              <StatusFilter
                status={boardFilters.status}
                onChange={(status) => applyFilters({ ...boardFilters, status })}
                locale={locale}
                t={t}
              />
              <TypeFilter
                type={boardFilters.type}
                onChange={(type) => applyFilters({ ...boardFilters, type })}
                t={t}
              />
              <LabelsFilter
                labels={boardFilters.labels}
                availableLabels={AVAILABLE_LABELS}
                onChange={(labels) => applyFilters({ ...boardFilters, labels })}
                t={t}
              />
              <ResetFiltersControl
                hasActiveFilters={hasActiveFilters}
                onReset={() => applyFilters({ status: [], type: '', labels: [], search: '' })}
                t={t}
              />
            </div>
            </div>
            <button type="button" className="board-cta" disabled>
              {t('createIssue')}
            </button>
          </header>

          {hasActiveFilters && filteredIssues.length === 0 ? (
            <div className="board-no-results">
              <p>{t('noResultsMatch')}</p>
              <div className="board-no-results-actions">
                <ResetFiltersControl
                  hasActiveFilters={true}
                  onReset={() => applyFilters({ status: [], type: '', labels: [], search: '' })}
                  t={t}
                />
              </div>
            </div>
          ) : null}

          <section className="board-columns" aria-label="Board columns scaffold">
            <section className="board-column" aria-label="Status NEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.NEW} locale={locale} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.NEW).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {filteredIssues
                  .filter((item) => item.status === ISSUE_STATUS.NEW)
                  .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      footerText={t('footer')}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))}
              </div>
            </section>

            <section className="board-column" aria-label="Status VERIFIED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.VERIFIED} locale={locale} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.VERIFIED).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {filteredIssues
                  .filter((item) => item.status === ISSUE_STATUS.VERIFIED)
                  .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      footerText={t('footer')}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))}
              </div>
            </section>

            <section className="board-column" aria-label="Status IN REVIEW column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.IN_REVIEW} locale={locale} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.IN_REVIEW).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {filteredIssues
                  .filter((item) => item.status === ISSUE_STATUS.IN_REVIEW)
                  .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      footerText={t('footer')}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))}
              </div>
            </section>

            <section className="board-column" aria-label="Status ARCHIVED column">
              <header className="board-column-header">
                <StatusBadge status={ISSUE_STATUS.ARCHIVED} locale={locale} />
                <span>{filteredIssues.filter((item) => item.status === ISSUE_STATUS.ARCHIVED).length}</span>
              </header>
              <div className="board-column-divider" />
              <div className="board-column-placeholder">
                {filteredIssues
                  .filter((item) => item.status === ISSUE_STATUS.ARCHIVED)
                  .map((item) => (
                    <IssueCard
                      key={item.id}
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      footerText={t('footer')}
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  ))}
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
