import { FeedReactionOption } from './FeedReactionOption.jsx'
import { FEED_REACTION_LAYER_LABELS_EN } from './feedReactionLabels.js'
import './FeedReactionLayerGroup.css'

export function FeedReactionLayerGroup({ layer, entries, selectedIds, onSelect }) {
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
            <FeedReactionOption
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
