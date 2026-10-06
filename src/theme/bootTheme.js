/**
 * Theme boot + persistence (REQ21-03 / REQ21-04).
 * Key: localStorage `dogestonia.theme` = `dark` | `light`.
 * No OS prefers-color-scheme. No account sync.
 */

/** @typedef {'dark' | 'light'} ThemeName */

export const THEME_STORAGE_KEY = 'dogestonia.theme'

/**
 * @param {Storage} [storage]
 * @returns {ThemeName | null}
 */
export function readStoredTheme(storage = localStorage) {
  try {
    const value = storage.getItem(THEME_STORAGE_KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

/**
 * @param {string} theme
 * @param {Storage} [storage]
 * @returns {ThemeName}
 */
export function writeStoredTheme(theme, storage = localStorage) {
  const next = theme === 'light' ? 'light' : 'dark'
  try {
    storage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    /* ignore quota / private mode */
  }
  return next
}

/**
 * Apply theme from storage when present; else default dark when unset.
 * Does not consult OS prefers-color-scheme.
 *
 * @param {Document} [doc]
 * @param {Storage} [storage]
 * @returns {ThemeName}
 */
export function applyDefaultTheme(doc = document, storage = localStorage) {
  const root = doc.documentElement
  const stored = readStoredTheme(storage)
  if (stored) {
    root.setAttribute('data-theme', stored)
  } else if (!root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', 'dark')
  }
  return syncColorScheme(root)
}

/**
 * Set DOM theme attribute. Persistence is opt-in via `{ persist: true }`.
 *
 * @param {string} theme
 * @param {Document} [doc]
 * @param {{ persist?: boolean, storage?: Storage }} [options]
 * @returns {ThemeName}
 */
export function setThemeAttribute(theme, doc = document, options = {}) {
  const next = theme === 'light' ? 'light' : 'dark'
  const root = doc.documentElement
  root.setAttribute('data-theme', next)
  if (options.persist) {
    writeStoredTheme(next, options.storage ?? localStorage)
  }
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

/**
 * @param {Document} [doc]
 * @returns {ThemeName}
 */
export function getDocumentTheme(doc = document) {
  return doc.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}
