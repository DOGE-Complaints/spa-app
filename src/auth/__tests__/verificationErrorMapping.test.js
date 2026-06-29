/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import {
  API_CODE_TO_ERROR_KIND,
  computeAttemptsRemaining,
  computeResendCooldownRemainingSeconds,
  extractVerificationApiError,
  findForbiddenTermsInErrorLabels,
  formatCooldownTimer,
  mapApiCodeToErrorKind,
  resolveVerificationError,
} from '../verificationErrorMapping.js'
import { IdentityApiError } from '../identityService.js'
import { VERIFICATION_ERROR_KINDS } from '../../components/PhoneVerification/phoneVerificationErrorLabels.js'
import { PHONE_VERIFICATION_RULES } from '../verificationFlowState.js'

describe('verificationErrorMapping', () => {
  it('maps all backlog API codes to M37 kinds', () => {
    const codes = [
      'COUNTRY_NOT_ALLOWED',
      'RATE_LIMITED',
      'CODE_MISMATCH',
      'CODE_EXPIRED',
      'TOO_MANY_ATTEMPTS',
      'PROVIDER_UNAVAILABLE',
      'SEND_FAILED',
      'profile_conflict',
      'AUTHENTICATION_REQUIRED',
      'session_expired',
      'network_error',
    ]
    for (const code of codes) {
      expect(mapApiCodeToErrorKind(code)).toBe(API_CODE_TO_ERROR_KIND[code])
    }
  })

  it('computeAttemptsRemaining uses MAX_ATTEMPTS', () => {
    expect(computeAttemptsRemaining(0)).toBe(PHONE_VERIFICATION_RULES.MAX_ATTEMPTS)
    expect(computeAttemptsRemaining(1)).toBe(PHONE_VERIFICATION_RULES.MAX_ATTEMPTS - 1)
    expect(computeAttemptsRemaining(5)).toBe(0)
  })

  it('computeResendCooldownRemainingSeconds uses 60s rule', () => {
    const now = 1_700_000_000_000
    const sentAt = now - 15_000
    expect(computeResendCooldownRemainingSeconds(sentAt, now)).toBe(45)
  })

  it('formatCooldownTimer renders MM:SS', () => {
    expect(formatCooldownTimer(45)).toBe('00:45')
    expect(formatCooldownTimer(125)).toBe('02:05')
  })

  it('resolveVerificationError exposes trace_id contract', () => {
    const resolved = resolveVerificationError('CODE_MISMATCH', {
      mismatchCount: 1,
      traceId: 'trace-abc',
    })
    expect(resolved?.attemptsRemaining).toBe(4)
    expect(resolved?.technicalCode).toBe('CODE_MISMATCH')
    expect(resolved?.traceId).toBe('trace-abc')
    expect(resolved?.errorKind).toBe(VERIFICATION_ERROR_KINDS.CODE_MISMATCH)
  })

  it('resolveVerificationError disables resend during cooldown', () => {
    const now = 1_700_000_000_000
    const resolved = resolveVerificationError('RATE_LIMITED', {
      lastRequestAtMs: now - 10_000,
      nowMs: now,
    })
    expect(resolved?.cooldownSecondsRemaining).toBe(50)
    expect(resolved?.primaryAction.disabled).toBe(true)
  })

  it('extractVerificationApiError reads IdentityApiError envelope', () => {
    const error = new IdentityApiError('profile_conflict', 409, {
      error: { trace_id: 't-409' },
    })
    expect(extractVerificationApiError(error)).toEqual({
      apiCode: 'profile_conflict',
      traceId: 't-409',
      status: 409,
    })
  })

  it('label SSOT has no forbidden terms', () => {
    expect(findForbiddenTermsInErrorLabels()).toEqual([])
  })
})
