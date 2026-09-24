import { useCallback, useEffect, useState } from 'react'
import { IssueThreadBlock } from './IssueThreadBlock.jsx'
import { peekHarnessThreadStatus } from './resolveHarnessThreadStatus.js'
import { THR02_DEMO_COMMENTS, THR02_DEMO_MAX_DEPTH } from './thr02DemoFixture.js'
import {
  bindThreadsKnobsFocusRefresh,
  ensureThreadsKnobsCached,
} from '../../repositories/threadsKnobsCache.js'
import { defaultThreadsSocialClient } from '../../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../../repositories/mapThreadTreeToBlock.js'

/**
 * Live knobs→tree mount for /board and /issue/:id (THR-07).
 * Harness window.__THR01_FORCE_THREAD_STATUS__ still overrides for Path A evidence.
 * Demo fixture only on harness populated — never as prod default.
 *
 * @param {{ issueId: string, t: (k: string) => string, client?: ReturnType<typeof import('../../repositories/ThreadsSocialClient.js').createThreadsSocialClient> }} props
 */
export function LiveIssueThreadMount({ issueId, t, client = defaultThreadsSocialClient }) {
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

  return (
    <IssueThreadBlock
      status={status}
      t={t}
      comments={comments}
      maxDepth={maxDepth}
      onRetry={load}
    />
  )
}
