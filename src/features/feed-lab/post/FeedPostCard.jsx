import { useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostOpenIssue } from './FeedPostOpenIssue.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedDiscussionPlane } from './discussion/index.js'
import './FeedPostCard.css'

/**
 * LAB-07…09 greenfield civic post card — M150 anatomy + M154 reactions + M152 discussion.
 * Ban: Deprecated chrome · classic uppercase thread label · product discussion block · Controls stylesheet.
 */
export function FeedPostCard({
  fixture,
  onOpenDetail = null,
  onActionZone = null,
  t = null,
  locale = 'en',
}) {
  const [reactionsOpen, setReactionsOpen] = useState(false)
  const [discussionExpanded, setDiscussionExpanded] = useState(false)
  const [composerFocusSignal, setComposerFocusSignal] = useState(0)

  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  function handleZone(zoneId, event) {
    if (zoneId === 'react' || zoneId === 'reactions') {
      setReactionsOpen((v) => !v)
    }
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
      <FeedPostActionStrip onZone={handleZone} />
      <FeedDiscussionPlane
        fixture={fixture}
        expanded={discussionExpanded}
        onExpandedChange={setDiscussionExpanded}
        reactionsOpen={reactionsOpen}
        onReactionsOpenChange={setReactionsOpen}
        focusComposerSignal={composerFocusSignal}
        t={t}
        locale={locale}
      />
    </article>
  )
}
