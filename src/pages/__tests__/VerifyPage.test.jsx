/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
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

const mockJoinWaitlist = vi.fn()

vi.mock('../../services/waitlistService.js', () => ({
  waitlistService: {
    joinWaitlist: (...args) => mockJoinWaitlist(...args),
  },
  WaitlistApiError: class WaitlistApiError extends Error {
    constructor(kind) {
      super(kind)
      this.kind = kind
    }
  },
}))

vi.mock('../../components/PhoneVerification/index.js', () => ({
  PhoneVerificationFlow: ({ onComplete, onJoinWaitlist }) => (
    <div>
      <button type="button" data-testid="mock-flow-complete" onClick={onComplete}>
        complete
      </button>
      <button
        type="button"
        data-testid="mock-flow-join-waitlist"
        onClick={() =>
          onJoinWaitlist?.({
            phone: '+37288888888',
            countryName: 'Estonia',
          })
        }
      >
        join waitlist
      </button>
      <button
        type="button"
        data-testid="mock-flow-join-waitlist-unsupported"
        onClick={() =>
          onJoinWaitlist?.({
            country: 'DE',
            countryName: 'Germany',
            fromClientShortCircuit: true,
          })
        }
      >
        join unsupported
      </button>
    </div>
  ),
}))

afterEach(() => {
  cleanup()
  mockJoinWaitlist.mockReset()
})

function renderVerifyPage() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <VerifyPage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('VerifyPage', () => {
  it('skips flow when phone_verified=true (FR-04.8 / AC #5)', () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true, phone_dial_prefix: '+372' },
      retry: vi.fn(),
    })

    renderVerifyPage()

    expect(screen.getByTestId('verify-page-already-verified')).toBeTruthy()
    expect(screen.queryByTestId('mock-flow-complete')).toBeNull()
  })

  it('hosts verification flow only when not verified (no duplicate CivicStatusCard)', () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: vi.fn(),
    })

    renderVerifyPage()

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

    renderVerifyPage()

    expect(document.querySelector('[data-civic-status-card]')).toBeTruthy()
  })

  it('refreshes session on complete (AC #4)', () => {
    const retry = vi.fn()
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry,
    })

    renderVerifyPage()

    screen.getByTestId('mock-flow-complete').click()
    expect(retry).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
  })

  it('enters M123 waitlist flow from COUNTRY_NOT_ALLOWED handoff with country pre-fill', async () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: vi.fn(),
    })

    renderVerifyPage()

    fireEvent.click(screen.getByTestId('mock-flow-join-waitlist'))

    await waitFor(() => {
      expect(screen.getByTestId('verify-waitlist-flow')).toBeTruthy()
    })
    expect(screen.getByTestId('waitlist-not-supported-panel')).toBeTruthy()
    expect(screen.getByTestId('waitlist-country-name').textContent).toBe('Estonia')
    expect(screen.getByTestId('verify-waitlist-phone').textContent).toBe('+37288888888')

    fireEvent.click(screen.getByTestId('waitlist-join-cta'))
    await waitFor(() => {
      expect(screen.getByTestId('waitlist-form-panel')).toBeTruthy()
    })
    expect(screen.getByTestId('waitlist-form-country').value).toBe('Estonia')
  })

  it('unsupported client handoff opens waitlist form with selected country and no phone', async () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: vi.fn(),
    })

    renderVerifyPage()

    fireEvent.click(screen.getByTestId('mock-flow-join-waitlist-unsupported'))

    await waitFor(() => {
      expect(screen.getByTestId('waitlist-form-panel')).toBeTruthy()
    })
    expect(screen.queryByTestId('waitlist-not-supported-panel')).toBeNull()
    expect(screen.getByTestId('waitlist-form-country').value).toBe('Germany')
    expect(screen.queryByTestId('verify-waitlist-phone')).toBeNull()
  })

  it('submits stable country code to waitlist sink for unsupported client handoff', async () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: vi.fn(),
    })
    mockJoinWaitlist.mockResolvedValue({ country: 'DE' })

    renderVerifyPage()

    fireEvent.click(screen.getByTestId('mock-flow-join-waitlist-unsupported'))
    await waitFor(() => {
      expect(screen.getByTestId('waitlist-form-panel')).toBeTruthy()
    })

    fireEvent.change(screen.getByTestId('waitlist-form-email'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.click(screen.getByTestId('waitlist-form-submit'))

    await waitFor(() => {
      expect(mockJoinWaitlist).toHaveBeenCalledWith({
        email: 'user@example.com',
        country: 'DE',
        organization: '',
      })
    })
  })
})
