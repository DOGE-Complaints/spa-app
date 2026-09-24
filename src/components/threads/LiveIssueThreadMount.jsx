import { useCallback, useEffect, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import { peekHarnessThreadStatus } from './resolveHarnessThreadStatus.js'
import { THR02_DEMO_COMMENTS, THR02_DEMO_MAX_DEPTH } from './thr02DemoFixture.js'
import { canWriteThreadsWithMe } from '../../auth/meIdentityVerified.js'
import {
  bindThreadsKnobsFocusRefresh,
  ensureThreadsKnobsCached,
} from '../../repositories/threadsKnobsCache.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../../repositories/mapThreadTreeToBlock.js'

/**
 * Live knobs→tree + comment write mount for /board and /issue/:id (THR-07/08).
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
      // FE pre-gate — never POST when unverified
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
    />
  )
}
