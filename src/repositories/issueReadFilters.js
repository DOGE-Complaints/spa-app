import { LOCALE_CODES } from '../i18n/core.js'
import {
  GEO_ADMIN_FILTER_KEYS,
  GEO_ADMIN_PAYLOAD_KEYS,
} from '../i18n/geoAdminFilterKeys.js'
import { normalizeGeoToken } from '../i18n/normalizeGeoToken.js'

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * @param {string | undefined} value
 * @returns {string | undefined}
 */
export function normalizeCreatedAfterParam(value) {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  if (!trimmed) return undefined
  if (ISO_DATE_RE.test(trimmed)) return `${trimmed}T00:00:00Z`
  return trimmed
}

/**
 * @param {string | undefined} value
 * @returns {string | undefined}
 */
export function normalizeCreatedBeforeParam(value) {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  if (!trimmed) return undefined
  if (ISO_DATE_RE.test(trimmed)) return `${trimmed}T23:59:59Z`
  return trimmed
}

/**
 * Gateway-aligned institution match (et/ru/en or legacy scalar).
 *
 * @param {unknown} payloadInstitution
 * @param {string} filterValue
 * @returns {boolean}
 */
export function institutionPayloadMatches(payloadInstitution, filterValue) {
  const normalized = filterValue.trim()
  if (!normalized) return true
  if (payloadInstitution === undefined || payloadInstitution === null) return false
  if (typeof payloadInstitution === 'object') {
    return LOCALE_CODES.some(
      (lang) => String(payloadInstitution[lang] ?? '').trim() === normalized,
    )
  }
  return String(payloadInstitution).trim() === normalized
}

/**
 * @param {string | undefined} createdAt
 * @param {string | undefined} createdAfter
 * @param {string | undefined} createdBefore
 * @returns {boolean}
 */
export function createdAtMatchesBounds(createdAt, createdAfter, createdBefore) {
  if (!createdAt || typeof createdAt !== 'string') return false
  const after = normalizeCreatedAfterParam(createdAfter)
  const before = normalizeCreatedBeforeParam(createdBefore)
  if (after && createdAt < after) return false
  if (before && createdAt > before) return false
  return true
}

/**
 * @param {Record<string, unknown> | undefined} options
 * @returns {boolean}
 */
export function anyGeoAdminFilterActive(options) {
  if (!options || typeof options !== 'object') return false
  return GEO_ADMIN_FILTER_KEYS.some(
    (key) => Array.isArray(options[key]) && options[key].length > 0,
  )
}

/**
 * Gateway-aligned admin geo match with drop-without-geo semantics.
 *
 * @param {Record<string, unknown> | null | undefined} issueGeo
 * @param {Record<string, unknown> | undefined} options
 * @returns {boolean}
 */
export function geoAdminPayloadMatches(issueGeo, options) {
  if (!anyGeoAdminFilterActive(options)) return true
  if (!issueGeo || typeof issueGeo !== 'object') return false

  for (const filterKey of GEO_ADMIN_FILTER_KEYS) {
    const filterValues = options[filterKey]
    if (!Array.isArray(filterValues) || filterValues.length === 0) continue

    const payloadKey = GEO_ADMIN_PAYLOAD_KEYS[filterKey]
    const token = normalizeGeoToken(String(issueGeo[payloadKey] ?? ''))
    if (!token) return false

    const matched = filterValues.some((value) => normalizeGeoToken(String(value)) === token)
    if (!matched) return false
  }

  return true
}
