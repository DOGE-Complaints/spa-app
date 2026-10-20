import { useRef, useState } from 'react'
import { FeedPostIdentity } from './FeedPostIdentity.jsx'
import { FeedPostTitle } from './FeedPostTitle.jsx'
import { FeedPostSummary } from './FeedPostSummary.jsx'
import { FeedPostOpenIssue } from './FeedPostOpenIssue.jsx'
import { FeedPostMedia } from './FeedPostMedia.jsx'
import { FeedPostActionStrip } from './FeedPostActionStrip.jsx'
import { FeedLabReactionsMount } from './reactions/FeedLabReactionsMount.jsx'
import {
  FeedLabThreadMount,
  fixtureNeedsBranchDisclosure,
} from './thread/FeedLabThreadMount.jsx'
import './FeedPostCard.css'

/**
 * LAB-07…09 greenfield civic post card — M150 anatomy + M154 reactions + M152 discussion.
 * CR-09: root React in strip reactSlot — no under-strip duplicate mount.
 * CR-12: React-always · aggregate row below strip · Reactions zone → activateAggregate.
 * CR-15: M154 composition wire marker for OP eye (CR-11…14 held).
 * CR-16: media flush above strip · React chip hover (strip CSS).
 * CR-21: Reactions zone → people with peopleAnchor = Reactions control · chip parity.
 * CR-22: measure-then-fix media plate bg · layout gap already 0 (see measure-cause).
 * CT-02: Comment zone → ThreadMount apiRef · flush under strip · strip stays dumb.
 * CT-08: L-cut ThreadMount host · data-lab-thread-mount · no dual discussion plane.
 */
export function FeedPostCard({
  fixture,
  onOpenDetail = null,
  onActionZone = null,
  t = null,
  locale = 'en',
}) {
  const [aggregateHost, setAggregateHost] = useState(null)
  const reactionsApiRef = useRef(null)
  const threadApiRef = useRef(null)

  function openDetail(event) {
    if (typeof onOpenDetail !== 'function') return
    onOpenDetail(fixture.publicId, event?.currentTarget ?? null)
  }

  function handleZone(zoneId, event) {
    if (zoneId === 'comment') {
      // CT-02: same orchestration grammar as Reactions → people (apiRef)
      threadApiRef.current?.expand?.()
      threadApiRef.current?.focusComposer?.()
    }
    if (zoneId === 'reactions') {
      reactionsApiRef.current?.activateAggregate?.({
        anchorEl: event?.currentTarget ?? null,
      })
    }
    if (typeof onActionZone === 'function') onActionZone(zoneId, event)
  }

  const reactionInitialState = fixture.reactionStripState || 'empty'

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
      data-lab-aggregate="below"
      data-lab-cr15-wire="true"
      data-lab-cr16-polish="true"
      data-lab-cr21-affordance="true"
      data-lab-cr22-flush="true"
      data-lab-ct02="true"
      data-lab-ct08="true"
      data-lab-ct15="true"
      data-lab-thread-mount="true"
      data-lab-media-flush="true"
      data-lab-narrow={fixture.narrow ? 'true' : 'false'}
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
      </div>
      <div
        className="feed-post-card__media"
        data-testid="feed-card-media-flush"
        data-lab-media-flush="true"
      >
        <FeedPostMedia media={fixture.media} onOpenDetail={onOpenDetail ? openDetail : null} />
      </div>
      <FeedPostActionStrip
        onZone={handleZone}
        reactSlot={
          <FeedLabReactionsMount
            target="thread-root"
            initialState={reactionInitialState}
            t={t}
            locale={locale}
            aggregatePlacement="below"
            aggregateHost={aggregateHost}
            apiRef={reactionsApiRef}
          />
        }
      />
      <div
        ref={setAggregateHost}
        className="feed-post-card__aggregate-host"
        data-testid="feed-post-aggregate-host"
        data-lab-aggregate-host="true"
      />
      <div
        className="feed-post-card__thread-host"
        data-testid="feed-post-thread-host"
        data-lab-thread-flush="true"
        data-lab-ct02="true"
        data-lab-ct08="true"
        data-lab-thread-mount="true"
      >
        <FeedLabThreadMount
          comments={fixture.comments}
          apiRef={threadApiRef}
          narrow={Boolean(fixture.narrow)}
          branchDisclosure={
            fixture.branchDisclosure === true || fixtureNeedsBranchDisclosure(fixture.comments)
          }
          issueId={typeof fixture.publicId === 'string' ? fixture.publicId : null}
          reactionsAggregateConfirmed={fixture.reactionStripState === 'populated'}
          commentReactionInitialState={
            fixture.reactionStripState === 'populated' ? 'populated' : 'empty'
          }
        />
      </div>
    </article>
  )
}
