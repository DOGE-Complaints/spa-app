import { CIVIC_FLOW_PHASES } from './civicStatusState.js'

/** @typedef {'disclosure'|'phone'|'otp'|'processing'|'success'|'failed'} VerificationFlowPhase */

/** @typedef {'request'|'confirm'|null} VerificationProcessingKind */

export const VERIFICATION_FLOW_PHASES = Object.freeze({
  DISCLOSURE: 'disclosure',
  PHONE: 'phone',
  OTP: 'otp',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
})

export const PHONE_VERIFICATION_RULES = Object.freeze({
  CODE_LENGTH: 6,
  RESEND_COOLDOWN_SECONDS: 60,
  MAX_ATTEMPTS: 5,
  OTP_TTL_MINUTES: 5,
  DIAL_PREFIX: '+372',
})

const ESTONIAN_PHONE_PATTERN = /^\+372\d{7,8}$/

export const PHONE_VALIDATION_HINT_KEYS = Object.freeze({
  empty: 'phone.hint.empty',
  prefix: 'phone.hint.prefix',
  digits: 'phone.hint.digits',
})

/**
 * Normalize local digits to E.164 (+372…).
 * @param {string} localDigits
 * @returns {string|null}
 */
export function formatEstonianPhone(localDigits) {
  const digits = String(localDigits ?? '').replace(/\D/g, '')
  if (!digits) return null
  const e164 = `${PHONE_VERIFICATION_RULES.DIAL_PREFIX}${digits}`
  return ESTONIAN_PHONE_PATTERN.test(e164) ? e164 : null
}

/**
 * @param {string} phone
 * @returns {{ valid: boolean, hintKey: string|null }}
 */
export function validateEstonianPhone(phone) {
  if (!phone) {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.empty }
  }
  if (!phone.startsWith(PHONE_VERIFICATION_RULES.DIAL_PREFIX)) {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.prefix }
  }
  if (!ESTONIAN_PHONE_PATTERN.test(phone)) {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.digits }
  }
  return { valid: true, hintKey: null }
}

/**
 * @param {string} code
 * @returns {boolean}
 */
export function isValidOtpCode(code) {
  return new RegExp(`^\\d{${PHONE_VERIFICATION_RULES.CODE_LENGTH}}$`).test(String(code ?? ''))
}

/**
 * Map verification UI phase to CivicStatusCard flow phase (ID-03 contract).
 * @param {VerificationFlowPhase} phase
 * @param {{ processingKind?: VerificationProcessingKind }} [options]
 * @returns {import('./civicStatusState.js').CivicFlowPhase}
 */
export function mapVerificationPhaseToCivicFlowPhase(
  phase,
  { processingKind = null } = {},
) {
  if (phase === VERIFICATION_FLOW_PHASES.PROCESSING) {
    return processingKind === 'confirm'
      ? CIVIC_FLOW_PHASES.CONFIRMING
      : CIVIC_FLOW_PHASES.REQUESTING
  }

  switch (phase) {
    case VERIFICATION_FLOW_PHASES.OTP:
      return CIVIC_FLOW_PHASES.CODE_ENTRY
    case VERIFICATION_FLOW_PHASES.SUCCESS:
      return CIVIC_FLOW_PHASES.VERIFIED
    case VERIFICATION_FLOW_PHASES.FAILED:
      return CIVIC_FLOW_PHASES.FAILED
    default:
      return CIVIC_FLOW_PHASES.IDLE
  }
}

/**
 * @param {number} sentAtMs
 * @returns {number} seconds remaining until resend allowed
 */
export function resendCooldownRemainingSeconds(sentAtMs, nowMs = Date.now()) {
  const elapsed = Math.floor((nowMs - sentAtMs) / 1000)
  return Math.max(0, PHONE_VERIFICATION_RULES.RESEND_COOLDOWN_SECONDS - elapsed)
}
