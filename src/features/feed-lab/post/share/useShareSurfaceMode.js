import { useEffect, useState } from 'react'
import { SHARE_NARROW_MQ } from './shareIssueUrl.js'

/**
 * M152d: desktop popover · narrow (~390) bottom sheet.
 * @returns {'popover'|'sheet'}
 */
export function useShareSurfaceMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'popover'
    return window.matchMedia(SHARE_NARROW_MQ).matches ? 'sheet' : 'popover'
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined
    const mq = window.matchMedia(SHARE_NARROW_MQ)
    const onChange = () => setMode(mq.matches ? 'sheet' : 'popover')
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mode
}
