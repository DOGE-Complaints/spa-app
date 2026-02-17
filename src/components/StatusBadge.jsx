import { ISSUE_STATUS } from '../domain/types.js'
import './StatusBadge.css'

const STATUS_LABELS = Object.freeze({
  et: {
    [ISSUE_STATUS.NEW]: 'UUS',
    [ISSUE_STATUS.VERIFIED]: 'KINNITATUD',
    [ISSUE_STATUS.IN_REVIEW]: 'LÄBIVAATUSEL',
    [ISSUE_STATUS.ARCHIVED]: 'ARHIIVIS',
    UNKNOWN: 'TEADMATA',
  },
  ru: {
    [ISSUE_STATUS.NEW]: 'НОВОЕ',
    [ISSUE_STATUS.VERIFIED]: 'ПОДТВЕРЖДЕНО',
    [ISSUE_STATUS.IN_REVIEW]: 'НА РАССМОТРЕНИИ',
    [ISSUE_STATUS.ARCHIVED]: 'В АРХИВЕ',
    UNKNOWN: 'НЕИЗВЕСТНО',
  },
  en: {
    [ISSUE_STATUS.NEW]: 'NEW',
    [ISSUE_STATUS.VERIFIED]: 'VERIFIED',
    [ISSUE_STATUS.IN_REVIEW]: 'IN REVIEW',
    [ISSUE_STATUS.ARCHIVED]: 'ARCHIVED',
    UNKNOWN: 'UNKNOWN',
  },
})

const STATUS_CLASS = Object.freeze({
  [ISSUE_STATUS.NEW]: 'status-badge-new',
  [ISSUE_STATUS.VERIFIED]: 'status-badge-verified',
  [ISSUE_STATUS.IN_REVIEW]: 'status-badge-in-review',
  [ISSUE_STATUS.ARCHIVED]: 'status-badge-archived',
  UNKNOWN: 'status-badge-unknown',
})

function resolveLocale(locale) {
  return STATUS_LABELS[locale] ? locale : 'en'
}

function resolveStatus(status) {
  return Object.values(ISSUE_STATUS).includes(status) ? status : 'UNKNOWN'
}

/**
 * @param {{
 *   status: import('../domain/types.js').IssueStatus | string,
 *   locale?: 'et'|'ru'|'en',
 *   className?: string
 * }} props
 */
export function StatusBadge({ status, locale = 'en', className = '' }) {
  const normalizedStatus = resolveStatus(status)
  const normalizedLocale = resolveLocale(locale)
  const label = STATUS_LABELS[normalizedLocale][normalizedStatus]
  const variantClass = STATUS_CLASS[normalizedStatus]
  const classes = ['status-badge', variantClass, className].filter(Boolean).join(' ')

  return (
    <span className={classes} data-status={normalizedStatus} aria-label={`Status: ${label}`}>
      {normalizedStatus === ISSUE_STATUS.VERIFIED && (
        <img src="/icons/verified.svg" alt="" className="status-badge-icon" aria-hidden />
      )}
      <span className="status-badge-label">{label}</span>
    </span>
  )
}
