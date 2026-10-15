/** CR-07 Deprecated — retired from live `#/lab/feed` path. Kept for history / ban checks. Do not mount. */
import { FeedReactionOptionDeprecated } from './FeedReactionOptionDeprecated.jsx'
import { FEED_REACTION_LAYER_LABELS_EN } from './feedReactionLabels.js'
import './FeedReactionLayerGroupDeprecated.css'

export function FeedReactionLayerGroupDeprecated({ layer, entries, selectedIds, onSelect }) {
  if (!entries?.length) return null
  const title = FEED_REACTION_LAYER_LABELS_EN[layer] || layer
  return (
    <section
      className="feed-reaction-layer-group"
      data-testid={`feed-reaction-layer-${layer}`}
      data-layer={layer}
      aria-label={title}
    >
      <h3 className="feed-reaction-layer-group__title">{title}</h3>
      <ul className="feed-reaction-layer-group__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <FeedReactionOptionDeprecated
              entry={entry}
              selected={selectedIds.includes(entry.id)}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
