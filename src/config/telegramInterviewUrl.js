/**
 * Public How It Works · Telegram interview CTA (M171 / PH-14).
 * Reads Vite env only — no invented t.me / bot handle fallback.
 */
import { getVitePublicUrl } from './publicEnv.js'

/**
 * @returns {string} trimmed URL or empty string when unset / whitespace-only
 */
export function getTelegramInterviewUrl() {
  return getVitePublicUrl('VITE_TELEGRAM_INTERVIEW_URL')
}

/**
 * Href for `<a>` / Button: env URL or calm `#` when empty.
 * @returns {string}
 */
export function getTelegramInterviewHref() {
  return getTelegramInterviewUrl() || '#'
}

/**
 * @returns {boolean}
 */
export function hasTelegramInterviewUrl() {
  return Boolean(getTelegramInterviewUrl())
}
