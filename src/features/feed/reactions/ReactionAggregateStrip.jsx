import { ReactionMark } from './ReactionMark.jsx'

/**
 * DS §8 ReactionAggregateStrip — compact marks + count + open control.
 * Not classic `reaction-controls` Done claim (AD-VL-01/02).
 */
export function ReactionAggregateStrip({
  marks = [],
  count,
  showCount,
  open,
  busy,
  panelId,
  icons,
  t,
  labelFor,
  onToggleOpen,
  children,
}) {
  return (
    <div
      className="reaction-aggregate-strip reaction-summary-strip"
      data-testid="reaction-aggregate-strip"
      data-reaction-surface="ReactionAggregateStrip"
      data-empty={marks.length === 0 && !showCount ? 'true' : 'false'}
    >
      <div className="reaction-summary-marks" aria-hidden={marks.length === 0}>
        {marks.map((entry) => (
          <span key={entry.id} className="reaction-summary-mark" data-reaction-id={entry.id}>
            <ReactionMark entry={entry} icons={icons} />
            <span className="reaction-summary-label">{labelFor(entry.id)}</span>
          </span>
        ))}
      </div>
      {showCount ? (
        <span className="reaction-summary-count" data-testid="reaction-summary-count">
          {count}
        </span>
      ) : null}
      <button
        type="button"
        className="reaction-open-button"
        data-testid="reaction-open-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggleOpen}
        disabled={busy}
      >
        <img src={icons?.react} alt="" aria-hidden="true" />
        <span>{t('threadsFeed.reactions.react')}</span>
        <img
          className="reaction-open-chevron"
          src={icons?.chevronDown || '/icons/next-shell/actions/chevron-down.svg'}
          alt=""
          aria-hidden="true"
        />
      </button>
      {children}
    </div>
  )
}
