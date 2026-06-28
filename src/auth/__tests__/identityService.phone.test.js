import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createIdentityService, IdentityApiError } from '../identityService.js'

const mockGetSession = vi.fn()

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: (...args) => mockGetSession(...args),
    },
  },
}))

describe('identityService phone verification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('requestPhoneVerification returns mock envelope', async () => {
    const service = createIdentityService('http://localhost:8100', true)
    service._resetMockProfile?.()
    const result = await service.requestPhoneVerification('+37255555555')
    expect(result.sent).toBe(true)
    expect(result.expires_at).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('confirmPhoneVerification marks mock profile verified', async () => {
    const service = createIdentityService('http://localhost:8100', true)
    service._resetMockProfile?.()
    await service.confirmPhoneVerification('+37255555555', '123456')
    const profile = await service.fetchMe()
    expect(profile.phone_verified).toBe(true)
    expect(profile.phone_dial_prefix).toBe('+372')
  })

  it('confirmPhoneVerification rejects invalid mock code', async () => {
    const service = createIdentityService('http://localhost:8100', true)
    await expect(service.confirmPhoneVerification('+37255555555', 'bad')).rejects.toBeInstanceOf(
      IdentityApiError,
    )
  })

  it('requestPhoneVerification posts to backend with bearer token', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { access_token: 'tok' } } })
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { sent: true, expires_at: '2026-06-23T12:05:00Z' } }),
    })

    const service = createIdentityService('http://localhost:8100', false)
    const result = await service.requestPhoneVerification('+37255555555')
    expect(result.sent).toBe(true)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/phone/request'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ phone: '+37255555555' }),
      }),
    )
  })

  it('confirmPhoneVerification posts phone and code', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { access_token: 'tok' } } })
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { status: 'verified' } }),
    })

    const service = createIdentityService('http://localhost:8100', false)
    const result = await service.confirmPhoneVerification('+37255555555', '123456')
    expect(result.status).toBe('verified')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/phone/confirm'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ phone: '+37255555555', code: '123456' }),
      }),
    )
  })
})
