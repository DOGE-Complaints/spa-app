/**
 * DS §6 ReplyDepthNotice — configured max_depth honesty (not invent limit text).
 */
export function ReplyDepthNotice({ children }) {
  return (
    <p
      className="reply-depth-notice"
      data-ds-surface="ReplyDepthNotice"
      data-testid="comment-max-depth"
      role="status"
    >
      {children}
    </p>
  )
}
