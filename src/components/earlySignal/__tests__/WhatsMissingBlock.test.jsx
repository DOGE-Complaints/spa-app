/**
 * @vitest-environment jsdom
 * SPA-ES-04 — What's Missing qualitative framing (no coverage %).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { WhatsMissingBlock, MISSING_CATEGORY_ICONS } from '../WhatsMissingBlock.jsx'
import { getNetworkPulse } from '../../../services/networkPulseService.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

vi.mock('../../../services/networkPulseService.js', () => ({
  getNetworkPulse: vi.fn(),
}))

function renderMissing() {
  return render(
    <I18nProvider>
      <WhatsMissingBlock />
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('WhatsMissingBlock honesty', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    getNetworkPulse.mockReset()
  })

  it('renders abstract categories without coverage % or countdown', async () => {
    getNetworkPulse.mockResolvedValue({ status: 'omit', slots: [] })
    renderMissing()

    await waitFor(() => {
      expect(screen.getByTestId('whats-missing')).toBeTruthy()
    })
    expect(screen.getByText('Some parts of the picture are still uncertain.')).toBeTruthy()
    expect(screen.getByTestId('whats-missing-row-areas').textContent).toBe('Areas')
    expect(screen.getByTestId('whats-missing-row-languages').textContent).toBe('Languages')
    expect(screen.getByTestId('whats-missing-row-groups').textContent).toBe('Groups')
    expect(screen.getByTestId('whats-missing-row-themes').textContent).toBe('Themes')
    expect(screen.queryByText(/coverage/i)).toBeNull()
    expect(screen.queryByText(/%/)).toBeNull()
    expect(screen.queryByText(/N more Stories/i)).toBeNull()
    expect(screen.queryByText(/Offer/i)).toBeNull()
    expect(screen.queryByText(/Voices/i)).toBeNull()
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(MISSING_CATEGORY_ICONS.areas)
    expect(srcs).toContain(MISSING_CATEGORY_ICONS.languages)
    expect(srcs).toContain(MISSING_CATEGORY_ICONS.groups)
    expect(srcs).toContain(MISSING_CATEGORY_ICONS.themes)
    expect(srcs).toContain(MISSING_CATEGORY_ICONS.other)
  })

  it('reuses Pulse keys as labels only — never prints gap counts', async () => {
    getNetworkPulse.mockResolvedValue({
      status: 'bound',
      slots: [
        { id: 'areas', field: 'areas', value: 7, labelKey: 'earlySignal.pulse.metric.areas' },
        { id: 'languages', field: 'languages', value: 3, labelKey: 'earlySignal.pulse.metric.languages' },
        { id: 'topics', field: 'topics', value: 5, labelKey: 'earlySignal.pulse.metric.topics' },
      ],
    })
    renderMissing()

    await waitFor(() => {
      expect(screen.getByTestId('whats-missing-row-areas').getAttribute('data-pulse-label')).toBe('yes')
    })
    expect(screen.getByTestId('whats-missing-row-languages').getAttribute('data-pulse-label')).toBe('yes')
    expect(screen.getByTestId('whats-missing-row-themes').getAttribute('data-pulse-label')).toBe('yes')
    expect(screen.getByTestId('whats-missing-row-groups').getAttribute('data-pulse-label')).toBe('no')
    expect(screen.getByTestId('whats-missing').textContent).not.toMatch(/\b7\b/)
    expect(screen.getByTestId('whats-missing').textContent).not.toMatch(/\b3\b/)
    expect(screen.getByTestId('whats-missing').textContent).not.toMatch(/\b5\b/)
  })
})
