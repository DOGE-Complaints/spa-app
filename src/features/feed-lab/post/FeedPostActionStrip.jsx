import './FeedPostActionStrip.css'

const ZONES = Object.freeze([
  { id: 'react', label: 'React' },
  { id: 'comment', label: 'Comment' },
  { id: 'share', label: 'Share' },
  { id: 'reactions', label: 'Reactions' },
])

/**
 * LAB-07 four-zone strip only — React | Comment | Share | Reactions · ~56px.
 * No second React pill. Picker UI → LAB-08 · discussion → LAB-09.
 */
export function FeedPostActionStrip({ onZone = null }) {
  return (
    <div
      className="feed-post-action-strip"
      data-testid="feed-post-action-strip"
      data-lab-strip-zones="4"
      role="group"
      aria-label="Post actions"
    >
      {ZONES.map((z) => (
        <button
          key={z.id}
          type="button"
          className="feed-post-action-strip__zone"
          data-testid={`feed-post-action-${z.id}`}
          data-zone={z.id}
          onClick={(e) => {
            e.stopPropagation()
            if (typeof onZone === 'function') onZone(z.id, e)
          }}
        >
          {z.label}
        </button>
      ))}
    </div>
  )
}
