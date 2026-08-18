import { describe, expect, it } from 'vitest'
import { resolveSupabasePublicConfig } from '../supabaseClient.js'

describe('resolveSupabasePublicConfig (BUG-08)', () => {
  it('trims URL space/slashes and key whitespace', () => {
    expect(
      resolveSupabasePublicConfig({
        VITE_SUPABASE_URL: ' https://example.supabase.co/ ',
        VITE_SUPABASE_ANON_KEY: ' anon-key ',
      }),
    ).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
      ready: true,
    })
  })

  it('trailing space on URL is harmless', () => {
    expect(
      resolveSupabasePublicConfig({
        VITE_SUPABASE_URL: 'https://example.supabase.co ',
        VITE_SUPABASE_ANON_KEY: 'anon',
      }).url,
    ).toBe('https://example.supabase.co')
  })

  it('empty → not ready', () => {
    expect(resolveSupabasePublicConfig({ VITE_SUPABASE_URL: '  ', VITE_SUPABASE_ANON_KEY: '' })).toEqual(
      { url: '', anonKey: '', ready: false },
    )
  })
})
