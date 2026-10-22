/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount, ReactionSummaryStrip } from '../index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-24 React underlay · own vs people (M163/M164)', () => {
  afterEach(() => cleanup())

  it('ownInZone: wide underlay marker · no inline aggregate · React opens picker', () => {
    const onAgg = vi.fn()
    render(
      <ReactionsMount
        target="thread-root"
        stripStatus="ready"
        summaryMarks={[{ id: 'support', count: 2 }]}
        aggregateCount={2}
        selected={[]}
        forcePickerSurface="popover"
        t={t}
        ownInZone
        onAggregateActivate={onAgg}
      />,
    )
    const strip = screen.getByTestId('reaction-summary-strip')
    expect(strip.getAttribute('data-rm-own-in-zone')).toBe('true')
    expect(strip.getAttribute('data-rm-cr24')).toBe('true')
    expect(screen.queryByTestId('reaction-summary-aggregate')).toBeNull()
    expect(screen.queryByTestId('reaction-aggregate-row')).toBeNull()

    const react = screen.getByTestId('reaction-summary-react')
    expect(react.getAttribute('data-rm-react-underlay')).toBe('wide')
    expect(react.className).toMatch(/own-in-zone/)
    expect(react.className).toMatch(/--zero/)

    fireEvent.click(react)
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(screen.queryByTestId('rm-reactors-popover')).toBeNull()
    expect(onAgg).not.toHaveBeenCalled()
  })

  it('ownInZone: own icons inside React · stable slots · max 3', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        selected={['support', 'agree', 'useful_fact', 'acknowledge']}
        t={t}
        ownInZone
        reactAlways
      />,
    )
    const own = screen.getByTestId('reaction-summary-react-own')
    expect(own.getAttribute('data-rm-own-slots')).toBe('3')
    expect(screen.getByTestId('reaction-summary-own-support')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-own-agree')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-own-useful_fact')).toBeTruthy()
    expect(screen.queryByTestId('reaction-summary-own-acknowledge')).toBeNull()
    expect(screen.getByTestId('reaction-summary-react').getAttribute('data-rm-own-count')).toBe(
      '3',
    )
  })

  it('CSS: own-in-zone underlay Present · no invent', () => {
    const css = readFileSync(
      path.resolve(__dirname, '../ReactionSummaryStrip.css'),
      'utf8',
    )
    expect(css).toMatch(/rm-summary-strip__react--own-in-zone/)
    expect(css).toMatch(/--color-bg-primary/)
    expect(css).toMatch(/rm-summary-strip__react-own/)
    expect(css).toMatch(/rm-summary-strip__react--zero/)
  })
})
