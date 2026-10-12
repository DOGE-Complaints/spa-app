/**
 * DS §4 BoardHeading — product title + explaining line (not raw routing dump).
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {string} [props.className]
 */
export function BoardHeading({ title, subtitle = null, className = '' }) {
  return (
    <div
      className={`board-heading${className ? ` ${className}` : ''}`}
      data-ds-surface="BoardHeading"
      data-vl-done-surface="BoardHeading"
      data-testid="board-heading"
    >
      <h2 className="board-heading__title">{title}</h2>
      {subtitle ? <p className="board-heading__subtitle">{subtitle}</p> : null}
    </div>
  )
}
