/** @typedef {'invalid_credentials' | 'network_error' | 'rate_limited' | 'magic_link_expired' | 'account_not_found'} AuthErrorCode */

export const AUTH_ERROR_I18N_KEYS = Object.freeze({
  invalid_credentials: 'auth.errcode.invalid_credentials',
  network_error: 'auth.errcode.network_error',
  rate_limited: 'auth.errcode.rate_limited',
  magic_link_expired: 'auth.errcode.magic_link_expired',
  account_not_found: 'auth.errcode.account_not_found',
})

/**
 * @param {unknown} error
 * @returns {AuthErrorCode}
 */
export function mapAuthError(error) {
  const message = String(error?.message ?? error ?? '').toLowerCase()
  const status = error?.status ?? error?.statusCode

  if (message.includes('fetch') || message.includes('network') || status === 0) {
    return 'network_error'
  }

  if (message.includes('rate') || status === 429) {
    return 'rate_limited'
  }

  if (message.includes('expired') || message.includes('otp_expired')) {
    return 'magic_link_expired'
  }

  if (
    message.includes('user not found') ||
    message.includes('no user') ||
    message.includes('account_not_found')
  ) {
    return 'account_not_found'
  }

  if (
    message.includes('invalid login credentials') ||
    message.includes('invalid_credentials') ||
    message.includes('invalid email or password')
  ) {
    return 'invalid_credentials'
  }

  return 'invalid_credentials'
}

/**
 * @param {AuthErrorCode} code
 * @returns {string} i18n key
 */
export function getAuthErrorMessageKey(code) {
  return AUTH_ERROR_I18N_KEYS[code] ?? AUTH_ERROR_I18N_KEYS.invalid_credentials
}

/**
 * @deprecated Use getAuthErrorMessageKey + t()
 * @param {AuthErrorCode} code
 */
export function getAuthErrorMessage(code) {
  const keys = AUTH_ERROR_I18N_KEYS
  const key = keys[code] ?? keys.invalid_credentials
  return key
}

/**
 * @param {string | null | undefined} redirect
 */
export function resolvePostAuthRedirect(redirect) {
  if (!redirect || typeof redirect !== 'string') {
    return '/board'
  }
  if (!redirect.startsWith('/') || redirect.startsWith('//')) {
    return '/board'
  }
  return redirect
}
