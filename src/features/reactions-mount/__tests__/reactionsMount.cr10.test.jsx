/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { ReactionsMount, measurePopoverPosition } from '../index.js'

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

describe('CR-10 picker portal escape', () => {
  afterEach(() => cleanup())

  it('desktop popover portals to document.body · not under feed-post-card', () => {
    render(
      <article className="feed-post-card" data-testid="feed-post-card-fake">
        <ReactionsMount
          target="thread-root"
          stripStatus="ready"
          summaryMarks={[]}
          aggregateCount={0}
          forcePickerSurface="popover"
          t={t}
        />
      </article>,
    )
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    const picker = screen.getByTestId('rm-reaction-picker')
    expect(picker.getAttribute('data-rm-portal')).toBe('body')
    expect(picker.parentElement).toBe(document.body)
    expect(picker.closest('.feed-post-card')).toBeNull()
    expect(picker.closest('[data-testid="feed-post-card-fake"]')).toBeNull()
    expect(getComputedStyle(picker).position || picker.style.position).toBeTruthy()
    expect(picker.style.position).toBe('fixed')
  })

  it('sheet surface stays inline (no body portal)', () => {
    render(
      <ReactionsMount
        target="comment"
        commentId="c1"
        defaultOpen
        forcePickerSurface="sheet"
        t={t}
      />,
    )
    const picker = screen.getByTestId('rm-reaction-picker')
    expect(picker.getAttribute('data-rm-portal')).toBe('inline')
    expect(picker.parentElement).not.toBe(document.body)
    expect(picker.closest('[data-testid="reactions-mount"]')).toBeTruthy()
  })

  it('CR-05 dismiss still works on portaled popover', () => {
    render(
      <div>
        <button type="button" data-testid="outside-target">
          outside
        </button>
        <ReactionsMount
          target="thread-root"
          defaultOpen
          forcePickerSurface="popover"
          t={t}
        />
      </div>,
    )
    expect(screen.getByTestId('rm-reaction-picker').getAttribute('data-rm-portal')).toBe('body')
    fireEvent.pointerDown(screen.getByTestId('outside-target'))
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()

    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('CR-06 chrome Present on portaled picker · measure helper · card overflow untouched', () => {
    render(
      <ReactionsMount
        target="thread-root"
        defaultOpen
        forcePickerSurface="popover"
        t={t}
      />,
    )
    const picker = screen.getByTestId('rm-reaction-picker')
    expect(withinPickerCapacity(picker)).toBeTruthy()
    expect(screen.getByTestId('rm-picker-root-scope-hint')).toBeTruthy()
    expect(screen.getByTestId('rm-picker-close')).toBeTruthy()

    const fake = {
      getBoundingClientRect: () => ({ top: 40, bottom: 96, left: 24, right: 200, width: 176, height: 56 }),
    }
    const pos = measurePopoverPosition(fake)
    expect(pos.top).toBe(104)
    expect(pos.left).toBe(24)

    const cardCss = readFileSync(
      path.resolve(dir, '../../feed-lab/post/FeedPostCard.css'),
      'utf8',
    )
    expect(cardCss).toMatch(/overflow:\s*hidden/)
    const pickerSrc = readFileSync(path.resolve(dir, '../picker/ReactionPicker.jsx'), 'utf8')
    expect(pickerSrc).toMatch(/createPortal/)
  })
})

function withinPickerCapacity(picker) {
  return picker.querySelector('[data-testid="rm-picker-capacity"]')
}
