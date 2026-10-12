/**
 * DS §6 ViewDiscussionAction — expands / opens the same Discussion.
 */
export function ViewDiscussionAction({ label, onClick, expanded = false, className = '' }) {
  return (
    <button
      type="button"
      className={['view-discussion-action', 'feed-discussion-view', className].filter(Boolean).join(' ')}
      data-testid="feed-discussion-view"
      data-ds-surface="ViewDiscussionAction"
      aria-expanded={expanded ? 'true' : 'false'}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
