import { describe, expect, it } from 'vitest'
import {
  CIVIC_FLOW_PHASES,
  CIVIC_STATUS_STATES,
  CIVIC_VERIFICATION_CONTEXT,
  deriveCivicStatusState,
} from '../civicStatusState.js'

describe('deriveCivicStatusState', () => {
  it('maps phone_verified=true to verified regardless of flow phase', () => {
    expect(deriveCivicStatusState(true, CIVIC_FLOW_PHASES.IDLE)).toBe(
      CIVIC_STATUS_STATES.VERIFIED,
    )
    expect(deriveCivicStatusState(true, CIVIC_FLOW_PHASES.FAILED)).toBe(
      CIVIC_STATUS_STATES.VERIFIED,
    )
  })

  it('maps phone_verified=false + idle to unverified by default', () => {
    expect(deriveCivicStatusState(false, CIVIC_FLOW_PHASES.IDLE)).toBe(
      CIVIC_STATUS_STATES.UNVERIFIED,
    )
  })

  it('maps protected action context + idle to verification_available', () => {
    expect(
      deriveCivicStatusState(false, CIVIC_FLOW_PHASES.IDLE, {
        verificationContext: CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION,
      }),
    ).toBe(CIVIC_STATUS_STATES.VERIFICATION_AVAILABLE)
  })

  it('maps in-progress flow phases to verification_in_progress', () => {
    for (const phase of [
      CIVIC_FLOW_PHASES.REQUESTING,
      CIVIC_FLOW_PHASES.CODE_ENTRY,
      CIVIC_FLOW_PHASES.CONFIRMING,
      CIVIC_FLOW_PHASES.VERIFIED,
    ]) {
      expect(deriveCivicStatusState(false, phase)).toBe(
        CIVIC_STATUS_STATES.VERIFICATION_IN_PROGRESS,
      )
    }
  })

  it('maps failed phase or error code to verification_failed', () => {
    expect(deriveCivicStatusState(false, CIVIC_FLOW_PHASES.FAILED)).toBe(
      CIVIC_STATUS_STATES.VERIFICATION_FAILED,
    )
    expect(
      deriveCivicStatusState(false, CIVIC_FLOW_PHASES.IDLE, { errorCode: 'CODE_MISMATCH' }),
    ).toBe(CIVIC_STATUS_STATES.VERIFICATION_FAILED)
  })

  it('exports flow phases verbatim per backlog contract', () => {
    expect(Object.values(CIVIC_FLOW_PHASES)).toEqual([
      'idle',
      'requesting',
      'code_entry',
      'confirming',
      'verified',
      'failed',
    ])
  })

  it('does not export verification_status helpers', () => {
    expect(Object.keys(CIVIC_FLOW_PHASES)).not.toContain('VERIFICATION_STATUS')
    expect(Object.keys(CIVIC_STATUS_STATES)).not.toContain('VERIFICATION_STATUS')
  })
})
