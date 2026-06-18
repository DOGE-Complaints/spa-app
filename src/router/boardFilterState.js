/**
 * Board filter state shape (applied = pending for SEARCH-02 scope).
 *
 * @typedef {Object} BoardFilterState
 * @property {string[]} status
 * @property {string} type
 * @property {string[]} labels
 * @property {string} search
 */

/**
 * Future URL/repo keys (SEARCH-04/05) — documented only, no runtime in SEARCH-02.
 *
 * @typedef {Object} FutureBoardFilterFields
 * @property {string} [institution]
 * @property {string} [created_after]
 * @property {string} [created_before]
 * @property {string[]} [geo_district]
 * @property {string[]} [geo_settlement]
 * @property {string[]} [geo_region]
 * @property {string[]} [geo_country]
 * @property {string[]} [geo_postal_code]
 */

/** @type {BoardFilterState} */
export const EMPTY_BOARD_FILTERS = Object.freeze({
  status: [],
  type: '',
  labels: [],
  search: '',
})

/**
 * @param {Partial<BoardFilterState>} [overrides]
 * @returns {BoardFilterState}
 */
export function createBoardFilterState(overrides = undefined) {
  const source = overrides && typeof overrides === 'object' ? overrides : {}
  return {
    status: Array.isArray(source.status) ? [...source.status] : [],
    type: typeof source.type === 'string' ? source.type : '',
    labels: Array.isArray(source.labels) ? [...source.labels] : [],
    search: typeof source.search === 'string' ? source.search : '',
  }
}

function normalizeList(values) {
  return [...new Set((Array.isArray(values) ? values : []).map((item) => String(item)))].sort()
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
  return statusEqual && left.type === right.type && labelsEqual
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
  return (
    state.status.length > 0 ||
    !!state.type ||
    state.labels.length > 0 ||
    !!state.search.trim()
  )
}
