/**
 * CT-01 / CT-03 / ARCH §4.2 — named knobs; never magic literals in JSX.
 * VISUAL_INDENT_CAP ≠ maxDepth (M153): indent columns vs reply eligibility.
 */

export const DEFAULT_MAX_DEPTH = 3
export const DEFAULT_MAX_ATTACHMENTS = 1
/** Visual indent columns only — not the reply permission limit. */
export const VISUAL_INDENT_CAP = 3

export const MAX_DEPTH_REACHED_COPY = 'Maximum reply depth reached'

/** @typedef {'loading'|'empty'|'populated'|'unavailable'} ThreadMountStatus */

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxDepth(value, fallback = DEFAULT_MAX_DEPTH) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveVisualIndentCap(value, fallback = VISUAL_INDENT_CAP) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 */
export function resolveMaxAttachments(value, fallback = DEFAULT_MAX_ATTACHMENTS) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback
}

/**
 * Reply shown iff depth < maxDepth (config/props — never hardcode in JSX).
 * @param {unknown} depth
 * @param {unknown} maxDepth
 */
export function canReplyAtDepth(depth, maxDepth) {
  const d = Number(depth)
  const max = resolveMaxDepth(maxDepth)
  if (!Number.isFinite(d) || d < 0) return false
  return d < max
}

/**
 * Visual indent level capped separately from reply maxDepth.
 * @param {unknown} depth
 * @param {unknown} visualIndentCap
 */
export function visualIndentLevel(depth, visualIndentCap = VISUAL_INDENT_CAP) {
  const d = Number(depth)
  const cap = resolveVisualIndentCap(visualIndentCap)
  if (!Number.isFinite(d) || d < 0) return 0
  return Math.min(Math.floor(d), cap)
}
