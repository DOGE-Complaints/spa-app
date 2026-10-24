import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactionsMount,
  createLiveAdapter,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../reactions-mount/index.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../../repositories/mapThreadTreeToBlock.js'
import './FeedReactionsMount.css'

/**
 * @param {unknown} raw
 * @returns {string[]}
 */
function normalizeSelected(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .map((id) => (id === undefined || id === null ? '' : String(id).trim()))
    .filter((id) => id !== '')
}

/**
 * @param {unknown} raw
 * @returns {string|null} null = prop not provided
 */
function selectedSig(raw) {
  if (raw === undefined) return null
  return normalizeSelected(raw).join('\0')
}

/**
 * CR-23 next/feed host — ReactionsMount + LiveAdapter → ThreadsSocialClient.react.
 * CR-24: ownInZone (M163/M164) — wide React underlay · own icons in-zone · no below-row.
 * CR-25: hydrate `initialSelected` / summary props from authenticated tree · PUT→tree reload sync.
 * Lab Fixture path stays on FeedLabReactionsMount · this host is Live only.
 * People Live fail-closed (adapter.listReactors) · no invent HTTP · OP eye Absent → visual BLOCK.
 */
export function FeedReactionsMount({
  issueId = null,
  target = 'thread-root',
  commentId = null,
  t = (k) => k,
  client = defaultThreadsSocialClient,
  className = '',
  aggregatePlacement = 'inline',
  aggregateHost = null,
  apiRef = null,
  defaultOpen = false,
  /** CR-24 default true on next/feed civic host */
  ownInZone = true,
  /** CR-25: actor selected[] from tree (undefined = no hydrate prop) */
  initialSelected,
  /** CR-25: summary_marks from tree */
  initialSummaryMarks,
  /** CR-25: aggregate_count from tree */
  initialAggregateCount,
  /** CR-28: peer zone sync — summary_marks / aggregate_count (no invent people HTTP) */
  onSummaryChange = null,
}) {
  const id = issueId === undefined || issueId === null ? '' : String(issueId).trim()
  const adapter = useMemo(
    () => createLiveAdapter({ issueId: id || null, client }),
    [id, client],
  )

  const [maxReactions, setMaxReactions] = useState(() => adapter.maxReactions)
  const [selected, setSelected] = useState(() =>
    initialSelected !== undefined ? normalizeSelected(initialSelected) : [],
  )
  const [summaryMarks, setSummaryMarks] = useState(() =>
    initialSummaryMarks !== undefined ? initialSummaryMarks : null,
  )
  const [aggregateCount, setAggregateCount] = useState(() =>
    initialAggregateCount !== undefined ? initialAggregateCount : null,
  )
  const localApi = useRef(null)
  const mergedApiRef = apiRef || localApi

  const selSig = selectedSig(initialSelected)
  const marksSig =
    initialSummaryMarks === undefined ? null : JSON.stringify(initialSummaryMarks ?? null)
  const aggSig =
    initialAggregateCount === undefined
      ? null
      : initialAggregateCount === null
        ? 'null'
        : String(initialAggregateCount)

  useEffect(() => {
    let cancelled = false
    void adapter.loadKnobs?.().then(() => {
      if (!cancelled) setMaxReactions(adapter.maxReactions)
    })
    return () => {
      cancelled = true
    }
  }, [adapter])

  /* CR-25: sync from tree props on mount / reload (skip when prop Absent) */
  useEffect(() => {
    if (selSig === null) return
    setSelected(selSig === '' ? [] : selSig.split('\0'))
  }, [selSig])

  useEffect(() => {
    if (marksSig === null) return
    setSummaryMarks(initialSummaryMarks)
  }, [marksSig, initialSummaryMarks])

  useEffect(() => {
    if (aggSig === null) return
    setAggregateCount(initialAggregateCount)
  }, [aggSig, initialAggregateCount])

  useEffect(() => {
    if (typeof onSummaryChange !== 'function') return
    onSummaryChange({ summaryMarks, aggregateCount })
  }, [onSummaryChange, summaryMarks, aggregateCount])

  const slot =
    target === 'comment'
      ? REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE
      : REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP

  const rootClass = ['feed-reactions-mount', className].filter(Boolean).join(' ')

  /**
   * CR-25 T03: after PUT ok, re-read tree so local state matches next reload hydrate.
   * Soft-fail: keep write snapshot if tree unavailable.
   */
  async function rehydrateFromTree() {
    if (!id || typeof client.getThreadTree !== 'function') return
    try {
      const treeResult = await client.getThreadTree(id)
      const mapped = mapThreadTreeToBlock(treeResult)
      if (target === 'comment') {
        const cid = commentId == null ? '' : String(commentId)
        const node = (mapped.comments || []).find((c) => String(c.id) === cid)
        if (!node) return
        setSelected(normalizeSelected(node.selected))
        if (node.summaryMarks !== undefined) setSummaryMarks(node.summaryMarks)
        if (node.aggregateCount !== undefined) setAggregateCount(node.aggregateCount)
        return
      }
      const root = mapped.threadRootReactions
      if (!root) return
      setSelected(normalizeSelected(root.selected))
      if (root.summaryMarks !== undefined) setSummaryMarks(root.summaryMarks)
      if (root.aggregateCount !== undefined) setAggregateCount(root.aggregateCount)
    } catch {
      /* keep write snapshot */
    }
  }

  async function handleReact(args) {
    const result = await adapter.onReact({
      ...args,
      target,
      commentId: target === 'comment' ? commentId : null,
    })
    if (result?.status === 'ok' && result.data) {
      if (Array.isArray(result.data.selected)) setSelected(result.data.selected.map(String))
      if (result.data.summary_marks != null) setSummaryMarks(result.data.summary_marks)
      if (result.data.aggregate_count != null) setAggregateCount(result.data.aggregate_count)
      await rehydrateFromTree()
    }
    return result
  }

  const hydrateActive = selSig !== null

  return (
    <div
      className={rootClass}
      data-testid="feed-reactions-mount"
      data-feed-cr23="true"
      data-feed-cr25={hydrateActive ? 'true' : undefined}
      data-feed-cr25-hydrate={hydrateActive ? 'props' : 'none'}
      data-feed-cr25-selected-count={String(selected.length)}
      data-feed-reaction-host="live"
      data-feed-reaction-target={target}
      data-rm-adapter="live"
      data-rm-adapter-kind={adapter.kind}
      data-rm-own-in-zone={ownInZone ? 'true' : 'false'}
      data-rm-cr24={ownInZone ? 'true' : undefined}
      data-feed-issue-id={id || undefined}
    >
      <ReactionsMount
        key={`feed-rm-${target}-${commentId ?? 'root'}-${id}`}
        target={target}
        commentId={commentId}
        density="compact"
        slot={slot}
        defaultOpen={Boolean(defaultOpen)}
        stripStatus="ready"
        summaryMarks={summaryMarks}
        aggregateCount={aggregateCount}
        selected={selected}
        maxReactions={maxReactions}
        t={t}
        onReact={handleReact}
        onAggregateActivate={() => adapter.onAggregateActivate?.()}
        aggregatePlacement={ownInZone ? 'inline' : aggregatePlacement}
        aggregateHost={ownInZone ? null : aggregateHost}
        apiRef={mergedApiRef}
        reactAlways
        ownInZone={ownInZone}
      />
    </div>
  )
}
