import { useRef, useState } from 'react'
import {
  LAB_FEED_FIXTURES,
  FeedLabIssueCardDeprecated,
  FeedLabDetailOverlayDeprecated,
} from '../features/feed-lab/index.js'
import { FeedPostCard } from '../features/feed-lab/post/index.js'
import './FeedLabPage.css'

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22.
 * LAB-07: greenfield `feed-lab/post/` preview (primary) + Deprecated residual until LAB-10.
 * Greenfield Done path imports only from `post/` (zero *Deprecated).
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
      data-lab-preview="greenfield"
      data-lab-overlay="lab-04"
      data-lab-visual-done="false"
    >
      <div className="feed-lab-page__canvas" data-testid="feed-lab-canvas" aria-label="Feed lab canvas">
        <p className="feed-lab-page__meta" data-testid="feed-lab-fixture-count">
          fixtures: {LAB_FEED_FIXTURES.length}
        </p>

        <section
          className="feed-lab-page__section"
          data-testid="feed-lab-greenfield-section"
          data-lab-plane="greenfield"
          aria-label="Greenfield post plane"
        >
          <h2 className="feed-lab-page__section-title" data-testid="feed-lab-greenfield-heading">
            Greenfield post plane (LAB-07)
          </h2>
          <ol
            className="feed-lab-page__list"
            data-testid="feed-lab-greenfield-list"
            data-lab-list-rhythm="m149"
          >
            {LAB_FEED_FIXTURES.map((fx) => (
              <li key={`gf-${fx.publicId}`} className="feed-lab-page__list-item">
                <FeedPostCard fixture={fx} />
              </li>
            ))}
          </ol>
        </section>

        <section
          className="feed-lab-page__section feed-lab-page__section--deprecated"
          data-testid="feed-lab-deprecated-section"
          data-lab-plane="deprecated"
          aria-label="Deprecated shallow plane"
        >
          <h2 className="feed-lab-page__section-title" data-testid="feed-lab-deprecated-heading">
            Deprecated shallow plane (LAB-06 residual)
          </h2>
          <ol
            className="feed-lab-page__list"
            data-testid="feed-lab-card-list"
            data-lab-list-rhythm="m149"
          >
            {LAB_FEED_FIXTURES.map((fx, index) => (
              <li key={`dep-${fx.publicId}`} className="feed-lab-page__list-item">
                <FeedLabIssueCardDeprecated
                  fixture={fx}
                  initiallyExpandDiscussion={index === 0}
                  initiallyOpenReactions={index === 1}
                  onOpenDetail={openDetail}
                />
              </li>
            ))}
          </ol>
        </section>
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
