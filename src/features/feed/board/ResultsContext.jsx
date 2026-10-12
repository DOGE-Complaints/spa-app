/**
 * DS §4 ResultsContext — confirmed result / refresh context (not `(no query)` dump).
 *
 * @param {object} props
 * @param {'idle'|'populated'|'refreshing'|'filtered'|'search'} [props.status]
 * @param {string} props.label
 * @param {string} [props.className]
 */
export function ResultsContext({ status = 'idle', label, className = '' }) {
  if (!label) return null
  return (
    <p
      className={`results-context results-context--${status}${className ? ` ${className}` : ''}`}
      data-ds-surface="ResultsContext"
      data-vl-done-surface="ResultsContext"
      data-testid="results-context"
      data-results-status={status}
      role="status"
    >
      {label}
    </p>
  )
}
