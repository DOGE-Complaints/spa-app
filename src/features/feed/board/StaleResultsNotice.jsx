/**
 * DS §4 StaleResultsNotice — readable set kept; refresh failed (distinct from empty/error).
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function StaleResultsNotice({ children, className = '' }) {
  return (
    <div
      className={`stale-results-notice feed-stale-banner${className ? ` ${className}` : ''}`}
      data-ds-surface="StaleResultsNotice"
      data-vl-done-surface="StaleResultsNotice"
      data-testid="feed-stale"
      role="status"
    >
      {children}
    </div>
  )
}
