/**
 * DS §7 DraftDiscardDialog — confirm leave when dirty draft would be lost.
 */
export function DraftDiscardDialog({
  open = false,
  title = 'Discard draft?',
  body = 'Your comment draft will be lost.',
  keepLabel = 'Keep editing',
  discardLabel = 'Discard',
  onKeep,
  onDiscard,
}) {
  if (!open) return null
  return (
    <div
      className="draft-discard-dialog"
      data-ds-surface="DraftDiscardDialog"
      data-vl-done-surface="DraftDiscardDialog"
      data-testid="draft-discard-dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="draft-discard-title"
    >
      <p id="draft-discard-title" className="draft-discard-title">
        {title}
      </p>
      <p className="draft-discard-body">{body}</p>
      <div className="draft-discard-actions">
        <button type="button" className="draft-discard-keep" data-testid="draft-discard-keep" onClick={onKeep}>
          {keepLabel}
        </button>
        <button
          type="button"
          className="draft-discard-confirm"
          data-testid="draft-discard-confirm"
          onClick={onDiscard}
        >
          {discardLabel}
        </button>
      </div>
    </div>
  )
}
