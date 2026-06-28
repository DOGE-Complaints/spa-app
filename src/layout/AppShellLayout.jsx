import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { shouldShowSessionShellOverlay } from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { AppShell } from '../components/AppShell/index.js'
import { SessionShellOverlay } from '../components/SessionShellState/index.js'
import {
  isLoginPath,
  isProtectedPath,
  isPublicPath,
} from '../router/sessionRoutePolicy.js'

function ProtectedPlaceholder({ title }) {
  return (
    <div className="session-shell-protected-placeholder" data-testid="protected-route-placeholder">
      <h2>{title}</h2>
      <p>Protected area — session shell guard applies.</p>
    </div>
  )
}

export function AppShellLayout() {
  const location = useLocation()
  const { shellState, retry } = useSessionShell()
  const protectedRoute = isProtectedPath(location.pathname)
  const loginRoute = isLoginPath(location.pathname)
  const useFullShell = protectedRoute || !isPublicPath(location.pathname)

  const showOverlay = shouldShowSessionShellOverlay(shellState, protectedRoute, loginRoute)

  const content = (
    <>
      <Outlet />
      {showOverlay ? <SessionShellOverlay shellState={shellState} onRetry={retry} /> : null}
    </>
  )

  if (useFullShell) {
    return <AppShell>{content}</AppShell>
  }

  return <div className="app-shell-pass-through">{content}</div>
}

export function ProtectedProfilePage() {
  return <ProtectedPlaceholder title="Profile" />
}

export function ProtectedStoryComposePage() {
  return <ProtectedPlaceholder title="Story Compose" />
}

export function ProtectedRouteRedirect() {
  return <Navigate to="/profile" replace />
}
