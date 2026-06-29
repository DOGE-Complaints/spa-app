/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DisclosurePanel } from '../../components/PhoneVerification/DisclosurePanel.jsx'
import { CivicStatusCard } from '../../components/CivicStatus/CivicStatusCard.jsx'
import { CIVIC_FLOW_PHASES } from '../../auth/civicStatusState.js'
import { LoginPage } from '../../pages/LoginPage.jsx'
import { LOCALE_STORAGE_KEY } from '../core.js'
import { I18nProvider } from '../I18nProvider.jsx'
import '../../components/CivicStatus/CivicStatus.css'
import '../../components/PhoneVerification/PhoneVerificationFlow.css'

vi.mock('../../auth/supabaseClient.js', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
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

function renderWithLocale(ui, locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  return render(<I18nProvider>{ui}</I18nProvider>)
}

afterEach(cleanup)

describe('identity locale snapshots', () => {
  it('LoginPage sign-in title renders Estonian copy', () => {
    renderWithLocale(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
      'et',
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Logi sisse' })).toBeTruthy()
  })

  it('LoginPage sign-in title renders Russian copy', () => {
    renderWithLocale(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
      'ru',
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Вход' })).toBeTruthy()
  })

  it('CivicStatusCard unverified title localized (et)', () => {
    renderWithLocale(
      <CivicStatusCard phoneVerified={false} flowPhase={CIVIC_FLOW_PHASES.IDLE} onVerify={() => {}} />,
      'et',
    )
    expect(screen.getByText('Konto kinnitamine on vajalik')).toBeTruthy()
  })

  it('CivicStatusCard unverified title localized (ru)', () => {
    renderWithLocale(
      <CivicStatusCard phoneVerified={false} flowPhase={CIVIC_FLOW_PHASES.IDLE} onVerify={() => {}} />,
      'ru',
    )
    expect(screen.getByText('Требуется подтверждение аккаунта')).toBeTruthy()
  })

  it('DisclosurePanel disclosure title localized (ru)', () => {
    renderWithLocale(<DisclosurePanel onSendCode={() => {}} onNotNow={() => {}} />, 'ru')
    expect(screen.getByText('Один быстрый шаг — подтвердите телефон')).toBeTruthy()
  })
})
