/** Presentation demo nodes for M144 (non-believable placeholders). No invent HTTP. */
export const THR02_DEMO_COMMENTS = Object.freeze([
  { id: 'c-root', depth: 0, label: 'Comment preview' },
  { id: 'c-reply', depth: 1, parentId: 'c-root', label: 'Reply preview' },
  { id: 'c-nested', depth: 2, parentId: 'c-reply', label: 'Nested reply preview' },
])

/** Configured max depth for presentation demos — prop/knob, not a fixed product law. */
export const THR02_DEMO_MAX_DEPTH = 2

/**
 * Harness scenes for Path A screenshots (window.__THR02_FORCE_SCENE__).
 * @typedef {'nested'|'max-depth'|'reply'|'attach-allowed'|'attach-denied'|'post-fail'} Thr02Scene
 */
export function resolveHarnessThr02Scene(fallback = 'nested') {
  if (typeof window === 'undefined') return fallback
  const forced = window.__THR02_FORCE_SCENE__
  const allowed = new Set([
    'nested',
    'max-depth',
    'reply',
    'attach-allowed',
    'attach-denied',
    'post-fail',
  ])
  return allowed.has(forced) ? forced : fallback
}
