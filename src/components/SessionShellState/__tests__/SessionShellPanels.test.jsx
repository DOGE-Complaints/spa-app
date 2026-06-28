/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import {
  BackendUnavailablePanel,
  LoggedOutPanel,
  NetworkErrorPanel,
  RestoringSessionPanel,
  SessionExpiredPanel,
} from '../SessionShellPanels.jsx'
import '../SessionShellState.css'

describe('SessionShellPanels', () => {
  it('renders restoring panel with skeleton', () => {
    render(<RestoringSessionPanel />)
    expect(screen.getByText('Restoring Session')).toBeTruthy()
    expect(screen.getByTestId('session-shell-restoring')).toBeTruthy()
  })

  it('renders logged out recovery CTAs', () => {
    render(
      <MemoryRouter>
        <LoggedOutPanel />
      </MemoryRouter>,
    )
    expect(screen.getByText('Sign In Required')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Continue to public board' }).getAttribute('href')).toBe(
      '/board',
    )
  })

  it('renders session expired sign in again', () => {
    render(
      <MemoryRouter>
        <SessionExpiredPanel />
      </MemoryRouter>,
    )
    expect(screen.getByText('Session Expired')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Sign In Again' }).getAttribute('href')).toBe('/login')
  })

  it('renders backend unavailable retry', () => {
    render(<BackendUnavailablePanel onRetry={() => {}} onViewStatus={() => {}} />)
    expect(screen.getByText('DOGEstonia Services Temporarily Unavailable')).toBeTruthy()
    expect(screen.getByText('Code: BACKEND_UNAVAILABLE')).toBeTruthy()
  })

  it('renders network error retry', () => {
    render(<NetworkErrorPanel onRetry={() => {}} />)
    expect(screen.getByText('Connection Problem')).toBeTruthy()
    expect(screen.getByText('Code: NETWORK_ERROR')).toBeTruthy()
  })
})
