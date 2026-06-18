import { LOCALE_CODES } from '../i18n/core.js'

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
