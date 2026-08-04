import { useContext } from 'react'
import { SessionShellContext } from '../../auth/SessionShellContext.jsx'
import { AccountControl } from './AccountControl.jsx'

/**
 * Mount AccountControl only when SessionShellProvider is present.
 * SSR / static markup tests render Header without auth providers → empty slot.
 */
export function AccountControlSlot({ className = '' }) {
  const shell = useContext(SessionShellContext)
  if (!shell) return null
  return <AccountControl className={className} />
}
