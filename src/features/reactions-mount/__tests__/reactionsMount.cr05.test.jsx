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

  it('populated: React absent; aggregate hover + click open picker', () => {
    const onAggregate = vi.fn(() => ({ status: 'ok', data: { oos: 'M155' } }))
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
    expect(screen.queryByTestId('reaction-summary-react')).toBeNull()
    const agg = screen.getByTestId('reaction-summary-aggregate')
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    fireEvent.mouseEnter(agg)
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(agg.className).toMatch(/rm-summary-strip__aggregate--open/)
    fireEvent.click(agg)
    expect(onAggregate).toHaveBeenCalled()
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
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

  it('strip unit: populated hides React affordance', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        t={t}
      />,
    )
    expect(screen.queryByTestId('reaction-summary-react')).toBeNull()
    expect(screen.getByTestId('reaction-summary-aggregate')).toBeTruthy()
  })

  it('FixtureAdapter aggregate still reports M155 OOS (no invent people UI)', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    expect(adapter.onAggregateActivate().data.oos).toBe('M155')
  })
})
