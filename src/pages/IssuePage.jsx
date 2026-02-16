import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { findDemoIssueById } from '../router/mockIssues.js'

export function IssuePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { resolveLocalizedText } = useI18n()

  const pageTitle = resolveLocalizedText({
    et: 'Probleemi detailvaade',
    ru: 'Детальный просмотр заявки',
    en: 'Issue details view',
  })
  const placeholder = resolveLocalizedText({
    et: 'Probleemi mustand',
    ru: 'Черновик заявки',
    en: 'Issue placeholder',
  })
  const backLabel = resolveLocalizedText({
    et: 'Tagasi töölauale',
    ru: 'Назад к доске',
    en: 'Back to Board',
  })
  const notFoundLabel = resolveLocalizedText({
    et: 'Probleemi ei leitud',
    ru: 'Заявка не найдена',
    en: 'Issue not found',
  })
  const loadErrorLabel = resolveLocalizedText({
    et: 'Laadimisviga',
    ru: 'Ошибка загрузки',
    en: 'Load error',
  })
  const retryLabel = resolveLocalizedText({
    et: 'Proovi uuesti',
    ru: 'Повторить',
    en: 'Retry',
  })

  const boardBackUrl = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const from = params.get('from') || ''
    if (from.startsWith('/board')) return from
    return '/board'
  }, [location.search])

  const issue = findDemoIssueById(id)
  const isLoadError = id === 'DE-ERROR'

  return (
    <main className="issue-page-shell">
      <header className="issue-page-header">
        <button type="button" className="issue-back-button" onClick={() => navigate(boardBackUrl)}>
          {backLabel}
        </button>
      </header>
      {isLoadError ? (
        <section className="issue-details-state issue-details-state-load-error">
          <h1>{loadErrorLabel}</h1>
          <p>{id}</p>
          <button type="button" className="issue-retry-button" onClick={() => navigate(0)}>
            {retryLabel}
          </button>
        </section>
      ) : issue ? (
        <section className="issue-details-state issue-details-state-default">
          <h1>{pageTitle}</h1>
          <p>
            {placeholder}: {issue.id}
          </p>
          <p>{resolveLocalizedText(issue.title)}</p>
          <p>{resolveLocalizedText(issue.description)}</p>
        </section>
      ) : (
        <section className="issue-details-state issue-details-state-not-found">
          <h1>{notFoundLabel}</h1>
          <p>{id}</p>
        </section>
      )}
    </main>
  )
}
