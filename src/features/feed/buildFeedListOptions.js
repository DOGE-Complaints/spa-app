import { ISSUE_STATUS } from '../../domain/types.js'
import { GEO_ADMIN_FILTER_KEYS } from '../../i18n/geoAdminFilterKeys.js'

/**
 * Public next-feed list options for `issueService.getIssues`.
 * Always locks `status=PUBLISHED` (DUI-Q01).
 * Passes trimmed `search` when non-empty (REQ-56 / AD-VP-03 · DUI-Q12 lift).
 *
 * @param {import('../../router/boardFilterState.js').BoardFilterState | object} boardFilters
 */
export function buildFeedListOptions(boardFilters = {}) {
  const options = {
    status: [ISSUE_STATUS.PUBLISHED],
    type: boardFilters.type || undefined,
    labels: Array.isArray(boardFilters.labels) && boardFilters.labels.length > 0
      ? boardFilters.labels
      : undefined,
    institution: boardFilters.institution || undefined,
    created_after: boardFilters.created_after || undefined,
    created_before: boardFilters.created_before || undefined,
  }
  for (const key of GEO_ADMIN_FILTER_KEYS) {
    if (Array.isArray(boardFilters[key]) && boardFilters[key].length > 0) {
      options[key] = boardFilters[key]
    }
  }
  if (typeof boardFilters.search === 'string' && boardFilters.search.trim()) {
    options.search = boardFilters.search.trim()
  }
  return options
}
