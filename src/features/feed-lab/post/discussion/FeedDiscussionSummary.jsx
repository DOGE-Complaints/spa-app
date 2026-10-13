import './FeedDiscussionSummary.css'

/**
 * Collapsed: title count · literal previews · View action.
 */
export function FeedDiscussionSummary({ comments = [], onView }) {
  const count = comments.length
  const title = `Thread · ${count} comment${count === 1 ? '' : 's'}`
  const previews = comments.slice(0, 2).map((c) => c.body)

  return (
    <div
      className="feed-post-discussion-summary"
      data-testid="feed-post-discussion-summary"
      data-lab-discussion="collapsed"
    >
      <h3 className="feed-post-discussion-summary__title" data-testid="feed-post-discussion-summary-title">
        {title}
      </h3>
      {previews.length > 0 ? (
        <ul className="feed-post-discussion-summary__previews" data-testid="feed-post-discussion-previews">
          {previews.map((body, i) => (
            <li key={`preview-${i}`}>
              <p className="feed-post-discussion-summary__preview">{body}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        className="feed-post-discussion-summary__view"
        data-testid="feed-post-discussion-view"
        onClick={() => {
          if (typeof onView === 'function') onView()
        }}
      >
        View thread
      </button>
    </div>
  )
}
