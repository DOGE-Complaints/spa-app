import { useState } from 'react'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { fetchIdentityReady } from '../../auth/identityReadyClient.js'
import {
  BackendUnavailablePanel,
  LoggedOutPanel,
  NetworkErrorPanel,
  RestoringSessionPanel,
  SessionExpiredPanel,
} from './SessionShellPanels.jsx'
import './SessionShellState.css'

/**
 * @param {{ shellState: string, onRetry: () => void }} props
 */
export function SessionShellOverlay({ shellState, onRetry }) {
  const [statusMessage, setStatusMessage] = useState('')

  async function handleViewStatus() {
    try {
      const ready = await fetchIdentityReady()
      setStatusMessage(`System status: ${ready.status ?? 'ready'}`)
    } catch {
      setStatusMessage('System status unavailable right now.')
    }
  }

  let panel = null
  switch (shellState) {
    case SESSION_SHELL_STATES.RESTORING:
      panel = <RestoringSessionPanel />
      break
    case SESSION_SHELL_STATES.LOGGED_OUT:
      panel = <LoggedOutPanel />
      break
    case SESSION_SHELL_STATES.SESSION_EXPIRED:
      panel = <SessionExpiredPanel />
      break
    case SESSION_SHELL_STATES.BACKEND_UNAVAILABLE:
      panel = <BackendUnavailablePanel onRetry={onRetry} onViewStatus={handleViewStatus} />
      break
    case SESSION_SHELL_STATES.NETWORK_ERROR:
      panel = <NetworkErrorPanel onRetry={onRetry} />
      break
    default:
      return null
  }

  const restoring = shellState === SESSION_SHELL_STATES.RESTORING

  return (
    <div
      className={`session-shell-overlay ${restoring ? 'session-shell-overlay--restoring' : ''}`}
      data-testid="session-shell-overlay"
    >
      {panel}
      {statusMessage ? (
        <p className="session-shell-panel__status" data-testid="session-shell-status-message">
          {statusMessage}
        </p>
      ) : null}
    </div>
  )
}
