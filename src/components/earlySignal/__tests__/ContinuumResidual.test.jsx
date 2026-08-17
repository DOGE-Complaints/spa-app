/**
 * @vitest-environment jsdom
 * SPA-ES-05 — compact residual slots omit without data; rail catalog icons.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { ContinuumResidual, CONTINUUM_RAIL_ICONS } from '../ContinuumResidual.jsx'
import { getNetworkPulse } from '../../../services/networkPulseService.js'
import { getEmergingSignals } from '../../../services/emergingSignalsService.js'
import { getStoryGptHref, hasStoryGptUrl } from '../../../config/storyGptUrl.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

vi.mock('../../../services/networkPulseService.js', () => ({
  getNetworkPulse: vi.fn(),
}))

vi.mock('../../../services/emergingSignalsService.js', () => ({
  getEmergingSignals: vi.fn(),
}))

vi.mock('../../../config/storyGptUrl.js', () => ({
  getStoryGptHref: vi.fn(),
  hasStoryGptUrl: vi.fn(),
}))

function renderResidual() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <ContinuumResidual />
      </MemoryRouter>
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('ContinuumResidual compact slots', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    getNetworkPulse.mockReset()
    getEmergingSignals.mockReset()
    getStoryGptHref.mockReset()
    hasStoryGptUrl.mockReset()
    getStoryGptHref.mockReturnValue('https://example.test/gpt')
    hasStoryGptUrl.mockReturnValue(true)
  })

  it('omits Pulse and Emerging without data; keeps Missing + Help chrome', async () => {
    getNetworkPulse.mockResolvedValue({ status: 'omit', slots: [] })
    getEmergingSignals.mockResolvedValue({ status: 'empty', cards: [] })
    renderResidual()

    await waitFor(() => {
      expect(screen.getByTestId('continuum-residual')).toBeTruthy()
    })

    expect(screen.getByText('Issues and discovery')).toBeTruthy()
    expect(screen.getByText('Discovery continues for other Stories still taking shape.')).toBeTruthy()
    expect(screen.queryByTestId('continuum-pulse')).toBeNull()
    expect(screen.queryByTestId('continuum-emerging')).toBeNull()
    expect(screen.getByTestId('continuum-missing')).toBeTruthy()
    expect(screen.getByTestId('continuum-help')).toBeTruthy()
    expect(screen.queryByText(/Offer/i)).toBeNull()
    expect(screen.queryByText(/Voices/i)).toBeNull()
    expect(screen.queryByText(/% understood/i)).toBeNull()
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(CONTINUUM_RAIL_ICONS.missing)
    expect(srcs).toContain(CONTINUUM_RAIL_ICONS.help)
    expect(srcs).toContain(CONTINUUM_RAIL_ICONS.external)
  })

  it('shows compact Pulse and one Emerging card when clients bind', async () => {
    getNetworkPulse.mockResolvedValue({
      status: 'bound',
      slots: [{ id: 'stories', labelKey: 'earlySignal.pulse.metric.stories', value: 4, icon: null }],
    })
    getEmergingSignals.mockResolvedValue({
      status: 'cards',
      cards: [
        { label: 'Night lighting', axis: 'area', storyCount: 3 },
        { label: 'Second', axis: 'topic', storyCount: 2 },
      ],
    })
    renderResidual()

    await waitFor(() => {
      expect(screen.getByTestId('continuum-pulse')).toBeTruthy()
    })

    expect(screen.getByTestId('continuum-emerging')).toBeTruthy()
    expect(screen.getByText('Night lighting')).toBeTruthy()
    expect(screen.getByText('3 Stories')).toBeTruthy()
    expect(screen.queryByText('Second')).toBeNull()
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(CONTINUUM_RAIL_ICONS.emerging)
  })
})
