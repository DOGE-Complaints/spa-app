import { useState } from 'react'
import { CommentComposer } from './CommentComposer.jsx'
import './CommentTree.css'

/**
 * Nested comment tree with configured max-depth boundary (M144 THR-T-A/B).
 * Depth from prop — not a fixed product law.
 */
export function CommentTree({
  t,
  comments = [],
  maxDepth = 2,
  scene = 'nested',
  replyParentId: forcedReplyParentId = null,
}) {
  const [replyParentId, setReplyParentId] = useState(
    forcedReplyParentId || (scene === 'reply' || scene === 'attach-allowed' || scene === 'attach-denied' || scene === 'post-fail'
      ? comments.find((c) => c.depth < maxDepth)?.id ?? null
      : null),
  )

  const replyParent = comments.find((c) => c.id === replyParentId) || null
  const showMaxDepth = scene === 'max-depth'

  return (
    <div className="comment-tree" data-testid="issue-thread-tree" data-max-depth={String(maxDepth)}>
      <ul className="comment-tree-list" role="list">
        {comments.map((node) => {
          const atMax = node.depth >= maxDepth
          // Boundary banner only for max-depth scene (M144 T-B). Nested T-A: no Reply at max, no banner.
          const showBoundary = atMax && showMaxDepth
          return (
            <li
              key={node.id}
              className={`comment-tree-node comment-tree-node--depth-${Math.min(node.depth, 6)}`}
              data-testid="comment-tree-node"
              data-comment-id={node.id}
              data-depth={String(node.depth)}
              style={{ '--comment-depth': node.depth }}
            >
              <div
                className={`comment-tree-card${replyParentId === node.id ? ' comment-tree-card--selected' : ''}`}
              >
                <div className="comment-tree-identity" aria-hidden="true" />
                <div className="comment-tree-body">
                  <p className="comment-tree-label">{node.label}</p>
                  <div className="comment-tree-lines" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                  <div className="comment-tree-actions" role="group">
                    <button type="button" className="comment-tree-action" data-testid="comment-action-react">
                      <img src="/icons/threads-feed/ic-react.png" alt="" aria-hidden="true" />
                      <span>{t('threadsFeed.post.action.react')}</span>
                    </button>
                    {!atMax ? (
                      <button
                        type="button"
                        className="comment-tree-action"
                        data-testid="comment-action-reply"
                        onClick={() => setReplyParentId(node.id)}
                      >
                        <img src="/icons/threads-feed/ic-reply.png" alt="" aria-hidden="true" />
                        <span>{t('threadsFeed.composer.reply')}</span>
                      </button>
                    ) : null}
                  </div>
                  {showBoundary ? (
                    <p className="comment-tree-max-depth" data-testid="comment-max-depth" role="status">
                      {t('threadsFeed.composer.maxDepthReached')}
                    </p>
                  ) : null}
                </div>
              </div>
              {replyParentId === node.id && replyParent ? (
                <CommentComposer
                  t={t}
                  mode="reply"
                  parentLabel={replyParent.label}
                  initialDraft={
                    scene === 'attach-denied' || scene === 'post-fail' ? 'Draft text that must survive' : ''
                  }
                  initialAttachment={scene === 'attach-allowed' || scene === 'post-fail' ? { label: t('threadsFeed.composer.attachedFile') } : null}
                  attachOutcome={scene === 'attach-denied' ? 'denied' : scene === 'attach-allowed' ? 'allowed' : 'idle'}
                  postOutcome={scene === 'post-fail' ? 'fail' : 'idle'}
                  onCancel={() => setReplyParentId(null)}
                  testId="issue-thread-reply-composer"
                />
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
