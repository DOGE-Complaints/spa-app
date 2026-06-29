/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { PhoneVerificationErrorState } from '../PhoneVerificationErrorState.jsx'
import '../PhoneVerificationErrorState.css'
import { resolveVerificationError } from '../../../auth/verificationErrorMapping.js'
import { findForbiddenVerificationTerm } from '../phoneVerificationLabels.js'

afterEach(cleanup)

describe('PhoneVerificationErrorState', () => {
  it('renders rate limited state with cooldown (M37 §5)', () => {
    const now = 1_700_000_000_000
    const resolved = resolveVerificationError('RATE_LIMITED', {
      lastRequestAtMs: now - 15_000,
      nowMs: now,
    })
    const onPrimary = vi.fn()
    render(<PhoneVerificationErrorState resolved={resolved} onPrimaryAction={onPrimary} />)

    expect(screen.getByTestId('phone-verification-error-rate-limited')).toBeTruthy()
    expect(screen.getByTestId('phone-verification-error-cooldown').textContent).toContain('00:45')
    expect(screen.getByTestId('phone-verification-error-primary').disabled).toBe(true)
    const visible = screen.getByTestId('phone-verification-error-rate-limited').textContent ?? ''
    expect(findForbiddenVerificationTerm(visible)).toBeNull()
  })

  it('renders wrong code with attempts remaining (M37 §6)', () => {
    const resolved = resolveVerificationError('CODE_MISMATCH', { mismatchCount: 1 })
    render(
      <PhoneVerificationErrorState resolved={resolved} onPrimaryAction={vi.fn()} />,
    )
    expect(screen.getByTestId('phone-verification-error-code-mismatch')).toBeTruthy()
    expect(screen.getByTestId('phone-verification-error-attempts').textContent).toContain(
      'Attempts remaining: 4',
    )
  })

  it('renders country not allowed with waitlist actions (M37 §4)', () => {
    const onPrimary = vi.fn()
    const onSecondary = vi.fn()
    const resolved = resolveVerificationError('COUNTRY_NOT_ALLOWED')
    render(
      <PhoneVerificationErrorState
        resolved={resolved}
        onPrimaryAction={onPrimary}
        onSecondaryAction={onSecondary}
      />,
    )
    fireEvent.click(screen.getByTestId('phone-verification-error-primary'))
    fireEvent.click(screen.getByTestId('phone-verification-error-secondary'))
    expect(onPrimary).toHaveBeenCalledWith('join_waitlist')
    expect(onSecondary).toHaveBeenCalledWith('use_another_number')
  })

  it('renders phone conflict without auto-merge actions (M37 §10)', () => {
    const resolved = resolveVerificationError('profile_conflict')
    render(
      <PhoneVerificationErrorState resolved={resolved} onPrimaryAction={vi.fn()} />,
    )
    expect(screen.getByText('Sign in to Existing Account')).toBeTruthy()
    expect(screen.getByText('Use Another Number')).toBeTruthy()
  })
})
