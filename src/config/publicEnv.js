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
