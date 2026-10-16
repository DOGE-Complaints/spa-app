import { useRef, useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostOpenIssue } from './FeedPostOpenIssue.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedLabReactionsMount } from './reactions/FeedLabReactionsMount.jsx'
import { FeedDiscussionPlane } from './discussion/index.js'
import './FeedPostCard.css'

/**
 * LAB-07…09 greenfield civic post card — M150 anatomy + M154 reactions + M152 discussion.
 * CR-09: root React in strip reactSlot — no under-strip duplicate mount.
 * CR-12: React-always · aggregate row below strip · Reactions zone → activateAggregate.
 */
export function FeedPostCard({
  fixture,
  onOpenDetail = null,
  onActionZone = null,
  t = null,
  locale = 'en',
}) {
  const [discussionExpanded, setDiscussionExpanded] = useState(false)
  const [composerFocusSignal, setComposerFocusSignal] = useState(0)
  const [aggregateHost, setAggregateHost] = useState(null)
  const reactionsApiRef = useRef(null)

  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  function handleZone(zoneId, event) {
    if (zoneId === 'comment') {
      setDiscussionExpanded(true)
      setComposerFocusSignal((n) => n + 1)
    }
    if (zoneId === 'reactions') {
      reactionsApiRef.current?.activateAggregate?.()
    }
    if (typeof onActionZone === 'function') onActionZone(zoneId, event)
  }

  const reactionInitialState = fixture.reactionStripState || 'empty'

  return (
    <article
      className="feed-post-card"
      data-testid={`feed-post-card-${fixture.publicId}`}
      data-public-id={fixture.publicId}
      data-fixture="true"
      data-lab-plane="greenfield"
      data-lab-card="feed-post"
      data-lab-reactions="m154"
      data-lab-discussion="m152"
      data-lab-strip-composition="a-c-b"
      data-lab-aggregate="below"
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
        className="feed-post-card__aggregate-host"
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
    </article>
  )
}
