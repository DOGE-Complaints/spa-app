import { Outlet, useLocation } from 'react-router-dom'
import {
  isCabinetProfileLoadErrorState,
  shouldShowSessionShellOverlay,
} from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import {
  AppShell,
  Header,
  MobileAppBar,
  MobileBottomNav,
  ProfileRail,
  PublicFooter,
  Sidebar,
} from '../components/AppShell/index.js'
import { SessionShellOverlay } from '../components/SessionShellState/index.js'
import { PUBLIC_SHELL_SHOW_SIDEBAR } from '../config/publicShell.js'
import { useStoryActivityRail } from '../hooks/useStoryActivityRail.js'
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

function boardBackFromSearch(search) {
  const params = new URLSearchParams(search)
  const from = params.get('from') || ''
  if (from.startsWith('/board')) return from
  return '/board'
}

/** NS-03: ProfileRail + honest empty story-activity (SPA HTTP not wired). */
function NextFeedProfileRailSlot() {
  const activity = useStoryActivityRail()
  return <ProfileRail activity={activity} />
}

/**
 * Single chrome owner for public + workspace routes (REQ21-01 / AC-21-01).
 * Public: Header + PublicFooter + PH-09 sidebar flag.
 * Protected: default AppShell workspace chrome (sidebar on).
 */
export function AppShellLayout() {
  const location = useLocation()
  const { shellState, retry } = useSessionShell()
  const protectedRoute = isProtectedPath(location.pathname)
  const loginRoute = isLoginPath(location.pathname)
  const publicRoute = isPublicPath(location.pathname)
  const useFullShell = protectedRoute || !publicRoute

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

  if (publicRoute && !loginRoute) {
    const isHowItWorks = location.pathname === '/how-it-works'
    const isIssue = location.pathname.startsWith('/issue/')
    const isNextFeed =
      location.pathname === '/next/feed' || location.pathname.startsWith('/next/feed/')
    // NS-03: ProfileRail on next-feed host only; classic shelter-list + PH-09 flag intact elsewhere
    const showSidebar = isNextFeed ? true : PUBLIC_SHELL_SHOW_SIDEBAR
    const shellClass = [
      isHowItWorks ? 'how-it-works-shell' : null,
      isNextFeed ? 'next-shell-route' : null,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <AppShell
        className={shellClass}
        header={<Header />}
        sidebar={
          isNextFeed ? (
            <NextFeedProfileRailSlot />
          ) : (
            <Sidebar
              activeNav="board"
              boardTo={isIssue ? boardBackFromSearch(location.search) : undefined}
            />
          )
        }
        showSidebar={showSidebar}
        showRightSlot={isNextFeed}
        rightSlot={null}
        mobileTop={isNextFeed ? <MobileAppBar leadingAction="menu" /> : null}
        mobileBottom={isNextFeed ? <MobileBottomNav /> : null}
        footer={<PublicFooter />}
      >
        {content}
      </AppShell>
    )
  }

  if (useFullShell) {
    return <AppShell>{content}</AppShell>
  }

  // Login is outside this layout; keep pass-through only as defensive fallback.
  return <div className="app-shell-pass-through">{content}</div>
}

export function ProtectedProfilePage() {
  return <UserCabinetPage />
}
