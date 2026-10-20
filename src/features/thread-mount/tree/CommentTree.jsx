import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BRANCH_EXPAND_DELAY_MS,
  DEFAULT_MAX_DEPTH,
  SHOW_MORE_COMMENTS_COPY,
  VISUAL_INDENT_CAP,
  collectDfsPreviewIds,
  countForestNodes,
  pruneForestToIds,
  resolveMaxDepth,
  resolvePreviewNodeBudget,
  resolveVisualIndentCap,
} from '../config/threadMountConfig.js'
import { buildCommentForest } from './buildCommentForest.js'
import { CommentNode } from './CommentNode.jsx'
import './CommentTree.css'

/**
 * Collect ids that have local children (complete tree count derivable).
 * @param {Array<{ id: string, children?: unknown[] }>} roots
 */
function collectBranchIds(roots) {
  /** @type {string[]} */
  const ids = []
  function walk(nodes) {
    for (const n of nodes || []) {
      const kids = Array.isArray(n.children) ? n.children : []
      if (kids.length > 0) ids.push(n.id)
      walk(kids)
    }
  }
  walk(roots)
  return ids
}

/**
 * CT-03/06 CommentTree — nest · connectors · local branch disclosure.
 * No invent branch-fetch HTTP · View N only when count local.
 *
 * @param {object} props
 * @param {Array<{ id: string, parentId?: string|null, depth?: number, body?: string }>} [props.comments]
 * @param {number} [props.maxDepth]
 * @param {number} [props.visualIndentCap]
 * @param {(parentId: string, el?: HTMLElement|null) => void} [props.onReply]
 * @param {boolean} [props.branchDisclosure]
 * @param {'sync'|'delayed'|'error'} [props.branchExpandMode]
 * @param {Record<string, 'collapsed'|'expanded'|'expanding'|'error'>|null} [props.initialBranchStates]
 * @param {number} [props.branchExpandDelayMs]
 * @param {(args: { commentId: string, node: object }) => import('react').ReactNode} [props.renderCommentReactions]
 * @param {(args: { commentId: string, node: object }) => import('react').ReactNode} [props.renderReplyComposer]
 * @param {string|null} [props.selectedReplyParentId] CT-18 M153b §6
 * @param {number|null} [props.previewNodeBudget] CT-21 M152c DFS budget · null/omit = unlimited (unit/lab trees)
 */
export function CommentTree({
  comments = [],
  maxDepth = DEFAULT_MAX_DEPTH,
  visualIndentCap = VISUAL_INDENT_CAP,
  onReply = null,
  branchDisclosure = false,
  branchExpandMode = 'sync',
  initialBranchStates = null,
  branchExpandDelayMs = BRANCH_EXPAND_DELAY_MS,
  renderCommentReactions = null,
  renderReplyComposer = null,
  selectedReplyParentId = null,
  previewNodeBudget = null,
}) {
  const resolvedMax = resolveMaxDepth(maxDepth)
  const resolvedCap = resolveVisualIndentCap(visualIndentCap)
  /* Hosts (ThreadMount) pass DEFAULT_PREVIEW_NODE_BUDGET=3 · bare CommentTree stays unlimited */
  const resolvedBudget =
    previewNodeBudget == null
      ? Number.MAX_SAFE_INTEGER
      : resolvePreviewNodeBudget(previewNodeBudget)
  const forest = useMemo(() => buildCommentForest(comments), [comments])
  const [previewRevealed, setPreviewRevealed] = useState(false)
  const branchIds = useMemo(
    () => (forest.mode === 'tree' ? collectBranchIds(forest.roots) : []),
    [forest],
  )

  useEffect(() => {
    setPreviewRevealed(false)
  }, [comments, resolvedBudget])

  const totalNodes = useMemo(() => {
    if (forest.mode === 'tree') return countForestNodes(forest.roots)
    return Array.isArray(forest.flat) ? forest.flat.length : 0
  }, [forest])

  const truncated = !previewRevealed && totalNodes > resolvedBudget

  const visibleRoots = useMemo(() => {
    if (forest.mode !== 'tree') return []
    if (!truncated) return forest.roots
    const ids = collectDfsPreviewIds(forest.roots, resolvedBudget)
    return pruneForestToIds(forest.roots, ids)
  }, [forest, truncated, resolvedBudget])

  const visibleFlat = useMemo(() => {
    if (forest.mode !== 'flat') return []
    if (!truncated) return forest.flat
    return forest.flat.slice(0, resolvedBudget)
  }, [forest, truncated, resolvedBudget])

  const [branchStates, setBranchStates] = useState(() => {
    /** @type {Record<string, 'collapsed'|'expanded'|'expanding'|'error'>} */
    const seed = {}
    if (!branchDisclosure) return seed
    for (const id of branchIds) {
      const override = initialBranchStates?.[id]
      seed[id] = override || 'collapsed'
    }
    if (initialBranchStates) {
      for (const [id, st] of Object.entries(initialBranchStates)) {
        seed[id] = st
      }
    }
    return seed
  })

  const timers = useRef(/** @type {Record<string, ReturnType<typeof setTimeout>>} */ ({}))

  useEffect(() => {
    return () => {
      for (const t of Object.values(timers.current)) clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!branchDisclosure) return
    setBranchStates((prev) => {
      const next = { ...prev }
      for (const id of branchIds) {
        if (next[id] == null) next[id] = initialBranchStates?.[id] || 'collapsed'
      }
      return next
    })
  }, [branchDisclosure, branchIds, initialBranchStates])

  const setBranch = useCallback((id, state) => {
    setBranchStates((prev) => ({ ...prev, [id]: state }))
  }, [])

  const runExpand = useCallback(
    (id) => {
      if (timers.current[id]) {
        clearTimeout(timers.current[id])
        delete timers.current[id]
      }
      if (branchExpandMode === 'sync') {
        setBranch(id, 'expanded')
        return
      }
      setBranch(id, 'expanding')
      const ms = Math.max(0, Number(branchExpandDelayMs) || BRANCH_EXPAND_DELAY_MS)
      timers.current[id] = setTimeout(() => {
        delete timers.current[id]
        if (branchExpandMode === 'error') setBranch(id, 'error')
        else setBranch(id, 'expanded')
      }, ms)
    },
    [branchExpandMode, branchExpandDelayMs, setBranch],
  )

  const getBranchState = (id, childCount) => {
    if (!branchDisclosure || childCount <= 0) return null
    /* CT-21: while DFS preview truncated, paint budget nodes (no collapse hide). */
    if (truncated) return 'expanded'
    return branchStates[id] || 'collapsed'
  }

  function revealAllPreview() {
    setPreviewRevealed(true)
    if (!branchDisclosure) return
    setBranchStates((prev) => {
      const next = { ...prev }
      for (const id of branchIds) next[id] = 'expanded'
      return next
    })
  }

  return (
    <div
      className="tm-comment-tree"
      data-testid="tm-comment-tree"
      data-tm-forest={forest.mode}
      data-tm-max-depth={String(resolvedMax)}
      data-tm-visual-indent-cap={String(resolvedCap)}
      data-tm-preview-budget={
        previewNodeBudget == null ? 'unlimited' : String(resolvedBudget)
      }
      data-tm-preview-truncated={truncated ? 'true' : 'false'}
      data-tm-preview-revealed={previewRevealed ? 'true' : 'false'}
      data-tm-branch-disclosure={branchDisclosure ? 'true' : 'false'}
      data-tm-branch-expand-mode={branchDisclosure ? branchExpandMode : ''}
      data-tm-branch-fetch="false"
      data-lab-ct03="true"
      data-lab-ct06={branchDisclosure ? 'true' : undefined}
      data-lab-ct09={typeof renderCommentReactions === 'function' ? 'true' : undefined}
      data-lab-ct12={typeof renderReplyComposer === 'function' ? 'true' : undefined}
      data-lab-ct18="true"
      data-lab-ct21="true"
      data-tm-fallback-reason={forest.reason || ''}
    >
      {forest.mode === 'flat' ? (
        <p className="tm-comment-tree__fallback-note" data-testid="tm-comment-flat-fallback" role="status">
          Showing comments without hierarchy (unsafe parent links).
        </p>
      ) : null}
      <ul className="tm-comment-tree__list" data-testid="tm-comment-tree-list">
        {forest.mode === 'tree'
          ? visibleRoots.map((node) => (
              <CommentNode
                key={node.id}
                node={node}
                maxDepth={resolvedMax}
                visualIndentCap={resolvedCap}
                onReply={onReply}
                getBranchState={getBranchState}
                onBranchExpand={runExpand}
                onBranchRetry={runExpand}
                renderCommentReactions={renderCommentReactions}
                renderReplyComposer={renderReplyComposer}
                selectedReplyParentId={selectedReplyParentId}
              />
            ))
          : visibleFlat.map((node) => (
              <CommentNode
                key={node.id}
                node={{ ...node, children: [] }}
                maxDepth={resolvedMax}
                visualIndentCap={resolvedCap}
                onReply={onReply}
                flat
                renderCommentReactions={renderCommentReactions}
                renderReplyComposer={renderReplyComposer}
                selectedReplyParentId={selectedReplyParentId}
              />
            ))}
      </ul>
      {truncated ? (
        <button
          type="button"
          className="tm-comment-tree__show-more"
          data-testid="tm-show-more-comments"
          data-lab-ct21="true"
          onClick={revealAllPreview}
        >
          {SHOW_MORE_COMMENTS_COPY}
        </button>
      ) : null}
    </div>
  )
}
