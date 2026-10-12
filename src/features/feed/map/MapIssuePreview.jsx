import { Link } from 'react-router-dom'

/**
 * DS §9 MapIssuePreview — civic pin card: title, public context, close, Open issue.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.publicContext]
 * @param {string} props.openHref
 * @param {string} props.openLabel
 * @param {() => void} props.onClose
 * @param {string} [props.closeLabel]
 * @param {string} [props.className]
 */
export function MapIssuePreview({
  title,
  publicContext = '',
  openHref,
  openLabel,
  onClose,
  closeLabel = 'Close',
  className = '',
}) {
  return (
    <div
      className={`map-issue-preview${className ? ` ${className}` : ''}`}
      data-ds-surface="MapIssuePreview"
      data-vl-done-surface="MapIssuePreview"
      data-testid="map-issue-preview"
      role="dialog"
      aria-label={title}
    >
      <h3 className="map-issue-preview__title">{title}</h3>
      {publicContext ? (
        <p className="map-issue-preview__context">{publicContext}</p>
      ) : null}
      <Link className="map-issue-preview__open" to={openHref}>
        {openLabel}
      </Link>
      <button
        type="button"
        className="map-issue-preview__close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        ×
      </button>
    </div>
  )
}
