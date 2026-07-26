/**
 * @vitest-environment jsdom
 * SPA-CAB-03-T07 / audit G1 — Dashboard civic mount + icon regression.
 */
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { DashboardPage } from '../DashboardPage.jsx'
import '../../components/CivicStatus/CivicStatus.css'

const mockUseSessionShell = vi.fn()

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

function renderDashboard(profile = { display_name: 'Demo User', role: 'citizen', phone_verified: false }) {
  mockUseSessionShell.mockReturnValue({
    shellState: SESSION_SHELL_STATES.AUTHENTICATED,
    profile,
    retry: vi.fn(),
  })
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <I18nProvider>
        <DashboardPage />
      </I18nProvider>
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe('DashboardPage civic regression (CAB-03-T07 / G1)', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('mounts CivicStatusCard with civic-status-icon on authenticated dashboard', () => {
    const { container } = renderDashboard({
      display_name: 'Demo User',
      role: 'citizen',
      phone_verified: false,
    })
    expect(screen.getByTestId('dashboard-page')).toBeTruthy()
    const card = container.querySelector('[data-civic-status-card]')
    expect(card).toBeTruthy()
    expect(card.getAttribute('data-civic-status-state')).toBe('unverified')
    const icon = screen.getByTestId('civic-status-icon')
    expect(icon).toBeTruthy()
    expect(icon.getAttribute('src')).toContain('ic-civic-unverified.png')
  })

  it('shows verified civic state without Verify CTA on dashboard', () => {
    renderDashboard({
      display_name: 'Demo User',
      role: 'citizen',
      phone_verified: true,
      phone_verified_at: '2026-06-01T12:00:00Z',
      phone_dial_prefix: '+372',
    })
    const card = screen.getByTestId('dashboard-page').querySelector('[data-civic-status-card]')
    expect(card.getAttribute('data-civic-status-state')).toBe('verified')
    expect(screen.getByTestId('civic-status-icon').getAttribute('src')).toContain(
      'ic-civic-verified.png',
    )
  })
})
