/**
 * PH-12 — spa-owned List discussion-priority sort.
 * Primary: hasDiscussion === true first.
 * Secondary: stable original index in the filtered candidate array.
 * Missing / false / unavailable → no boost.
 */

/**
 * @param {unknown} status — mapThreadTreeToBlock status
 * @returns {boolean}
 */
export function isDiscussionPopulatedStatus(status) {
  return status === 'populated'
}

/**
 * @param {Array<{ id?: string }>} issues
 * @param {Map<string, boolean>|Record<string, boolean>|null|undefined} hasDiscussionById
 * @returns {Array<{ id?: string }>}
 */
export function sortIssuesByDiscussionPriority(issues, hasDiscussionById) {
  if (!Array.isArray(issues)) return []

  const flagOf = (id) => {
    if (id === undefined || id === null) return false
    const key = String(id)
    if (hasDiscussionById instanceof Map) {
      return hasDiscussionById.get(key) === true
    }
    if (hasDiscussionById && typeof hasDiscussionById === 'object') {
      return hasDiscussionById[key] === true
    }
    return false
  }

  return issues
    .map((issue, index) => ({
      issue,
      index,
      boost: flagOf(issue?.id),
    }))
    .sort((a, b) => {
      if (a.boost !== b.boost) return a.boost ? -1 : 1
      return a.index - b.index
    })
    .map((row) => row.issue)
}
