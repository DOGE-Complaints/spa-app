import { describe, expect, it } from 'vitest'
import {
  CHROME_BACKDROP_MODES,
  DEFAULT_MOCK_ISSUES,
  FEED_BACKDROP_MODES,
  MOCK_FEED_ISSUE_ID,
  MOCK_FEED_TITLE_EN,
  isChromeBackdropMode,
  normalizeBackdropMode,
} from '../boardFeedBackdrop.mjs'

describe('boardFeedBackdrop helper (PH-07)', () => {
  it('normalizes results|empty|error', () => {
    expect(normalizeBackdropMode('results')).toBe('results')
    expect(normalizeBackdropMode('empty')).toBe('empty')
    expect(normalizeBackdropMode('error')).toBe('error')
    expect(normalizeBackdropMode({ mode: 'results' })).toBe('results')
  })

  it('rejects unknown modes', () => {
    expect(() => normalizeBackdropMode('filtered')).toThrow(/Invalid board feed backdrop mode/)
    expect(() => normalizeBackdropMode('')).toThrow(/Invalid board feed backdrop mode/)
  })

  it('marks results|empty as chrome-safe modes', () => {
    expect(CHROME_BACKDROP_MODES).toEqual(['results', 'empty'])
    expect(FEED_BACKDROP_MODES).toContain('error')
    expect(isChromeBackdropMode('results')).toBe(true)
    expect(isChromeBackdropMode('empty')).toBe(true)
    expect(isChromeBackdropMode('error')).toBe(false)
  })

  it('exports stable mock results markers for positive chrome assert', () => {
    expect(MOCK_FEED_ISSUE_ID).toBe('ISSUE-PH07-1')
    expect(MOCK_FEED_TITLE_EN).toBe('Mock feed item one')
    expect(DEFAULT_MOCK_ISSUES[0].id).toBe(MOCK_FEED_ISSUE_ID)
    expect(DEFAULT_MOCK_ISSUES[0].title.en).toBe(MOCK_FEED_TITLE_EN)
  })
})
