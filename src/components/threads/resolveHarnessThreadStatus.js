/** Harness-only thread status override (screenshot / local evidence). No social HTTP. */
const ALLOWED = new Set(['loading', 'empty', 'populated', 'unavailable'])

/**
 * @param {'loading'|'empty'|'populated'|'unavailable'} [fallback='empty']
 * @returns {'loading'|'empty'|'populated'|'unavailable'}
 */
export function resolveHarnessThreadStatus(fallback = 'empty') {
  if (typeof window === 'undefined') return fallback
  const forced = window.__THR01_FORCE_THREAD_STATUS__
  return ALLOWED.has(forced) ? forced : fallback
}
