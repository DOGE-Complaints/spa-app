import './FeedPostIdentity.css'

/**
 * LAB-07 greenfield identity — fixture publicId + status/type/geo.
 * IssueTypeIcon omit OK · no VL chrome mount as Done.
 */
export function FeedPostIdentity({ fixture }) {
  return (
    <header className="feed-post-identity" data-testid="feed-post-identity">
      <div className="feed-post-identity__id-row">
        <span className="feed-post-identity__public-id" data-testid="feed-post-public-id">
          {fixture.publicId}
        </span>
        <span className="feed-post-identity__status" data-testid="feed-post-status">
          {fixture.status}
        </span>
        <span className="feed-post-identity__type" data-testid="feed-post-type">
          {fixture.type}
        </span>
      </div>
      {fixture.geoHint ? (
        <p className="feed-post-identity__geo" data-testid="feed-post-geo">
          {fixture.geoHint}
        </p>
      ) : null}
    </header>
  )
}
