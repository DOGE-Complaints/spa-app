import { useMemo, useState } from 'react'
import { InviteOrganizationStub } from '../../components/threads/InviteOrganizationStub.jsx'
import { resolveHarnessThr02Scene } from '../../components/threads/thr02DemoFixture.js'
import { THREADS_FEED_THREAD_ICONS } from '../../components/threads/threadIcons.js'
import {
  CommentTree,
  DiscussionHeader,
  DiscussionLayout,
  DiscussionSummaryChrome,
} from './comments/index.js'
import { ComposerEntry, ThreadComposer } from './composer/index.js'
import { selectPreviewBodies } from './semantics/discussionPreview.js'
import { FeedReactionsStrip } from './FeedReactionsStrip.jsx'
import './FeedDiscussionBlock.css'
import './comments/DiscussionTreeChrome.css'
import './composer/ComposerChrome.css'

/**
 * Next-feed Discussion presentation (M152 THR-P + M153 expand) — AD-VP-01/02 · VL-04/05/06 DS §2/§6/§7.
 * Collapsed Done = DiscussionSummaryChrome; expanded Done = DiscussionLayout + light CommentTree.
 * Composer Done = ComposerEntry / ThreadComposer; classic CommentComposer ≠ Done on `#/next/feed*`.
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
  issueId = null,
  /** Test / harness: start expanded (M153 tree + oval composer) */
  initialExpanded = false,
}) {
  const [expanded, setExpanded] = useState(Boolean(initialExpanded))
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
  const previewBodies = useMemo(() => selectPreviewBodies(comments), [comments])

  const showComposerEntry =
    status === 'empty' ||
    (status === 'populated' &&
      scene !== 'reply' &&
      scene !== 'attach-allowed' &&
      scene !== 'attach-denied' &&
      scene !== 'post-fail')

  const reactionSlot = (
    <div className="feed-discussion-reaction-slot" data-testid="issue-thread-reaction-slot">
      <FeedReactionsStrip
        issueId={issueId}
        t={t}
        target="thread-root"
        initialSelected={threadRootSelected}
        summaryMarks={threadRootSummaryMarks}
        aggregateCount={threadRootAggregateCount}
        {...reactionShared}
      />
    </div>
  )

  let body = null

  if (status === 'loading') {
    body = (
      <div className="feed-discussion-state" data-testid="issue-thread-loading" role="status">
        <p>{t('threadsFeed.post.discussionLoading')}</p>
        <div className="feed-discussion-skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  } else if (status === 'empty') {
    body = (
      <div className="feed-discussion-state" data-testid="issue-thread-empty" role="status">
        <p className="feed-discussion-empty-title">{t('threadsFeed.post.empty.title')}</p>
        <p className="feed-discussion-empty-helper">{t('threadsFeed.post.empty.helper')}</p>
        {reactionSlot}
      </div>
    )
  } else if (status === 'populated' && !expanded) {
    body = (
      <DiscussionSummaryChrome
        summaryTitle={t('threadsFeed.post.existingDiscussion')}
        previewBodies={previewBodies}
        viewLabel={t('nextFeed.thread.viewDiscussion')}
        onView={() => setExpanded(true)}
        reactionSlot={reactionSlot}
      />
    )
  } else if (status === 'populated' && expanded) {
    body = (
      <div
        className="feed-discussion-state feed-discussion-expanded"
        data-testid="feed-discussion-expanded"
        data-presentation="m153-tree"
        data-vl-plane="light-comment-tree"
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
        {reactionSlot}
        <CommentTree
          t={t}
          comments={comments}
          maxDepth={effectiveMaxDepth}
          scene={scene || 'nested'}
          iconPack={icons}
          ReactionComponent={FeedReactionsStrip}
          {...composerShared}
          {...reactionShared}
        />
      </div>
    )
  } else if (status === 'unavailable') {
    body = (
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
    )
  }

  const composerFull = status === 'populated' && expanded
  const composer =
    showComposerEntry && (status === 'empty' || status === 'populated') ? (
      <div
        className="feed-discussion-composer-wrap"
        data-composer-chrome={composerFull ? 'oval' : 'oval-entry'}
        data-oval-composer="true"
        data-presentation={composerFull ? 'm153-composer' : 'm153-composer-entry'}
      >
        {composerFull ? (
          <ThreadComposer t={t} mode="root" testId="issue-thread-composer" {...composerShared} />
        ) : (
          <ComposerEntry
            t={t}
            mode="root"
            testId="issue-thread-composer"
            initiallyOpen={true}
            {...composerShared}
          />
        )}
      </div>
    ) : null

  const stub =
    showInviteStub && status !== 'unavailable' && status !== 'loading' ? (
      <div className="feed-discussion-invite-secondary" data-testid="feed-discussion-invite-slot">
        <InviteOrganizationStub t={t} iconPack={icons} />
      </div>
    ) : null

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
      <DiscussionLayout
        header={<DiscussionHeader title={t('threadsFeed.post.action.discussion')} />}
        body={body}
        composer={composer}
        stub={stub}
      />
    </section>
  )
}
