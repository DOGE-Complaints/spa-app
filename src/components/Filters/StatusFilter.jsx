import { useState } from 'react'
import { ISSUE_STATUS } from '../../domain/types.js'
import './Filters.css'

const STATUS_LIST = Object.values(ISSUE_STATUS)

/**
 * @param {{ status: string[], onChange: (status: string[]) => void, locale: string, t: (k: string) => string, variant?: 'inline' | 'panel' }} props
 */
export function StatusFilter({ status, onChange, locale, t, variant = 'inline' }) {
  const [open, setOpen] = useState(false)

  const toggle = (s) => {
    if (status.includes(s)) {
      onChange(status.filter((x) => x !== s))
    } else {
      onChange([...status, s])
    }
  }

  const label = status.length === 0 ? t('filterAny') : status.map((s) => t(`status.${s}`)).join(', ')

  return (
    <div className={`board-filter-wrap ${variant === 'panel' ? 'board-filter-wrap-panel' : ''}`} data-open={open ? 'yes' : 'no'}>
      <button
        type="button"
        className="board-filter-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('filterStatus')}
      >
        <span className="board-filter-label">{t('filterStatus')}:</span>
        <span className="board-filter-value">{label}</span>
      </button>
      {open ? (
        <>
          {variant === 'inline' ? (
            <div className="board-filter-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          ) : null}
          <div className="board-filter-dropdown" role="listbox">
            {STATUS_LIST.map((s) => (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={status.includes(s)}
                className={`board-filter-option ${status.includes(s) ? 'board-filter-option-selected' : ''}`}
                onClick={() => toggle(s)}
              >
                {t(`status.${s}`)}
              </button>
            ))}
            {status.length > 0 ? (
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
