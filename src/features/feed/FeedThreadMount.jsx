import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThreadMount, createLiveAdapter } from '../thread-mount/index.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import { getThreadsAccessToken } from '../../auth/threadsAccessToken.js'
import { FeedReactionsMount } from './FeedReactionsMount.jsx'

/**
 * Next-feed thread mount (CT-28 · CT-30 · CT-31 · Arch §15.1 / §16 / §17): ThreadMount + LiveAdapter → ThreadsSocialClient.
 * CR-23: comment-node React plugs ReactionsMount Live (`target=comment`).
 * CT-30: host-owned write · post → uploadAttachment → reload map published_url · no invent CDN.
 * CT-31 policy A: getAccessToken → CommentAttachmentPreview auth fetch+blob→objectURL.
 * Replaces FeedDiscussionBlock Done claim on `#/next/feed*`. Lab Fixture path unchanged.
 * No invent OP PASS / HTTP-09.
 */
export function FeedThreadMount({
  issueId = null,
  t = (k) => k,
  profile = null,
  returnTo: _returnTo = '#/next/feed',
  client = defaultThreadsSocialClient,
}) {
  const id = issueId === undefined || issueId === null ? '' : String(issueId).trim()

  const adapter = useMemo(
    () => createLiveAdapter({ issueId: id || null, client, profile }),
    [id, client, profile],
  )

  const [snap, setSnap] = useState(() => adapter.snapshot())
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    adapter.setProfile?.(profile)
  }, [adapter, profile])

  useEffect(() => {
    const unbind = typeof adapter.bindFocusRefresh === 'function' ? adapter.bindFocusRefresh() : () => {}
    let cancelled = false
    setSnap(adapter.snapshot())
    void adapter.load().then((next) => {
      if (cancelled) return
      setSnap(next)
      if (next.status === 'populated' || next.status === 'empty') {
        setExpanded(true)
      }
    })
    return () => {
      cancelled = true
      if (typeof unbind === 'function') unbind()
    }
  }, [adapter])

  async function handlePostComment(payload) {
    const result = await adapter.postComment(payload)
    if (result?.ok) {
      setSnap(adapter.snapshot())
    }
    return result
  }

  const renderCommentReactions = useCallback(
    ({ commentId }) => (
      <FeedReactionsMount
        issueId={id || null}
        target="comment"
        commentId={commentId}
        t={t}
        client={client}
        aggregatePlacement="inline"
      />
    ),
    [id, t, client],
  )

  const liveBound = Boolean(snap.live) && snap.reason !== 'live-adapter-unwired'
  const maxDepth = Number.isFinite(Number(snap.maxDepth)) ? Number(snap.maxDepth) : adapter.maxDepth

  return (
    <div
      className="feed-thread-mount"
      data-testid="feed-thread-mount"
      data-feed-ct28="true"
      data-feed-ct30="true"
      data-feed-ct31="true"
      data-feed-cr23="true"
      data-feed-thread-host="live"
      data-feed-live-bound={liveBound ? 'true' : 'false'}
      data-feed-live-reason={snap.reason || undefined}
      data-feed-thread-status={snap.status}
      data-feed-issue-id={id || undefined}
      data-feed-reactions-plug="live"
    >
      <ThreadMount
        status={snap.status}
        comments={snap.comments}
        writeCapability={snap.writeCapability}
        expanded={expanded}
        onExpandedChange={setExpanded}
        maxDepth={maxDepth}
        mediaAllowedTypes={adapter.mediaAllowedTypes ?? undefined}
        issueId={id || null}
        commentWriteOwner="host"
        onPostComment={handlePostComment}
        renderCommentReactions={renderCommentReactions}
        getAccessToken={getThreadsAccessToken}
        onRetry={() => {
          void adapter.retry().then(setSnap)
        }}
      />
    </div>
  )
}
