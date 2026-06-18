import { useRef } from 'react'
import { formatBoardDateDisplay } from '../../i18n/formatBoardDateDisplay.js'

/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   locale?: string,
 *   t: (k: string) => string,
 *   ariaLabel: string,
 * }} props
 */
export function LocalizedDateInput({ value, onChange, locale, t, ariaLabel }) {
  const nativeRef = useRef(null)

  function openPicker() {
    const node = nativeRef.current
    if (!node) return
    if (typeof node.showPicker === 'function') {
      node.showPicker()
      return
    }
    node.focus()
  }

  return (
    <div
      className="board-filter-date-input-wrap"
      role="group"
      aria-label={ariaLabel}
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openPicker()
        }
      }}
    >
      <input
        type="text"
        readOnly
        className="board-filter-date-display"
        value={formatBoardDateDisplay(value, locale)}
        placeholder={t('filterDatePlaceholder')}
        lang={locale}
        aria-label={ariaLabel}
      />
      <span className="board-filter-date-icon" aria-hidden="true" />
      <input
        ref={nativeRef}
        type="date"
        className="board-filter-date-native"
        lang={locale}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
