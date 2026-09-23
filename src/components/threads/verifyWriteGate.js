/**
 * Threads write-gate helper — opaque identity_verified only.
 * Do NOT treat phone_verified alone as sufficient (AC-SPA-THR-05 / M147).
 *
 * @param {Record<string, unknown> | null | undefined} profile
 * @returns {boolean}
 */
export function isIdentityVerifiedForWrite(profile) {
  if (!profile || typeof profile !== 'object') return false
  return profile.identity_verified === true
}

/**
 * @returns {'unverified'|'handoff'|'verified'|'civic'|null}
 */
export function resolveHarnessThr05Scene() {
  if (typeof window === 'undefined') return null
  const raw = window.__THR05_FORCE_SCENE__
  if (raw === 'unverified' || raw === 'handoff' || raw === 'verified' || raw === 'civic') return raw
  return null
}

/**
 * Build hash navigate target to existing /verify with returnTo.
 * Does not invent new verify routes.
 *
 * @param {string} [returnTo='#/board']
 */
export function buildVerifyHandoffHref(returnTo = '#/board') {
  const encoded = encodeURIComponent(returnTo)
  return `#/verify?returnTo=${encoded}`
}
