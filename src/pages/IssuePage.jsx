import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { issueService } from '../services/issueService.js'

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
  const { locale, t, resolveLocalizedText } = useI18n()
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <main className="issue-page-shell">
      <header className="issue-page-header">
        <button type="button" className="issue-back-button" onClick={() => navigate(boardBackUrl)}>
          {t('backToBoard')}
        </button>
      </header>
      {loading ? (
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
                      {String(l).toUpperCase()}
                    </span>
                  ))}
                </span>
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
      )}
    </main>
  )
}
