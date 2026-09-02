/**
 * SSR-03 pin eligibility helpers (Architecture §2).
 * Pin = numeric geo.lat + geo.lon only; detail_level is not sufficient.
 */

/**
 * @param {import('../domain/types.js').Issue|null|undefined} issue
 * @returns {boolean}
 */
export function isIssuePinCapable(issue) {
  const geo = issue?.geo
  if (!geo || typeof geo !== 'object') return false
  return typeof geo.lat === 'number' && Number.isFinite(geo.lat) && typeof geo.lon === 'number' && Number.isFinite(geo.lon)
}

/**
 * @param {import('../domain/types.js').Issue[]} issues
 * @returns {import('../domain/types.js').Issue[]}
 */
export function listPinCapableIssues(issues) {
  if (!Array.isArray(issues)) return []
  return issues.filter(isIssuePinCapable)
}

/**
 * @param {import('../domain/types.js').Issue[]} issues
 * @returns {boolean}
 */
export function isMapEligible(issues) {
  return listPinCapableIssues(issues).length >= 1
}

/**
 * GeoJSON FeatureCollection for MapLibre cluster source (lon, lat order).
 * @param {import('../domain/types.js').Issue[]} issues
 * @param {(field: unknown) => string} resolveLocalizedText
 * @returns {GeoJSON.FeatureCollection}
 */
export function issuesToPinGeoJson(issues, resolveLocalizedText) {
  const features = listPinCapableIssues(issues).map((issue) => {
    const title =
      typeof resolveLocalizedText === 'function'
        ? resolveLocalizedText(issue.title) || String(issue.id)
        : String(issue.title ?? issue.id)
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [issue.geo.lon, issue.geo.lat],
      },
      properties: {
        id: issue.id,
        title,
        label: typeof issue.geo.label === 'string' ? issue.geo.label : '',
      },
    }
  })
  return { type: 'FeatureCollection', features }
}
