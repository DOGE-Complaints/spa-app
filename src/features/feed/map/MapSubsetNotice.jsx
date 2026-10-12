/**
 * DS §9 MapSubsetNotice — explains List-only Issues when map shows a pin subset.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function MapSubsetNotice({ children, className = '' }) {
  return (
    <p
      className={`map-subset-notice${className ? ` ${className}` : ''}`}
      data-ds-surface="MapSubsetNotice"
      data-vl-done-surface="MapSubsetNotice"
      data-testid="feed-map-partial"
      role="status"
    >
      {children}
    </p>
  )
}
