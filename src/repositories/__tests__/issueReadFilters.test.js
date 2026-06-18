import { describe, expect, it } from 'vitest'
import {
  createdAtMatchesBounds,
  institutionPayloadMatches,
  normalizeCreatedAfterParam,
  normalizeCreatedBeforeParam,
} from '../issueReadFilters.js'

describe('issueReadFilters', () => {
  it('normalizes date-only bounds for inclusive gateway compare', () => {
    expect(normalizeCreatedAfterParam('2025-01-15')).toBe('2025-01-15T00:00:00Z')
    expect(normalizeCreatedBeforeParam('2025-01-15')).toBe('2025-01-15T23:59:59Z')
  })

  it('matches institution across i18n locales', () => {
    const payload = { et: 'Haigekassa', ru: 'Haigekassa', en: 'Health Insurance Fund' }
    expect(institutionPayloadMatches(payload, 'Health Insurance Fund')).toBe(true)
    expect(institutionPayloadMatches(payload, 'Missing')).toBe(false)
  })

  it('filters created_at with inclusive date bounds', () => {
    expect(createdAtMatchesBounds('2025-01-15T10:00:00Z', '2025-01-15', '2025-01-15')).toBe(true)
    expect(createdAtMatchesBounds('2025-01-14T10:00:00Z', '2025-01-15', '')).toBe(false)
    expect(createdAtMatchesBounds('2025-01-16T10:00:00Z', '', '2025-01-15')).toBe(false)
  })
})
