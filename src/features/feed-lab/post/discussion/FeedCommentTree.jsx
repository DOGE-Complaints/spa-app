import { FeedCommentNode } from './FeedCommentNode.jsx'
import './FeedCommentTree.css'

export function FeedCommentTree({ comments = [] }) {
  return (
    <div
      className="feed-post-comment-tree"
      data-testid="feed-post-comment-tree"
      data-lab-comment-count={String(comments.length)}
    >
      {comments.map((c) => (
        <FeedCommentNode key={c.id} comment={c} />
      ))}
    </div>
  )
}
