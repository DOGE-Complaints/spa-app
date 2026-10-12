/**
 * DS §9 MapAttribution — reserved uncovered attribution slot (no invent provider name).
 * Provider-specific copy stays with the map engine control when Present.
 *
 * @param {object} props
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.className]
 */
export function MapAttribution({ children = null, className = '' }) {
  return (
    <div
      className={`map-attribution${className ? ` ${className}` : ''}`}
      data-ds-surface="MapAttribution"
      data-vl-done-surface="MapAttribution"
      data-testid="map-attribution"
      aria-hidden={children ? undefined : true}
    >
      {children}
    </div>
  )
}
