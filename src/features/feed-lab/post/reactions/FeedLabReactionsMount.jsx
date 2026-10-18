import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactionsMount,
  createFixtureAdapter,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../../../reactions-mount/index.js'
import { labT } from '../../labI18n.js'
import './FeedLabReactionsMount.css'

/**
 * CR-07/CR-08/CR-12 lab host — ReactionsMount + FixtureAdapter for `#/lab/feed`.
 * CR-12: aggregatePlacement=below portals row under strip · React-always · apiRef for Reactions zone.
 * CR-15: composition wire marker · FixtureAdapter default · no dual live planes.
 */
export function FeedLabReactionsMount({
  target = 'thread-root',
  commentId = null,
  open = false,
  onOpenChange = null,
  initialState = 'empty',
  className = '',
  t = null,
  locale = 'en',
  aggregatePlacement = 'inline',
  aggregateHost = null,
  apiRef = null,
  /** @type {'auto'|'popover'|'sheet'} CR-19 people surface */
  forcePeopleSurface = 'auto',
}) {
  const adapter = useMemo(
    () => createFixtureAdapter({ initialState, target }),
    [initialState, target],
  )
  const snap = adapter.snapshot()
  const [openEpoch, setOpenEpoch] = useState(0)
  const prevOpen = useRef(Boolean(open))
  const translate = typeof t === 'function' ? t : labT

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
      data-lab-locale={locale}
      data-lab-aggregate-placement={aggregatePlacement}
      data-lab-cr15-wire="true"
      data-lab-cr19-people="true"
      data-m155-people="true"
      data-m155-sheet="true"
      data-rm-adapter="fixture"
    >
      <ReactionsMount
        key={`fl-rm-${target}-${commentId ?? 'root'}-${locale}-${openEpoch}-${initialState}-${forcePeopleSurface}`}
        target={target}
        commentId={commentId}
        density="compact"
        slot={slot}
        defaultOpen={Boolean(open)}
        stripStatus={snap.stripStatus}
        summaryMarks={snap.summaryMarks}
        aggregateCount={snap.aggregateCount}
        selected={snap.selected}
        t={translate}
        onReact={adapter.onReact}
        onOpen={() => {
          if (typeof onOpenChange === 'function') onOpenChange(true)
        }}
        onAggregateActivate={adapter.onAggregateActivate}
        aggregatePlacement={aggregatePlacement}
        aggregateHost={aggregateHost}
        apiRef={apiRef}
        reactAlways
        forcePeopleSurface={forcePeopleSurface}
      />
    </div>
  )
}
