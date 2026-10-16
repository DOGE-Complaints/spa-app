/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount } from '../index.js'

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-13 picker tile grid + footer chrome', () => {
  afterEach(() => cleanup())

  it('popover: tile grid · description · selected check · Cancel/Add footer', () => {
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
    const picker = screen.getByTestId('rm-reaction-picker')
    expect(picker.getAttribute('data-rm-picker-layout')).toBe('tile-grid')
    expect(picker.getAttribute('data-rm-portal')).toBe('body')

    const grid = screen.getByTestId('rm-picker-layer-grid-emotional')
    expect(grid.className).toMatch(/rm-picker-layer__list/)
    expect(grid.querySelectorAll('[data-rm-tile="true"]').length).toBeGreaterThan(1)

    const option = screen.getByTestId('rm-picker-option-support')
    expect(option.getAttribute('aria-pressed')).toBe('true')
    expect(option.getAttribute('data-rm-tile')).toBe('true')
    expect(screen.getByTestId('rm-picker-option-desc-support').textContent).toMatch(/support/i)
    expect(screen.getByTestId('rm-picker-option-check-support')).toBeTruthy()

    expect(screen.getByTestId('rm-picker-title').textContent).toBe(
      t('threadsFeed.reactions.reactToComment'),
    )
    expect(screen.getByTestId('rm-picker-subtitle').textContent).toBe(
      t('threadsFeed.reactions.chooseUpTo'),
    )
    expect(screen.getByTestId('rm-picker-capacity').textContent).toMatch(/1 of 3 selected/)
    expect(screen.getByTestId('rm-picker-footer')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-cancel').textContent).toBe(
      t('threadsFeed.reactions.cancel'),
    )
    expect(screen.getByTestId('rm-picker-add').textContent).toBe(
      t('threadsFeed.reactions.addReactions'),
    )
    expect(screen.queryByTestId('rm-picker-done')).toBeNull()

    fireEvent.click(screen.getByTestId('rm-picker-cancel'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('sheet: Done footer · no Cancel/Add', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        selected={[]}
        defaultOpen
        forcePickerSurface="sheet"
        t={t}
      />,
    )
    expect(screen.getByTestId('rm-reaction-picker').getAttribute('data-rm-picker-surface')).toBe(
      'sheet',
    )
    expect(screen.getByTestId('rm-picker-done').textContent).toBe(t('threadsFeed.reactions.done'))
    expect(screen.queryByTestId('rm-picker-cancel')).toBeNull()
    expect(screen.queryByTestId('rm-picker-add')).toBeNull()
    fireEvent.click(screen.getByTestId('rm-picker-done'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('thread-root: no moderation layer · portal held · Add closes', () => {
    render(
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
    expect(screen.getByTestId('rm-reaction-picker').getAttribute('data-rm-portal')).toBe('body')
    expect(screen.getByTestId('rm-picker-title').textContent).toBe(
      t('threadsFeed.reactions.reactToPost'),
    )
    fireEvent.click(screen.getByTestId('rm-picker-add'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })
})
