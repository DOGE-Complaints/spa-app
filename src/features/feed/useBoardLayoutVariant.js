import { useEffect, useState } from 'react'
import { selectBoardLayoutVariant } from './semantics/boardLayoutVariant.js'

/**
 * Live BoardLayout variant from viewport width (content-plane only; shell OOS).
 * @returns {'compact'|'medium'|'wide'}
 */
export function useBoardLayoutVariant() {
  const [variant, setVariant] = useState(() => {
    if (typeof window === 'undefined') return 'medium'
    return selectBoardLayoutVariant(window.innerWidth)
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const onResize = () => setVariant(selectBoardLayoutVariant(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return variant
}
