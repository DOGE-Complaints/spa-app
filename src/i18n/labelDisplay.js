/**
 * Humanize canonical slug when dictionary miss (approved fallback policy).
 * @param {string} key
 * @returns {string}
 */
export function humanizeLabelSlug(key) {
  return String(key)
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * @param {(k: string) => string} t
 * @param {string} key
 * @returns {{ text: string, usedHumanize: boolean }}
 */
export function formatLabelKeyWithMeta(t, key) {
  const dictKey = `labels.${key}`
  const translated = t(dictKey)
  if (translated !== dictKey) {
    return { text: translated, usedHumanize: false }
  }
  return { text: humanizeLabelSlug(key), usedHumanize: true }
}

/**
 * @param {(k: string) => string} t
 * @param {string} key
 * @returns {string}
 */
export function formatLabelKey(t, key) {
  return formatLabelKeyWithMeta(t, key).text
}
