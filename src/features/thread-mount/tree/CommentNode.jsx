import {
  BRANCH_ERROR_RETRY,
  BRANCH_ERROR_TITLE,
  BRANCH_LOADING_COPY,
  MAX_DEPTH_REACHED_COPY,
  canReplyAtDepth,
  viewRepliesLabel,
  visualIndentLevel,
} from '../config/threadMountConfig.js'
import './CommentNode.css'

/**
 * CT-03/06/09 CommentNode — literal body · Reply gate · local branch · reactions slot.
 * No invent branch-fetch HTTP · React via host render prop (no CR ownership).
 *
 * @param {object} props
 * @param {{ id: string, body?: string, depth?: number, children?: unknown[] }} props.node
 * @param {number} props.maxDepth
 * @param {number} props.visualIndentCap
 * @param {(parentId: string, el?: HTMLElement|null) => void} [props.onReply]
 * @param {boolean} [props.flat]
 * @param {(id: string, childCount: number) => 'collapsed'|'expanded'|'expanding'|'error'|null} [props.getBranchState]
 * @param {(id: string) => void} [props.onBranchExpand]
 * @param {(id: string) => void} [props.onBranchRetry]
 * @param {(args: { commentId: string, node: object }) => import('react').ReactNode} [props.renderCommentReactions]
 */
export function CommentNode({
  node,
  maxDepth,
  visualIndentCap,
  onReply = null,
  flat = false,
  getBranchState = null,
  onBranchExpand = null,
  onBranchRetry = null,
  renderCommentReactions = null,
}) {
  const depth = Number.isFinite(Number(node?.depth)) ? Math.floor(Number(node.depth)) : 0
  const indent = flat ? 0 : visualIndentLevel(depth, visualIndentCap)
  const replyOk = canReplyAtDepth(depth, maxDepth)
  const body = typeof node?.body === 'string' ? node.body : ''
  const children = Array.isArray(node?.children) ? node.children : []
  const childCount = children.length
  const branchState =
    typeof getBranchState === 'function' ? getBranchState(node.id, childCount) : null
  const showChildren = !flat && childCount > 0 && (branchState == null || branchState === 'expanded')
  const showBranchChrome = !flat && childCount > 0 && branchState != null

  return (
    <li
      className={`tm-comment-node${flat ? ' tm-comment-node--flat' : ''}`}
      data-testid={`tm-comment-node-${node.id}`}
      data-tm-comment-id={node.id}
      data-tm-depth={String(depth)}
      data-tm-indent={String(indent)}
      data-tm-reply={replyOk ? 'eligible' : 'blocked'}
      data-tm-visual-capped={!flat && depth > indent ? 'true' : 'false'}
      data-tm-branch={branchState || ''}
      data-tm-branch-count={childCount > 0 ? String(childCount) : ''}
      data-lab-ct09={typeof renderCommentReactions === 'function' ? 'true' : undefined}
      style={flat ? undefined : { ['--tm-indent-level']: String(indent) }}
    >
      <div className="tm-comment-node__row">
        {!flat && indent > 0 ? (
          <span className="tm-comment-node__connector" aria-hidden="true" data-testid="tm-comment-connector" />
        ) : null}
        <article
          className="tm-comment-node__bubble"
          data-testid="tm-comment-body"
          aria-label={depth === 0 ? 'Comment' : 'Reply'}
        >
          <p className="tm-comment-node__text">{body}</p>
          <div className="tm-comment-node__actions" data-testid="tm-comment-actions">
            {typeof renderCommentReactions === 'function' ? (
              <div
                className="tm-comment-node__reactions"
                data-testid={`tm-comment-reaction-slot-${node.id}`}
                data-lab-ct09="true"
              >
                {renderCommentReactions({ commentId: node.id, node })}
              </div>
            ) : null}
            {replyOk ? (
              <button
                type="button"
                className="tm-comment-node__reply"
                data-testid="tm-comment-reply"
                onClick={(e) => onReply?.(node.id, e.currentTarget)}
              >
                Reply
              </button>
            ) : (
              <p
                className="tm-comment-node__max-depth"
                data-testid="tm-comment-max-depth"
                role="status"
              >
                {MAX_DEPTH_REACHED_COPY}
              </p>
            )}
          </div>
          {showBranchChrome ? (
            <div
              className="tm-comment-node__branch"
              data-testid={`tm-comment-branch-${node.id}`}
              data-tm-branch-state={branchState}
            >
              {branchState === 'collapsed' ? (
                <button
                  type="button"
                  className="tm-comment-node__view-replies"
                  data-testid={`tm-comment-view-replies-${node.id}`}
                  aria-expanded="false"
                  onClick={() => onBranchExpand?.(node.id)}
                >
                  {viewRepliesLabel(childCount)}
                </button>
              ) : null}
              {branchState === 'expanding' ? (
                <p
                  className="tm-comment-node__branch-loading"
                  data-testid={`tm-comment-branch-loading-${node.id}`}
                  role="status"
                >
                  {BRANCH_LOADING_COPY}
                </p>
              ) : null}
              {branchState === 'error' ? (
                <div
                  className="tm-comment-node__branch-error"
                  data-testid={`tm-comment-branch-error-${node.id}`}
                  role="alert"
                >
                  <p className="tm-comment-node__branch-error-title">{BRANCH_ERROR_TITLE}</p>
                  <button
                    type="button"
                    className="tm-comment-node__branch-retry"
                    data-testid={`tm-comment-branch-retry-${node.id}`}
                    onClick={() => onBranchRetry?.(node.id)}
                  >
                    {BRANCH_ERROR_RETRY}
                  </button>
                </div>
              ) : null}
              {branchState === 'expanded' ? (
                <span className="visually-hidden" data-testid={`tm-comment-branch-expanded-${node.id}`}>
                  Replies expanded
                </span>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>
      {showChildren ? (
        <ul className="tm-comment-node__children" data-testid={`tm-comment-children-${node.id}`}>
          {children.map((child) => (
            <CommentNode
              key={child.id}
              node={child}
              maxDepth={maxDepth}
              visualIndentCap={visualIndentCap}
              onReply={onReply}
              getBranchState={getBranchState}
              onBranchExpand={onBranchExpand}
              onBranchRetry={onBranchRetry}
              renderCommentReactions={renderCommentReactions}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
