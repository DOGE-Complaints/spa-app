/**
 * @vitest-environment jsdom
 * SPA-ES-01 — unfiltered zero Issues → discovery; filtered/error stay PH-04.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { issueService } from '../../services/issueService.js'
import { getNetworkPulse } from '../../services/networkPulseService.js'
import { getEmergingSignals } from '../../services/emergingSignalsService.js'

vi.mock('../../services/issueService.js', () => ({
  issueService: {
    getIssues: vi.fn(),
    getIssue: vi.fn(),
  },
}))

vi.mock('../../services/networkPulseService.js', () => ({
  getNetworkPulse: vi.fn(),
}))

vi.mock('../../services/emergingSignalsService.js', () => ({
  getEmergingSignals: vi.fn(),
}))

function renderBoard(pathName = '/board') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[pathName]}>
        <BoardPage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('BoardPage ES-01 discovery empty', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    issueService.getIssues.mockReset()
    getNetworkPulse.mockReset()
    getNetworkPulse.mockResolvedValue({ status: 'omit', slots: [] })
    getEmergingSignals.mockReset()
    getEmergingSignals.mockResolvedValue({ status: 'empty', cards: [] })
  })

  it('renders discovery root when unfiltered issues list is empty', async () => {
    issueService.getIssues.mockResolvedValue([])
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-early-signal-discovery')).toBeTruthy()
    })

    expect(screen.queryByTestId('board-empty')).toBeNull()
    expect(screen.queryByTestId('board-filtered-empty')).toBeNull()
    expect(screen.queryByTestId('board-load-error')).toBeNull()
    expect(screen.getByTestId('early-signal-slot-pulse')).toBeTruthy()
    expect(screen.getByTestId('early-signal-slot-forming')).toBeTruthy()
    expect(screen.getByTestId('early-signal-slot-emerging')).toBeTruthy()
    expect(screen.getByTestId('early-signal-slot-missing')).toBeTruthy()
    expect(screen.getByTestId('early-signal-slot-help')).toBeTruthy()
    expect(screen.getByText('Early Signal discovery')).toBeTruthy()
    expect(screen.getByText('Network Pulse')).toBeTruthy()
    expect(screen.getByText('The Picture Is Forming')).toBeTruthy()
    expect(screen.getByText('Emerging Signals')).toBeTruthy()
    expect(screen.getByText("What's Missing")).toBeTruthy()
    expect(screen.getByText('Help Complete the Picture')).toBeTruthy()
    expect(screen.queryByText(/Offer/i)).toBeNull()
    expect(screen.queryByText(/trending/i)).toBeNull()
  })

  it('does not render discovery when filters are active and the list is empty', async () => {
    issueService.getIssues.mockResolvedValue([])
    renderBoard('/board?search=zzzz-no-match')

    await waitFor(() => {
      expect(screen.getByTestId('board-filtered-empty')).toBeTruthy()
    })

    expect(screen.queryByTestId('board-early-signal-discovery')).toBeNull()
    expect(screen.queryByTestId('board-empty')).toBeNull()
  })

  it('does not render discovery when issues list load fails', async () => {
    issueService.getIssues.mockRejectedValue(new Error('Gateway error: 500'))
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-load-error')).toBeTruthy()
    })

    expect(screen.queryByTestId('board-early-signal-discovery')).toBeNull()
    expect(screen.queryByTestId('board-empty')).toBeNull()
  })
})
