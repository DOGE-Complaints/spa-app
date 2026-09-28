/**
 * Map threads tree envelope → IssueThreadBlock props (THR-07).
 * comment_id→id, body→label (truncate), parent_id, depth.
 * Reaction summaries (thread_root + per-comment) for reload persistence.
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
 * Option A (REQ10-05 / REQ10-02): optional actor `selected[]` on MarksSummary /
 * TreeCommentItem. Absent/anonymous → empty array (safe).
 * @param {unknown} raw
 * @returns {string[]}
 */
export function mapActorSelected(raw) {
  if (!raw || typeof raw !== 'object') return []
  const row = /** @type {Record<string, unknown>} */ (raw)
  if (!Array.isArray(row.selected)) return []
  return row.selected
    .map((id) => (id === undefined || id === null ? '' : String(id).trim()))
    .filter((id) => id !== '')
}

/**
 * @param {unknown} raw
 * @returns {{
 *   summaryMarks: Array<{ reaction_id: string, count: number }>|null,
 *   aggregateCount: number|null,
 *   selected: string[],
 * }}
 */
export function mapReactionSummaryPayload(raw) {
  if (!raw || typeof raw !== 'object') {
    return { summaryMarks: null, aggregateCount: null, selected: [] }
  }
  const row = /** @type {Record<string, unknown>} */ (raw)
  const marks = row.summary_marks
  /** @type {Array<{ reaction_id: string, count: number }>|null} */
  let summaryMarks = null
  if (Array.isArray(marks)) {
    summaryMarks = marks
      .filter((m) => m && typeof m === 'object' && /** @type {{reaction_id?: unknown}} */ (m).reaction_id)
      .map((m) => {
        const item = /** @type {{ reaction_id: unknown, count?: unknown }} */ (m)
        return {
          reaction_id: String(item.reaction_id),
          count: Number.isFinite(Number(item.count)) ? Number(item.count) : 0,
        }
      })
  }
  const agg = row.aggregate_count
  const aggregateCount =
    agg === undefined || agg === null || !Number.isFinite(Number(agg)) ? null : Number(agg)
  return { summaryMarks, aggregateCount, selected: mapActorSelected(row) }
}

/**
 * @param {unknown} raw
 * @returns {{
 *   id: string,
 *   parentId?: string|null,
 *   depth: number,
 *   label: string,
 *   summaryMarks?: Array<{ reaction_id: string, count: number }>|null,
 *   aggregateCount?: number|null,
 *   selected?: string[],
 * }|null}
 */
export function mapApiCommentToNode(raw) {
  if (!raw || typeof raw !== 'object') return null
  const row = /** @type {Record<string, unknown>} */ (raw)
  const id = row.comment_id
  if (id === undefined || id === null || String(id).trim() === '') return null
  const depth = Number(row.depth)
  if (!Number.isFinite(depth) || depth < 0) return null
  const parentId = row.parent_id === undefined ? null : row.parent_id
  const reaction = mapReactionSummaryPayload(row)
  return {
    id: String(id),
    parentId: parentId === null || parentId === undefined ? null : String(parentId),
    depth: Math.floor(depth),
    label: truncateCommentLabel(row.body),
    summaryMarks: reaction.summaryMarks,
    aggregateCount: reaction.aggregateCount,
    selected: reaction.selected,
  }
}

/**
 * @param {unknown} result — SocialOk | SocialUnavailable | raw data
 * @returns {{
 *   status: 'empty'|'populated'|'unavailable',
 *   comments: Array<{
 *     id: string,
 *     parentId?: string|null,
 *     depth: number,
 *     label: string,
 *     summaryMarks?: Array<{ reaction_id: string, count: number }>|null,
 *     aggregateCount?: number|null,
 *     selected?: string[],
 *   }>,
 *   threadRootReactions: {
 *     summaryMarks: Array<{ reaction_id: string, count: number }>|null,
 *     aggregateCount: number|null,
 *     selected: string[],
 *   },
 * }}
 */
export function mapThreadTreeToBlock(result) {
  const emptyRoot = { summaryMarks: null, aggregateCount: null, selected: [] }
  if (!result || typeof result !== 'object') {
    return { status: 'unavailable', comments: [], threadRootReactions: emptyRoot }
  }
  const r = /** @type {Record<string, unknown>} */ (result)
  if (r.status === 'unavailable') {
    return { status: 'unavailable', comments: [], threadRootReactions: emptyRoot }
  }

  const data =
    r.status === 'ok' && r.data && typeof r.data === 'object'
      ? /** @type {Record<string, unknown>} */ (r.data)
      : r.comments !== undefined
        ? r
        : null

  if (!data) {
    return { status: 'unavailable', comments: [], threadRootReactions: emptyRoot }
  }

  const rawComments = data.comments
  if (!Array.isArray(rawComments)) {
    return { status: 'unavailable', comments: [], threadRootReactions: emptyRoot }
  }

  const threadRootReactions = mapReactionSummaryPayload(data.thread_root_reactions)

  /** @type {Array<{ id: string, parentId?: string|null, depth: number, label: string, summaryMarks?: Array<{ reaction_id: string, count: number }>|null, aggregateCount?: number|null, selected?: string[] }>} */
  const comments = []
  for (const item of rawComments) {
    const node = mapApiCommentToNode(item)
    if (!node) {
      return { status: 'unavailable', comments: [], threadRootReactions: emptyRoot }
    }
    comments.push(node)
  }

  if (comments.length === 0) {
    return { status: 'empty', comments: [], threadRootReactions }
  }
  return { status: 'populated', comments, threadRootReactions }
}
