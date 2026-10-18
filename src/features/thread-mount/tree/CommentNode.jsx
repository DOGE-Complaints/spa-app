import {
  MAX_DEPTH_REACHED_COPY,
  canReplyAtDepth,
  visualIndentLevel,
} from '../config/threadMountConfig.js'
import './CommentNode.css'

/**
 * CT-03 CommentNode — literal body · Reply gate · max-depth copy · child slot.
 * No fake author chrome · React plug → CT-09 · composer → CT-04.
 *
 * @param {object} props
 * @param {{ id: string, body?: string, depth?: number, children?: unknown[] }} props.node
 * @param {number} props.maxDepth
 * @param {number} props.visualIndentCap
 * @param {(parentId: string) => void} [props.onReply]
 * @param {boolean} [props.flat]
 */
export function CommentNode({
  node,
  maxDepth,
  visualIndentCap,
  onReply = null,
  flat = false,
}) {
  const depth = Number.isFinite(Number(node?.depth)) ? Math.floor(Number(node.depth)) : 0
  const indent = flat ? 0 : visualIndentLevel(depth, visualIndentCap)
  const replyOk = canReplyAtDepth(depth, maxDepth)
  const body = typeof node?.body === 'string' ? node.body : ''
  const children = Array.isArray(node?.children) ? node.children : []
  return (
    <li
      className={`tm-comment-node${flat ? ' tm-comment-node--flat' : ''}`}
      data-testid={`tm-comment-node-${node.id}`}
      data-tm-comment-id={node.id}
      data-tm-depth={String(depth)}
      data-tm-indent={String(indent)}
      data-tm-reply={replyOk ? 'eligible' : 'blocked'}
      data-tm-visual-capped={!flat && depth > indent ? 'true' : 'false'}
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
          <div className="tm-comment-node__actions">
            {replyOk ? (
              <button
                type="button"
                className="tm-comment-node__reply"
                data-testid="tm-comment-reply"
                onClick={() => onReply?.(node.id)}
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
        </article>
      </div>
      {!flat && children.length > 0 ? (
        <ul className="tm-comment-node__children" data-testid={`tm-comment-children-${node.id}`}>
          {children.map((child) => (
            <CommentNode
              key={child.id}
              node={child}
              maxDepth={maxDepth}
              visualIndentCap={visualIndentCap}
              onReply={onReply}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
