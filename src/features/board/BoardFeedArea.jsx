import { Button } from '../../components/Button'
import { IssueCard } from '../../components/IssueCard/index.js'
import { BoardIssuePost, LiveIssueThreadMount } from '../../components/threads/index.js'
import { ContinuumResidual, EarlySignalDiscovery } from '../../components/earlySignal/index.js'
import { BoardIssuesMap } from '../../components/map/index.js'
import { BoardFeedSkeleton } from './BoardFeedSkeleton.jsx'

/**
 * Board feed region: error / loading / empty / filtered-empty / list|map continuum + threads.
 * Presentational — data fetch & view state owned by BoardPage.
 */
export function BoardFeedArea({
  t,
  locale,
  error,
  loading,
  fetchIssues,
  showEmptyBoard,
  showFilteredEmpty,
  reset,
  showResults,
  boardView,
  mapEligible,
  filteredIssues,
  listIssues,
  resolveLocalizedText,
  boardUrlForBack,
  showListPendingSort,
  meProfile,
}) {
  return (
    <>
      {error ? (
        <div className="board-feed-state board-load-error" data-testid="board-load-error" role="alert">
          <img
            className="board-feed-state-icon"
            src="/icons/story-handoff/ic-cloud-error.png"
            alt=""
            aria-hidden="true"
          />
          <h3>{t('publicHome.board.error.title')}</h3>
          <p>{t('publicHome.board.error.message')}</p>
          <Button type="button" hierarchy="primary" intent="retry" onClick={fetchIssues}>
            {t('publicHome.board.error.retry')}
          </Button>
        </div>
      ) : null}

      {loading ? (
        <section
          className="board-feed"
          data-testid="board-feed"
          aria-busy="true"
          aria-label={t('publicHome.board.loading.accessible')}
        >
          <BoardFeedSkeleton />
        </section>
      ) : null}

      {!loading && showEmptyBoard ? <EarlySignalDiscovery /> : null}

      {!loading && showFilteredEmpty ? (
        <div className="board-feed-state board-no-results" data-testid="board-filtered-empty" role="status">
          <h3>{t('publicHome.board.filteredEmpty.title')}</h3>
          <p>{t('publicHome.board.filteredEmpty.message')}</p>
          <div className="board-no-results-actions">
            <Button type="button" hierarchy="secondary" onClick={reset}>
              {t('publicHome.board.filteredEmpty.reset')}
            </Button>
          </div>
        </div>
      ) : null}

      {showResults ? (
        <div className="board-continuum" data-testid="board-continuum">
          {boardView === 'map' && mapEligible ? (
            <BoardIssuesMap
              issues={filteredIssues}
              resolveLocalizedText={resolveLocalizedText}
              t={t}
              boardUrlForBack={boardUrlForBack}
            />
          ) : (
            <section
              className="board-feed"
              id="issue-feed"
              data-testid="board-feed"
              aria-label="Issue feed"
              aria-busy={showListPendingSort ? 'true' : undefined}
              data-discussion-sort={showListPendingSort ? 'pending' : 'ready'}
            >
              {showListPendingSort ? (
                <BoardFeedSkeleton />
              ) : (
                listIssues.map((item) => (
                  <BoardIssuePost
                    key={item.id}
                    thread={
                      <LiveIssueThreadMount
                        issueId={item.id}
                        t={t}
                        profile={meProfile}
                        returnTo={`#/board`}
                      />
                    }
                  >
                    <IssueCard
                      issue={item}
                      locale={locale}
                      resolveLocalizedText={resolveLocalizedText}
                      t={t}
                      showOpenAffordance
                      to={`/issue/${item.id}?from=${encodeURIComponent(boardUrlForBack)}`}
                    />
                  </BoardIssuePost>
                ))
              )}
            </section>
          )}
          <ContinuumResidual />
        </div>
      ) : null}
    </>
  )
}
