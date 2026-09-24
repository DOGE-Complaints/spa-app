import { useCallback, useEffect, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import { peekHarnessThreadStatus } from './resolveHarnessThreadStatus.js'
import { THR02_DEMO_COMMENTS, THR02_DEMO_MAX_DEPTH } from './thr02DemoFixture.js'
import { canWriteThreadsWithMe } from '../../auth/meIdentityVerified.js'
import { isReactionsV1Id } from './reactionsV1Catalog.js'
import {
  bindThreadsKnobsFocusRefresh,
  ensureThreadsKnobsCached,
} from '../../repositories/threadsKnobsCache.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../../repositories/mapThreadTreeToBlock.js'

/**
 * Live knobs→tree + comment/react/attach write mount for /board and /issue/:id (THR-07…09).
 * Harness window.__THR01_FORCE_THREAD_STATUS__ still overrides for Path A evidence.
 * Demo fixture only on harness populated — never as prod default.
 *
 * @param {{
 *   issueId: string,
 *   t: (k: string) => string,
 *   profile?: Record<string, unknown>|null,
 *   returnTo?: string,
 *   client?: ReturnType<typeof import('../../repositories/ThreadsSocialClient.js').createThreadsSocialClient>,
 * }} props
 */
export function LiveIssueThreadMount({
  issueId,
  t,
  profile = null,
  returnTo = '#/board',
  client = defaultThreadsSocialClient,
}) {
  const [status, setStatus] = useState(/** @type {'loading'|'empty'|'populated'|'unavailable'} */ ('loading'))
  const [comments, setComments] = useState(/** @type {Array} */ ([]))
  const [maxDepth, setMaxDepth] = useState(2)
  const [maxReactions, setMaxReactions] = useState(3)
  const [reactionsEnable, setReactionsEnable] = useState(/** @type {Record<string, boolean>|null} */ (null))
  const [mediaAllowedTypes, setMediaAllowedTypes] = useState(/** @type {string[]|null} */ (null))

  const load = useCallback(async () => {
    const harness = peekHarnessThreadStatus()
    if (harness) {
      setStatus(harness)
      setComments(harness === 'populated' ? [...THR02_DEMO_COMMENTS] : [])
      setMaxDepth(THR02_DEMO_MAX_DEPTH)
      return
    }

    setStatus('loading')
    setComments([])
    try {
      const knobs = await ensureThreadsKnobsCached({ client })
      if (!knobs) {
        setStatus('unavailable')
        return
      }
      setMaxDepth(knobs.max_depth)
      if (Number.isFinite(Number(knobs.max_reactions_per_actor)) && Number(knobs.max_reactions_per_actor) > 0) {
        setMaxReactions(Math.floor(Number(knobs.max_reactions_per_actor)))
      }
      setReactionsEnable(
        knobs.reactions_enable && typeof knobs.reactions_enable === 'object'
          ? /** @type {Record<string, boolean>} */ (knobs.reactions_enable)
          : null,
      )
      setMediaAllowedTypes(
        Array.isArray(knobs.media_allowed_types) ? knobs.media_allowed_types.map(String) : [],
      )
      const treeResult = await client.getThreadTree(issueId)
      const mapped = mapThreadTreeToBlock(treeResult)
      setComments(mapped.comments)
      setStatus(mapped.status)
    } catch {
      setStatus('unavailable')
      setComments([])
    }
  }, [client, issueId])

  useEffect(() => {
    const unbind = bindThreadsKnobsFocusRefresh({ client })
    void load()
    return unbind
  }, [client, load])

  const onSubmitComment = useCallback(
    async ({ body, parentId }) => {
      if (!canWriteThreadsWithMe(profile)) {
        return { status: 'fail', failKind: 'verify', op: parentId ? 'comment_reply' : 'comment_create' }
      }
      const text = String(body ?? '').trim()
      if (!text) {
        return { status: 'fail', failKind: 'post_fail', op: parentId ? 'comment_reply' : 'comment_create', reason: 'empty_body' }
      }

      if (parentId) {
        const parent = comments.find((c) => c.id === parentId)
        if (parent && parent.depth >= maxDepth) {
          return { status: 'fail', failKind: 'max_depth', op: 'comment_reply', reason: 'local_max_depth' }
        }
        return client.replyComment({ issueId, body: text, parentId })
      }
      return client.createComment({ issueId, body: text })
    },
    [client, comments, issueId, maxDepth, profile],
  )

  const onReact = useCallback(
    async ({ reactionId, op, target, commentId }) => {
      if (!canWriteThreadsWithMe(profile)) {
        return { status: 'fail', failKind: 'verify', op: 'react' }
      }
      if (!isReactionsV1Id(reactionId)) {
        return { status: 'fail', failKind: 'post_fail', op: 'react', reason: 'unknown_reaction_id' }
      }
      const targetKind = target === 'thread-root' ? 'thread_root' : 'comment'
      return client.react({
        issueId,
        targetKind,
        commentId: targetKind === 'thread_root' ? null : commentId,
        reactionId,
        op,
      })
    },
    [client, issueId, profile],
  )

  const onAttachRef = useCallback(
    async ({ refId, mediaType, commentId }) => {
      if (!canWriteThreadsWithMe(profile)) {
        return { status: 'fail', failKind: 'verify', op: 'attach_ref' }
      }
      const allow = Array.isArray(mediaAllowedTypes) ? mediaAllowedTypes : []
      if (allow.length > 0 && !allow.includes(String(mediaType))) {
        return { status: 'fail', failKind: 'attach_denied', op: 'attach_ref', reason: 'attach-denied' }
      }
      return client.attachRef({
        issueId,
        refId,
        mediaType,
        commentId,
        floorClass: 'ok',
      })
    },
    [client, issueId, mediaAllowedTypes, profile],
  )

  const onPostSuccess = useCallback(async () => {
    await load()
  }, [load])

  return (
    <IssueThreadBlock
      status={status}
      t={t}
      comments={comments}
      maxDepth={maxDepth}
      onRetry={load}
      profile={profile}
      returnTo={returnTo}
      onSubmitComment={onSubmitComment}
      onPostSuccess={onPostSuccess}
      onAttachRef={onAttachRef}
      mediaAllowedTypes={mediaAllowedTypes}
      maxReactions={maxReactions}
      reactionsEnable={reactionsEnable}
      onReact={onReact}
    />
  )
}
