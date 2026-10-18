import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BRANCH_EXPAND_DELAY_MS,
  DEFAULT_MAX_DEPTH,
  VISUAL_INDENT_CAP,
  resolveMaxDepth,
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
}) {
  const resolvedMax = resolveMaxDepth(maxDepth)
  const resolvedCap = resolveVisualIndentCap(visualIndentCap)
  const forest = useMemo(() => buildCommentForest(comments), [comments])
  const branchIds = useMemo(
    () => (forest.mode === 'tree' ? collectBranchIds(forest.roots) : []),
    [forest],
  )

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
    return branchStates[id] || 'collapsed'
  }

  return (
    <div
      className="tm-comment-tree"
      data-testid="tm-comment-tree"
      data-tm-forest={forest.mode}
      data-tm-max-depth={String(resolvedMax)}
      data-tm-visual-indent-cap={String(resolvedCap)}
      data-tm-branch-disclosure={branchDisclosure ? 'true' : 'false'}
      data-tm-branch-expand-mode={branchDisclosure ? branchExpandMode : ''}
      data-tm-branch-fetch="false"
      data-lab-ct03="true"
      data-lab-ct06={branchDisclosure ? 'true' : undefined}
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
                getBranchState={getBranchState}
                onBranchExpand={runExpand}
                onBranchRetry={runExpand}
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
