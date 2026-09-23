import { isIdentityVerifiedForWrite } from '../components/threads/verifyWriteGate.js'

/**
 * Me consumer for threads write gate (THR-06 cutover).
 * Prefer opaque `identity_verified` from GET /me — never phone_verified alone.
 *
 * @param {Record<string, unknown> | null | undefined} meProfile
 * @returns {{ identityVerified: boolean, phoneVerified: boolean, source: 'identity_verified' | 'none' }}
 */
export function resolveMeIdentityVerified(meProfile) {
  const phoneVerified = Boolean(meProfile?.phone_verified)
  const identityVerified = isIdentityVerifiedForWrite(meProfile)
  return {
    identityVerified,
    phoneVerified,
    source: identityVerified ? 'identity_verified' : 'none',
  }
}

/**
 * @param {Record<string, unknown> | null | undefined} meProfile
 * @returns {boolean}
 */
export function canWriteThreadsWithMe(meProfile) {
  return resolveMeIdentityVerified(meProfile).identityVerified
}
