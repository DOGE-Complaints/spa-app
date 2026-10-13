import {
  LAB_FEED_FIXTURES,
  FeedLabIssueCard,
} from '../features/feed-lab/index.js'
import './FeedLabPage.css'

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22.
 * LAB-03: five atom-composed cards (M150→M154→M152/M153→M149 rhythm).
 * No product feed host / toolbar / map; zero gateway/threads HTTP.
 * Visual package PASS requires OP eye (Partial = BLOCK).
 */
export function FeedLabPage() {
  return (
    <main
      className="feed-lab-page"
      data-testid="feed-lab-page"
      data-vl-lab-surface="FeedLabPage"
      data-lab-foundation="compose"
      data-lab-visual-done="false"
    >
      <div className="feed-lab-page__canvas" data-testid="feed-lab-canvas" aria-label="Feed lab canvas">
        <p className="feed-lab-page__meta" data-testid="feed-lab-fixture-count">
          fixtures: {LAB_FEED_FIXTURES.length}
        </p>
        <ol
          className="feed-lab-page__list"
          data-testid="feed-lab-card-list"
          data-lab-list-rhythm="m149"
        >
          {LAB_FEED_FIXTURES.map((fx, index) => (
            <li key={fx.publicId} className="feed-lab-page__list-item">
              <FeedLabIssueCard
                fixture={fx}
                initiallyExpandDiscussion={index === 0}
                initiallyOpenReactions={index === 1}
              />
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
