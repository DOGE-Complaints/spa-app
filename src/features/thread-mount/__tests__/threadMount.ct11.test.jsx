/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import {
  ThreadComposer,
  TM_ATTACH_ICON_SRC,
  TM_SEND_ICON_SRC,
} from '../composer/ThreadComposer.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-11 composer icon chrome · attach/send reuse', () => {
  afterEach(() => cleanup())

  it('Attach shows paperclip icon from Present attach.svg', () => {
    render(
      <ThreadMount status="populated" writeCapability="allowed" comments={THREAD_NEST_COMMENTS} expanded  previewNodeBudget={99} />,
    )
    const attach = screen.getByTestId('tm-composer-attach')
    const icon = screen.getByTestId('tm-composer-attach-icon')
    expect(icon.getAttribute('src')).toBe(TM_ATTACH_ICON_SRC)
    expect(attach.getAttribute('aria-label')).toMatch(/Attach/i)
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-lab-ct11')).toBe('true')
  })

  it('empty/first-send path uses circular yellow send + send.svg', () => {
    render(<ThreadMount status="empty" writeCapability="allowed" comments={[]} expanded  previewNodeBudget={99} />)
    const composer = screen.getByTestId('tm-thread-composer')
    expect(composer.getAttribute('data-tm-send-chrome')).toBe('circle')
    const post = screen.getByTestId('tm-composer-post')
    expect(post.className).toMatch(/post--circle/)
    expect(screen.getByTestId('tm-composer-send-icon').getAttribute('src')).toBe(TM_SEND_ICON_SRC)
    expect(post.getAttribute('aria-label')).toMatch(/Post comment/i)
    expect(screen.queryByTestId('tm-composer-post-label')).toBeNull()
  })

  it('populated root Post keeps label + plane icon', () => {
    render(
      <ThreadMount status="populated" writeCapability="allowed" comments={THREAD_NEST_COMMENTS} expanded  previewNodeBudget={99} />,
    )
    const composer = screen.getByTestId('tm-thread-composer')
    expect(composer.getAttribute('data-tm-send-chrome')).toBe('labelled')
    expect(screen.getByTestId('tm-composer-post').className).toMatch(/post--labelled/)
    expect(screen.getByTestId('tm-composer-post-label').textContent).toMatch(/Post comment/i)
    expect(screen.getByTestId('tm-composer-send-icon').getAttribute('src')).toBe(TM_SEND_ICON_SRC)
  })

  it('reply Post reply labelled + plane · AttachmentRef path still works', () => {
    render(
      <ThreadMount
        status="populated"
        writeCapability="allowed"
        comments={THREAD_NEST_COMMENTS}
        expanded
        initialDraft="x"
        maxAttachments={2}
       previewNodeBudget={99} />,
    )
    const rootReply = screen
      .getByTestId('tm-comment-node-fx-a')
      .querySelector(':scope > .tm-comment-node__row [data-testid="tm-comment-reply"]')
    fireEvent.click(rootReply)
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-tm-composer-mode')).toBe(
      'reply',
    )
    expect(screen.getByTestId('tm-composer-post-label').textContent).toMatch(/Post reply/i)
    expect(screen.getByTestId('tm-composer-send-icon').getAttribute('src')).toBe(TM_SEND_ICON_SRC)
    const file = new File(['x'], 'photo.png', { type: 'image/png' })
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [file] },
    })
    expect(
      screen.getByTestId('tm-composer-attachments').querySelectorAll('[data-tm-attach-status="ready"]')
        .length,
    ).toBe(1)
  })

  it('ThreadComposer standalone exposes icon markers · no invent paths', () => {
    render(
      <ThreadComposer
        mode="root"
        draft="hi"
        attachmentsAvailable
        onFilesSelected={() => {}}
        onPost={() => {}}
      />,
    )
    expect(screen.getByTestId('tm-composer-attach-icon').getAttribute('src')).toContain(
      '/icons/next-feed/actions/attach.svg',
    )
    expect(screen.getByTestId('tm-composer-send-icon').getAttribute('src')).toContain(
      '/icons/next-feed/actions/send.svg',
    )
  })
})
