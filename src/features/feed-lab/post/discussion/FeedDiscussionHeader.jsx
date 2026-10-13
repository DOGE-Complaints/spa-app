import './FeedDiscussionHeader.css'

/**
 * «Thread» / DS copy — no classic uppercase label chrome.
 */
export function FeedDiscussionHeader({ title = 'Thread', onCollapse = null }) {
  return (
    <header
      className="feed-post-discussion-header"
      data-testid="feed-post-discussion-header"
      data-lab-discussion-header="thread"
    >
      <h3 className="feed-post-discussion-header__title">{title}</h3>
      {typeof onCollapse === 'function' ? (
        <button
          type="button"
          className="feed-post-discussion-header__collapse"
          data-testid="feed-post-discussion-collapse"
          onClick={onCollapse}
        >
          Collapse
        </button>
      ) : null}
    </header>
  )
}
