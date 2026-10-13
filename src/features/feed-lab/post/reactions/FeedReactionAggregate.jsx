import { feedReactionLabel } from './feedReactionLabels.js'
import './FeedReactionAggregate.css'

/**
 * Confirmed marks + count only when selection Present; empty = no theatrical zero.
 */
export function FeedReactionAggregate({ selectedIds = [] }) {
  const count = selectedIds.length
  const show = count > 0
  return (
    <div
      className="feed-reaction-aggregate"
      data-testid="feed-reaction-aggregate"
      data-lab-aggregate={show ? 'present' : 'empty'}
      aria-live="polite"
    >
      {!show ? (
        <span className="feed-reaction-aggregate__empty" data-testid="feed-reaction-aggregate-empty">
          No reactions yet
        </span>
      ) : (
        <>
          <div className="feed-reaction-aggregate__marks" data-testid="feed-reaction-aggregate-marks">
            {selectedIds.map((id) => (
              <span
                key={id}
                className="feed-reaction-aggregate__mark"
                data-testid={`feed-reaction-aggregate-mark-${id}`}
                data-reaction-id={id}
              >
                {feedReactionLabel(id)}
              </span>
            ))}
          </div>
          <span className="feed-reaction-aggregate__count" data-testid="feed-reaction-aggregate-count">
            {count}
          </span>
        </>
      )}
    </div>
  )
}
