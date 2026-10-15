import { useState } from 'react'
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
 * CR-09: root React lives in strip reactSlot (A+C+B) — no under-strip duplicate.
 * Ban: Deprecated chrome · classic uppercase thread label · product discussion block · Controls stylesheet.
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

  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  function handleZone(zoneId, event) {
    if (zoneId === 'comment') {
      setDiscussionExpanded(true)
      setComposerFocusSignal((n) => n + 1)
    }
    if (typeof onActionZone === 'function') onActionZone(zoneId, event)
  }

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
            initialState="empty"
            t={t}
            locale={locale}
          />
        }
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
