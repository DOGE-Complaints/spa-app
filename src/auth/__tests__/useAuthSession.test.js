/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAuthSession } from '../useAuthSession.js'

const mockGetSession = vi.fn()
const mockOnAuthStateChange = vi.fn()
const mockUnsubscribe = vi.fn()

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
      onAuthStateChange: (...args) => mockOnAuthStateChange(...args),
    },
  },
}))

describe('useAuthSession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSession.mockResolvedValue({ data: { session: null } })
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    })
  })

  it('returns null session when no stored token', async () => {
    const { result } = renderHook(() => useAuthSession())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.session).toBeNull()
    expect(result.current.user).toBeNull()
  })

  it('restores session from getSession on mount', async () => {
    const session = { access_token: 'token', user: { id: 'user-1' } }
    mockGetSession.mockResolvedValue({ data: { session } })

    const { result } = renderHook(() => useAuthSession())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.session).toEqual(session)
    expect(result.current.user).toEqual(session.user)
  })
})
