import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  AuthenticationRequiredError,
  createIdentityService,
  IdentityApiError,
} from '../identityService.js'

const mockGetSession = vi.fn()

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
    },
  },
}))

describe('identityService.fetchMe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', vi.fn())
    const store = new Map()
    vi.stubGlobal('sessionStorage', {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => {
        store.set(key, String(value))
      },
      removeItem: (key) => {
        store.delete(key)
      },
      clear: () => {
        store.clear()
      },
    })
  })

  it('returns mock profile when mock mode enabled', async () => {
    const service = createIdentityService('http://localhost:8100', true)
    const profile = await service.fetchMe()
    expect(profile.supabase_user_id).toBe('mock-user-unverified')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('throws expected errors for doge.mock-me-error flags', async () => {
    const service = createIdentityService('http://localhost:8100', true)
    const cases = [
      ['session_expired', AuthenticationRequiredError],
      ['backend_unavailable', IdentityApiError],
      ['network_error', IdentityApiError],
    ]
    for (const [flag, ErrorType] of cases) {
      sessionStorage.setItem('doge.mock-me-error', flag)
      await expect(service.fetchMe()).rejects.toBeInstanceOf(ErrorType)
      sessionStorage.removeItem('doge.mock-me-error')
    }
  })

  it('delays then returns profile for doge.mock-me-error=restoring', async () => {
    vi.useFakeTimers()
    const service = createIdentityService('http://localhost:8100', true)
    sessionStorage.setItem('doge.mock-me-error', 'restoring')
    const pending = service.fetchMe()
    await vi.advanceTimersByTimeAsync(2500)
    const profile = await pending
    expect(profile.supabase_user_id).toBe('mock-user-unverified')
    sessionStorage.removeItem('doge.mock-me-error')
    vi.useRealTimers()
  })

  it('throws AuthenticationRequiredError on 401 envelope', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { access_token: 'bad' } } })
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { code: 'AUTHENTICATION_REQUIRED' } }),
    })

    const service = createIdentityService('http://localhost:8100', false)
    await expect(service.fetchMe()).rejects.toBeInstanceOf(AuthenticationRequiredError)
  })

  it('parses success envelope data', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { access_token: 'good' } } })
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { supabase_user_id: 'abc', role: 'citizen' } }),
    })

    const service = createIdentityService('http://localhost:8100', false)
    const profile = await service.fetchMe()
    expect(profile.supabase_user_id).toBe('abc')
  })

  it('maps network failure to IdentityApiError', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { access_token: 'good' } } })
    fetch.mockRejectedValue(new Error('fetch failed'))

    const service = createIdentityService('http://localhost:8100', false)
    await expect(service.fetchMe()).rejects.toBeInstanceOf(IdentityApiError)
  })
})
