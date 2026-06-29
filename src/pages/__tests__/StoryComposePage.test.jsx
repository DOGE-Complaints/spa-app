/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { STORY_GATE_PHASES } from '../../auth/storyGateFlowState.js'

const mockUseAuth = vi.hoisted(() => vi.fn())
const mockUseSessionShell = vi.hoisted(() => vi.fn())
const mockRetry = vi.hoisted(() => vi.fn())

vi.mock('../../auth/AuthSessionContext.jsx', () => ({
  useAuth: () => mockUseAuth(),
}))

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

vi.mock('../../auth/identityService.js', async (importOriginal) => {
  const actual = await importOriginal()
  const service = actual.createIdentityService('http://localhost:8100', true)
  return {
    ...actual,
    identityService: service,
  }
})

vi.mock('../../services/storyDraftService.js', async (importOriginal) => {
  const actual = await importOriginal()
  const service = actual.createStoryDraftService('', true)
  return {
    ...actual,
    storyDraftService: service,
  }
})

vi.mock('../../components/PhoneVerification/PhoneVerificationFlow.jsx', () => ({
  PhoneVerificationFlow: ({ onComplete }) => (
    <div data-testid="phone-verification-flow-mock">
      <button type="button" data-testid="mock-verify-complete" onClick={onComplete}>
        Complete verify
      </button>
    </div>
  ),
}))

import { StoryComposePage } from '../StoryComposePage.jsx'
import '../StoryComposePage.css'
import { identityService } from '../../auth/identityService.js'
import { storyDraftService } from '../../services/storyDraftService.js'

function renderPage() {
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  return render(
    <I18nProvider>
      <MemoryRouter>
        <StoryComposePage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

afterEach(cleanup)

describe('StoryComposePage', () => {
  beforeEach(() => {
    identityService._resetMockProfile?.()
    storyDraftService._resetMockStore?.()
    mockRetry.mockReset()
    mockUseAuth.mockReturnValue({ session: { access_token: 'mock-token' } })
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: false },
      retry: mockRetry,
    })
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('renders compose form without verification gate on load', () => {
    renderPage()
    expect(screen.getByTestId('story-compose-form')).toBeTruthy()
    expect(screen.queryByTestId('story-gate-verification-required')).toBeNull()
    expect(screen.getByTestId('story-compose-action-submit')).toBeTruthy()
  })

  it('opens verification gate on submit when phone_verified=false', async () => {
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'My story' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-verification-required')).toBeTruthy()
    })
    expect(screen.getByTestId('story-gate-draft-id').textContent).toMatch(/^mock-draft-/)
  })

  it('shows draft saved panel after save draft', async () => {
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Saved title' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-save-draft'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-draft-saved')).toBeTruthy()
    })
  })

  it('submits directly when phone_verified=true', async () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true },
      retry: mockRetry,
    })
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Verified story' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-submission-success')).toBeTruthy()
    })
  })

  it('handles verification_required on submit when locally verified', async () => {
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true },
      retry: mockRetry,
    })
    storyDraftService._setMockForceVerificationRequired?.(true)
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Gate story' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-verification-required')).toBeTruthy()
    })
  })

  it('shows draft saved panel on verify continue before verification embed', async () => {
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Verify me' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('story-gate-verification-required')).toBeTruthy()
    })

    fireEvent.click(screen.getByTestId('story-gate-verify-continue'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-draft-saved')).toBeTruthy()
    })
    expect(screen.queryByTestId('phone-verification-flow-mock')).toBeNull()
    expect(screen.getByTestId('story-compose-page').getAttribute('data-story-gate-phase')).toBe(
      STORY_GATE_PHASES.DRAFT_SAVED,
    )
  })

  it('embeds PhoneVerificationFlow after draft saved continue verification', async () => {
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Verify me' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('story-gate-verification-required')).toBeTruthy()
    })
    fireEvent.click(screen.getByTestId('story-gate-verify-continue'))
    await waitFor(() => {
      expect(screen.getByTestId('story-gate-draft-saved')).toBeTruthy()
    })
    fireEvent.click(screen.getByTestId('story-gate-continue-verification'))
    expect(screen.getByTestId('phone-verification-flow-mock')).toBeTruthy()
    expect(screen.getByTestId('story-compose-page').getAttribute('data-story-gate-phase')).toBe(
      STORY_GATE_PHASES.VERIFYING,
    )
  })

  it('moves to verification complete after verify success', async () => {
    renderPage()
    fireEvent.change(screen.getByTestId('story-compose-field-title'), {
      target: { value: 'Resume' },
    })
    fireEvent.click(screen.getByTestId('story-compose-action-submit'))
    await waitFor(() => screen.getByTestId('story-gate-verify-continue'))
    fireEvent.click(screen.getByTestId('story-gate-verify-continue'))
    await waitFor(() => screen.getByTestId('story-gate-continue-verification'))
    fireEvent.click(screen.getByTestId('story-gate-continue-verification'))
    fireEvent.click(screen.getByTestId('mock-verify-complete'))

    await waitFor(() => {
      expect(screen.getByTestId('story-gate-verification-complete')).toBeTruthy()
    })
    expect(mockRetry).toHaveBeenCalled()
  })
})
