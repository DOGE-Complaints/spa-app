import './BoardSearchField.css'

/**
 * DS §4 BoardSearchField — named next-feed search surface.
 * Not Filters `SearchInput` / `board-search-*` Done chrome (AD-VL-01/02).
 *
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   placeholder: string,
 *   ariaLabel: string,
 *   clearAriaLabel: string,
 *   label?: string,
 * }} props
 */
export function BoardSearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  clearAriaLabel,
  label = '',
}) {
  const showClear = typeof value === 'string' && value.length > 0
  const labelText = typeof label === 'string' ? label.trim() : ''

  return (
    <div
      className="board-search-field"
      data-testid="board-search-field"
      data-search-surface="BoardSearchField"
      data-has-value={showClear ? 'true' : 'false'}
    >
      {labelText ? (
        <label className="board-search-field-label" htmlFor="board-search-field-input">
          {labelText}
        </label>
      ) : null}
      <div className="board-search-field-control">
        <img
          className="board-search-field-icon"
          src="/icons/next-shell/navigation/search.svg"
          alt=""
          aria-hidden="true"
          data-testid="board-search-field-icon"
        />
        <input
          id="board-search-field-input"
          type="search"
          className="board-search-field-input"
          data-testid="board-search-field-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
        {showClear ? (
          <button
            type="button"
            className="board-search-field-clear"
            data-testid="board-search-field-clear"
            aria-label={clearAriaLabel}
            onClick={() => onChange('')}
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
