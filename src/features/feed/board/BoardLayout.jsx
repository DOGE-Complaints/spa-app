/**
 * DS §2 BoardLayout — main board + optional side slots (compact | medium | wide).
 * Absent side modules do not leave empty columns (FR-VL-09.2).
 *
 * @param {object} props
 * @param {'compact'|'medium'|'wide'} [props.variant]
 * @param {import('react').ReactNode} [props.sideStart]
 * @param {import('react').ReactNode} [props.sideEnd]
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function BoardLayout({
  variant = 'medium',
  sideStart = null,
  sideEnd = null,
  children,
  className = '',
}) {
  const hasStart = Boolean(sideStart)
  const hasEnd = Boolean(sideEnd)
  return (
    <div
      className={`board-layout board-layout--${variant}${className ? ` ${className}` : ''}`}
      data-ds-surface="BoardLayout"
      data-vl-done-surface="BoardLayout"
      data-testid="board-layout"
      data-layout-variant={variant}
      data-has-side-start={hasStart ? 'true' : 'false'}
      data-has-side-end={hasEnd ? 'true' : 'false'}
    >
      {hasStart ? (
        <aside className="board-layout__side board-layout__side--start" data-slot="side-start">
          {sideStart}
        </aside>
      ) : null}
      <div className="board-layout__main" data-slot="main">
        {children}
      </div>
      {hasEnd ? (
        <aside className="board-layout__side board-layout__side--end" data-slot="side-end">
          {sideEnd}
        </aside>
      ) : null}
    </div>
  )
}
