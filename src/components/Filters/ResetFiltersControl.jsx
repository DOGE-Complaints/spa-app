import { Button } from '../Button'
import './Filters.css'

/**
 * @param {{ hasActiveFilters: boolean, onReset: () => void, t: (k: string) => string }} props
 */
export function ResetFiltersControl({ hasActiveFilters, onReset, t }) {
  return (
    <Button
      type="button"
      hierarchy="link"
      intent="reset"
      disabled={!hasActiveFilters}
      onClick={onReset}
      ariaLabel={t('resetFilters')}
    >
      {t('resetFilters')}
    </Button>
  )
}
