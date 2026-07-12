/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach, beforeEach } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../../i18n/cabinetDictionary.js'
import { AccountSummary } from '../AccountSummary.jsx'
import { ACCOUNT_SUMMARY_STATES } from '../accountSummaryState.js'
import '../AccountSummary.css'

const cabinetEn = CABINET_DICTIONARY_EN.cabinet

function renderSummary(profile) {
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  return render(
    <I18nProvider>
      <AccountSummary profile={profile} />
    </I18nProvider>,
  )
}

afterEach(cleanup)

describe('AccountSummary', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('renders complete state M24 when all fields present', () => {
    const { container } = renderSummary({
      display_name: 'Demo User',
      role: 'citizen',
      email: 'zara@example.com',
      created_at: '2026-06-14T10:22:00Z',
      status: 'active',
    })
    const root = container.querySelector('[data-testid="account-summary"]')
    expect(root.getAttribute('data-state')).toBe(ACCOUNT_SUMMARY_STATES.COMPLETE)
    expect(screen.getByTestId('account-summary-field-email').textContent).toContain('z***@example.com')
    expect(screen.getByTestId('account-summary-field-role').textContent).toContain(
      cabinetEn.account.role.authenticatedUser,
    )
    expect(screen.getByTestId('account-summary-field-status').textContent).toContain(
      cabinetEn.account.status.active,
    )
  })

  it('renders minimal-data state M25 when email present but secondary fields missing', () => {
    const { container } = renderSummary({
      display_name: 'Demo User',
      role: 'citizen',
      email: 'user@example.com',
    })
    const root = container.querySelector('[data-testid="account-summary"]')
    expect(root.getAttribute('data-state')).toBe(ACCOUNT_SUMMARY_STATES.MINIMAL_DATA)
    const notAvailableNodes = container.querySelectorAll('[data-testid="account-summary-not-available"]')
    expect(notAvailableNodes.length).toBeGreaterThan(0)
  })

  it('renders missing-email state M26 when email absent', () => {
    const { container } = renderSummary({
      display_name: 'Demo User',
      role: 'citizen',
    })
    const root = container.querySelector('[data-testid="account-summary"]')
    expect(root.getAttribute('data-state')).toBe(ACCOUNT_SUMMARY_STATES.MISSING_EMAIL)
    const emailRow = screen.getByTestId('account-summary-field-email')
    expect(within(emailRow).getByText(cabinetEn.common.notAvailable)).toBeTruthy()
    expect(emailRow.querySelector('[src*="warning"]')).toBeNull()
  })

  it('shows role from /me profile', () => {
    renderSummary({ display_name: 'Anna', role: 'moderator' })
    const roleRow = screen.getByTestId('account-summary-field-role')
    expect(roleRow.textContent).toContain(cabinetEn.account.role.moderator)
  })

  it('does not expose raw phone, OTP, or tokens in DOM', () => {
    const { container } = renderSummary({
      display_name: 'Demo User',
      role: 'citizen',
      phone_dial_prefix: '+37255555555',
      phone_verified: true,
      phone_verified_at: '2026-06-01T12:00:00Z',
    })
    const text = container.textContent ?? ''
    expect(text).not.toContain('+37255555555')
    expect(text).not.toContain('mock-signature')
    expect(text).not.toContain('refresh_token')
  })

  it('localizes labels in et locale', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'et')
    render(
      <I18nProvider>
        <AccountSummary profile={{ role: 'citizen' }} />
      </I18nProvider>,
    )
    expect(screen.getByTestId('account-summary-title').textContent).toBe('Konto')
    expect(screen.getByTestId('account-summary-field-email').textContent).toContain('E-post')
  })
})
