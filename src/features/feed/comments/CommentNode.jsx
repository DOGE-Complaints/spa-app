import { ThreadConnector } from './ThreadConnector.jsx'

/**
 * DS §6 CommentNode — one comment body + actions + reaction + optional depth notice.
 * Light plane: no classic dark card / fake avatar chrome.
 */
export function CommentNode({
  node,
  indentDepth = 0,
  selected = false,
  atMax = false,
  replyAction = null,
  reactionSlot = null,
  depthNotice = null,
  replyComposer = null,
}) {
  return (
    <li
      className={`comment-node comment-node--depth-${Math.min(Number(node?.depth) || 0, 6)}`}
      data-ds-surface="CommentNode"
      data-testid="comment-tree-node"
      data-comment-id={node?.id}
      data-depth={String(node?.depth ?? 0)}
      data-at-max={atMax ? 'true' : 'false'}
    >
      <ThreadConnector depth={indentDepth}>
        <div className={`comment-node-card${selected ? ' comment-node-card--selected' : ''}`}>
          <div className="comment-node-body">
            <p className="comment-node-body-text" data-testid="comment-tree-body">
              {node?.body || node?.label}
            </p>
            {replyAction ? (
              <div className="comment-node-actions" role="group">
                {replyAction}
              </div>
            ) : null}
            {reactionSlot}
            {depthNotice}
          </div>
        </div>
        {replyComposer}
      </ThreadConnector>
    </li>
  )
}
