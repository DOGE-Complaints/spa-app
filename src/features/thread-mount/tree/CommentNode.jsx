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

/** Present runtime icon · CT-13 · no invent SVG body */
export const TM_REPLY_ICON_SRC = '/icons/next-feed/actions/reply.svg'

/**
 * CT-03/06/09/13 CommentNode — literal body · Reply gate · local branch · reactions slot · action pills.
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
 * @param {number} [props.parentIndent] visual indent of parent (CT-14 spine step)
 * @param {(args: { commentId: string, node: object }) => import('react').ReactNode} [props.renderCommentReactions]
 * @param {(args: { commentId: string, node: object }) => import('react').ReactNode} [props.renderReplyComposer]
 * @param {string|null} [props.selectedReplyParentId] CT-18 M153b §6 selected parent marker
 */
export function CommentNode({
  node,
  maxDepth,
  visualIndentCap,
  onReply = null,
  flat = false,
  parentIndent = 0,
  getBranchState = null,
  onBranchExpand = null,
  onBranchRetry = null,
  renderCommentReactions = null,
  renderReplyComposer = null,
  selectedReplyParentId = null,
}) {
  const depth = Number.isFinite(Number(node?.depth)) ? Math.floor(Number(node.depth)) : 0
  const indent = flat ? 0 : visualIndentLevel(depth, visualIndentCap)
  const atVisualCap = !flat && indent >= visualIndentCap
  const replyOk = canReplyAtDepth(depth, maxDepth)
  const body = typeof node?.body === 'string' ? node.body : ''
  const children = Array.isArray(node?.children) ? node.children : []
  const childCount = children.length
  const branchState =
    typeof getBranchState === 'function' ? getBranchState(node.id, childCount) : null
  const showChildren = !flat && childCount > 0 && (branchState == null || branchState === 'expanded')
  const showBranchChrome = !flat && childCount > 0 && branchState != null
  const replyComposer =
    typeof renderReplyComposer === 'function'
      ? renderReplyComposer({ commentId: node.id, node })
      : null
  const hasReactPlug = typeof renderCommentReactions === 'function'
  const showActionPills = hasReactPlug || replyOk
  const showElbow = !flat && indent > 0
  const isReplyParent =
    Boolean(selectedReplyParentId) && selectedReplyParentId === node?.id
  const childrenSpineClass = [
    'tm-comment-node__children',
    'tm-comment-node__children--spine',
    atVisualCap ? 'tm-comment-node__children--cap' : 'tm-comment-node__children--step',
  ].join(' ')

  return (
    <li
      className={`tm-comment-node${flat ? ' tm-comment-node--flat' : ''}`}
      data-testid={`tm-comment-node-${node.id}`}
      data-tm-comment-id={node.id}
      data-tm-depth={String(depth)}
      data-tm-indent={String(indent)}
      data-tm-parent-indent={flat ? undefined : String(parentIndent)}
      data-tm-reply={replyOk ? 'eligible' : 'blocked'}
      data-tm-reply-parent-selected={isReplyParent ? 'true' : 'false'}
      data-tm-visual-capped={!flat && depth > indent ? 'true' : 'false'}
      data-tm-branch={branchState || ''}
      data-tm-branch-count={childCount > 0 ? String(childCount) : ''}
      data-lab-ct09={hasReactPlug ? 'true' : undefined}
      data-lab-ct12={typeof renderReplyComposer === 'function' ? 'true' : undefined}
      data-lab-ct13={showActionPills ? 'true' : undefined}
      data-lab-ct14={!flat ? 'true' : undefined}
      data-lab-ct18="true"
      style={flat ? undefined : { ['--tm-indent-level']: String(indent) }}
    >
      <div className="tm-comment-node__row">
        {showElbow ? (
          <span
            className="tm-comment-node__connector"
            aria-hidden="true"
            data-testid="tm-comment-connector"
            data-tm-spine-elbow="true"
            data-lab-ct14="true"
          />
        ) : null}
        <article
          className={`tm-comment-node__bubble${
            isReplyParent ? ' tm-comment-node__bubble--reply-parent' : ''
          }`}
          data-testid="tm-comment-body"
          data-tm-reply-parent-marker={isReplyParent ? 'true' : 'false'}
          aria-label={depth === 0 ? 'Comment' : 'Reply'}
        >
          <p className="tm-comment-node__text">{body}</p>
          <div
            className="tm-comment-node__actions"
            data-testid="tm-comment-actions"
            data-lab-ct13={showActionPills ? 'true' : undefined}
          >
            {showActionPills ? (
              <div
                className="tm-comment-node__action-pills"
                data-testid="tm-comment-action-pills"
                data-lab-ct13="true"
              >
                {hasReactPlug ? (
                  <div
                    className="tm-comment-node__react-pill tm-comment-node__pill"
                    data-testid="tm-comment-react-pill"
                    data-lab-ct13="true"
                  >
                    <div
                      className="tm-comment-node__reactions tm-comment-node__reactions--density"
                      data-testid={`tm-comment-reaction-slot-${node.id}`}
                      data-lab-ct09="true"
                      data-lab-ct13="true"
                      data-tm-react-density="compact"
                    >
                      {renderCommentReactions({ commentId: node.id, node })}
                    </div>
                  </div>
                ) : null}
                {hasReactPlug && replyOk ? (
                  <span
                    className="tm-comment-node__action-sep"
                    data-testid="tm-comment-action-sep"
                    aria-hidden="true"
                  />
                ) : null}
                {replyOk ? (
                  <button
                    type="button"
                    className="tm-comment-node__reply tm-comment-node__pill"
                    data-testid="tm-comment-reply"
                    data-lab-ct13="true"
                    data-tm-reply-chrome="pill"
                    onClick={(e) => onReply?.(node.id, e.currentTarget)}
                  >
                    <img
                      className="tm-comment-node__reply-icon"
                      src={TM_REPLY_ICON_SRC}
                      alt=""
                      width={16}
                      height={16}
                      data-testid="tm-comment-reply-icon"
                      aria-hidden="true"
                    />
                    <span className="tm-comment-node__reply-label" data-testid="tm-comment-reply-label">
                      Reply
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
            {!replyOk ? (
              <p
                className="tm-comment-node__max-depth"
                data-testid="tm-comment-max-depth"
                role="status"
              >
                {MAX_DEPTH_REACHED_COPY}
              </p>
            ) : null}
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
      {/* CT-12 G-H4: inline reply slot under this parent · host owns composer */}
      {replyComposer ? (
        <div
          className="tm-comment-node__reply-slot"
          data-testid={`tm-comment-reply-slot-${node.id}`}
          data-lab-ct12="true"
          style={flat ? undefined : { ['--tm-indent-level']: String(indent) }}
        >
          {replyComposer}
        </div>
      ) : null}
      {showChildren ? (
        <ul
          className={childrenSpineClass}
          data-testid={`tm-comment-children-${node.id}`}
          data-tm-spine="true"
          data-tm-spine-step={atVisualCap ? 'cap' : 'step'}
          data-lab-ct14="true"
          style={{ ['--tm-indent-level']: String(indent) }}
        >
          {children.map((child) => (
            <CommentNode
              key={child.id}
              node={child}
              maxDepth={maxDepth}
              visualIndentCap={visualIndentCap}
              parentIndent={indent}
              onReply={onReply}
              getBranchState={getBranchState}
              onBranchExpand={onBranchExpand}
              onBranchRetry={onBranchRetry}
              renderCommentReactions={renderCommentReactions}
              renderReplyComposer={renderReplyComposer}
              selectedReplyParentId={selectedReplyParentId}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
