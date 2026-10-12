/**
 * DS §2 IssuePresentationLayout — one Issue content contract for page | modal | fullScreenSheet.
 * Owns header / body / optional composer slot; parent owns overlay host geometry.
 *
 * @param {object} props
 * @param {'page'|'modal'|'fullScreenSheet'} [props.variant]
 * @param {import('react').ReactNode} [props.header]
 * @param {import('react').ReactNode} [props.body]
 * @param {import('react').ReactNode} [props.composer]
 * @param {string} [props.className]
 * @param {string} [props.titleId]
 */
export function IssuePresentationLayout({
  variant = 'page',
  header = null,
  body = null,
  composer = null,
  className = '',
  titleId,
  children,
  ...rest
}) {
  return (
    <div
      className={`issue-presentation-layout issue-presentation-layout--${variant}${
        className ? ` ${className}` : ''
      }`}
      data-ds-surface="IssuePresentationLayout"
      data-vl-done-surface="IssuePresentationLayout"
      data-testid="issue-presentation-layout"
      data-layout-variant={variant}
      aria-labelledby={titleId}
      {...rest}
    >
      {header ? (
        <div className="issue-presentation-layout__header" data-slot="header">
          {header}
        </div>
      ) : null}
      {body ? (
        <div className="issue-presentation-layout__body" data-slot="body">
          {body}
        </div>
      ) : null}
      {composer ? (
        <div className="issue-presentation-layout__composer" data-slot="composer">
          {composer}
        </div>
      ) : null}
      {children}
    </div>
  )
}

/** Map product mount presentation → DS IssuePresentationLayout variant. */
export function toIssuePresentationVariant(presentation) {
  if (presentation === 'route') return 'page'
  if (presentation === 'sheet') return 'fullScreenSheet'
  return 'modal'
}
