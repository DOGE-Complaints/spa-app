/**
 * FE countries SSOT for phone country selector (M126 list).
 * SUPPORTED_DIAL_PREFIXES mirrors backend PHONE_ALLOWED_DIAL_PREFIXES (+372 only).
 */

/** @typedef {{ code: string, dialPrefix: string, flag: string, name: { en: string, et: string, ru: string } }} CountryRecord */

/** @type {readonly CountryRecord[]} */
export const COUNTRIES = Object.freeze([
  { code: 'EE', dialPrefix: '+372', flag: '🇪🇪', name: { en: 'Estonia', et: 'Eesti', ru: 'Эстония' } },
  { code: 'LV', dialPrefix: '+371', flag: '🇱🇻', name: { en: 'Latvia', et: 'Läti', ru: 'Латвия' } },
  { code: 'LT', dialPrefix: '+370', flag: '🇱🇹', name: { en: 'Lithuania', et: 'Leedu', ru: 'Литва' } },
  { code: 'FI', dialPrefix: '+358', flag: '🇫🇮', name: { en: 'Finland', et: 'Soome', ru: 'Финляндия' } },
  { code: 'SE', dialPrefix: '+46', flag: '🇸🇪', name: { en: 'Sweden', et: 'Rootsi', ru: 'Швеция' } },
  { code: 'DE', dialPrefix: '+49', flag: '🇩🇪', name: { en: 'Germany', et: 'Saksamaa', ru: 'Германия' } },
  { code: 'GB', dialPrefix: '+44', flag: '🇬🇧', name: { en: 'United Kingdom', et: 'Ühendkuningriik', ru: 'Великобритания' } },
  { code: 'US', dialPrefix: '+1', flag: '🇺🇸', name: { en: 'United States', et: 'Ameerika Ühendriigid', ru: 'США' } },
  { code: 'PL', dialPrefix: '+48', flag: '🇵🇱', name: { en: 'Poland', et: 'Poola', ru: 'Польша' } },
  { code: 'FR', dialPrefix: '+33', flag: '🇫🇷', name: { en: 'France', et: 'Prantsusmaa', ru: 'Франция' } },
])

/** Mirror of backend PHONE_ALLOWED_DIAL_PREFIXES — sync when backend changes. */
export const SUPPORTED_DIAL_PREFIXES = Object.freeze(['+372'])

export const DEFAULT_COUNTRY_CODE = 'EE'

/** @type {Record<string, { en: string, et: string, ru: string }>} */
const LEGACY_DIAL_PREFIX_NAMES = Object.freeze({
  '+7': { en: 'Russia', et: 'Venemaa', ru: 'Россия' },
  '+380': { en: 'Ukraine', et: 'Ukraina', ru: 'Украина' },
})

const DIAL_PREFIX_BY_COUNTRY = Object.fromEntries(COUNTRIES.map((country) => [country.dialPrefix, country]))

const SORTED_DIAL_PREFIXES = [
  ...new Set([
    ...Object.keys(DIAL_PREFIX_BY_COUNTRY),
    ...Object.keys(LEGACY_DIAL_PREFIX_NAMES),
  ]),
].sort((left, right) => right.length - left.length)

/**
 * @param {string} prefix
 * @returns {boolean}
 */
export function isSupportedDialPrefix(prefix) {
  return SUPPORTED_DIAL_PREFIXES.includes(prefix)
}

/**
 * @param {string} code
 * @returns {CountryRecord}
 */
export function getCountryByCode(code) {
  return COUNTRIES.find((country) => country.code === code) ?? COUNTRIES[0]
}

/**
 * @returns {CountryRecord}
 */
export function getDefaultCountry() {
  return getCountryByCode(DEFAULT_COUNTRY_CODE)
}

/**
 * @param {CountryRecord} country
 * @param {'en'|'et'|'ru'} locale
 * @returns {string}
 */
export function getCountryLabel(country, locale = 'en') {
  return country.name[locale] ?? country.name.en
}

/**
 * Derive display country from E.164 dial prefix (not IP geo).
 * @param {string | null | undefined} phoneE164
 * @param {'en'|'et'|'ru'} [locale='en']
 * @returns {{ dialPrefix: string, countryName: string, countryCode?: string }}
 */
export function dialPrefixToCountry(phoneE164, locale = 'en') {
  const normalized = String(phoneE164 ?? '').trim()
  if (!normalized.startsWith('+')) {
    return { dialPrefix: '', countryName: '' }
  }

  for (const prefix of SORTED_DIAL_PREFIXES) {
    if (!normalized.startsWith(prefix)) continue
    const fromDataset = DIAL_PREFIX_BY_COUNTRY[prefix]
    if (fromDataset) {
      return {
        dialPrefix: prefix,
        countryName: getCountryLabel(fromDataset, locale),
        countryCode: fromDataset.code,
      }
    }
    const legacy = LEGACY_DIAL_PREFIX_NAMES[prefix]
    if (legacy) {
      return {
        dialPrefix: prefix,
        countryName: legacy[locale] ?? legacy.en,
      }
    }
  }

  const fallbackMatch = normalized.match(/^\+(\d{1,3})/)
  const dialPrefix = fallbackMatch ? `+${fallbackMatch[1]}` : '+'
  return { dialPrefix, countryName: dialPrefix }
}
