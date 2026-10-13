import { useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  toggleReactionSelection,
} from '../../../feed/semantics/reactionsV1.js'
import { FeedReactionAggregate } from './FeedReactionAggregate.jsx'
import { FeedReactionPicker } from './FeedReactionPicker.jsx'
import './FeedReactionPlane.css'

/**
 * LAB-08 greenfield reactions host — local in-memory selection · no HTTP PUT.
 * Ban: Deprecated chrome · product reaction hosts · classic controls stylesheet · emoji-soup.
 */
export function FeedReactionPlane({
  target = 'thread-root',
  initialSelected = [],
  maxReactions = DEFAULT_MAX_REACTIONS_PER_ACTOR,
  open = false,
  onOpenChange = null,
}) {
  const panelId = useId()
  const [selected, setSelected] = useState(() => [...initialSelected])
  const [internalOpen, setInternalOpen] = useState(Boolean(open))
  const isControlled = typeof onOpenChange === 'function'
  const pickerOpen = isControlled ? Boolean(open) : internalOpen

  function setOpen(next) {
    if (isControlled) onOpenChange(next)
    else setInternalOpen(next)
  }

  const capacity =
    Number.isFinite(Number(maxReactions)) && Number(maxReactions) > 0
      ? Math.floor(Number(maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR

  const enabled = useMemo(
    () =>
      listReactionsV1({
        target,
        includeDisabled: false,
        reactionsEnable: null,
      }),
    [target],
  )

  const layers = useMemo(() => {
    const map = { emotional: [], epistemic: [], moderation: [] }
    for (const entry of enabled) {
      if (map[entry.layer]) map[entry.layer].push(entry)
    }
    // Thread-root: Moderation must stay absent (listReactionsV1 already filters)
    if (target === 'thread-root') map.moderation = []
    return map
  }, [enabled, target])

  function handleSelect(id) {
    const { selected: next, error } = toggleReactionSelection(selected, id, capacity)
    if (error === 'unknown-id' || error === 'capacity') return
    setSelected(next)
  }

  return (
    <div
      className="feed-reaction-plane"
      data-testid="feed-reaction-plane"
      data-lab-plane="greenfield"
      data-reaction-target={target}
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-lab-local-memory="true"
      data-lab-moderation={target === 'thread-root' ? 'absent' : 'eligible'}
    >
      <FeedReactionAggregate selectedIds={selected} />
      <FeedReactionPicker
        open={pickerOpen}
        panelId={panelId}
        layers={layers}
        selectedIds={selected}
        capacity={capacity}
        onSelect={handleSelect}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
