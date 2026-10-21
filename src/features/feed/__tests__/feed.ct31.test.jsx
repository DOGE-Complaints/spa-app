/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { FeedThreadMount } from '../FeedThreadMount.jsx'

vi.mock('../../../auth/threadsAccessToken.js', () => ({
  getThreadsAccessToken: vi.fn(async () => 'feed-ct31-tok'),
}))

describe('CT-31 next/feed Live host · policy A auth wire', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('FeedThreadMount marks CT-31 · auth fetch paints published_url', async () => {
    const blob = new Blob([new Uint8Array([4, 5])], { type: 'image/png' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => blob,
    })
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:feed-ct31')

    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: ['image/png'] },
      }),
      getThreadTree: vi.fn().mockResolvedValue({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'c1',
              parent_id: null,
              depth: 0,
              body: 'With attach',
              attachments: [
                {
                  ref_id: 'a1',
                  media_type: 'image/png',
                  published_url: 'https://threads.example/live.png',
                },
              ],
            },
          ],
          thread_root_reactions: null,
        },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
      uploadAttachment: vi.fn(),
    }

    render(<FeedThreadMount issueId="ISSUE-CT31" client={client} profile={{ id: 'u1' }} />)

    const host = await screen.findByTestId('feed-thread-mount')
    expect(host.getAttribute('data-feed-ct31')).toBe('true')
    expect(host.getAttribute('data-feed-thread-host')).toBe('live')

    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attachments')?.getAttribute('data-lab-ct31')).toBe(
        'true',
      )
    })
    await waitFor(() => {
      const fig = screen.getByTestId('tm-comment-attach-a1')
      expect(fig.getAttribute('data-tm-attach-fetch')).toBe('ready')
      expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:feed-ct31')
    })
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://threads.example/live.png',
      expect.objectContaining({
        headers: { Authorization: 'Bearer feed-ct31-tok' },
      }),
    )
  })
})
