import { Outlet, useLocation } from 'react-router-dom'
import {
  isCabinetProfileLoadErrorState,
  shouldShowSessionShellOverlay,
} from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { AppShell } from '../components/AppShell/index.js'
import { SessionShellOverlay } from '../components/SessionShellState/index.js'
import { UserCabinetPage } from '../pages/UserCabinetPage.jsx'
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

  const cabinetInPageProfileError =
    location.pathname === '/profile' && isCabinetProfileLoadErrorState(shellState)
  const showOverlay = shouldShowSessionShellOverlay(shellState, protectedRoute, loginRoute, {
    cabinetInPageProfileError,
  })

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
  return <UserCabinetPage />
}
