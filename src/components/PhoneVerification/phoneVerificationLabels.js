/** SSOT: DOC-IDS-ONB-02 / identity-onboarding-ux-2026-06-12 §2 (EN canon) */

export const PHONE_VERIFICATION_DISCLOSURE = Object.freeze({
  title: 'One quick step — verify your phone',
  body:
    'We ask for your phone number to keep DOGEstonia free of bots and bad actors, so the people you interact with are real. We currently support Estonian numbers (+372) only — this is part of how we protect the integrity of our ecosystem. Your number is stored only as a secure hash, never shown to others, and used once to confirm it\'s really you.',
  primaryCta: 'Send code',
  secondaryCta: 'Not now',
})

export const PHONE_VERIFICATION_FORBIDDEN_TERMS = Object.freeze([
  'KYC',
  'government identity check',
  'bank verification',
  'legal identity',
])

/**
 * @param {string} text
 * @returns {string|null} first forbidden term found
 */
export function findForbiddenVerificationTerm(text) {
  const lower = String(text ?? '').toLowerCase()
  return (
    PHONE_VERIFICATION_FORBIDDEN_TERMS.find((term) => lower.includes(term.toLowerCase())) ?? null
  )
}
