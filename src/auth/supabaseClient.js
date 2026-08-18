import { createClient } from '@supabase/supabase-js'
import { rememberMeAuthStorage } from './rememberMeStorage.js'
import { getVitePublicString, getVitePublicUrl } from '../config/publicEnv.js'

/**
 * @param {Record<string, unknown>} [env]
 * @returns {{ url: string, anonKey: string, ready: boolean }}
 */
export function resolveSupabasePublicConfig(env = import.meta.env) {
  const url = getVitePublicUrl('VITE_SUPABASE_URL', env)
  const anonKey = getVitePublicString('VITE_SUPABASE_ANON_KEY', env)
  return { url, anonKey, ready: Boolean(url && anonKey) }
}

const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY, ready: hasSupabaseConfig } =
  resolveSupabasePublicConfig()

if (!hasSupabaseConfig) {
  console.warn('[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Auth will not work.')
}

/** Placeholder keeps module load safe in dev/test without env (AC: no throw on import). */
const RESOLVED_URL = hasSupabaseConfig ? SUPABASE_URL : 'http://127.0.0.1:54321'
const RESOLVED_ANON_KEY = hasSupabaseConfig ? SUPABASE_ANON_KEY : 'public-anon-key-placeholder'

export const supabaseConfigReady = hasSupabaseConfig

export const supabase = createClient(RESOLVED_URL, RESOLVED_ANON_KEY, {
  auth: {
    storageKey: 'dogestonia-auth',
    storage: rememberMeAuthStorage,
  },
})
