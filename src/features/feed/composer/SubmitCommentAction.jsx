/**
 * DS §7 SubmitCommentAction — primary post / retry control.
 */
export function SubmitCommentAction({
  children,
  onClick,
  disabled = false,
  testId = 'comment-composer-post',
  className = 'submit-comment-action',
}) {
  return (
    <button
      type="button"
      className={className}
      data-ds-surface="SubmitCommentAction"
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
