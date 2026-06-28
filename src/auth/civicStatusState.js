/** @typedef {'idle'|'requesting'|'code_entry'|'confirming'|'verified'|'failed'} CivicFlowPhase */

/** @typedef {'default'|'protected_action'} CivicVerificationContext */

/** @typedef {'unverified'|'verification_available'|'verification_in_progress'|'verified'|'verification_failed'} CivicStatusState */

export const CIVIC_FLOW_PHASES = Object.freeze({
  IDLE: 'idle',
  REQUESTING: 'requesting',
  CODE_ENTRY: 'code_entry',
  CONFIRMING: 'confirming',
  VERIFIED: 'verified',
  FAILED: 'failed',
})

export const CIVIC_VERIFICATION_CONTEXT = Object.freeze({
  DEFAULT: 'default',
  PROTECTED_ACTION: 'protected_action',
})

export const CIVIC_STATUS_STATES = Object.freeze({
  UNVERIFIED: 'unverified',
  VERIFICATION_AVAILABLE: 'verification_available',
  VERIFICATION_IN_PROGRESS: 'verification_in_progress',
  VERIFIED: 'verified',
  VERIFICATION_FAILED: 'verification_failed',
})

const IN_PROGRESS_PHASES = new Set([
  CIVIC_FLOW_PHASES.REQUESTING,
  CIVIC_FLOW_PHASES.CODE_ENTRY,
  CIVIC_FLOW_PHASES.CONFIRMING,
  CIVIC_FLOW_PHASES.VERIFIED,
])

/**
 * Derive CivicStatusCard runtime state from GET /me.phone_verified + local flow phase.
 * Backend field `verification_status` does not exist — do not read it.
 *
 * @param {boolean} phoneVerified
 * @param {CivicFlowPhase} flowPhase
 * @param {{ verificationContext?: CivicVerificationContext, errorCode?: string|null }} [options]
 * @returns {CivicStatusState}
 */
export function deriveCivicStatusState(
  phoneVerified,
  flowPhase = CIVIC_FLOW_PHASES.IDLE,
  { verificationContext = CIVIC_VERIFICATION_CONTEXT.DEFAULT, errorCode = null } = {},
) {
  if (phoneVerified) {
    return CIVIC_STATUS_STATES.VERIFIED
  }

  if (flowPhase === CIVIC_FLOW_PHASES.FAILED || errorCode) {
    return CIVIC_STATUS_STATES.VERIFICATION_FAILED
  }

  if (IN_PROGRESS_PHASES.has(flowPhase)) {
    return CIVIC_STATUS_STATES.VERIFICATION_IN_PROGRESS
  }

  if (
    flowPhase === CIVIC_FLOW_PHASES.IDLE &&
    verificationContext === CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION
  ) {
    return CIVIC_STATUS_STATES.VERIFICATION_AVAILABLE
  }

  return CIVIC_STATUS_STATES.UNVERIFIED
}
