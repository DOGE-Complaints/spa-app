/**
 * DS §6 DiscussionHeader — section label for next-feed Discussion plane.
 */
export function DiscussionHeader({ title, className = '' }) {
  return (
    <header
      className={['discussion-header', 'feed-discussion-label', className].filter(Boolean).join(' ')}
      data-testid="discussion-header"
      data-ds-surface="DiscussionHeader"
    >
      <span>{title}</span>
    </header>
  )
}
