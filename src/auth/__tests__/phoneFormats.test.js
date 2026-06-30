import { describe, expect, it } from 'vitest'
import { COUNTRIES } from '../../utils/countriesDataset.js'
import {
  formatNationalLengthsLabel,
  formatPhoneForCountry,
  getPhoneFormatForCountry,
  PHONE_FORMAT_BY_COUNTRY,
  validatePhoneForCountry,
} from '../phoneFormats.js'

describe('phoneFormats', () => {
  it('exports format metadata for every selector country (FR-11.1)', () => {
    for (const country of COUNTRIES) {
      expect(PHONE_FORMAT_BY_COUNTRY[country.code]).toBeDefined()
      expect(PHONE_FORMAT_BY_COUNTRY[country.code].dialPrefix).toBe(country.dialPrefix)
    }
  })

  it('validates Estonia lengths (M127 EE)', () => {
    const ee = COUNTRIES.find((country) => country.code === 'EE')
    expect(validatePhoneForCountry(ee, '55555555').valid).toBe(true)
    expect(validatePhoneForCountry(ee, '55555').valid).toBe(false)
    expect(validatePhoneForCountry(ee, '').hintKey).toBe('phone.format.hint.empty')
  })

  it('validates Germany lengths (M127 DE)', () => {
    const de = COUNTRIES.find((country) => country.code === 'DE')
    expect(validatePhoneForCountry(de, '15123456789').valid).toBe(true)
    expect(validatePhoneForCountry(de, '1512345').valid).toBe(false)
    expect(validatePhoneForCountry(de, '1512345').hintKey).toBe('phone.format.hint.length')
  })

  it('validates Finland as third country', () => {
    const fi = COUNTRIES.find((country) => country.code === 'FI')
    expect(validatePhoneForCountry(fi, '401234567').valid).toBe(true)
    expect(formatPhoneForCountry(fi, '401234567')).toBe('+358401234567')
  })

  it('formats E.164 only when valid', () => {
    const ee = COUNTRIES.find((country) => country.code === 'EE')
    expect(formatPhoneForCountry(ee, '55555555')).toBe('+37255555555')
    expect(formatPhoneForCountry(ee, '55555')).toBeNull()
  })

  it('returns example placeholder per country', () => {
    expect(getPhoneFormatForCountry('DE').examplePlaceholder).toBe('1512 3456789')
    expect(getPhoneFormatForCountry('EE').examplePlaceholder).toBe('5555 5555')
  })

  it('formats national length labels', () => {
    expect(formatNationalLengthsLabel([7, 8])).toBe('7–8')
    expect(formatNationalLengthsLabel([10, 11])).toBe('10–11')
  })
})
