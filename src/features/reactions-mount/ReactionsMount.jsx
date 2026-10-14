import { useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
} from '../feed/semantics/reactionsV1.js'
import { ReactionSummaryStrip } from './ReactionSummaryStrip.jsx'
import { CR_REACTION_ICON_PACK, CR_OMIT_SELECTABLE_IDS } from './icons/crReactionIcons.js'
import {
  REACTIONS_MOUNT_SLOT_KINDS,
  resolveReactionsMountTargetConfig,
} from './slot/postActionStripSlot.js'
import './ReactionsMount.css'

/**
 * Greenfield ReactionsMount — host-agnostic strip + mount props (CR-01).
 * Picker surface → CR-02. Live HTTP → optional later via ThreadsSocialClient only.
 *
 * Props seam (compatible with ReactionChrome / LiveIssueThreadMount onReact):
 *   target, density, reactionsEnable, summaryMarks, aggregateCount, selected,
 *   maxReactions, commentId, onReact, onOpen, onRetry, onError, stripStatus
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
  className = '',
}) {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  /** Local override after successful onReact; null = use props. */
  const [writeSnapshot, setWriteSnapshot] = useState(null)

  const capacity =
    Number.isFinite(Number(maxReactions)) && Number(maxReactions) > 0
      ? Math.floor(Number(maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR

  const targetConfig = resolveReactionsMountTargetConfig(target)

  const enabledIds = useMemo(() => {
    const list = listReactionsV1({
      target,
      includeDisabled: false,
      reactionsEnable,
    })
    return list
      .map((e) => e.id)
      .filter((id) => !CR_OMIT_SELECTABLE_IDS.includes(id))
  }, [target, reactionsEnable])

  const selected = writeSnapshot?.selected ?? (Array.isArray(selectedProp) ? selectedProp : [])
  const marks = writeSnapshot?.summary_marks ?? summaryMarks
  const aggregate =
    writeSnapshot?.aggregate_count !== undefined && writeSnapshot?.aggregate_count !== null
      ? writeSnapshot.aggregate_count
      : aggregateCount
  const status = writeSnapshot?.stripStatus ?? stripStatus

  function handleOpen() {
    setOpen(true)
    if (typeof onOpen === 'function') {
      onOpen({ target, commentId, enabledIds, capacity, selected })
    }
  }

  /**
   * Write seam — same shape as ReactionChrome; used by CR-02 picker / FixtureAdapter.
   * @param {{ reactionId: string, op: 'add'|'remove' }} args
   */
  async function commitReact(args) {
    if (typeof onReact !== 'function') {
      return { status: 'ok', data: { selected, summary_marks: marks, aggregate_count: aggregate } }
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
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-enabled-count={String(enabledIds.length)}
      data-m155-oos="true"
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
        onRetry={
          typeof onRetry === 'function'
            ? () => {
                setWriteSnapshot(null)
                onRetry()
              }
            : null
        }
        onAggregateActivate={
          typeof onAggregateActivate === 'function' ? onAggregateActivate : undefined
        }
      />
      <span className="rm-visually-hidden" data-testid="reactions-mount-enabled-ids">
        {enabledIds.join(',')}
      </span>
      <p className="rm-visually-hidden" data-testid="reactions-mount-scope-hint">
        {targetConfig.slotHint}
      </p>
      <button
        type="button"
        hidden
        data-testid="reactions-mount-commit-seam"
        onClick={() => {
          void commitReact({ reactionId: 'acknowledge', op: 'add' })
        }}
      />
    </div>
  )
}

export { DEFAULT_MAX_REACTIONS_PER_ACTOR }
