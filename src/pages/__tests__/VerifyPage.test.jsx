/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { VerifyPage } from '../VerifyPage.jsx'

const mockUseSessionShell = vi.fn()
const mockNavigate = vi.fn()

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../components/PhoneVerification/index.js', () => ({
  PhoneVerificationFlow: ({ onComplete }) => (
    <button type="button" data-testid="mock-flow-complete" onClick={onComplete}>
      complete
    </button>
  ),
}))

afterEach(cleanup)

describe('VerifyPage', () => {
  it('skips flow when phone_verified=true (FR-04.8 / AC #5)', () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true, phone_dial_prefix: '+372' },
      retry: vi.fn(),
    })

    render(
      <MemoryRouter>
        <VerifyPage />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('verify-page-already-verified')).toBeTruthy()
    expect(screen.queryByTestId('mock-flow-complete')).toBeNull()
  })

  it('hosts verification flow only when not verified (no duplicate CivicStatusCard)', () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: vi.fn(),
    })

    render(
      <MemoryRouter>
        <VerifyPage />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('verify-page').getAttribute('data-verify-host')).toBe('flow-only')
    expect(screen.getByTestId('mock-flow-complete')).toBeTruthy()
    expect(screen.queryByTestId('verify-page-verified-status')).toBeNull()
    expect(document.querySelector('[data-civic-status-card]')).toBeNull()
  })

  it('shows verified CivicStatusCard when phone_verified=true', () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true, phone_dial_prefix: '+372' },
      retry: vi.fn(),
    })

    render(
      <MemoryRouter>
        <VerifyPage />
      </MemoryRouter>,
    )

    expect(document.querySelector('[data-civic-status-card]')).toBeTruthy()
  })

  it('refreshes session on complete (AC #4)', () => {
    const retry = vi.fn()
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry,
    })

    render(
      <MemoryRouter>
        <VerifyPage />
      </MemoryRouter>,
    )

    screen.getByTestId('mock-flow-complete').click()
    expect(retry).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
  })
})
