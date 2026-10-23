import { useCallback, useEffect, useState } from 'react'
import {
  StoryActivityApiError,
  fetchStoryActivity,
} from '../services/storyActivityService.js'
import { STORY_ACTIVITY_STATES } from '../components/StoryActivity/storyActivityState.js'

const EMPTY_METRICS = Object.freeze({
  submitted: 0,
  published: 0,
  underReview: 0,
})

/**
 * Cabinet wire for `GET /story-activity`. Skips when disabled or DEV previewFlag set.
 * No invent rows · no contribution API.
 *
 * @param {{ enabled?: boolean, previewFlag?: string | null }} [opts]
 */
export function useCabinetStoryActivity({ enabled = true, previewFlag = null } = {}) {
  const skipLive = Boolean(previewFlag) || !enabled
  const [phase, setPhase] = useState(skipLive ? 'idle' : 'loading')
  const [metrics, setMetrics] = useState(EMPTY_METRICS)
  const [rows, setRows] = useState([])
  const [errorCode, setErrorCode] = useState('ACTIVITY_LOAD_FAILED')
  const [tick, setTick] = useState(0)

  const reload = useCallback(() => {
    setTick((n) => n + 1)
  }, [])

  useEffect(() => {
    if (skipLive) {
      setPhase('idle')
      return undefined
    }

    let cancelled = false
    setPhase('loading')

    ;(async () => {
      try {
        const result = await fetchStoryActivity()
        if (cancelled) return
        setMetrics(result.metrics)
        setRows(result.rows)
        setErrorCode('ACTIVITY_LOAD_FAILED')
        setPhase(result.rows.length > 0 ? 'active' : 'empty')
      } catch (err) {
        if (cancelled) return
        const code =
          err instanceof StoryActivityApiError
            ? err.code
            : 'ACTIVITY_LOAD_FAILED'
        setMetrics(EMPTY_METRICS)
        setRows([])
        setErrorCode(String(code).toUpperCase())
        setPhase('unavailable')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [skipLive, tick])

  let state = null
  if (!skipLive) {
    if (phase === 'loading') state = null
    else if (phase === 'active') state = STORY_ACTIVITY_STATES.ACTIVE
    else if (phase === 'empty') state = STORY_ACTIVITY_STATES.EMPTY
    else if (phase === 'unavailable') state = STORY_ACTIVITY_STATES.UNAVAILABLE
  }

  return {
    loading: !skipLive && phase === 'loading',
    state,
    metrics,
    rows,
    errorCode,
    reload,
  }
}
