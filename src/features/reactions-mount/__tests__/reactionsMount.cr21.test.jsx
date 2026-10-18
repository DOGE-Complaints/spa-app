/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { useRef, useState } from 'react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  createFixtureAdapter,
  STRIP_STATE_FIXTURES,
} from '../index.js'
import { FeedPostActionStrip } from '../../feed-lab/post/FeedPostActionStrip.jsx'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

const spaRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

function AffordanceHost({ adapter }) {
  const [host, setHost] = useState(null)
  const apiRef = useRef(null)
  const snap = adapter.snapshot()
  return (
    <div data-testid="cr21-host">
      <FeedPostActionStrip
        onZone={(zoneId, event) => {
          if (zoneId === 'reactions') {
            apiRef.current?.activateAggregate?.({
              anchorEl: event?.currentTarget ?? null,
            })
          }
        }}
        reactSlot={
          <ReactionsMount
            target="thread-root"
            stripStatus={snap.stripStatus}
            summaryMarks={snap.summaryMarks}
            aggregateCount={snap.aggregateCount}
            selected={snap.selected}
            forcePickerSurface="popover"
            forcePeopleSurface="popover"
            t={t}
            aggregatePlacement="below"
            aggregateHost={host}
            apiRef={apiRef}
            onAggregateActivate={adapter.onAggregateActivate}
            onReact={adapter.onReact}
          />
        }
      />
      <div ref={setHost} data-testid="test-aggregate-host" />
    </div>
  )
}

describe('CR-21 people affordance · anchor · chip · Reactions≠picker', () => {
  afterEach(() => cleanup())

  it('Gap v2 reactions.svg Present (consume CR-20)', () => {
    const iconPath = path.join(spaRoot, 'public/icons/next-feed/actions/reactions.svg')
    expect(existsSync(iconPath)).toBe(true)
  })

  it('Reactions zone opens people · picker closed · peopleAnchor=trigger', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<AffordanceHost adapter={adapter} />)
    fireEvent.click(screen.getByTestId('feed-post-action-reactions'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    const mount = screen.getByTestId('reactions-mount')
    expect(mount.getAttribute('data-rm-people-open')).toBe('true')
    expect(mount.getAttribute('data-rm-picker-open')).toBe('false')
    expect(mount.getAttribute('data-rm-people-anchor')).toBe('trigger')
  })

  it('Reactions chip Present · strip CR-21 marker', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<AffordanceHost adapter={adapter} />)
    const strip = screen.getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-reactions-chip')).toBe('true')
    expect(strip.getAttribute('data-lab-cr21-affordance')).toBe('true')
    expect(within(strip).getByTestId('feed-post-action-reactions-chip')).toBeTruthy()
  })

  it('populated aggregate activate → people · picker closed', () => {
    const adapter = createFixtureAdapter({ initialState: 'populated' })
    render(<AffordanceHost adapter={adapter} />)
    expect(STRIP_STATE_FIXTURES.populated.aggregateCount).toBeGreaterThan(0)
    fireEvent.click(screen.getByTestId('reaction-summary-aggregate'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    expect(screen.getByTestId('reactions-mount').getAttribute('data-rm-people-anchor')).toBe(
      'trigger',
    )
  })
})
