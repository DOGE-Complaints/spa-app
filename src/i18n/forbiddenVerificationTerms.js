import { UI_DICTIONARY } from './dictionaries.js'
import { SUPPORTED_LOCALES } from './core.js'
import { IDENTITY_FLAT_KEYS, IDENTITY_DICTIONARY_BY_LOCALE } from './identityDictionary.js'

export const VERIFICATION_FORBIDDEN_TERMS = Object.freeze([
  'KYC',
  'government identity check',
  'bank verification',
  'legal identity',
])

const IDENTITY_NAMESPACE_PREFIXES = Object.freeze([
  'auth.',
  'session.',
  'appShell.',
  'civic.',
  'phone.',
  'phoneError.',
  'verifyPage.',
  'dashboard.',
  'storyGate.',
  'gptBridge.',
  'waitlist.',
])

/**
 * @param {string} text
 * @returns {string|null}
 */
export function findForbiddenVerificationTerm(text) {
  const lower = String(text ?? '').toLowerCase()
  return VERIFICATION_FORBIDDEN_TERMS.find((term) => lower.includes(term.toLowerCase())) ?? null
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function isIdentityFlatKey(key) {
  return IDENTITY_NAMESPACE_PREFIXES.some((prefix) => key.startsWith(prefix))
}

function collectLeafStrings(node, path = '') {
  if (typeof node === 'string') {
    return path && isIdentityFlatKey(path) ? [node] : []
  }
  if (!node || typeof node !== 'object') {
    return []
  }
  return Object.entries(node).flatMap(([part, child]) => {
    const nextPath = path ? `${path}.${part}` : part
    return collectLeafStrings(child, nextPath)
  })
}

/**
 * Scan identity dictionary values in all locales (FR-09.4).
 * @returns {Array<{ locale: string, term: string, sample: string }>}
 */
export function scanIdentityDictionaryForbiddenTerms() {
  const hits = []
  for (const locale of Object.keys(IDENTITY_DICTIONARY_BY_LOCALE)) {
    const strings = collectLeafStrings(IDENTITY_DICTIONARY_BY_LOCALE[locale])
    for (const sample of strings) {
      const term = findForbiddenVerificationTerm(sample)
      if (term) {
        hits.push({ locale, term, sample })
      }
    }
  }
  return hits
}

/**
 * @param {string} locale
 * @param {string} key dot-path
 * @returns {string|undefined}
 */
function resolveDictionaryKey(locale, key) {
  const parts = String(key).split('.')
  const chain = [locale, 'en', 'et']
  for (const code of chain) {
    let current = UI_DICTIONARY[code]
    for (const part of parts) {
      current = current?.[part]
    }
    if (typeof current === 'string') {
      return current
    }
  }
  return undefined
}

/**
 * Ensure story SSOT keys resolve in every locale dictionary.
 * @returns {string[]} missing `locale:key` entries
 */
export function findMissingIdentityDictionaryKeys() {
  const missing = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const key of IDENTITY_FLAT_KEYS) {
      if (typeof resolveDictionaryKey(locale, key) !== 'string') {
        missing.push(`${locale}:${key}`)
      }
    }
  }
  return missing
}
