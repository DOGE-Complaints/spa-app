import { GEO_ADMIN_FILTER_KEYS, createEmptyGeoAdminFilters } from '../i18n/geoAdminFilterKeys.js'

/**
 * Board filter state shape (applied = pending for SEARCH-02+05 scope).
 *
 * @typedef {Object} BoardFilterState
 * @property {string[]} status
 * @property {string} type
 * @property {string[]} labels
 * @property {string} search
 * @property {string} institution
 * @property {string} created_after
 * @property {string} created_before
 * @property {string[]} geo_district
 * @property {string[]} geo_settlement
 * @property {string[]} geo_region
 * @property {string[]} geo_country
 * @property {string[]} geo_postal_code
 */

const EMPTY_GEO = createEmptyGeoAdminFilters()

/** @type {BoardFilterState} */
export const EMPTY_BOARD_FILTERS = Object.freeze({
  status: [],
  type: '',
  labels: [],
  search: '',
  institution: '',
  created_after: '',
  created_before: '',
  ...EMPTY_GEO,
})

/**
 * @param {Partial<BoardFilterState>} [overrides]
 * @returns {BoardFilterState}
 */
export function createBoardFilterState(overrides = undefined) {
  const source = overrides && typeof overrides === 'object' ? overrides : {}
  const geo = createEmptyGeoAdminFilters()
  for (const key of GEO_ADMIN_FILTER_KEYS) {
    geo[key] = Array.isArray(source[key]) ? [...source[key]] : []
  }

  return {
    status: Array.isArray(source.status) ? [...source.status] : [],
    type: typeof source.type === 'string' ? source.type : '',
    labels: Array.isArray(source.labels) ? [...source.labels] : [],
    search: typeof source.search === 'string' ? source.search : '',
    institution: typeof source.institution === 'string' ? source.institution : '',
    created_after: typeof source.created_after === 'string' ? source.created_after : '',
    created_before: typeof source.created_before === 'string' ? source.created_before : '',
    ...geo,
  }
}

function normalizeList(values) {
  return [...new Set((Array.isArray(values) ? values : []).map((item) => String(item)))].sort()
}

function geoListsEqual(a, b) {
  return GEO_ADMIN_FILTER_KEYS.every(
    (key) => normalizeList(a[key]).join('|') === normalizeList(b[key]).join('|'),
  )
}

/**
 * @param {BoardFilterState | Partial<BoardFilterState>} a
 * @param {BoardFilterState | Partial<BoardFilterState>} b
 * @returns {boolean}
 */
export function areServerFiltersEqual(a, b) {
  const left = createBoardFilterState(a)
  const right = createBoardFilterState(b)
  const statusEqual = normalizeList(left.status).join('|') === normalizeList(right.status).join('|')
  const labelsEqual = normalizeList(left.labels).join('|') === normalizeList(right.labels).join('|')
  return (
    statusEqual &&
    left.type === right.type &&
    labelsEqual &&
    left.institution.trim() === right.institution.trim() &&
    left.created_after.trim() === right.created_after.trim() &&
    left.created_before.trim() === right.created_before.trim() &&
    geoListsEqual(left, right)
  )
}

/**
 * @param {BoardFilterState | Partial<BoardFilterState>} a
 * @param {BoardFilterState | Partial<BoardFilterState>} b
 * @returns {boolean}
 */
export function areBoardFiltersEqual(a, b) {
  const left = createBoardFilterState(a)
  const right = createBoardFilterState(b)
  return areServerFiltersEqual(left, right) && left.search.trim() === right.search.trim()
}

/**
 * @param {BoardFilterState | Partial<BoardFilterState>} filters
 * @returns {boolean}
 */
export function hasActiveBoardFilters(filters) {
  const state = createBoardFilterState(filters)
  const hasGeo = GEO_ADMIN_FILTER_KEYS.some((key) => state[key].length > 0)
  return (
    state.status.length > 0 ||
    !!state.type ||
    state.labels.length > 0 ||
    !!state.search.trim() ||
    !!state.institution.trim() ||
    !!state.created_after.trim() ||
    !!state.created_before.trim() ||
    hasGeo
  )
}
