import { useCallback, useEffect, useState } from 'react'
import { identityService } from './identityService.js'
import {
  SESSION_SHELL_STATES,
  mapIdentityErrorToShellState,
} from './sessionShellState.js'
import { useAuth } from './AuthSessionContext.jsx'

/**
 * Resolves app-level session shell state from getSession + GET /me.
 * Never exposes raw tokens — only shellState + safe profile fields.
 */
export function useSessionShellState() {
  const { session, loading: authLoading } = useAuth()
  const [shellState, setShellState] = useState(SESSION_SHELL_STATES.RESTORING)
  const [profile, setProfile] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

  const retry = useCallback(() => {
    setRetryKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (authLoading) {
      setShellState(SESSION_SHELL_STATES.RESTORING)
      return
    }

    const accessToken = session?.access_token ?? null
    if (!accessToken) {
      setProfile(null)
      setShellState(SESSION_SHELL_STATES.LOGGED_OUT)
      return
    }

    let cancelled = false
    setShellState(SESSION_SHELL_STATES.RESTORING)

    identityService
      .fetchMe(accessToken)
      .then((data) => {
        if (cancelled) return
        setProfile(data)
        setShellState(SESSION_SHELL_STATES.AUTHENTICATED)
      })
      .catch((error) => {
        if (cancelled) return
        setProfile(null)
        setShellState(mapIdentityErrorToShellState(error, Boolean(accessToken)))
      })

    return () => {
      cancelled = true
    }
  }, [session, authLoading, retryKey])

  return {
    shellState,
    profile,
    retry,
    isAuthenticated: shellState === SESSION_SHELL_STATES.AUTHENTICATED,
  }
}
