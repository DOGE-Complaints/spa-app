import { Button } from '../Button'
import './Filters.css'

/**
 * NF-22: actionable when panel dirty and/or applied filters active.
 * @param {{
 *   hasActiveFilters?: boolean
 *   isDirty?: boolean
 *   onReset: () => void
 *   t: (k: string) => string
 * }} props
 */
export function ResetFiltersControl({ hasActiveFilters = false, isDirty = false, onReset, t }) {
  const actionable = Boolean(isDirty || hasActiveFilters)
  return (
    <Button
      type="button"
      hierarchy="link"
      intent="reset"
      className="board-filter-reset"
      disabled={!actionable}
      onClick={onReset}
      ariaLabel={t('resetFilters')}
    >
      {t('resetFilters')}
    </Button>
  )
}
