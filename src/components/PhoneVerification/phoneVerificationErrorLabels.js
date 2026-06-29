/** SSOT action/kind ids for M37 verification error states (mockup-37 §4–12). */

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

/** @type {Record<VerificationErrorActionId, string>} */
export const VERIFICATION_ERROR_ACTION_LABEL_KEYS = Object.freeze({
  [VERIFICATION_ERROR_ACTIONS.JOIN_WAITLIST]: 'phoneError.action.joinWaitlist',
  [VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER]: 'phoneError.action.useAnotherNumber',
  [VERIFICATION_ERROR_ACTIONS.RESEND]: 'phoneError.action.resend',
  [VERIFICATION_ERROR_ACTIONS.TRY_AGAIN]: 'phoneError.action.tryAgain',
  [VERIFICATION_ERROR_ACTIONS.CHANGE_NUMBER]: 'phoneError.action.changeNumber',
  [VERIFICATION_ERROR_ACTIONS.START_AGAIN]: 'phoneError.action.startAgain',
  [VERIFICATION_ERROR_ACTIONS.RETRY]: 'phoneError.action.retry',
  [VERIFICATION_ERROR_ACTIONS.SIGN_IN]: 'phoneError.action.signIn',
  [VERIFICATION_ERROR_ACTIONS.SIGN_IN_TO_EXISTING]: 'phoneError.action.signInToExisting',
  [VERIFICATION_ERROR_ACTIONS.CANCEL]: 'phoneError.action.cancel',
})

/** @type {Record<string, { titleKey: string, messageKey: string, primary: VerificationErrorActionId, secondary?: VerificationErrorActionId }>} */
export const VERIFICATION_ERROR_COPY_KEYS = Object.freeze({
  [VERIFICATION_ERROR_KINDS.COUNTRY_NOT_ALLOWED]: {
    titleKey: 'phoneError.country.title',
    messageKey: 'phoneError.country.msg',
    primary: VERIFICATION_ERROR_ACTIONS.JOIN_WAITLIST,
    secondary: VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.RATE_LIMITED]: {
    titleKey: 'phoneError.rateLimited.title',
    messageKey: 'phoneError.rateLimited.msg',
    primary: VERIFICATION_ERROR_ACTIONS.RESEND,
  },
  [VERIFICATION_ERROR_KINDS.CODE_MISMATCH]: {
    titleKey: 'phoneError.mismatch.title',
    messageKey: 'phoneError.mismatch.msg',
    primary: VERIFICATION_ERROR_ACTIONS.TRY_AGAIN,
  },
  [VERIFICATION_ERROR_KINDS.CODE_EXPIRED]: {
    titleKey: 'phoneError.expired.title',
    messageKey: 'phoneError.expired.msg',
    primary: VERIFICATION_ERROR_ACTIONS.RESEND,
    secondary: VERIFICATION_ERROR_ACTIONS.CHANGE_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.TOO_MANY_ATTEMPTS]: {
    titleKey: 'phoneError.tooMany.title',
    messageKey: 'phoneError.tooMany.msg',
    primary: VERIFICATION_ERROR_ACTIONS.START_AGAIN,
  },
  [VERIFICATION_ERROR_KINDS.SMS_UNAVAILABLE]: {
    titleKey: 'phoneError.smsUnavailable.title',
    messageKey: 'phoneError.smsUnavailable.msg',
    primary: VERIFICATION_ERROR_ACTIONS.RETRY,
    secondary: VERIFICATION_ERROR_ACTIONS.CANCEL,
  },
  [VERIFICATION_ERROR_KINDS.PHONE_CONFLICT]: {
    titleKey: 'phoneError.conflict.title',
    messageKey: 'phoneError.conflict.msg',
    primary: VERIFICATION_ERROR_ACTIONS.SIGN_IN_TO_EXISTING,
    secondary: VERIFICATION_ERROR_ACTIONS.USE_ANOTHER_NUMBER,
  },
  [VERIFICATION_ERROR_KINDS.SIGN_IN_REQUIRED]: {
    titleKey: 'phoneError.signIn.title',
    messageKey: 'phoneError.signIn.msg',
    primary: VERIFICATION_ERROR_ACTIONS.SIGN_IN,
    secondary: VERIFICATION_ERROR_ACTIONS.CANCEL,
  },
  [VERIFICATION_ERROR_KINDS.CONNECTION_PROBLEM]: {
    titleKey: 'phoneError.connection.title',
    messageKey: 'phoneError.connection.msg',
    primary: VERIFICATION_ERROR_ACTIONS.RETRY,
  },
})
