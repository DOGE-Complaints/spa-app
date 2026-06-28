/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { CIVIC_FLOW_PHASES, CIVIC_VERIFICATION_CONTEXT } from '../../../auth/civicStatusState.js'
import {
  CIVIC_STATUS_LABEL_NOT_VERIFIED,
  CIVIC_STATUS_LABEL_VERIFIED,
  CIVIC_STATUS_LABEL_WALLET_NOT_LINKED,
} from '../civicStatusLabels.js'
import { CivicStatusCard } from '../CivicStatusCard.jsx'
import '../CivicStatus.css'

afterEach(cleanup)

function getCard(container) {
  return container.querySelector('[data-civic-status-card]')
}

describe('CivicStatusCard', () => {
  it('renders unverified state A with canonical label', () => {
    const { container } = render(<CivicStatusCard phoneVerified={false} flowPhase={CIVIC_FLOW_PHASES.IDLE} />)
    const card = getCard(container)
    expect(card.getAttribute('data-civic-status-state')).toBe('unverified')
    expect(screen.getByText(CIVIC_STATUS_LABEL_NOT_VERIFIED)).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Verify Account' })).toBeTruthy()
  })

  it('state A renders primary action before secondary metadata (M28 §4)', () => {
    const { container } = render(<CivicStatusCard phoneVerified={false} flowPhase={CIVIC_FLOW_PHASES.IDLE} />)
    const card = getCard(container)
    const actions = card.querySelector('.civic-status-card__actions')
    const metadata = card.querySelector('.civic-status-card__metadata')
    expect(actions).toBeTruthy()
    expect(metadata).toBeTruthy()
    expect(
      actions.compareDocumentPosition(metadata) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(metadata.textContent).toBe('Verification takes less than one minute.')
  })

  it('renders verification available state B', () => {
    const { container } = render(
      <CivicStatusCard
        phoneVerified={false}
        flowPhase={CIVIC_FLOW_PHASES.IDLE}
        verificationContext={CIVIC_VERIFICATION_CONTEXT.PROTECTED_ACTION}
        protectedActionLabel="Submit Story"
      />,
    )
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_available',
    )
    expect(screen.getByText('Verify & Continue')).toBeTruthy()
    expect(screen.getByText('Submit Story')).toBeTruthy()
  })

  it('renders verification in progress state C with disabled CTA', () => {
    const { container } = render(
      <CivicStatusCard phoneVerified={false} flowPhase={CIVIC_FLOW_PHASES.CODE_ENTRY} />,
    )
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_in_progress',
    )
    expect(screen.getByRole('button', { name: 'Continue' }).disabled).toBe(true)
  })

  it('renders verified state D with wallet placeholder', () => {
    const { container } = render(
      <CivicStatusCard
        phoneVerified
        phoneDialPrefix="+372"
        phoneVerifiedAt="2026-06-12T10:00:00+00:00"
      />,
    )
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe('verified')
    expect(screen.getByText(CIVIC_STATUS_LABEL_VERIFIED)).toBeTruthy()
    expect(screen.getByTestId('civic-status-wallet-info')).toBeTruthy()
    expect(screen.getByText(CIVIC_STATUS_LABEL_WALLET_NOT_LINKED)).toBeTruthy()
  })

  it('renders verification failed state E with retry callback', () => {
    const onRetry = vi.fn()
    const { container } = render(
      <CivicStatusCard
        phoneVerified={false}
        flowPhase={CIVIC_FLOW_PHASES.FAILED}
        errorCode="CODE_MISMATCH"
        onRetry={onRetry}
      />,
    )
    expect(getCard(container).getAttribute('data-civic-status-state')).toBe(
      'verification_failed',
    )
    expect(screen.getByText('Code: CODE_MISMATCH')).toBeTruthy()
    screen.getByRole('button', { name: 'Retry Verification' }).click()
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('exposes data-civic-status-card root hook', () => {
    const { container } = render(<CivicStatusCard phoneVerified={false} />)
    expect(getCard(container)).toBeTruthy()
  })
})
