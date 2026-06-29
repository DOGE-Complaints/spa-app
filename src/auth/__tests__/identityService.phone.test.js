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

  describe('mock error fixtures (ID-05-T09)', () => {
    const requestCases = [
      ['+37288888888', 'COUNTRY_NOT_ALLOWED'],
      ['+37277777777', 'RATE_LIMITED'],
      ['+37266666666', 'SEND_FAILED'],
      ['+37255555556', 'profile_conflict'],
      ['+37244444444', 'PROVIDER_UNAVAILABLE'],
      ['+37233333333', 'network_error'],
    ]

    it.each(requestCases)('requestPhoneVerification %s → %s', async (phone, code) => {
      const service = createIdentityService('http://localhost:8100', true)
      await expect(service.requestPhoneVerification(phone)).rejects.toMatchObject({ code })
    })

    const confirmCases = [
      ['999999', 'CODE_MISMATCH'],
      ['888888', 'CODE_EXPIRED'],
      ['777777', 'TOO_MANY_ATTEMPTS'],
      ['666666', 'AUTHENTICATION_REQUIRED'],
      ['555555', 'session_expired'],
    ]

    it.each(confirmCases)('confirmPhoneVerification OTP %s → %s', async (otp, code) => {
      const service = createIdentityService('http://localhost:8100', true)
      service._resetMockProfile?.()
      await expect(service.confirmPhoneVerification('+37255555555', otp)).rejects.toMatchObject({
        code,
      })
    })
  })
})
