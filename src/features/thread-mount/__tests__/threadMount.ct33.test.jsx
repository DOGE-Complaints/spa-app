/** @vitest-environment jsdom */
/**
 * CT-33 — composer / attach dark residual · theme tokens · no invent OP PASS
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ThreadComposer } from '../composer/ThreadComposer.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const composerCss = readFileSync(path.resolve(dir, '../composer/ThreadComposer.css'), 'utf8')
const attachCss = readFileSync(path.resolve(dir, '../composer/AttachmentRef.css'), 'utf8')
const previewCss = readFileSync(path.resolve(dir, '../tree/CommentAttachmentPreview.css'), 'utf8')

describe('CT-33 composer dark residual', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('T01 · textarea uses theme surface + primary text (no fixed #fff Done)', () => {
    expect(composerCss).toMatch(
      /\.tm-thread-composer__textarea[\s\S]*?background:\s*var\(--color-surface-elevated/i,
    )
    expect(composerCss).toMatch(
      /\.tm-thread-composer__textarea[\s\S]*?color:\s*var\(--color-text-primary/i,
    )
    expect(composerCss).not.toMatch(
      /\.tm-thread-composer__textarea[\s\S]*?background:\s*#fff\s*;/i,
    )
  })

  it('T02 · AttachmentRef / preview plates theme-safe (no sole #fffdf8 Done)', () => {
    expect(attachCss).toMatch(/background:\s*var\(--color-surface-elevated/i)
    expect(attachCss).not.toMatch(/^\s*background:\s*#fffdf8\s*;/m)
    expect(previewCss).toMatch(/background:\s*var\(--color-surface-elevated/i)
    expect(previewCss).not.toMatch(/^\s*background:\s*#fffdf8\s*;/m)
  })

  it('T03 · Post label uses on-primary ink (dark text on accent)', () => {
    expect(composerCss).toMatch(
      /\.tm-thread-composer__post[\s\S]*?color:\s*var\(--color-btn-on-primary/i,
    )
  })

  it('T04 · Attach control ShellChromeIcon mask + primary color · light held', () => {
    expect(composerCss).toMatch(
      /\.tm-thread-composer__attach[\s\S]*?color:\s*var\(--color-text-primary/i,
    )
    render(
      <ThreadComposer
        draft=""
        onDraftChange={() => {}}
        attachmentsAvailable
        onFilesSelected={() => {}}
      />,
    )
    const icon = screen.getByTestId('tm-composer-attach-icon')
    expect(icon.getAttribute('data-ns07')).toBe('mask')
    expect(icon.getAttribute('data-ns07-icon-src')).toMatch(/attach\.svg/)
    expect(composerCss).toMatch(/--color-surface-elevated|#fff/)
  })
})
