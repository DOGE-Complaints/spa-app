import { useRef, useState } from 'react'
import { LAB_FEED_FIXTURES } from '../features/feed-lab/index.js'
import { FeedPostCard, FeedIssueDetailOverlay } from '../features/feed-lab/post/index.js'
import './FeedLabPage.css'

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22 · LAB-10 cutover.
 * Greenfield only: `feed-lab/post/` list + overlay. Ban `*Deprecated` imports on Done path.
 * `data-lab-plane=greenfield` · `data-lab-visual-done=false` until OP eye PASS.
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
      data-lab-plane="greenfield"
      data-lab-preview="greenfield"
      data-lab-overlay="m158"
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
            Greenfield feed lab (LAB-07…10)
          </h2>
          <ol
            className="feed-lab-page__list"
            data-testid="feed-lab-greenfield-list"
            data-lab-list-rhythm="m149"
          >
            {LAB_FEED_FIXTURES.map((fx) => (
              <li key={`gf-${fx.publicId}`} className="feed-lab-page__list-item">
                <FeedPostCard fixture={fx} onOpenDetail={openDetail} />
              </li>
            ))}
          </ol>
        </section>
      </div>
      <FeedIssueDetailOverlay
        fixture={detailFixture}
        open={Boolean(detailFixture)}
        onDismiss={closeDetail}
        restoreFocusRef={restoreFocusRef}
      />
    </main>
  )
}
