import { useEffect, useRef, useState } from 'react'
import { FeedReactionPlane } from '../reactions/index.js'
import { FeedDiscussionSummary } from './FeedDiscussionSummary.jsx'
import { FeedDiscussionHeader } from './FeedDiscussionHeader.jsx'
import { FeedCommentTree } from './FeedCommentTree.jsx'
import { FeedComposerEntry } from './FeedComposerEntry.jsx'
import './FeedDiscussionPlane.css'

/**
 * LAB-09 greenfield discussion region under strip (M152/M153).
 * Reaction aggregate/picker lives inside this region (M152 C adjacency).
 * Ban: deprecated lab discussion host · product discussion block · classic uppercase label chrome.
 */
export function FeedDiscussionPlane({
  fixture,
  expanded = false,
  onExpandedChange = null,
  reactionsOpen = false,
  onReactionsOpenChange = null,
  focusComposerSignal = 0,
}) {
  const [internalExpanded, setInternalExpanded] = useState(Boolean(expanded))
  const isControlled = typeof onExpandedChange === 'function'
  const isExpanded = isControlled ? Boolean(expanded) : internalExpanded
  const composerRef = useRef(null)
  const comments = Array.isArray(fixture?.comments) ? fixture.comments : []

  function setExpanded(next) {
    if (isControlled) onExpandedChange(next)
    else setInternalExpanded(next)
  }

  useEffect(() => {
    if (!focusComposerSignal) return undefined
    setExpanded(true)
    const id = requestAnimationFrame(() => {
      composerRef.current?.focus?.()
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- signal-driven expand/focus only
  }, [focusComposerSignal])

  return (
    <section
      className="feed-post-discussion-plane"
      data-testid="feed-post-discussion-plane"
      data-lab-plane="greenfield"
      data-lab-discussion={isExpanded ? 'expanded' : 'collapsed'}
      data-lab-discussion-artboard="m152"
      aria-label="Thread"
    >
      <div
        className="feed-post-discussion-plane__reactions"
        data-testid="feed-post-discussion-reaction-slot"
        data-lab-reaction-adjacency="m152-c"
      >
        <FeedReactionPlane
          target="thread-root"
          open={reactionsOpen}
          onOpenChange={onReactionsOpenChange}
        />
      </div>

      {!isExpanded ? (
        <FeedDiscussionSummary comments={comments} onView={() => setExpanded(true)} />
      ) : (
        <div className="feed-post-discussion-plane__body" data-testid="feed-post-discussion-expanded">
          <FeedDiscussionHeader title="Thread" onCollapse={() => setExpanded(false)} />
          <FeedCommentTree comments={comments} />
          <FeedComposerEntry ref={composerRef} />
        </div>
      )}
    </section>
  )
}
