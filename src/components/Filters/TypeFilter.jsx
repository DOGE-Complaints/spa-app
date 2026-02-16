import { useState } from 'react'
import { ISSUE_TYPE } from '../../domain/types.js'
import './Filters.css'

const TYPE_LIST = Object.values(ISSUE_TYPE)

/**
 * @param {{ type: string, onChange: (type: string) => void, t: (k: string) => string }} props
 */
export function TypeFilter({ type, onChange, t }) {
  const [open, setOpen] = useState(false)

  const label = type ? t(`issueType.${type}`) : t('filterAny')

  return (
    <div className="board-filter-wrap" data-open={open ? 'yes' : 'no'}>
      <button
        type="button"
        className="board-filter-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('filterType')}
      >
        <span className="board-filter-label">{t('filterType')}:</span>
        <span className="board-filter-value">{label}</span>
      </button>
      {open ? (
        <>
          <div className="board-filter-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          <div className="board-filter-dropdown" role="listbox">
            <button
              type="button"
              role="option"
              aria-selected={!type}
              className={`board-filter-option ${!type ? 'board-filter-option-selected' : ''}`}
              onClick={() => {
                onChange('')
                setOpen(false)
              }}
            >
              {t('filterAny')}
            </button>
            {TYPE_LIST.map((ty) => (
              <button
                key={ty}
                type="button"
                role="option"
                aria-selected={type === ty}
                className={`board-filter-option ${type === ty ? 'board-filter-option-selected' : ''}`}
                onClick={() => {
                  onChange(ty)
                  setOpen(false)
                }}
              >
                {t(`issueType.${ty}`)}
              </button>
            ))}
            {type ? (
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
