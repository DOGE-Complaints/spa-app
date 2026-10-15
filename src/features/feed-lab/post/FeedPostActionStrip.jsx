import './FeedPostActionStrip.css'

const ZONES = Object.freeze([
  { id: 'react', label: 'React' },
  { id: 'comment', label: 'Comment' },
  { id: 'share', label: 'Share' },
])

/**
 * CR-09 A+C+B strip — React-slot | Comment | Share · ~56px.
 * When `reactSlot` set, zone 1 hosts live ReactionSummaryStrip (no plain React label).
 * Production FeedCivicPost 4-zone strip is OOS.
 */
export function FeedPostActionStrip({ onZone = null, reactSlot = null }) {
  const hasSlot = reactSlot != null

  return (
    <div
      className="feed-post-action-strip"
      data-testid="feed-post-action-strip"
      data-lab-strip-zones="3"
      data-lab-strip-slot={hasSlot ? 'react' : 'none'}
      role="group"
      aria-label="Post actions"
    >
      {ZONES.map((z) => {
        if (z.id === 'react' && hasSlot) {
          return (
            <div
              key={z.id}
              className="feed-post-action-strip__zone feed-post-action-strip__zone--slot"
              data-testid={`feed-post-action-${z.id}`}
              data-zone={z.id}
              data-lab-react-slot="true"
            >
              {reactSlot}
            </div>
          )
        }

        return (
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
        )
      })}
    </div>
  )
}
