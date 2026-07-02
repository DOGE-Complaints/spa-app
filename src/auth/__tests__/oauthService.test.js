/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createOAuthService,
  OAuthApiError,
  OAuthVerificationRequiredError,
} from '../oauthService.js'

const { fetchMeMock } = vi.hoisted(() => ({
  fetchMeMock: vi.fn(),
}))

vi.mock('../identityService.js', () => ({
  identityService: {
    fetchMe: fetchMeMock,
  },
}))

vi.mock('../supabaseClient.js', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: { access_token: 'mock-token' } } }),
    },
  },
}))

describe('oauthService', () => {
  beforeEach(() => {
    fetchMeMock.mockReset()
    fetchMeMock.mockResolvedValue({ phone_verified: false })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('mock mode returns redirect for mock-oauth-happy', async () => {
    const service = createOAuthService('http://localhost:8100', true)
    const result = await service.completeOAuthAuthorize('mock-oauth-happy')
    expect(result.kind).toBe('redirect')
    expect(result.location).toContain('chatgpt.com')
  })

  it('mock mode throws verification_required for mock-oauth-verify', async () => {
    const service = createOAuthService('http://localhost:8100', true)
    await expect(service.completeOAuthAuthorize('mock-oauth-verify')).rejects.toBeInstanceOf(
      OAuthVerificationRequiredError,
    )
  })

  it('mock mode requires phone verify when profile unverified', async () => {
    const service = createOAuthService('http://localhost:8100', true)
    await expect(service.completeOAuthAuthorize('any-other-id')).rejects.toMatchObject({
      code: 'verification_required',
    })
  })

  it('mock mode redirects when profile verified', async () => {
    fetchMeMock.mockResolvedValue({ phone_verified: true })
    const service = createOAuthService('http://localhost:8100', true)
    const result = await service.completeOAuthAuthorize('req-live')
    expect(result.kind).toBe('redirect')
  })

  it('live mode follows 302 Location header', async () => {
    const service = createOAuthService('http://localhost:8100', false)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 302,
        headers: {
          get: () => 'https://chatgpt.com/callback?code=abc&state=xyz',
        },
        text: async () => '',
      }),
    )
    const result = await service.completeOAuthAuthorize('req-live', 'token')
    expect(result).toEqual({
      kind: 'redirect',
      location: 'https://chatgpt.com/callback?code=abc&state=xyz',
    })
  })

  it('live mode parses flat 403 verification_required body', async () => {
    const service = createOAuthService('http://localhost:8100', false)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 403,
        headers: { get: () => null },
        text: async () =>
          JSON.stringify({
            error: 'verification_required',
            reason: 'Phone verification is required',
            verify_url: 'http://localhost/#/verify?context=custom_gpt',
          }),
      }),
    )
    await expect(service.completeOAuthAuthorize('req-live', 'token')).rejects.toBeInstanceOf(
      OAuthVerificationRequiredError,
    )
  })

  it('live mode throws OAuthApiError on unknown failures', async () => {
    const service = createOAuthService('http://localhost:8100', false)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 400,
        headers: { get: () => null },
        text: async () => JSON.stringify({ error: 'invalid_grant' }),
      }),
    )
    await expect(service.completeOAuthAuthorize('req-live', 'token')).rejects.toBeInstanceOf(
      OAuthApiError,
    )
  })
})
