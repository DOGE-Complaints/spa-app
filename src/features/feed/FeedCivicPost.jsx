import { Link } from 'react-router-dom'
import { resolveLocalizedTextWithMeta } from '../../i18n/core.js'
import { formatLabelKeyWithMeta } from '../../i18n/labelDisplay.js'
import {
  shouldShowContentFallbackMarker,
  shouldShowMtMarker,
} from '../../i18n/translationMarkers.js'
import { TranslationMarker } from '../../components/TranslationMarker/TranslationMarker.jsx'
import { topicIconForLabel } from '../../i18n/issueTopicIcons.js'
import { formatIssueDate, formatGeoLabel } from './semantics/index.js'
import { IssueIdentityHeader } from './identity/index.js'
import './FeedCivicPost.css'

/** Reactions zone affordance marks — catalog glyphs only; no invent orb (AD-VP-01 / icon catalog gap). */
const REACTIONS_ZONE_MARKS = Object.freeze([
  { id: 'acknowledge', src: '/icons/next-feed/reactions/acknowledge.svg' },
  { id: 'support', src: '/icons/next-feed/reactions/support.svg' },
  { id: 'agree', src: '/icons/next-feed/reactions/agree.svg' },
])

/**
 * Next-feed civic issue-as-post (M150 ISSUE-CARD-NO-MEDIA / SSR-C-civic).
 * Four-zone strip per AD-VP-01 · no SchemaCardOverlay · no media production slot.
 * Civic paw identity icon: honest omit (catalog gap) — no invent SVG.
 *
 * @param {object} props
 * @param {import('../../domain/types.js').Issue} props.issue
 * @param {string} props.locale
 * @param {(field: string|{et?:string,ru?:string,en?:string}) => string} props.resolveLocalizedText
 * @param {(k: string) => string} props.t
 * @param {string} [props.to] — open-issue href
 */
export function FeedCivicPost({
  issue,
  locale,
  resolveLocalizedText,
  t,
  to,
  onOpenReactions = null,
}) {
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
  const dateText = formatIssueDate(issue.created_at)
  const geoText = formatGeoLabel(issue.geo)
  const typeDisplay = String(issue.type ?? '').toUpperCase()
  // No Closed public_label field on Issue — honest wire id (FR-VL-01.3); no fake ISSUE UV-*.
  const publicLabel = null
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
      data-civic-identity-icon="omit-catalog-gap"
      data-identity-surface="IssueIdentityHeader"
      data-status-wire={String(issue.status ?? '')}
      aria-label={`Issue ${issue.id}: ${titleText || cardText}`}
    >
      <IssueIdentityHeader
        issueId={issue.id}
        status={issue.status}
        typeDisplay={typeDisplay}
        geoText={geoText}
        dateText={dateText}
        iconSrc={null}
        publicLabel={publicLabel}
        moreLabel={t('nextFeed.post.more')}
      />

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
        data-action-zones="4"
        role="group"
        aria-label={t('nextFeed.post.actions')}
      >
        <button
          type="button"
          className="feed-civic-post-action"
          data-testid="feed-civic-action-react"
          data-zone="react"
          aria-label={t('threadsFeed.post.action.react')}
          onClick={() => {
            if (typeof onOpenReactions === 'function') onOpenReactions()
          }}
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
          data-zone="comment"
          aria-label={t('nextFeed.post.comment')}
        >
          <img
            className="feed-civic-post-icon"
            src="/icons/next-feed/actions/comment.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{t('nextFeed.post.comment')}</span>
        </button>
        <button
          type="button"
          className="feed-civic-post-action"
          data-testid="feed-civic-action-share"
          data-zone="share"
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
        <button
          type="button"
          className="feed-civic-post-action feed-civic-post-action-reactions"
          data-testid="feed-civic-action-reactions"
          data-zone="reactions"
          aria-label={t('threadsFeed.post.reactionSummarySlot')}
          onClick={() => {
            if (typeof onOpenReactions === 'function') onOpenReactions()
          }}
        >
          <span className="feed-civic-post-reaction-marks" aria-hidden="true">
            {REACTIONS_ZONE_MARKS.map((mark) => (
              <img
                key={mark.id}
                className="feed-civic-post-reaction-mark"
                src={mark.src}
                alt=""
              />
            ))}
          </span>
          <span>{t('threadsFeed.post.reactionSummarySlot')}</span>
        </button>
      </div>
    </article>
  )
}
