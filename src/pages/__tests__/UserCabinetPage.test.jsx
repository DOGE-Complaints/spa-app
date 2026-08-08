/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { AppShellLayout, ProtectedProfilePage } from '../../layout/AppShellLayout.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../i18n/cabinetDictionary.js'
import { IDENTITY_DICTIONARY_EN } from '../../i18n/identityDictionary.js'
import { DashboardPage } from '../DashboardPage.jsx'

const mockUseSessionShell = vi.fn()

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

function renderProfileInShell(initialPath = '/profile') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <I18nProvider>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/profile" element={<ProtectedProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </I18nProvider>
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe('ProtectedProfilePage / UserCabinetPage', () => {
  it('renders cabinet with M99 section slots and AccountSummary (not placeholder)', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Demo User', role: 'citizen', phone_verified: false },
      retry: vi.fn(),
    })
    renderProfileInShell()
    expect(screen.getByTestId('user-cabinet-page')).toBeTruthy()
    expect(screen.getByTestId('cabinet-grid')).toBeTruthy()
    expect(screen.getByTestId('cabinet-slot-civic')).toBeTruthy()
    expect(screen.getByTestId('cabinet-slot-story')).toBeTruthy()
    expect(screen.getByTestId('cabinet-slot-contribution')).toBeTruthy()
    expect(screen.getByTestId('cabinet-slot-account')).toBeTruthy()
    expect(screen.getByTestId('cabinet-slot-wallet')).toBeTruthy()
    expect(screen.getByTestId('account-summary')).toBeTruthy()
    expect(screen.queryByTestId('protected-route-placeholder')).toBeNull()
    const civicSlot = screen.getByTestId('cabinet-slot-civic')
    expect(civicSlot.querySelector('[data-civic-status-card]')).toBeTruthy()
    expect(civicSlot.textContent).not.toContain(CABINET_DICTIONARY_EN.cabinet.common.comingLater)
    // G2: no duplicate slot-header — card title only (M28 / Dashboard parity)
    expect(civicSlot.querySelector('.user-cabinet-page__slot-title')).toBeNull()
    expect(civicSlot.querySelector('.civic-status-card__title')).toBeTruthy()
    const storySlot = screen.getByTestId('cabinet-slot-story')
    expect(storySlot.querySelector('[data-story-activity-card]')).toBeTruthy()
    expect(storySlot.textContent).not.toContain(CABINET_DICTIONARY_EN.cabinet.common.comingLater)
    expect(storySlot.querySelector('.user-cabinet-page__slot-title')).toBeNull()
    const walletSlot = screen.getByTestId('cabinet-slot-wallet')
    expect(walletSlot.querySelector('[data-wallet-status-card]')).toBeTruthy()
    expect(walletSlot.querySelector('.user-cabinet-page__slot-placeholder')).toBeNull()
    expect(walletSlot.querySelector('.user-cabinet-page__slot-title')).toBeNull()
    expect(walletSlot.querySelector('[data-wallet-status-state="unlinked"]')).toBeTruthy()
    const contribSlot = screen.getByTestId('cabinet-slot-contribution')
    expect(contribSlot.querySelector('[data-contribution-layer]')).toBeTruthy()
    expect(contribSlot.querySelector('.user-cabinet-page__slot-placeholder')).toBeNull()
    expect(contribSlot.querySelector('.user-cabinet-page__slot-title')).toBeNull()
    expect(contribSlot.querySelector('[data-contrib-receipts-state="empty"]')).toBeTruthy()
    expect(contribSlot.querySelector('[data-contrib-reputation-state="later"]')).toBeTruthy()
    expect(contribSlot.textContent).not.toMatch(/Submit Story/i)
    // PH-09: protected AppShellLayout keeps default sidebar
    expect(document.querySelector('.board-sidebar')).toBeTruthy()
    expect(document.querySelector('.board-main--no-sidebar')).toBeNull()
  })

  it('wires Verify CTA to /verify and shows verified without re-prompt', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: {
        display_name: 'Demo User',
        role: 'citizen',
        phone_verified: false,
      },
      retry: vi.fn(),
    })
    renderProfileInShell()
    expect(
      screen.getByRole('button', { name: IDENTITY_DICTIONARY_EN.civic.unverified.cta }),
    ).toBeTruthy()

    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: {
        display_name: 'Demo User',
        role: 'citizen',
        phone_verified: true,
        phone_verified_at: '2026-06-01T12:00:00Z',
        phone_dial_prefix: '+372',
      },
      retry: vi.fn(),
    })
    cleanup()
    renderProfileInShell()
    expect(screen.getByText(IDENTITY_DICTIONARY_EN.civic.label.verified)).toBeTruthy()
    expect(
      screen.queryByRole('button', { name: IDENTITY_DICTIONARY_EN.civic.unverified.cta }),
    ).toBeNull()
  })

  it('keeps Dashboard CivicStatusCard render path intact', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Demo User', role: 'citizen', phone_verified: false },
      retry: vi.fn(),
    })
    renderProfileInShell('/dashboard')
    expect(screen.getByTestId('dashboard-page')).toBeTruthy()
    expect(screen.getByTestId('dashboard-page').querySelector('[data-civic-status-card]')).toBeTruthy()
  })

  it('marks Profile nav active on /profile', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Demo User', role: 'citizen' },
      retry: vi.fn(),
    })
    renderProfileInShell()
    const profileNav = screen.getByTestId('app-shell-nav-profile')
    expect(profileNav.textContent).toBe(IDENTITY_DICTIONARY_EN.appShell.nav.profile)
    expect(profileNav.className).toContain('board-nav-item-active')
  })

  it('shows shell skeleton before profile blocks mount', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.RESTORING,
      profile: null,
      retry: vi.fn(),
    })
    renderProfileInShell()
    expect(screen.getByTestId('cabinet-shell-skeleton')).toBeTruthy()
    expect(screen.getByTestId('cabinet-shell-loading').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.shell.loading,
    )
    expect(screen.queryByTestId('account-summary')).toBeNull()
  })

  it('shows SessionShell overlay when logged_out on /profile', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.LOGGED_OUT,
      profile: null,
      profileErrorCode: null,
      retry: vi.fn(),
    })
    renderProfileInShell()
    expect(screen.getByTestId('session-shell-overlay')).toBeTruthy()
  })

  it('shows M22 in-page ErrorPanel on profile load failure without overlay', () => {
    const retry = vi.fn()
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.BACKEND_UNAVAILABLE,
      profile: null,
      profileErrorCode: 'PROFILE_LOAD_FAILED',
      retry,
    })
    renderProfileInShell()
    expect(screen.queryByTestId('session-shell-overlay')).toBeNull()
    expect(screen.getByTestId('app-shell-nav-profile')).toBeTruthy()
    const panel = screen.getByTestId('cabinet-profile-error')
    expect(panel).toBeTruthy()
    expect(panel.textContent).toContain(CABINET_DICTIONARY_EN.cabinet.error.profileLoad.title)
    expect(screen.getByTestId('cabinet-profile-error-code').textContent).toContain(
      'PROFILE_LOAD_FAILED',
    )
    expect(screen.getByTestId('cabinet-profile-error-retry')).toBeTruthy()
    expect(screen.getByTestId('cabinet-profile-error-back')).toBeTruthy()
    expect(screen.queryByTestId('cabinet-grid')).toBeNull()
  })

  it('Retry on M22 calls session shell retry', async () => {
    const retry = vi.fn()
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.NETWORK_ERROR,
      profile: null,
      profileErrorCode: 'network_error',
      retry,
    })
    renderProfileInShell()
    screen.getByTestId('cabinet-profile-error-retry').click()
    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('does not alter /dashboard route element when cabinet shell loads', () => {
    mockUseSessionShell.mockReturnValue({
      shellState: SESSION_SHELL_STATES.AUTHENTICATED,
      profile: { display_name: 'Demo User', role: 'citizen', phone_verified: false },
      profileErrorCode: null,
      retry: vi.fn(),
    })
    renderProfileInShell('/dashboard')
    expect(screen.queryByTestId('user-cabinet-page')).toBeNull()
    expect(screen.getByTestId('dashboard-page')).toBeTruthy()
  })
})
