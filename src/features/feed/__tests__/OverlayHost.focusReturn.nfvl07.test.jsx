/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { OverlayHost } from '../presentation/OverlayHost.jsx'

describe('NF-VL-07 OverlayHost focus-return (F1)', () => {
  afterEach(() => {
    cleanup()
  })

  it('restores focus to previousActiveElement on unmount', () => {
    const opener = document.createElement('button')
    opener.type = 'button'
    opener.textContent = 'Open issue'
    document.body.appendChild(opener)
    opener.focus()
    expect(document.activeElement).toBe(opener)

    const { unmount } = render(
      <OverlayHost open onDismiss={() => {}}>
        <button type="button" data-testid="overlay-inner">
          Inside
        </button>
      </OverlayHost>,
    )

    expect(screen.getByTestId('overlay-host').getAttribute('data-focus-return')).toBe('true')
    screen.getByTestId('overlay-inner').focus()
    expect(document.activeElement).toBe(screen.getByTestId('overlay-inner'))

    unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })

  it('restores focus via restoreFocusRef when provided', () => {
    const opener = document.createElement('button')
    opener.type = 'button'
    opener.textContent = 'Opener ref'
    document.body.appendChild(opener)
    const other = document.createElement('button')
    other.type = 'button'
    other.textContent = 'Other'
    document.body.appendChild(other)
    other.focus()

    const restoreFocusRef = { current: opener }
    const { unmount } = render(
      <OverlayHost open onDismiss={() => {}} restoreFocusRef={restoreFocusRef}>
        <span>panel</span>
      </OverlayHost>,
    )

    unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
    other.remove()
  })

  it('Escape calls onDismiss (focus restore owned by unmount)', () => {
    const onDismiss = vi.fn()
    const opener = document.createElement('button')
    opener.type = 'button'
    document.body.appendChild(opener)
    opener.focus()

    const { unmount } = render(
      <OverlayHost open onDismiss={onDismiss}>
        <div>panel</div>
      </OverlayHost>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onDismiss).toHaveBeenCalledTimes(1)
    unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })
})
