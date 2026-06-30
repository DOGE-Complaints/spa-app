/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useState } from 'react'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { PhoneInputPanel } from '../PhoneInputPanel.jsx'
import { getDefaultCountry } from '../../../utils/countriesDataset.js'
import '../PhoneVerificationFlow.css'

afterEach(cleanup)

function renderPanel(props = {}) {
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  const onCountryChange = vi.fn()
  const onSubmit = vi.fn()
  const onJoinWaitlist = vi.fn()
  const onBack = vi.fn()
  render(
    <I18nProvider>
      <MemoryRouter>
        <PhoneInputPanel
          selectedCountry={getDefaultCountry()}
          onCountryChange={onCountryChange}
          localDigits=""
          validationHintKey={null}
          onLocalDigitsChange={vi.fn()}
          onSubmit={onSubmit}
          onJoinWaitlist={onJoinWaitlist}
          onBack={onBack}
          {...props}
        />
      </MemoryRouter>
    </I18nProvider>,
  )
  return { onCountryChange, onSubmit, onJoinWaitlist, onBack }
}

describe('PhoneInputPanel country selector', () => {
  it('renders country selector with Estonia default (AC #1)', () => {
    renderPanel()
    expect(screen.getByTestId('phone-country-selector-trigger')).toBeTruthy()
    expect(screen.getByTestId('phone-verification-send-code')).toBeTruthy()
    expect(screen.queryByTestId('phone-country-join-waitlist')).toBeNull()
  })

  it('shows unsupported notice and Join Waitlist for non-EE country (AC #4)', () => {
    const germany = {
      code: 'DE',
      dialPrefix: '+49',
      flag: '🇩🇪',
      name: { en: 'Germany', et: 'Saksamaa', ru: 'Германия' },
    }
    renderPanel({ selectedCountry: germany })
    expect(screen.getByTestId('phone-country-unsupported-notice')).toBeTruthy()
    expect(screen.getByTestId('phone-country-join-waitlist')).toBeTruthy()
    expect(screen.queryByTestId('phone-verification-send-code')).toBeNull()
  })

  it('join waitlist CTA invokes callback without send code', () => {
    const germany = {
      code: 'DE',
      dialPrefix: '+49',
      flag: '🇩🇪',
      name: { en: 'Germany', et: 'Saksamaa', ru: 'Германия' },
    }
    const { onJoinWaitlist } = renderPanel({ selectedCountry: germany })
    fireEvent.click(screen.getByTestId('phone-country-join-waitlist'))
    expect(onJoinWaitlist).toHaveBeenCalled()
  })

  it('updates aria-activedescendant when navigating options with arrow keys', () => {
    renderPanel()
    fireEvent.click(screen.getByTestId('phone-country-selector-trigger'))
    const search = screen.getByTestId('phone-country-selector-search')
    expect(search.getAttribute('aria-activedescendant')).toMatch(/-option-EE$/)
    fireEvent.keyDown(screen.getByTestId('phone-country-selector-dropdown'), { key: 'ArrowDown' })
    expect(search.getAttribute('aria-activedescendant')).toMatch(/-option-/)
    expect(search.getAttribute('aria-activedescendant')).not.toMatch(/-option-EE$/)
  })

  it('optional phone field is editable without aria-disabled for unsupported country', () => {
    const germany = {
      code: 'DE',
      dialPrefix: '+49',
      flag: '🇩🇪',
      name: { en: 'Germany', et: 'Saksamaa', ru: 'Германия' },
    }
    function PanelWithState() {
      const [localDigits, setLocalDigits] = useState('')
      return (
        <PhoneInputPanel
          selectedCountry={germany}
          onCountryChange={vi.fn()}
          localDigits={localDigits}
          validationHintKey={null}
          onLocalDigitsChange={setLocalDigits}
          onSubmit={vi.fn()}
          onJoinWaitlist={vi.fn()}
          onBack={vi.fn()}
        />
      )
    }
    render(
      <I18nProvider>
        <MemoryRouter>
          <PanelWithState />
        </MemoryRouter>
      </I18nProvider>,
    )
    const input = screen.getByTestId('phone-verification-local-input')
    expect(input.getAttribute('aria-disabled')).toBeNull()
    fireEvent.change(input, { target: { value: '1701234567' } })
    expect(input.value).toBe('1701234567')
  })
})
