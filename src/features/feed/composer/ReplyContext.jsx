/**
 * DS §7 ReplyContext — parent excerpt + cancel reply.
 */
export function ReplyContext({ label, parentLabel = '', onCancel = null, cancelLabel = 'Cancel' }) {
  return (
    <div
      className="reply-context"
      data-ds-surface="ReplyContext"
      data-testid="comment-composer-replying-to"
    >
      <span>
        {label} {parentLabel}
      </span>
      {typeof onCancel === 'function' ? (
        <button
          type="button"
          className="reply-context-cancel"
          onClick={onCancel}
          aria-label={cancelLabel}
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
