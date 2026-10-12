import { useEffect, useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  mapSummaryMarksToEntries,
  resolveHarnessThr03Scene,
  toggleReactionSelection,
} from '../semantics/reactionsV1.js'
import { THREADS_FEED_THREAD_ICONS } from '../../../components/threads/threadIcons.js'
import { ReactionAggregateStrip } from './ReactionAggregateStrip.jsx'
import { ReactionPicker } from './ReactionPicker.jsx'
import '../../../components/threads/ReactionControls.css'
import './ReactionChrome.css'

/**
 * Next-feed DS reactions chrome plane (M154 / DS §8).
 * Uses Closed reactions.v1 seam — does not mount classic ReactionControls.
 */
export function ReactionChrome({
  t,
  target = 'comment',
  initialSelected = [],
  summaryMarks = null,
  aggregateCount = null,
  commentId = null,
  maxReactions = DEFAULT_MAX_REACTIONS_PER_ACTOR,
  reactionsEnable = null,
  iconPack = null,
  onReact,
  className = '',
  hideZeroCount = false,
  pickerVariant = 'default',
  openSignal = 0,
}) {
  const icons = iconPack || THREADS_FEED_THREAD_ICONS
  const scene = resolveHarnessThr03Scene('strip')
  const [open, setOpen] = useState(
    scene === 'picker' ||
      scene === 'enabled-only' ||
      scene === 'exclusive' ||
      scene === 'keyboard' ||
      scene === 'mobile',
  )
  const [selected, setSelected] = useState(() => {
    if (scene === 'exclusive') return ['agree']
    return initialSelected
  })
  const [marksState, setMarksState] = useState(() => mapSummaryMarksToEntries(summaryMarks))
  const [aggregateState, setAggregateState] = useState(
    aggregateCount === null || aggregateCount === undefined ? null : Number(aggregateCount),
  )
  const [exclusiveHint, setExclusiveHint] = useState(scene === 'exclusive')
  const [busy, setBusy] = useState(false)
  const panelId = useId()

  useEffect(() => {
    setMarksState(mapSummaryMarksToEntries(summaryMarks))
    setAggregateState(
      aggregateCount === null || aggregateCount === undefined ? null : Number(aggregateCount),
    )
  }, [summaryMarks, aggregateCount])

  useEffect(() => {
    if (openSignal) setOpen(true)
  }, [openSignal])

  const capacity =
    Number.isFinite(Number(maxReactions)) && Number(maxReactions) > 0
      ? Math.floor(Number(maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR

  const enabled = useMemo(
    () =>
      listReactionsV1({
        target,
        includeDisabled: false,
        reactionsEnable,
      }),
    [target, reactionsEnable],
  )
  const showDisabledNote = scene === 'enabled-only'
  const marks = marksState || []
  const count =
    aggregateState ??
    (marks.length > 0 ? marks.reduce((n, m) => n + (Number(m.count) || 1), 0) : selected.length)
  const showCount = !(hideZeroCount && (!count || count === 0) && marks.length === 0)

  async function handleSelect(id) {
    if (busy) return
    const before = selected
    const { selected: next, error } = toggleReactionSelection(before, id, capacity)
    if (error === 'unknown-id' || error === 'capacity') return
    if (
      (id === 'agree' && before.includes('disagree')) ||
      (id === 'disagree' && before.includes('agree'))
    ) {
      setExclusiveHint(true)
    }

    if (typeof onReact !== 'function') {
      setSelected(next)
      return
    }

    const op = before.includes(id) ? 'remove' : 'add'
    setBusy(true)
    try {
      const result = await onReact({
        reactionId: id,
        op,
        target,
        commentId: target === 'thread-root' ? null : commentId,
      })
      if (result && result.status === 'ok' && result.data) {
        const data = result.data
        if (Array.isArray(data.selected)) {
          setSelected(data.selected.map(String))
        } else {
          setSelected(next)
        }
        const mapped = mapSummaryMarksToEntries(
          /** @type {Array<{ reaction_id?: string, count?: number }>} */ (data.summary_marks),
        )
        if (mapped) setMarksState(mapped)
        if (data.aggregate_count !== undefined && data.aggregate_count !== null) {
          setAggregateState(Number(data.aggregate_count))
        }
        return
      }
      if (result && result.status === 'fail' && result.failKind === 'verify') {
        return
      }
    } catch {
      // keep prior
    } finally {
      setBusy(false)
    }
  }

  const rootClass = ['reaction-chrome', className].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      data-testid="reaction-chrome"
      data-reaction-plane="ds"
      data-reaction-target={target}
      data-thr03-scene={scene}
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-picker-variant={pickerVariant}
    >
      <ReactionAggregateStrip
        marks={marks}
        count={count}
        showCount={showCount}
        open={open}
        busy={busy}
        panelId={panelId}
        icons={icons}
        t={t}
        labelFor={(id) => t(`threadsFeed.reactions.id.${id}`)}
        onToggleOpen={() => setOpen((v) => !v)}
      >
        <ReactionPicker
          panelId={panelId}
          open={open}
          pickerVariant={pickerVariant}
          scene={scene}
          target={target}
          enabled={enabled}
          selected={selected}
          busy={busy}
          icons={icons}
          t={t}
          exclusiveHint={exclusiveHint}
          showDisabledNote={showDisabledNote}
          capacity={capacity}
          selectedCount={selected.length}
          focusId={scene === 'keyboard' ? 'acknowledge' : null}
          onClose={() => setOpen(false)}
          onSelect={(id) => {
            void handleSelect(id)
          }}
        />
      </ReactionAggregateStrip>
    </div>
  )
}
