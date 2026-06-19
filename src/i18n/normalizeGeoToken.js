/**
 * Gateway-aligned geo token normalization (scope.py normalize_geo_token).
 *
 * @param {string | null | undefined} value
 * @returns {string}
 */
export function normalizeGeoToken(value) {
  if (value == null) return ''
  const lowered = String(value).trim().toLowerCase()
  let out = ''
  for (const ch of lowered) {
    if (/[\p{L}\p{N}]/u.test(ch)) out += ch
  }
  return out
}
