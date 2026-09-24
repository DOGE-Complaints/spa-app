/**
 * Single Vite public-env normalize seam (BUG-08).
 * Repositories may still defensively normalize constructor args; algorithm is this module.
 */

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizePublicBaseUrl(raw) {
  return String(raw ?? '').trim().replace(/\/+$/, '')
}

/**
 * Trim public string (mode, flags, keys). Does not strip URL slashes.
 * @param {string} key
 * @param {Record<string, unknown>} [env]
 * @returns {string}
 */
export function getVitePublicString(key, env = import.meta.env) {
  return String(env?.[key] ?? '').trim()
}

/**
 * Trim + strip trailing slashes from a public base URL key.
 * @param {string} key
 * @param {Record<string, unknown>} [env]
 * @returns {string}
 */
export function getVitePublicUrl(key, env = import.meta.env) {
  return normalizePublicBaseUrl(env?.[key])
}

/** Vite public key for doge-threads base (THR-07). Local default documented in `.env.example`. */
export const VITE_THREADS_BASE_URL_KEY = 'VITE_THREADS_BASE_URL'

/**
 * Resolve threads HTTP base URL (trim + strip trailing slashes).
 * @param {Record<string, unknown>} [env]
 * @returns {string}
 */
export function getThreadsBaseUrl(env = import.meta.env) {
  return getVitePublicUrl(VITE_THREADS_BASE_URL_KEY, env)
}

/**
 * When social wire is enabled, base URL must be non-empty.
 * @param {Record<string, unknown>} [env]
 * @returns {string}
 * @throws {Error} when required and missing
 */
export function assertThreadsBaseUrl(env = import.meta.env) {
  const base = getThreadsBaseUrl(env)
  if (!base) {
    throw new Error(`${VITE_THREADS_BASE_URL_KEY} is required when threads social wire is enabled`)
  }
  return base
}
