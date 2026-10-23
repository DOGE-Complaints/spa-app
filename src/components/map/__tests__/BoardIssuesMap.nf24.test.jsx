/**
 * @vitest-environment jsdom
 * NF-24 — leaves sheet + pin popup + MapIssuePreview follow data-theme (no navy-only fill).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { MapIssuePreview } from '../../../features/feed/map/MapIssuePreview.jsx'

const boardCss = readFileSync(resolve(process.cwd(), 'src/components/map/BoardIssuesMap.css'), 'utf8')
const chromeCss = readFileSync(resolve(process.cwd(), 'src/features/feed/map/MapChrome.css'), 'utf8')

describe('NF-24 map sheet theme CSS', () => {
  it('binds leaves sheet background to theme tokens (no navy-only fill)', () => {
    const leavesBlock = boardCss.slice(
      boardCss.indexOf('.board-issues-map-leaves {'),
      boardCss.indexOf('.board-issues-map-leaves h3'),
    )
    expect(leavesBlock).toMatch(/background:\s*var\(--color-surface-elevated/)
    expect(leavesBlock).not.toMatch(/background:\s*rgba\(12,\s*18,\s*30/)
  })

  it('binds pin popup background to theme tokens (no navy-only fill)', () => {
    const popupBlock = boardCss.slice(
      boardCss.indexOf('.board-issues-map-popup {'),
      boardCss.indexOf('.board-issues-map-popup h3'),
    )
    expect(popupBlock).toMatch(/background:\s*var\(--color-surface-elevated/)
    expect(popupBlock).not.toMatch(/background:\s*rgba\(12,\s*18,\s*30/)
  })

  it('MapIssuePreview has no dark-only navy fallback', () => {
    const previewBlock = chromeCss.slice(
      chromeCss.indexOf('.map-issue-preview {'),
      chromeCss.indexOf('.map-issue-preview__title'),
    )
    expect(previewBlock).toMatch(/background:\s*var\(--color-surface-elevated/)
    expect(previewBlock).not.toMatch(/rgba\(12,\s*18,\s*30/)
  })
})

describe('NF-24 MapIssuePreview marker', () => {
  afterEach(() => {
    cleanup()
  })

  it('exposes data-nf24 on preview surface', () => {
    render(
      <MemoryRouter>
        <MapIssuePreview
          title="Sample"
          openHref="/next/feed/issue/1"
          openLabel="Open"
          onClose={() => {}}
        />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('map-issue-preview').getAttribute('data-nf24')).toBe('true')
  })
})
