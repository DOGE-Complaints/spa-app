import { createClient } from '@supabase/supabase-js'
import { rememberMeAuthStorage } from './rememberMeStorage.js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

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
