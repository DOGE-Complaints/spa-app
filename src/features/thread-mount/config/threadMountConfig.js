/**
 * CT-01 / CT-03 / CT-05 / ARCH §4.2 — named knobs; never magic literals in JSX.
 * VISUAL_INDENT_CAP ≠ maxDepth (M153): indent columns vs reply eligibility.
 * maxAttachments — pending local-intent ceiling (not published media).
 */

export const DEFAULT_MAX_DEPTH = 3
export const DEFAULT_MAX_ATTACHMENTS = 1
/** Visual indent columns only — not the reply permission limit. */
export const VISUAL_INDENT_CAP = 3

export const MAX_DEPTH_REACHED_COPY = 'Maximum reply depth reached'

/** CT-06 M153 local branch disclosure — no invent branch-fetch HTTP */
export const BRANCH_LOADING_COPY = 'Loading replies…'
export const BRANCH_ERROR_TITLE = 'Couldn’t load replies'
export const BRANCH_ERROR_RETRY = 'Try again'
export const BRANCH_EXPAND_DELAY_MS = 400

/**
 * View N replies — only when count derivable from complete local tree.
 * @param {number} count
 */
export function viewRepliesLabel(count) {
  const n = Math.floor(Number(count))
  if (!Number.isFinite(n) || n <= 0) return 'View replies'
  if (n === 1) return 'View replies'
  return `View ${n} replies`
}

/** M153 E — denied item copy (fixture / legal floor honesty) */
export const ATTACH_DENIED_TITLE = 'This attachment can’t be added.'
export const ATTACH_DENIED_DETAIL = 'It does not meet the required media safety rules.'
/** When node capability unavailable — omit/disable Attach */
export const ATTACH_UNAVAILABLE_COPY = 'Attachments are unavailable here.'
export const ATTACH_READY_STATUS_COPY = 'Ready to post'
export const ATTACH_LOCAL_INTENT_COPY = 'Local intent · not published'

/** Default allow-list for fixture Attach control (not invent HTTP) */
export const DEFAULT_MEDIA_ALLOWED_TYPES = Object.freeze(['image', 'file'])

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
 * Pending intents cannot exceed maxAttachments (named config — never JSX magic).
 * @param {unknown[]} intents
 * @param {unknown} maxAttachments
 */
export function clampAttachmentIntents(intents, maxAttachments) {
  const max = resolveMaxAttachments(maxAttachments)
  const list = Array.isArray(intents) ? intents : []
  if (max <= 0) return []
  return list.slice(0, max)
}

/**
 * @param {unknown} currentCount
 * @param {unknown} maxAttachments
 */
export function canAddAttachment(currentCount, maxAttachments) {
  const max = resolveMaxAttachments(maxAttachments)
  const n = Number(currentCount)
  if (!Number.isFinite(n) || n < 0) return max > 0
  return n < max
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
