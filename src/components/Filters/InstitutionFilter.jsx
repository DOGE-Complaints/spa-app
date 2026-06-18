import { useState } from 'react'
import './Filters.css'

/**
 * @param {{
 *   institution: string,
 *   availableInstitutions: string[],
 *   onChange: (institution: string) => void,
 *   formatInstitution: (value: string) => string,
 *   t: (k: string) => string,
 *   variant?: 'inline' | 'panel',
 * }} props
 */
export function InstitutionFilter({
  institution,
  availableInstitutions,
  onChange,
  formatInstitution,
  t,
  variant = 'inline',
}) {
  const [open, setOpen] = useState(false)
  const hasAvailable = availableInstitutions.length > 0
  const label = institution ? formatInstitution(institution) : t('filterAny')

  return (
    <div className={`board-filter-wrap ${variant === 'panel' ? 'board-filter-wrap-panel' : ''}`} data-open={open ? 'yes' : 'no'}>
      <button
        type="button"
        className="board-filter-trigger"
        onClick={() => {
          if (!hasAvailable) return
          setOpen(!open)
        }}
        disabled={!hasAvailable}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('filterInstitution')}
      >
        <span className="board-filter-label">{t('filterInstitution')}:</span>
        <span className="board-filter-value">{label}</span>
      </button>
      {open ? (
        <>
          {variant === 'inline' ? (
            <div className="board-filter-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          ) : null}
          <div className="board-filter-dropdown" role="listbox">
            <button
              type="button"
              role="option"
              aria-selected={!institution}
              className={`board-filter-option ${!institution ? 'board-filter-option-selected' : ''}`}
              onClick={() => {
                onChange('')
                setOpen(false)
              }}
            >
              {t('filterAny')}
            </button>
            {availableInstitutions.map((value) => (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={institution === value}
                className={`board-filter-option ${institution === value ? 'board-filter-option-selected' : ''}`}
                onClick={() => {
                  onChange(value)
                  setOpen(false)
                }}
              >
                {formatInstitution(value)}
              </button>
            ))}
            {institution ? (
              <button
                type="button"
                className="board-filter-clear"
                onClick={() => {
                  onChange('')
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
