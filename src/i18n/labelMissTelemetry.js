import { LOCALE_CODES } from './core.js'

/** @type {Set<string>} */
const reportedInSession = new Set()

/** @returns {boolean} */
function isTelemetryEnabled() {
  return String(import.meta.env.VITE_TELEMETRY_ENABLED ?? '').toLowerCase() === 'true'
}

/**
 * @returns {string} Empty when gateway base URL is not configured.
 */
export function resolveLabelMissSinkUrl() {
  const base = String(import.meta.env.VITE_GATEWAY_BASE_URL ?? '').trim().replace(/\/$/, '')
  if (!base) return ''
  return `${base}/telemetry/label-misses`
}

/**
 * @param {string | undefined} locale
 * @returns {boolean}
 */
function isSupportedLocale(locale) {
  return typeof locale === 'string' && LOCALE_CODES.includes(locale)
}

/** Clears session dedup state (tests). */
export function resetLabelMissTelemetrySession() {
  reportedInSession.clear()
}

/**
 * Fire-and-forget anonymous label-miss telemetry. Quiet no-op when disabled,
 * URL missing, invalid payload, duplicate in session, or network error.
 *
 * @param {{ label_key: string, locale: string }} payload
 */
export function reportLabelMiss({ label_key, locale }) {
  if (!isTelemetryEnabled()) return

  const key = String(label_key ?? '').trim()
  if (!key || !isSupportedLocale(locale)) return

  const dedupKey = `${key}|${locale}`
  if (reportedInSession.has(dedupKey)) return

  const url = resolveLabelMissSinkUrl()
  if (!url) return

  reportedInSession.add(dedupKey)

  globalThis
    .fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label_key: key, locale }),
    })
    .catch(() => {})
}
