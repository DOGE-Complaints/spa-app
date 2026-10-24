/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import {
  ATTACH_NODE_LOADING_COPY,
  ATTACH_NODE_LOCAL_PREVIEW_COPY,
  ATTACH_NODE_UNAVAILABLE_COPY,
} from '../config/threadMountConfig.js'
import { createFixtureAttachmentIntent } from '../adapters/FixtureAdapter.js'
import { createLiveAdapter } from '../adapters/LiveAdapter.js'
import { CommentAttachmentPreview } from '../tree/CommentAttachmentPreview.jsx'
import { makeTinyPngFile } from '../../feed-lab/fixtures/labCt22Stands.js'

describe('CT-34 comment attach preview residual · image not text plate', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('T01 · local ready File · sync objectURL img · not sole Selected image plate', () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct34-local')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const file = makeTinyPngFile('ct34-local.png')
    render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'ct34-local',
            file,
            fileName: 'ct34-local.png',
          }),
        ]}
      />,
    )
    const fig = screen.getByTestId('tm-comment-attach-ct34-local')
    expect(fig.tagName.toLowerCase()).toBe('figure')
    expect(fig.getAttribute('data-lab-ct34')).toBe('true')
    expect(fig.getAttribute('data-tm-attach-local')).toBe('true')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:ct34-local')
    expect(screen.queryByText('Selected image')).toBeNull()
    expect(screen.getByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeTruthy()
    expect(createSpy).toHaveBeenCalled()
    expect(screen.getByTestId('tm-comment-attachments').getAttribute('data-lab-ct34')).toBe(
      'true',
    )
  })

  it('T02 · published + getAccessToken · auth blob img · not Selected image plate', async () => {
    const blob = new Blob([new Uint8Array([4])], { type: 'image/png' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => blob,
    })
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct34-pub')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    render(
      <CommentAttachmentPreview
        getAccessToken={async () => 'tok-ct34'}
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'ct34-pub',
            publishedUrl: 'https://threads.example/ct34.png',
            fileName: 'ct34.png',
          }),
        ]}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attach-ct34-pub').getAttribute('data-tm-attach-fetch')).toBe(
        'ready',
      )
    })
    const fig = screen.getByTestId('tm-comment-attach-ct34-pub')
    expect(fig.tagName.toLowerCase()).toBe('figure')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:ct34-pub')
    expect(screen.queryByText('Selected image')).toBeNull()
    expect(screen.queryByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeNull()
  })

  it('T02 · published auth loading + local File · img Present (not text plate)', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(() => {}))
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct34-interim')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const file = makeTinyPngFile('interim.png')
    render(
      <CommentAttachmentPreview
        getAccessToken={async () => 'tok'}
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'ct34-interim',
            publishedUrl: 'https://threads.example/pending.png',
            file,
          }),
        ]}
      />,
    )
    const fig = screen.getByTestId('tm-comment-attach-ct34-interim')
    expect(fig.tagName.toLowerCase()).toBe('figure')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:ct34-interim')
    expect(fig.getAttribute('data-tm-attach-fetch')).toBe('loading')
    expect(screen.getByText(ATTACH_NODE_LOADING_COPY)).toBeTruthy()
    expect(screen.queryByText('Selected image')).toBeNull()
  })

  it('T02 · Live post soft-fail upload · merge File → local img path (publishedUrl null)', async () => {
    const uploadAttachment = vi.fn().mockResolvedValue({
      status: 'fail',
      failKind: 'attach_denied',
      op: 'attach_upload',
    })
    const createComment = vi.fn().mockResolvedValue({
      status: 'ok',
      data: { comment_id: 'c-ct34' },
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
              comment_id: 'c-ct34',
              parent_id: null,
              depth: 0,
              body: 'xxx',
              attachments: [
                {
                  ref_id: 'r-ct34',
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
      issueId: 'ISSUE-CT34',
      client,
      profile: { identity_verified: true },
    })
    await adapter.load()
    const file = makeTinyPngFile('live-soft.png')
    const result = await adapter.postComment({
      body: 'xxx',
      attachments: [{ id: 'local-ct34', status: 'ready', file, kind: 'image' }],
    })
    expect(result.ok).toBe(true)
    const snap = adapter.snapshot()
    const att = snap.comments[0]?.attachments?.[0]
    expect(att?.publishedUrl).toBeNull()
    expect(att?.file).toBe(file)
  })

  it('T02 · Live post upload ok · merge published_url when tree null', async () => {
    const file = makeTinyPngFile('live-ok.png')
    const uploadAttachment = vi.fn().mockResolvedValue({
      status: 'ok',
      op: 'attach_upload',
      data: {
        ref_id: 'r-ok',
        media_type: 'image/png',
        published_url: 'https://threads.example/r-ok.png',
      },
    })
    const createComment = vi.fn().mockResolvedValue({
      status: 'ok',
      data: { comment_id: 'c-ok' },
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
              comment_id: 'c-ok',
              parent_id: null,
              depth: 0,
              body: 'ok',
              attachments: [
                {
                  ref_id: 'r-ok',
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
      issueId: 'ISSUE-CT34-OK',
      client,
      profile: { identity_verified: true },
    })
    await adapter.load()
    await adapter.postComment({
      body: 'ok',
      attachments: [{ id: 'local-ok', status: 'ready', file, kind: 'image' }],
    })
    const att = adapter.snapshot().comments[0]?.attachments?.[0]
    expect(att?.publishedUrl).toBe('https://threads.example/r-ok.png')
    expect(att?.file).toBe(file)
  })

  it('honesty · no File · no publishedUrl · text plate held (non-happy)', () => {
    render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'ct34-empty',
          }),
        ]}
      />,
    )
    expect(screen.getByText('Selected image')).toBeTruthy()
    expect(screen.getByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeTruthy()
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('T02 · auth deny without File · unavailable honesty (policy A)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      blob: async () => null,
    })
    render(
      <CommentAttachmentPreview
        getAccessToken={async () => 'tok'}
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'ct34-deny',
            publishedUrl: 'https://threads.example/deny.png',
          }),
        ]}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attach-ct34-deny').getAttribute('data-tm-attach-fetch')).toBe(
        'error',
      )
    })
    expect(screen.getByText(ATTACH_NODE_UNAVAILABLE_COPY)).toBeTruthy()
  })
})
