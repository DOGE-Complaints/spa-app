export const AUTH_PAGE_STATES = Object.freeze({
  LOGIN: 'login',
  SIGNUP: 'signup',
  MAGIC_LINK_SENT: 'magic-link-sent',
  FORGOT_PASSWORD: 'forgot-password',
  AUTH_ERROR: 'auth-error',
  AUTH_SUCCESS: 'auth-success',
})

/** @typedef {typeof AUTH_PAGE_STATES[keyof typeof AUTH_PAGE_STATES]} AuthPageState */

/**
 * @param {string | null | undefined} value
 * @returns {AuthPageState}
 */
export function parseDevAuthState(value) {
  const normalized = String(value ?? '').trim()
  if (Object.values(AUTH_PAGE_STATES).includes(normalized)) {
    return /** @type {AuthPageState} */ (normalized)
  }
  return AUTH_PAGE_STATES.LOGIN
}
