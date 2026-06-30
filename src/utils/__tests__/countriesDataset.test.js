import { describe, expect, it } from 'vitest'
import {
  COUNTRIES,
  SUPPORTED_DIAL_PREFIXES,
  dialPrefixToCountry,
  getCountryByCode,
  getDefaultCountry,
  isSupportedDialPrefix,
} from '../countriesDataset.js'

describe('countriesDataset', () => {
  it('exposes M126 country list with localized names', () => {
    expect(COUNTRIES).toHaveLength(10)
    expect(getCountryByCode('FR').dialPrefix).toBe('+33')
    expect(getCountryByCode('EE').name.ru).toBe('Эстония')
  })

  it('defaults to Estonia', () => {
    expect(getDefaultCountry().code).toBe('EE')
  })

  it('mirrors backend supported dial prefixes (FR-10.2)', () => {
    expect(SUPPORTED_DIAL_PREFIXES).toEqual(['+372'])
    expect(isSupportedDialPrefix('+372')).toBe(true)
    expect(isSupportedDialPrefix('+49')).toBe(false)
  })

  it('dialPrefixToCountry resolves dataset and legacy prefixes', () => {
    expect(dialPrefixToCountry('+37255555555', 'en').countryName).toBe('Estonia')
    expect(dialPrefixToCountry('+4912345', 'en')).toEqual({
      dialPrefix: '+49',
      countryName: 'Germany',
      countryCode: 'DE',
    })
    expect(dialPrefixToCountry('+7999', 'en').countryName).toBe('Russia')
  })
})
