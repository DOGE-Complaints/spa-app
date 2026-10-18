/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useRef, useState } from 'react'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  createFixtureAdapter,
  createLiveAdapter,
  PEOPLE_STATE_FIXTURES,
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
const spaRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

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

describe('CR-17 ReactorsPopover · people ≠ picker', () => {
  afterEach(() => cleanup())

  it('Reactions zone opens people popover · picker stays closed', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(screen.getByTestId('reactions-mount').getAttribute('data-rm-people-open')).toBe(
      'true',
    )
    expect(screen.getByTestId('reactions-mount').getAttribute('data-rm-picker-open')).toBe(
      'false',
    )
    expect(screen.getByTestId('rm-reactors-popover').getAttribute('data-rm-connect')).toBe(
      'absent',
    )
    expect(screen.getByTestId('rm-reactors-title').textContent).toBe(
      t('threadsFeed.reactions.peopleWhoReacted'),
    )
    expect(screen.getByTestId('rm-reactors-list').children.length).toBe(
      PEOPLE_STATE_FIXTURES.ready.length,
    )
  })

  it('aggregate activate opens people · not picker', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<SplitHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('reaction-summary-aggregate'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(screen.getByTestId('reaction-aggregate-row').getAttribute('data-rm-aggregate-active')).toBe(
      'true',
    )
  })

  it('React affordance still opens picker only', () => {
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={populated.summaryMarks}
        aggregateCount={populated.aggregateCount}
        forcePickerSurface="popover"
        t={t}
        onAggregateActivate={createFixtureAdapter().onAggregateActivate}
      />,
    )
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()
  })

  it('loading / error people fixtures · Live fail-closed', () => {
    const loading = createFixtureAdapter({
      initialState: 'populated',
      peopleState: 'loading',
    })
    expect(loading.listReactors().data.state).toBe('loading')
    const { unmount } = render(<SplitHost adapter={loading} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-loading')).toBeTruthy()
    unmount()

    const errored = createFixtureAdapter({
      initialState: 'populated',
      peopleState: 'error',
    })
    expect(errored.listReactors().status).toBe('fail')
    render(<SplitHost adapter={errored} />)
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-error')).toBeTruthy()
    expect(screen.queryByTestId('rm-reactors-list')).toBeNull()

    const live = createLiveAdapter({ issueId: 'x' })
    const liveResult = live.listReactors()
    expect(liveResult.status).toBe('fail')
    expect(liveResult.data.inventHttp).toBe(false)
    expect(liveResult.data.people).toEqual([])
  })

  it('Escape / outside dismiss closes people popover', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(
      <div>
        <button type="button" data-testid="outside-target">
          outside
        </button>
        <SplitHost adapter={adapter} />
      </div>,
    )
    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()

    fireEvent.click(screen.getByTestId('test-reactions-zone'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    fireEvent.pointerDown(screen.getByTestId('outside-target'))
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()
  })

  it('Gap v2 reactions.svg Present · Runtime URL still wired (CR-20)', () => {
    const iconPath = path.join(spaRoot, 'public/icons/next-feed/actions/reactions.svg')
    expect(existsSync(iconPath)).toBe(true)
    const body = readFileSync(iconPath, 'utf8')
    expect(body).toContain('circle')
    expect(body).toContain('currentColor')
    const src = readFileSync(
      path.join(spaRoot, 'src/features/feed-lab/post/FeedPostActionStrip.jsx'),
      'utf8',
    )
    expect(src).toContain('/icons/next-feed/actions/reactions.svg')
  })
})
