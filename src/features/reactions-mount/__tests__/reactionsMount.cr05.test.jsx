/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  ReactionSummaryStrip,
  CR_REACTION_ICON_PACK,
  STRIP_STATE_FIXTURES,
  createFixtureAdapter,
} from '../index.js'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

const populated = STRIP_STATE_FIXTURES.populated

describe('CR-05 strip open / dismiss', () => {
  afterEach(() => cleanup())

  it('empty: React visible and opens picker on click', () => {
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={[]}
        aggregateCount={0}
        forcePickerSurface="popover"
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    expect(screen.queryByTestId('reaction-summary-aggregate')).toBeNull()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
  })

  it('populated: React still visible (CR-12); aggregate hover + click open people (CR-17)', () => {
    const onAggregate = vi.fn(() => ({
      status: 'ok',
      data: {
        state: 'ready',
        people: [{ id: 'you', name: 'You', reaction_id: 'acknowledge', fixture: true }],
        fixture: true,
      },
    }))
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        forcePickerSurface="popover"
        t={t}
        onAggregateActivate={onAggregate}
      />,
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    const agg = screen.getByTestId('reaction-summary-aggregate')
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    fireEvent.mouseEnter(agg)
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(agg.className).toMatch(/rm-summary-strip__aggregate--open/)
    fireEvent.click(agg)
    expect(onAggregate).toHaveBeenCalled()
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('dismiss: outside pointerdown closes picker', () => {
    render(
      <div>
        <button type="button" data-testid="outside-target">
          outside
        </button>
        <ReactionsMount
          target="comment"
          commentId="c1"
          defaultOpen
          forcePickerSurface="popover"
          t={t}
        />
      </div>,
    )
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    fireEvent.pointerDown(screen.getByTestId('outside-target'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('dismiss: icon-only NS close + Escape', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    const close = screen.getByTestId('rm-picker-close')
    expect(close.getAttribute('aria-label')).toBe(t('threadsFeed.reactions.close'))
    expect(close.textContent?.trim()).toBe('')
    expect(
      close.querySelector('[data-testid="rm-icon"]')?.getAttribute('data-rm-icon-src'),
    ).toBe(CR_REACTION_ICON_PACK.close)
    expect(CR_REACTION_ICON_PACK.close).toBe('/icons/next-shell/actions/close.svg')
    fireEvent.click(close)
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()

    // reopen via empty React then Escape
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('strip unit: populated keeps React affordance (CR-12 react-always)', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-aggregate')).toBeTruthy()
  })

  it('FixtureAdapter aggregate returns listReactors people (CR-17)', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    const result = adapter.onAggregateActivate()
    expect(result.status).toBe('ok')
    expect(result.data.fixture).toBe(true)
    expect(result.data.people.length).toBeGreaterThan(0)
  })
})
