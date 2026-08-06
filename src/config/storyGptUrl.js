/**
 * Shared FE helper for public-home Submit → DOGEstonia GPT handoff.
 * Reads Vite env only — no hardcoded ChatGPT GPT-id fallback (FR-PH-06.1 / 06.6).
 */

/**
 * @returns {string} trimmed URL or empty string when unset / whitespace-only
 */
export function getStoryGptUrl() {
  return String(import.meta.env.VITE_STORY_GPT_URL ?? '').trim()
}

/**
 * Href for `<a>` / Button: env URL or calm `#` when empty.
 * @returns {string}
 */
export function getStoryGptHref() {
  return getStoryGptUrl() || '#'
}

/**
 * @returns {boolean}
 */
export function hasStoryGptUrl() {
  return Boolean(getStoryGptUrl())
}

/**
 * Open GPT URL in a new tab when set. No-op when env empty (calm fail).
 * @param {{ target?: string }} [options]
 * @returns {boolean} true if a window was opened
 */
export function openStoryGpt(options = {}) {
  const url = getStoryGptUrl()
  if (!url) return false
  const target = options.target ?? '_blank'
  window.open(url, target, 'noopener,noreferrer')
  return true
}
