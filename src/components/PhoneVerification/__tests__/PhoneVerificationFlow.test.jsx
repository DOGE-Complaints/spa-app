/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockUseAuth = vi.hoisted(() => vi.fn())
const mockNavigate = vi.hoisted(() => vi.fn())

vi.mock('../../../auth/AuthSessionContext.jsx', () => ({
  useAuth: () => mockUseAuth(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../../auth/identityService.js', async (importOriginal) => {
  const actual = await importOriginal()
  const service = actual.createIdentityService('http://localhost:8100', true)
  return {
    ...actual,
    identityService: service,
  }
})

import { PhoneVerificationFlow } from '../PhoneVerificationFlow.jsx'
import '../PhoneVerificationFlow.css'
import '../PhoneVerificationErrorState.css'
import { identityService, IdentityApiError } from '../../../auth/identityService.js'
import {
  findForbiddenVerificationTerm,
  PHONE_VERIFICATION_DISCLOSURE,
} from '../phoneVerificationLabels.js'

function renderFlow(props = {}) {
  return render(
    <MemoryRouter>
      <PhoneVerificationFlow {...props} />
    </MemoryRouter>,
  )
}

async function reachOtpStep() {
  fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
  fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
    target: { value: '55555555' },
  })
  fireEvent.click(screen.getByTestId('phone-verification-send-code'))
  await waitFor(() => {
    expect(screen.getByTestId('phone-verification-otp')).toBeTruthy()
  })
}

afterEach(cleanup)

describe('PhoneVerificationFlow', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ session: { access_token: 'mock-token' } })
    mockNavigate.mockReset()
    identityService._resetMockProfile?.()
  })

  it('starts on disclosure panel before phone input (AC #1)', () => {
    renderFlow()
    expect(screen.getByTestId('phone-verification-disclosure')).toBeTruthy()
    expect(screen.queryByTestId('phone-verification-phone-input')).toBeNull()
    expect(screen.getByText(PHONE_VERIFICATION_DISCLOSURE.primaryCta)).toBeTruthy()
  })

  it('disclosure copy avoids forbidden terms (FR-04.7)', () => {
    const visible = `${PHONE_VERIFICATION_DISCLOSURE.title} ${PHONE_VERIFICATION_DISCLOSURE.body}`
    expect(findForbiddenVerificationTerm(visible)).toBeNull()
  })

  it('happy path: disclosure → phone → otp → success', async () => {
    const onComplete = vi.fn()
    renderFlow({ onComplete })

    await reachOtpStep()

    fireEvent.change(screen.getByTestId('phone-verification-otp-input'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-verify'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-success')).toBeTruthy()
    })

    fireEvent.click(screen.getByTestId('phone-verification-success-continue'))
    expect(onComplete).toHaveBeenCalled()
  })

  it('disables resend with countdown after code sent (AC #3)', async () => {
    renderFlow()
    await reachOtpStep()

    const resend = screen.getByTestId('phone-verification-resend')
    expect(resend.disabled).toBe(true)
    expect(resend.textContent).toMatch(/Resend code \(\d+s\)/)
  })

  it('reports flow phase changes to parent', async () => {
    const onFlowPhaseChange = vi.fn()
    renderFlow({ onFlowPhaseChange })
    expect(onFlowPhaseChange).toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    expect(onFlowPhaseChange.mock.calls.some((call) => call[0] === 'idle')).toBe(true)
  })

  it('maps CODE_MISMATCH to wrong code error state', async () => {
    vi.spyOn(identityService, 'confirmPhoneVerification').mockRejectedValue(
      new IdentityApiError('CODE_MISMATCH', 400, { error: { trace_id: 'm1' } }),
    )

    renderFlow()
    await reachOtpStep()
    fireEvent.change(screen.getByTestId('phone-verification-otp-input'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-verify'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-code-mismatch')).toBeTruthy()
    })
    expect(screen.getByTestId('phone-verification-error-attempts').textContent).toContain(
      'Attempts remaining: 4',
    )
  })

  it('maps RATE_LIMITED on request with cooldown panel', async () => {
    vi.spyOn(identityService, 'requestPhoneVerification').mockRejectedValue(
      new IdentityApiError('RATE_LIMITED', 400, {}),
    )

    renderFlow()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-rate-limited')).toBeTruthy()
    })
  })

  it('maps profile_conflict to phone conflict panel', async () => {
    vi.spyOn(identityService, 'requestPhoneVerification').mockRejectedValue(
      new IdentityApiError('profile_conflict', 409, {}),
    )

    renderFlow()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-phone-conflict')).toBeTruthy()
    })
  })

  it('maps COUNTRY_NOT_ALLOWED to waitlist handoff callback', async () => {
    const onJoinWaitlist = vi.fn()
    vi.spyOn(identityService, 'requestPhoneVerification').mockRejectedValue(
      new IdentityApiError('COUNTRY_NOT_ALLOWED', 400, {}),
    )

    renderFlow({ onJoinWaitlist })
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-country-not-allowed')).toBeTruthy()
    })
    fireEvent.click(screen.getByTestId('phone-verification-error-primary'))
    expect(onJoinWaitlist).toHaveBeenCalled()
  })

  it('maps network_error to connection problem panel', async () => {
    vi.spyOn(identityService, 'requestPhoneVerification').mockRejectedValue(
      new IdentityApiError('network_error', 0, {}),
    )

    renderFlow()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-connection-problem')).toBeTruthy()
    })
  })

  it('auth error sign-in navigates to /login', async () => {
    vi.spyOn(identityService, 'requestPhoneVerification').mockRejectedValue(
      new IdentityApiError('AUTHENTICATION_REQUIRED', 401, {}),
    )

    renderFlow()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-error-sign-in-required')).toBeTruthy()
    })
    fireEvent.click(screen.getByTestId('phone-verification-error-primary'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
