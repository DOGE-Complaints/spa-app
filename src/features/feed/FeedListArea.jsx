import { Button } from '../../components/Button'
import { IssueCard } from '../../components/IssueCard/index.js'
import { BoardIssuePost, LiveIssueThreadMount } from '../../components/threads/index.js'
import { FeedFeedSkeleton } from './FeedFeedSkeleton.jsx'

/**
 * Feed result region: loading / empty / filtered-empty / error / stale / list.
 * Shell chrome owned by AppShell — this is content-only (M149 panels).
 */
export function FeedListArea({
  t,
  locale,
  error,
  loading,
  stale,
  fetchIssues,
  showEmpty,
  showFilteredEmpty,
  reset,
  showResults,
  issues,
  resolveLocalizedText,
  feedUrlForBack,
  meProfile,
}) {
  return (
    <>
      {stale && showResults ? (
        <div className="feed-stale-banner" data-testid="feed-stale" role="status">
          <img
            className="feed-icon"
            src="/icons/next-feed/status/info.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('nextFeed.list.stale')}</span>
          <Button type="button" hierarchy="secondary" intent="retry" onClick={fetchIssues}>
            <img
              className="feed-icon feed-icon--inline"
              src="/icons/next-feed/actions/retry.svg"
              alt=""
              aria-hidden="true"
            />
            {t('nextFeed.list.retry')}
          </Button>
        </div>
      ) : null}

      {error && !showResults ? (
        <div className="feed-state feed-load-error" data-testid="feed-load-error" role="alert">
          <img
            className="feed-icon feed-icon--lg"
            src="/icons/next-feed/status/error.svg"
            alt=""
            aria-hidden="true"
          />
          <h3>{t('nextFeed.list.error')}</h3>
          <Button type="button" hierarchy="primary" intent="retry" onClick={fetchIssues}>
            <img
              className="feed-icon feed-icon--inline"
              src="/icons/next-feed/actions/retry.svg"
              alt=""
              aria-hidden="true"
            />
            {t('nextFeed.list.retry')}
          </Button>
        </div>
      ) : null}

      {loading && !showResults ? (
        <section
          className="feed-list"
          data-testid="feed-list"
          aria-busy="true"
          aria-label={t('nextFeed.list.loading')}
        >
          <p className="feed-loading-status" role="status">
            {t('nextFeed.list.loading')}
          </p>
          <FeedFeedSkeleton />
        </section>
      ) : null}

      {!loading && showEmpty ? (
        <div className="feed-state feed-empty" data-testid="feed-empty" role="status">
          <img
            className="feed-icon feed-icon--lg"
            src="/icons/next-feed/status/info.svg"
            alt=""
            aria-hidden="true"
          />
          <h3>{t('nextFeed.list.empty')}</h3>
        </div>
      ) : null}

      {!loading && showFilteredEmpty ? (
        <div className="feed-state feed-filtered-empty" data-testid="feed-filtered-empty" role="status">
          <h3>{t('nextFeed.list.filteredEmptyTitle')}</h3>
          <p>{t('nextFeed.list.filteredEmptyMessage')}</p>
          <Button type="button" hierarchy="secondary" onClick={reset}>
            {t('resetFilters')}
          </Button>
        </div>
      ) : null}

      {showResults ? (
        <section
          className="feed-list"
          id="next-feed-list"
          data-testid="feed-list"
          aria-label={t('nextFeed.list.accessible')}
          aria-busy={loading ? 'true' : undefined}
        >
          {issues.map((item) => (
            <BoardIssuePost
              key={item.id}
              thread={
                <LiveIssueThreadMount
                  issueId={item.id}
                  t={t}
                  profile={meProfile}
                  returnTo={`#/next/feed`}
                />
              }
            >
              <IssueCard
                issue={item}
                locale={locale}
                resolveLocalizedText={resolveLocalizedText}
                t={t}
                showOpenAffordance
                to={`/next/feed/issue/${item.id}?from=${encodeURIComponent(feedUrlForBack)}`}
              />
            </BoardIssuePost>
          ))}
        </section>
      ) : null}
    </>
  )
}
