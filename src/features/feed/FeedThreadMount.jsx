import { useMemo } from 'react'
import { LiveIssueThreadMount } from '../../components/threads/index.js'
import { FeedDiscussionBlock } from './FeedDiscussionBlock.jsx'
import { NEXT_FEED_THREAD_ICONS } from './feedThreadIcons.js'
import { makeFeedThreadT } from './feedThreadT.js'

/**
 * Next-feed thread mount (NF-04/05/08): Closed ThreadsSocialClient + M152/M153 presentation.
 * Invite stub honesty secondary (no invent escalate HTTP). No M155 people surfaces.
 */
export function FeedThreadMount({ t, returnTo = '#/next/feed', ...rest }) {
  const threadT = useMemo(() => makeFeedThreadT(t), [t])
  return (
    <LiveIssueThreadMount
      {...rest}
      t={threadT}
      returnTo={returnTo}
      iconPack={NEXT_FEED_THREAD_ICONS}
      showInviteStub={true}
      BlockComponent={FeedDiscussionBlock}
    />
  )
}
