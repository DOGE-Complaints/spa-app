/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { CIVIC_FLOW_PHASES, CIVIC_VERIFICATION_CONTEXT } from '../../../auth/civicStatusState.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { IDENTITY_DICTIONARY_EN } from '../../../i18n/identityDictionary.js'
import { CivicStatusCard } from '../CivicStatusCard.jsx'
import '../CivicStatus.css'

const civicEn = IDENTITY_DICTIONARY_EN.civic

function renderCard(props = {}) {
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  return render(
    <I18nProvider>
      <CivicStatusCard {...props} />
    </I18nProvider>,
  )
}

afterEach(cleanup)

function getCard(container) {
  return container.querySelector('[data-civic-status-card]')
}

describe('CivicStatusCard', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('renders unverified state A with canonical label', () => {
    const { container } = renderCard({ phoneVerified: false, flowPhase: CIVIC_FLOW_PHASES.IDLE })
    const card = getCard(container)
    expect(card.getAttribute('data-civic-status-state')).toBe('unverified')
    expect(screen.getByText(civicEn.label.notVerified)).toBeTruthy()
    expect(screen.getByRole('button', { name: civicEn.unverified.cta })).toBeTruthy()
    const icon = screen.getByTestId('civic-status-icon')
    expect(icon.getAttribute('data-civic-icon-state')).toBe('unverified')
    expect(icon.getAttribute('src')).toContain('ic-civic-unverified.png')
  })

  it('state A renders primary action before secondary metadata (M28 §4)', () => {
    const { container } = renderCard({ phoneVerified: false, flowPhase: CIVIC_FLOW_PHASES.IDLE })
    const card = getCard(container)
    const actions = card.querySelector('.civic-status-card__actions')
    const metadata = card.querySelector('.civic-status-card__metadata')
    expect(actions).toBeTruthy()
    expect(metadata).toBeTruthy()
    expect(
      actions.compareDocumentPosition(metadata) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(metadata.textContent).toBe(civicEn.unverified.takesMinute)
  })

  it('renders verification available state B', () => {
    const { container } = renderCard({
      phoneVerified: false,
      flowPhase: CIVIC_FLOW_PHASES.IDLE,
      verificationContext: CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION,
      protectedActionLabel: 'Submit Story',
    })
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_available',
    )
    expect(screen.getByText(civicEn.available.verifyContinue)).toBeTruthy()
    expect(screen.getByText('Submit Story')).toBeTruthy()
  })

  it('renders verification in progress state C with disabled CTA', () => {
    const { container } = renderCard({
      phoneVerified: false,
      flowPhase: CIVIC_FLOW_PHASES.CODE_ENTRY,
    })
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_in_progress',
    )
    expect(screen.getByRole('button', { name: civicEn.cta.continue }).disabled).toBe(true)
  })

  it('renders verified state D with wallet placeholder', () => {
    const { container } = renderCard({
      phoneVerified: true,
      phoneDialPrefix: '+372',
      phoneVerifiedAt: '2026-06-12T10:00:00+00:00',
    })
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe('verified')
    expect(screen.getByText(civicEn.label.verified)).toBeTruthy()
    expect(screen.getByTestId('civic-status-wallet-info')).toBeTruthy()
    expect(screen.getByText(civicEn.label.walletNotLinked)).toBeTruthy()
    expect(screen.getByTestId('civic-status-icon').getAttribute('src')).toContain(
      'ic-civic-verified.png',
    )
  })

  it('maps all five M28 states to ic-civic icon assets', () => {
    const cases = [
      [{ phoneVerified: false }, 'unverified', 'ic-civic-unverified.png'],
      [
        {
          phoneVerified: false,
          verificationContext: CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION,
        },
        'verification_available',
        'ic-civic-verify-required.png',
      ],
      [
        { phoneVerified: false, flowPhase: CIVIC_FLOW_PHASES.CODE_ENTRY },
        'verification_in_progress',
        'ic-civic-in-progress.png',
      ],
      [{ phoneVerified: true }, 'verified', 'ic-civic-verified.png'],
      [
        { phoneVerified: false, flowPhase: CIVIC_FLOW_PHASES.FAILED },
        'verification_failed',
        'ic-civic-failed.png',
      ],
    ]
    for (const [props, state, file] of cases) {
      const { container, unmount } = renderCard(props)
      expect(getCard(container).getAttribute('data-civic-status-state')).toBe(state)
      expect(screen.getByTestId('civic-status-icon').getAttribute('src')).toContain(file)
      unmount()
    }
  })

  it('renders verification failed state E with retry callback', () => {
    const onRetry = vi.fn()
    const { container } = renderCard({
      phoneVerified: false,
      flowPhase: CIVIC_FLOW_PHASES.FAILED,
      errorCode: 'CODE_MISMATCH',
      onRetry,
    })
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_failed',
    )
    expect(screen.getByText('Code: CODE_MISMATCH')).toBeTruthy()
    screen.getByRole('button', { name: civicEn.failed.retry }).click()
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('exposes data-civic-status-card root hook', () => {
    const { container } = renderCard({ phoneVerified: false })
    expect(getCard(container)).toBeTruthy()
  })
})
