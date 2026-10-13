import { useEffect, useId, useMemo, useState } from 'react'
import {
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  toggleReactionSelection,
} from '../feed/semantics/reactionsV1.js'
import { NEXT_FEED_THREAD_ICONS } from '../feed/feedThreadIcons.js'
import { ReactionAggregateStrip } from '../feed/reactions/ReactionAggregateStrip.jsx'
import { ReactionPicker } from '../feed/reactions/ReactionPicker.jsx'
import './LabReactionChromeDeprecated.css'

/**
 * Lab-local reactions chrome — M154 atoms + in-memory selection only.
 * Does **not** pull classic board Controls CSS (ban LAB-03 Done path).
 * Styles live in lab-owned CSS (base strip/picker geometry + next tokens).
 */
export function LabReactionChromeDeprecated({
  t,
  target = 'thread-root',
  initialSelected = [],
  maxReactions = DEFAULT_MAX_REACTIONS_PER_ACTOR,
  iconPack = null,
  className = '',
  openSignal = 0,
}) {
  const icons = iconPack || NEXT_FEED_THREAD_ICONS
  const [open, setOpen] = useState(Boolean(openSignal))
  const [selected, setSelected] = useState(() => [...initialSelected])
  const panelId = useId()

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
        reactionsEnable: null,
      }),
    [target],
  )

  const marks = selected.map((id) => ({ id, count: 1 }))
  const count = selected.length
  const showCount = count > 0

  function handleSelect(id) {
    const before = selected
    const { selected: next, error } = toggleReactionSelection(before, id, capacity)
    if (error === 'unknown-id' || error === 'capacity') return
    setSelected(next)
  }

  const rootClass = ['lab-reaction-chrome', 'reaction-chrome', className].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      data-testid="lab-reaction-chrome"
      data-reaction-plane="lab"
      data-reaction-target={target}
      data-catalog="reactions.v1"
      data-max-reactions={String(capacity)}
      data-lab-local-memory="true"
      data-lab-plane="deprecated"
    >
      <ReactionAggregateStrip
        marks={marks}
        count={count}
        showCount={showCount}
        open={open}
        busy={false}
        panelId={panelId}
        icons={icons}
        t={t}
        labelFor={(id) => t(`threadsFeed.reactions.id.${id}`)}
        onToggleOpen={() => setOpen((v) => !v)}
      >
        <ReactionPicker
          panelId={panelId}
          open={open}
          pickerVariant="default"
          scene="strip"
          target={target}
          enabled={enabled}
          selected={selected}
          busy={false}
          icons={icons}
          t={t}
          exclusiveHint={false}
          showDisabledNote={false}
          capacity={capacity}
          selectedCount={selected.length}
          focusId={null}
          onClose={() => setOpen(false)}
          onSelect={(id) => {
            handleSelect(id)
          }}
        />
      </ReactionAggregateStrip>
    </div>
  )
}
