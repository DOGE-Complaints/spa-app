import { useState } from 'react'
import {
  LAB_FEED_FIXTURES,
  LAB_MEDIA_STUB_PATH,
  LAB_MEDIA_STUB_TARGET,
} from '../features/feed-lab/index.js'
import './FeedLabPage.css'

/**
 * Feed lab canvas (`#/lab/feed`) — EPIC-SPA-22.
 * LAB-01 blank foundation + LAB-02 data smoke (fixtures · media contract).
 * No product feed host / toolbar / map; zero gateway/threads HTTP.
 * Not full visual Done — atom compose / artboard PASS → LAB-03+.
 */
export function FeedLabPage() {
  const [mediaState, setMediaState] = useState('pending')

  return (
    <main
      className="feed-lab-page"
      data-testid="feed-lab-page"
      data-vl-lab-surface="FeedLabPage"
      data-lab-foundation="data"
      data-lab-visual-done="false"
    >
      <div className="feed-lab-page__canvas" data-testid="feed-lab-canvas" aria-label="Feed lab canvas">
        <section
          className="feed-lab-page__data"
          data-testid="feed-lab-fixture-panel"
          data-fixture="true"
          aria-label="Lab fixture catalog"
        >
          <p className="feed-lab-page__meta" data-testid="feed-lab-fixture-count">
            fixtures: {LAB_FEED_FIXTURES.length}
          </p>
          <p className="feed-lab-page__meta" data-testid="feed-lab-media-contract">
            media: {LAB_MEDIA_STUB_PATH} · target {LAB_MEDIA_STUB_TARGET.width}×
            {LAB_MEDIA_STUB_TARGET.height} · state={mediaState}
          </p>
          <ul className="feed-lab-page__fixture-list" data-testid="feed-lab-fixture-list">
            {LAB_FEED_FIXTURES.map((fx) => (
              <li
                key={fx.publicId}
                className="feed-lab-page__fixture-item"
                data-testid={`feed-lab-fixture-${fx.publicId}`}
                data-fixture="true"
                data-public-id={fx.publicId}
              >
                <span className="feed-lab-page__fixture-id">{fx.publicId}</span>
                <span className="feed-lab-page__fixture-title">{fx.title}</span>
              </li>
            ))}
          </ul>
          <div className="feed-lab-page__media-probe" data-testid="feed-lab-media-probe">
            <img
              className="feed-lab-page__media-img"
              src={LAB_MEDIA_STUB_PATH}
              alt={LAB_FEED_FIXTURES[0]?.media.alt ?? 'Lab media stub'}
              data-fixture="true"
              data-lab-media-stub="true"
              onLoad={() => setMediaState('present')}
              onError={() => setMediaState('absent-honest')}
            />
            {mediaState === 'absent-honest' ? (
              <p className="feed-lab-page__media-absent" data-testid="feed-lab-media-absent">
                Media stub Absent — honest placeholder (no second asset invent)
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}
