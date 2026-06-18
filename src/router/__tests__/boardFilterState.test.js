import { describe, expect, it } from 'vitest'
import {
  areBoardFiltersEqual,
  areServerFiltersEqual,
  createBoardFilterState,
  EMPTY_BOARD_FILTERS,
  hasActiveBoardFilters,
} from '../boardFilterState.js'

describe('boardFilterState', () => {
  it('createBoardFilterState clones arrays', () => {
    const source = { status: ['NEW'], labels: ['waste'] }
    const state = createBoardFilterState(source)
    source.status.push('PUBLISHED')
    expect(state.status).toEqual(['NEW'])
  })

  it('areServerFiltersEqual ignores search', () => {
    const a = createBoardFilterState({ status: ['NEW'], search: 'foo' })
    const b = createBoardFilterState({ status: ['NEW'], search: 'bar' })
    expect(areServerFiltersEqual(a, b)).toBe(true)
    expect(areBoardFiltersEqual(a, b)).toBe(false)
  })

  it('areServerFiltersEqual compares institution and dates', () => {
    const base = createBoardFilterState({
      status: ['NEW'],
      institution: 'Haigekassa',
      created_after: '2025-01-01',
      created_before: '2025-02-01',
    })
    const same = createBoardFilterState({ ...base })
    const different = createBoardFilterState({ ...base, institution: 'Other' })

    expect(areServerFiltersEqual(base, same)).toBe(true)
    expect(areServerFiltersEqual(base, different)).toBe(false)
  })

  it('hasActiveBoardFilters detects search-only and institution/date', () => {
    expect(hasActiveBoardFilters(EMPTY_BOARD_FILTERS)).toBe(false)
    expect(hasActiveBoardFilters({ ...EMPTY_BOARD_FILTERS, search: 'road' })).toBe(true)
    expect(hasActiveBoardFilters({ ...EMPTY_BOARD_FILTERS, institution: 'Haigekassa' })).toBe(true)
    expect(hasActiveBoardFilters({ ...EMPTY_BOARD_FILTERS, created_after: '2025-01-01' })).toBe(true)
  })
})
