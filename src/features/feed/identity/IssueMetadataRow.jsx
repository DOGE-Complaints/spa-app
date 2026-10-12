import './IssueMetadataRow.css'

/**
 * Available location/date/type metadata (DS §5 IssueMetadataRow).
 * Absent values collapse — no fictive row.
 *
 * @param {{
 *   geoText?: string,
 *   dateText?: string,
 *   typeDisplay?: string,
 * }} props
 */
export function IssueMetadataRow({ geoText = '', dateText = '', typeDisplay = '' }) {
  const geo = typeof geoText === 'string' ? geoText.trim() : ''
  const date = typeof dateText === 'string' ? dateText.trim() : ''
  const type = typeof typeDisplay === 'string' ? typeDisplay.trim() : ''
  const empty = !geo && !date && !type

  return (
    <div
      className="issue-metadata-row"
      data-testid="issue-metadata-row"
      data-empty={empty ? 'true' : 'false'}
    >
      {type ? (
        <span className="issue-metadata-item issue-metadata-type" data-testid="issue-metadata-type">
          {type}
        </span>
      ) : null}
      {geo ? (
        <span className="issue-metadata-item" data-testid="feed-civic-post-geo">
          <img
            className="issue-metadata-icon"
            src="/icons/next-shell/actions/location.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{geo}</span>
        </span>
      ) : null}
      {date ? (
        <span className="issue-metadata-item feed-civic-post-date" data-testid="issue-metadata-date">
          {date}
        </span>
      ) : null}
    </div>
  )
}
