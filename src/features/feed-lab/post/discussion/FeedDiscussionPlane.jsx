import { useEffect, useRef, useState } from 'react'
import { FeedDiscussionSummary } from './FeedDiscussionSummary.jsx'
import { FeedDiscussionHeader } from './FeedDiscussionHeader.jsx'
import { FeedCommentTree } from './FeedCommentTree.jsx'
import { FeedComposerEntry } from './FeedComposerEntry.jsx'
import './FeedDiscussionPlane.css'

/**
 * LAB-09 greenfield discussion region under strip (M152/M153).
 * CR-09: root ReactionsMount lives in strip reactSlot — no under-strip duplicate.
 * Comment mounts remain on FeedCommentNode.
 * Ban: deprecated lab discussion host · product discussion block · classic uppercase label chrome.
 */
export function FeedDiscussionPlane({
  fixture,
  expanded = false,
  onExpandedChange = null,
  focusComposerSignal = 0,
  t = null,
  locale = 'en',
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
      data-lab-root-reaction-slot="strip"
      aria-label="Thread"
    >
      {!isExpanded ? (
        <FeedDiscussionSummary comments={comments} onView={() => setExpanded(true)} />
      ) : (
        <div className="feed-post-discussion-plane__body" data-testid="feed-post-discussion-expanded">
          <FeedDiscussionHeader title="Thread" onCollapse={() => setExpanded(false)} />
          <FeedCommentTree comments={comments} t={t} locale={locale} />
          <FeedComposerEntry ref={composerRef} />
        </div>
      )}
    </section>
  )
}
