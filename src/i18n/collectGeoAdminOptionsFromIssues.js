import { GEO_ADMIN_FILTER_KEYS, GEO_ADMIN_PAYLOAD_KEYS } from './geoAdminFilterKeys.js'

/**
 * @typedef {Record<import('./geoAdminFilterKeys.js').GeoAdminFilterKey, string[]>} GeoAdminOptionsByDimension
 */

/**
 * Unique admin geo filter values from loaded issues (D-S8).
 *
 * @param {Array<{ geo?: Record<string, unknown> }>} issues
 * @returns {GeoAdminOptionsByDimension}
 */
export function collectGeoAdminOptionsFromIssues(issues) {
  /** @type {Record<string, Set<string>>} */
  const buckets = Object.fromEntries(GEO_ADMIN_FILTER_KEYS.map((key) => [key, new Set()]))

  if (!Array.isArray(issues)) {
    return Object.fromEntries(GEO_ADMIN_FILTER_KEYS.map((key) => [key, []]))
  }

  for (const issue of issues) {
    const geo = issue?.geo
    if (!geo || typeof geo !== 'object') continue

    for (const filterKey of GEO_ADMIN_FILTER_KEYS) {
      const payloadKey = GEO_ADMIN_PAYLOAD_KEYS[filterKey]
      const raw = geo[payloadKey]
      if (raw === undefined || raw === null) continue
      const trimmed = String(raw).trim()
      if (trimmed) buckets[filterKey].add(trimmed)
    }
  }

  /** @type {GeoAdminOptionsByDimension} */
  const result = {}
  for (const filterKey of GEO_ADMIN_FILTER_KEYS) {
    result[filterKey] = Array.from(buckets[filterKey]).sort((a, b) => a.localeCompare(b))
  }
  return result
}
