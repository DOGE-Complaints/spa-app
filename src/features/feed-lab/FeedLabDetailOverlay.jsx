import { IssueIdentityHeader } from '../feed/identity/index.js'
import {
  OverlayHost,
  OverlayLayout,
  IssuePresentationLayout,
} from '../feed/presentation/index.js'
import '../feed/presentation/PresentationChrome.css'
import { LabReactionChrome } from './LabReactionChrome.jsx'
import { FeedLabDiscussion } from './FeedLabDiscussion.jsx'
import { labT } from './labI18n.js'
import './FeedLabDetailOverlay.css'

/**
 * LAB-04 lab detail overlay — OverlayHost + IssuePresentationLayout (M158).
 * Ban: product hosts + classic board Controls CSS on Done path.
 * Fixture-only · no HTTP.
 */
export function FeedLabDetailOverlay({ fixture, open, onDismiss, restoreFocusRef = null }) {
  if (!fixture) return null

  const titleId = 'feed-lab-detail-title'

  const header = (
    <div className="feed-lab-detail__header" data-testid="feed-lab-detail-header">
      <h2 id={titleId} className="feed-lab-detail__heading">
        Issue detail
      </h2>
      <button
        type="button"
        className="feed-lab-detail__close"
        data-testid="feed-lab-detail-close"
        aria-label="Close"
        onClick={onDismiss}
      >
        Close
      </button>
    </div>
  )

  const body = (
    <div className="feed-lab-detail__body" data-testid="feed-lab-detail-body">
      <IssueIdentityHeader
        issueId={fixture.publicId}
        status={fixture.status}
        typeDisplay={fixture.type}
        geoText={fixture.geoHint}
        dateText=""
        iconSrc={null}
        publicLabel={fixture.publicId}
        moreLabel={labT('nextFeed.post.more')}
      />
      <h3 className="feed-lab-detail__title">{fixture.title}</h3>
      <div className="feed-lab-detail__media">
        <img
          className="feed-lab-detail__media-img"
          src={fixture.media.src}
          alt={fixture.media.alt}
          data-fixture="true"
          data-lab-media-stub="true"
        />
      </div>
      <div
        className="feed-lab-detail__actions"
        data-testid="feed-lab-detail-actions"
        data-action-zones="4"
        role="group"
        aria-label={labT('nextFeed.post.actions')}
      >
        <span className="feed-lab-detail__action-label">React</span>
        <span className="feed-lab-detail__action-label">Comment</span>
        <span className="feed-lab-detail__action-label">Share</span>
        <span className="feed-lab-detail__action-label">Reactions</span>
      </div>
      <div className="feed-lab-detail__reactions">
        <LabReactionChrome t={labT} />
      </div>
      <FeedLabDiscussion fixture={fixture} initiallyExpanded={true} />
    </div>
  )

  return (
    <OverlayHost
      open={open}
      onDismiss={onDismiss}
      restoreFocusRef={restoreFocusRef}
      className="feed-lab-detail-overlay-host"
      data-presentation="modal"
    >
      <OverlayLayout
        variant="centeredDialog"
        scrimLabel="Close detail"
        onScrimClick={onDismiss}
        className="feed-lab-detail-overlay-layout"
        panelClassName="feed-lab-detail-panel"
        panelProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': titleId,
          tabIndex: -1,
          'data-testid': 'feed-lab-detail-panel',
          'data-lab-overlay': 'm158',
        }}
      >
        <IssuePresentationLayout
          variant="modal"
          header={header}
          body={body}
          titleId={titleId}
          className="feed-lab-detail-presentation"
        />
      </OverlayLayout>
    </OverlayHost>
  )
}
