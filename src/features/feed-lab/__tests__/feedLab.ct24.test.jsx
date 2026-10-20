/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedPostCard } from '../post/FeedPostCard.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'
import {
  SHARE_ICON_URLS,
  SHARE_ROWS,
  resolvePublicIssueUrl,
} from '../post/share/index.js'

describe('CT-24 Share Issue link sheet', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('resolves publicIssueUrl · honesty when Absent', () => {
    expect(resolvePublicIssueUrl(LAB_FEED_FIXTURES[0])).toBe(
      'https://lab.local/issues/DOGEstonia-UusVeerenni-001',
    )
    expect(resolvePublicIssueUrl(LAB_FEED_FIXTURES[1])).toBeNull()
    expect(resolvePublicIssueUrl({})).toBeNull()
  })

  it('Share opens popover with six rows + five network icon srcs', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
    render(
      <MemoryRouter>
        <FeedLabPage />
      </MemoryRouter>,
    )
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-ct24')).toBe('true')
    fireEvent.click(within(card).getByTestId('feed-post-action-share'))
    const surface = await screen.findByTestId('feed-post-share-surface')
    expect(surface.getAttribute('data-lab-share-surface')).toBe('popover')
    expect(surface.getAttribute('data-lab-share-url')).toBe('present')
    expect(screen.getByTestId('feed-post-share-rows')).toBeTruthy()
    for (const id of ['telegram', 'instagram', 'x', 'whatsapp', 'facebook']) {
      expect(screen.getByTestId(`feed-post-share-row-${id}`)).toBeTruthy()
      expect(screen.getByTestId(`feed-post-share-icon-${id}`).getAttribute('src')).toBe(
        SHARE_ICON_URLS[id],
      )
    }
    expect(screen.getByTestId('feed-post-share-row-copy')).toBeTruthy()
    expect(SHARE_ROWS).toHaveLength(6)
    /* CT-27 supersedes Instagram copy-fallback · row still Present in list */
    expect(screen.getByTestId('feed-post-share-row-instagram')).toBeTruthy()
    expect(
      screen.getByTestId('feed-post-share-row-instagram').getAttribute('data-share-copy-fallback'),
    ).toBeNull()
  })

  it('narrow MQ → bottom sheet', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: String(query).includes('430'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    const surface = await screen.findByTestId('feed-post-share-surface')
    expect(surface.getAttribute('data-lab-share-surface')).toBe('sheet')
  })

  it('missing URL → D honesty copy', async () => {
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[1]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    const honesty = await screen.findByTestId('feed-post-share-unavailable')
    expect(honesty.textContent).toMatch(/Sharing is unavailable here/)
    expect(honesty.textContent).toMatch(/No public Issue link is available/)
    expect(screen.queryByTestId('feed-post-share-rows')).toBeNull()
  })

  it('Copy link → Link copied toast', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    await screen.findByTestId('feed-post-share-surface')
    fireEvent.click(screen.getByTestId('feed-post-share-row-copy'))
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(LAB_FEED_FIXTURES[0].publicIssueUrl)
    })
    const toast = await screen.findByTestId('feed-post-share-copied')
    expect(toast.textContent).toMatch(/Link copied/)
  })

  it('Close dismisses surface', async () => {
    render(<FeedPostCard fixture={LAB_FEED_FIXTURES[0]} />)
    fireEvent.click(screen.getByTestId('feed-post-action-share'))
    await screen.findByTestId('feed-post-share-surface')
    fireEvent.click(screen.getByTestId('feed-post-share-close'))
    await waitFor(() => {
      expect(screen.queryByTestId('feed-post-share-surface')).toBeNull()
    })
  })
})
