/** @typedef {'invalid_credentials' | 'network_error' | 'rate_limited' | 'magic_link_expired' | 'account_not_found'} AuthErrorCode */

const AUTH_ERROR_MESSAGES = {
  invalid_credentials: 'Incorrect email or password.',
  network_error: 'Unable to contact DOGEstonia services.',
  rate_limited: 'Too many attempts. Please try again later.',
  magic_link_expired: 'This sign-in link has expired.',
  account_not_found: 'No account exists for this email address.',
}

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
 */
export function getAuthErrorMessage(code) {
  return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.invalid_credentials
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
