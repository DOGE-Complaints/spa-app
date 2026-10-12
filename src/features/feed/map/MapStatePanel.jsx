/**
 * DS §9 MapStatePanel — local map loading/error + Return to List (list intact).
 *
 * @param {object} props
 * @param {'error'|'loading'} [props.variant]
 * @param {string} [props.title]
 * @param {import('react').ReactNode} [props.body]
 * @param {import('react').ReactNode} [props.actions]
 * @param {string} [props.className]
 */
export function MapStatePanel({
  variant = 'error',
  title = null,
  body = null,
  actions = null,
  className = '',
}) {
  return (
    <div
      className={`map-state-panel map-state-panel--${variant}${className ? ` ${className}` : ''}`}
      data-ds-surface="MapStatePanel"
      data-vl-done-surface="MapStatePanel"
      data-testid={variant === 'error' ? 'feed-map-error' : 'feed-map-loading'}
      data-map-state={variant}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {title ? <h3 className="map-state-panel__title">{title}</h3> : null}
      {body ? <div className="map-state-panel__body">{body}</div> : null}
      {actions ? <div className="map-state-panel__actions">{actions}</div> : null}
    </div>
  )
}
