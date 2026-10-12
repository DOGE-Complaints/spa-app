import { ReactionMark } from './ReactionMark.jsx'

/** DS §8 ReactionOption — one catalog choice. */
export function ReactionOption({
  entry,
  selected,
  busy,
  icons,
  label,
  focusDemo = false,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={`reaction-choice reaction-option${selected ? ' reaction-choice--selected' : ''}${
        focusDemo ? ' reaction-choice--focus' : ''
      }`}
      data-testid={`reaction-choice-${entry.id}`}
      data-reaction-surface="ReactionOption"
      data-reaction-id={entry.id}
      aria-pressed={selected}
      disabled={busy}
      onClick={() => onSelect?.(entry.id)}
    >
      <ReactionMark entry={entry} icons={icons} />
      <span>{label}</span>
    </button>
  )
}
