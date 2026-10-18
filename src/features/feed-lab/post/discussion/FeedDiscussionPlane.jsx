import { FeedLabThreadMount } from '../thread/FeedLabThreadMount.jsx'
import './FeedDiscussionPlane.css'

/**
 * CT-08 L-cut: prior LAB-09 discussion tip retired → thin-wrap ThreadMount host.
 * Keep module + testids for scaffold/ban tests · no dual competing UI on Done path.
 * Ban: FeedDiscussionBlock · Deprecated discussion · classic DISCUSSION chrome.
 */
export function FeedDiscussionPlane({
  fixture,
  expanded = false,
  onExpandedChange = null,
  focusComposerSignal = 0,
  t = null,
  locale = 'en',
}) {
  void onExpandedChange
  void focusComposerSignal
  void t
  void locale

  return (
    <section
      className="feed-post-discussion-plane"
      data-testid="feed-post-discussion-plane"
      data-lab-plane="greenfield"
      data-lab-discussion-retired="thin-wrap"
      data-lab-discussion-artboard="m152"
      data-lab-ct08="true"
      data-lab-root-reaction-slot="strip"
      aria-label="Thread"
    >
      <FeedLabThreadMount
        comments={Array.isArray(fixture?.comments) ? fixture.comments : []}
        initiallyExpanded={Boolean(expanded)}
      />
    </section>
  )
}
