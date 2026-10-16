import { CrReactionIcon } from '../icons/CrReactionIcon.jsx'
import './ReactionPickerOption.css'

/**
 * CR-13 option tile — icon + bold label + short description; selected chrome.
 */
export function ReactionPickerOption({
  entry,
  selected = false,
  busy = false,
  icons = {},
  label,
  description,
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
      data-rm-tile="true"
      aria-pressed={selected ? 'true' : 'false'}
      disabled={busy}
      onClick={() => {
        if (typeof onSelect === 'function') onSelect(entry.id)
      }}
    >
      <span className="rm-picker-option__icon-wrap" aria-hidden="true">
        {iconSrc ? (
          <CrReactionIcon className="rm-picker-option__icon" src={iconSrc} size={28} />
        ) : null}
        {selected ? (
          <span className="rm-picker-option__check" data-testid={`rm-picker-option-check-${entry.id}`}>
            ✓
          </span>
        ) : null}
      </span>
      <span className="rm-picker-option__text">
        <span className="rm-picker-option__label">{label}</span>
        {description ? (
          <span className="rm-picker-option__desc" data-testid={`rm-picker-option-desc-${entry.id}`}>
            {description}
          </span>
        ) : null}
      </span>
    </button>
  )
}
