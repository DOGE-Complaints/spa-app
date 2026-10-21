import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { resolveLocalizedTextWithMeta } from '../../i18n/core.js'
import { formatLabelKeyWithMeta } from '../../i18n/labelDisplay.js'
import {
  shouldShowContentFallbackMarker,
  shouldShowMtMarker,
} from '../../i18n/translationMarkers.js'
import { TranslationMarker } from '../../components/TranslationMarker/TranslationMarker.jsx'
import { topicIconForLabel } from '../../i18n/issueTopicIcons.js'
import { issueTypeIconForType } from '../../i18n/issueTypeIcons.js'
import { formatIssueDate, formatGeoLabel } from './semantics/index.js'
import { IssueIdentityHeader } from './identity/index.js'
import { FeedReactionsMount } from './FeedReactionsMount.jsx'
import { CIVIC_MEDIA_STUB_PATH } from './civicMediaStub.js'
import './FeedCivicPost.css'

/** Reactions zone affordance marks — catalog glyphs only; no invent orb (AD-VP-01 / icon catalog gap). */
const REACTIONS_ZONE_MARKS = Object.freeze([
  { id: 'acknowledge', src: '/icons/next-feed/reactions/acknowledge.svg' },
  { id: 'support', src: '/icons/next-feed/reactions/support.svg' },
  { id: 'agree', src: '/icons/next-feed/reactions/agree.svg' },
])

/**
 * Next-feed civic issue-as-post (SSR-C-civic · AD-VP-01).
 * CT-29: interim media stub `/assets/dogefeed.png` (supersedes M150 ISSUE-CARD-NO-MEDIA Done).
 * Four-zone strip · no SchemaCardOverlay · no invent image-gen HTTP.
 * CR-23: React zone = ReactionsMount Live (ThreadsSocialClient) · Reactions zone → aggregate.
 * NF-13 / M161: identity icon from exact `issue.type` catalog map · unknown → omit.
 * NF-14: list hit = one Link around identity+content+media · open row retired · strip excluded.
 * NF-15 / M162: strip density + React unframe (host CSS) · CR-23 Live host held.
 *
 * @param {object} props
 * @param {import('../../domain/types.js').Issue} props.issue
 * @param {string} props.locale
 * @param {(field: string|{et?:string,ru?:string,en?:string}) => string} props.resolveLocalizedText
 * @param {(k: string) => string} props.t
 * @param {string} [props.to] — list navigate href (`/next/feed/issue/:id?from=…`)
 * @param {Function} [props.onOpenReactions] — legacy bridge (unused when Live mount Present)
 */
export function FeedCivicPost({
  issue,
  locale,
  resolveLocalizedText,
  t,
  to,
  onOpenReactions = null,
}) {
  const reactionsApiRef = useRef(null)
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
  const typeIconSrc = issueTypeIconForType(issue.type)
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
  const hitName =
    String(titleText || cardText || '').trim() || t('nextFeed.post.openIssue')
  const listNavigate = Boolean(to)

  const identity = (
    <IssueIdentityHeader
      issueId={issue.id}
      status={issue.status}
      typeDisplay={typeDisplay}
      geoText={geoText}
      dateText={dateText}
      iconSrc={typeIconSrc}
      publicLabel={publicLabel}
      moreLabel={t('nextFeed.post.more')}
      showMore={!listNavigate}
    />
  )

  const titleBlock = (
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
  )

  const summaryBlock = showSummary ? (
    <p className="feed-civic-post-summary">{cardText}</p>
  ) : null

  const labelsBlock =
    labelChips.length > 0 ? (
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
    ) : null

  /* M150 SSR-C-civic: no SchemaCardOverlay / Additional details chrome */
  /* CT-29: interim dogefeed stub until image-gen — same path list + detail */
  const mediaBlock = (
    <div
      className="feed-civic-post-media"
      data-testid="feed-civic-post-media"
      data-civic-media="stub"
      data-media-src={CIVIC_MEDIA_STUB_PATH}
    >
      <img
        className="feed-civic-post-media-img"
        src={CIVIC_MEDIA_STUB_PATH}
        alt={titleText || cardText || t('nextFeed.post.noMedia')}
        data-testid="feed-civic-post-media-img"
        data-civic-media-stub="true"
        width={1600}
        height={900}
      />
    </div>
  )

  const moreOutsideHit = listNavigate ? (
    <button
      type="button"
      className="issue-identity-more feed-civic-post-more feed-civic-post-hit-more"
      data-testid="feed-civic-post-more"
      aria-label={t('nextFeed.post.more')}
    >
      <img
        className="issue-identity-more-icon feed-civic-post-icon"
        src="/icons/next-feed/actions/more.svg"
        alt=""
        aria-hidden="true"
      />
    </button>
  ) : null

  return (
    <article
      className="feed-civic-post"
      data-testid="feed-civic-post"
      data-civic-variant="media-stub"
      data-civic-media-stub={CIVIC_MEDIA_STUB_PATH}
      data-civic-identity-icon={typeIconSrc ? 'present' : 'omit-catalog-gap'}
      data-civic-hit={listNavigate ? 'list' : 'none'}
      data-identity-surface="IssueIdentityHeader"
      data-status-wire={String(issue.status ?? '')}
      aria-label={`Issue ${issue.id}: ${titleText || cardText}`}
    >
      {listNavigate ? (
        <>
          <Link
            to={to}
            className="feed-civic-post-hit"
            data-testid="feed-civic-post-hit"
            aria-label={hitName}
          >
            {identity}
            {titleBlock}
            {summaryBlock}
            {labelsBlock}
            {mediaBlock}
          </Link>
          {moreOutsideHit}
        </>
      ) : (
        <>
          {identity}
          {titleBlock}
          {summaryBlock}
          {labelsBlock}
          {mediaBlock}
        </>
      )}

      <div
        className="feed-civic-post-actions"
        data-testid="feed-civic-post-actions"
        data-action-zones="4"
        data-feed-cr23-strip="true"
        data-nf15-density="m162"
        role="group"
        aria-label={t('nextFeed.post.actions')}
      >
        <div
          className="feed-civic-post-action feed-civic-post-actions__react-slot"
          data-testid="feed-civic-action-react"
          data-zone="react"
          data-lab-react-slot="true"
        >
          <FeedReactionsMount
            issueId={issue?.id}
            target="thread-root"
            t={t}
            apiRef={reactionsApiRef}
            aggregatePlacement="inline"
          />
        </div>
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
            if (typeof reactionsApiRef.current?.activateAggregate === 'function') {
              reactionsApiRef.current.activateAggregate()
              return
            }
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
