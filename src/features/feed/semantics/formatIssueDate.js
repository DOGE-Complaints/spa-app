/**
 * Format created_at for civic identity meta (short date).
 * Pure helper — no classic chrome imports (AD-VL-01 / VL-01 t03).
 * @param {string} [value]
 * @returns {string}
 */
export function formatIssueDate(value) {
  if (!value || typeof value !== 'string') return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return value
  }
}
