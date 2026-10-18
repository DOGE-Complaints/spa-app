import { mapSummaryMarksToEntries } from '../feed/semantics/reactionsV1.js'
import { CR_REACTION_ICON_PACK } from './icons/crReactionIcons.js'
import { CrReactionIcon } from './icons/CrReactionIcon.jsx'
import './icons/ReactionMarkAccents.css'
import './ReactionAggregateRow.css'

/**
 * CR-12 — M154 Panel A aggregate row (under PostActionStrip).
 * Empty ready → null (row absent). Loading / error / populated Present.
 * CR-17: activate → people path (onAggregateActivate) · NOT ReactionPicker.
 */
export function ReactionAggregateRow({
  stripStatus = 'ready',
  summaryMarks = null,
  aggregateCount = null,
  icons = CR_REACTION_ICON_PACK,
  t = (k) => k,
  density = 'compact',
  open = false,
  panelId = undefined,
  active = false,
  onRetry = null,
  onAggregateActivate = null,
}) {
  if (stripStatus === 'loading') {
    return (
      <div
        className="rm-aggregate-row rm-aggregate-row--loading"
        data-testid="reaction-aggregate-row"
        data-rm-aggregate-status="loading"
        data-density={density}
        role="status"
        aria-live="polite"
      >
        <span className="rm-aggregate-row__skeleton" aria-hidden="true" />
        <span className="rm-aggregate-row__skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (stripStatus === 'error') {
    return (
      <div
        className="rm-aggregate-row rm-aggregate-row--unavailable"
        data-testid="reaction-aggregate-row"
        data-rm-aggregate-status="unavailable"
        data-density={density}
        role="alert"
      >
        <CrReactionIcon
          className="rm-aggregate-row__status-icon"
          src={icons.unavailable}
          size={18}
        />
        <p className="rm-aggregate-row__unavailable-text">
          {t('threadsFeed.reactions.unavailable')}
        </p>
        {typeof onRetry === 'function' ? (
          <button
            type="button"
            className="rm-aggregate-row__retry"
            data-testid="reaction-aggregate-retry"
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
  if (isEmpty) return null

  const showCount = Number.isFinite(count) && count > 0

  function handleActivate() {
    if (typeof onAggregateActivate === 'function') onAggregateActivate()
  }

  const expanded = Boolean(open || active)

  return (
    <div
      className={[
        'rm-aggregate-row',
        expanded ? 'rm-aggregate-row--active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-testid="reaction-aggregate-row"
      data-rm-aggregate-status="populated"
      data-rm-aggregate-active={expanded ? 'true' : 'false'}
      data-density={density}
    >
      <button
        type="button"
        className={[
          'rm-aggregate-row__control',
          expanded ? 'rm-aggregate-row__control--open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-testid="reaction-summary-aggregate"
        data-rm-aggregate-active={expanded ? 'true' : 'false'}
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-label={t('threadsFeed.reactions.viewReactions')}
        onMouseEnter={handleActivate}
        onFocus={handleActivate}
        onClick={handleActivate}
      >
        <span className="rm-aggregate-row__marks" aria-hidden="true">
          {marks.slice(0, 3).map((entry) => (
            <span
              key={entry.id}
              className="rm-aggregate-row__mark"
              data-reaction-id={entry.id}
              data-testid={`reaction-summary-mark-${entry.id}`}
            >
              <CrReactionIcon src={icons[entry.id]} size={16} />
            </span>
          ))}
        </span>
        {showCount ? (
          <span className="rm-aggregate-row__count" data-testid="reaction-summary-count">
            {count}
          </span>
        ) : null}
        {showCount ? (
          <span className="rm-aggregate-row__total" data-testid="reaction-aggregate-total">
            {`${count} total`}
          </span>
        ) : null}
      </button>
    </div>
  )
}
