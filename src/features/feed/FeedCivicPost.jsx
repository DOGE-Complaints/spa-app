import { Link } from 'react-router-dom'
import { resolveLocalizedTextWithMeta } from '../../i18n/core.js'
import { formatLabelKeyWithMeta } from '../../i18n/labelDisplay.js'
import {
  shouldShowContentFallbackMarker,
  shouldShowMtMarker,
} from '../../i18n/translationMarkers.js'
import { TranslationMarker } from '../../components/TranslationMarker/TranslationMarker.jsx'
import { StatusBadge } from '../../components/StatusBadge.jsx'
import { topicIconForLabel } from '../../i18n/issueTopicIcons.js'
import './FeedCivicPost.css'

/**
 * Format created_at for civic meta (short date).
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
 * Honest public geo label — omit when absent (no invent).
 * @param {import('../../domain/types.js').IssueGeo|undefined} geo
 * @returns {string}
 */
function formatGeoLabel(geo) {
  if (!geo || typeof geo !== 'object') return ''
  if (typeof geo.label === 'string' && geo.label.trim()) return geo.label.trim()
  const parts = [geo.settlement, geo.district, geo.region, geo.country]
    .filter((p) => typeof p === 'string' && p.trim())
    .map((p) => p.trim())
  return parts.join(', ')
}

/**
 * Next-feed civic issue-as-post (M150 ISSUE-CARD-NO-MEDIA / SSR-C-civic).
 * No SchemaCardOverlay · no media production slot · action strip affordances only.
 *
 * @param {object} props
 * @param {import('../../domain/types.js').Issue} props.issue
 * @param {string} props.locale
 * @param {(field: string|{et?:string,ru?:string,en?:string}) => string} props.resolveLocalizedText
 * @param {(k: string) => string} props.t
 * @param {string} [props.to] — open-issue href
 */
export function FeedCivicPost({ issue, locale, resolveLocalizedText, t, to }) {
  const contentField = issue.summary ?? issue.title
  const contentMeta = resolveLocalizedTextWithMeta(contentField, locale)
  const cardText = resolveLocalizedText(contentField)
  const titleText = resolveLocalizedText(issue.title)
  const showSummary =
    issue.summary != null &&
    String(cardText).trim() !== '' &&
    String(cardText).trim() !== String(titleText).trim()
  const showMtMarker = shouldShowMtMarker(issue, locale)
  const showFallbackMarker = shouldShowContentFallbackMarker(contentMeta)
  const dateText = formatDate(issue.created_at)
  const geoText = formatGeoLabel(issue.geo)
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

  return (
    <article
      className="feed-civic-post"
      data-testid="feed-civic-post"
      data-civic-variant="no-media"
      aria-label={`Issue ${issue.id}: ${titleText || cardText}`}
    >
      <header className="feed-civic-post-meta">
        <span className="feed-civic-post-id">{issue.id}</span>
        <StatusBadge status={issue.status} />
        {typeDisplay ? (
          <span className="feed-civic-post-chip feed-civic-post-chip-type">{typeDisplay}</span>
        ) : null}
        {geoText ? (
          <span className="feed-civic-post-geo" data-testid="feed-civic-post-geo">
            <img
              className="feed-civic-post-icon"
              src="/icons/next-shell/actions/location.svg"
              alt=""
              aria-hidden="true"
            />
            <span>{geoText}</span>
          </span>
        ) : null}
        {dateText ? <span className="feed-civic-post-date">{dateText}</span> : null}
        <button
          type="button"
          className="feed-civic-post-more"
          data-testid="feed-civic-post-more"
          aria-label={t('nextFeed.post.more')}
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/more.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </header>

      <h3 className="feed-civic-post-title">
        {titleText || cardText}
        {showMtMarker ? <TranslationMarker kind="mt" locale={locale} t={t} /> : null}
        {!showMtMarker && showFallbackMarker ? (
          <TranslationMarker
            kind="fallback"
            locale={locale}
            resolvedLocale={contentMeta.resolvedLocale}
            t={t}
          />
        ) : null}
      </h3>

      {showSummary ? <p className="feed-civic-post-summary">{cardText}</p> : null}

      {labelChips.length > 0 ? (
        <div className="feed-civic-post-labels">
          {labelChips.map((chip) => {
            const topicSrc = topicIconForLabel(chip.key)
            return (
              <span key={chip.key} className="feed-civic-post-chip">
                {topicSrc ? (
                  <img
                    src={topicSrc}
                    alt=""
                    className="feed-civic-post-chip-topic"
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
      ) : null}

      {/* M150 SSR-C-civic: no SchemaCardOverlay / Additional details chrome */}
      {/* M150 ISSUE-CARD-NO-MEDIA: no media frame / blank slot */}

      {to ? (
        <Link
          to={to}
          className="feed-civic-post-open"
          data-testid="feed-civic-post-open"
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/open-issue.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('nextFeed.post.openIssue')}</span>
        </Link>
      ) : null}

      <div
        className="feed-civic-post-actions"
        data-testid="feed-civic-post-actions"
        role="group"
        aria-label={t('nextFeed.post.more')}
      >
        <button
          type="button"
          className="feed-civic-post-action"
          data-testid="feed-civic-action-react"
          aria-label={t('threadsFeed.post.action.react')}
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/react.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('threadsFeed.post.action.react')}</span>
        </button>
        <button
          type="button"
          className="feed-civic-post-action"
          data-testid="feed-civic-action-comment"
          aria-label={t('threadsFeed.post.action.discussion')}
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/comment.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('threadsFeed.post.action.discussion')}</span>
        </button>
        <button
          type="button"
          className="feed-civic-post-action"
          data-testid="feed-civic-action-share"
          aria-label={t('nextFeed.post.share')}
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/share.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('nextFeed.post.share')}</span>
        </button>
      </div>
    </article>
  )
}
