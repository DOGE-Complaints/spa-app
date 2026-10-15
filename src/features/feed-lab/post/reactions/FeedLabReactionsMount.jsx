import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactionsMount,
  createFixtureAdapter,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../../../reactions-mount/index.js'
import { labT } from '../../labI18n.js'
import './FeedLabReactionsMount.css'

/**
 * CR-07 lab host — wraps greenfield ReactionsMount + FixtureAdapter for `#/lab/feed`.
 * Bridges PostActionStrip open toggle via remount + defaultOpen (no invent HTTP).
 */
export function FeedLabReactionsMount({
  target = 'thread-root',
  commentId = null,
  open = false,
  onOpenChange = null,
  initialState = 'empty',
  className = '',
}) {
  const adapter = useMemo(
    () => createFixtureAdapter({ initialState, target }),
    [initialState, target],
  )
  const snap = adapter.snapshot()
  const [openEpoch, setOpenEpoch] = useState(0)
  const prevOpen = useRef(Boolean(open))

  useEffect(() => {
    const next = Boolean(open)
    if (next !== prevOpen.current) {
      setOpenEpoch((n) => n + 1)
      prevOpen.current = next
    }
  }, [open])

  const slot =
    target === 'comment'
      ? REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE
      : REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP

  const rootClass = ['feed-lab-reactions-mount', className].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      data-testid="feed-lab-reactions-mount"
      data-lab-cutover="cr-07"
      data-lab-plane="greenfield"
      data-lab-reaction-target={target}
      data-m155-oos="true"
      data-rm-adapter="fixture"
    >
      <ReactionsMount
        key={`fl-rm-${target}-${commentId ?? 'root'}-${openEpoch}`}
        target={target}
        commentId={commentId}
        density="compact"
        slot={slot}
        defaultOpen={Boolean(open)}
        stripStatus={snap.stripStatus}
        summaryMarks={snap.summaryMarks}
        aggregateCount={snap.aggregateCount}
        selected={snap.selected}
        t={labT}
        onReact={adapter.onReact}
        onOpen={() => {
          if (typeof onOpenChange === 'function') onOpenChange(true)
        }}
        onAggregateActivate={adapter.onAggregateActivate}
      />
    </div>
  )
}
