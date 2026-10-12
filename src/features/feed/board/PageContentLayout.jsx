/**
 * DS §2 PageContentLayout — max width, side gutters, vertical rhythm for board / issue page.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {'compact'|'medium'|'wide'} [props.density] — aligns gutters to BoardLayout variant
 */
export function PageContentLayout({ children, className = '', density = 'medium' }) {
  return (
    <div
      className={`page-content-layout page-content-layout--${density}${
        className ? ` ${className}` : ''
      }`}
      data-ds-surface="PageContentLayout"
      data-vl-done-surface="PageContentLayout"
      data-testid="page-content-layout"
      data-content-density={density}
    >
      {children}
    </div>
  )
}
