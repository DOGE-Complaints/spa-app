/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useRef, useState } from 'react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  ReactionSummaryStrip,
  STRIP_STATE_FIXTURES,
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

function SplitHost({ summaryMarks, aggregateCount }) {
  const [host, setHost] = useState(null)
  const apiRef = useRef(null)
  return (
    <div>
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={summaryMarks}
        aggregateCount={aggregateCount}
        forcePickerSurface="popover"
        t={t}
        aggregatePlacement="below"
        aggregateHost={host}
        apiRef={apiRef}
        onAggregateActivate={vi.fn(() => ({ status: 'ok', data: { oos: 'M155' } }))}
      />
      <div ref={setHost} data-testid="test-aggregate-host" />
      <button
        type="button"
        data-testid="test-reactions-zone"
        onClick={() => apiRef.current?.activateAggregate?.()}
      >
        Reactions
      </button>
    </div>
  )
}

describe('CR-12 react-always + aggregate below', () => {
  afterEach(() => cleanup())

  it('populated: React visible and opens picker', () => {
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        forcePickerSurface="popover"
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
  })

  it('below placement: aggregate portals into host; empty has no row', () => {
    const { rerender } = render(
      <SplitHost summaryMarks={[]} aggregateCount={0} />,
    )
    expect(screen.queryByTestId('reaction-aggregate-row')).toBeNull()
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()

    rerender(
      <SplitHost
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
      />,
    )
    const host = screen.getByTestId('test-aggregate-host')
    const row = screen.getByTestId('reaction-aggregate-row')
    expect(host.contains(row)).toBe(true)
    expect(screen.getByTestId('reaction-summary-aggregate')).toBeTruthy()
    expect(screen.getByTestId('reaction-aggregate-total').textContent).toMatch(/7 total/)
    // strip does not duplicate aggregate inline
    expect(
      screen.getByTestId('reaction-summary-strip').querySelector('[data-testid="reaction-summary-aggregate"]'),
    ).toBeNull()
  })

  it('Reactions zone api activates aggregate / opens picker', () => {
    render(
      <SplitHost
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
      />,
    )
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(screen.getByTestId('reaction-aggregate-row').getAttribute('data-rm-aggregate-active')).toBe(
      'true',
    )
  })

  it('external strip unit: no inline aggregate when placement external', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        aggregatePlacement="external"
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    expect(screen.queryByTestId('reaction-summary-aggregate')).toBeNull()
  })
})
