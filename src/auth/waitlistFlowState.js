export const WAITLIST_PHASES = Object.freeze({
  NOT_SUPPORTED: 'not_supported',
  FORM: 'form',
  JOINED: 'joined',
  ERROR: 'error',
})

export const WAITLIST_ERROR_KINDS = Object.freeze({
  NETWORK_ERROR: 'network_error',
  SERVICE_UNAVAILABLE: 'service_unavailable',
  DUPLICATE_REQUEST: 'duplicate_request',
  VALIDATION_ERROR: 'validation_error',
})

/** @type {ReadonlySet<string>} */
export const WAITLIST_ERROR_KIND_VALUES = new Set(Object.values(WAITLIST_ERROR_KINDS))

/**
 * @param {string} kind
 * @returns {boolean}
 */
export function isWaitlistErrorKind(kind) {
  return WAITLIST_ERROR_KIND_VALUES.has(kind)
}
