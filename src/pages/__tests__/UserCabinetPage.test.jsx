/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { ProtectedProfilePage } from '../../layout/AppShellLayout.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../i18n/cabinetDictionary.js'

const mockUseSessionShell = vi.fn()

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

function renderProfilePage() {
  return render(
    <MemoryRouter initialEntries={['/profile']}>
      <I18nProvider>
        <ProtectedProfilePage />
      </I18nProvider>
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe('ProtectedProfilePage / UserCabinetPage', () => {
  it('renders Account Summary instead of placeholder when authenticated', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Demo User', role: 'citizen' },
      retry: vi.fn(),
    })
    renderProfilePage()
    expect(screen.getByTestId('user-cabinet-page')).toBeTruthy()
    expect(screen.getByTestId('account-summary')).toBeTruthy()
    expect(screen.queryByTestId('protected-route-placeholder')).toBeNull()
  })

  it('shows shell loading before profile blocks mount', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.RESTORING,
      profile: null,
      retry: vi.fn(),
    })
    renderProfilePage()
    expect(screen.getByTestId('cabinet-shell-loading').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.shell.loading,
    )
    expect(screen.queryByTestId('account-summary')).toBeNull()
  })
})
