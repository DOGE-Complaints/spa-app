import { ISSUE_STATUS } from '../domain/types.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './StatusBadge.css'

const STATUS_CLASS = Object.freeze({
  [ISSUE_STATUS.NEW]: 'status-badge-new',
  [ISSUE_STATUS.IN_REVIEW]: 'status-badge-in-review',
  [ISSUE_STATUS.PUBLISHED]: 'status-badge-published',
  UNKNOWN: 'status-badge-unknown',
})

function resolveStatus(status) {
  return Object.values(ISSUE_STATUS).includes(status) ? status : 'UNKNOWN'
}

/**
 * @param {{
 *   status: import('../domain/types.js').IssueStatus | string,
 *   className?: string
 * }} props
 */
export function StatusBadge({ status, className = '' }) {
  const { t } = useI18n()
  const normalizedStatus = resolveStatus(status)
  const label = t(`status.${normalizedStatus}`)
  const variantClass = STATUS_CLASS[normalizedStatus]
  const classes = ['status-badge', variantClass, className].filter(Boolean).join(' ')

  return (
    <span className={classes} data-status={normalizedStatus} aria-label={`Status: ${label}`}>
      <span className="status-badge-label">{label}</span>
    </span>
  )
}
