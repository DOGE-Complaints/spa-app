/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { FeedThreadMount } from '../FeedThreadMount.jsx'
import { createLiveAdapter } from '../../thread-mount/adapters/LiveAdapter.js'

describe('CT-30 Live attach upload + tree map', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('postComment → uploadAttachment per Ready File · soft-fail attach · reload', async () => {
    const uploadAttachment = vi.fn().mockResolvedValue({
      status: 'fail',
      failKind: 'attach_denied',
      op: 'attach_upload',
    })
    const createComment = vi.fn().mockResolvedValue({
      status: 'ok',
      data: { comment_id: 'c-new' },
      op: 'comment_create',
    })
    const getThreadTree = vi
      .fn()
      .mockResolvedValueOnce({
        status: 'ok',
        data: { comments: [], thread_root_reactions: null },
      })
      .mockResolvedValueOnce({
        status: 'ok',
        data: {
          comments: [
            {
              comment_id: 'c-new',
              parent_id: null,
              depth: 0,
              body: 'hello',
              attachments: [
                {
                  ref_id: 'r1',
                  media_type: 'image/png',
                  published_url: null,
                },
              ],
            },
          ],
          thread_root_reactions: null,
        },
      })
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: ['image/png'] },
      }),
      getThreadTree,
      createComment,
      replyComment: vi.fn(),
      uploadAttachment,
    }
    const adapter = createLiveAdapter({
      issueId: 'ISSUE-CT30',
      client,
      profile: { identity_verified: true },
    })
    await adapter.load()
    const file = new File(['img'], 'shot.png', { type: 'image/png' })
    const result = await adapter.postComment({
      body: 'hello',
      attachments: [{ id: 'local-1', status: 'ready', file, kind: 'image' }],
    })
    expect(result.ok).toBe(true)
    expect(createComment).toHaveBeenCalled()
    expect(uploadAttachment).toHaveBeenCalledWith(
      expect.objectContaining({
        issueId: 'ISSUE-CT30',
        commentId: 'c-new',
        file,
        mediaType: 'image/png',
      }),
    )
    const snap = adapter.snapshot()
    expect(snap.status).toBe('populated')
    expect(snap.comments[0].attachments?.[0].publishedUrl).toBeNull()
    /* CT-34 · File merge after soft-fail so node can objectURL-preview */
    expect(snap.comments[0].attachments?.[0].file).toBe(file)
  })

  it('FeedThreadMount marks CT-30 host · ThreadMount Present', async () => {
    const client = {
      getKnobs: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { max_depth: 2, media_allowed_types: [] },
      }),
      getThreadTree: vi.fn().mockResolvedValue({
        status: 'ok',
        data: { comments: [], thread_root_reactions: null },
      }),
      createComment: vi.fn(),
      replyComment: vi.fn(),
      uploadAttachment: vi.fn(),
    }
    render(<FeedThreadMount issueId="ISSUE-CT30" client={client} profile={null} />)
    await waitFor(() => {
      expect(screen.getByTestId('feed-thread-mount').getAttribute('data-feed-ct30')).toBe('true')
    })
    expect(screen.getByTestId('tm-thread-mount')).toBeTruthy()
    expect(screen.queryByTestId('feed-discussion-block')).toBeNull()
  })
})
