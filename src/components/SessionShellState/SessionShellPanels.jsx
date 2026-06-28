import { Link } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import './SessionShellState.css'

function ShellStatePanel({ title, message, code, children, state }) {
  return (
    <div
      className="session-shell-panel"
      data-session-shell-state={state}
      role="status"
      aria-live="polite"
    >
      <h2 className="session-shell-panel__title">{title}</h2>
      <p className="session-shell-panel__message">{message}</p>
      {code ? (
        <p className="session-shell-panel__code" data-testid="session-shell-code">
          Code: {code}
        </p>
      ) : null}
      <div className="session-shell-panel__actions">{children}</div>
    </div>
  )
}

export function RestoringSessionPanel() {
  return (
    <div
      className="session-shell-restoring"
      data-session-shell-state={SESSION_SHELL_STATES.RESTORING}
      data-testid="session-shell-restoring"
      role="status"
      aria-live="polite"
    >
      <h2 className="session-shell-panel__title">Restoring Session</h2>
      <p className="session-shell-panel__message">DOGEstonia is checking your secure session.</p>
      <p className="session-shell-panel__status">Checking session</p>
      <div className="session-shell-skeleton" aria-hidden="true">
        <div className="session-shell-skeleton__sidebar" />
        <div className="session-shell-skeleton__main">
          <div className="session-shell-skeleton__header" />
          <div className="session-shell-skeleton__card" />
          <div className="session-shell-skeleton__card" />
        </div>
      </div>
    </div>
  )
}

export function LoggedOutPanel() {
  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.LOGGED_OUT}
      title="Sign In Required"
      message="Please sign in to access DOGEstonia."
    >
      <Link to="/login" className="session-shell-button session-shell-button--primary">
        Sign In
      </Link>
      <Link to="/login" className="session-shell-button session-shell-button--secondary">
        Create Account
      </Link>
      <Link to="/board" className="session-shell-link">
        Continue to public board
      </Link>
    </ShellStatePanel>
  )
}

export function SessionExpiredPanel() {
  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.SESSION_EXPIRED}
      title="Session Expired"
      message="Your session has expired. Please sign in again to continue."
    >
      <div className="session-shell-context-block">
        <span className="session-shell-context-block__label">Previous Action</span>
        <span className="session-shell-context-block__value">Status: Waiting</span>
      </div>
      <Link to="/login" className="session-shell-button session-shell-button--primary">
        Sign In Again
      </Link>
      <Link to="/board" className="session-shell-button session-shell-button--secondary">
        Return To Public Board
      </Link>
    </ShellStatePanel>
  )
}

export function BackendUnavailablePanel({ onRetry, onViewStatus }) {
  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.BACKEND_UNAVAILABLE}
      title="DOGEstonia Services Temporarily Unavailable"
      message="We could not load DOGEstonia services right now. Please try again shortly."
      code="BACKEND_UNAVAILABLE"
    >
      <button type="button" className="session-shell-button session-shell-button--primary" onClick={onRetry}>
        Retry
      </button>
      <button type="button" className="session-shell-button session-shell-button--secondary" onClick={onViewStatus}>
        View System Status
      </button>
    </ShellStatePanel>
  )
}

export function NetworkErrorPanel({ onRetry }) {
  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.NETWORK_ERROR}
      title="Connection Problem"
      message="We could not reach DOGEstonia. Check your connection and try again."
      code="NETWORK_ERROR"
    >
      <button type="button" className="session-shell-button session-shell-button--primary" onClick={onRetry}>
        Retry
      </button>
    </ShellStatePanel>
  )
}
