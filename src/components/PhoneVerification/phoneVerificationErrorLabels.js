/** SSOT copy for M37 verification error states (mockup-37 §4–12). */

export const VERIFICATION_ERROR_ACTIONS = Object.freeze({
  JOIN_WAITLIST: 'join_waitlist',
  USE_ANOTHER_NUMBER: 'use_another_number',
  RESEND: 'resend',
  TRY_AGAIN: 'try_again',
  CHANGE_NUMBER: 'change_number',
  START_AGAIN: 'start_again',
  RETRY: 'retry',
  SIGN_IN: 'sign_in',
  SIGN_IN_TO_EXISTING: 'sign_in_to_existing',
  CANCEL: 'cancel',
})

/** @typedef {typeof VERIFICATION_ERROR_ACTIONS[keyof typeof VERIFICATION_ERROR_ACTIONS]} VerificationErrorActionId */

export const VERIFICATION_ERROR_KINDS = Object.freeze({
  COUNTRY_NOT_ALLOWED: 'country-not-allowed',
  RATE_LIMITED: 'rate-limited',
  CODE_MISMATCH: 'code-mismatch',
  CODE_EXPIRED: 'code-expired',
  TOO_MANY_ATTEMPTS: 'too-many-attempts',
  SMS_UNAVAILABLE: 'sms-unavailable',
  PHONE_CONFLICT: 'phone-conflict',
  SIGN_IN_REQUIRED: 'sign-in-required',
  CONNECTION_PROBLEM: 'connection-problem',
})

/** @type {Record<string, { title: string, message: string, primary: VerificationErrorActionId, secondary?: VerificationErrorActionId }>} */
export const VERIFICATION_ERROR_COPY = Object.freeze({
  [VERIFICATION_ERROR_KINDS.COUNTRY_NOT_ALLOWED]: {
    title: 'Estonian numbers only',
    message:
      'DOGEstonia currently supports phone verification for Estonian numbers (+372).',
    primary: VERIFICATION_ERROR_ACTIONS.JOIN_WAITLIST,
    secondary: VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.RATE_LIMITED]: {
    title: 'Please wait before requesting another code',
    message:
      'A verification code was sent recently. You can request a new one after the cooldown ends.',
    primary: VERIFICATION_ERROR_ACTIONS.RESEND,
  },
  [VERIFICATION_ERROR_KINDS.CODE_MISMATCH]: {
    title: 'Incorrect verification code',
    message: 'The code you entered does not match. Please check the SMS and try again.',
    primary: VERIFICATION_ERROR_ACTIONS.TRY_AGAIN,
  },
  [VERIFICATION_ERROR_KINDS.CODE_EXPIRED]: {
    title: 'Verification code expired',
    message: 'The code is no longer valid. Request a new code to continue.',
    primary: VERIFICATION_ERROR_ACTIONS.RESEND,
    secondary: VERIFICATION_ERROR_ACTIONS.CHANGE_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.TOO_MANY_ATTEMPTS]: {
    title: 'Too many attempts',
    message: 'This verification attempt is locked. Start again to receive a new code.',
    primary: VERIFICATION_ERROR_ACTIONS.START_AGAIN,
  },
  [VERIFICATION_ERROR_KINDS.SMS_UNAVAILABLE]: {
    title: 'SMS service unavailable',
    message: 'We could not send a verification code right now. Please try again later.',
    primary: VERIFICATION_ERROR_ACTIONS.RETRY,
    secondary: VERIFICATION_ERROR_ACTIONS.CANCEL,
  },
  [VERIFICATION_ERROR_KINDS.PHONE_CONFLICT]: {
    title: 'This number is already used',
    message: 'This phone number is already connected to another DOGEstonia account.',
    primary: VERIFICATION_ERROR_ACTIONS.SIGN_IN_TO_EXISTING,
    secondary: VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.SIGN_IN_REQUIRED]: {
    title: 'Sign in required',
    message: 'Your session has expired. Please sign in again to continue verification.',
    primary: VERIFICATION_ERROR_ACTIONS.SIGN_IN,
    secondary: VERIFICATION_ERROR_ACTIONS.CANCEL,
  },
  [VERIFICATION_ERROR_KINDS.CONNECTION_PROBLEM]: {
    title: 'Connection problem',
    message:
      'We could not reach the verification service. Check your connection and try again.',
    primary: VERIFICATION_ERROR_ACTIONS.RETRY,
  },
})

/** @type {Record<VerificationErrorActionId, string>} */
export const VERIFICATION_ERROR_ACTION_LABELS = Object.freeze({
  [VERIFICATION_ERROR_ACTIONS.JOIN_WAITLIST]: 'Join Waitlist',
  [VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER]: 'Use Another Number',
  [VERIFICATION_ERROR_ACTIONS.RESEND]: 'Resend Code',
  [VERIFICATION_ERROR_ACTIONS.TRY_AGAIN]: 'Try Again',
  [VERIFICATION_ERROR_ACTIONS.CHANGE_NUMBER]: 'Change Number',
  [VERIFICATION_ERROR_ACTIONS.START_AGAIN]: 'Start Again',
  [VERIFICATION_ERROR_ACTIONS.RETRY]: 'Retry',
  [VERIFICATION_ERROR_ACTIONS.SIGN_IN]: 'Sign In',
  [VERIFICATION_ERROR_ACTIONS.SIGN_IN_TO_EXISTING]: 'Sign in to Existing Account',
  [VERIFICATION_ERROR_ACTIONS.CANCEL]: 'Cancel',
})
