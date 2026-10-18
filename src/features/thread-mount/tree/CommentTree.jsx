import { useMemo } from 'react'
import { DEFAULT_MAX_DEPTH, VISUAL_INDENT_CAP, resolveMaxDepth, resolveVisualIndentCap } from '../config/threadMountConfig.js'
import { buildCommentForest } from './buildCommentForest.js'
import { CommentNode } from './CommentNode.jsx'
import './CommentTree.css'

/**
 * CT-03 CommentTree — nest · connectors · orphan/cycle → flat fallback.
 *
 * @param {object} props
 * @param {Array<{ id: string, parentId?: string|null, depth?: number, body?: string }>} [props.comments]
 * @param {number} [props.maxDepth]
 * @param {number} [props.visualIndentCap]
 * @param {(parentId: string) => void} [props.onReply]
 */
export function CommentTree({
  comments = [],
  maxDepth = DEFAULT_MAX_DEPTH,
  visualIndentCap = VISUAL_INDENT_CAP,
  onReply = null,
}) {
  const resolvedMax = resolveMaxDepth(maxDepth)
  const resolvedCap = resolveVisualIndentCap(visualIndentCap)
  const forest = useMemo(() => buildCommentForest(comments), [comments])

  return (
    <div
      className="tm-comment-tree"
      data-testid="tm-comment-tree"
      data-tm-forest={forest.mode}
      data-tm-max-depth={String(resolvedMax)}
      data-tm-visual-indent-cap={String(resolvedCap)}
      data-lab-ct03="true"
      data-tm-fallback-reason={forest.reason || ''}
    >
      {forest.mode === 'flat' ? (
        <p className="tm-comment-tree__fallback-note" data-testid="tm-comment-flat-fallback" role="status">
          Showing comments without hierarchy (unsafe parent links).
        </p>
      ) : null}
      <ul className="tm-comment-tree__list" data-testid="tm-comment-tree-list">
        {forest.mode === 'tree'
          ? forest.roots.map((node) => (
              <CommentNode
                key={node.id}
                node={node}
                maxDepth={resolvedMax}
                visualIndentCap={resolvedCap}
                onReply={onReply}
              />
            ))
          : forest.flat.map((node) => (
              <CommentNode
                key={node.id}
                node={{ ...node, children: [] }}
                maxDepth={resolvedMax}
                visualIndentCap={resolvedCap}
                onReply={onReply}
                flat
              />
            ))}
      </ul>
    </div>
  )
}
