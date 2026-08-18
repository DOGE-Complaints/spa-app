import { describe, expect, it } from 'vitest'
import {
  getVitePublicString,
  getVitePublicUrl,
  normalizePublicBaseUrl,
} from '../publicEnv.js'

describe('publicEnv (BUG-08)', () => {
  it('normalizePublicBaseUrl trims trailing space', () => {
    expect(normalizePublicBaseUrl('http://localhost:8000 ')).toBe('http://localhost:8000')
  })

  it('normalizePublicBaseUrl strips one or more trailing slashes', () => {
    expect(normalizePublicBaseUrl('http://localhost:8000/')).toBe('http://localhost:8000')
    expect(normalizePublicBaseUrl('http://localhost:8000///')).toBe('http://localhost:8000')
  })

  it('normalizePublicBaseUrl empty / whitespace-only → empty', () => {
    expect(normalizePublicBaseUrl('')).toBe('')
    expect(normalizePublicBaseUrl('   ')).toBe('')
    expect(normalizePublicBaseUrl(undefined)).toBe('')
    expect(normalizePublicBaseUrl(null)).toBe('')
  })

  it('getVitePublicUrl applies space+slash class on stub env', () => {
    expect(
      getVitePublicUrl('VITE_GATEWAY_BASE_URL', {
        VITE_GATEWAY_BASE_URL: 'http://localhost:8000/ ',
      }),
    ).toBe('http://localhost:8000')
    expect(
      getVitePublicUrl('VITE_GATEWAY_BASE_URL', {
        VITE_GATEWAY_BASE_URL: 'http://localhost:8000 ',
      }),
    ).toBe('http://localhost:8000')
  })

  it('getVitePublicString trims mode / keys without stripping URL slashes', () => {
    expect(
      getVitePublicString('VITE_LIFE_REALITY_MODE', {
        VITE_LIFE_REALITY_MODE: ' GFL-DRIVEN ',
      }),
    ).toBe('GFL-DRIVEN')
    expect(
      getVitePublicString('VITE_SUPABASE_ANON_KEY', {
        VITE_SUPABASE_ANON_KEY: ' anon-key ',
      }),
    ).toBe('anon-key')
    expect(
      getVitePublicString('VITE_IDENTITY_SERVICE_URL', {
        VITE_IDENTITY_SERVICE_URL: ' https://identity.example/ ',
      }),
    ).toBe('https://identity.example/')
  })
})
