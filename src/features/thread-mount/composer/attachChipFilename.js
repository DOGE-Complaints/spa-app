/**
 * CT-25 M153c — filename middle ellipsis · preserve beginning + extension.
 * Visual truncate does not mutate the underlying name (SR/title keep full).
 */

/**
 * @param {string|null|undefined} name
 * @param {number} [maxLen]
 * @returns {string}
 */
export function middleEllipsisFileName(name, maxLen = 28) {
  if (typeof name !== 'string' || !name) return ''
  if (name.length <= maxLen) return name
  const lastDot = name.lastIndexOf('.')
  const hasExt = lastDot > 0 && lastDot < name.length - 1 && lastDot >= name.length - 8
  const ext = hasExt ? name.slice(lastDot) : ''
  const base = hasExt ? name.slice(0, lastDot) : name
  const budget = Math.max(6, maxLen - ext.length - 1)
  if (base.length <= budget) return name
  const head = Math.max(3, Math.ceil(budget * 0.55))
  const tail = Math.max(2, budget - head)
  return `${base.slice(0, head)}…${base.slice(-tail)}${ext}`
}

/**
 * M153c §8 family secondary labels (not filename substitutes).
 * @param {string|undefined} kind
 * @returns {string}
 */
export function attachFamilyLabel(kind) {
  switch (kind) {
    case 'image':
      return 'Image'
    case 'pdf':
      return 'PDF'
    case 'office':
      return 'Word'
    case 'markdown':
      return 'Markdown'
    default:
      return 'File'
  }
}

/**
 * Non-image / image-fallback type cue text.
 * @param {string|undefined} kind
 * @returns {string}
 */
export function attachTypeCue(kind) {
  switch (kind) {
    case 'image':
      return 'IMG'
    case 'pdf':
      return 'PDF'
    case 'office':
      return 'Word'
    case 'markdown':
      return 'MD'
    default:
      return 'FILE'
  }
}
