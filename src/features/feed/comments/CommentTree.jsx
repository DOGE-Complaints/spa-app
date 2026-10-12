import { useState } from 'react'
import { CommentComposer } from '../../../components/threads/CommentComposer.jsx'
import { THREADS_FEED_THREAD_ICONS } from '../../../components/threads/threadIcons.js'
import {
  isAtMaxDepth,
  shouldShowDepthNotice,
  visualIndentDepth,
} from '../semantics/commentTreeDepth.js'
import { CommentNode } from './CommentNode.jsx'
import { ReplyDepthNotice } from './ReplyDepthNotice.jsx'
import './DiscussionTreeChrome.css'

/**
 * DS §6 next-feed CommentTree — light M152/M153 plane (AD-VL-01/02).
 * Classic `components/threads/CommentTree.jsx` remains board Done path — not imported here as chrome.
 * Composer reply UI stays classic shelter until VL-06.
 */
export function CommentTree({
  t,
  comments = [],
  maxDepth = 2,
  scene = 'nested',
  replyParentId: forcedReplyParentId = null,
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
  iconPack = null,
  ReactionComponent = null,
}) {
  const icons = iconPack || THREADS_FEED_THREAD_ICONS
  const ReactionUi = ReactionComponent
  const [replyParentId, setReplyParentId] = useState(
    forcedReplyParentId ||
      (scene === 'reply' ||
      scene === 'attach-allowed' ||
      scene === 'attach-denied' ||
      scene === 'post-fail'
        ? comments.find((c) => c.depth < maxDepth)?.id ?? null
        : null),
  )

  const replyParent = comments.find((c) => c.id === replyParentId) || null

  return (
    <div
      className="nf-comment-tree"
      data-ds-surface="CommentTree"
      data-vl-done-surface="CommentTree"
      data-testid="issue-thread-tree"
      data-max-depth={String(maxDepth)}
      data-plane="light"
    >
      <ul className="nf-comment-tree-list" role="list">
        {comments.map((node) => {
          const atMax = isAtMaxDepth(node, maxDepth)
          const indent = visualIndentDepth(node.depth)
          const showNotice = shouldShowDepthNotice(node, maxDepth, scene)
          return (
            <CommentNode
              key={node.id}
              node={node}
              indentDepth={indent}
              selected={replyParentId === node.id}
              atMax={atMax}
              replyAction={
                !atMax ? (
                  <button
                    type="button"
                    className="comment-node-action"
                    data-testid="comment-action-reply"
                    onClick={() => setReplyParentId(node.id)}
                  >
                    <img src={icons.reply} alt="" aria-hidden="true" />
                    <span>{t('threadsFeed.composer.reply')}</span>
                  </button>
                ) : null
              }
              reactionSlot={
                ReactionUi ? (
                  <ReactionUi
                    t={t}
                    target="comment"
                    commentId={node.id}
                    initialSelected={node.selected ?? []}
                    summaryMarks={node.summaryMarks ?? null}
                    aggregateCount={node.aggregateCount ?? null}
                    maxReactions={maxReactions}
                    reactionsEnable={reactionsEnable}
                    onReact={onReact}
                    iconPack={icons}
                  />
                ) : null
              }
              depthNotice={
                showNotice ? (
                  <ReplyDepthNotice>{t('threadsFeed.composer.maxDepthReached')}</ReplyDepthNotice>
                ) : null
              }
              replyComposer={
                replyParentId === node.id && replyParent ? (
                  <CommentComposer
                    t={t}
                    mode="reply"
                    parentId={replyParent.id}
                    parentLabel={replyParent.body || replyParent.label}
                    initialDraft={
                      scene === 'attach-denied' || scene === 'post-fail'
                        ? 'Draft text that must survive'
                        : ''
                    }
                    initialAttachment={
                      scene === 'attach-allowed' || scene === 'post-fail'
                        ? { label: t('threadsFeed.composer.attachedFile') }
                        : null
                    }
                    attachOutcome={
                      scene === 'attach-denied'
                        ? 'denied'
                        : scene === 'attach-allowed'
                          ? 'allowed'
                          : 'idle'
                    }
                    postOutcome={scene === 'post-fail' ? 'fail' : 'idle'}
                    profile={profile}
                    identityVerified={identityVerified}
                    returnTo={returnTo}
                    onSubmitComment={onSubmitComment}
                    onAttachRef={onAttachRef}
                    mediaAllowedTypes={mediaAllowedTypes}
                    attachCommentId={replyParent.id}
                    iconPack={icons}
                    onPostSuccess={(result) => {
                      setReplyParentId(null)
                      if (typeof onPostSuccess === 'function') onPostSuccess(result)
                    }}
                    onCancel={() => setReplyParentId(null)}
                    testId="issue-thread-reply-composer"
                  />
                ) : null
              }
            />
          )
        })}
      </ul>
    </div>
  )
}
