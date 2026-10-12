import { StatusBadge } from '../../../components/StatusBadge.jsx'

/**
 * Semantic status within identity plane (DS §5 IssueStatusBadge).
 * Reuses Closed StatusBadge / wire enums — no invent OPEN/CLOSED demo enums.
 *
 * @param {{
 *   status: import('../../../domain/types.js').IssueStatus | string,
 *   className?: string,
 * }} props
 */
export function IssueStatusBadge({ status, className = '' }) {
  const classes = ['issue-status-badge', className].filter(Boolean).join(' ')
  return (
    <span className={classes} data-testid="issue-status-badge">
      <StatusBadge status={status} />
    </span>
  )
}
