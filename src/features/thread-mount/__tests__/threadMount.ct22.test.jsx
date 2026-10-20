/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import {
  ATTACHMENT_FAMILY_ALLOWLIST,
  ATTACH_NODE_LOCAL_PREVIEW_COPY,
  buildAttachmentIntentFromPick,
  inferAttachmentFamily,
  readyAttachmentIntents,
} from '../config/threadMountConfig.js'
import { createFixtureAdapter, createFixtureAttachmentIntent } from '../adapters/FixtureAdapter.js'
import { CommentAttachmentPreview } from '../tree/CommentAttachmentPreview.jsx'
import { makeTinyPngFile } from '../../feed-lab/fixtures/labCt22Stands.js'

describe('CT-22 comment attachment preview · md family · local if no URL', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('markdown family on allow-list · .md extension allowed', () => {
    expect(ATTACHMENT_FAMILY_ALLOWLIST).toContain('markdown')
    expect(inferAttachmentFamily({ name: 'notes.md', type: '' })).toBe('markdown')
    expect(inferAttachmentFamily({ name: 'x.MD', type: 'text/plain' })).toBe('markdown')
    const md = new File(['# hi'], 'readme.md', { type: 'text/markdown' })
    const intent = buildAttachmentIntentFromPick(md, { id: 'md-1' })
    expect(intent.status).toBe('ready')
    expect(intent.kind).toBe('markdown')
    expect(intent.file).toBe(md)
  })

  it('readyAttachmentIntents drops Denied', () => {
    const list = [
      createFixtureAttachmentIntent('denied', 'file', { id: 'd1' }),
      createFixtureAttachmentIntent('ready', 'markdown', { id: 'r1' }),
    ]
    expect(readyAttachmentIntents(list).map((a) => a.id)).toEqual(['r1'])
  })

  it('image local preview · objectURL + honesty · revoke on unmount', async () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct22-test')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const file = makeTinyPngFile()
    const { unmount } = render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'img-local',
            file,
          }),
        ]}
      />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('tm-comment-attach-img-local')).toBeTruthy()
    })
    const fig = screen.getByTestId('tm-comment-attach-img-local')
    expect(fig.getAttribute('data-tm-attach-local')).toBe('true')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe('blob:ct22-test')
    expect(screen.getByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeTruthy()
    expect(createSpy).toHaveBeenCalled()
    unmount()
    expect(revokeSpy).toHaveBeenCalledWith('blob:ct22-test')
  })

  it('publishedUrl skips objectURL · no local honesty', () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL')
    render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('ready', 'image', {
            id: 'img-pub',
            publishedUrl: '/icons/next-feed/actions/reply.svg',
          }),
        ]}
      />,
    )
    const fig = screen.getByTestId('tm-comment-attach-img-pub')
    expect(fig.getAttribute('data-tm-attach-local')).toBe('false')
    expect(fig.querySelector('img')?.getAttribute('src')).toBe(
      '/icons/next-feed/actions/reply.svg',
    )
    expect(screen.queryByText(ATTACH_NODE_LOCAL_PREVIEW_COPY)).toBeNull()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('non-image markdown cue Present · Denied absent from node', () => {
    render(
      <CommentAttachmentPreview
        attachments={[
          createFixtureAttachmentIntent('denied', 'file', { id: 'nope' }),
          createFixtureAttachmentIntent('ready', 'markdown', {
            id: 'md-cue',
            fileName: 'notes.md',
          }),
        ]}
      />,
    )
    expect(screen.getByTestId('tm-comment-attach-md-cue').getAttribute('data-tm-attach-kind')).toBe(
      'markdown',
    )
    expect(screen.queryByTestId('tm-comment-attach-nope')).toBeNull()
  })

  it('post persists ready intents onto comment · Denied stay composer-side only', async () => {
    const adapter = createFixtureAdapter('empty')
    const file = makeTinyPngFile()
    const { container } = render(
      <ThreadMount
        status="empty"
        comments={[]}
        writeCapability="allowed"
        expanded={true}
        onPostComment={(p) => adapter.postComment(p)}
        commentWriteOwner="mount"
      />,
    )
    const input = container.querySelector('input[type="file"]')
    expect(input).toBeTruthy()
    fireEvent.change(input, { target: { files: [file] } })
    await waitFor(() => {
      expect(screen.getByTestId(/tm-attachment-ref-/)).toBeTruthy()
    })
    const ta = screen.getByRole('textbox')
    fireEvent.change(ta, { target: { value: 'Posted with image' } })
    fireEvent.click(screen.getByRole('button', { name: /post/i }))
    await waitFor(() => {
      expect(screen.getByText('Posted with image')).toBeTruthy()
    })
    expect(screen.getByTestId('tm-comment-attachments')).toBeTruthy()
    const snap = adapter.snapshot()
    const last = snap.comments[snap.comments.length - 1]
    expect(last.attachments?.length).toBe(1)
    expect(last.attachments[0].status).toBe('ready')
    expect(last.attachments[0].kind).toBe('image')
  })
})
