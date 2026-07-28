/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../../i18n/cabinetDictionary.js'
import { ContributionLayer } from '../ContributionLayer.jsx'
import {
  RECEIPTS_STATES,
  RECORDS_STATES,
  REPUTATION_STATES,
} from '../contributionLayerState.js'

afterEach(cleanup)

function renderLayer(props = {}) {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <ContributionLayer {...props} />
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('ContributionLayer', () => {
  it('MVP default is A1 empty / B1 empty / C1 later without Submit Story CTA', () => {
    renderLayer()
    expect(screen.getByTestId('contrib-receipts').getAttribute('data-contrib-receipts-state')).toBe(
      RECEIPTS_STATES.EMPTY,
    )
    expect(screen.getByTestId('contrib-records').getAttribute('data-contrib-records-state')).toBe(
      RECORDS_STATES.EMPTY,
    )
    expect(
      screen.getByTestId('contrib-reputation').getAttribute('data-contrib-reputation-state'),
    ).toBe(REPUTATION_STATES.LATER)
    expect(screen.getByTestId('contrib-receipts-empty').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.contrib.receipts.empty,
    )
    expect(screen.getByTestId('contrib-reputation-badge').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingLater,
    )
    const text = screen.getByTestId('contribution-layer').textContent
    expect(text).not.toMatch(/Submit Story/i)
  })

  it('renders populated and unavailable states for all three modules', () => {
    renderLayer({
      receiptsState: RECEIPTS_STATES.POPULATED,
      recordsState: RECORDS_STATES.POPULATED,
      reputationState: REPUTATION_STATES.AVAILABLE,
    })
    expect(screen.getByTestId('contrib-receipts-metric').textContent).toContain('12')
    expect(screen.getByTestId('contrib-records-metric').textContent).toContain('18')
    expect(screen.getByTestId('contrib-reputation-metrics')).toBeTruthy()
    expect(screen.getByTestId('contribution-layer').textContent).not.toMatch(
      /\b(XP|leaderboard|rank #|token balance)\b/i,
    )

    cleanup()
    renderLayer({
      receiptsState: RECEIPTS_STATES.UNAVAILABLE,
      recordsState: RECORDS_STATES.UNAVAILABLE,
      reputationState: REPUTATION_STATES.UNAVAILABLE,
    })
    expect(screen.getByTestId('contrib-receipts-unavailable')).toBeTruthy()
    expect(screen.getByTestId('contrib-records-unavailable')).toBeTruthy()
    expect(screen.getByTestId('contrib-reputation-unavailable')).toBeTruthy()
  })

  it('Retry affordances show comingSoon (no contribution HTTP)', () => {
    renderLayer({ receiptsState: RECEIPTS_STATES.UNAVAILABLE })
    fireEvent.click(screen.getByTestId('contrib-receipts-retry'))
    expect(screen.getByTestId('contribution-coming-soon').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingSoon,
    )
  })

  it('wires catalog icons (no coin / gamification copy)', () => {
    renderLayer()
    expect(screen.getByTestId('contrib-receipts-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-contrib-receipts.png',
    )
    expect(screen.getByTestId('contrib-records-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-contrib-records.png',
    )
    expect(screen.getByTestId('contrib-reputation-icon').getAttribute('src')).toBe(
      '/icons/user-cabinet/ic-contrib-reputation.png',
    )
    const text = screen.getByTestId('contribution-layer').textContent
    expect(text).not.toMatch(/coin|gamification|leaderboard|XP\b|token balance/i)
  })

  it('source has no contribution API fetch', async () => {
    const { readFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const path = await import('node:path')
    const root = path.dirname(fileURLToPath(import.meta.url))
    const src = await readFile(path.join(root, '../ContributionLayer.jsx'), 'utf8')
    expect(src).not.toMatch(/\bfetch\s*\(/)
    expect(src).not.toMatch(/\/contribution\/(receipts|records)/)
  })
})
