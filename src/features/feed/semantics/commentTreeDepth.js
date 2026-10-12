/**
 * Closed comment-tree depth helpers — no invent threads fields.
 * Pure mapping over existing `depth` / `maxDepth` props (AD-VL-01/02 · VL-05).
 */

/** Visual indentation columns cap (DS §6) — independent of functional maxDepth. */
export const VISUAL_INDENT_CAP = 3

/**
 * @param {{ depth?: unknown }|null|undefined} node
 * @param {number} maxDepth
 * @returns {boolean}
 */
export function isAtMaxDepth(node, maxDepth) {
  const depth = Number(node?.depth)
  const cap = Number(maxDepth)
  if (!Number.isFinite(depth) || !Number.isFinite(cap)) return false
  return depth >= cap
}

/**
 * Functional ReplyDepthNotice — only when scene asks for max-depth honesty.
 * @param {{ depth?: unknown }|null|undefined} node
 * @param {number} maxDepth
 * @param {string|null|undefined} scene
 */
export function shouldShowDepthNotice(node, maxDepth, scene) {
  return scene === 'max-depth' && isAtMaxDepth(node, maxDepth)
}

/**
 * Clamp visual indent depth to DS visual cap (does not change functional Reply).
 * @param {unknown} depth
 * @returns {number}
 */
export function visualIndentDepth(depth) {
  const d = Number(depth)
  if (!Number.isFinite(d) || d < 0) return 0
  return Math.min(Math.floor(d), VISUAL_INDENT_CAP)
}
