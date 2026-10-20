/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FeedPostCard } from '../post/FeedPostCard.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'
import { SHARE_ROWS, buildNetworkShareHref } from '../post/share/index.js'

describe('CT-27 Share · Instagram disabled · Copy text-only', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('SHARE_ROWS · Instagram disabled · no copyFallback · Copy textOnly', () => {
    const ig = SHARE_ROWS.find((r) => r.id === 'instagram')
    const copy = SHARE_ROWS.find((r) => r.id === 'copy')
    expect(ig?.disabled).toBe(true)
    expect(ig?.copyFallback).toBe(false)
    expect(ig?.iconSrc).toBeTruthy()
    expect(copy?.textOnly).toBe(true)
    expect(copy?.iconSrc).toBeNull()
    expect(buildNetworkShareHref('instagram', 'https://lab.local/i/1')).toBeNull()
  })

  it('Instagram listed · visually disabled · aria-disabled · no clipboard on click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    const open = vi.fn()
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    vi.stubGlobal('open', open)
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    const surface = await screen.findByTestId('feed-post-share-surface')
    expect(surface.getAttribute('data-lab-ct27')).toBe('true')
    const ig = screen.getByTestId('feed-post-share-row-instagram')
    expect(ig.getAttribute('data-share-disabled')).toBe('true')
    expect(ig.getAttribute('aria-disabled')).toBe('true')
    expect(ig.disabled).toBe(true)
    expect(ig.className).toMatch(/row--disabled/)
    expect(screen.getByTestId('feed-post-share-icon-instagram')).toBeTruthy()
    fireEvent.click(ig)
    await waitFor(() => {
      expect(writeText).not.toHaveBeenCalled()
    })
    expect(open).not.toHaveBeenCalled()
    expect(screen.queryByTestId('feed-post-share-copied')).toBeNull()
  })

  it('Copy link text-only · no icon / ⎘ · still copies', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    await screen.findByTestId('feed-post-share-surface')
    const copy = screen.getByTestId('feed-post-share-row-copy')
    expect(copy.getAttribute('data-share-copy-text-only')).toBe('true')
    expect(copy.className).toMatch(/row--copy-text/)
    expect(copy.querySelector('.feed-post-share-surface__row-icon--copy')).toBeNull()
    expect(copy.textContent).not.toMatch(/⎘/)
    expect(copy.querySelector('img')).toBeNull()
    fireEvent.click(copy)
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(LAB_FEED_FIXTURES[0].publicIssueUrl)
    })
    expect(await screen.findByTestId('feed-post-share-copied')).toBeTruthy()
  })

  it('other networks still Present with icons', async () => {
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    await screen.findByTestId('feed-post-share-surface')
    for (const id of ['telegram', 'x', 'whatsapp', 'facebook']) {
      const row = screen.getByTestId(`feed-post-share-row-${id}`)
      expect(row.getAttribute('data-share-disabled')).toBeNull()
      expect(screen.getByTestId(`feed-post-share-icon-${id}`)).toBeTruthy()
    }
  })
})
