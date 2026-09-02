import { Link } from 'react-router-dom'
import { resolveLocalizedTextWithMeta } from '../../i18n/core.js'
import { formatLabelKeyWithMeta } from '../../i18n/labelDisplay.js'
import {
  shouldShowContentFallbackMarker,
  shouldShowMtMarker,
} from '../../i18n/translationMarkers.js'
import { TranslationMarker } from '../TranslationMarker/TranslationMarker.jsx'
import { StatusBadge } from '../StatusBadge.jsx'
import { SchemaCardOverlay } from '../SchemaCardOverlay/SchemaCardOverlay.jsx'
import { topicIconForLabel } from '../../i18n/issueTopicIcons.js'
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
  showOpenAffordance = false,
  className = '',
}) {
  const contentField = issue.summary ?? issue.title
  const contentMeta = resolveLocalizedTextWithMeta(contentField, locale)
  const cardText = resolveLocalizedText(contentField)
  const showMtMarker = shouldShowMtMarker(issue, locale)
  const showFallbackMarker = shouldShowContentFallbackMarker(contentMeta)
  const dateText = formatDate(issue.created_at)
  const typeDisplay = String(issue.type ?? '').toUpperCase()
  const labelChips = (issue.labels ?? []).map((l) => {
    const key = String(l)
    const formatted = formatLabelKeyWithMeta(t, key, locale)
    return {
      key,
      text: formatted.text,
      usedHumanize: formatted.usedHumanize,
    }
  })

  const content = (
    <>
      <div className="issue-card-meta">
        <span className="issue-card-id">{issue.id}</span>
        <StatusBadge status={issue.status} />
        {!showOpenAffordance ? (
          <span className="issue-card-overflow" aria-hidden="true">
            …
          </span>
        ) : null}
      </div>
      <h3 className="issue-card-title">
        {cardText}
        {showMtMarker ? (
          <TranslationMarker kind="mt" locale={locale} t={t} />
        ) : null}
        {!showMtMarker && showFallbackMarker ? (
          <TranslationMarker
            kind="fallback"
            locale={locale}
            resolvedLocale={contentMeta.resolvedLocale}
            t={t}
          />
        ) : null}
      </h3>
      <div className="issue-card-labels">
        <span className="issue-card-chip issue-card-chip-type">{typeDisplay}</span>
        {labelChips.map((chip) => {
          const topicSrc = topicIconForLabel(chip.key)
          return (
            <span key={chip.key} className="issue-card-chip">
              {topicSrc ? (
                <img
                  src={topicSrc}
                  alt=""
                  className="issue-card-chip-topic"
                  width={12}
                  height={12}
                />
              ) : null}
              {chip.text}
              {chip.usedHumanize ? (
                <TranslationMarker kind="untranslated-label" locale={locale} t={t} />
              ) : null}
            </span>
          )
        })}
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
      <SchemaCardOverlay schemaCard={issue.schema_card} t={t} density="compact" />
      {showOpenAffordance ? (
        <div className="issue-card-open-affordance" aria-hidden="true">
          <span className="issue-card-open-label">
            {t('publicHome.board.openIssue')}
          </span>
          <img
            className="issue-card-chevron"
            src="/icons/public-home/ic-chevron-right.png"
            alt=""
          />
        </div>
      ) : null}
    </>
  )

  const classes = [
    'issue-card',
    selected ? 'issue-card-selected' : '',
    showOpenAffordance ? 'issue-card-openable' : '',
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
