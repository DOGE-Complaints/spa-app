import './Filters.css'

/**
 * @param {{
 *   chips: import('./buildChipDescriptors.js').FilterChipDescriptor[],
 *   onRemove: (field: import('./buildChipDescriptors.js').ChipField, value: string) => void,
 * }} props
 */
export function ActiveFilterChips({ chips, onRemove }) {
  if (!Array.isArray(chips) || chips.length === 0) return null

  return (
    <div className="board-active-filter-chips" role="list" aria-label="Active filters">
      {chips.map((chip) => (
        <span key={chip.id} className="board-filter-chip" role="listitem">
          <span className="board-filter-chip-label">{chip.label}</span>
          {/* DS-BTN: filter chip toggle exception (G10 T10) */}
          <button
            type="button"
            className="board-filter-chip-remove"
            aria-label={chip.removeAriaLabel}
            onClick={() => onRemove(chip.field, chip.value)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  )
}
