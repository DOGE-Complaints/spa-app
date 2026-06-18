import { describe, expect, it } from 'vitest'
import { formatBoardDateDisplay } from '../formatBoardDateDisplay.js'

describe('formatBoardDateDisplay', () => {
  it('formats ISO date for ru locale', () => {
    expect(formatBoardDateDisplay('2026-06-18', 'ru')).toBe('18.06.2026')
  })

  it('formats ISO date for en locale', () => {
    expect(formatBoardDateDisplay('2026-06-18', 'en')).toMatch(/18[./]06[./]2026/)
  })

  it('returns empty string for empty or invalid input', () => {
    expect(formatBoardDateDisplay('', 'ru')).toBe('')
    expect(formatBoardDateDisplay('not-a-date', 'ru')).toBe('')
  })
})
