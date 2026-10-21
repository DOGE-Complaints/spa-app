/**
 * NF-13 / M161 — exact issue.type → catalog URL map.
 * Case-sensitive wire keys only. Do not lowercase, synonym, or glob.
 * Unknown / missing → null (honest omit).
 */
export const ISSUE_TYPE_ICON_BY_TYPE = Object.freeze({
  INCIDENT: '/icons/next-feed/types/ic-issue-type-INCIDENT.svg',
  complaint: '/icons/next-feed/types/ic-issue-type-complaint.svg',
  system_bug: '/icons/next-feed/types/ic-issue-type-system_bug.svg',
  observation: '/icons/next-feed/types/ic-issue-type-observation.svg',
  absurdity: '/icons/next-feed/types/ic-issue-type-absurdity.svg',
})

/**
 * @param {unknown} type — exact `issue.type` wire string
 * @returns {string | null}
 */
export function issueTypeIconForType(type) {
  if (type == null) return null
  const key = String(type)
  if (!Object.prototype.hasOwnProperty.call(ISSUE_TYPE_ICON_BY_TYPE, key)) return null
  return ISSUE_TYPE_ICON_BY_TYPE[key]
}
