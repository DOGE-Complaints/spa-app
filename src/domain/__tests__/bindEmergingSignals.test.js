import { describe, expect, it } from 'vitest'
import { bindEmergingSignals } from '../bindEmergingSignals.js'

describe('bindEmergingSignals §3', () => {
  it('binds label / axis / story_count only', () => {
    const cards = bindEmergingSignals({
      signals: [
        { label: 'roads', axis: 'theme', story_count: 4, issue_id: 'ISS-1' },
      ],
      top_n: 10,
    })
    expect(cards).toEqual([{ label: 'roads', axis: 'theme', storyCount: 4 }])
    expect(cards[0].issue_id).toBeUndefined()
  })

  it('returns empty for missing or empty signals — no fabricated rows', () => {
    expect(bindEmergingSignals({ signals: [] })).toEqual([])
    expect(bindEmergingSignals({ issues: [{ id: '1' }] })).toEqual([])
    expect(bindEmergingSignals(null)).toEqual([])
  })

  it('skips rows without label or integer story_count', () => {
    expect(
      bindEmergingSignals({
        signals: [
          { label: '', axis: 'theme', story_count: 2 },
          { label: 'ok', axis: 'theme', story_count: 1.5 },
          { label: 'ok', axis: 'theme' },
        ],
      }),
    ).toEqual([])
  })
})
