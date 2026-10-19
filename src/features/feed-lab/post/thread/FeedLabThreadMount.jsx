import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ThreadMount,
  createFixtureAdapter,
  THREAD_STATE_FIXTURES,
} from '../../../thread-mount/index.js'
import { FeedLabReactionsMount } from '../reactions/FeedLabReactionsMount.jsx'

/**
 * Map lab feed fixture comments → ThreadMount nodes (body-only · no invent Identity).
 * CT-08: preserve parentId/depth for nest stands (M153).
 * @param {Array<{ id?: string, body?: string, parentId?: string|null, depth?: number }>|null|undefined} comments
 */
export function mapLabCommentsToThread(comments) {
  if (!Array.isArray(comments)) return []
  return comments
    .map((c, i) => ({
      id: c?.id || `lab-tm-${i}`,
      parentId: c?.parentId == null || c?.parentId === '' ? null : String(c.parentId),
      depth: Number.isFinite(c?.depth) ? Number(c.depth) : 0,
      body: typeof c?.body === 'string' ? c.body : '',
    }))
    .filter((c) => c.body)
}

/**
 * Feed-lab host for ThreadMount (CT-01/02/08/09).
 * FixtureAdapter default · CT-09 plugs FeedLabReactionsMount target=comment per node.
 * No invent HTTP / Live / Identity · no CR package rewrite · no people ownership in thread.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'|null} [status]
 * @param {Array|null} [comments] lab fixture comments
 * @param {'allowed'|'unverified'|'denied-unknown'|'stale'|null} [writeCapability]
 * @param {import('react').Ref} [apiRef]
 */
export function FeedLabThreadMount({
  status = null,
  comments = null,
  writeCapability = null,
  verifyGateVariant = null,
  verifiedReturn = false,
  narrow = false,
  apiRef = null,
  initiallyExpanded = false,
  initialDraft = '',
  branchDisclosure = false,
  /** @type {'empty'|'populated'} lab fixture reaction strip on comments */
  commentReactionInitialState = 'empty',
}) {
  const fromComments = comments != null
  const mapped = useMemo(() => mapLabCommentsToThread(comments), [comments])
  const derivedStatus =
    status ||
    (fromComments ? (mapped.length > 0 ? 'populated' : 'empty') : 'populated')

  const adapter = useMemo(() => createFixtureAdapter(derivedStatus), [derivedStatus])
  const fixture = THREAD_STATE_FIXTURES[derivedStatus] || THREAD_STATE_FIXTURES.populated
  const resolvedWrite =
    writeCapability || (fromComments ? 'allowed' : fixture.writeCapability || 'allowed')

  const [snap, setSnap] = useState(() =>
    fromComments
      ? { status: derivedStatus, comments: mapped, writeCapability: resolvedWrite }
      : { ...adapter.snapshot(), writeCapability: resolvedWrite },
  )
  const [expanded, setExpanded] = useState(Boolean(initiallyExpanded))

  useEffect(() => {
    if (fromComments) {
      setSnap({ status: derivedStatus, comments: mapped, writeCapability: resolvedWrite })
    } else {
      const next = adapter.snapshot()
      setSnap({ ...next, writeCapability: writeCapability || next.writeCapability })
    }
  }, [fromComments, derivedStatus, mapped, adapter, resolvedWrite, writeCapability])

  const renderCommentReactions = useCallback(
    ({ commentId }) => (
      <FeedLabReactionsMount
        target="comment"
        commentId={commentId}
        initialState={commentReactionInitialState}
        aggregatePlacement="inline"
      />
    ),
    [commentReactionInitialState],
  )

  async function handlePostComment(payload) {
    if (fromComments) {
      const body = typeof payload?.body === 'string' ? payload.body.trim() : ''
      if (!body) return { ok: false, reason: 'empty-body' }
      const parentId =
        payload?.parentId == null || payload.parentId === '' ? null : String(payload.parentId)
      let depth = 0
      if (parentId) {
        const parent = snap.comments.find((c) => c.id === parentId)
        depth = parent ? Number(parent.depth) + 1 : 0
      }
      const comment = {
        id: `lab-posted-${Date.now()}`,
        parentId,
        depth,
        body,
      }
      setSnap((prev) => ({
        ...prev,
        status: 'populated',
        comments: [...prev.comments, comment],
      }))
      return { ok: true, comment }
    }
    const result = await adapter.postComment(payload)
    if (result.ok) setSnap({ ...adapter.snapshot(), writeCapability: resolvedWrite })
    return result
  }

  return (
    <div
      className="feed-lab-thread-mount"
      data-testid="feed-lab-thread-mount"
      data-lab-thread-mount="true"
      data-lab-ct01="true"
      data-lab-ct02="true"
      data-lab-ct08="true"
      data-lab-ct09="true"
      data-lab-ct10="true"
      data-lab-thread-host="fixture"
      data-lab-thread-flush="true"
      data-lab-thread-status={snap.status}
      data-lab-write={resolvedWrite}
      data-lab-reactions-plug="comment"
    >
      <ThreadMount
        status={snap.status}
        comments={snap.comments}
        writeCapability={resolvedWrite}
        verifyGateVariant={verifyGateVariant}
        verifiedReturn={Boolean(verifiedReturn)}
        expanded={expanded}
        onExpandedChange={setExpanded}
        narrow={narrow}
        apiRef={apiRef}
        initialDraft={initialDraft}
        branchDisclosure={Boolean(branchDisclosure)}
        renderCommentReactions={renderCommentReactions}
        onPostComment={handlePostComment}
        onRetry={() => {
          if (fromComments) return
          adapter.retry().then((next) =>
            setSnap({ ...next, writeCapability: writeCapability || next.writeCapability }),
          )
        }}
      />
    </div>
  )
}
