import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { issueService } from '../../services/issueService.js'
import { FeedIssueDetail } from './FeedIssueDetail.jsx'
import { useFeedNarrow } from './useFeedNarrow.js'
import './FeedIssueMount.css'

/**
 * Issue mount parity: desktop modal · narrow sheet · forced route page (M158).
 * Parent chrome differs; civic + Discussion product is FeedIssueDetail.
 *
 * @param {object} props
 * @param {string} props.issueId
 * @param {(k: string) => string} props.t
 * @param {string} props.locale
 * @param {Function} props.resolveLocalizedText
 * @param {object|null} [props.meProfile]
 * @param {string} [props.feedUrlForBack]
 * @param {'auto'|'modal'|'sheet'|'route'} [props.presentation]
 */
export function FeedIssueMount({
  issueId,
  t,
  locale,
  resolveLocalizedText,
  meProfile = null,
  feedUrlForBack = '/next/feed',
  presentation: presentationProp = 'auto',
}) {
  const navigate = useNavigate()
  const narrow = useFeedNarrow()
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [httpStatus, setHttpStatus] = useState(null)

  const presentation = useMemo(() => {
    if (presentationProp && presentationProp !== 'auto') return presentationProp
    return narrow ? 'sheet' : 'modal'
  }, [presentationProp, narrow])

  const fetchIssue = useCallback(() => {
    if (!issueId) return
    setLoading(true)
    setError(null)
    setIssue(null)
    setHttpStatus(null)
    issueService
      .getIssue(issueId)
      .then((found) => {
        if (!found) {
          setIssue(null)
          setHttpStatus(404)
          return
        }
        setIssue(found)
        setHttpStatus(200)
      })
      .catch((err) => {
        setError(err)
        const status = err?.status ?? err?.response?.status ?? null
        setHttpStatus(status)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [issueId])

  useEffect(() => {
    fetchIssue()
  }, [fetchIssue])

  useEffect(() => {
    if (presentation === 'route') return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [presentation])

  const onBack = useCallback(() => {
    navigate(feedUrlForBack.startsWith('/') ? feedUrlForBack : `/${feedUrlForBack}`)
  }, [navigate, feedUrlForBack])

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && presentation !== 'route') {
        event.stopPropagation()
        onBack()
      }
    },
    [onBack, presentation],
  )

  const notFound = Boolean(!loading && !issue && httpStatus === 404)
  const hashBack = feedUrlForBack.startsWith('#')
    ? feedUrlForBack
    : `#${feedUrlForBack.startsWith('/') ? feedUrlForBack : `/${feedUrlForBack}`}`

  const openAsPageTo = `/next/feed/issue/${encodeURIComponent(issueId)}?presentation=route&from=${encodeURIComponent(
    feedUrlForBack.startsWith('/') ? feedUrlForBack : `/${feedUrlForBack}`,
  )}`

  const chrome = (
    <>
      <header className="feed-issue-mount-header">
        <h2 className="feed-issue-mount-title" id="feed-issue-mount-title">
          {issue ? `Issue ${issue.id}` : `Issue ${issueId}`}
        </h2>
        <div className="feed-issue-mount-actions">
          {presentation !== 'route' ? (
            <Link
              to={openAsPageTo}
              className="feed-issue-mount-open-page"
              data-testid="feed-issue-open-as-page"
            >
              {t('nextFeed.mount.openAsPage')}
            </Link>
          ) : null}
          <button
            type="button"
            className="feed-issue-mount-close"
            data-testid="feed-issue-mount-close"
            aria-label={t('nextFeed.mount.close')}
            onClick={onBack}
          >
            <img
              src="/icons/next-shell/actions/close.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span>{t('nextFeed.mount.close')}</span>
          </button>
        </div>
      </header>
      <div className="feed-issue-mount-body">
        <FeedIssueDetail
          issueId={issueId}
          issue={issue}
          loading={loading}
          error={error}
          notFound={notFound}
          onRetry={fetchIssue}
          onBack={onBack}
          locale={locale}
          resolveLocalizedText={resolveLocalizedText}
          t={t}
          meProfile={meProfile}
          returnTo={hashBack}
        />
      </div>
    </>
  )

  if (presentation === 'route') {
    return (
      <div
        className="feed-issue-mount feed-issue-mount--route"
        data-testid="feed-issue-mount"
        data-presentation="route"
        aria-labelledby="feed-issue-mount-title"
      >
        {chrome}
      </div>
    )
  }

  return (
    <div
      className={`feed-issue-mount-root feed-issue-mount-root--${presentation}`}
      data-testid="feed-issue-mount-root"
      data-presentation={presentation}
    >
      <button
        type="button"
        className="feed-issue-mount-scrim"
        data-testid="feed-issue-mount-scrim"
        aria-label={t('nextFeed.mount.close')}
        onClick={onBack}
      />
      <div
        className={`feed-issue-mount feed-issue-mount--${presentation}`}
        data-testid="feed-issue-mount"
        data-presentation={presentation}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-issue-mount-title"
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        {chrome}
      </div>
    </div>
  )
}
