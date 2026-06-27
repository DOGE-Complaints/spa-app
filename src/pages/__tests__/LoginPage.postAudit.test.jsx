/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../LoginPage.jsx'

const mockSignUp = vi.fn()

vi.mock('../../auth/supabaseClient.js', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: (...args) => mockSignUp(...args),
      signInWithOtp: vi.fn(),
      resetPasswordForEmail: vi.fn(),
    },
  },
}))

vi.mock('../../auth/identityService.js', () => ({
  identityService: {
    fetchMe: vi.fn().mockResolvedValue({}),
  },
}))

describe('LoginPage post-audit fixes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('auth-success shows only Board destination link (no misleading labels)', () => {
    render(
      <MemoryRouter initialEntries={['/?dev_auth_state=auth-success']}>
        <LoginPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Board')).toBeTruthy()
    expect(screen.queryByText('Issues')).toBeNull()
    expect(screen.queryByText('Dashboard')).toBeNull()
  })

  it('signup password mismatch shows inline message and skips signUp', () => {
    render(
      <MemoryRouter initialEntries={['/?dev_auth_state=signup']}>
        <LoginPage />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('auth-email'), { target: { value: 'user@example.com' } })
    fireEvent.change(screen.getByTestId('auth-password'), { target: { value: 'secret-one' } })
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'secret-two' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }))

    expect(screen.getByTestId('auth-signup-field-error').textContent).toBe('Passwords do not match.')
    expect(mockSignUp).not.toHaveBeenCalled()
    expect(screen.queryByTestId('auth-error-active')).toBeNull()
  })
})
