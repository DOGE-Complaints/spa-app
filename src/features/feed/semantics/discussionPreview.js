/**
 * Closed discussion preview mapping — literal `comments[].body` only (FR-VL-04.2).
 * No paraphrasing / invent fields.
 */

export const COLLAPSED_PREVIEW_LIMIT = 2

/**
 * @param {Array<{ body?: unknown }>|null|undefined} comments
 * @param {number} [limit]
 * @returns {string[]}
 */
export function selectPreviewBodies(comments, limit = COLLAPSED_PREVIEW_LIMIT) {
  const cap =
    Number.isFinite(Number(limit)) && Number(limit) > 0 ? Math.floor(Number(limit)) : COLLAPSED_PREVIEW_LIMIT
  if (!Array.isArray(comments)) return []
  return comments
    .map((c) => String(c?.body ?? '').trim())
    .filter(Boolean)
    .slice(0, cap)
}
