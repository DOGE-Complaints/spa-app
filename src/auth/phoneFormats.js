import { COUNTRIES, getCountryByCode, getCountryLabel, isSupportedDialPrefix } from '../utils/countriesDataset.js'

/**
 * @typedef {{
 *   countryCode: string,
 *   dialPrefix: string,
 *   supported: boolean,
 *   nationalNumberLengths: readonly number[],
 *   examplePlaceholder: string,
 * }} PhoneCountryFormat
 */

/** @type {Readonly<Record<string, Omit<PhoneCountryFormat, 'supported'>>>} */
const PHONE_FORMAT_ENTRIES = Object.freeze({
  EE: {
    countryCode: 'EE',
    dialPrefix: '+372',
    nationalNumberLengths: [7, 8],
    examplePlaceholder: '5555 5555',
  },
  LV: {
    countryCode: 'LV',
    dialPrefix: '+371',
    nationalNumberLengths: [8],
    examplePlaceholder: '2123 4567',
  },
  LT: {
    countryCode: 'LT',
    dialPrefix: '+370',
    nationalNumberLengths: [8],
    examplePlaceholder: '612 34567',
  },
  FI: {
    countryCode: 'FI',
    dialPrefix: '+358',
    nationalNumberLengths: [9, 10],
    examplePlaceholder: '40 1234567',
  },
  SE: {
    countryCode: 'SE',
    dialPrefix: '+46',
    nationalNumberLengths: [9, 10],
    examplePlaceholder: '70 123 45 67',
  },
  DE: {
    countryCode: 'DE',
    dialPrefix: '+49',
    nationalNumberLengths: [10, 11],
    examplePlaceholder: '1512 3456789',
  },
  GB: {
    countryCode: 'GB',
    dialPrefix: '+44',
    nationalNumberLengths: [10],
    examplePlaceholder: '7911 123456',
  },
  US: {
    countryCode: 'US',
    dialPrefix: '+1',
    nationalNumberLengths: [10],
    examplePlaceholder: '202 555 0123',
  },
  PL: {
    countryCode: 'PL',
    dialPrefix: '+48',
    nationalNumberLengths: [9],
    examplePlaceholder: '512 345 678',
  },
  FR: {
    countryCode: 'FR',
    dialPrefix: '+33',
    nationalNumberLengths: [9],
    examplePlaceholder: '6 12 34 56 78',
  },
})

/** SSOT: country code → format metadata (M127 §5). */
export const PHONE_FORMAT_BY_COUNTRY = Object.freeze(
  Object.fromEntries(
    COUNTRIES.map((country) => {
      const entry = PHONE_FORMAT_ENTRIES[country.code]
      if (!entry) {
        throw new Error(`Missing phone format for ${country.code}`)
      }
      return [
        country.code,
        Object.freeze({
          ...entry,
          supported: isSupportedDialPrefix(entry.dialPrefix),
        }),
      ]
    }),
  ),
)

/**
 * @param {import('../utils/countriesDataset.js').CountryRecord | string} country
 * @returns {PhoneCountryFormat}
 */
export function getPhoneFormatForCountry(country) {
  const code = typeof country === 'string' ? country : country.code
  return PHONE_FORMAT_BY_COUNTRY[code] ?? PHONE_FORMAT_BY_COUNTRY.EE
}

/**
 * @param {readonly number[]} lengths
 * @returns {string}
 */
export function formatNationalLengthsLabel(lengths) {
  const sorted = [...lengths].sort((left, right) => left - right)
  if (sorted.length === 0) return ''
  if (sorted.length === 1) return String(sorted[0])
  if (sorted.length === 2) return `${sorted[0]}–${sorted[1]}`
  const last = sorted[sorted.length - 1]
  return `${sorted.slice(0, -1).join(', ')} or ${last}`
}

/**
 * @param {import('../utils/countriesDataset.js').CountryRecord | string} country
 * @param {string} localDigits
 * @returns {string|null}
 */
export function formatPhoneForCountry(country, localDigits) {
  const digits = String(localDigits ?? '').replace(/\D/g, '')
  if (!digits) return null
  const format = getPhoneFormatForCountry(country)
  const e164 = `${format.dialPrefix}${digits}`
  const { valid } = validatePhoneForCountry(country, localDigits)
  return valid ? e164 : null
}

/**
 * @param {import('../utils/countriesDataset.js').CountryRecord | string} country
 * @param {string} localDigits
 * @param {'en'|'et'|'ru'} [locale='en']
 * @returns {{ valid: boolean, hintKey: string|null, hintParams: Record<string, string>|null }}
 */
export function validatePhoneForCountry(country, localDigits, locale = 'en') {
  const countryRecord = typeof country === 'string' ? getCountryByCode(country) : country
  const format = getPhoneFormatForCountry(countryRecord)
  const digits = String(localDigits ?? '').replace(/\D/g, '')
  const countryLabel = getCountryLabel(countryRecord, locale)

  if (!digits) {
    return {
      valid: false,
      hintKey: 'phone.format.hint.empty',
      hintParams: {},
    }
  }

  if (!format.nationalNumberLengths.includes(digits.length)) {
    return {
      valid: false,
      hintKey: 'phone.format.hint.length',
      hintParams: {
        country: countryLabel,
        prefix: format.dialPrefix,
        lengths: formatNationalLengthsLabel(format.nationalNumberLengths),
      },
    }
  }

  return { valid: true, hintKey: null, hintParams: null }
}
