import { Button } from '../../components/Button'
import { BoardIssuePost } from '../../components/threads/index.js'
import { FeedCivicPost } from './FeedCivicPost.jsx'
import { FeedThreadMount } from './FeedThreadMount.jsx'
import { FeedFeedSkeleton } from './FeedFeedSkeleton.jsx'
import { FeedMapArea } from './FeedMapArea.jsx'
import {
  FeedReactionOpenProvider,
  useFeedReactionOpen,
} from './FeedReactionOpenContext.jsx'

function FeedIssueCard({ item, locale, resolveLocalizedText, t, feedUrlForBack, meProfile }) {
  const bridge = useFeedReactionOpen()
  return (
    <BoardIssuePost
      thread={
        <FeedThreadMount
          issueId={item.id}
          t={t}
          profile={meProfile}
          returnTo="#/next/feed"
        />
      }
    >
      <FeedCivicPost
        issue={item}
        locale={locale}
        resolveLocalizedText={resolveLocalizedText}
        t={t}
        to={`/next/feed/issue/${item.id}?from=${encodeURIComponent(feedUrlForBack)}`}
        onOpenReactions={() => bridge?.openThreadRootPicker(item.id)}
      />
    </BoardIssuePost>
  )
}

/**
 * Feed result region: loading / empty / filtered-empty / error / stale / list|map.
 * Shell chrome owned by AppShell — this is content-only (M149/M151 panels).
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
  feedView = 'list',
  mapEligible = false,
  onReturnToList,
  searchActive = false,
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
          data-presentation="m149-list"
          data-list-state="loading"
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
        <div
          className="feed-state feed-filtered-empty"
          data-testid="feed-filtered-empty"
          data-search-empty={searchActive ? 'true' : undefined}
          role="status"
        >
          <h3>
            {searchActive
              ? t('nextFeed.list.searchEmptyTitle')
              : t('nextFeed.list.filteredEmptyTitle')}
          </h3>
          <p>
            {searchActive
              ? t('nextFeed.list.searchEmptyMessage')
              : t('nextFeed.list.filteredEmptyMessage')}
          </p>
          <Button type="button" hierarchy="secondary" onClick={reset}>
            {t('resetFilters')}
          </Button>
        </div>
      ) : null}

      {showResults && feedView === 'map' && mapEligible ? (
        <FeedMapArea
          issues={issues}
          resolveLocalizedText={resolveLocalizedText}
          t={t}
          feedUrlForBack={feedUrlForBack}
          onReturnToList={onReturnToList}
        />
      ) : null}

      {showResults && !(feedView === 'map' && mapEligible) ? (
        <section
          className={`feed-list${loading ? ' feed-list--refreshing' : ''}`}
          id="next-feed-list"
          data-testid="feed-list"
          data-presentation="m149-list"
          data-list-state={loading ? 'refreshing' : 'populated'}
          aria-label={t('nextFeed.list.accessible')}
          aria-busy={loading ? 'true' : undefined}
        >
          {loading ? (
            <p className="feed-refresh-status" role="status" data-testid="feed-refresh-status">
              {t('nextFeed.list.loading')}
            </p>
          ) : null}
          <FeedReactionOpenProvider>
            {issues.map((item) => (
              <FeedIssueCard
                key={item.id}
                item={item}
                locale={locale}
                resolveLocalizedText={resolveLocalizedText}
                t={t}
                feedUrlForBack={feedUrlForBack}
                meProfile={meProfile}
              />
            ))}
          </FeedReactionOpenProvider>
        </section>
      ) : null}
    </>
  )
}
