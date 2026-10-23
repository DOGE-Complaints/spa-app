/**
 * @vitest-environment jsdom
 * CAB-08 — hide wallet/contrib · Go to Feed → /next/feed · story-activity wire markers
 */
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { AppShellLayout, ProtectedProfilePage } from '../../layout/AppShellLayout.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../i18n/cabinetDictionary.js'
import { CAB08_SHOW_WALLET_CONTRIB } from '../UserCabinetPage.jsx'

const mockUseSessionShell = vi.fn()
const fetchStoryActivity = vi.fn()

vi.mock('../../auth/SessionShellContext.jsx', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSessionShell: () => mockUseSessionShell(),
  }
})

vi.mock('../../services/storyActivityService.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    fetchStoryActivity: (...args) => fetchStoryActivity(...args),
  }
})

function renderProfile(initialPath = '/profile') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <I18nProvider>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/profile" element={<ProtectedProfilePage />} />
            <Route path="/next/feed" element={<div data-testid="feed-host">feed</div>} />
          </Route>
        </Routes>
      </I18nProvider>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  fetchStoryActivity.mockReset()
  fetchStoryActivity.mockResolvedValue({
    metrics: { submitted: 0, published: 0, underReview: 0 },
    rows: [],
  })
  mockUseSessionShell.mockReturnValue({
    shellState: SESSION_SHELL_STATES.AUTHENTICATED,
    profile: {
      display_name: 'Demo User',
      role: 'citizen',
      phone_verified: true,
      phone_verified_at: '2026-06-01T12:00:00Z',
      phone_dial_prefix: '+372',
    },
    retry: vi.fn(),
  })
})

afterEach(cleanup)

describe('CAB-08 cabinet layout + story-activity wire', () => {
  it('exports wallet/contrib gate off', () => {
    expect(CAB08_SHOW_WALLET_CONTRIB).toBe(false)
  })

  it('hides wallet and contribution slots; compact verified civic', async () => {
    renderProfile()
    expect(screen.queryByTestId('cabinet-slot-wallet')).toBeNull()
    expect(screen.queryByTestId('cabinet-slot-contribution')).toBeNull()
    expect(screen.getByTestId('user-cabinet-page').getAttribute('data-cab08')).toBe(
      'wallet-contrib-gated',
    )
    await waitFor(() => {
      expect(screen.getByTestId('cabinet-slot-civic').querySelector('[data-civic-compact="true"]')).toBeTruthy()
    })
    expect(screen.queryByTestId('civic-status-wallet-info')).toBeNull()
  })

  it('wires GET /story-activity and empty CTA → /next/feed', async () => {
    renderProfile()
    await waitFor(() => expect(fetchStoryActivity).toHaveBeenCalled())
    await waitFor(() => {
      expect(screen.getByTestId('story-activity-go-to-feed')).toBeTruthy()
    })
    const cta = screen.getByTestId('story-activity-go-to-feed')
    expect(cta.textContent).toBe(CABINET_DICTIONARY_EN.cabinet.story.empty.goToFeed)
    fireEvent.click(cta)
    expect(screen.getByTestId('feed-host')).toBeTruthy()
  })

  it('maps active rows from live payload (no invent)', async () => {
    fetchStoryActivity.mockResolvedValue({
      metrics: { submitted: 1, published: 1, underReview: 0 },
      rows: [{ id: 'LIVE-1', status: 'published', createdLabel: 'May 12, 2026' }],
    })
    renderProfile()
    await waitFor(() => {
      expect(screen.getByTestId('story-activity-card').getAttribute('data-story-activity-state')).toBe(
        'active',
      )
    })
    expect(screen.getByTestId('story-activity-row-LIVE-1')).toBeTruthy()
    expect(screen.queryByText('DE-ST-2041')).toBeNull()
  })
})
