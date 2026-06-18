import { ISSUE_STATUS, ISSUE_TYPE } from '../domain/types.js'

/**
 * Board URL query SSOT (CSV in single keys).
 *
 * SEARCH-02/04 scope: status, type, labels, search, institution, created_after, created_before.
 * Future keys (parse/serialize no-op until SEARCH-05):
 * - geo_district, geo_settlement, geo_region, geo_country, geo_postal_code (CSV each)
 * - geo_lat_min, geo_lat_max, geo_lon_min, geo_lon_max (bbox)
 */

const ALLOWED_STATUS = new Set(Object.values(ISSUE_STATUS))
const ALLOWED_TYPE = new Set(Object.values(ISSUE_TYPE))
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function toSearchParams(input) {
  if (input instanceof URLSearchParams) return input
  const raw = typeof input === 'string' ? input : ''
  const normalized = raw.startsWith('?') ? raw.slice(1) : raw
  return new URLSearchParams(normalized)
}

function parseCsv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function unique(items) {
  return [...new Set(items)]
}

function trimParam(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function parseDateParam(value) {
  const trimmed = trimParam(value)
  if (!trimmed) return ''
  if (ISO_DATE_RE.test(trimmed)) return trimmed
  const datePrefix = trimmed.slice(0, 10)
  return ISO_DATE_RE.test(datePrefix) ? datePrefix : ''
}

export function parseBoardQuery(input) {
  const params = toSearchParams(input)
  const status = unique(parseCsv(params.get('status')).filter((item) => ALLOWED_STATUS.has(item)))
  const labels = unique(parseCsv(params.get('labels')))
  const type = ALLOWED_TYPE.has(params.get('type')) ? params.get('type') : ''
  const search = trimParam(params.get('search'))
  const institution = trimParam(params.get('institution'))
  const created_after = parseDateParam(params.get('created_after'))
  const created_before = parseDateParam(params.get('created_before'))

  return {
    status,
    type,
    labels,
    search,
    institution,
    created_after,
    created_before,
  }
}

export function serializeBoardQuery(filters) {
  const params = new URLSearchParams()

  if (Array.isArray(filters?.status) && filters.status.length > 0) {
    const safeStatus = unique(filters.status.filter((item) => ALLOWED_STATUS.has(item)))
    if (safeStatus.length > 0) params.set('status', safeStatus.join(','))
  }

  if (typeof filters?.type === 'string' && ALLOWED_TYPE.has(filters.type)) {
    params.set('type', filters.type)
  }

  if (Array.isArray(filters?.labels) && filters.labels.length > 0) {
    const safeLabels = unique(filters.labels.map((item) => String(item).trim()).filter(Boolean))
    if (safeLabels.length > 0) params.set('labels', safeLabels.join(','))
  }

  if (typeof filters?.search === 'string' && filters.search.trim()) {
    params.set('search', filters.search.trim())
  }

  if (typeof filters?.institution === 'string' && filters.institution.trim()) {
    params.set('institution', filters.institution.trim())
  }

  if (typeof filters?.created_after === 'string' && filters.created_after.trim()) {
    const date = parseDateParam(filters.created_after)
    if (date) params.set('created_after', date)
  }

  if (typeof filters?.created_before === 'string' && filters.created_before.trim()) {
    const date = parseDateParam(filters.created_before)
    if (date) params.set('created_before', date)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

export function serializeServerBoardQuery(input) {
  const filters = typeof input === 'string' || input instanceof URLSearchParams
    ? parseBoardQuery(input)
    : input
  return serializeBoardQuery({
    status: filters?.status ?? [],
    type: filters?.type ?? '',
    labels: filters?.labels ?? [],
    search: '',
    institution: filters?.institution ?? '',
    created_after: filters?.created_after ?? '',
    created_before: filters?.created_before ?? '',
  })
}

export function normalizeBoardSearch(input) {
  return serializeBoardQuery(parseBoardQuery(input))
}
