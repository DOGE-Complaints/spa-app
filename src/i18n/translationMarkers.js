import { LOCALE_CODES, SUPPORTED_LOCALES } from './core.js'

/**
 * @param {import('../domain/types.js').Issue | { original_locale?: string[] }} issue
 * @returns {string[]}
 */
export function normalizeOriginalLocales(issue) {
  const raw = issue?.original_locale
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.filter((code) => LOCALE_CODES.includes(code))
}

/**
 * @param {import('../domain/types.js').Issue | { original_locale?: string[] }} issue
 * @param {string} locale
 * @returns {boolean}
 */
export function shouldShowMtMarker(issue, locale) {
  const originals = normalizeOriginalLocales(issue)
  if (originals.length === 0) return false
  return !originals.includes(locale)
}

/**
 * @param {{ usedFallback?: boolean, requestedLocale?: string, resolvedLocale?: string } | null | undefined} meta
 * @returns {boolean}
 */
export function shouldShowContentFallbackMarker(meta) {
  if (!meta?.usedFallback) return false
  if (!meta.resolvedLocale || !meta.requestedLocale) return false
  return meta.resolvedLocale !== meta.requestedLocale
}

/**
 * @param {string} code
 * @returns {string}
 */
export function getLocaleEndonym(code) {
  return SUPPORTED_LOCALES.find((entry) => entry.code === code)?.endonym ?? code
}
