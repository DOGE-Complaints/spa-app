/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import {
  clampAttachmentIntents,
  canAddAttachment,
  DEFAULT_MAX_ATTACHMENTS,
  resolveMaxAttachments,
} from '../config/threadMountConfig.js'
import { createFixtureAttachmentIntent, THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-05 maxAttachments · AttachmentRef · clamp', () => {
  afterEach(() => cleanup())

  it('resolveMaxAttachments + clampAttachmentIntents use named config', () => {
    expect(DEFAULT_MAX_ATTACHMENTS).toBe(1)
    expect(resolveMaxAttachments(2)).toBe(2)
    expect(resolveMaxAttachments('x')).toBe(DEFAULT_MAX_ATTACHMENTS)
    const intents = [
      createFixtureAttachmentIntent('ready', 'image'),
      { ...createFixtureAttachmentIntent('ready', 'file'), id: 'fx-2' },
    ]
    expect(clampAttachmentIntents(intents, 1)).toHaveLength(1)
    expect(canAddAttachment(1, 1)).toBe(false)
    expect(canAddAttachment(0, 1)).toBe(true)
  })

  it('ready chip D · Remove · draft intact · not published', () => {
    const ready = createFixtureAttachmentIntent('ready', 'image')
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialAttachments={[ready]}
        maxAttachments={1}
      />,
    )
    const chip = screen.getByTestId(`tm-attachment-ref-${ready.id}`)
    expect(chip.getAttribute('data-tm-attach-status')).toBe('ready')
    expect(chip.getAttribute('data-tm-attach-published')).toBe('false')
    expect(screen.getByTestId('tm-attachment-ready').textContent).toMatch(/Ready to post/i)
    expect(screen.getByTestId('tm-attachment-local-intent').textContent).toMatch(/Local intent/i)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    fireEvent.click(screen.getByTestId(`tm-attachment-remove-${ready.id}`))
    expect(screen.queryByTestId(`tm-attachment-ref-${ready.id}`)).toBeNull()
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('denied chip E · draft intact · not ready styled', () => {
    const denied = createFixtureAttachmentIntent('denied', 'file')
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialAttachments={[denied]}
        maxAttachments={1}
      />,
    )
    expect(screen.getByTestId('tm-attachment-denied-title').textContent).toMatch(
      /can’t be added/i,
    )
    expect(screen.queryByTestId('tm-attachment-ready')).toBeNull()
    expect(screen.getByTestId(`tm-attachment-ref-${denied.id}`).className).toMatch(/denied/)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('Attach disabled at maxAttachments · changing max reclamps', () => {
    const ready = createFixtureAttachmentIntent('ready', 'image')
    const { rerender } = render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialAttachments={[ready]}
        maxAttachments={1}
      />,
    )
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-tm-attach-at-max')).toBe(
      'true',
    )
    expect(screen.getByTestId('tm-composer-attach').disabled).toBe(true)
    rerender(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialAttachments={[ready]}
        maxAttachments={0}
      />,
    )
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-max-attachments')).toBe('0')
    expect(screen.queryByTestId(`tm-attachment-ref-${ready.id}`)).toBeNull()
  })

  it('attachments unavailable omits Attach · honest copy · draft kept', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        attachmentsAvailable={false}
      />,
    )
    expect(screen.queryByTestId('tm-composer-attach')).toBeNull()
    expect(screen.getByTestId('tm-composer-attach-unavailable').textContent).toMatch(
      /unavailable here/i,
    )
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('Attach opens native picker · image File → ready intent when under max', () => {
    render(
      <ThreadMount
        status="empty"
        comments={[]}
        writeCapability="allowed"
        expanded
        initialDraft="x"
        maxAttachments={1}
      />,
    )
    expect(screen.getByTestId('tm-composer-file-input').getAttribute('type')).toBe('file')
    const file = new File(['x'], 'photo.png', { type: 'image/png' })
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [file] },
    })
    expect(screen.getByTestId('tm-composer-attachments').querySelectorAll('[data-tm-attach-status="ready"]')).toHaveLength(
      1,
    )
    expect(screen.getByTestId('tm-composer-attach').disabled).toBe(true)
  })
})
