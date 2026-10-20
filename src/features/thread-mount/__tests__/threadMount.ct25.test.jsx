/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { createFixtureAttachmentIntent, THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import { AttachmentRef } from '../composer/AttachmentRef.jsx'
import { middleEllipsisFileName } from '../composer/attachChipFilename.js'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const css = readFileSync(path.resolve(dir, '../composer/AttachmentRef.css'), 'utf8')

describe('CT-25 AttachmentRef fileName · 48×48 thumb · type cues', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('middle ellipsis preserves beginning + extension', () => {
    const full = 'neighbourhood-pet-care-notes.md'
    const vis = middleEllipsisFileName(full, 22)
    expect(vis).toMatch(/…/)
    expect(vis.endsWith('.md')).toBe(true)
    expect(vis.startsWith('neigh')).toBe(true)
    expect(vis).not.toBe(full)
    expect(middleEllipsisFileName('short.jpg')).toBe('short.jpg')
  })

  it('CSS keeps M153b/M153c paint · 48×48 thumb', () => {
    expect(css).toMatch(/\.tm-attachment-ref__thumb[\s\S]*width:\s*48px/)
    expect(css).toMatch(/\.tm-attachment-ref__thumb[\s\S]*height:\s*48px/)
    expect(css).toMatch(/\.tm-attachment-ref--ready[\s\S]*background:\s*#fffdf8/i)
    expect(css).toMatch(/\.tm-attachment-ref--denied[\s\S]*background:\s*#f7f6f2/i)
    expect(css).toMatch(/\.tm-attachment-ref--denied[\s\S]*border-color:\s*#b54708/i)
    expect(css).not.toMatch(/#067647/)
  })

  it('Ready image · fileName · 48×48 objectURL thumb · revoke on unmount', () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:ct25-img')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const file = new File([new Uint8Array([1, 2, 3])], 'courtyard-flowers.jpg', {
      type: 'image/jpeg',
    })
    const intent = createFixtureAttachmentIntent('ready', 'image', {
      fileName: 'courtyard-flowers.jpg',
      file,
    })
    const { unmount } = render(<AttachmentRef intent={intent} />)
    const chip = screen.getByTestId(`tm-attachment-ref-${intent.id}`)
    expect(chip.getAttribute('data-lab-ct25')).toBe('true')
    expect(chip.getAttribute('data-tm-attach-thumb')).toBe('true')
    expect(screen.getByTestId('tm-attachment-family').textContent).toBe('Image')
    expect(screen.getByTestId('tm-attachment-filename').getAttribute('title')).toBe(
      'courtyard-flowers.jpg',
    )
    expect(screen.getByTestId('tm-attachment-thumb').getAttribute('src')).toBe('blob:ct25-img')
    expect(createSpy).toHaveBeenCalled()
    unmount()
    expect(revokeSpy).toHaveBeenCalledWith('blob:ct25-img')
  })

  it('Ready markdown · MD cue + fileName (not family-only)', () => {
    const intent = createFixtureAttachmentIntent('ready', 'markdown', {
      fileName: 'pet-care-notes.md',
    })
    render(<AttachmentRef intent={intent} />)
    expect(screen.getByTestId('tm-attachment-type-cue').getAttribute('data-tm-attach-cue')).toBe(
      'MD',
    )
    expect(screen.getByTestId('tm-attachment-family').textContent).toBe('Markdown')
    expect(screen.getByTestId('tm-attachment-filename').textContent).toMatch(/pet-care-notes\.md/)
    expect(screen.queryByTestId('tm-attachment-thumb')).toBeNull()
  })

  it('Ready PDF · PDF cue + fileName', () => {
    const intent = createFixtureAttachmentIntent('ready', 'pdf', {
      fileName: 'neighbourhood-plan.pdf',
    })
    render(<AttachmentRef intent={intent} />)
    expect(screen.getByTestId('tm-attachment-type-cue').textContent).toBe('PDF')
    expect(screen.getByTestId('tm-attachment-filename').getAttribute('title')).toBe(
      'neighbourhood-plan.pdf',
    )
  })

  it('Denied with known fileName still shows name · paint held', () => {
    const intent = createFixtureAttachmentIntent('denied', 'file', {
      fileName: 'selected-file.bin',
      denyReason: 'type',
    })
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialAttachments={[intent]}
        maxAttachments={1}
        previewNodeBudget={99}
      />,
    )
    const chip = screen.getByTestId(`tm-attachment-ref-${intent.id}`)
    expect(within(chip).getByTestId('tm-attachment-filename').getAttribute('title')).toBe(
      'selected-file.bin',
    )
    expect(chip.className).toMatch(/tm-attachment-ref--denied/)
    expect(screen.getByTestId('tm-attachment-denied-title')).toBeTruthy()
  })

  it('image without File · IMG cue fallback (not empty ▣ alone)', () => {
    const intent = createFixtureAttachmentIntent('ready', 'image', {
      fileName: 'photo.jpg',
    })
    render(<AttachmentRef intent={intent} />)
    expect(screen.getByTestId('tm-attachment-type-cue').getAttribute('data-tm-attach-cue')).toBe(
      'IMG',
    )
    expect(screen.queryByTestId('tm-attachment-thumb')).toBeNull()
  })
})
