import { describe, expect, it } from 'vitest'
import { bindNetworkPulse } from '../bindNetworkPulse.js'

const SAMPLE = {
  stories_collected: 42,
  languages: [{ key: 'et', count: 20 }],
  areas: [{ key: 'Kesklinn', count: 8 }],
  topics: [{ label: 'roads', axis: 'theme', count: 5 }],
  recent_stories_7d: 7,
  contributors: 99,
  voices: 12,
}

describe('bindNetworkPulse §2.2', () => {
  it('binds only approved fields', () => {
    const slots = bindNetworkPulse(SAMPLE)
    expect(slots.map((s) => s.id)).toEqual(['stories', 'areas', 'languages', 'topics', 'activity'])
    expect(slots.find((s) => s.id === 'stories').value).toBe(42)
    expect(slots.find((s) => s.id === 'areas').value).toBe(1)
    expect(slots.find((s) => s.id === 'activity').value).toBe(7)
  })

  it('omits Contributors/Voices even if present on payload', () => {
    const slots = bindNetworkPulse(SAMPLE)
    expect(slots.some((s) => /contributor|voice/i.test(s.id))).toBe(false)
    expect(slots.some((s) => s.field === 'contributors')).toBe(false)
  })

  it('omits empty or invalid slots', () => {
    expect(bindNetworkPulse({ stories_collected: 'nope', areas: [] })).toEqual([])
    expect(bindNetworkPulse(null)).toEqual([])
  })

  it('binds zero as a real count', () => {
    const slots = bindNetworkPulse({ stories_collected: 0 })
    expect(slots).toEqual([
      expect.objectContaining({ id: 'stories', value: 0 }),
    ])
  })
})
