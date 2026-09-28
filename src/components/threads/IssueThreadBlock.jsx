import { CommentComposer } from './CommentComposer.jsx'
import { CommentTree } from './CommentTree.jsx'
import { InviteOrganizationStub } from './InviteOrganizationStub.jsx'
import { ReactionControls } from './ReactionControls.jsx'
import { resolveHarnessThr02Scene } from './thr02DemoFixture.js'
import './IssueThreadBlock.css'

/**
 * Shared discussion shell (M143/M148 + M144 tree/composer).
 * Prod mounts pass comments/maxDepth from knobs+tree (THR-07) — no demo default.
 * THR-08: profile / onSubmitComment / returnTo for live write.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'} status
 * @param {(k: string) => string} t
 * @param {() => void} [onRetry]
 * @param {number} [maxDepth] configured depth from knobs (not a fixed product law)
 * @param {Array} [comments] presentation nodes
 */
export function IssueThreadBlock({
  status = 'empty',
  t,
  onRetry,
  maxDepth = 2,
  comments = [],
  profile = null,
  identityVerified = null,
  returnTo = '#/board',
  onSubmitComment,
  onPostSuccess,
  onAttachRef,
  mediaAllowedTypes = null,
  maxReactions,
  reactionsEnable = null,
  onReact,
  threadRootSummaryMarks = null,
  threadRootAggregateCount = null,
  threadRootSelected = [],
}) {
  const scene = status === 'populated' ? resolveHarnessThr02Scene('nested') : null
  const effectiveMaxDepth = scene === 'max-depth' ? 2 : maxDepth

  const composerShared = {
    profile,
    identityVerified,
    returnTo,
    onSubmitComment,
    onPostSuccess,
    onAttachRef,
    mediaAllowedTypes,
  }

  const reactionShared = {
    maxReactions,
    reactionsEnable,
    onReact,
  }

  return (
    <section
      className={`issue-thread-block issue-thread-block--${status}`}
      data-testid="issue-thread-block"
      data-thread-status={status}
      data-thr02-scene={scene || undefined}
      aria-label={t('threadsFeed.post.action.discussion')}
    >
      <header className="issue-thread-block-label">
        <span>{t('threadsFeed.post.action.discussion')}</span>
      </header>

      {status !== 'unavailable' && status !== 'loading' ? (
        <div className="issue-thread-actions" data-testid="issue-thread-actions" role="group">
          <button type="button" className="issue-thread-action" data-testid="thread-action-react">
            <img src="/icons/threads-feed/ic-react.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.action.react')}</span>
          </button>
          <button type="button" className="issue-thread-action" data-testid="thread-action-discussion">
            <img src="/icons/threads-feed/ic-discussion.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.action.discussion')}</span>
          </button>
          <InviteOrganizationStub t={t} />
        </div>
      ) : null}

      {status === 'loading' ? (
        <div className="issue-thread-state" data-testid="issue-thread-loading" role="status">
          <img
            className="issue-thread-spinner"
            src="/icons/story-handoff/ic-spinner.png"
            alt=""
            aria-hidden="true"
          />
          <p>{t('threadsFeed.post.discussionLoading')}</p>
          <div className="issue-thread-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}

      {status === 'empty' ? (
        <div className="issue-thread-state" data-testid="issue-thread-empty" role="status">
          <p className="issue-thread-empty-title">{t('threadsFeed.post.empty.title')}</p>
          <p className="issue-thread-empty-helper">{t('threadsFeed.post.empty.helper')}</p>
          <div className="issue-thread-reaction-slot" data-testid="issue-thread-reaction-slot">
            <ReactionControls
              t={t}
              target="thread-root"
              initialSelected={threadRootSelected}
              summaryMarks={threadRootSummaryMarks}
              aggregateCount={threadRootAggregateCount}
              {...reactionShared}
            />
          </div>
        </div>
      ) : null}

      {status === 'populated' ? (
        <div className="issue-thread-state issue-thread-populated" data-testid="issue-thread-populated">
          <div className="issue-thread-summary" data-testid="issue-thread-summary">
            <p className="issue-thread-summary-title">{t('threadsFeed.post.existingDiscussion')}</p>
          </div>
          <div className="issue-thread-reaction-slot" data-testid="issue-thread-reaction-slot">
            <ReactionControls
              t={t}
              target="thread-root"
              initialSelected={threadRootSelected}
              summaryMarks={threadRootSummaryMarks}
              aggregateCount={threadRootAggregateCount}
              {...reactionShared}
            />
          </div>
          <CommentTree
            t={t}
            comments={comments}
            maxDepth={effectiveMaxDepth}
            scene={scene || 'nested'}
            {...composerShared}
            {...reactionShared}
          />
        </div>
      ) : null}

      {status === 'unavailable' ? (
        <div className="issue-thread-state issue-thread-unavailable" data-testid="issue-thread-unavailable" role="alert">
          <p className="issue-thread-unavailable-title">
            <img src="/icons/story-handoff/ic-cloud-error.png" alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.discussionUnavailable')}</span>
          </p>
          <p className="issue-thread-unavailable-helper">
            {t('threadsFeed.post.discussionUnavailableHelper')}
          </p>
          {typeof onRetry === 'function' ? (
            <button type="button" className="issue-thread-retry" data-testid="issue-thread-retry" onClick={onRetry}>
              {t('threadsFeed.post.tryAgain')}
            </button>
          ) : null}
        </div>
      ) : null}

      {status === 'empty' ? (
        <CommentComposer t={t} mode="root" testId="issue-thread-composer" {...composerShared} />
      ) : null}

      {status === 'populated' &&
      scene !== 'reply' &&
      scene !== 'attach-allowed' &&
      scene !== 'attach-denied' &&
      scene !== 'post-fail' ? (
        <CommentComposer t={t} mode="root" testId="issue-thread-composer" {...composerShared} />
      ) : null}
    </section>
  )
}
