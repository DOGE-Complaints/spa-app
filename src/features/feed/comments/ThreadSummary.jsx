import { CommentPreview } from './CommentPreview.jsx'

/**
 * DS §6 ThreadSummary — compact collapsed summary with literal preview bodies.
 */
export function ThreadSummary({ title, previewBodies = [], className = '' }) {
  const bodies = Array.isArray(previewBodies) ? previewBodies : []
  return (
    <div
      className={['thread-summary', className].filter(Boolean).join(' ')}
      data-testid="thread-summary"
      data-ds-surface="ThreadSummary"
    >
      {title ? (
        <p className="thread-summary-title feed-discussion-summary-title" data-testid="thread-summary-title">
          {title}
        </p>
      ) : null}
      <ul className="thread-summary-previews feed-discussion-previews" data-testid="feed-discussion-previews">
        {bodies.map((body, i) => (
          <CommentPreview key={`preview-${i}`} body={body} />
        ))}
      </ul>
    </div>
  )
}
