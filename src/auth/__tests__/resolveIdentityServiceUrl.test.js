import { describe, expect, it } from 'vitest'
import {
  IDENTITY_SERVICE_DEV_FALLBACK,
  resolveIdentityServiceUrl,
} from '../resolveIdentityServiceUrl.js'

describe('resolveIdentityServiceUrl (HL-04)', () => {
  it('PROD missing URL throws and does not return localhost', () => {
    expect(() =>
      resolveIdentityServiceUrl({ PROD: true, VITE_IDENTITY_SERVICE_URL: undefined }),
    ).toThrow(/VITE_IDENTITY_SERVICE_URL/)
    expect(() =>
      resolveIdentityServiceUrl({ PROD: true, VITE_IDENTITY_SERVICE_URL: '' }),
    ).toThrow(/refusing localhost fallback/)
    expect(() =>
      resolveIdentityServiceUrl({ PROD: true, VITE_IDENTITY_SERVICE_URL: '   ' }),
    ).toThrow(/VITE_IDENTITY_SERVICE_URL/)
  })

  it('PROD with public URL returns trimmed value', () => {
    expect(
      resolveIdentityServiceUrl({
        PROD: true,
        VITE_IDENTITY_SERVICE_URL: ' https://identity.example/ ',
      }),
    ).toBe('https://identity.example/')
  })

  it('non-PROD missing URL uses localhost fallback', () => {
    expect(resolveIdentityServiceUrl({ PROD: false })).toBe(
      IDENTITY_SERVICE_DEV_FALLBACK,
    )
    expect(resolveIdentityServiceUrl({})).toBe(IDENTITY_SERVICE_DEV_FALLBACK)
  })

  it('non-PROD keeps explicit localhost', () => {
    expect(
      resolveIdentityServiceUrl({
        PROD: false,
        VITE_IDENTITY_SERVICE_URL: 'http://localhost:8100',
      }),
    ).toBe('http://localhost:8100')
  })
})
