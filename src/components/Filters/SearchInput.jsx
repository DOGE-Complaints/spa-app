import './Filters.css'

/**
 * @param {{ value: string, onChange: (value: string) => void, placeholder: string, ariaLabel: string }} props
 */
export function SearchInput({ value, onChange, placeholder, ariaLabel }) {
  return (
    <label className="board-search-input-wrap">
      <span className="board-search-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        className="board-search-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </label>
  )
}
