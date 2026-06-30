import { describe, expect, it } from 'vitest'
import { dialPrefixToCountry } from '../dialPrefixToCountry.js'

describe('dialPrefixToCountry', () => {
  it('maps +372 to Estonia', () => {
    expect(dialPrefixToCountry('+37288888888', 'en')).toEqual({
      dialPrefix: '+372',
      countryName: 'Estonia',
    })
  })

  it('maps +49 to Germany in ru locale', () => {
    expect(dialPrefixToCountry('+491701234567', 'ru')).toEqual({
      dialPrefix: '+49',
      countryName: 'Германия',
    })
  })

  it('falls back to dial prefix for unknown numbers', () => {
    expect(dialPrefixToCountry('+999123456', 'en')).toEqual({
      dialPrefix: '+999',
      countryName: '+999',
    })
  })

  it('returns empty values for invalid input', () => {
    expect(dialPrefixToCountry('', 'en')).toEqual({ dialPrefix: '', countryName: '' })
  })
})
