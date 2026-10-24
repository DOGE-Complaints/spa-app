import { useState } from 'react'
import { Button } from '../../components/Button'
import { BoardIssuePost } from '../../components/threads/index.js'
import { BoardFeedState, StaleResultsNotice } from './board/index.js'
import { FeedCivicPost } from './FeedCivicPost.jsx'
import { FeedThreadMount } from './FeedThreadMount.jsx'
import { FeedFeedSkeleton } from './FeedFeedSkeleton.jsx'
import { FeedMapArea } from './FeedMapArea.jsx'
import {
  FeedReactionOpenProvider,
  useFeedReactionOpen,
} from './FeedReactionOpenContext.jsx'
import './board/BoardChrome.css'

/**
 * List card — CR-27: lift thread_root_reactions from FeedThreadMount (CR-25 mapping)
 * into civic strip. No invent list/gateway schema — reuse tree GET path already mounted.
 */
function FeedIssueCard({ item, locale, resolveLocalizedText, t, feedUrlForBack, meProfile }) {
  const bridge = useFeedReactionOpen()
  const [rootRx, setRootRx] = useState(null)
  // Shelter: BoardIssuePost remains list chrome until VL layout stories displace it.
  // Not claimable as VL Done identity (AD-VL / ban-matrix) — identity lives in FeedCivicPost.
  return (
    <div
      data-testid="feed-list-card-shelter"
      data-vl-shelter="BoardIssuePost"
      data-vl-done-claim="false"
      data-feed-cr27="true"
      data-feed-cr27-selected-count={
        rootRx ? String(Array.isArray(rootRx.selected) ? rootRx.selected.length : 0) : undefined
      }
    >
      <BoardIssuePost
        thread={
          <FeedThreadMount
            issueId={item.id}
            t={t}
            profile={meProfile}
            returnTo="#/next/feed"
            onThreadRootReactions={setRootRx}
          />
        }
      >
        <FeedCivicPost
          issue={item}
          locale={locale}
          resolveLocalizedText={resolveLocalizedText}
          t={t}
          /* NF-14: same `to` drives hit Link (open row retired) — route shape held */
          to={`/next/feed/issue/${item.id}?from=${encodeURIComponent(feedUrlForBack)}`}
          onOpenReactions={() => bridge?.openThreadRootPicker(item.id)}
          initialSelected={rootRx?.selected}
          initialSummaryMarks={rootRx?.summaryMarks}
          initialAggregateCount={rootRx?.aggregateCount}
        />
      </BoardIssuePost>
    </div>
  )
}

/**
 * Feed result region: loading / empty / filtered-empty / error / stale / list|map.
 * Shell chrome owned by AppShell — this is content-only (M149/M151 panels).
 * CR-27: list cards hydrate own React via CR-25 tree lift (no invent gateway schema).
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
        <StaleResultsNotice>
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
        </StaleResultsNotice>
      ) : null}

      {error && !showResults ? (
        <BoardFeedState kind="error" className="feed-state feed-load-error">
          <div data-testid="feed-load-error" role="alert">
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
        </BoardFeedState>
      ) : null}

      {loading && !showResults ? (
        <BoardFeedState kind="loading">
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
        </BoardFeedState>
      ) : null}

      {!loading && showEmpty ? (
        <BoardFeedState kind="empty" className="feed-state feed-empty">
          <div data-testid="feed-empty" role="status">
            <img
              className="feed-icon feed-icon--lg"
              src="/icons/next-feed/status/info.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>{t('nextFeed.list.empty')}</h3>
          </div>
        </BoardFeedState>
      ) : null}

      {!loading && showFilteredEmpty ? (
        <BoardFeedState kind="filtered-empty" className="feed-state feed-filtered-empty">
          <div
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
        </BoardFeedState>
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
          data-feed-cr27-list="true"
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
