import { useRef, useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedLabReactionsMount } from './reactions/FeedLabReactionsMount.jsx'
import { FeedDiscussionPlane } from './discussion/index.js'
import './FeedIssueDetailBody.css'

/**
 * LAB-10 greenfield Issue body inside overlay — same civic + discussion atoms as list (M158 parity).
 * CR-09: root React in strip reactSlot · no under-strip duplicate mount.
 * CR-12: React-always · aggregate below strip · Reactions zone wire.
 */
export function FeedIssueDetailBody({ fixture, initiallyExpandDiscussion = false, t = null, locale = 'en' }) {
  const [discussionExpanded, setDiscussionExpanded] = useState(Boolean(initiallyExpandDiscussion))
  const [composerFocusSignal, setComposerFocusSignal] = useState(0)
  const [aggregateHost, setAggregateHost] = useState(null)
  const reactionsApiRef = useRef(null)

  function handleZone(zoneId) {
    if (zoneId === 'comment') {
      setDiscussionExpanded(true)
      setComposerFocusSignal((n) => n + 1)
    }
    if (zoneId === 'reactions') {
      reactionsApiRef.current?.activateAggregate?.()
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
    >
      <FeedPostIdentity fixture={fixture} />
      <FeedPostTitle>{fixture.title}</FeedPostTitle>
      <FeedPostSummary>{fixture.summary}</FeedPostSummary>
      <FeedPostMedia media={fixture.media} />
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
      <FeedDiscussionPlane
        fixture={fixture}
        expanded={discussionExpanded}
        onExpandedChange={setDiscussionExpanded}
        focusComposerSignal={composerFocusSignal}
        t={t}
        locale={locale}
      />
    </div>
  )
}
