import { useMemo, useState } from 'react'
import { CommentComposer } from '../../components/threads/CommentComposer.jsx'
import { CommentTree } from '../../components/threads/CommentTree.jsx'
import { InviteOrganizationStub } from '../../components/threads/InviteOrganizationStub.jsx'
import { ReactionControls } from '../../components/threads/ReactionControls.jsx'
import { resolveHarnessThr02Scene } from '../../components/threads/thr02DemoFixture.js'
import { THREADS_FEED_THREAD_ICONS } from '../../components/threads/threadIcons.js'
import './FeedDiscussionBlock.css'

const COLLAPSED_PREVIEW_LIMIT = 2

/**
 * Next-feed Discussion presentation (M152 THR-P + M153 expand) — AD-VP-01/02.
 * Closed semantics via props from LiveIssueThreadMount; no classic M143 3-button row.
 *
 * @param {object} props — same contract as IssueThreadBlock + feed presentation
 */
export function FeedDiscussionBlock({
  status = 'empty',
  t,
  onRetry,
  maxDepth = 2,
  comments = [],
  profile = null,
  identityVerified = null,
  returnTo = '#/next/feed',
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
  iconPack = null,
  showInviteStub = true,
}) {
  const [expanded, setExpanded] = useState(false)
  const scene = status === 'populated' ? resolveHarnessThr02Scene('nested') : null
  const effectiveMaxDepth = scene === 'max-depth' ? 2 : maxDepth
  const icons = iconPack || THREADS_FEED_THREAD_ICONS

  const composerShared = {
    profile,
    identityVerified,
    returnTo,
    onSubmitComment,
    onPostSuccess,
    onAttachRef,
    mediaAllowedTypes,
    iconPack: icons,
  }

  const reactionShared = {
    maxReactions,
    reactionsEnable,
    onReact,
    iconPack: icons,
  }

  // M152 THR-P-C: up to two literal `comments[].body` in response order (not roots-only).
  const previewBodies = useMemo(() => {
    return comments
      .map((c) => String(c?.body ?? '').trim())
      .filter(Boolean)
      .slice(0, COLLAPSED_PREVIEW_LIMIT)
  }, [comments])

  const showComposerEntry =
    status === 'empty' ||
    (status === 'populated' &&
      scene !== 'reply' &&
      scene !== 'attach-allowed' &&
      scene !== 'attach-denied' &&
      scene !== 'post-fail')

  return (
    <section
      className={`feed-discussion-block feed-discussion-block--${status}${
        status === 'populated' && expanded ? ' is-expanded' : ''
      }`}
      data-testid="feed-discussion-block"
      data-thread-status={status}
      data-presentation="m152-collapsed"
      data-expanded={status === 'populated' ? String(expanded) : undefined}
      data-thr02-scene={scene || undefined}
      aria-label={t('threadsFeed.post.action.discussion')}
    >
      <header className="feed-discussion-label">
        <span>{t('threadsFeed.post.action.discussion')}</span>
      </header>

      {/* FR-NF-08.2: no classic React|Discussion|Invite primary row — civic strip owns actions */}

      {status === 'loading' ? (
        <div className="feed-discussion-state" data-testid="issue-thread-loading" role="status">
          <p>{t('threadsFeed.post.discussionLoading')}</p>
          <div className="feed-discussion-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}

      {status === 'empty' ? (
        <div className="feed-discussion-state" data-testid="issue-thread-empty" role="status">
          <p className="feed-discussion-empty-title">{t('threadsFeed.post.empty.title')}</p>
          <p className="feed-discussion-empty-helper">{t('threadsFeed.post.empty.helper')}</p>
          <div className="feed-discussion-reaction-slot" data-testid="issue-thread-reaction-slot">
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

      {status === 'populated' && !expanded ? (
        <div
          className="feed-discussion-state feed-discussion-collapsed"
          data-testid="feed-discussion-collapsed"
        >
          <p className="feed-discussion-summary-title">{t('threadsFeed.post.existingDiscussion')}</p>
          <ul className="feed-discussion-previews" data-testid="feed-discussion-previews">
            {previewBodies.map((body, i) => (
              <li key={`preview-${i}`} className="feed-discussion-preview-body">
                {body}
              </li>
            ))}
          </ul>
          <div className="feed-discussion-reaction-slot" data-testid="issue-thread-reaction-slot">
            <ReactionControls
              t={t}
              target="thread-root"
              initialSelected={threadRootSelected}
              summaryMarks={threadRootSummaryMarks}
              aggregateCount={threadRootAggregateCount}
              {...reactionShared}
            />
          </div>
          <button
            type="button"
            className="feed-discussion-view"
            data-testid="feed-discussion-view"
            aria-expanded="false"
            onClick={() => setExpanded(true)}
          >
            {t('nextFeed.thread.viewDiscussion')}
          </button>
        </div>
      ) : null}

      {status === 'populated' && expanded ? (
        <div
          className="feed-discussion-state feed-discussion-expanded"
          data-testid="feed-discussion-expanded"
          data-presentation="m153-tree"
        >
          <div className="feed-discussion-expanded-bar">
            <p className="feed-discussion-summary-title">{t('threadsFeed.post.existingDiscussion')}</p>
            <button
              type="button"
              className="feed-discussion-collapse"
              data-testid="feed-discussion-collapse"
              aria-expanded="true"
              onClick={() => setExpanded(false)}
            >
              {t('nextFeed.thread.collapseDiscussion')}
            </button>
          </div>
          <div className="feed-discussion-reaction-slot" data-testid="issue-thread-reaction-slot">
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
            iconPack={icons}
            {...composerShared}
            {...reactionShared}
          />
        </div>
      ) : null}

      {status === 'unavailable' ? (
        <div
          className="feed-discussion-state feed-discussion-unavailable"
          data-testid="issue-thread-unavailable"
          role="alert"
        >
          <p className="feed-discussion-unavailable-title">
            <img src={icons.error} alt="" aria-hidden="true" />
            <span>{t('threadsFeed.post.discussionUnavailable')}</span>
          </p>
          <p className="feed-discussion-unavailable-helper">
            {t('threadsFeed.post.discussionUnavailableHelper')}
          </p>
          {typeof onRetry === 'function' ? (
            <button
              type="button"
              className="feed-discussion-retry"
              data-testid="issue-thread-retry"
              onClick={onRetry}
            >
              <img src={icons.retry} alt="" aria-hidden="true" className="feed-discussion-retry-icon" />
              {t('threadsFeed.post.tryAgain')}
            </button>
          ) : null}
        </div>
      ) : null}

      {showComposerEntry && (status === 'empty' || (status === 'populated' && !expanded)) ? (
        <div className="feed-discussion-composer-wrap" data-composer-chrome="oval-entry">
          <CommentComposer t={t} mode="root" testId="issue-thread-composer" {...composerShared} />
        </div>
      ) : null}

      {status === 'populated' && expanded && showComposerEntry ? (
        <div className="feed-discussion-composer-wrap" data-composer-chrome="oval">
          <CommentComposer t={t} mode="root" testId="issue-thread-composer" {...composerShared} />
        </div>
      ) : null}

      {showInviteStub && status !== 'unavailable' && status !== 'loading' ? (
        <div className="feed-discussion-invite-secondary" data-testid="feed-discussion-invite-slot">
          <InviteOrganizationStub t={t} iconPack={icons} />
        </div>
      ) : null}
    </section>
  )
}
