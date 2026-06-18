import './Filters.css'
import { LocalizedDateInput } from './LocalizedDateInput.jsx'

/**
 * @param {{
 *   createdAfter: string,
 *   createdBefore: string,
 *   onChangeAfter: (value: string) => void,
 *   onChangeBefore: (value: string) => void,
 *   t: (k: string) => string,
 *   locale?: string,
 *   variant?: 'inline' | 'panel',
 * }} props
 */
export function DateRangeFilter({
  createdAfter,
  createdBefore,
  onChangeAfter,
  onChangeBefore,
  t,
  locale,
  variant = 'inline',
}) {
  return (
    <div className={`board-filter-date-range ${variant === 'panel' ? 'board-filter-date-range-panel' : ''}`}>
      <span className="board-filter-label">{t('filterDateCreated')}</span>
      <div className="board-filter-date-inputs">
        <label className="board-filter-date-field">
          <span className="board-filter-date-field-label">{t('filterDateFrom')}</span>
          <LocalizedDateInput
            value={createdAfter}
            onChange={onChangeAfter}
            locale={locale}
            t={t}
            ariaLabel={t('filterDateFrom')}
          />
        </label>
        <label className="board-filter-date-field">
          <span className="board-filter-date-field-label">{t('filterDateTo')}</span>
          <LocalizedDateInput
            value={createdBefore}
            onChange={onChangeBefore}
            locale={locale}
            t={t}
            ariaLabel={t('filterDateTo')}
          />
        </label>
      </div>
    </div>
  )
}
