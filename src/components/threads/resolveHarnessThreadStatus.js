/** Harness-only thread status override (screenshot / local evidence). No social HTTP. */
const ALLOWED = new Set(['loading', 'empty', 'populated', 'unavailable'])

/**
 * @returns {'loading'|'empty'|'populated'|'unavailable'|null}
 */
export function peekHarnessThreadStatus() {
  if (typeof window === 'undefined') return null
  const forced = window.__THR01_FORCE_THREAD_STATUS__
  return ALLOWED.has(forced) ? forced : null
}

/**
 * @param {'loading'|'empty'|'populated'|'unavailable'} [fallback='empty']
 * @returns {'loading'|'empty'|'populated'|'unavailable'}
 */
export function resolveHarnessThreadStatus(fallback = 'empty') {
  return peekHarnessThreadStatus() ?? fallback
}
