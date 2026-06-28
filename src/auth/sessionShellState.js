import { AuthenticationRequiredError, IdentityApiError } from './identityService.js'

/** @typedef {'restoring'|'logged_out'|'authenticated'|'session_expired'|'backend_unavailable'|'network_error'} SessionShellState */

export const SESSION_SHELL_STATES = Object.freeze({
  RESTORING: 'restoring',
  LOGGED_OUT: 'logged_out',
  AUTHENTICATED: 'authenticated',
  SESSION_EXPIRED: 'session_expired',
  BACKEND_UNAVAILABLE: 'backend_unavailable',
  NETWORK_ERROR: 'network_error',
})

/**
 * Map identity `/me` failure to app-shell state (backlog API-интеграция).
 * @param {unknown} error
 * @param {boolean} hadAccessToken
 * @returns {SessionShellState}
 */
export function mapIdentityErrorToShellState(error, hadAccessToken) {
  if (error instanceof AuthenticationRequiredError) {
    return hadAccessToken
      ? SESSION_SHELL_STATES.SESSION_EXPIRED
      : SESSION_SHELL_STATES.LOGGED_OUT
  }
  if (error instanceof IdentityApiError) {
    if (error.code === 'network_error' || error.status === 0) {
      return SESSION_SHELL_STATES.NETWORK_ERROR
    }
    if (error.status >= 500 || error.code === 'BACKEND_UNAVAILABLE') {
      return SESSION_SHELL_STATES.BACKEND_UNAVAILABLE
    }
  }
  return SESSION_SHELL_STATES.BACKEND_UNAVAILABLE
}

/**
 * Whether overlay should block route content for the current path + shell state.
 * FR-02.2: public board/issue browsing without overlay; guard only on protected routes.
 * @param {SessionShellState} shellState
 * @param {boolean} isProtectedRoute
 * @param {boolean} isLoginRoute
 */
export function shouldShowSessionShellOverlay(shellState, isProtectedRoute, isLoginRoute) {
  if (isLoginRoute) {
    return shellState === SESSION_SHELL_STATES.RESTORING
  }
  if (shellState === SESSION_SHELL_STATES.AUTHENTICATED) {
    return false
  }
  if (shellState === SESSION_SHELL_STATES.RESTORING) {
    return true
  }
  if (
    shellState === SESSION_SHELL_STATES.LOGGED_OUT ||
    shellState === SESSION_SHELL_STATES.SESSION_EXPIRED ||
    shellState === SESSION_SHELL_STATES.BACKEND_UNAVAILABLE ||
    shellState === SESSION_SHELL_STATES.NETWORK_ERROR
  ) {
    return isProtectedRoute
  }
  return false
}
