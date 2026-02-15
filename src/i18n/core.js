export const SUPPORTED_LOCALES = Object.freeze(['et', 'ru', 'en'])
export const LOCALE_STORAGE_KEY = 'doge.locale'

export function normalizeLocale(value) {
  if (typeof value !== 'string') return null
  const lower = value.toLowerCase()
  if (lower.startsWith('et')) return 'et'
  if (lower.startsWith('ru')) return 'ru'
  if (lower.startsWith('en')) return 'en'
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

  return 'et'
}

export function resolveLocalizedText(field, locale) {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (typeof field !== 'object') return ''

  if (field[locale]) return field[locale]
  if (field.et) return field.et
  if (field.ru) return field.ru
  if (field.en) return field.en
  return ''
}
