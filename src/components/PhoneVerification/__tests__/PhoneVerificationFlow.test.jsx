/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

const mockUseAuth = vi.hoisted(() => vi.fn())

vi.mock('../../../auth/AuthSessionContext.jsx', () => ({
  useAuth: () => mockUseAuth(),
}))

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
import { identityService } from '../../../auth/identityService.js'
import {
  findForbiddenVerificationTerm,
  PHONE_VERIFICATION_DISCLOSURE,
} from '../phoneVerificationLabels.js'

afterEach(cleanup)

describe('PhoneVerificationFlow', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ session: { access_token: 'mock-token' } })
    identityService._resetMockProfile?.()
  })

  it('starts on disclosure panel before phone input (AC #1)', () => {
    render(<PhoneVerificationFlow />)
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
    render(<PhoneVerificationFlow onComplete={onComplete} />)

    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-otp')).toBeTruthy()
    })

    fireEvent.change(screen.getByTestId('phone-verification-otp-input'), {
      target: { value: '123456' },
    })
    expect(screen.getByTestId('phone-verification-otp-input').getAttribute('autocomplete')).toBe(
      'one-time-code',
    )
    fireEvent.click(screen.getByTestId('phone-verification-verify'))

    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-success')).toBeTruthy()
    })

    fireEvent.click(screen.getByTestId('phone-verification-success-continue'))
    expect(onComplete).toHaveBeenCalled()
  })

  it('disables resend with countdown after code sent (AC #3)', async () => {
    render(<PhoneVerificationFlow />)
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))
    await waitFor(() => screen.getByTestId('phone-verification-otp'))

    const resend = screen.getByTestId('phone-verification-resend')
    expect(resend.disabled).toBe(true)
    expect(resend.textContent).toMatch(/Resend code \(\d+s\)/)
  })

  it('reports flow phase changes to parent', async () => {
    const onFlowPhaseChange = vi.fn()
    render(<PhoneVerificationFlow onFlowPhaseChange={onFlowPhaseChange} />)
    expect(onFlowPhaseChange).toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    expect(onFlowPhaseChange.mock.calls.some((call) => call[0] === 'idle')).toBe(true)
  })

  it('sets failed phase on confirm error', async () => {
    const confirmSpy = vi
      .spyOn(identityService, 'confirmPhoneVerification')
      .mockRejectedValue(new Error('confirm failed'))

    render(<PhoneVerificationFlow />)
    fireEvent.click(screen.getByTestId('phone-verification-disclosure-send'))
    fireEvent.change(screen.getByTestId('phone-verification-local-input'), {
      target: { value: '55555555' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-send-code'))
    await waitFor(() => screen.getByTestId('phone-verification-otp'))
    fireEvent.change(screen.getByTestId('phone-verification-otp-input'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByTestId('phone-verification-verify'))
    await waitFor(() => {
      expect(screen.getByTestId('phone-verification-failed')).toBeTruthy()
    })
    confirmSpy.mockRestore()
  })
})
