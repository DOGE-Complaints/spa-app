import { LOCALE_CODES } from './core.js'

/**
 * Canonical institution filter string for gateway exact-match (prefer et, then ru, en).
 *
 * @param {string | { et?: string, ru?: string, en?: string } | undefined} institution
 * @returns {string | null}
 */
export function institutionFilterValue(institution) {
  if (institution === undefined || institution === null) return null
  if (typeof institution === 'string') {
    const trimmed = institution.trim()
    return trimmed || null
  }
  if (typeof institution === 'object') {
    for (const lang of LOCALE_CODES) {
      const value = String(institution[lang] ?? '').trim()
      if (value) return value
    }
  }
  return null
}

/**
 * Unique institution filter values from loaded issues (D-S8).
 *
 * @param {Array<{ institution?: string | { et?: string, ru?: string, en?: string } }>} issues
 * @returns {string[]}
 */
export function collectInstitutionsFromIssues(issues) {
  const set = new Set()
  if (!Array.isArray(issues)) return []

  for (const issue of issues) {
    const value = institutionFilterValue(issue?.institution)
    if (value) set.add(value)
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b))
}
