import { useState, useMemo } from 'react'
import { formatLabelKey } from '../../i18n/labelDisplay.js'
import './Filters.css'

/**
 * @param {{ labels: string[], availableLabels: string[], onChange: (labels: string[]) => void, t: (k: string) => string, locale: string }} props
 */
export function LabelsFilter({ labels, availableLabels, onChange, t, locale }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const hasAvailableLabels = availableLabels.length > 0

  const filtered = useMemo(() => {
    if (!search.trim()) return availableLabels
    const q = search.toLowerCase().trim()
    return availableLabels.filter((l) => String(l).toLowerCase().includes(q))
  }, [availableLabels, search])

  const formatLabel = (key) => formatLabelKey(t, key, locale)

  const label =
    labels.length === 0
      ? t('filterLabels')
      : labels.length <= 2
        ? labels.map(formatLabel).join(', ')
        : `${labels.slice(0, 2).map(formatLabel).join(', ')} +${labels.length - 2}`

  const toggle = (l) => {
    if (labels.includes(l)) {
      onChange(labels.filter((x) => x !== l))
    } else {
      onChange([...labels, l])
    }
  }

  return (
    <div className="board-filter-wrap" data-open={open ? 'yes' : 'no'}>
      <button
        type="button"
        className="board-filter-trigger"
        onClick={() => {
          if (!hasAvailableLabels) return
          setOpen(!open)
        }}
        disabled={!hasAvailableLabels}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('filterLabels')}
      >
        <span className="board-filter-label">{t('filterLabels')}:</span>
        <span className="board-filter-value">{label}</span>
      </button>
      {open ? (
        <>
          <div className="board-filter-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          <div className="board-filter-dropdown board-filter-dropdown-labels">
            <input
              type="text"
              className="board-filter-search"
              placeholder={t('filterLabels')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search labels"
            />
            {filtered.map((l) => (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={labels.includes(l)}
                className={`board-filter-option ${labels.includes(l) ? 'board-filter-option-selected' : ''}`}
                onClick={() => toggle(l)}
              >
                {formatLabelKey(t, l, locale)}
              </button>
            ))}
            {labels.length > 0 ? (
              <button
                type="button"
                className="board-filter-clear"
                onClick={() => {
                  onChange([])
                  setOpen(false)
                }}
              >
                {t('clearAll')}
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
