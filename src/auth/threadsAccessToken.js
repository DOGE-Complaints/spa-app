/**
 * Resolve Bearer access token for threads social writes (THR-08).
 * Reuses identity/supabase session store — same pattern as identityService / storyDraftService.
 */

import { supabase } from './supabaseClient.js'

/**
 * @param {string|null|undefined} [explicitToken]
 * @returns {Promise<string|null>}
 */
export async function getThreadsAccessToken(explicitToken) {
  if (explicitToken) {
    return String(explicitToken)
  }
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}
