/**
 * @vitest-environment jsdom
 * SPA-ES-05 — Issues ≥ 1 feed + residual; no Offers; /dashboard unchanged.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const sampleIssue = {
  id: 'ISS-100',
  status: ISSUE_STATUS.PUBLISHED,
  type: ISSUE_TYPE.IMPROVEMENT,
  labels: ['waste'],
  title: { en: 'Waste collection delay', et: 'Jäätmete veo viivitus', ru: 'Задержка вывоза отходов' },
  summary: { en: 'Bins overflow on the collection day.', et: 'Konteinerid ületäituvad.', ru: 'Контейнеры переполняются.' },
  created_at: '2026-08-01T00:00:00Z',
}

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

describe('BoardPage ES-05 continuum', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    issueService.getIssues.mockReset()
    getNetworkPulse.mockReset()
    getNetworkPulse.mockResolvedValue({ status: 'omit', slots: [] })
    getEmergingSignals.mockReset()
    getEmergingSignals.mockResolvedValue({ status: 'empty', cards: [] })
  })

  it('renders PH-04 feed and residual when issues.length ≥ 1 (AC-SPA-ES-05)', async () => {
    issueService.getIssues.mockResolvedValue([sampleIssue])
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-continuum')).toBeTruthy()
    })

    expect(screen.getByTestId('board-feed')).toBeTruthy()
    expect(screen.getByText('ISS-100')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Issue ISS-100/ })).toBeTruthy()
    expect(screen.getByTestId('board-continuum')).toBeTruthy()
    expect(screen.getByTestId('continuum-residual')).toBeTruthy()
    expect(screen.getByText('Issues and discovery')).toBeTruthy()
    expect(screen.queryByTestId('board-early-signal-discovery')).toBeNull()
    expect(screen.queryByTestId('board-empty')).toBeNull()
    expect(screen.queryByText(/Offer/i)).toBeNull()
    expect(screen.queryByText(/Voices/i)).toBeNull()
    expect(screen.queryByText(/10 Stories created an Issue/i)).toBeNull()
  })

  it('omits compact Pulse/Emerging when those clients have no data', async () => {
    issueService.getIssues.mockResolvedValue([sampleIssue])
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('continuum-residual')).toBeTruthy()
    })

    expect(screen.queryByTestId('continuum-pulse')).toBeNull()
    expect(screen.queryByTestId('continuum-emerging')).toBeNull()
    expect(screen.getByTestId('continuum-missing')).toBeTruthy()
  })

  it('does not replace empty discovery with continuum', async () => {
    issueService.getIssues.mockResolvedValue([])
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-early-signal-discovery')).toBeTruthy()
    })

    expect(screen.queryByTestId('board-continuum')).toBeNull()
    expect(screen.queryByTestId('continuum-residual')).toBeNull()
  })

  it('keeps PH-04 card → /issue/:id and does not touch /dashboard (AC-SPA-ES-07)', () => {
    const boardSrc = readFileSync(path.join(root, 'pages/BoardPage.jsx'), 'utf8')
    const appSrc = readFileSync(path.join(root, 'App.jsx'), 'utf8')
    expect(boardSrc).toMatch(/\/issue\/\$\{item\.id\}/)
    expect(boardSrc).toContain('showOpenAffordance')
    expect(boardSrc).toContain('ContinuumResidual')
    expect(boardSrc).not.toContain('DashboardPage')
    expect(boardSrc).not.toContain("path=\"/dashboard\"")
    expect(appSrc).toContain('<Route path="/dashboard" element={<DashboardPage />} />')
  })
})
