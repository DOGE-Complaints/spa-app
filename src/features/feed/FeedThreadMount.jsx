import { useMemo } from 'react'
import { LiveIssueThreadMount } from '../../components/threads/index.js'
import { NEXT_FEED_THREAD_ICONS } from './feedThreadIcons.js'
import { makeFeedThreadT } from './feedThreadT.js'

/**
 * Next-feed thread mount (NF-04): Closed ThreadsSocialClient + next-feed icons + L10N gaps.
 * No invent write paths; invite stub suppressed (NF-05).
 */
export function FeedThreadMount({ t, returnTo = '#/next/feed', ...rest }) {
  const threadT = useMemo(() => makeFeedThreadT(t), [t])
  return (
    <LiveIssueThreadMount
      {...rest}
      t={threadT}
      returnTo={returnTo}
      iconPack={NEXT_FEED_THREAD_ICONS}
      showInviteStub={false}
    />
  )
}
