import { Link } from 'react-router-dom'
import { formatLabelKey } from '../../i18n/labelDisplay.js'
import { StatusBadge } from '../StatusBadge.jsx'
import './IssueCard.css'

/**
 * Форматирует created_at в human-readable (краткий формат даты).
 * @param {string} [value]
 * @returns {string}
 */
function formatDate(value) {
  if (!value || typeof value !== 'string') return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return value
  }
}

/**
 * @param {import('../../domain/types.js').Issue} issue
 * @param {string} locale
 * @param {(field: string|{et?:string,ru?:string,en?:string}) => string} resolveLocalizedText
 * @param {string} footerText
 * @param {boolean} [selected]
 * @param {string} [to] — href для Link
 * @param {(k: string) => string} t
 * @param {string} [className]
 */
export function IssueCard({
  issue,
  locale,
  resolveLocalizedText,
  t,
  footerText,
  selected = false,
  to,
  className = '',
}) {
  const cardText = resolveLocalizedText(issue.summary ?? issue.title)
  const dateText = formatDate(issue.created_at)
  const typeDisplay = String(issue.type ?? '').toUpperCase()
  const labelChips = (issue.labels ?? []).map((l) => ({
    key: String(l),
    text: formatLabelKey(t, String(l)),
  }))

  const content = (
    <>
      <div className="issue-card-meta">
        <span className="issue-card-id">{issue.id}</span>
        <StatusBadge status={issue.status} />
        <span className="issue-card-overflow" aria-hidden="true">
          …
        </span>
      </div>
      <h3 className="issue-card-title">{cardText}</h3>
      <div className="issue-card-labels">
        <span className="issue-card-chip issue-card-chip-type">{typeDisplay}</span>
        {labelChips.map((chip) => (
          <span key={chip.key} className="issue-card-chip">
            {chip.text}
          </span>
        ))}
      </div>
      {dateText ? (
        <div className="issue-card-date">
          <span className="issue-card-date-bullet" aria-hidden="true">
            •
          </span>
          <span>{dateText}</span>
        </div>
      ) : null}
      {footerText ? (
        <footer className="issue-card-footer">{footerText}</footer>
      ) : null}
    </>
  )

  const classes = [
    'issue-card',
    selected ? 'issue-card-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const commonProps = {
    className: classes,
    'data-selected': selected || undefined,
    'aria-selected': selected || undefined,
    'aria-label': `Issue ${issue.id}: ${cardText}`,
  }

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    )
  }

  return (
    <article {...commonProps} tabIndex={0}>
      {content}
    </article>
  )
}
