/**
 * DS §6 CommentPreview — literal Closed body text only (no paraphrase).
 */
export function CommentPreview({ body, className = '' }) {
  const text = String(body ?? '').trim()
  if (!text) return null
  return (
    <li
      className={['comment-preview', 'feed-discussion-preview-body', className].filter(Boolean).join(' ')}
      data-testid="comment-preview"
      data-ds-surface="CommentPreview"
    >
      {text}
    </li>
  )
}
