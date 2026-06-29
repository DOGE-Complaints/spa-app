import { describe, expect, it } from 'vitest'
import { AUTH_ERROR_I18N_KEYS, getAuthErrorMessageKey, mapAuthError, resolvePostAuthRedirect } from '../mapAuthError.js'

describe('mapAuthError', () => {
  it('maps invalid login credentials', () => {
    expect(mapAuthError(new Error('Invalid login credentials'))).toBe('invalid_credentials')
  })

  it('maps rate limit', () => {
    expect(mapAuthError({ message: 'rate limit', status: 429 })).toBe('rate_limited')
  })

  it('maps magic link expiry', () => {
    expect(mapAuthError(new Error('otp_expired'))).toBe('magic_link_expired')
  })

  it('maps account not found', () => {
    expect(mapAuthError(new Error('User not found'))).toBe('account_not_found')
  })

  it('maps network errors', () => {
    expect(mapAuthError(new Error('fetch failed'))).toBe('network_error')
  })

  it('returns distinct i18n keys for all five codes', () => {
    const codes = [
      'invalid_credentials',
      'network_error',
      'rate_limited',
      'magic_link_expired',
      'account_not_found',
    ]
    const keys = codes.map((code) => getAuthErrorMessageKey(code))
    expect(new Set(keys).size).toBe(5)
    for (const code of codes) {
      expect(getAuthErrorMessageKey(code)).toBe(AUTH_ERROR_I18N_KEYS[code])
    }
  })

  it('falls back to invalid_credentials key for unknown codes', () => {
    expect(getAuthErrorMessageKey('unknown_code')).toBe(AUTH_ERROR_I18N_KEYS.invalid_credentials)
  })
})

describe('resolvePostAuthRedirect', () => {
  it('defaults to /board', () => {
    expect(resolvePostAuthRedirect(null)).toBe('/board')
  })

  it('rejects external redirect targets', () => {
    expect(resolvePostAuthRedirect('//evil.example')).toBe('/board')
  })

  it('accepts internal paths', () => {
    expect(resolvePostAuthRedirect('/issue/1')).toBe('/issue/1')
  })
})
