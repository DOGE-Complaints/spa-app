import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { issueService } from '../services/issueService.js'

export function IssuePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { t, resolveLocalizedText } = useI18n()
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
          <h1>{t('detailsPageTitle')}</h1>
          <p>
            {t('issuePlaceholder')}: {issue.id}
          </p>
          <p>{resolveLocalizedText(issue.title)}</p>
          <p>{resolveLocalizedText(issue.description)}</p>
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
