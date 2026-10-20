/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import {
  ATTACHMENT_FAMILY_ALLOWLIST,
  ATTACHMENT_MIME_TABLE_TBD,
  buildAttachmentIntentFromPick,
  inferAttachmentFamily,
} from '../config/threadMountConfig.js'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-17 native picker · family hook · no synthetic seed', () => {
  afterEach(() => cleanup())

  it('family allow-list hook Present · MIME table TBD null (fail-closed)', () => {
    expect([...ATTACHMENT_FAMILY_ALLOWLIST]).toEqual([
      'images',
      'pdf',
      'office',
      'markdown',
    ])
    expect(ATTACHMENT_MIME_TABLE_TBD).toBeNull()
    expect(inferAttachmentFamily({ type: 'image/png' })).toBe('images')
    expect(inferAttachmentFamily({ type: 'application/pdf' })).toBe('unknown')
    expect(inferAttachmentFamily({ type: 'application/octet-stream' })).toBe('unknown')
  })

  it('A: zero chips on first paint · native file input Present', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
       previewNodeBudget={99} />,
    )
    expect(screen.queryByTestId('tm-composer-attachments')).toBeNull()
    const input = screen.getByTestId('tm-composer-file-input')
    expect(input.getAttribute('type')).toBe('file')
    expect(input.getAttribute('data-tm-native-picker')).toBe('true')
    expect(screen.getByTestId('tm-composer-attach')).toBeTruthy()
  })

  it('no synthetic Ready on Attach click alone · Cancel/empty FileList unchanged', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
       previewNodeBudget={99} />,
    )
    fireEvent.click(screen.getByTestId('tm-composer-attach'))
    expect(screen.queryByTestId('tm-composer-attachments')).toBeNull()
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [] },
    })
    expect(screen.queryByTestId('tm-composer-attachments')).toBeNull()
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('image pick → local Ready · origin picker · not published · Remove local-only', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        maxAttachments={1}
       previewNodeBudget={99} />,
    )
    const file = new File(['img'], 'shot.png', { type: 'image/png' })
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [file] },
    })
    const ready = screen
      .getByTestId('tm-composer-attachments')
      .querySelector('[data-tm-attach-status="ready"]')
    expect(ready).toBeTruthy()
    expect(ready.getAttribute('data-tm-attach-published')).toBe('false')
    expect(screen.getByTestId('tm-attachment-local-intent').textContent).toMatch(/Local intent/i)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    const id = ready.getAttribute('data-testid').replace('tm-attachment-ref-', '')
    expect(id.startsWith('pick-attach-')).toBe(true)
    fireEvent.click(screen.getByTestId(`tm-attachment-remove-${id}`))
    expect(screen.queryByTestId('tm-composer-attachments')).toBeNull()
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })

  it('unknown type → Denied fail-closed · draft intact · no invent MIME accept', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
       previewNodeBudget={99} />,
    )
    const file = new File(['bin'], 'blob.bin', { type: 'application/octet-stream' })
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [file] },
    })
    expect(
      screen
        .getByTestId('tm-composer-attachments')
        .querySelectorAll('[data-tm-attach-status="denied"]').length,
    ).toBe(1)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    const intent = buildAttachmentIntentFromPick(file, { id: 't' })
    expect(intent.status).toBe('denied')
    expect(intent.family).toBe('unknown')
    expect(intent.origin).toBe('picker')
  })

  it('F: attachmentsAvailable=false omits Attach + file input · no fake Denied', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        attachmentsAvailable={false}
       previewNodeBudget={99} />,
    )
    expect(screen.queryByTestId('tm-composer-attach')).toBeNull()
    expect(screen.queryByTestId('tm-composer-file-input')).toBeNull()
    expect(screen.queryByTestId('tm-composer-attachments')).toBeNull()
    expect(screen.getByTestId('tm-composer-attach-unavailable').textContent).toMatch(
      /unavailable here/i,
    )
  })
})
