import { useEffect, useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  toggleReactionSelection,
} from '../feed/semantics/reactionsV1.js'
import { ReactionSummaryStrip } from './ReactionSummaryStrip.jsx'
import { ReactionPicker, resolvePickerSurface } from './picker/ReactionPicker.jsx'
import { CR_REACTION_ICON_PACK, CR_OMIT_SELECTABLE_IDS } from './icons/crReactionIcons.js'
import {
  REACTIONS_MOUNT_SLOT_KINDS,
  resolveReactionsMountTargetConfig,
} from './slot/postActionStripSlot.js'
import './ReactionsMount.css'

/**
 * Greenfield ReactionsMount — strip (CR-01) + picker (CR-02).
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
}) {
  const panelId = useId()
  const [open, setOpen] = useState(Boolean(defaultOpen))
  const [busy, setBusy] = useState(false)
  const [writeSnapshot, setWriteSnapshot] = useState(null)
  const [exclusiveHint, setExclusiveHint] = useState(false)
  const [capacityBlocked, setCapacityBlocked] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [surface, setSurface] = useState(() => resolvePickerSurface(forcePickerSurface))

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
    // FR-CR-02.4 — React always opens picker (even with selection)
    setOpen(true)
    setSaveError(false)
    if (typeof onOpen === 'function') {
      onOpen({ target, commentId, enabledIds, capacity, selected })
    }
  }

  function handleClose() {
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
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-enabled-count={String(enabledIds.length)}
      data-m155-oos="true"
    >
      <div className="reactions-mount__anchor">
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
          onRetry={
            typeof onRetry === 'function'
              ? () => {
                  setWriteSnapshot(null)
                  setSaveError(false)
                  onRetry()
                }
              : null
          }
          onAggregateActivate={
            typeof onAggregateActivate === 'function' ? onAggregateActivate : undefined
          }
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
          onSelect={(rid) => {
            void handleSelect(rid)
          }}
          onClose={handleClose}
        />
      </div>
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
