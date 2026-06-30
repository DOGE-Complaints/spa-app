/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CountryNotSupportedPanel } from '../CountryNotSupportedPanel.jsx'
import { WaitlistErrorPanel } from '../WaitlistErrorPanel.jsx'
import { WaitlistFormPanel } from '../WaitlistFormPanel.jsx'
import { WaitlistJoinedPanel } from '../WaitlistJoinedPanel.jsx'

afterEach(cleanup)

function renderWithI18n(ui) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

describe('CountryNotSupportedPanel', () => {
  it('renders localized copy and country from props', () => {
    renderWithI18n(
      <CountryNotSupportedPanel
        countryName="Germany"
        onJoinWaitlist={vi.fn()}
        onLearnMore={vi.fn()}
      />,
    )

    expect(screen.getByTestId('waitlist-not-supported-panel')).toBeTruthy()
    expect(screen.getByTestId('waitlist-country-name').textContent).toBe('Germany')
    expect(screen.getByTestId('waitlist-join-cta').textContent).toContain('Join Waitlist')
  })
})

describe('WaitlistFormPanel', () => {
  it('pre-fills country and requires email on submit', () => {
    const onSubmit = vi.fn()
    renderWithI18n(
      <WaitlistFormPanel initialCountry="Latvia" onSubmit={onSubmit} onBack={vi.fn()} />,
    )

    expect(screen.getByTestId('waitlist-form-country').value).toBe('Latvia')
    fireEvent.change(screen.getByTestId('waitlist-form-country'), { target: { value: 'Lithuania' } })
    fireEvent.change(screen.getByTestId('waitlist-form-email'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.click(screen.getByTestId('waitlist-form-submit'))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      country: 'Lithuania',
      organization: '',
    })
  })
})

describe('WaitlistJoinedPanel', () => {
  it('shows joined confirmation with saved country', () => {
    renderWithI18n(
      <WaitlistJoinedPanel countryName="Finland" onReturnHome={vi.fn()} />,
    )

    expect(screen.getByTestId('waitlist-joined-panel')).toBeTruthy()
    expect(screen.getByTestId('waitlist-joined-country-name').textContent).toBe('Finland')
  })
})

describe('WaitlistErrorPanel', () => {
  it('maps each error kind to distinct message key', () => {
    const kinds = ['network_error', 'service_unavailable', 'duplicate_request', 'validation_error']
    for (const kind of kinds) {
      cleanup()
      renderWithI18n(
        <WaitlistErrorPanel errorKind={kind} onRetry={vi.fn()} onBack={vi.fn()} />,
      )
      expect(screen.getByTestId(`waitlist-error-message-${kind}`).textContent?.length).toBeGreaterThan(0)
    }
  })
})
