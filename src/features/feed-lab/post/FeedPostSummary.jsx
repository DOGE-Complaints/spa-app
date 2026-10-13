import './FeedPostSummary.css'

/** LAB-07 summary — fixture `summary` (not geoHint-only). Hit for LAB-10. */
export function FeedPostSummary({ children, onOpenDetail = null }) {
  if (!children) return null
  if (typeof onOpenDetail === 'function') {
    return (
      <button
        type="button"
        className="feed-post-summary feed-post-summary--hit"
        data-testid="feed-post-summary"
        data-lab-hit="summary"
        onClick={(e) => onOpenDetail(e)}
      >
        {children}
      </button>
    )
  }
  return (
    <p className="feed-post-summary" data-testid="feed-post-summary">
      {children}
    </p>
  )
}
