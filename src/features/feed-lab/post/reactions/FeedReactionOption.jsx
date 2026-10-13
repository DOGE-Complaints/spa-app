import { feedReactionLabel } from './feedReactionLabels.js'
import './FeedReactionOption.css'

/**
 * One catalog choice — label required · icon omit (no emoji invent).
 */
export function FeedReactionOption({ entry, selected = false, onSelect }) {
  const label = feedReactionLabel(entry.id)
  return (
    <button
      type="button"
      className="feed-reaction-option"
      data-testid={`feed-reaction-option-${entry.id}`}
      data-reaction-id={entry.id}
      data-layer={entry.layer}
      aria-pressed={selected ? 'true' : 'false'}
      onClick={() => {
        if (typeof onSelect === 'function') onSelect(entry.id)
      }}
    >
      <span className="feed-reaction-option__check" aria-hidden="true">
        {selected ? '✓' : ''}
      </span>
      <span className="feed-reaction-option__label">{label}</span>
    </button>
  )
}
