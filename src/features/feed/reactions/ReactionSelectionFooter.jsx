/** DS §8 ReactionSelectionFooter — capacity / choose-up-to honesty. */
export function ReactionSelectionFooter({ capacityText, selectedCount, capacity, doneLabel, onDone }) {
  return (
    <div
      className="reaction-selection-footer"
      data-testid="reaction-selection-footer"
      data-reaction-surface="ReactionSelectionFooter"
      data-selected-count={String(selectedCount ?? 0)}
      data-capacity={String(capacity ?? '')}
    >
      {capacityText ? <p className="reaction-picker-capacity">{capacityText}</p> : null}
      {typeof onDone === 'function' && doneLabel ? (
        <button
          type="button"
          className="reaction-picker-close"
          data-testid="reaction-picker-close"
          onClick={onDone}
        >
          <span>{doneLabel}</span>
        </button>
      ) : null}
    </div>
  )
}
