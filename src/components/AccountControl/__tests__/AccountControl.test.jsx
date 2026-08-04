/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AccountControl } from '../AccountControl.jsx'
import { SESSION_SHELL_STATES } from '../../../auth/sessionShellState.js'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

const mockUseSessionShell = vi.fn()
const mockSignOut = vi.fn(() => Promise.resolve({ error: null }))
const mockNavigate = vi.fn()

vi.mock('../../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

vi.mock('../../../auth/supabaseClient.js', () => ({
  supabase: {
    auth: {
      signOut: (...args) => mockSignOut(...args),
    },
  },
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderControl(initialPath = '/board') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<AccountControl />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('AccountControl (PH-02)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    mockSignOut.mockClear()
    mockNavigate.mockClear()
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.LOGGED_OUT,
      profile: null,
      isAuthenticated: false,
    })
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('guest shows Sign in link to /login without menu', () => {
    renderControl()
    const signIn = screen.getByTestId('account-control-sign-in')
    expect(signIn.getAttribute('href')).toBe('/login')
    expect(signIn.textContent).toContain('Sign in')
    expect(screen.getByTestId('account-control').getAttribute('data-state')).toBe('guest')
    expect(screen.queryByTestId('account-control-menu')).toBeNull()
  })

  it('authenticated idle opens menu with Profile and Log out only', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Anna', avatar_url: null },
      isAuthenticated: true,
    })
    renderControl()
    expect(screen.getByTestId('account-control').getAttribute('data-state')).toBe('authenticated')
    expect(screen.getByText('Anna')).toBeTruthy()

    fireEvent.click(screen.getByTestId('account-control-trigger'))
    const menu = screen.getByTestId('account-control-menu')
    const items = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => el.textContent.trim())
    expect(items).toEqual(['Profile', 'Log out'])
    expect(screen.getByTestId('account-control-profile').getAttribute('href')).toBe('/profile')
  })

  it('Escape dismisses auth menu', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Anna' },
      isAuthenticated: true,
    })
    renderControl()
    fireEvent.click(screen.getByTestId('account-control-trigger'))
    expect(screen.getByTestId('account-control-menu')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('account-control-menu')).toBeNull()
  })

  it('Log out calls supabase.auth.signOut and redirects to /board', async () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Anna' },
      isAuthenticated: true,
    })
    renderControl()
    fireEvent.click(screen.getByTestId('account-control-trigger'))
    fireEvent.click(screen.getByTestId('account-control-logout'))
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/board', { replace: true })
    })
  })

  it('does not call any /logout backend path', async () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Anna' },
      isAuthenticated: true,
    })
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    renderControl()
    fireEvent.click(screen.getByTestId('account-control-trigger'))
    fireEvent.click(screen.getByTestId('account-control-logout'))
    await waitFor(() => expect(mockSignOut).toHaveBeenCalled())
    const logoutCalls = fetchSpy.mock.calls.filter(([url]) => String(url).includes('/logout'))
    expect(logoutCalls).toEqual([])
    fetchSpy.mockRestore()
  })
})
