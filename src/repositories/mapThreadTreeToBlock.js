/**
 * Map threads tree envelope → IssueThreadBlock props (THR-07).
 * comment_id→id, body→label (truncate), parent_id, depth.
 */

/** Preview label length from body (presentation truncate). */
export const THREAD_COMMENT_LABEL_MAX = 160

/**
 * @param {unknown} body
 * @param {number} [maxLen]
 * @returns {string}
 */
export function truncateCommentLabel(body, maxLen = THREAD_COMMENT_LABEL_MAX) {
  const text = String(body ?? '').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLen) return text
  return `${text.slice(0, Math.max(0, maxLen - 1))}…`
}

/**
 * @param {unknown} raw
 * @returns {{ id: string, parentId?: string|null, depth: number, label: string }|null}
 */
export function mapApiCommentToNode(raw) {
  if (!raw || typeof raw !== 'object') return null
  const row = /** @type {Record<string, unknown>} */ (raw)
  const id = row.comment_id
  if (id === undefined || id === null || String(id).trim() === '') return null
  const depth = Number(row.depth)
  if (!Number.isFinite(depth) || depth < 0) return null
  const parentId = row.parent_id === undefined ? null : row.parent_id
  return {
    id: String(id),
    parentId: parentId === null || parentId === undefined ? null : String(parentId),
    depth: Math.floor(depth),
    label: truncateCommentLabel(row.body),
  }
}

/**
 * @param {unknown} result — SocialOk | SocialUnavailable | raw data
 * @returns {{ status: 'empty'|'populated'|'unavailable', comments: Array<{ id: string, parentId?: string|null, depth: number, label: string }> }}
 */
export function mapThreadTreeToBlock(result) {
  if (!result || typeof result !== 'object') {
    return { status: 'unavailable', comments: [] }
  }
  const r = /** @type {Record<string, unknown>} */ (result)
  if (r.status === 'unavailable') {
    return { status: 'unavailable', comments: [] }
  }

  const data =
    r.status === 'ok' && r.data && typeof r.data === 'object'
      ? /** @type {Record<string, unknown>} */ (r.data)
      : r.comments !== undefined
        ? r
        : null

  if (!data) {
    return { status: 'unavailable', comments: [] }
  }

  const rawComments = data.comments
  if (!Array.isArray(rawComments)) {
    return { status: 'unavailable', comments: [] }
  }

  /** @type {Array<{ id: string, parentId?: string|null, depth: number, label: string }>} */
  const comments = []
  for (const item of rawComments) {
    const node = mapApiCommentToNode(item)
    if (!node) {
      return { status: 'unavailable', comments: [] }
    }
    comments.push(node)
  }

  if (comments.length === 0) {
    return { status: 'empty', comments: [] }
  }
  return { status: 'populated', comments }
}
