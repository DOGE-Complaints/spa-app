/**
 * DS §9 IssueMapPin — catalog pin chrome (rest | selected | focus).
 * MapLibre markers remain in BoardIssuesMap; this atom is the named DS surface for assets/state.
 *
 * @param {object} props
 * @param {'rest'|'selected'|'focus'} [props.state]
 * @param {string} [props.src]
 * @param {string} [props.className]
 */
export function IssueMapPin({
  state = 'rest',
  src = '/icons/next-feed/map/map-pin.svg',
  className = '',
}) {
  return (
    <span
      className={`issue-map-pin issue-map-pin--${state}${className ? ` ${className}` : ''}`}
      data-ds-surface="IssueMapPin"
      data-vl-done-surface="IssueMapPin"
      data-testid="issue-map-pin"
      data-pin-state={state}
      aria-hidden="true"
    >
      <img src={src} alt="" />
    </span>
  )
}
