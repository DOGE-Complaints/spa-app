import { useRef, useState } from 'react'
import {
  LAB_FEED_FIXTURES,
  FeedLabIssueCardDeprecated,
  FeedLabDetailOverlayDeprecated,
} from '../features/feed-lab/index.js'
import './FeedLabPage.css'

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22.
 * LAB-06: mounts Deprecated shallow plane until LAB-10 cutover.
 * No product feed host / toolbar / map; zero gateway/threads HTTP.
 * Visual package PASS requires OP eye (Partial = BLOCK). NOT visual Done.
 */
export function FeedLabPage() {
  const [detailId, setDetailId] = useState(null)
  const restoreFocusRef = useRef(null)

  const detailFixture =
    detailId == null ? null : LAB_FEED_FIXTURES.find((fx) => fx.publicId === detailId) || null

  function openDetail(publicId, openerEl) {
    if (openerEl && typeof openerEl.focus === 'function') {
      restoreFocusRef.current = openerEl
    }
    setDetailId(publicId)
  }

  function closeDetail() {
    setDetailId(null)
  }

  return (
    <main
      className="feed-lab-page"
      data-testid="feed-lab-page"
      data-vl-lab-surface="FeedLabPage"
      data-lab-foundation="compose"
      data-lab-overlay="lab-04"
      data-lab-plane="deprecated"
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
              <FeedLabIssueCardDeprecated
                fixture={fx}
                initiallyExpandDiscussion={index === 0}
                initiallyOpenReactions={index === 1}
                onOpenDetail={openDetail}
              />
            </li>
          ))}
        </ol>
      </div>
      <FeedLabDetailOverlayDeprecated
        fixture={detailFixture}
        open={Boolean(detailFixture)}
        onDismiss={closeDetail}
        restoreFocusRef={restoreFocusRef}
      />
    </main>
  )
}
