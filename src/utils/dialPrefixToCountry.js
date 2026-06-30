/** @type {Record<string, { en: string, et: string, ru: string }>} */
const DIAL_PREFIX_COUNTRY_NAMES = Object.freeze({
  '+372': { en: 'Estonia', et: 'Eesti', ru: 'Эстония' },
  '+371': { en: 'Latvia', et: 'Läti', ru: 'Латвия' },
  '+370': { en: 'Lithuania', et: 'Leedu', ru: 'Литва' },
  '+358': { en: 'Finland', et: 'Soome', ru: 'Финляндия' },
  '+46': { en: 'Sweden', et: 'Rootsi', ru: 'Швеция' },
  '+49': { en: 'Germany', et: 'Saksamaa', ru: 'Германия' },
  '+44': { en: 'United Kingdom', et: 'Ühendkuningriik', ru: 'Великобритания' },
  '+1': { en: 'United States', et: 'Ameerika Ühendriigid', ru: 'США' },
  '+7': { en: 'Russia', et: 'Venemaa', ru: 'Россия' },
  '+380': { en: 'Ukraine', et: 'Ukraina', ru: 'Украина' },
  '+48': { en: 'Poland', et: 'Poola', ru: 'Польша' },
})

const SORTED_DIAL_PREFIXES = Object.keys(DIAL_PREFIX_COUNTRY_NAMES).sort(
  (left, right) => right.length - left.length,
)

/**
 * Derive display country from E.164 dial prefix (not IP geo).
 * @param {string | null | undefined} phoneE164
 * @param {'en'|'et'|'ru'} [locale='en']
 * @returns {{ dialPrefix: string, countryName: string }}
 */
export function dialPrefixToCountry(phoneE164, locale = 'en') {
  const normalized = String(phoneE164 ?? '').trim()
  if (!normalized.startsWith('+')) {
    return { dialPrefix: '', countryName: '' }
  }

  for (const prefix of SORTED_DIAL_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      const names = DIAL_PREFIX_COUNTRY_NAMES[prefix]
      return {
        dialPrefix: prefix,
        countryName: names[locale] ?? names.en,
      }
    }
  }

  const fallbackMatch = normalized.match(/^\+(\d{1,3})/)
  const dialPrefix = fallbackMatch ? `+${fallbackMatch[1]}` : '+'
  return { dialPrefix, countryName: dialPrefix }
}
