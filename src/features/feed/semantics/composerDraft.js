/**
 * Closed composer draft helpers — no invent POST fields (VL-06 · AD-VL-01/02).
 */

/**
 * @param {string} draft
 * @param {{ label?: string }|null|undefined} attachment
 * @returns {boolean}
 */
export function isDraftDirty(draft, attachment = null) {
  const text = String(draft ?? '').trim()
  if (text.length > 0) return true
  return Boolean(attachment && (attachment.label || attachment.refId))
}
