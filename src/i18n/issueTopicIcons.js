/**
 * ES-05 topic icons — explicit catalog map only.
 * Map a real issue label to a catalog path. Do not glob ic-issue-topic-*.
 * Do not invent synonyms (e.g. mobility → transit).
 */
export const ISSUE_TOPIC_ICON_BY_LABEL = Object.freeze({
  transit: '/icons/early-signal-dashboard/ic-issue-topic-transit.png',
  greenspace: '/icons/early-signal-dashboard/ic-issue-topic-greenspace.png',
  lighting: '/icons/early-signal-dashboard/ic-issue-topic-lighting.png',
  waste: '/icons/early-signal-dashboard/ic-issue-topic-waste.png',
  housing: '/icons/early-signal-dashboard/ic-issue-topic-housing.png',
})

/**
 * @param {unknown} label
 * @returns {string | null}
 */
export function topicIconForLabel(label) {
  const key = String(label ?? '')
    .trim()
    .toLowerCase()
  if (!Object.prototype.hasOwnProperty.call(ISSUE_TOPIC_ICON_BY_LABEL, key)) return null
  return ISSUE_TOPIC_ICON_BY_LABEL[key]
}
