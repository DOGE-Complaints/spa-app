import { Button } from '../../components/Button'
import { FeedCivicPost } from './FeedCivicPost.jsx'
import { FeedThreadMount } from './FeedThreadMount.jsx'
import {
  FeedReactionOpenProvider,
  useFeedReactionOpen,
} from './FeedReactionOpenContext.jsx'

function FeedIssueDetailReady({
  issue,
  locale,
  resolveLocalizedText,
  t,
  meProfile,
  returnTo,
}) {
  const bridge = useFeedReactionOpen()
  return (
    <section
      className="feed-issue-detail"
      data-testid="feed-issue-detail"
      data-issue-status="ready"
      data-issue-id={issue.id}
    >
      <FeedCivicPost
        issue={issue}
        locale={locale}
        resolveLocalizedText={resolveLocalizedText}
        t={t}
        onOpenReactions={() => bridge?.openThreadRootPicker(issue.id)}
      />
      <div className="feed-issue-detail-thread">
        <FeedThreadMount
          issueId={issue.id}
          t={t}
          profile={meProfile}
          returnTo={returnTo}
        />
      </div>
    </section>
  )
}

/**
 * Shared Issue + Discussion product for modal / sheet / route mounts (M158).
 * Civic failure states are mount-local; thread failures stay inside FeedThreadMount.
 */
export function FeedIssueDetail({
  issueId,
  issue,
  loading,
  error,
  notFound,
  onRetry,
  onBack,
  locale,
  resolveLocalizedText,
  t,
  meProfile,
  returnTo = '#/next/feed',
}) {
  if (loading) {
    return (
      <section
        className="feed-issue-detail feed-issue-detail--loading"
        data-testid="feed-issue-detail"
        data-issue-status="loading"
        aria-busy="true"
      >
        <p role="status">{t('issuePlaceholder')}</p>
        <div className="feed-issue-detail-skeleton" aria-hidden="true" />
      </section>
    )
  }

  if (notFound) {
    return (
      <section
        className="feed-issue-detail feed-issue-detail--not-found"
        data-testid="feed-issue-detail"
        data-issue-status="not-found"
        role="alert"
      >
        <h2>{t('notFoundTitle')}</h2>
        <p>{issueId}</p>
        <Button type="button" hierarchy="secondary" onClick={onBack}>
          {t('backToBoard')}
        </Button>
      </section>
    )
  }

  if (error || !issue) {
    return (
      <section
        className="feed-issue-detail feed-issue-detail--error"
        data-testid="feed-issue-detail"
        data-issue-status="error"
        role="alert"
      >
        <h2>{t('loadErrorTitle')}</h2>
        <p>{issueId}</p>
        <Button type="button" hierarchy="primary" intent="retry" onClick={onRetry}>
          <img
            className="feed-icon feed-icon--inline"
            src="/icons/next-feed/actions/retry.svg"
            alt=""
            aria-hidden="true"
          />
          {t('nextFeed.list.retry')}
        </Button>
        <Button type="button" hierarchy="secondary" onClick={onBack}>
          {t('backToBoard')}
        </Button>
      </section>
    )
  }

  return (
    <FeedReactionOpenProvider>
      <FeedIssueDetailReady
        issue={issue}
        locale={locale}
        resolveLocalizedText={resolveLocalizedText}
        t={t}
        meProfile={meProfile}
        returnTo={returnTo}
      />
    </FeedReactionOpenProvider>
  )
}
