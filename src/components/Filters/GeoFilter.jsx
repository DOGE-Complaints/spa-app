import { useState } from 'react'
import {
  GEO_ADMIN_FILTER_KEYS,
  GEO_ADMIN_LABEL_KEYS,
} from '../../i18n/geoAdminFilterKeys.js'
import './Filters.css'

/**
 * @param {{
 *   geo: Record<import('../../i18n/geoAdminFilterKeys.js').GeoAdminFilterKey, string[]>,
 *   availableOptions: Record<import('../../i18n/geoAdminFilterKeys.js').GeoAdminFilterKey, string[]>,
 *   onChange: (field: import('../../i18n/geoAdminFilterKeys.js').GeoAdminFilterKey, values: string[]) => void,
 *   t: (k: string) => string,
 *   variant?: 'inline' | 'panel',
 * }} props
 */
export function GeoFilter({ geo, availableOptions, onChange, t, variant = 'inline' }) {
  const hasAnyOptions = GEO_ADMIN_FILTER_KEYS.some(
    (key) => (availableOptions[key] ?? []).length > 0,
  )

  if (!hasAnyOptions) {
    return (
      <div className={`board-geo-filter ${variant === 'panel' ? 'board-geo-filter-panel' : ''}`} data-disabled="yes">
        <p className="board-geo-filter-empty">{t('filterGeoEmpty')}</p>
      </div>
    )
  }

  return (
    <div className={`board-geo-filter ${variant === 'panel' ? 'board-geo-filter-panel' : ''}`}>
      {GEO_ADMIN_FILTER_KEYS.filter((field) => (availableOptions[field] ?? []).length > 0).map(
        (field) => (
          <GeoDimensionFilter
            key={field}
            field={field}
            labelKey={GEO_ADMIN_LABEL_KEYS[field]}
            values={geo[field] ?? []}
            options={availableOptions[field] ?? []}
            onChange={(values) => onChange(field, values)}
            t={t}
            variant={variant}
          />
        ),
      )}
    </div>
  )
}

/**
 * @param {{
 *   field: import('../../i18n/geoAdminFilterKeys.js').GeoAdminFilterKey,
 *   labelKey: string,
 *   values: string[],
 *   options: string[],
 *   onChange: (values: string[]) => void,
 *   t: (k: string) => string,
 *   variant: 'inline' | 'panel',
 * }} props
 */
function GeoDimensionFilter({ field, labelKey, values, options, onChange, t, variant }) {
  const [open, setOpen] = useState(false)
  const hasOptions = options.length > 0

  const label =
    values.length === 0
      ? t('filterAny')
      : values.length <= 2
        ? values.join(', ')
        : `${values.slice(0, 2).join(', ')} +${values.length - 2}`

  const toggle = (value) => {
    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value))
    } else {
      onChange([...values, value])
    }
  }

  return (
    <div
      className={`board-filter-wrap board-geo-dimension ${variant === 'panel' ? 'board-filter-wrap-panel' : ''}`}
      data-open={open ? 'yes' : 'no'}
      data-geo-dimension={field}
    >
      {/* DS-BTN: filter chip toggle exception (G10 T10) */}
      <button
        type="button"
        className="board-filter-trigger"
        onClick={() => {
          if (!hasOptions) return
          setOpen(!open)
        }}
        disabled={!hasOptions}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t(labelKey)}
      >
        <span className="board-filter-label">{t(labelKey)}:</span>
        <span className="board-filter-value">{label}</span>
      </button>
      {open ? (
        <>
          {variant === 'inline' ? (
            <div className="board-filter-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          ) : null}
          <div className="board-filter-dropdown" role="listbox">
            {options.map((value) => (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={values.includes(value)}
                className={`board-filter-option ${values.includes(value) ? 'board-filter-option-selected' : ''}`}
                onClick={() => toggle(value)}
              >
                {value}
              </button>
            ))}
            {values.length > 0 ? (
              <button
                type="button"
                className="board-filter-clear"
                onClick={() => {
                  onChange([])
                  setOpen(false)
                }}
              >
                {t('clear')}
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
