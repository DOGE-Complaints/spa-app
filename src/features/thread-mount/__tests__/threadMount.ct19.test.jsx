/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ThreadMount } from '../ThreadMount.jsx'
import { createFixtureAttachmentIntent, THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'
import {
  ATTACH_DENIED_SAFETY_DETAIL,
  ATTACH_DENIED_TYPE_HELPER,
  ATTACH_READY_STATUS_COPY,
} from '../config/threadMountConfig.js'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const css = readFileSync(path.resolve(dir, '../composer/AttachmentRef.css'), 'utf8')

describe('CT-19 AttachmentRef M153b §7 paint · M153a D/E copy', () => {
  afterEach(() => cleanup())

  it('CSS register · Ready/Denied · no green · M153b §7 literals', () => {
    expect(css).toMatch(/\.tm-attachment-ref--ready[\s\S]*background:\s*#fffdf8/i)
    expect(css).toMatch(/\.tm-attachment-ref--denied[\s\S]*background:\s*#f7f6f2/i)
    expect(css).toMatch(/\.tm-attachment-ref--denied[\s\S]*border-color:\s*#b54708/i)
    expect(css).toMatch(/\.tm-attachment-ref__ready[\s\S]*color:\s*#101828/)
    expect(css).toMatch(/\.tm-attachment-ref__denied-title[\s\S]*color:\s*#b54708/)
    expect(css).toMatch(/\.tm-attachment-ref__remove[\s\S]*color:\s*#b54708/)
    expect(css).toMatch(/border-radius:\s*12px/)
    expect(css).toMatch(/padding:\s*12px/)
    expect(css).not.toMatch(/#067647/)
    expect(css).not.toMatch(/#fff8f1/)
    expect(css).not.toMatch(/#f9dbaf/)
  })

  it('Ready chip · Ready to post · honesty · Remove accent path', () => {
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
    expect(chip.getAttribute('data-lab-ct19')).toBe('true')
    expect(chip.getAttribute('data-tm-attach-published')).toBe('false')
    expect(screen.getByTestId('tm-attachment-ready').textContent).toBe(ATTACH_READY_STATUS_COPY)
    expect(screen.getByTestId('tm-attachment-local-intent').textContent).toMatch(/Local intent/i)
    expect(screen.getByTestId(`tm-attachment-remove-${ready.id}`)).toBeTruthy()
  })

  it('D type Denied · allow-family helper · not safety sentence', () => {
    const denied = createFixtureAttachmentIntent('denied', 'file', { denyReason: 'type' })
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
    const chip = screen.getByTestId(`tm-attachment-ref-${denied.id}`)
    expect(chip.getAttribute('data-tm-attach-deny-reason')).toBe('type')
    expect(screen.getByTestId('tm-attachment-denied-title').textContent).toMatch(/can’t be added/i)
    expect(screen.getByTestId('tm-attachment-denied-detail').textContent).toBe(
      ATTACH_DENIED_TYPE_HELPER,
    )
    expect(screen.getByTestId('tm-attachment-denied-detail').textContent).not.toMatch(/safety/i)
  })

  it('E safety Denied · safety sentence only when known', () => {
    const denied = createFixtureAttachmentIntent('denied', 'file', { denyReason: 'safety' })
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
    expect(screen.getByTestId(`tm-attachment-ref-${denied.id}`).getAttribute('data-tm-attach-deny-reason')).toBe(
      'safety',
    )
    expect(screen.getByTestId('tm-attachment-denied-detail').textContent).toBe(
      ATTACH_DENIED_SAFETY_DETAIL,
    )
  })

  it('picker unknown type → denyReason type · draft intact', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
      />,
    )
    const file = new File(['bin'], 'blob.bin', { type: 'application/octet-stream' })
    fireEvent.change(screen.getByTestId('tm-composer-file-input'), {
      target: { files: [file] },
    })
    const chip = screen
      .getByTestId('tm-composer-attachments')
      .querySelector('[data-tm-attach-status="denied"]')
    expect(chip?.getAttribute('data-tm-attach-deny-reason')).toBe('type')
    expect(screen.getByTestId('tm-attachment-denied-detail').textContent).toBe(
      ATTACH_DENIED_TYPE_HELPER,
    )
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
  })
})
