import './BoardIssuePost.css'

/**
 * Continuous post shell (M143 rev 1.1): civic Issue chrome + IssueThreadBlock.
 * Does not invent social HTTP — threadStatus is local presentation only.
 */
export function BoardIssuePost({ children, thread }) {
  return (
    <article className="board-issue-post" data-testid="board-issue-post">
      <div className="board-issue-post-civic">{children}</div>
      <div className="board-issue-post-divider" aria-hidden="true" />
      {thread}
    </article>
  )
}
