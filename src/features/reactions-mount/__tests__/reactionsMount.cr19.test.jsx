/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { useRef, useState } from 'react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  resolvePeopleSurface,
  createFixtureAdapter,
  createLiveAdapter,
  STRIP_STATE_FIXTURES,
} from '../index.js'
import { ReactionsLabCanvas } from '../lab/ReactionsLabCanvas.jsx'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

function SplitHost({ adapter, forcePeopleSurface = 'popover' }) {
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
        forcePeopleSurface={forcePeopleSurface}
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

describe('CR-19 people sheet · lab wire', () => {
  afterEach(() => cleanup())

  it('resolvePeopleSurface force + auto fallback', () => {
    expect(resolvePeopleSurface('sheet')).toBe('sheet')
    expect(resolvePeopleSurface('popover')).toBe('popover')
  })

  it('narrow sheet: Reactions opens people sheet · picker absent · ≤88dvh class', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} forcePeopleSurface="sheet" />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()
    const sheet = screen.getByTestId('rm-reactions-people-sheet')
    expect(sheet).toBeTruthy()
    expect(sheet.getAttribute('data-rm-people-surface')).toBe('sheet')
    expect(sheet.getAttribute('data-rm-picker')).toBe('absent')
    expect(sheet.className).toMatch(/rm-dialog--sheet/)
    expect(within(sheet).getByTestId('rm-dialog-tabs')).toBeTruthy()
    expect(within(sheet).getByTestId('rm-dialog-you')).toBeTruthy()
    fireEvent.click(within(sheet).getByTestId('rm-dialog-connect-member-a'))
    expect(within(sheet).getByTestId('rm-dialog-connect-msg').textContent).toBe(
      t('threadsFeed.reactions.connectUnavailableYet'),
    )
  })

  it('desktop popover path still View all → dialog · Reactions≠picker', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} forcePeopleSurface="popover" />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    fireEvent.click(screen.getByTestId('rm-reactors-view-all'))
    expect(screen.getByTestId('rm-reactions-dialog').getAttribute('data-rm-people-surface')).toBe(
      'dialog',
    )
  })

  it('Escape closes people sheet', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} forcePeopleSurface="sheet" />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactions-people-sheet')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('rm-reactions-people-sheet')).toBeNull()
  })

  it('Live adapter people fail-closed · no invent list', () => {
    const live = createLiveAdapter({ target: 'thread-root' })
    const result = live.onAggregateActivate()
    expect(result?.status).toBe('fail')
    expect(result?.data?.inventHttp).toBe(false)
    expect(result?.data?.people || []).toEqual([])
  })

  it('lab reactions canvas wires CR-19 people stands', () => {
    render(<ReactionsLabCanvas />)
    expect(screen.getByTestId('rm-lab-cr19-people')).toBeTruthy()
    expect(screen.getByTestId('rm-lab-cr19-people-popover')).toBeTruthy()
    expect(screen.getByTestId('rm-lab-cr19-people-sheet')).toBeTruthy()
    const sheetStand = screen.getByTestId('rm-lab-cr19-people-sheet')
    expect(sheetStand.getAttribute('data-lab-cr19-people')).toBe('sheet')
    const mount = within(sheetStand).getByTestId('reactions-mount')
    expect(mount.getAttribute('data-rm-people-surface')).toBe('sheet')
    fireEvent.click(within(sheetStand).getByTestId('feed-post-action-reactions'))
    expect(mount.getAttribute('data-rm-dialog-open')).toBe('true')
    expect(mount.getAttribute('data-rm-picker-open')).toBe('false')
    expect(screen.getByTestId('rm-reactions-people-sheet')).toBeTruthy()
  })

  it('populated fixture marks present for sheet tabs', () => {
    expect(STRIP_STATE_FIXTURES.populated.summaryMarks?.length).toBeGreaterThan(0)
  })
})
