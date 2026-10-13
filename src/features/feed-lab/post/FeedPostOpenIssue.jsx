import './FeedPostOpenIssue.css'

/** LAB-07 explicit Open issue affordance — detail wiring deferred to LAB-10. */
export function FeedPostOpenIssue({ onOpenDetail = null, label = 'Open issue' }) {
  return (
    <button
      type="button"
      className="feed-post-open-issue"
      data-testid="feed-post-open-issue"
      data-lab-hit="open-issue"
      onClick={(e) => {
        if (typeof onOpenDetail === 'function') onOpenDetail(e)
      }}
    >
      {label}
    </button>
  )
}
