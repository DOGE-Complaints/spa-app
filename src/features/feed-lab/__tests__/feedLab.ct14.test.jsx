/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'

describe('CT-14 lab feed nest fixtures (G-L2)', () => {
  it('default fixtures include ≥1 card with nest depth ≥1', () => {
    const withNest = LAB_FEED_FIXTURES.filter((fx) =>
      fx.comments.some((c) => (c.depth ?? 0) >= 1 || c.parentId != null),
    )
    expect(withNest.length).toBeGreaterThanOrEqual(1)
    const card002 = LAB_FEED_FIXTURES.find((f) => f.publicId.includes('002'))
    expect(card002).toBeTruthy()
    const nested = card002.comments.filter((c) => c.parentId != null)
    expect(nested.length).toBeGreaterThanOrEqual(1)
    expect(nested.some((c) => c.depth >= 1)).toBe(true)
    expect(card002.comments.length).toBeLessThanOrEqual(2)
  })

  it('no invent HTTP in fixture module · fixtureOnly markers', () => {
    for (const fx of LAB_FEED_FIXTURES) {
      expect(fx.fixtureOnly).toBe(true)
      for (const c of fx.comments) {
        expect(c.fixtureOnly).toBe(true)
      }
    }
  })
})
