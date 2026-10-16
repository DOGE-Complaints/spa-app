import { mapSummaryMarksToEntries } from '../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from './icons/crReactionIcons.js'
import { CrReactionIcon } from './icons/CrReactionIcon.jsx'
import './ReactionSummaryStrip.css'

/**
 * Greenfield ReactionSummaryStrip (M154 / CR-12 React-always).
 * React affordance always Present when ready (supersedes CR-05 hide-React for strip).
 * Aggregate: `inline` (legacy in-strip) or `external` (CR-12 row via ReactionAggregateRow below strip).
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
  panelId = undefined,
  onOpen = null,
  onRetry = null,
  onAggregateActivate = null,
  /** @type {'inline'|'external'} */
  aggregatePlacement = 'inline',
  reactAlways = true,
}) {
  function openPicker() {
    if (typeof onOpen === 'function') onOpen()
  }

  function handleAggregateActivate() {
    openPicker()
    if (typeof onAggregateActivate === 'function') onAggregateActivate()
  }

  // External: loading/error live on under-strip aggregate row; strip keeps React.
  if (aggregatePlacement === 'inline' && stripStatus === 'loading') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--loading"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="loading"
        data-rm-react-always={reactAlways ? 'true' : 'false'}
        data-density={density}
        role="status"
        aria-live="polite"
      >
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (aggregatePlacement === 'inline' && stripStatus === 'error') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--unavailable"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="unavailable"
        data-rm-react-always={reactAlways ? 'true' : 'false'}
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
    aggregatePlacement === 'inline' && !isEmpty && stripStatus === 'ready'
  const showReact =
    stripStatus === 'ready'
      ? reactAlways || isEmpty
      : aggregatePlacement === 'external'

  const statusAttr =
    stripStatus === 'loading'
      ? 'loading'
      : stripStatus === 'error'
        ? 'unavailable'
        : isEmpty
          ? 'empty'
          : 'populated'

  return (
    <div
      className="rm-summary-strip"
      data-testid="reaction-summary-strip"
      data-rm-strip-status={statusAttr}
      data-rm-react-always={reactAlways ? 'true' : 'false'}
      data-rm-aggregate-placement={aggregatePlacement}
      data-density={density}
      data-selected-count={String(Array.isArray(selected) ? selected.length : 0)}
    >
      {showInlineAggregate ? (
        <button
          type="button"
          className={[
            'rm-summary-strip__aggregate',
            open ? 'rm-summary-strip__aggregate--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          data-testid="reaction-summary-aggregate"
          data-rm-aggregate-active={open ? 'true' : 'false'}
          aria-expanded={Boolean(open)}
          aria-controls={panelId}
          aria-label={t('threadsFeed.reactions.viewReactions')}
          onMouseEnter={openPicker}
          onFocus={openPicker}
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

      {aggregatePlacement === 'inline' && isEmpty && stripStatus === 'ready' ? (
        <span
          className="rm-summary-strip__empty"
          data-testid="reaction-summary-empty"
          aria-hidden="true"
        />
      ) : null}

      {showReact ? (
        <button
          type="button"
          className="rm-summary-strip__react"
          data-testid="reaction-summary-react"
          aria-expanded={Boolean(open)}
          aria-controls={panelId}
          disabled={busy || stripStatus === 'loading'}
          onClick={openPicker}
        >
          <CrReactionIcon src={icons.react} size={18} />
          <span>{t('threadsFeed.reactions.react')}</span>
        </button>
      ) : null}
    </div>
  )
}
