import { BUTTON_HIERARCHIES, BUTTON_SIZES, DEFAULT_HIERARCHY, DEFAULT_SIZE } from './buttonTypes.js'

/**
 * @param {unknown} hierarchy
 * @returns {import('./buttonTypes.js').ButtonHierarchy}
 */
export function normalizeHierarchy(hierarchy) {
  return BUTTON_HIERARCHIES.includes(/** @type {string} */ (hierarchy))
    ? /** @type {import('./buttonTypes.js').ButtonHierarchy} */ (hierarchy)
    : DEFAULT_HIERARCHY
}

/**
 * @param {unknown} size
 * @returns {import('./buttonTypes.js').ButtonSize}
 */
export function normalizeSize(size) {
  return BUTTON_SIZES.includes(/** @type {string} */ (size))
    ? /** @type {import('./buttonTypes.js').ButtonSize} */ (size)
    : DEFAULT_SIZE
}

/**
 * @param {boolean} isDev
 * @param {string} message
 */
export function warnDev(isDev, message) {
  if (isDev && typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(`[DS-BTN] ${message}`)
  }
}

/**
 * @param {{
 *   href?: string
 *   external?: boolean
 *   target?: string
 *   rel?: string
 * }} opts
 */
export function resolveLinkRel({ href, external, target, rel }) {
  if (!href) return undefined
  if (rel) return rel
  if (external || target === '_blank') {
    return 'noopener noreferrer'
  }
  return undefined
}

/**
 * @param {{
 *   href?: string
 *   external?: boolean
 *   target?: string
 * }} opts
 */
export function resolveLinkTarget({ href, external, target }) {
  if (!href) return undefined
  if (target) return target
  if (external) return '_blank'
  return undefined
}

/**
 * @param {string | undefined} className
 * @param {...(string | false | null | undefined)} parts
 */
export function cx(className, ...parts) {
  return [className, ...parts].filter(Boolean).join(' ')
}

export function isDevEnv() {
  return typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)
}
