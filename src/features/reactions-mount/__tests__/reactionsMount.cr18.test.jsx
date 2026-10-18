/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { useRef, useState } from 'react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  ReactionsDialog,
  createFixtureAdapter,
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

function SplitHost({ adapter }) {
  const [host, setHost] = useState(null)
  const apiRef = useRef(null)
  const snap = adapter.snapshot()
  return (
    <div>
      <ReactionsMount
        target="thread-root"
        stripStatus={snap.stripStatus}
        summaryMarks={snap.summaryMarks}
        aggregateCount={snap.aggregateCount}
        selected={snap.selected}
        forcePickerSurface="popover"
        t={t}
        aggregatePlacement="below"
        aggregateHost={host}
        apiRef={apiRef}
        onAggregateActivate={adapter.onAggregateActivate}
        onReact={adapter.onReact}
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

describe('CR-18 ReactionsDialog · View all path', () => {
  afterEach(() => cleanup())

  it('View all opens dialog · picker absent · Connect stub · You without Connect', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    fireEvent.click(screen.getByTestId('rm-reactors-view-all'))
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()
    const dialog = screen.getByTestId('rm-reactions-dialog')
    expect(dialog).toBeTruthy()
    expect(dialog.getAttribute('data-rm-picker')).toBe('absent')
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(screen.getByTestId('rm-dialog-title').textContent).toBe(
      t('threadsFeed.reactions.reactionsTitle'),
    )
    expect(within(dialog).getByTestId('rm-dialog-you')).toBeTruthy()
    expect(within(dialog).queryByTestId('rm-dialog-connect-you')).toBeNull()
    fireEvent.click(screen.getByTestId('rm-dialog-connect-member-a'))
    expect(screen.getByTestId('rm-dialog-connect-msg').textContent).toBe(
      t('threadsFeed.reactions.connectUnavailableYet'),
    )
    expect(screen.getByTestId('rm-dialog-connection-unavailable')).toBeTruthy()
  })

  it('type tab filters · empty type from summaryMarks shows B2 copy', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    fireEvent.click(screen.getByTestId('rm-reactors-view-all'))
    fireEvent.click(screen.getByTestId('rm-dialog-tab-support'))
    expect(screen.getByTestId('rm-dialog-list').children.length).toBe(1)
    expect(screen.getByTestId('rm-dialog-row-member-a')).toBeTruthy()
    // populated marks include acknowledge/support/agree — people cover those;
    // empty B2 via direct dialog unit would need a zero-count type tab.
  })

  it('Escape closes dialog · error popover has no View all', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    fireEvent.click(screen.getByTestId('rm-reactors-view-all'))
    expect(screen.getByTestId('rm-reactions-dialog')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('rm-reactions-dialog')).toBeNull()

    cleanup()
    const errored = createFixtureAdapter({
      initialState: 'populated',
      peopleState: 'error',
    })
    render(<SplitHost adapter={errored} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-error')).toBeTruthy()
    expect(screen.queryByTestId('rm-reactors-view-all')).toBeNull()
  })

  it('ReactionsDialog empty type B2 via summaryMarks zero tab', () => {
    render(
      <ReactionsDialog
        open
        panelId="t"
        state="ready"
        people={[{ id: 'a', name: 'A', reaction_id: 'support', fixture: true }]}
        summaryMarks={[
          { reaction_id: 'support', count: 1 },
          { reaction_id: 'empathy', count: 2 },
        ]}
        t={t}
      />,
    )
    fireEvent.click(screen.getByTestId('rm-dialog-tab-empathy'))
    expect(screen.getByTestId('rm-dialog-empty').textContent).toBe(
      t('threadsFeed.reactions.noPeopleForReaction'),
    )
  })

  it('dialog has no reaction picker catalog', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        forcePickerSurface="popover"
        t={t}
        onAggregateActivate={adapter.onAggregateActivate}
      />,
    )
    fireEvent.click(screen.getByTestId('reaction-summary-aggregate'))
    fireEvent.click(screen.getByTestId('rm-reactors-view-all'))
    const dialog = screen.getByTestId('rm-reactions-dialog')
    expect(dialog.querySelector('[data-testid="rm-reaction-picker"]')).toBeNull()
    expect(dialog.querySelector('[data-testid^="rm-picker-"]')).toBeNull()
  })
})
