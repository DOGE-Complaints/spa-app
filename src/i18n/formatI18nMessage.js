/**
 * Substitute `{name}` placeholders in a localized template (FR-09.5).
 * @param {string} template
 * @param {Record<string, string | number>} [vars]
 * @returns {string}
 */
export function formatI18nMessage(template, vars = {}) {
  const text = String(template ?? '')
  return text.replace(/\{(\w+)\}/g, (match, name) => {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      return String(vars[name])
    }
    return match
  })
}
