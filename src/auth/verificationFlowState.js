import { getDefaultCountry } from '../utils/countriesDataset.js'
import {
  formatPhoneForCountry,
  getPhoneFormatForCountry,
  PHONE_FORMAT_BY_COUNTRY,
  validatePhoneForCountry,
} from './phoneFormats.js'
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

export const PHONE_VALIDATION_HINT_KEYS = Object.freeze({
  empty: 'phone.hint.empty',
  prefix: 'phone.hint.prefix',
  digits: 'phone.hint.digits',
})

export {
  formatPhoneForCountry,
  getPhoneFormatForCountry,
  PHONE_FORMAT_BY_COUNTRY,
  validatePhoneForCountry,
}

/**
 * Normalize local digits to E.164 (+372…).
 * @param {string} localDigits
 * @returns {string|null}
 */
export function formatEstonianPhone(localDigits) {
  return formatPhoneForCountry(getDefaultCountry(), localDigits)
}

/**
 * @param {string} phone
 * @returns {{ valid: boolean, hintKey: string|null }}
 */
export function validateEstonianPhone(phone) {
  if (!phone) {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.empty }
  }
  const country = getDefaultCountry()
  if (!phone.startsWith(country.dialPrefix)) {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.prefix }
  }
  const nationalDigits = phone.slice(country.dialPrefix.length)
  const result = validatePhoneForCountry(country, nationalDigits)
  if (result.valid) {
    return { valid: true, hintKey: null }
  }
  if (result.hintKey === 'phone.format.hint.empty') {
    return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.empty }
  }
  return { valid: false, hintKey: PHONE_VALIDATION_HINT_KEYS.digits }
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
