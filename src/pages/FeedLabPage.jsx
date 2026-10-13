import './FeedLabPage.css'

/**
 * Feed lab blank canvas (`#/lab/feed`) — EPIC-SPA-22 / LAB-01 foundation.
 * Clean room only: no product feed host / toolbar / map; zero gateway/threads HTTP.
 * Ban-list imports enforced by tests (no classic Controls CSS; no product post hosts).
 * Not claimable as visual package PASS (Artboards N/A until LAB-03+).
 */
export function FeedLabPage() {
  return (
    <main
      className="feed-lab-page"
      data-testid="feed-lab-page"
      data-vl-lab-surface="FeedLabPage"
      data-lab-foundation="blank"
    >
      <div className="feed-lab-page__canvas" data-testid="feed-lab-canvas" aria-label="Feed lab canvas" />
    </main>
  )
}
