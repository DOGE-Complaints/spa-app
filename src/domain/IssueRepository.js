/**
 * Read-side repository contract for SPA MVP.
 *
 * Important:
 * - This contract is intentionally read-only for SPA MVP.
 * - `createIssue` is NOT part of this interface.
 *
 * @typedef {Object} IssueRepository
 * @property {(options?: unknown) => Promise<import('./types.js').Issue[]>} getIssues
 * @property {(id: string) => Promise<import('./types.js').Issue | null>} getIssue
 */

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * @param {unknown} candidate
 * @returns {candidate is IssueRepository}
 */
export function isIssueRepository(candidate) {
  if (!isRecord(candidate)) return false

  return (
    typeof candidate.getIssues === 'function' &&
    typeof candidate.getIssue === 'function'
  )
}

/**
 * @param {unknown} candidate
 * @returns {IssueRepository}
 */
export function assertIssueRepository(candidate) {
  if (!isIssueRepository(candidate)) {
    throw new Error('Invalid IssueRepository')
  }

  return candidate
}
