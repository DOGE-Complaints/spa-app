/**
 * CT-01 / ARCH §4.2 — named knobs; never magic literals in JSX.
 * VISUAL_INDENT_CAP ≠ maxDepth (M153 owns depth UX later).
 */

export const DEFAULT_MAX_DEPTH = 3
export const DEFAULT_MAX_ATTACHMENTS = 1
export const VISUAL_INDENT_CAP = 3

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} ThreadMountStatus */

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxDepth(value, fallback = DEFAULT_MAX_DEPTH) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxAttachments(value, fallback = DEFAULT_MAX_ATTACHMENTS) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}
