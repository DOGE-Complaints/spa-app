/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  CR_REACTION_ACCENT_IDS,
  CR_SELECTABLE_MARK_IDS,
  markAccentVar,
  markSoftVar,
  hasMarkAccent,
  STRIP_STATE_FIXTURES,
} from '../index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-14 mark accent tokens', () => {
  afterEach(() => cleanup())

  it('accent map covers every selectable mark id', () => {
    expect(CR_REACTION_ACCENT_IDS).toEqual(CR_SELECTABLE_MARK_IDS)
    for (const id of CR_SELECTABLE_MARK_IDS) {
      expect(hasMarkAccent(id)).toBe(true)
      expect(markAccentVar(id)).toBe(`--rm-mark-accent-${id}`)
      expect(markSoftVar(id)).toBe(`--rm-mark-soft-${id}`)
    }
  })

  it('tokens.css defines accent + soft vars for package §6 samples (light+dark)', () => {
    const tokens = readFileSync(path.resolve(dir, '../../../styles/tokens.css'), 'utf8')
    for (const id of ['acknowledge', 'support', 'agree', 'disagree', 'off_topic']) {
      expect(tokens).toContain(`--rm-mark-accent-${id}:`)
      expect(tokens).toContain(`--rm-mark-soft-${id}:`)
    }
    expect(tokens).toMatch(/\[data-theme='light'\][\s\S]*--rm-mark-accent-acknowledge/)
    expect(tokens).toMatch(/\[data-theme='dark'\][\s\S]*--rm-mark-accent-acknowledge/)
  })

  it('ReactionMarkAccents.css wires data-reaction-id → --rm-mark-accent', () => {
    const css = readFileSync(
      path.resolve(dir, '../icons/ReactionMarkAccents.css'),
      'utf8',
    )
    expect(css).toMatch(/data-reaction-id='support'/)
    expect(css).toMatch(/--rm-mark-accent:\s*var\(--rm-mark-accent-support\)/)
    expect(css).toMatch(/rm-summary-strip__mark/)
    expect(css).toMatch(/rm-aggregate-row__mark/)
  })

  it('picker option exposes data-reaction-id; no multicolor SVG invent', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={['support']}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    const option = screen.getByTestId('rm-picker-option-support')
    expect(option.getAttribute('data-reaction-id')).toBe('support')
    expect(option.getAttribute('data-rm-tile')).toBe('true')

    const colorSvg = path.resolve(
      dir,
      '../../../../public/icons/next-feed/reactions/support-color.svg',
    )
    expect(existsSync(colorSvg)).toBe(false)
  })

  it('summary marks carry data-reaction-id for accent wiring', () => {
    const populated = STRIP_STATE_FIXTURES.populated
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
    const mark = screen.getByTestId(
      `reaction-summary-mark-${populated.summaryMarks[0].reaction_id}`,
    )
    expect(mark.getAttribute('data-reaction-id')).toBe(populated.summaryMarks[0].reaction_id)
  })
})
