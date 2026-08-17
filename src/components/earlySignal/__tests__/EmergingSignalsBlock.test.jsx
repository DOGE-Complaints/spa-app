/**
 * @vitest-environment jsdom
 * SPA-ES-03 — Emerging empty vs cards honesty.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { EmergingSignalsBlock, EMERGING_ICONS } from '../EmergingSignalsBlock.jsx'
import { getEmergingSignals } from '../../../services/emergingSignalsService.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

vi.mock('../../../services/emergingSignalsService.js', () => ({
  getEmergingSignals: vi.fn(),
}))

function renderEmerging() {
  return render(
    <I18nProvider>
      <EmergingSignalsBlock />
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('EmergingSignalsBlock honesty', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    getEmergingSignals.mockReset()
  })

  it('renders honest empty on failure / empty signals — no fabricated cards', async () => {
    getEmergingSignals.mockResolvedValue({ status: 'empty', cards: [] })
    renderEmerging()

    await waitFor(() => {
      expect(screen.getByTestId('emerging-signals-empty')).toBeTruthy()
    })
    expect(screen.getByTestId('emerging-signals-empty-message').textContent).toBe(
      'No provisional patterns to show yet.',
    )
    expect(screen.queryByTestId('emerging-signals')).toBeNull()
    expect(screen.queryByTestId('emerging-signal-card')).toBeNull()
    expect(screen.queryByText(/N Stories until Issue/i)).toBeNull()
    expect(screen.queryByText(/until Issue/i)).toBeNull()
    expect(screen.queryByText(/confidence/i)).toBeNull()
    expect(document.querySelector('.emerging-signals-block__empty-icon')?.getAttribute('src')).toBe(
      EMERGING_ICONS.empty,
    )
  })

  it('binds label / axis / story_count and never Issue identity', async () => {
    getEmergingSignals.mockResolvedValue({
      status: 'cards',
      cards: [{ label: 'Public transport reliability', axis: 'mobility', storyCount: 6 }],
    })
    renderEmerging()

    await waitFor(() => {
      expect(screen.getByTestId('emerging-signals')).toBeTruthy()
    })
    expect(screen.getByTestId('emerging-signal-card').textContent).toContain('Public transport reliability')
    expect(screen.getByTestId('emerging-signal-card').textContent).toContain('mobility')
    expect(screen.getByTestId('emerging-signal-card').textContent).toContain('6 Stories')
    expect(screen.getByText('Provisional')).toBeTruthy()
    expect(screen.queryByText(/ISS-/)).toBeNull()
    expect(screen.queryByText(/Open issue/i)).toBeNull()
    expect(screen.queryByText(/N Stories until Issue/i)).toBeNull()
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(EMERGING_ICONS.marker)
    expect(srcs).toContain(EMERGING_ICONS.stories)
    expect(srcs).not.toContain(EMERGING_ICONS.issueCrest)
  })
})
