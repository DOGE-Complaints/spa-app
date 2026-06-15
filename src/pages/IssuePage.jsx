import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { formatLabelKey } from '../i18n/labelDisplay.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { issueService } from '../services/issueService.js'

const LANGUAGE_OPTIONS = Object.freeze([
  { value: 'et', nativeLabel: 'Eesti', flagSrc: '/assets/ET.svg' },
  { value: 'ru', nativeLabel: 'Русский', flagSrc: '/assets/RU.svg' },
  { value: 'en', nativeLabel: 'English', flagSrc: '/assets/US.svg' },
])

function formatDate(value) {
  if (!value || typeof value !== 'string') return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return value
  }
}

function hasDescription(issue) {
  if (!issue?.description) return false
  if (typeof issue.description === 'string') return Boolean(issue.description.trim())
  const obj = issue.description
  return Boolean(obj?.et?.trim() || obj?.ru?.trim() || obj?.en?.trim())
}

export function IssuePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, setLocale, t, resolveLocalizedText } = useI18n()
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false)
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const selectedLocaleOption = LANGUAGE_OPTIONS.find((option) => option.value === locale) ?? LANGUAGE_OPTIONS[0]

  const boardBackUrl = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const from = params.get('from') || ''
    if (from.startsWith('/board')) return from
    return '/board'
  }, [location.search])

  function fetchIssue() {
    if (!id) return
    setLoading(true)
    setError(null)
    setIssue(null)
    issueService
      .getIssue(id)
      .then((found) => {
        setIssue(found)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchIssue()
  }, [id])

  function handleLocaleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsLocaleMenuOpen(false)
  }

  const content = loading ? (
        <section className="issue-details-state issue-details-state-loading">
          <p>{t('issuePlaceholder')}</p>
        </section>
      ) : error ? (
        <section className="issue-details-state issue-details-state-load-error">
          <h1>{t('loadErrorTitle')}</h1>
          <p>{id}</p>
          <button type="button" className="issue-retry-button" onClick={fetchIssue}>
            {t('retry')}
          </button>
        </section>
      ) : issue ? (
        <section className="issue-details-state issue-details-state-default">
          <header className="issue-details-header">
            <span className="issue-details-id">{issue.id}</span>
            <StatusBadge status={issue.status} locale={locale} />
            <span className="issue-details-type">{t(`issueType.${issue.type}`)}</span>
            <h1 className="issue-details-title">{resolveLocalizedText(issue.title)}</h1>
          </header>
          {hasDescription(issue) ? (
            <section className="issue-details-body">
              <p>{resolveLocalizedText(issue.description)}</p>
            </section>
          ) : null}
          <section className="issue-details-metadata">
            {issue.labels?.length > 0 ? (
              <div className="issue-details-metadata-row">
                <span className="issue-details-metadata-label">{t('metadataLabels')}:</span>
                <span className="issue-details-metadata-value">
                  {issue.labels.map((l) => (
                    <span key={l} className="issue-details-chip">
                      {formatLabelKey(t, String(l))}
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
            {issue.institution ? (
              <div className="issue-details-metadata-row">
                <span className="issue-details-metadata-label">{t('metadataInstitution')}:</span>
                <span className="issue-details-metadata-value">{resolveLocalizedText(issue.institution)}</span>
              </div>
            ) : null}
            {issue.created_at ? (
              <div className="issue-details-metadata-row">
                <span className="issue-details-metadata-label">{t('metadataCreated')}:</span>
                <span className="issue-details-metadata-value">{formatDate(issue.created_at)}</span>
              </div>
            ) : null}
            {issue.arweave_txid ? (
              <div className="issue-details-metadata-row">
                <span className="issue-details-metadata-label">{t('metadataArweaveTxid')}:</span>
                <span className="issue-details-metadata-value issue-details-metadata-monospace">{issue.arweave_txid}</span>
              </div>
            ) : null}
            {issue.image_txid ? (
              <div className="issue-details-metadata-row">
                <span className="issue-details-metadata-label">{t('metadataImageTxid')}:</span>
                <span className="issue-details-metadata-value issue-details-metadata-monospace">{issue.image_txid}</span>
              </div>
            ) : null}
            {issue.image_hash ? (
              <div className="issue-details-metadata-row issue-details-metadata-secondary">
                <span className="issue-details-metadata-label">{t('metadataImageHash')}:</span>
                <span className="issue-details-metadata-value issue-details-metadata-monospace">{issue.image_hash}</span>
              </div>
            ) : null}
          </section>
        </section>
      ) : (
        <section className="issue-details-state issue-details-state-not-found">
          <h1>{t('notFoundTitle')}</h1>
          <p>{id}</p>
        </section>
      )

  return (
    <main className="board-shell" aria-label="Issue Details">
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
            <Link to={boardBackUrl} className="board-nav-item board-nav-item-active">
              {t('board')}
            </Link>
            <button type="button" className="board-nav-item" disabled>
              {t('issues')}
            </button>
            <button type="button" className="board-nav-item" disabled>
              {t('settings')}
            </button>
          </nav>
        </aside>

        <section className="board-workspace">
          <header className="issue-page-header">
            <button type="button" className="issue-back-button" onClick={() => navigate(boardBackUrl)}>
              {t('backToBoard')}
            </button>
          </header>
          {content}
          <footer className="board-footer">
            {t('footer')}
          </footer>
        </section>
      </section>
    </main>
  )
}
