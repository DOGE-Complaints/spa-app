/**
 * @vitest-environment jsdom
 * NS-11: /profile uses next shell (Header + ProfileRail + PublicFooter).
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppShellLayout, ProtectedProfilePage } from '../AppShellLayout.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'

vi.mock('../../auth/SessionShellContext.jsx', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSessionShell: () => ({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      retry: () => {},
      profile: { display_name: 'Demo', role: 'citizen' },
      profileErrorCode: null,
    }),
    useOptionalSessionShell: () => null,
  }
})

function renderAt(path) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/profile" element={<ProtectedProfilePage />} />
            <Route path="/dashboard" element={<div data-testid="dashboard-host">dash</div>} />
            <Route path="/next/feed" element={<div data-testid="feed-host">feed</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('AppShellLayout NS-11 profile next shell', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('renders Header + ProfileRail + PublicFooter on /profile', () => {
    renderAt('/profile')
    expect(screen.getByTestId('public-header')).toBeTruthy()
    expect(screen.getByTestId('profile-rail')).toBeTruthy()
    expect(screen.getByTestId('public-footer')).toBeTruthy()
    expect(screen.getByTestId('user-cabinet-page')).toBeTruthy()
    expect(screen.getByTestId('mobile-app-bar')).toBeTruthy()
    expect(screen.getByTestId('mobile-bottom-nav')).toBeTruthy()
    expect(screen.getByTestId('next-shell-right-slot')).toBeTruthy()
    expect(document.querySelector('.next-shell-route.next-shell-profile')).toBeTruthy()
  })

  it('does not render Workspace/Board classic sidebar on /profile', () => {
    renderAt('/profile')
    expect(screen.queryByTestId('app-shell-nav-board')).toBeNull()
    expect(screen.queryByTestId('app-shell-nav-profile')).toBeNull()
    expect(document.querySelector('.board-sidebar-workspace')).toBeNull()
  })

  it('keeps brand home → /next/feed on profile shell', () => {
    renderAt('/profile')
    expect(screen.getByTestId('public-header-brand').getAttribute('href')).toBe('/next/feed')
  })

  it('leaves other protected routes on default workspace shell (soft OOS)', () => {
    renderAt('/dashboard')
    expect(screen.getByTestId('dashboard-host')).toBeTruthy()
    expect(document.querySelector('.next-shell-profile')).toBeNull()
    expect(screen.queryByTestId('profile-rail')).toBeNull()
    expect(screen.getByTestId('app-shell-nav-profile')).toBeTruthy()
  })
})
