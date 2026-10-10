import { useEffect, useState } from 'react'

/** Narrow feed body breakpoint (M159 body claim — shell chrome OOS). */
export const FEED_NARROW_MQ = '(max-width: 719px)'

/**
 * @returns {boolean}
 */
export function useFeedNarrow() {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(FEED_NARROW_MQ).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined
    const mq = window.matchMedia(FEED_NARROW_MQ)
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return narrow
}
