import { ReactionOption } from './ReactionOption.jsx'

/** DS §8 ReactionLayerGroup — emotional / epistemic / moderation section. */
export function ReactionLayerGroup({
  layer,
  title,
  items,
  selected,
  busy,
  icons,
  labelFor,
  focusId = null,
  onSelect,
}) {
  if (!items?.length) return null
  return (
    <section
      className="reaction-picker-layer reaction-layer-group"
      data-testid={`reaction-layer-${layer}`}
      data-reaction-surface="ReactionLayerGroup"
      data-layer={layer}
      aria-label={title}
    >
      <h3 className="reaction-picker-layer-title">{title}</h3>
      <ul className="reaction-picker-list" role="list">
        {items.map((entry) => (
          <li key={entry.id}>
            <ReactionOption
              entry={entry}
              selected={selected.includes(entry.id)}
              busy={busy}
              icons={icons}
              label={labelFor(entry.id)}
              focusDemo={focusId === entry.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
