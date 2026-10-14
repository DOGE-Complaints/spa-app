import { ReactionPickerOption } from './ReactionPickerOption.jsx'
import './ReactionPickerLayerGroup.css'

export function ReactionPickerLayerGroup({
  layer,
  title,
  entries,
  selectedIds,
  busy,
  icons,
  labelFor,
  onSelect,
}) {
  if (!entries?.length) return null
  return (
    <section
      className="rm-picker-layer"
      data-testid={`rm-picker-layer-${layer}`}
      data-layer={layer}
      aria-label={title}
    >
      <h3 className="rm-picker-layer__title">{title}</h3>
      <ul className="rm-picker-layer__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <ReactionPickerOption
              entry={entry}
              selected={selectedIds.includes(entry.id)}
              busy={busy}
              icons={icons}
              label={labelFor(entry.id)}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
