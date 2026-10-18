import { useRef, useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedLabReactionsMount } from './reactions/FeedLabReactionsMount.jsx'
import { FeedLabThreadMount } from './thread/FeedLabThreadMount.jsx'
import './FeedIssueDetailBody.css'

/**
 * LAB-10 greenfield Issue body inside overlay — same civic + discussion atoms as list (M158 parity).
 * CR-09: root React in strip reactSlot · no under-strip duplicate mount.
 * CR-12: React-always · aggregate below strip · Reactions zone wire.
 * CR-15: M154 composition wire marker (CR-11…14 held).
 * CR-16: media flush above strip (parity with FeedPostCard).
 * CR-22: transparent media plate · flush lock parity.
 * CT-02: Comment → ThreadMount apiRef · detail parity with card composition.
 */
export function FeedIssueDetailBody({ fixture, initiallyExpandDiscussion = false, t = null, locale = 'en' }) {
  const [aggregateHost, setAggregateHost] = useState(null)
  const reactionsApiRef = useRef(null)
  const threadApiRef = useRef(null)

  function handleZone(zoneId, event) {
    if (zoneId === 'comment') {
      threadApiRef.current?.expand?.()
      threadApiRef.current?.focusComposer?.()
    }
    if (zoneId === 'reactions') {
      reactionsApiRef.current?.activateAggregate?.({
        anchorEl: event?.currentTarget ?? null,
      })
    }
  }

  const reactionInitialState = fixture.reactionStripState || 'empty'

  return (
    <div
      className="feed-issue-detail-body"
      data-testid="feed-issue-detail-body"
      data-lab-plane="greenfield"
      data-lab-overlay-body="m158"
      data-lab-strip-composition="a-c-b"
      data-lab-aggregate="below"
      data-lab-cr15-wire="true"
      data-lab-cr16-polish="true"
      data-lab-cr22-flush="true"
      data-lab-ct02="true"
      data-lab-media-flush="true"
    >
      <div className="feed-issue-detail-body__copy">
        <FeedPostIdentity fixture={fixture} />
        <FeedPostTitle>{fixture.title}</FeedPostTitle>
        <FeedPostSummary>{fixture.summary}</FeedPostSummary>
      </div>
      <div
        className="feed-issue-detail-body__media"
        data-testid="feed-issue-detail-media"
        data-lab-media-flush="true"
      >
        <FeedPostMedia media={fixture.media} />
      </div>
      <FeedPostActionStrip
        onZone={handleZone}
        reactSlot={
          <FeedLabReactionsMount
            target="thread-root"
            initialState={reactionInitialState}
            t={t}
            locale={locale}
            aggregatePlacement="below"
            aggregateHost={aggregateHost}
            apiRef={reactionsApiRef}
          />
        }
      />
      <div
        ref={setAggregateHost}
        className="feed-issue-detail-body__aggregate-host"
        data-testid="feed-post-aggregate-host"
        data-lab-aggregate-host="true"
      />
      <div
        className="feed-issue-detail-body__thread-host"
        data-testid="feed-issue-detail-thread-host"
        data-lab-thread-flush="true"
        data-lab-ct02="true"
      >
        <FeedLabThreadMount
          comments={fixture.comments}
          apiRef={threadApiRef}
          initiallyExpanded={Boolean(initiallyExpandDiscussion)}
        />
      </div>
    </div>
  )
}
