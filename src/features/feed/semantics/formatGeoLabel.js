/**
 * Honest public geo label — omit when absent (no invent).
 * Pure helper — no classic chrome imports (AD-VL-01 / VL-01 t03).
 * @param {import('../../../domain/types.js').IssueGeo|undefined} geo
 * @returns {string}
 */
export function formatGeoLabel(geo) {
  if (!geo || typeof geo !== 'object') return ''
  if (typeof geo.label === 'string' && geo.label.trim()) return geo.label.trim()
  const parts = [geo.settlement, geo.district, geo.region, geo.country]
    .filter((p) => typeof p === 'string' && p.trim())
    .map((p) => p.trim())
  return parts.join(', ')
}
