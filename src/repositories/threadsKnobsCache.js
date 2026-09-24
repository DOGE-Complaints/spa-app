/**
 * Knobs cache (THR-07): load once, refresh on window focus; expose max_depth.
 * Load knobs **before** tree-driven reply affordance (handoff 04).
 */

import { defaultThreadsSocialClient } from '../repositories/ThreadsSocialClient.js'

/** @typedef {{ max_depth: number, max_reactions_per_actor?: number, reactions_enable?: Record<string, boolean>, media_allowed_types?: string[] }} ThreadKnobsSnapshot */

/** @type {ThreadKnobsSnapshot|null} */
let cachedKnobs = null
/** @type {Promise<ThreadKnobsSnapshot|null>|null} */
let inflight = null
let focusBound = false

/**
 * @param {unknown} data
 * @returns {ThreadKnobsSnapshot|null}
 */
export function normalizeKnobsData(data) {
  if (!data || typeof data !== 'object') return null
  const maxDepth = Number(/** @type {{ max_depth?: unknown }} */ (data).max_depth)
  if (!Number.isFinite(maxDepth) || maxDepth < 1) return null
  return {
    max_depth: Math.floor(maxDepth),
    max_reactions_per_actor: /** @type {{ max_reactions_per_actor?: number }} */ (data)
      .max_reactions_per_actor,
    reactions_enable: /** @type {{ reactions_enable?: Record<string, boolean> }} */ (data)
      .reactions_enable,
    media_allowed_types: /** @type {{ media_allowed_types?: string[] }} */ (data)
      .media_allowed_types,
  }
}

/**
 * @param {{ client?: { getKnobs: () => Promise<unknown> }, force?: boolean }} [options]
 * @returns {Promise<ThreadKnobsSnapshot|null>}
 */
export async function ensureThreadsKnobsCached(options = {}) {
  const client = options.client || defaultThreadsSocialClient
  if (!options.force && cachedKnobs) {
    return cachedKnobs
  }
  if (!options.force && inflight) {
    return inflight
  }
  inflight = (async () => {
    const result = await client.getKnobs()
    if (!result || result.status !== 'ok') {
      cachedKnobs = null
      return null
    }
    const normalized = normalizeKnobsData(result.data)
    cachedKnobs = normalized
    return normalized
  })()
  try {
    return await inflight
  } finally {
    inflight = null
  }
}

/** @returns {ThreadKnobsSnapshot|null} */
export function getCachedThreadsKnobs() {
  return cachedKnobs
}

/** @returns {number|null} */
export function getCachedMaxDepth() {
  return cachedKnobs?.max_depth ?? null
}

/** Test / remount helper */
export function resetThreadsKnobsCache() {
  cachedKnobs = null
  inflight = null
}

/**
 * Bind window focus → refresh knobs (idempotent).
 * @param {{ client?: { getKnobs: () => Promise<unknown> } }} [options]
 */
export function bindThreadsKnobsFocusRefresh(options = {}) {
  if (typeof window === 'undefined') return () => {}
  if (focusBound) return () => {}
  focusBound = true
  const onFocus = () => {
    void ensureThreadsKnobsCached({ ...options, force: true })
  }
  window.addEventListener('focus', onFocus)
  return () => {
    window.removeEventListener('focus', onFocus)
    focusBound = false
  }
}

/** Test helper */
export function resetThreadsKnobsFocusBinding() {
  focusBound = false
}
