import { mapSummaryMarksToEntries } from '../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from './icons/crReactionIcons.js'
import './ReactionSummaryStrip.css'

/**
 * Greenfield ReactionSummaryStrip (M154 Panel A / FR-CR-01.1).
 * States: empty (no fake zeros) · loading · populated · unavailable (+ retry).
 * Picker UI → CR-02 (open callback only here).
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
}) {
  if (stripStatus === 'loading') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--loading"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="loading"
        data-density={density}
        role="status"
        aria-live="polite"
      >
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
        <span className="rm-summary-strip__skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (stripStatus === 'error') {
    return (
      <div
        className="rm-summary-strip rm-summary-strip--unavailable"
        data-testid="reaction-summary-strip"
        data-rm-strip-status="unavailable"
        data-density={density}
        role="alert"
      >
        <img
          className="rm-summary-strip__status-icon"
          src={icons.unavailable}
          alt=""
          aria-hidden="true"
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
            <img src={icons.retry} alt="" aria-hidden="true" />
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
  // Empty: keep React affordance; never theatrical "0"
  const showCount = !isEmpty && Number.isFinite(count) && count > 0

  return (
    <div
      className="rm-summary-strip"
      data-testid="reaction-summary-strip"
      data-rm-strip-status={isEmpty ? 'empty' : 'populated'}
      data-density={density}
      data-selected-count={String(Array.isArray(selected) ? selected.length : 0)}
    >
      {!isEmpty ? (
        <button
          type="button"
          className="rm-summary-strip__aggregate"
          data-testid="reaction-summary-aggregate"
          aria-label={t('threadsFeed.reactions.viewReactions')}
          onClick={() => {
            if (typeof onAggregateActivate === 'function') onAggregateActivate()
          }}
        >
          <span className="rm-summary-strip__marks" aria-hidden="true">
            {marks.slice(0, 3).map((entry) => (
              <span
                key={entry.id}
                className="rm-summary-strip__mark"
                data-reaction-id={entry.id}
                data-testid={`reaction-summary-mark-${entry.id}`}
              >
                <img src={icons[entry.id]} alt="" />
              </span>
            ))}
          </span>
          {showCount ? (
            <span className="rm-summary-strip__count" data-testid="reaction-summary-count">
              {count}
            </span>
          ) : null}
        </button>
      ) : (
        <span
          className="rm-summary-strip__empty"
          data-testid="reaction-summary-empty"
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        className="rm-summary-strip__react"
        data-testid="reaction-summary-react"
        aria-expanded={Boolean(open)}
        aria-controls={panelId}
        disabled={busy}
        onClick={() => {
          if (typeof onOpen === 'function') onOpen()
        }}
      >
        <img src={icons.react} alt="" aria-hidden="true" />
        <span>{t('threadsFeed.reactions.react')}</span>
      </button>
    </div>
  )
}
