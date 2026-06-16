/** Product SSOT for supported UI locales (endonyms are not translated). */
export const SUPPORTED_LOCALES = Object.freeze([
  Object.freeze({ code: 'et', endonym: 'Eesti', flag: '/assets/ET.svg', dir: 'ltr' }),
  Object.freeze({ code: 'ru', endonym: 'Русский', flag: '/assets/RU.svg', dir: 'ltr' }),
  Object.freeze({ code: 'en', endonym: 'English', flag: '/assets/US.svg', dir: 'ltr' }),
])

export const LOCALE_CODES = Object.freeze(SUPPORTED_LOCALES.map((entry) => entry.code))

export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0].code

/** Language selector options for Board/Issue header (maps registry → legacy UI shape). */
export const LOCALE_SELECTOR_OPTIONS = Object.freeze(
  SUPPORTED_LOCALES.map(({ code, endonym, flag }) =>
    Object.freeze({
      value: code,
      nativeLabel: endonym,
      flagSrc: flag,
    }),
  ),
)

export const LOCALE_STORAGE_KEY = 'doge.locale'

export function normalizeLocale(value) {
  if (typeof value !== 'string') return null
  const lower = value.toLowerCase()
  for (const { code } of SUPPORTED_LOCALES) {
    if (lower.startsWith(code)) return code
  }
  return null
}

export function resolveLanguage(browserLanguages = []) {
  const normalized =
    Array.isArray(browserLanguages) && browserLanguages.length > 0
      ? browserLanguages
      : [browserLanguages].filter(Boolean)

  for (const locale of normalized) {
    const resolved = normalizeLocale(locale)
    if (resolved) return resolved
  }

  return DEFAULT_LOCALE
}

export function resolveLocalizedText(field, locale) {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (typeof field !== 'object') return ''

  if (field[locale]) return field[locale]
  for (const code of LOCALE_CODES) {
    if (field[code]) return field[code]
  }
  return ''
}

/** UI dictionary fallback order: active locale, then remaining registry codes. */
export function localeDictionaryFallbackOrder(activeLocale) {
  const order = [activeLocale, ...LOCALE_CODES.filter((code) => code !== activeLocale)]
  const seen = new Set()
  const dictionaries = []
  for (const code of order) {
    if (!seen.has(code)) {
      seen.add(code)
      dictionaries.push(code)
    }
  }
  return dictionaries
}
