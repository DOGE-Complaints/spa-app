/**
 * PH-12 — discussion flags for current filtered board candidates.
 * sort-before-stable-list: ready=false while pending for non-empty enabled set.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { prefetchDiscussionFlags } from '../board/prefetchDiscussionFlags.js'
import { defaultThreadsSocialClient } from '../repositories/ThreadsSocialClient.js'

/**
 * @param {Array<{ id?: string }>} issues
 * @param {{
 *   enabled?: boolean,
 *   client?: ReturnType<typeof import('../repositories/ThreadsSocialClient.js').createThreadsSocialClient>,
 * }} [options]
 * @returns {{ flags: Map<string, boolean>, ready: boolean }}
 */
export function useBoardDiscussionFlags(issues, options = {}) {
  const enabled = options.enabled !== false
  const client = options.client || defaultThreadsSocialClient
  const issuesRef = useRef(issues)
  issuesRef.current = issues
  const idsKey = useMemo(() => {
    if (!Array.isArray(issues) || issues.length === 0) return ''
    return issues
      .map((issue) => (issue?.id === undefined || issue?.id === null ? '' : String(issue.id)))
      .filter((id) => id !== '')
      .join('|')
  }, [issues])

  const [flags, setFlags] = useState(() => new Map())
  const [ready, setReady] = useState(() => !enabled || !idsKey)

  useEffect(() => {
    if (!enabled || !idsKey) {
      setFlags(new Map())
      setReady(true)
      return undefined
    }

    let cancelled = false
    setReady(false)

    const snapshot = Array.isArray(issuesRef.current) ? issuesRef.current : []
    void prefetchDiscussionFlags(snapshot, { client })
      .then((next) => {
        if (cancelled) return
        setFlags(next)
        setReady(true)
      })
      .catch(() => {
        if (cancelled) return
        setFlags(new Map())
        setReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [client, enabled, idsKey])

  return { flags, ready }
}
