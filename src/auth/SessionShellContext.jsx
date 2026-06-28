import { createContext, useContext } from 'react'
import { useSessionShellState } from './useSessionShellState.js'

const SessionShellContext = createContext(null)

export function SessionShellProvider({ children }) {
  const value = useSessionShellState()
  return <SessionShellContext.Provider value={value}>{children}</SessionShellContext.Provider>
}

export function useSessionShell() {
  const ctx = useContext(SessionShellContext)
  if (!ctx) {
    throw new Error('useSessionShell must be used inside SessionShellProvider')
  }
  return ctx
}
