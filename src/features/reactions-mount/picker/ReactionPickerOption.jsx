import './ReactionPickerOption.css'

/**
 * One catalog choice — CR-icon Runtime URL + localized label (never id as copy).
 */
export function ReactionPickerOption({
  entry,
  selected = false,
  busy = false,
  icons = {},
  label,
  onSelect,
}) {
  const iconSrc = icons[entry.id]
  return (
    <button
      type="button"
      className="rm-picker-option"
      data-testid={`rm-picker-option-${entry.id}`}
      data-reaction-id={entry.id}
      data-layer={entry.layer}
      aria-pressed={selected ? 'true' : 'false'}
      disabled={busy}
      onClick={() => {
        if (typeof onSelect === 'function') onSelect(entry.id)
      }}
    >
      <span className="rm-picker-option__check" aria-hidden="true">
        {selected ? '✓' : ''}
      </span>
      {iconSrc ? (
        <img className="rm-picker-option__icon" src={iconSrc} alt="" aria-hidden="true" />
      ) : null}
      <span className="rm-picker-option__label">{label}</span>
    </button>
  )
}
