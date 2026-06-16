import { AVAILABLE_LABELS } from './labelKeys.js'

/**
 * Builds deterministic unique label keys from loaded issues.
 * By default we keep curated translated core labels in the set
 * so the filter remains stable on narrow/empty issue slices.
 *
 * @param {Array<{labels?: string[]}>} issues
 * @param {{ includeCore?: boolean }} [options]
 * @returns {string[]}
 */
export function collectLabelKeysFromIssues(issues, options = {}) {
  const includeCore = options.includeCore !== false
  const set = new Set()

  if (includeCore) {
    for (const label of AVAILABLE_LABELS) {
      set.add(String(label))
    }
  }

  if (Array.isArray(issues)) {
    for (const issue of issues) {
      if (!Array.isArray(issue?.labels)) continue
      for (const label of issue.labels) {
        const normalized = String(label).trim()
        if (normalized) set.add(normalized)
      }
    }
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b))
}
