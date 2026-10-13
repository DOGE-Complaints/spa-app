import './FeedPostTitle.css'

/** LAB-07 title — hit target for LAB-10 detail (no modal this tip). */
export function FeedPostTitle({ children, onOpenDetail = null }) {
  if (typeof onOpenDetail === 'function') {
    return (
      <button
        type="button"
        className="feed-post-title feed-post-title--hit"
        data-testid="feed-post-title"
        data-lab-hit="title"
        onClick={(e) => onOpenDetail(e)}
      >
        {children}
      </button>
    )
  }
  return (
    <h2 className="feed-post-title" data-testid="feed-post-title">
      {children}
    </h2>
  )
}
