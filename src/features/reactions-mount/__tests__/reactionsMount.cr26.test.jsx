/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionSummaryStrip } from '../index.js'

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

describe('CR-26 own React empty/filled harmony (M173)', () => {
  afterEach(() => cleanup())

  it('empty: icon-above-label · reserved lane · cr26 markers', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        selected={[]}
        t={t}
        ownInZone
        reactAlways
      />,
    )
    const strip = screen.getByTestId('reaction-summary-strip')
    expect(strip.getAttribute('data-rm-cr26')).toBe('true')
    const react = screen.getByTestId('reaction-summary-react')
    expect(react.getAttribute('data-rm-cr26-harmony')).toBe('m173')
    expect(react.className).toMatch(/--zero/)
    expect(react.className).toMatch(/own-in-zone/)
    const own = screen.getByTestId('reaction-summary-react-own')
    expect(own.getAttribute('data-rm-own-slots')).toBe('3')
    expect(own.getAttribute('data-rm-own-lane')).toBe('reserved')
    expect(own.getAttribute('aria-hidden')).toBe('true')
  })

  it('filled: same entry stack · 3 own slots · no invent', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        selected={['support', 'agree', 'useful_fact']}
        t={t}
        ownInZone
        reactAlways
      />,
    )
    const react = screen.getByTestId('reaction-summary-react')
    expect(react.className).toMatch(/--has-own/)
    expect(react.getAttribute('data-rm-own-count')).toBe('3')
    expect(react.getAttribute('data-rm-cr26-harmony')).toBe('m173')
    expect(screen.getByTestId('reaction-summary-own-support')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-own-agree')).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-own-useful_fact')).toBeTruthy()
  })

  it('CSS: icon-above-label for has-own · reserved 3-slot · M173 gaps', () => {
    const css = readFileSync(
      path.resolve(__dirname, '../ReactionSummaryStrip.css'),
      'utf8',
    )
    expect(css).toMatch(/react--has-own[\s\S]*react-entry[\s\S]*flex-direction:\s*column/)
    expect(css).toMatch(/react--own-in-zone[\s\S]*react-entry[\s\S]*flex-direction:\s*column/)
    expect(css).toMatch(/min-width:\s*calc\(3 \* 18px/)
    expect(css).toMatch(/CR-26 M173/)
  })
})
