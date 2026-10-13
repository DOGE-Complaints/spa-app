import './FeedCommentNode.css'

export function FeedCommentNode({ comment }) {
  return (
    <div
      className="feed-post-comment-node"
      data-testid={`feed-post-comment-node-${comment.id}`}
      data-comment-id={comment.id}
      data-fixture={comment.fixtureOnly ? 'true' : undefined}
    >
      <p className="feed-post-comment-node__body">{comment.body}</p>
    </div>
  )
}
