/**
 * How It Works «Concept & FAQ on landing» CTA (PH-16).
 * Reads Vite env only — no hardcoded landing host fallback.
 */
import { getVitePublicUrl } from './publicEnv.js'

/**
 * @returns {string} trimmed URL or empty string when unset / whitespace-only
 */
export function getLandingFaqUrl() {
  return getVitePublicUrl('VITE_LANDING_FAQ_URL')
}

/**
 * Href for `<a>` / Button: env URL or calm `#` when empty.
 * @returns {string}
 */
export function getLandingFaqHref() {
  return getLandingFaqUrl() || '#'
}

/**
 * @returns {boolean}
 */
export function hasLandingFaqUrl() {
  return Boolean(getLandingFaqUrl())
}
