import { describe, expect, it } from 'vitest'
import {
  normalizeOriginalLocales,
  shouldShowContentFallbackMarker,
  shouldShowMtMarker,
} from '../translationMarkers.js'

describe('translationMarkers helpers', () => {
  it('shouldShowMtMarker is false when original_locale is missing or empty', () => {
    expect(shouldShowMtMarker({}, 'en')).toBe(false)
    expect(shouldShowMtMarker({ original_locale: [] }, 'en')).toBe(false)
    expect(shouldShowMtMarker({ original_locale: undefined }, 'ru')).toBe(false)
  })

  it('shouldShowMtMarker follows original_locale membership', () => {
    const issue = { original_locale: ['et', 'ru'] }
    expect(shouldShowMtMarker(issue, 'et')).toBe(false)
    expect(shouldShowMtMarker(issue, 'ru')).toBe(false)
    expect(shouldShowMtMarker(issue, 'en')).toBe(true)
  })

  it('normalizeOriginalLocales filters invalid codes', () => {
    expect(normalizeOriginalLocales({ original_locale: ['ru', 'xx', 'en'] })).toEqual(['ru', 'en'])
  })

  it('shouldShowContentFallbackMarker when resolved locale differs', () => {
    expect(
      shouldShowContentFallbackMarker({
        usedFallback: true,
        requestedLocale: 'et',
        resolvedLocale: 'ru',
      }),
    ).toBe(true)
    expect(
      shouldShowContentFallbackMarker({
        usedFallback: false,
        requestedLocale: 'et',
        resolvedLocale: 'et',
      }),
    ).toBe(false)
  })
})
