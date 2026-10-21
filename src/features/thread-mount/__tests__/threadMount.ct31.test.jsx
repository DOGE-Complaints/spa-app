/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import {
  ATTACH_NODE_LOADING_COPY,
  ATTACH_NODE_LOCAL_PREVIEW_COPY,
  ATTACH_NODE_UNAVAILABLE_COPY,
} from '../config/threadMountConfig.js'
import { createFixtureAttachmentIntent, createFixtureAdapter } from '../adapters/FixtureAdapter.js'
import { CommentAttachmentPreview } from '../tree/CommentAttachmentPreview.jsx'
import { fetchPublishedAttachmentObjectUrl } from '../attachments/fetchPublishedAttachmentObjectUrl.js'
import { ThreadMount } from '../ThreadMount.jsx'

describe('CT-31 policy A · auth fetch+blob→objectURL · Lab held', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('helper · Bearer fetch → blob → objectURL', async () => {
    const blob = new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' })
    const fetchImpl = vi.fn(async (_url, init) => {
      expect(init.headers.Authorization).toBe('Bearer tok-a')
      return {
        ok: true,
        status: 200,
        blob: async () => blob,
      }
    })
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct31-a')
    const result = await fetchPublishedAttachmentObjectUrl({
      url: 'https://threads.example/attach/1',
      getAccessToken: async () => 'tok-a',
      fetchImpl,
    })
    expect(result).toEqual({ ok: true, objectUrl: 'blob:ct31-a' })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(blob)
  })

  it('helper · 401 → honesty reason', async () => {
    const result = await fetchPublishedAttachmentObjectUrl({
      url: 'https://threads.example/attach/1',
      getAccessToken: async () => 'tok-a',
      fetchImpl: async () => ({ ok: false, status: 401, blob: async () => null }),
    })
    expect(result).toEqual({ ok: false, reason: 'http-401' })
  })

  it('preview · getAccessToken · publishedUrl paints objectURL · revoke on unmount', async () => {
    const blob = new Blob([new Uint8Array([9])], { type: 'image/png' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => blob,
    })
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct31-preview')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const getAccessToken = vi.fn(async () => 'live-tok')

    const { unmount } = render(
      <CommentAttachmentPreview
        getAccessToken={getAccessToken}
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'img-a',
            publishedUrl: 'https://threads.example/a.png',
            fileName: 'a.png',
          }),
        ]}
      />,
    )

    expect(screen.getByText(ATTACH_NODE_LOADING_COPY)).toBeTruthy()
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attach-img-a').getAttribute('data-tm-attach-fetch')).toBe(
        'ready',
      )
    })
    const fig = screen.getByTestId('tm-comment-attach-img-a')
    expect(fig.getAttribute('data-tm-attach-auth')).toBe('true')
    expect(fig.getAttribute('data-tm-attach-local')).toBe('false')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:ct31-preview')
    expect(screen.queryByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeNull()
    expect(getAccessToken).toHaveBeenCalled()
    expect(createSpy).toHaveBeenCalled()
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://threads.example/a.png',
      expect.objectContaining({
        headers: { Authorization: 'Bearer live-tok' },
      }),
    )
    unmount()
    expect(revokeSpy).toHaveBeenCalledWith('blob:ct31-preview')
  })

  it('preview · auth deny → unavailable honesty', async () => {
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
            id: 'img-deny',
            publishedUrl: 'https://threads.example/denied.png',
          }),
        ]}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attach-img-deny').getAttribute('data-tm-attach-fetch')).toBe(
        'error',
      )
    })
    expect(screen.getByText(ATTACH_NODE_UNAVAILABLE_COPY)).toBeTruthy()
  })

  it('without getAccessToken · publishedUrl bare src (Lab / CT-22 path)', () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL')
    render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'img-lab',
            publishedUrl: '/icons/next-feed/actions/reply.svg',
          }),
        ]}
      />,
    )
    const fig = screen.getByTestId('tm-comment-attach-img-lab')
    expect(fig.getAttribute('data-tm-attach-auth')).toBeNull()
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('/icons/next-feed/actions/reply.svg')
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('Lab FixtureAdapter · ThreadMount without getAccessToken · no auth markers', async () => {
    const adapter = createFixtureAdapter('populated')
    const snap = adapter.snapshot()
    render(
      <ThreadMount
        status={snap.status}
        comments={snap.comments}
        writeCapability={snap.writeCapability}
        expanded={true}
        commentWriteOwner="mount"
      />,
    )
    expect(screen.queryByTestId('tm-comment-attachments')?.getAttribute('data-lab-ct31')).toBeFalsy()
  })
})
