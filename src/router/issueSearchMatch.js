import { LOCALE_CODES } from '../i18n/core.js'

/**
 * @param {import('../domain/types.js').LocalizedText | string | null | undefined} field
 * @returns {string[]}
 */
function collectLocalizedFieldText(field) {
  if (!field) return []
  if (typeof field === 'string') return field.trim() ? [field] : []
  if (typeof field !== 'object') return []

  const parts = []
  for (const code of LOCALE_CODES) {
    const value = field[code]
    if (typeof value === 'string' && value.trim()) {
      parts.push(value)
    }
  }
  return parts
}

/**
 * @param {import('../domain/types.js').Issue | { title?: unknown, description?: unknown }} issue
 * @returns {string}
 */
export function collectIssueSearchableText(issue) {
  const titleParts = collectLocalizedFieldText(issue?.title)
  const descriptionParts = collectLocalizedFieldText(issue?.description)
  return [...titleParts, ...descriptionParts].join(' ')
}

/**
 * Client-side cross-locale substring match (D-S1): all et+ru+en title/description fields.
 *
 * @param {import('../domain/types.js').Issue | { title?: unknown, description?: unknown }} issue
 * @param {string} query
 * @returns {boolean}
 */
export function issueMatchesSearchQuery(issue, query) {
  const normalized = typeof query === 'string' ? query.trim() : ''
  if (!normalized) return true
  const haystack = collectIssueSearchableText(issue).toLowerCase()
  return haystack.includes(normalized.toLowerCase())
}
