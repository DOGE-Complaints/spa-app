/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  ReactionPicker,
  createFixtureAdapter,
  CR_REACTION_ICON_PACK,
} from '../index.js'
import { toggleReactionSelection } from '../../feed/semantics/reactionsV1.js'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-02 reaction picker', () => {
  afterEach(() => cleanup())

  it('comment picker shows three groups; root omits Moderation', () => {
    const { rerender } = render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={[]}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    expect(screen.getByTestId('rm-picker-layer-emotional')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-layer-epistemic')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-layer-moderation')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-option-off_topic')).toBeTruthy()

    rerender(
      <ReactionsMount
        target="thread-root"
        selected={[]}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    expect(screen.queryByTestId('rm-picker-layer-moderation')).toBeNull()
    expect(screen.getByTestId('rm-picker-root-scope-hint')).toBeTruthy()
  })

  it('capacity ≤3 and Agree/Disagree XOR via catalog helper', () => {
    const a = toggleReactionSelection(['agree'], 'disagree', 3)
    expect(a.error).toBeNull()
    expect(a.selected).toEqual(['disagree'])
    const full = toggleReactionSelection(['acknowledge', 'support', 'empathy'], 'agree', 3)
    expect(full.error).toBe('capacity')
    expect(full.selected).toEqual(['acknowledge', 'support', 'empathy'])
  })

  it('empty strip React opens picker (CR-05; selection alone without marks still empty)', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={['support']}
        forcePickerSurface="popover"
        t={t}
      />,
    )
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(screen.getByTestId('reactions-mount').getAttribute('data-rm-picker-open')).toBe('true')
  })

  it('save-error restores previous selection (no silent empty)', async () => {
    const adapter = createFixtureAdapter({
      initialState: 'populated',
      target: 'comment',
      failNext: true,
    })
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={['support']}
        summaryMarks={[{ reaction_id: 'support', count: 1 }]}
        aggregateCount={1}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
        onReact={adapter.onReact}
      />,
    )
    expect(screen.getByTestId('rm-picker-option-support').getAttribute('aria-pressed')).toBe(
      'true',
    )
    fireEvent.click(screen.getByTestId('rm-picker-option-empathy'))
    await waitFor(() => {
      expect(screen.getByTestId('rm-picker-save-error')).toBeTruthy()
    })
    expect(screen.getByTestId('rm-picker-option-support').getAttribute('aria-pressed')).toBe(
      'true',
    )
    expect(screen.getByTestId('rm-picker-option-empathy').getAttribute('aria-pressed')).toBe(
      'false',
    )
  })

  it('mobile sheet surface uses data-rm-picker-surface=sheet', () => {
    render(
      <ReactionPicker
        open
        panelId="p1"
        surface="sheet"
        target="comment"
        layers={{
          emotional: [{ id: 'support', layer: 'emotional' }],
          epistemic: [],
          moderation: [],
        }}
        selectedIds={[]}
        capacity={3}
        icons={CR_REACTION_ICON_PACK}
        t={t}
        onClose={() => {}}
      />,
    )
    expect(screen.getByTestId('rm-reaction-picker').getAttribute('data-rm-picker-surface')).toBe(
      'sheet',
    )
  })

  it('CR-icon agree/disagree Runtime URLs present on options', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={[]}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    const agree = screen.getByTestId('rm-picker-option-agree')
    const disagree = screen.getByTestId('rm-picker-option-disagree')
    expect(agree.querySelector('[data-testid="rm-icon"]')?.getAttribute('data-rm-icon-src')).toBe(
      '/icons/next-feed/reactions/agree.svg',
    )
    expect(
      disagree.querySelector('[data-testid="rm-icon"]')?.getAttribute('data-rm-icon-src'),
    ).toBe('/icons/next-feed/reactions/disagree.svg')
  })
})
