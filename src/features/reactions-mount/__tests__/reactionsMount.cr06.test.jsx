/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount, CR_REACTION_ICON_PACK } from '../index.js'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-06 picker chrome / layout', () => {
  afterEach(() => cleanup())

  it('thread-root hint is after layer body (footer), not under header', () => {
    render(
      <ReactionsMount
        target="thread-root"
        selected={[]}
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    const picker = screen.getByTestId('rm-reaction-picker')
    const body = screen.getByTestId('rm-picker-body')
    const hint = screen.getByTestId('rm-picker-root-scope-hint')
    const header = picker.querySelector('.rm-picker__header')
    expect(header).toBeTruthy()
    expect(header.contains(hint)).toBe(false)
    // DOM order: body then hint
    const position = body.compareDocumentPosition(hint)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(hint.className).toMatch(/rm-picker__hint--footer/)
  })

  it('comment picker has no root scope hint', () => {
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
    expect(screen.queryByTestId('rm-picker-root-scope-hint')).toBeNull()
  })

  it('close is icon-only with NS close SVG (no visible Close text)', () => {
    render(
      <ReactionsMount
        target="thread-root"
        selected={[]}
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
  })

  it('popover surface and capacity header remain Present', () => {
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
    expect(screen.getByTestId('rm-reaction-picker').getAttribute('data-rm-picker-surface')).toBe(
      'popover',
    )
    expect(screen.getByTestId('rm-picker-capacity')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-layer-emotional')).toBeTruthy()
  })
})
