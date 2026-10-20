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
      ...(Array.isArray(c?.attachments) && c.attachments.length > 0
        ? { attachments: c.attachments.map((a) => ({ ...a })) }
        : {}),
    }))
    .filter((c) => c.body)
}

/** CT-15 G-M4 — nest fixtures need local branch disclosure (CT-06 Present). */
export function fixtureNeedsBranchDisclosure(comments) {
  if (!Array.isArray(comments)) return false
  return comments.some((c) => c?.parentId != null && c.parentId !== '')
}

/**
 * Feed-lab host for ThreadMount (CT-01/02/08/09/20).
 * FixtureAdapter default · CT-09 plugs FeedLabReactionsMount target=comment per node.
 * No invent HTTP / Live / Identity · no CR package rewrite · no people ownership in thread.
 *
 * @param {'loading'|'empty'|'populated'|'unavailable'|null} [status]
 * @param {Array|null} [comments] lab fixture comments
 * @param {'allowed'|'unverified'|'denied-unknown'|'stale'|null} [writeCapability]
 * @param {import('react').Ref} [apiRef]
 * @param {number} [maxDepth] CT-20 LAB-4
 * @param {boolean} [attachmentsAvailable] CT-20 LAB-3
 * @param {boolean} [forcePostFail] CT-20 LAB-2 · fixture soft-fail · no invent HTTP
 */
export function FeedLabThreadMount({
  status = null,
  comments = null,
  writeCapability = null,
  verifyGateVariant = null,
  verifiedReturn = false,
  narrow = false,
  apiRef = null,
  /**
   * CT-21: `null` = auto-expand when populated; explicit bool overrides.
   * @type {boolean|null}
   */
  initiallyExpanded = null,
  initialDraft = '',
  branchDisclosure = false,
  /** CT-21 M152c · DFS first-paint budget */
  previewNodeBudget = undefined,
  /** @type {'empty'|'populated'} lab fixture reaction strip on comments */
  commentReactionInitialState = 'empty',
  /** CT-15 G-L5 */
  issueId = null,
  /** CT-15 G-M2 · soft CR aggregate confirmed only */
  reactionsAggregateConfirmed = false,
  maxDepth = undefined,
  attachmentsAvailable = true,
  forcePostFail = false,
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

  useEffect(() => {
    if (!fromComments && typeof adapter.setFailNextPost === 'function') {
      adapter.setFailNextPost(Boolean(forcePostFail))
    }
  }, [adapter, forcePostFail, fromComments])

  const [snap, setSnap] = useState(() =>
    fromComments
      ? { status: derivedStatus, comments: mapped, writeCapability: resolvedWrite }
      : { ...adapter.snapshot(), writeCapability: resolvedWrite },
  )

  function resolveInitialExpanded(statusValue, commentList) {
    if (initiallyExpanded != null) return Boolean(initiallyExpanded)
    /* CT-21 M152c · populated first paint expanded */
    if (statusValue === 'populated') return true
    return Array.isArray(commentList) && commentList.length > 0
  }

  const [expanded, setExpanded] = useState(() =>
    resolveInitialExpanded(
      fromComments ? derivedStatus : adapter.snapshot().status,
      fromComments ? mapped : adapter.snapshot().comments,
    ),
  )

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
      if (forcePostFail) {
        return {
          ok: false,
          reason: 'fixture-soft-fail',
          title: 'Comment wasn’t posted.',
          detail: 'Your text is still here. Try again.',
        }
      }
      const parentId =
        payload?.parentId == null || payload.parentId === '' ? null : String(payload.parentId)
      let depth = 0
      if (parentId) {
        const parent = snap.comments.find((c) => c.id === parentId)
        depth = parent ? Number(parent.depth) + 1 : 0
      }
      const readyAttach = Array.isArray(payload?.attachments)
        ? payload.attachments
            .filter((a) => a && a.status === 'ready' && a.id)
            .map((a) => ({ ...a }))
        : []
      const comment = {
        id: `lab-posted-${Date.now()}`,
        parentId,
        depth,
        body,
        ...(readyAttach.length > 0 ? { attachments: readyAttach } : {}),
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
      data-lab-ct15="true"
      data-lab-ct16="true"
      data-lab-ct20="true"
      data-lab-ct21="true"
      data-lab-ct22="true"
      data-lab-ct23="true"
      data-lab-comment-write-owner="host"
      data-lab-thread-host="fixture"
      data-lab-thread-flush="true"
      data-lab-thread-status={snap.status}
      data-lab-write={resolvedWrite}
      data-lab-reactions-plug="comment"
      data-lab-narrow={narrow ? 'true' : 'false'}
      data-lab-branch-disclosure={branchDisclosure ? 'true' : 'false'}
      data-lab-issue-id={typeof issueId === 'string' && issueId.trim() ? issueId.trim() : undefined}
      data-lab-residents-aggregate={reactionsAggregateConfirmed ? 'confirmed' : 'absent'}
      data-lab-force-post-fail={forcePostFail ? 'true' : 'false'}
      data-lab-attachments-available={attachmentsAvailable ? 'true' : 'false'}
      data-lab-max-depth={maxDepth != null ? String(maxDepth) : undefined}
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
        issueId={issueId}
        reactionsAggregateConfirmed={Boolean(reactionsAggregateConfirmed)}
        renderCommentReactions={renderCommentReactions}
        commentWriteOwner="host"
        onPostComment={handlePostComment}
        maxDepth={maxDepth}
        previewNodeBudget={previewNodeBudget}
        attachmentsAvailable={Boolean(attachmentsAvailable)}
        forcePostFail={Boolean(forcePostFail)}
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
