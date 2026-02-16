import './Filters.css'

/**
 * @param {{ hasActiveFilters: boolean, onReset: () => void, t: (k: string) => string }} props
 */
export function ResetFiltersControl({ hasActiveFilters, onReset, t }) {
  return (
    <button
      type="button"
      className="board-filter-reset"
      disabled={!hasActiveFilters}
      onClick={onReset}
      aria-label={t('resetFilters')}
    >
      {t('resetFilters')}
    </button>
  )
}
