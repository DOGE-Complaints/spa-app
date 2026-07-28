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
 * Profile `/me` data failure handled in-cabinet (M22) — not auth logout / session expired.
 * @param {SessionShellState} shellState
 */
export function isCabinetProfileLoadErrorState(shellState) {
  return (
    shellState === SESSION_SHELL_STATES.BACKEND_UNAVAILABLE ||
    shellState === SESSION_SHELL_STATES.NETWORK_ERROR
  )
}

/**
 * Map shell / identity error to M22 display code (UI contract §6).
 * @param {SessionShellState} shellState
 * @param {string | null | undefined} profileErrorCode
 */
export function resolveProfileLoadErrorCode(shellState, profileErrorCode) {
  const raw = typeof profileErrorCode === 'string' ? profileErrorCode : ''
  const normalized = raw.trim()
  if (normalized) {
    const upper = normalized.toUpperCase()
    if (upper === 'NETWORK_ERROR') return 'NETWORK_ERROR'
    if (upper === 'BACKEND_UNAVAILABLE') return 'BACKEND_UNAVAILABLE'
    if (upper === 'PROFILE_LOAD_FAILED') return 'PROFILE_LOAD_FAILED'
    if (upper === 'SESSION_EXPIRED') return 'SESSION_EXPIRED'
    if (upper === 'AUTHENTICATION_REQUIRED') return 'AUTHENTICATION_REQUIRED'
    if (upper === 'PROFILE_NOT_FOUND') return 'PROFILE_NOT_FOUND'
    if (upper === 'RATE_LIMITED') return 'RATE_LIMITED'
    if (upper === 'UNKNOWN_ERROR') return 'UNKNOWN_ERROR'
    return upper
  }
  if (shellState === SESSION_SHELL_STATES.NETWORK_ERROR) {
    return 'NETWORK_ERROR'
  }
  return 'PROFILE_LOAD_FAILED'
}

/**
 * Whether overlay should block route content for the current path + shell state.
 * FR-02.2: public board/issue browsing without overlay; guard only on protected routes.
 * CAB-07 M22: on `/profile`, BACKEND_UNAVAILABLE / NETWORK_ERROR stay in-page (ErrorPanel).
 * @param {SessionShellState} shellState
 * @param {boolean} isProtectedRoute
 * @param {boolean} isLoginRoute
 * @param {{ cabinetInPageProfileError?: boolean }} [options]
 */
export function shouldShowSessionShellOverlay(
  shellState,
  isProtectedRoute,
  isLoginRoute,
  options = {},
) {
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
    options.cabinetInPageProfileError &&
    isCabinetProfileLoadErrorState(shellState)
  ) {
    return false
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
