import { IssueTypeIcon } from './IssueTypeIcon.jsx'
import { IssueStatusBadge } from './IssueStatusBadge.jsx'
import { IssueMetadataRow } from './IssueMetadataRow.jsx'
import './IssueIdentityHeader.css'

/**
 * Civic identity plane (DS §5 IssueIdentityHeader).
 * Named surface — not anonymous UUID-only admin row (FR-VL-01.1 / AD-VL-01).
 *
 * @param {{
 *   issueId: string,
 *   status: import('../../../domain/types.js').IssueStatus | string,
 *   typeDisplay?: string,
 *   geoText?: string,
 *   dateText?: string,
 *   iconSrc?: string | null,
 *   publicLabel?: string | null,
 *   moreLabel: string,
 * }} props
 */
export function IssueIdentityHeader({
  issueId,
  status,
  typeDisplay = '',
  geoText = '',
  dateText = '',
  iconSrc = null,
  publicLabel = null,
  moreLabel,
}) {
  const closedPublic =
    typeof publicLabel === 'string' && publicLabel.trim() ? publicLabel.trim() : ''
  const idText = closedPublic || String(issueId ?? '')
  const labelKind = closedPublic ? 'public' : 'wire-id'

  return (
    <header
      className="issue-identity-header"
      data-testid="issue-identity-header"
      data-identity-plane="ds"
      data-label-kind={labelKind}
    >
      <IssueTypeIcon src={iconSrc} type={typeDisplay} />
      <div className="issue-identity-body">
        <div className="issue-identity-top">
          <span
            className="issue-identity-id feed-civic-post-id"
            data-testid="issue-identity-id"
            data-label-kind={labelKind}
            title={String(issueId ?? '')}
          >
            {idText}
          </span>
          <IssueStatusBadge status={status} />
        </div>
        <IssueMetadataRow
          geoText={geoText}
          dateText={dateText}
          typeDisplay={typeDisplay}
        />
      </div>
      <button
        type="button"
        className="issue-identity-more feed-civic-post-more"
        data-testid="feed-civic-post-more"
        aria-label={moreLabel}
      >
        <img
          className="issue-identity-more-icon feed-civic-post-icon"
          src="/icons/next-feed/actions/more.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </header>
  )
}
