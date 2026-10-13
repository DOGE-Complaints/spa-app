import { useState } from 'react'
import { IssueIdentityHeader } from '../feed/identity/index.js'
import { LabReactionChrome } from './LabReactionChrome.jsx'
import { FeedLabDiscussion } from './FeedLabDiscussion.jsx'
import { labT } from './labI18n.js'
import './FeedLabIssueCard.css'

/**
 * LAB-03 atom-composed lab card — DS identity + lab text/media/actions + local reactions + discussion.
 * Ban: product feed hosts + classic board Controls CSS on Done path.
 */
export function FeedLabIssueCard({ fixture, initiallyExpandDiscussion = false, initiallyOpenReactions = false }) {
  const [mediaState, setMediaState] = useState('pending')
  const [reactionsOpenSignal, setReactionsOpenSignal] = useState(
    initiallyOpenReactions ? 1 : 0,
  )

  return (
    <article
      className="feed-lab-issue-card"
      data-testid={`feed-lab-issue-card-${fixture.publicId}`}
      data-public-id={fixture.publicId}
      data-fixture="true"
      data-lab-card="atom-compose"
    >
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

      <h3 className="feed-lab-issue-card__title" data-testid="feed-lab-card-title">
        {fixture.title}
      </h3>

      <button
        type="button"
        className="feed-lab-issue-card__open"
        data-testid="feed-lab-card-open"
        aria-label={labT('nextFeed.post.openIssue')}
      >
        <img
          className="feed-lab-issue-card__icon"
          src="/icons/next-feed/actions/open-issue.svg"
          alt=""
          aria-hidden="true"
        />
        <span>{labT('nextFeed.post.openIssue')}</span>
      </button>

      <div
        className="feed-lab-issue-card__media"
        data-testid="feed-lab-card-media"
        data-lab-media-clickable="true"
        data-media-state={mediaState}
      >
        <img
          className="feed-lab-issue-card__media-img"
          src={fixture.media.src}
          alt={fixture.media.alt}
          data-fixture="true"
          data-lab-media-stub="true"
          onLoad={() => setMediaState('present')}
          onError={() => setMediaState('absent-honest')}
        />
        {mediaState === 'absent-honest' ? (
          <p className="feed-lab-issue-card__media-absent">Media stub Absent — honest placeholder</p>
        ) : null}
      </div>

      <div
        className="feed-lab-issue-card__actions"
        data-testid="feed-lab-card-actions"
        data-action-zones="4"
        role="group"
        aria-label={labT('nextFeed.post.actions')}
      >
        <button
          type="button"
          className="feed-lab-issue-card__action"
          data-zone="react"
          aria-label={labT('threadsFeed.post.action.react')}
          onClick={() => setReactionsOpenSignal((n) => n + 1)}
        >
          <img
            className="feed-lab-issue-card__icon"
            src="/icons/next-feed/actions/react.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{labT('threadsFeed.post.action.react')}</span>
        </button>
        <button
          type="button"
          className="feed-lab-issue-card__action"
          data-zone="comment"
          aria-label={labT('nextFeed.post.comment')}
        >
          <img
            className="feed-lab-issue-card__icon"
            src="/icons/next-feed/actions/comment.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{labT('nextFeed.post.comment')}</span>
        </button>
        <button
          type="button"
          className="feed-lab-issue-card__action"
          data-zone="share"
          aria-label={labT('nextFeed.post.share')}
        >
          <img
            className="feed-lab-issue-card__icon"
            src="/icons/next-feed/actions/share.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{labT('nextFeed.post.share')}</span>
        </button>
        <button
          type="button"
          className="feed-lab-issue-card__action"
          data-zone="reactions"
          aria-label="Reactions"
          onClick={() => setReactionsOpenSignal((n) => n + 1)}
        >
          <img
            className="feed-lab-issue-card__icon"
            src="/icons/next-feed/actions/react.svg"
            alt=""
            aria-hidden="true"
          />
          <span>Reactions</span>
        </button>
      </div>

      <div className="feed-lab-issue-card__reactions" data-testid="feed-lab-card-reactions">
        <LabReactionChrome t={labT} openSignal={reactionsOpenSignal} />
      </div>

      <FeedLabDiscussion fixture={fixture} initiallyExpanded={initiallyExpandDiscussion} />
    </article>
  )
}
