/** Presentation demo nodes (M153 illustrative bodies). No invent HTTP / author identity. */
export const THR02_DEMO_COMMENTS = Object.freeze([
  {
    id: 'c-root',
    depth: 0,
    label: 'I can help coordinate a shared pet-care group for neighbours.',
    body: 'I can help coordinate a shared pet-care group for neighbours.',
  },
  {
    id: 'c-reply',
    depth: 1,
    parentId: 'c-root',
    label: 'A simple sign-up list would make it easier to start.',
    body: 'A simple sign-up list would make it easier to start.',
  },
  {
    id: 'c-nested',
    depth: 2,
    parentId: 'c-reply',
    label: 'We could list short visits and longer stays separately.',
    body: 'We could list short visits and longer stays separately.',
  },
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
