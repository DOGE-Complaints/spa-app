import { describe, expect, it, vi } from 'vitest'

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}))

import {
  AuthenticationRequiredError,
  IdentityApiError,
} from '../identityService.js'
import {
  SESSION_SHELL_STATES,
  mapIdentityErrorToShellState,
  shouldShowSessionShellOverlay,
} from '../sessionShellState.js'

describe('sessionShellState', () => {
  it('maps AUTHENTICATION_REQUIRED with token to session_expired', () => {
    expect(
      mapIdentityErrorToShellState(new AuthenticationRequiredError(), true),
    ).toBe(SESSION_SHELL_STATES.SESSION_EXPIRED)
  })

  it('maps AUTHENTICATION_REQUIRED without token to logged_out', () => {
    expect(
      mapIdentityErrorToShellState(new AuthenticationRequiredError(), false),
    ).toBe(SESSION_SHELL_STATES.LOGGED_OUT)
  })

  it('maps network_error to NETWORK_ERROR', () => {
    expect(
      mapIdentityErrorToShellState(new IdentityApiError('network_error', 0), true),
    ).toBe(SESSION_SHELL_STATES.NETWORK_ERROR)
  })

  it('maps 503 to BACKEND_UNAVAILABLE', () => {
    expect(
      mapIdentityErrorToShellState(new IdentityApiError('unknown_error', 503), true),
    ).toBe(SESSION_SHELL_STATES.BACKEND_UNAVAILABLE)
  })

  it('shows logged_out overlay only on protected routes', () => {
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.LOGGED_OUT, true, false),
    ).toBe(true)
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.LOGGED_OUT, false, false),
    ).toBe(false)
  })

  it.each([
    SESSION_SHELL_STATES.SESSION_EXPIRED,
    SESSION_SHELL_STATES.BACKEND_UNAVAILABLE,
    SESSION_SHELL_STATES.NETWORK_ERROR,
  ])('shows %s overlay only on protected routes (public board browse)', (state) => {
    expect(shouldShowSessionShellOverlay(state, true, false)).toBe(true)
    expect(shouldShowSessionShellOverlay(state, false, false)).toBe(false)
  })

  it('shows restoring overlay on public and protected routes', () => {
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.RESTORING, false, false),
    ).toBe(true)
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.RESTORING, true, false),
    ).toBe(true)
  })

  it('shows restoring overlay on login route only when restoring', () => {
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.RESTORING, false, true),
    ).toBe(true)
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.SESSION_EXPIRED, false, true),
    ).toBe(false)
  })

  it('hides overlay when authenticated', () => {
    expect(
      shouldShowSessionShellOverlay(SESSION_SHELL_STATES.AUTHENTICATED, true, false),
    ).toBe(false)
  })
})
