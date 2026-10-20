import {
  OverlayHost,
  OverlayLayout,
  IssuePresentationLayout,
} from '../../feed/presentation/index.js'
import '../../feed/presentation/PresentationChrome.css'
import { FeedIssueDetailBody } from './FeedIssueDetailBody.jsx'
import './FeedIssueDetailOverlay.css'

/**
 * LAB-10 greenfield Issue detail overlay (M158) — OverlayHost chrome + greenfield body.
 * Ban: *Deprecated lab overlay · classic issue host · invent OP visual PASS.
 * Fixture-only · no HTTP · focus return via OverlayHost restoreFocusRef.
 */
export function FeedIssueDetailOverlay({
  fixture,
  open,
  onDismiss,
  restoreFocusRef = null,
  initiallyExpandDiscussion = true,
}) {
  if (!fixture) return null

  const titleId = 'feed-issue-detail-title'

  const header = (
    <div className="feed-issue-detail__header" data-testid="feed-issue-detail-header">
      <h2 id={titleId} className="feed-issue-detail__heading">
        Issue {fixture.publicId}
      </h2>
      <button
        type="button"
        className="feed-issue-detail__close"
        data-testid="feed-issue-detail-close"
        aria-label="Close"
        onClick={onDismiss}
      >
        Close
      </button>
    </div>
  )

  return (
    <OverlayHost
      open={open}
      onDismiss={onDismiss}
      restoreFocusRef={restoreFocusRef}
      className="feed-issue-detail-overlay-host"
      data-presentation="modal"
    >
      <OverlayLayout
        variant="centeredDialog"
        scrimLabel="Close detail"
        onScrimClick={onDismiss}
        className="feed-issue-detail-overlay-layout"
        panelClassName="feed-issue-detail-panel"
        panelProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': titleId,
          tabIndex: -1,
          'data-testid': 'feed-issue-detail-panel',
          'data-lab-overlay': 'm158',
          'data-lab-plane': 'greenfield',
          'data-lab-visual-done': 'false',
        }}
      >
        <IssuePresentationLayout
          variant="modal"
          header={header}
          body={
            <FeedIssueDetailBody
              fixture={fixture}
              initiallyExpandDiscussion={initiallyExpandDiscussion}
            />
          }
          titleId={titleId}
          className="feed-issue-detail-presentation"
        />
      </OverlayLayout>
    </OverlayHost>
  )
}
