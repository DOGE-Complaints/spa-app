/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionShellProvider, useSessionShell } from '../SessionShellContext.jsx'
import { AuthSessionProvider } from '../AuthSessionContext.jsx'
import { SESSION_SHELL_STATES } from '../sessionShellState.js'

const mockGetSession = vi.fn()
const mockOnAuthStateChange = vi.fn()
const mockFetchMe = vi.fn()
const mockUnsubscribe = vi.fn()

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
      onAuthStateChange: (...args) => mockOnAuthStateChange(...args),
    },
  },
}))

vi.mock('../identityService.js', () => ({
  identityService: {
    fetchMe: (...args) => mockFetchMe(...args),
  },
  AuthenticationRequiredError: class AuthenticationRequiredError extends Error {
    constructor(message = 'AUTHENTICATION_REQUIRED') {
      super(message)
      this.name = 'AuthenticationRequiredError'
      this.code = 'AUTHENTICATION_REQUIRED'
    }
  },
  IdentityApiError: class IdentityApiError extends Error {
    constructor(code, status) {
      super(code)
      this.name = 'IdentityApiError'
      this.code = code
      this.status = status
    }
  },
}))

function wrapper({ children }) {
  return (
    <AuthSessionProvider>
      <SessionShellProvider>{children}</SessionShellProvider>
    </AuthSessionProvider>
  )
}

describe('useSessionShell', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSession.mockResolvedValue({ data: { session: null } })
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    })
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    })
    vi.stubGlobal('sessionStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    })
  })

  it('resolves logged_out when no session', async () => {
    const { result } = renderHook(() => useSessionShell(), { wrapper })

    await waitFor(() => {
      expect(result.current.shellState).toBe(SESSION_SHELL_STATES.LOGGED_OUT)
    })
    expect(mockFetchMe).not.toHaveBeenCalled()
  })

  it('resolves authenticated after fetchMe success', async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { access_token: 'token', user: { id: 'u1' } } },
    })
    mockFetchMe.mockResolvedValue({ display_name: 'Demo User' })

    const { result } = renderHook(() => useSessionShell(), { wrapper })

    await waitFor(() => {
      expect(result.current.shellState).toBe(SESSION_SHELL_STATES.AUTHENTICATED)
    })
    expect(result.current.profile).toEqual({ display_name: 'Demo User' })
  })
})
