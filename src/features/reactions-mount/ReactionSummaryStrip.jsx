import { mapSummaryMarksToEntries } from '../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from './icons/crReactionIcons.js'
import { CrReactionIcon } from './icons/CrReactionIcon.jsx'
import './icons/ReactionMarkAccents.css'
import './ReactionSummaryStrip.css'

const OWN_IN_ZONE_MAX = 3

/**
 * Greenfield ReactionSummaryStrip (M154 / CR-12 React-always · CR-24 M163/M164).
 * React affordance always Present when ready (supersedes CR-05 hide-React for strip).
 * Aggregate: `inline` (legacy in-strip) or `external` (CR-12 row via ReactionAggregateRow below strip).
 * CR-17: aggregate → people path (onAggregateActivate) · NOT ReactionPicker.
 * CR-24: `ownInZone` — own selected icons inside React · suppress inline aggregate · stable box.
 */
export function ReactionSummaryStrip({
  stripStatus = 'ready',
  summaryMarks = null,
  aggregateCount = null,
  selected = [],
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  density = 'compact',
  busy = false,
  open = false,
  peopleOpen = false,
  panelId = undefined,
  peoplePanelId = undefined,
  onOpen = null,
  onRetry = null,
  onAggregateActivate = null,
  /** @type {'inline'|'external'} */
  aggregatePlacement = 'inline',
  reactAlways = true,
  /** CR-24 M164 — own marks inside React; hide strip aggregate (people zone external) */
  ownInZone = false,
}) {
  function openPicker() {
    if (typeof onOpen === 'function') onOpen()
  }

  /** @param {import('react').SyntheticEvent} [event] */
  function handleAggregateActivate(event) {
    if (typeof onAggregateActivate !== 'function') return
    const anchorEl = event?.currentTarget ?? null
    onAggregateActivate(anchorEl ? { anchorEl } : undefined)
  }

  const aggregateExpanded = Boolean(peopleOpen)
  const selectedIds = Array.isArray(selected)
    ? selected.map(String).filter(Boolean).slice(0, OWN_IN_ZONE_MAX)
    : []
  const ownCount = selectedIds.length
  const isZeroOwn = ownCount === 0

  // External: loading/error live on under-strip aggregate row; strip keeps React.
  if (aggregatePlacement === 'inline' && !ownInZone && stripStatus === 'loading') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--loading"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="loading"
        data-rm-react-always={reactAlways ? 'true' : 'false'}
        data-rm-own-in-zone={ownInZone ? 'true' : 'false'}
        data-density={density}
        role="status"
        aria-live="polite"
      >
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (aggregatePlacement === 'inline' && !ownInZone && stripStatus === 'error') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--unavailable"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="unavailable"
        data-rm-react-always={reactAlways ? 'true' : 'false'}
        data-rm-own-in-zone={ownInZone ? 'true' : 'false'}
        data-density={density}
        role="alert"
      >
        <CrReactionIcon
          className="rm-summary-strip__status-icon"
          src={icons.unavailable}
          size={18}
        />
        <p className="rm-summary-strip__unavailable-text">
          {t('threadsFeed.reactions.unavailable')}
        </p>
        {typeof onRetry === 'function' ? (
          <button
            type="button"
            className="rm-summary-strip__retry"
            data-testid="reaction-summary-retry"
            onClick={onRetry}
          >
            <CrReactionIcon src={icons.retry} size={16} />
            <span>{t('threadsFeed.post.tryAgain')}</span>
          </button>
        ) : null}
      </div>
    )
  }

  const marks = mapSummaryMarksToEntries(summaryMarks) || []
  const count =
    aggregateCount === null || aggregateCount === undefined
      ? marks.reduce((n, m) => n + (Number(m.count) || 0), 0)
      : Number(aggregateCount)
  const isEmpty = marks.length === 0 && (!count || count === 0)
  const showCount = !isEmpty && Number.isFinite(count) && count > 0
  const showInlineAggregate =
    !ownInZone &&
    aggregatePlacement === 'inline' &&
    !isEmpty &&
    stripStatus === 'ready'
  const showReact =
    stripStatus === 'ready'
      ? reactAlways || isEmpty || ownInZone
      : aggregatePlacement === 'external' || ownInZone

  const statusAttr =
    stripStatus === 'loading'
      ? 'loading'
      : stripStatus === 'error'
        ? 'unavailable'
        : isEmpty && isZeroOwn
          ? 'empty'
          : 'populated'

  const reactClass = [
    'rm-summary-strip__react',
    ownInZone ? 'rm-summary-strip__react--own-in-zone' : '',
    ownInZone && isZeroOwn ? 'rm-summary-strip__react--zero' : '',
    ownInZone && !isZeroOwn ? 'rm-summary-strip__react--has-own' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className="rm-summary-strip"
      data-testid="reaction-summary-strip"
      data-rm-strip-status={statusAttr}
      data-rm-react-always={reactAlways ? 'true' : 'false'}
      data-rm-aggregate-placement={ownInZone ? 'external' : aggregatePlacement}
      data-rm-own-in-zone={ownInZone ? 'true' : 'false'}
      data-density={density}
      data-selected-count={String(ownCount)}
      data-rm-cr24={ownInZone ? 'true' : undefined}
    >
      {showInlineAggregate ? (
        <button
          type="button"
          className={[
            'rm-summary-strip__aggregate',
            aggregateExpanded ? 'rm-summary-strip__aggregate--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          data-testid="reaction-summary-aggregate"
          data-rm-aggregate-active={aggregateExpanded ? 'true' : 'false'}
          aria-expanded={aggregateExpanded}
          aria-controls={peoplePanelId || panelId}
          aria-label={t('threadsFeed.reactions.viewReactions')}
          onMouseEnter={handleAggregateActivate}
          onFocus={handleAggregateActivate}
          onClick={handleAggregateActivate}
        >
          <span className="rm-summary-strip__marks" aria-hidden="true">
            {marks.slice(0, 3).map((entry) => (
              <span
                key={entry.id}
                className="rm-summary-strip__mark"
                data-reaction-id={entry.id}
                data-testid={`reaction-summary-mark-${entry.id}`}
              >
                <CrReactionIcon src={icons[entry.id]} size={16} />
              </span>
            ))}
          </span>
          {showCount ? (
            <span className="rm-summary-strip__count" data-testid="reaction-summary-count">
              {count}
            </span>
          ) : null}
        </button>
      ) : null}

      {!ownInZone && aggregatePlacement === 'inline' && isEmpty && stripStatus === 'ready' ? (
        <span
          className="rm-summary-strip__empty"
          data-testid="reaction-summary-empty"
          aria-hidden="true"
        />
      ) : null}

      {showReact ? (
        <button
          type="button"
          className={reactClass}
          data-testid="reaction-summary-react"
          data-rm-react-underlay={ownInZone ? 'wide' : undefined}
          data-rm-own-count={String(ownCount)}
          aria-expanded={Boolean(open)}
          aria-controls={panelId}
          disabled={busy || stripStatus === 'loading'}
          onClick={openPicker}
        >
          <span className="rm-summary-strip__react-entry" data-testid="reaction-summary-react-entry">
            <CrReactionIcon src={icons.react} size={18} />
            <span>{t('threadsFeed.reactions.react')}</span>
          </span>
          {ownInZone ? (
            <span
              className="rm-summary-strip__react-own"
              data-testid="reaction-summary-react-own"
              data-rm-own-slots={String(OWN_IN_ZONE_MAX)}
              aria-hidden={isZeroOwn ? 'true' : undefined}
            >
              {selectedIds.map((id) => (
                <span
                  key={id}
                  className="rm-summary-strip__react-own-mark"
                  data-reaction-id={id}
                  data-testid={`reaction-summary-own-${id}`}
                >
                  <CrReactionIcon src={icons[id]} size={16} />
                </span>
              ))}
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  )
}
