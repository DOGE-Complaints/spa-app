import { useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedDiscussionPlane } from './discussion/index.js'
import './FeedIssueDetailBody.css'

/**
 * LAB-10 greenfield Issue body inside overlay — same civic + discussion atoms as list (M158 parity).
 * No *Deprecated · no product discussion host · strip does not re-open Issue modal.
 */
export function FeedIssueDetailBody({ fixture, initiallyExpandDiscussion = false }) {
  const [reactionsOpen, setReactionsOpen] = useState(false)
  const [discussionExpanded, setDiscussionExpanded] = useState(Boolean(initiallyExpandDiscussion))
  const [composerFocusSignal, setComposerFocusSignal] = useState(0)

  function handleZone(zoneId) {
    if (zoneId === 'react' || zoneId === 'reactions') {
      setReactionsOpen((v) => !v)
    }
    if (zoneId === 'comment') {
      setDiscussionExpanded(true)
      setComposerFocusSignal((n) => n + 1)
    }
  }

  return (
    <div
      className="feed-issue-detail-body"
      data-testid="feed-issue-detail-body"
      data-lab-plane="greenfield"
      data-lab-overlay-body="m158"
    >
      <FeedPostIdentity fixture={fixture} />
      <FeedPostTitle>{fixture.title}</FeedPostTitle>
      <FeedPostSummary>{fixture.summary}</FeedPostSummary>
      <FeedPostMedia media={fixture.media} />
      <FeedPostActionStrip onZone={handleZone} />
      <FeedDiscussionPlane
        fixture={fixture}
        expanded={discussionExpanded}
        onExpandedChange={setDiscussionExpanded}
        reactionsOpen={reactionsOpen}
        onReactionsOpenChange={setReactionsOpen}
        focusComposerSignal={composerFocusSignal}
      />
    </div>
  )
}
