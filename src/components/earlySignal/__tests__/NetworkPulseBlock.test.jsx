/**
 * @vitest-environment jsdom
 * SPA-ES-02 — Pulse omit vs bound honesty.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NetworkPulseBlock } from '../NetworkPulseBlock.jsx'
import { getNetworkPulse } from '../../../services/networkPulseService.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

vi.mock('../../../services/networkPulseService.js', () => ({
  getNetworkPulse: vi.fn(),
}))

function renderPulse() {
  return render(
    <I18nProvider>
      <NetworkPulseBlock />
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('NetworkPulseBlock honesty', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    getNetworkPulse.mockReset()
  })

  it('renders omit copy on failure — no fabricated counts or Contributors', async () => {
    getNetworkPulse.mockResolvedValue({ status: 'omit', slots: [] })
    renderPulse()

    await waitFor(() => {
      expect(screen.getByTestId('network-pulse-omit')).toBeTruthy()
    })
    expect(screen.getByTestId('network-pulse-omit-message').textContent).toBe(
      'Stories are already shaping a collective picture.',
    )
    expect(screen.queryByTestId('network-pulse-bound')).toBeNull()
    expect(screen.queryByText(/Contributor/i)).toBeNull()
    expect(screen.queryByText(/Voices/i)).toBeNull()
    expect(screen.queryByText(/N Stories until Issue/i)).toBeNull()
    expect(screen.queryByText(/% understood/i)).toBeNull()
    expect(screen.getByText('The network is listening for civic Stories.')).toBeTruthy()
  })

  it('renders bound metric slots from §2.2 without Contributors', async () => {
    getNetworkPulse.mockResolvedValue({
      status: 'bound',
      slots: [
        {
          id: 'stories',
          field: 'stories_collected',
          value: 42,
          icon: '/icons/early-signal-dashboard/ic-pulse-stories.png',
          labelKey: 'earlySignal.pulse.metric.stories',
        },
      ],
    })
    renderPulse()

    await waitFor(() => {
      expect(screen.getByTestId('network-pulse-bound')).toBeTruthy()
    })
    expect(screen.getByTestId('network-pulse-metric-stories').textContent).toContain('42')
    expect(screen.getByText('Stories')).toBeTruthy()
    expect(screen.queryByTestId('network-pulse-metric-contributors')).toBeNull()
    expect(screen.queryByText(/Contributor/i)).toBeNull()
  })
})
