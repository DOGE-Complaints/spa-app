import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  toggleReactionSelection,
} from '../feed/semantics/reactionsV1.js'
import { ReactionSummaryStrip } from './ReactionSummaryStrip.jsx'
import { ReactionAggregateRow } from './ReactionAggregateRow.jsx'
import { ReactionPicker, resolvePickerSurface } from './picker/ReactionPicker.jsx'
import { CR_REACTION_ICON_PACK, CR_OMIT_SELECTABLE_IDS } from './icons/crReactionIcons.js'
import {
  REACTIONS_MOUNT_SLOT_KINDS,
  resolveReactionsMountTargetConfig,
} from './slot/postActionStripSlot.js'
import './ReactionsMount.css'

const POPOVER_GAP_PX = 8
const POPOVER_EDGE_PAD = 8
const POPOVER_MAX_WIDTH_REM = 22

/**
 * Measure zone-1 / strip anchor → fixed popover top/left (CR-10).
 * @param {Element | null} el
 * @returns {{ top: number, left: number } | null}
 */
export function measurePopoverPosition(el) {
  if (!el || typeof el.getBoundingClientRect !== 'function') return null
  if (typeof window === 'undefined') return null
  const r = el.getBoundingClientRect()
  const maxW = Math.min(window.innerWidth - POPOVER_EDGE_PAD * 2, POPOVER_MAX_WIDTH_REM * 16)
  let top = r.bottom + POPOVER_GAP_PX
  let left = r.left
  if (left + maxW > window.innerWidth - POPOVER_EDGE_PAD) {
    left = Math.max(POPOVER_EDGE_PAD, window.innerWidth - maxW - POPOVER_EDGE_PAD)
  }
  if (left < POPOVER_EDGE_PAD) left = POPOVER_EDGE_PAD
  const maxH = Math.min(window.innerHeight * 0.7, 440)
  if (top + maxH > window.innerHeight - POPOVER_EDGE_PAD) {
    const above = r.top - POPOVER_GAP_PX - maxH
    if (above >= POPOVER_EDGE_PAD) top = above
    else top = Math.max(POPOVER_EDGE_PAD, window.innerHeight - maxH - POPOVER_EDGE_PAD)
  }
  return { top, left }
}

/**
 * Greenfield ReactionsMount — strip (CR-01) + picker (CR-02) + portal escape (CR-10).
 * Props seam host-agnostic. Live HTTP → ThreadsSocialClient only later.
 *
 * Extra CR-02 props: defaultOpen, forcePickerSurface ('auto'|'popover'|'sheet')
 */
export function ReactionsMount({
  target = 'thread-root',
  density = 'compact',
  stripStatus = 'ready',
  summaryMarks = null,
  aggregateCount = null,
  selected: selectedProp = [],
  reactionsEnable = null,
  maxReactions = DEFAULT_MAX_REACTIONS_PER_ACTOR,
  commentId = null,
  slot = REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP,
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  onReact = null,
  onOpen = null,
  onRetry = null,
  onError = null,
  onAggregateActivate = null,
  defaultOpen = false,
  forcePickerSurface = 'auto',
  className = '',
  /** @type {'inline'|'below'} — CR-12: below portals aggregate under strip host */
  aggregatePlacement = 'inline',
  /** @type {Element|null} — DOM host below FeedPostActionStrip */
  aggregateHost = null,
  /** @type {React.MutableRefObject<{ activateAggregate: () => void }|null>|null} */
  apiRef = null,
  reactAlways = true,
}) {
  const panelId = useId()
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(Boolean(defaultOpen))
  const [aggregateActive, setAggregateActive] = useState(false)
  const [busy, setBusy] = useState(false)
  const [writeSnapshot, setWriteSnapshot] = useState(null)
  const [exclusiveHint, setExclusiveHint] = useState(false)
  const [capacityBlocked, setCapacityBlocked] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [surface, setSurface] = useState(() => resolvePickerSurface(forcePickerSurface))
  const [popoverStyle, setPopoverStyle] = useState(null)

  useEffect(() => {
    setSurface(resolvePickerSurface(forcePickerSurface))
    if (forcePickerSurface !== 'auto') return undefined
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = () => setSurface(resolvePickerSurface('auto'))
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [forcePickerSurface])

  useEffect(() => {
    if (defaultOpen) setOpen(true)
  }, [defaultOpen])

  useLayoutEffect(() => {
    if (!open || surface !== 'popover') {
      setPopoverStyle(null)
      return undefined
    }
    function update() {
      setPopoverStyle(measurePopoverPosition(anchorRef.current))
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open, surface])

  const capacity =
    Number.isFinite(Number(maxReactions)) && Number(maxReactions) > 0
      ? Math.floor(Number(maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR

  const targetConfig = resolveReactionsMountTargetConfig(target)

  const enabledEntries = useMemo(() => {
    const list = listReactionsV1({
      target,
      includeDisabled: false,
      reactionsEnable,
    })
    return list.filter((e) => !CR_OMIT_SELECTABLE_IDS.includes(e.id))
  }, [target, reactionsEnable])

  const enabledIds = useMemo(() => enabledEntries.map((e) => e.id), [enabledEntries])

  const layers = useMemo(() => {
    const map = { emotional: [], epistemic: [], moderation: [] }
    for (const entry of enabledEntries) {
      if (map[entry.layer]) map[entry.layer].push(entry)
    }
    if (target === 'thread-root') map.moderation = []
    return map
  }, [enabledEntries, target])

  const selected = writeSnapshot?.selected ?? (Array.isArray(selectedProp) ? selectedProp : [])
  const marks = writeSnapshot?.summary_marks ?? summaryMarks
  const aggregate =
    writeSnapshot?.aggregate_count !== undefined && writeSnapshot?.aggregate_count !== null
      ? writeSnapshot.aggregate_count
      : aggregateCount
  const status = writeSnapshot?.stripStatus ?? stripStatus

  function handleOpen() {
    // CR-12: React always opens picker (empty and populated). Aggregate also activates picker.
    setOpen(true)
    setSaveError(false)
    if (typeof onOpen === 'function') {
      onOpen({ target, commentId, enabledIds, capacity, selected })
    }
  }

  function activateAggregate() {
    setAggregateActive(true)
    handleOpen()
    if (typeof onAggregateActivate === 'function') onAggregateActivate()
  }

  useEffect(() => {
    if (!apiRef) return undefined
    apiRef.current = { activateAggregate }
    return () => {
      if (apiRef.current?.activateAggregate === activateAggregate) {
        apiRef.current = null
      }
    }
  })

  function handleClose() {
    setAggregateActive(false)
    setOpen(false)
  }

  /**
   * @param {{ reactionId: string, op: 'add'|'remove' }} args
   * @param {{ selected: string[], summary_marks: unknown, aggregate_count: unknown }} [confirmed]
   */
  async function commitReact(args, confirmed) {
    if (typeof onReact !== 'function') {
      return {
        status: 'ok',
        data: {
          selected: confirmed?.selected ?? selected,
          summary_marks: confirmed?.summary_marks ?? marks,
          aggregate_count: confirmed?.aggregate_count ?? aggregate,
        },
      }
    }
    setBusy(true)
    try {
      const result = await onReact({
        reactionId: args.reactionId,
        op: args.op,
        target,
        commentId: target === 'thread-root' ? null : commentId,
      })
      if (result && result.status === 'ok' && result.data) {
        setWriteSnapshot({
          selected: Array.isArray(result.data.selected)
            ? result.data.selected.map(String)
            : selected,
          summary_marks: result.data.summary_marks ?? marks,
          aggregate_count:
            result.data.aggregate_count !== undefined && result.data.aggregate_count !== null
              ? Number(result.data.aggregate_count)
              : aggregate,
          stripStatus: 'ready',
        })
        setSaveError(false)
        return result
      }
      if (result && result.status === 'fail' && typeof onError === 'function') {
        onError(result)
      }
      return result
    } catch (err) {
      if (typeof onError === 'function') onError({ status: 'fail', error: err })
      return { status: 'fail', error: err }
    } finally {
      setBusy(false)
    }
  }

  async function handleSelect(id) {
    const beforeSelected = [...selected]
    const beforeMarks = Array.isArray(marks) ? marks.map((m) => ({ ...m })) : marks
    const beforeAgg = aggregate
    const { selected: next, error } = toggleReactionSelection(beforeSelected, id, capacity)
    if (error === 'unknown-id') return
    if (error === 'capacity') {
      setCapacityBlocked(true)
      return
    }
    setCapacityBlocked(false)
    if (id === 'agree' || id === 'disagree') setExclusiveHint(true)

    const op = next.includes(id) ? 'add' : 'remove'
    // Optimistic UI
    setWriteSnapshot({
      selected: next,
      summary_marks: beforeMarks,
      aggregate_count: beforeAgg,
      stripStatus: 'ready',
    })

    const result = await commitReact({ reactionId: id, op }, {
      selected: next,
      summary_marks: beforeMarks,
      aggregate_count: beforeAgg,
    })

    if (!result || result.status !== 'ok') {
      // FR-CR-02.5 — restore previous selection (no silent empty)
      setWriteSnapshot({
        selected: beforeSelected,
        summary_marks: beforeMarks,
        aggregate_count: beforeAgg,
        stripStatus: 'ready',
      })
      setSaveError(true)
    }
  }

  const rootClass = ['reactions-mount', className].filter(Boolean).join(' ')
  const placement = aggregatePlacement === 'below' ? 'below' : 'inline'
  const stripAggregatePlacement = placement === 'below' ? 'external' : 'inline'

  const retryHandler =
    typeof onRetry === 'function'
      ? () => {
          setWriteSnapshot(null)
          setSaveError(false)
          onRetry()
        }
      : null

  const aggregateRow =
    placement === 'below' ? (
      <ReactionAggregateRow
        stripStatus={status}
        summaryMarks={marks}
        aggregateCount={aggregate}
        icons={icons}
        t={t}
        density={density}
        open={open}
        active={aggregateActive}
        panelId={panelId}
        onOpen={handleOpen}
        onRetry={retryHandler}
        onAggregateActivate={
          typeof onAggregateActivate === 'function' ? onAggregateActivate : undefined
        }
      />
    ) : null

  return (
    <div
      className={rootClass}
      data-testid="reactions-mount"
      data-rm-package="reactions-mount"
      data-rm-target={target}
      data-rm-density={density}
      data-rm-slot={slot}
      data-rm-moderation={targetConfig.moderationSelectable ? 'eligible' : 'absent'}
      data-rm-onreact={typeof onReact === 'function' ? 'wired' : 'local'}
      data-rm-picker-open={open ? 'true' : 'false'}
      data-rm-aggregate-placement={placement}
      data-rm-react-always={reactAlways ? 'true' : 'false'}
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-enabled-count={String(enabledIds.length)}
      data-m155-oos="true"
    >
      <div
        ref={anchorRef}
        className="reactions-mount__anchor"
        data-testid="reactions-mount-anchor"
      >
        <ReactionSummaryStrip
          stripStatus={status}
          summaryMarks={marks}
          aggregateCount={aggregate}
          selected={selected}
          icons={icons}
          t={t}
          density={density}
          busy={busy}
          open={open}
          panelId={panelId}
          onOpen={handleOpen}
          onRetry={retryHandler}
          onAggregateActivate={
            typeof onAggregateActivate === 'function' ? onAggregateActivate : undefined
          }
          aggregatePlacement={stripAggregatePlacement}
          reactAlways={reactAlways}
        />
        <ReactionPicker
          open={open}
          panelId={panelId}
          surface={surface}
          target={target}
          layers={layers}
          selectedIds={selected}
          capacity={capacity}
          busy={busy}
          exclusiveHint={exclusiveHint}
          capacityBlocked={capacityBlocked}
          saveError={saveError}
          icons={icons}
          t={t}
          anchorRef={anchorRef}
          popoverStyle={popoverStyle}
          onSelect={(rid) => {
            void handleSelect(rid)
          }}
          onClose={handleClose}
        />
      </div>
      {placement === 'below' && aggregateHost
        ? createPortal(aggregateRow, aggregateHost)
        : null}
      <span className="rm-visually-hidden" data-testid="reactions-mount-enabled-ids">
        {enabledIds.join(',')}
      </span>
      <p className="rm-visually-hidden" data-testid="reactions-mount-scope-hint">
        {targetConfig.slotHint}
      </p>
    </div>
  )
}

export { DEFAULT_MAX_REACTIONS_PER_ACTOR }
