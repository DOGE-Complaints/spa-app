import { ThreadSummary } from './ThreadSummary.jsx'
import { ViewDiscussionAction } from './ViewDiscussionAction.jsx'
import './DiscussionSummaryChrome.css'

/**
 * Next-feed DS collapsed discussion summary plane (M152 / DS §6).
 * Classic IssueThreadBlock DISCUSSION chrome ≠ Done on this path.
 */
export function DiscussionSummaryChrome({
  summaryTitle,
  previewBodies = [],
  viewLabel,
  onView,
  reactionSlot = null,
  className = '',
}) {
  return (
    <div
      className={[
        'discussion-summary-chrome',
        'feed-discussion-state',
        'feed-discussion-collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-testid="feed-discussion-collapsed"
      data-vl-done-surface="DiscussionSummaryChrome"
    >
      <ThreadSummary title={summaryTitle} previewBodies={previewBodies} />
      {reactionSlot}
      <ViewDiscussionAction label={viewLabel} onClick={onView} expanded={false} />
    </div>
  )
}
