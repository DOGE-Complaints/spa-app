import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactionsMount,
  createLiveAdapter,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../reactions-mount/index.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import './FeedReactionsMount.css'

/**
 * CR-23 next/feed host — ReactionsMount + LiveAdapter → ThreadsSocialClient.react.
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
}) {
  const id = issueId === undefined || issueId === null ? '' : String(issueId).trim()
  const adapter = useMemo(
    () => createLiveAdapter({ issueId: id || null, client }),
    [id, client],
  )

  const [maxReactions, setMaxReactions] = useState(() => adapter.maxReactions)
  const [selected, setSelected] = useState([])
  const [summaryMarks, setSummaryMarks] = useState(null)
  const [aggregateCount, setAggregateCount] = useState(null)
  const localApi = useRef(null)
  const mergedApiRef = apiRef || localApi

  useEffect(() => {
    let cancelled = false
    void adapter.loadKnobs?.().then(() => {
      if (!cancelled) setMaxReactions(adapter.maxReactions)
    })
    return () => {
      cancelled = true
    }
  }, [adapter])

  const slot =
    target === 'comment'
      ? REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE
      : REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP

  const rootClass = ['feed-reactions-mount', className].filter(Boolean).join(' ')

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
    }
    return result
  }

  return (
    <div
      className={rootClass}
      data-testid="feed-reactions-mount"
      data-feed-cr23="true"
      data-feed-reaction-host="live"
      data-feed-reaction-target={target}
      data-rm-adapter="live"
      data-rm-adapter-kind={adapter.kind}
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
        aggregatePlacement={aggregatePlacement}
        aggregateHost={aggregateHost}
        apiRef={mergedApiRef}
        reactAlways
      />
    </div>
  )
}
