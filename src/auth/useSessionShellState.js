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
  const [profileErrorCode, setProfileErrorCode] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

  const retry = useCallback(() => {
    setRetryKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (authLoading) {
      setShellState(SESSION_SHELL_STATES.RESTORING)
      setProfileErrorCode(null)
      return
    }

    const accessToken = session?.access_token ?? null
    if (!accessToken) {
      setProfile(null)
      setProfileErrorCode(null)
      setShellState(SESSION_SHELL_STATES.LOGGED_OUT)
      return
    }

    let cancelled = false
    setShellState(SESSION_SHELL_STATES.RESTORING)
    setProfileErrorCode(null)

    identityService
      .fetchMe(accessToken)
      .then((data) => {
        if (cancelled) return
        setProfile(data)
        setProfileErrorCode(null)
        setShellState(SESSION_SHELL_STATES.AUTHENTICATED)
      })
      .catch((error) => {
        if (cancelled) return
        const nextState = mapIdentityErrorToShellState(error, Boolean(accessToken))
        const code =
          error instanceof Error && 'code' in error && typeof error.code === 'string'
            ? error.code
            : null
        setProfile(null)
        setProfileErrorCode(code)
        setShellState(nextState)
      })

    return () => {
      cancelled = true
    }
  }, [session, authLoading, retryKey])

  return {
    shellState,
    profile,
    profileErrorCode,
    retry,
    isAuthenticated: shellState === SESSION_SHELL_STATES.AUTHENTICATED,
  }
}
