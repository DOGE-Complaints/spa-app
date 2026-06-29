import { describe, expect, it } from 'vitest'
import { CIVIC_FLOW_PHASES } from '../civicStatusState.js'
import {
  formatEstonianPhone,
  isValidOtpCode,
  mapVerificationPhaseToCivicFlowPhase,
  PHONE_VALIDATION_HINT_KEYS,
  resendCooldownRemainingSeconds,
  validateEstonianPhone,
  VERIFICATION_FLOW_PHASES,
  PHONE_VERIFICATION_RULES,
} from '../verificationFlowState.js'

describe('verificationFlowState', () => {
  it('exports server rule constants (FR-04.6)', () => {
    expect(PHONE_VERIFICATION_RULES.CODE_LENGTH).toBe(6)
    expect(PHONE_VERIFICATION_RULES.RESEND_COOLDOWN_SECONDS).toBe(60)
    expect(PHONE_VERIFICATION_RULES.MAX_ATTEMPTS).toBe(5)
    expect(PHONE_VERIFICATION_RULES.OTP_TTL_MINUTES).toBe(5)
  })

  it('formats Estonian E.164 numbers', () => {
    expect(formatEstonianPhone('55555555')).toBe('+37255555555')
    expect(formatEstonianPhone('abc')).toBeNull()
  })

  it('validates +372 phone hints', () => {
    expect(validateEstonianPhone('+37255555555').valid).toBe(true)
    expect(validateEstonianPhone('+37155555555').valid).toBe(false)
    expect(validateEstonianPhone('').hintKey).toBe(PHONE_VALIDATION_HINT_KEYS.empty)
    expect(validateEstonianPhone('+37155555555').hintKey).toBe(PHONE_VALIDATION_HINT_KEYS.prefix)
    expect(validateEstonianPhone('+372123').hintKey).toBe(PHONE_VALIDATION_HINT_KEYS.digits)
  })

  it('validates OTP length', () => {
    expect(isValidOtpCode('123456')).toBe(true)
    expect(isValidOtpCode('12345')).toBe(false)
  })

  it('maps verification phases to civic flow phases', () => {
    expect(mapVerificationPhaseToCivicFlowPhase(VERIFICATION_FLOW_PHASES.OTP)).toBe(
      CIVIC_FLOW_PHASES.CODE_ENTRY,
    )
    expect(
      mapVerificationPhaseToCivicFlowPhase(VERIFICATION_FLOW_PHASES.PROCESSING, {
        processingKind: 'confirm',
      }),
    ).toBe(CIVIC_FLOW_PHASES.CONFIRMING)
    expect(
      mapVerificationPhaseToCivicFlowPhase(VERIFICATION_FLOW_PHASES.PROCESSING, {
        processingKind: 'request',
      }),
    ).toBe(CIVIC_FLOW_PHASES.REQUESTING)
    expect(mapVerificationPhaseToCivicFlowPhase(VERIFICATION_FLOW_PHASES.SUCCESS)).toBe(
      CIVIC_FLOW_PHASES.VERIFIED,
    )
  })

  it('computes resend cooldown remaining seconds', () => {
    const sentAt = Date.now() - 45_000
    expect(resendCooldownRemainingSeconds(sentAt)).toBe(15)
    expect(resendCooldownRemainingSeconds(Date.now())).toBe(60)
  })
})
