import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostOpenIssue } from './FeedPostOpenIssue.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import './FeedPostCard.css'

/**
 * LAB-07 greenfield civic post card — M150 anatomy.
 * Ban: *Deprecated · ReactionControls.css · product hosts on Done path.
 */
export function FeedPostCard({ fixture, onOpenDetail = null, onActionZone = null }) {
  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  return (
    <article
      className="feed-post-card"
      data-testid={`feed-post-card-${fixture.publicId}`}
      data-public-id={fixture.publicId}
      data-fixture="true"
      data-lab-plane="greenfield"
      data-lab-card="feed-post"
    >
      <div className="feed-post-card__body">
        <FeedPostIdentity fixture={fixture} />
        <FeedPostTitle onOpenDetail={onOpenDetail ? openDetail : null}>
          {fixture.title}
        </FeedPostTitle>
        <FeedPostSummary onOpenDetail={onOpenDetail ? openDetail : null}>
          {fixture.summary}
        </FeedPostSummary>
        <FeedPostOpenIssue onOpenDetail={onOpenDetail ? openDetail : null} />
        <FeedPostMedia media={fixture.media} onOpenDetail={onOpenDetail ? openDetail : null} />
      </div>
      <FeedPostActionStrip onZone={onActionZone} />
    </article>
  )
}
