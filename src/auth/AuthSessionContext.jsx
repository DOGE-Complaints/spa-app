import { createContext, useContext } from 'react'
import { useAuthSession } from './useAuthSession.js'

const AuthSessionContext = createContext(null)

export function AuthSessionProvider({ children }) {
  const auth = useAuthSession()
  return <AuthSessionContext.Provider value={auth}>{children}</AuthSessionContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthSessionContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthSessionProvider')
  }
  return ctx
}
