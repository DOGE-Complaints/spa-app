/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import {
  BackendUnavailablePanel,
  LoggedOutPanel,
  NetworkErrorPanel,
  RestoringSessionPanel,
  SessionExpiredPanel,
} from '../SessionShellPanels.jsx'
import '../SessionShellState.css'

function renderWithI18n(ui) {
  return render(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('SessionShellPanels', () => {
  it('renders restoring panel with skeleton', () => {
    renderWithI18n(<RestoringSessionPanel />)
    expect(screen.getByText('Restoring Session')).toBeTruthy()
    expect(screen.getByTestId('session-shell-restoring')).toBeTruthy()
  })

  it('renders logged out recovery CTAs', () => {
    renderWithI18n(<LoggedOutPanel />)
    expect(screen.getByText('Sign In Required')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Continue to public board' }).getAttribute('href')).toBe(
      '/board',
    )
  })

  it('renders session expired sign in again', () => {
    renderWithI18n(<SessionExpiredPanel />)
    expect(screen.getByText('Session Expired')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Sign In Again' }).getAttribute('href')).toBe('/login')
  })

  it('renders backend unavailable retry', () => {
    renderWithI18n(<BackendUnavailablePanel onRetry={() => {}} onViewStatus={() => {}} />)
    expect(screen.getByText('DOGEstonia Services Temporarily Unavailable')).toBeTruthy()
    expect(screen.getByText('Code: BACKEND_UNAVAILABLE')).toBeTruthy()
  })

  it('renders network error retry', () => {
    renderWithI18n(<NetworkErrorPanel onRetry={() => {}} />)
    expect(screen.getByText('Connection Problem')).toBeTruthy()
    expect(screen.getByText('Code: NETWORK_ERROR')).toBeTruthy()
  })
})
