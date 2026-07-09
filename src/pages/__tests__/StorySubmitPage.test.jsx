/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { STORY_HANDOFF_PHASES } from '../../auth/storyHandoffFlowState.js'

const mockUseAuth = vi.hoisted(() => vi.fn())
const mockUseSessionShell = vi.hoisted(() => vi.fn())
const mockNavigate = vi.hoisted(() => vi.fn())
const mockRetry = vi.hoisted(() => vi.fn())

vi.mock('../../auth/AuthSessionContext.jsx', () => ({
  useAuth: () => mockUseAuth(),
}))

vi.mock('../../auth/SessionShellContext.jsx', () => ({
  useSessionShell: () => mockUseSessionShell(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
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

import { StorySubmitPage } from '../StorySubmitPage.jsx'
import { storyDraftService } from '../../services/storyDraftService.js'

/**
 * @param {string} [initialPath]
 */
function renderPage(initialPath = '/story/submit') {
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/story/submit" element={<StorySubmitPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

/**
 * Re-import StorySubmitPage so module-level VITE_STORY_GPT_URL picks up vi.stubEnv.
 * @param {string} [initialPath]
 */
async function renderFreshPage(initialPath = '/story/submit') {
  vi.resetModules()
  const [{ StorySubmitPage: FreshStorySubmitPage }, { I18nProvider: FreshI18nProvider }] =
    await Promise.all([
      import('../StorySubmitPage.jsx'),
      import('../../i18n/I18nProvider.jsx'),
    ])
  localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  return render(
    <FreshI18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/story/submit" element={<FreshStorySubmitPage />} />
        </Routes>
      </MemoryRouter>
    </FreshI18nProvider>,
  )
}

afterEach(cleanup)

describe('StorySubmitPage', () => {
  beforeEach(() => {
    storyDraftService._resetMockStore?.()
    mockNavigate.mockReset()
    mockRetry.mockReset()
    mockRetry.mockResolvedValue(undefined)
    mockUseAuth.mockReturnValue({ session: { access_token: 'mock-token' } })
    mockUseSessionShell.mockReturnValue({
      profile: { phone_verified: true },
      retry: mockRetry,
    })
    sessionStorage.clear()
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('shows empty state when no draft_id', async () => {
    renderPage('/story/submit')
    await waitFor(() => {
      expect(screen.getByTestId('story-handoff-empty')).toBeTruthy()
    })
    expect(screen.getByTestId('story-submit-page').getAttribute('data-story-handoff-phase')).toBe(
      STORY_HANDOFF_PHASES.EMPTY,
    )
  })

  it('empty state open GPT uses VITE_STORY_GPT_URL', async () => {
    const gptUrl = 'https://chatgpt.com/g/test-deploy-gpt'
    vi.stubEnv('VITE_STORY_GPT_URL', gptUrl)
    await renderFreshPage('/story/submit')
    await waitFor(() => screen.getByTestId('story-handoff-open-gpt'))
    expect(screen.getByTestId('story-handoff-open-gpt').getAttribute('href')).toBe(gptUrl)
    vi.unstubAllEnvs()
  })

  it('empty state falls back to # when VITE_STORY_GPT_URL unset', async () => {
    vi.stubEnv('VITE_STORY_GPT_URL', '')
    await renderFreshPage('/story/submit')
    await waitFor(() => screen.getByTestId('story-handoff-open-gpt'))
    expect(screen.getByTestId('story-handoff-open-gpt').getAttribute('href')).toBe('#')
    vi.unstubAllEnvs()
  })

  it('loads preview on GET 200', async () => {
    const draftId = storyDraftService._createMockDraftId?.()
    storyDraftService._seedMockDraft?.(draftId)
    renderPage(`/story/submit?draft_id=${draftId}`)

    await waitFor(() => {
      expect(screen.getByTestId('story-handoff-preview')).toBeTruthy()
    })
    expect(screen.getByTestId('story-submit-page').getAttribute('data-story-handoff-phase')).toBe(
      STORY_HANDOFF_PHASES.PREVIEW,
    )
  })

  it('redirects to login on GET 401', async () => {
    storyDraftService._setMockForceUnauthorized?.(true)
    renderPage('/story/submit?draft_id=missing-draft')

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/^\/login\?next=/),
        { replace: true },
      )
    })
  })

  it('shows expired state on GET 404', async () => {
    renderPage('/story/submit?draft_id=unknown-draft')

    await waitFor(() => {
      expect(screen.getByTestId('story-handoff-expired')).toBeTruthy()
    })
  })

  it('expired createNew uses VITE_STORY_GPT_URL', async () => {
    const gptUrl = 'https://chatgpt.com/g/test-deploy-gpt'
    vi.stubEnv('VITE_STORY_GPT_URL', gptUrl)
    await renderFreshPage('/story/submit?draft_id=unknown-draft')
    await waitFor(() => screen.getByTestId('story-handoff-create-new'))
    expect(screen.getByTestId('story-handoff-create-new').getAttribute('href')).toBe(gptUrl)
    vi.unstubAllEnvs()
  })

  it('submits draft and redirects to profile on 202', async () => {
    const draftId = storyDraftService._createMockDraftId?.()
    storyDraftService._seedMockDraft?.(draftId)
    renderPage(`/story/submit?draft_id=${draftId}`)

    await waitFor(() => screen.getByTestId('story-handoff-preview'))
    fireEvent.click(screen.getByTestId('story-handoff-submit'))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile', {
        replace: true,
        state: { submittedStoryId: `mock-submission-${draftId}` },
      })
    })
  })

  it('submit another assigns VITE_STORY_GPT_URL on success panel', async () => {
    const gptUrl = 'https://chatgpt.com/g/test-deploy-gpt'
    vi.stubEnv('VITE_STORY_GPT_URL', gptUrl)
    const assignMock = vi.fn()
    const originalLocation = window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, assign: assignMock },
    })

    await renderFreshPage('/story/submit?dev_handoff_phase=submitted')

    await waitFor(() => screen.getByTestId('story-handoff-success'))
    fireEvent.click(screen.getByTestId('story-handoff-submit-another'))
    expect(assignMock).toHaveBeenCalledWith(gptUrl)

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
    vi.unstubAllEnvs()
  })

  it('shows verify interpose on submit 403 and redirects to profile after verify', async () => {
    const draftId = storyDraftService._createMockDraftId?.()
    storyDraftService._seedMockDraft?.(draftId)
    storyDraftService._setMockForceVerificationRequired?.(true)
    renderPage(`/story/submit?draft_id=${draftId}`)

    await waitFor(() => screen.getByTestId('story-handoff-preview'))
    fireEvent.click(screen.getByTestId('story-handoff-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('story-handoff-verify')).toBeTruthy()
    })

    storyDraftService._setMockForceVerificationRequired?.(false)
    fireEvent.click(screen.getByTestId('mock-verify-complete'))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile', {
        replace: true,
        state: { submittedStoryId: `mock-submission-${draftId}` },
      })
    })
    expect(mockRetry).toHaveBeenCalled()
  })

  it('shows service down on submit 503', async () => {
    const draftId = storyDraftService._createMockDraftId?.()
    storyDraftService._seedMockDraft?.(draftId)
    renderPage(`/story/submit?draft_id=${draftId}`)
    await waitFor(() => screen.getByTestId('story-handoff-preview'))

    storyDraftService._setMockForceServiceDown?.(true)
    fireEvent.click(screen.getByTestId('story-handoff-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('story-handoff-service-down')).toBeTruthy()
    })
  })

  it('persists draft_id to sessionStorage from query', async () => {
    const draftId = storyDraftService._createMockDraftId?.()
    storyDraftService._seedMockDraft?.(draftId)
    renderPage(`/story/submit?draft_id=${draftId}`)

    await waitFor(() => screen.getByTestId('story-handoff-preview'))
    expect(sessionStorage.getItem('dogestonia.story_handoff.draft_id')).toBe(draftId)
  })
})
