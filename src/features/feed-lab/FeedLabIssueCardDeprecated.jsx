import { useState } from 'react'
import { IssueIdentityHeader } from '../feed/identity/index.js'
import { LabReactionChromeDeprecated } from './LabReactionChromeDeprecated.jsx'
import { FeedLabDiscussionDeprecated } from './FeedLabDiscussionDeprecated.jsx'
import { labT } from './labI18n.js'
import './FeedLabIssueCardDeprecated.css'

/**
 * LAB-03/04 atom-composed lab card — DS identity + lab text/media/actions + local reactions.
 * LAB-04: title / summary / media / Open issue open detail; action strip does not.
 * Ban: product feed hosts + classic board Controls CSS on Done path.
 */
export function FeedLabIssueCardDeprecated({
  fixture,
  initiallyExpandDiscussion = false,
  initiallyOpenReactions = false,
  onOpenDetail = null,
}) {
  const [mediaState, setMediaState] = useState('pending')
  const [reactionsOpenSignal, setReactionsOpenSignal] = useState(
    initiallyOpenReactions ? 1 : 0,
  )

  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  function stopAction(event) {
    event.stopPropagation()
  }

  const summaryText = fixture.summary || fixture.geoHint || ''

  return (
    <article
      className="feed-lab-issue-card"
      data-testid={`feed-lab-issue-card-${fixture.publicId}`}
      data-public-id={fixture.publicId}
      data-fixture="true"
      data-lab-card="atom-compose"
      data-lab-plane="deprecated"
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

      <button
        type="button"
        className="feed-lab-issue-card__title feed-lab-issue-card__hit"
        data-testid="feed-lab-card-title"
        data-lab-hit="title"
        onClick={openDetail}
      >
        {fixture.title}
      </button>

      {summaryText ? (
        <button
          type="button"
          className="feed-lab-issue-card__summary feed-lab-issue-card__hit"
          data-testid="feed-lab-card-summary"
          data-lab-hit="summary"
          onClick={openDetail}
        >
          {summaryText}
        </button>
      ) : null}

      <button
        type="button"
        className="feed-lab-issue-card__open"
        data-testid="feed-lab-card-open"
        data-lab-hit="open-issue"
        aria-label={labT('nextFeed.post.openIssue')}
        onClick={openDetail}
      >
        <img
          className="feed-lab-issue-card__icon"
          src="/icons/next-feed/actions/open-issue.svg"
          alt=""
          aria-hidden="true"
        />
        <span>{labT('nextFeed.post.openIssue')}</span>
      </button>

      <button
        type="button"
        className="feed-lab-issue-card__media feed-lab-issue-card__hit"
        data-testid="feed-lab-card-media"
        data-lab-hit="media"
        data-lab-media-clickable="true"
        data-media-state={mediaState}
        onClick={openDetail}
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
      </button>

      <div
        className="feed-lab-issue-card__actions"
        data-testid="feed-lab-card-actions"
        data-action-zones="4"
        data-lab-hit="actions-excluded"
        role="group"
        aria-label={labT('nextFeed.post.actions')}
        onClick={stopAction}
      >
        <button
          type="button"
          className="feed-lab-issue-card__action"
          data-zone="react"
          aria-label={labT('threadsFeed.post.action.react')}
          onClick={(e) => {
            stopAction(e)
            setReactionsOpenSignal((n) => n + 1)
          }}
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
          onClick={stopAction}
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
          onClick={stopAction}
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
          onClick={(e) => {
            stopAction(e)
            setReactionsOpenSignal((n) => n + 1)
          }}
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
        <LabReactionChromeDeprecated t={labT} openSignal={reactionsOpenSignal} />
      </div>

      <FeedLabDiscussionDeprecated fixture={fixture} initiallyExpanded={initiallyExpandDiscussion} />
    </article>
  )
}
