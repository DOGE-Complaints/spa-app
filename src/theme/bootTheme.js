/**
 * REQ21-03 theme boot — default `data-theme="dark"` when unset.
 * Persistence key `dogestonia.theme` is reserved for REQ21-04 (ThemeToggle) —
 * this module must not read or write localStorage.
 */

/** @typedef {'dark' | 'light'} ThemeName */

/** Reserved for REQ21-04 — do not use in REQ21-03 persistence. */
export const THEME_STORAGE_KEY = 'dogestonia.theme'

/**
 * Ensure documentElement has data-theme + color-scheme.
 * Default: dark when attribute absent (AC-SPA-REQ2103-03).
 * Does not consult OS prefers-color-scheme. Does not touch localStorage.
 *
 * @param {Document} [doc]
 * @returns {ThemeName}
 */
export function applyDefaultTheme(doc = document) {
  const root = doc.documentElement
  if (!root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', 'dark')
  }
  return syncColorScheme(root)
}

/**
 * Set theme attribute without persistence (tests + future toggle host).
 *
 * @param {string} theme
 * @param {Document} [doc]
 * @returns {ThemeName}
 */
export function setThemeAttribute(theme, doc = document) {
  const next = theme === 'light' ? 'light' : 'dark'
  const root = doc.documentElement
  root.setAttribute('data-theme', next)
  return syncColorScheme(root)
}

/**
 * @param {HTMLElement} root
 * @returns {ThemeName}
 */
function syncColorScheme(root) {
  const theme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  root.style.colorScheme = theme
  return theme
}
