/** CR-07 Deprecated — retired from live `#/lab/feed` path. Kept for history / ban checks. Do not mount. */
import { useEffect, useRef } from 'react'
import { FeedReactionLayerGroupDeprecated } from './FeedReactionLayerGroupDeprecated.jsx'
import './FeedReactionPickerDeprecated.css'

/**
 * Anchored panel · Emotional + Epistemic at thread-root · Escape/close.
 * Class prefix feed-reaction-* · no classic Controls CSS class names.
 */
export function FeedReactionPickerDeprecated({
  open,
  panelId,
  layers,
  selectedIds,
  capacity,
  onSelect,
  onClose,
}) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (typeof onClose === 'function') onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && closeRef.current) {
      closeRef.current.focus()
    }
  }, [open])

  if (!open) return null

  const selectedCount = selectedIds.length
  const layerEntries = Object.entries(layers).filter(([, list]) => list.length > 0)

  return (
    <div
      id={panelId}
      className="feed-reaction-picker"
      data-testid="feed-reaction-picker-deprecated"
      data-lab-picker="m154"
      role="dialog"
      aria-label="Choose reactions"
    >
      <div className="feed-reaction-picker__header">
        <p className="feed-reaction-picker__capacity" data-testid="feed-reaction-capacity">
          {selectedCount} of {capacity} selected · Choose up to {capacity} reactions
        </p>
        <button
          ref={closeRef}
          type="button"
          className="feed-reaction-picker__close"
          data-testid="feed-reaction-picker-close"
          onClick={() => {
            if (typeof onClose === 'function') onClose()
          }}
        >
          Close
        </button>
      </div>
      <p className="feed-reaction-picker__hint" data-testid="feed-reaction-root-scope-hint">
        Thread root: Moderation reactions are available on comments only.
      </p>
      <div className="feed-reaction-picker__body">
        {layerEntries.map(([layer, entries]) => (
          <FeedReactionLayerGroupDeprecated
            key={layer}
            layer={layer}
            entries={entries}
            selectedIds={selectedIds}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
