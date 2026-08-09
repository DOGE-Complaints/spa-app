/** Dev/test fallback when VITE_IDENTITY_SERVICE_URL is unset (FR-HL-04.3). */
export const IDENTITY_SERVICE_DEV_FALLBACK = 'http://localhost:8100'

/**
 * Resolve identity service base URL (HL-04 / F8).
 *
 * PROD: missing/blank `VITE_IDENTITY_SERVICE_URL` → throw (no localhost fallback).
 * Non-PROD: missing/blank → `IDENTITY_SERVICE_DEV_FALLBACK`.
 *
 * @param {{ PROD?: boolean, VITE_IDENTITY_SERVICE_URL?: string }} [env]
 * @returns {string}
 */
export function resolveIdentityServiceUrl(env = import.meta.env) {
  const raw = env?.VITE_IDENTITY_SERVICE_URL
  const trimmed = typeof raw === 'string' ? raw.trim() : ''
  if (trimmed) {
    return trimmed
  }

  if (env?.PROD === true) {
    throw new Error(
      '[HL-04] VITE_IDENTITY_SERVICE_URL is required in production; refusing localhost fallback',
    )
  }

  return IDENTITY_SERVICE_DEV_FALLBACK
}
