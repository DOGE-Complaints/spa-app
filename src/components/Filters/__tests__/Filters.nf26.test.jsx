/**
 * @vitest-environment jsdom
 * NF-26 — Filters mobile scroll + body lock · NF-25 M175 held · no invent filter keys.
 */
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { FilterPanel } from '../FilterPanel.jsx'

describe('Filters NF-26 mobile scroll + body lock', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/components/Filters/Filters.css'), 'utf8')

  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    document.documentElement.removeAttribute('data-nf26-body-lock')
  })

  it('marks nf26 scroll-lock lab attrs and keeps nf25 / m175', () => {
    const html = renderToStaticMarkup(
      <FilterPanel open title="Filters" footer={<span>footer</span>}>
        <div>row</div>
      </FilterPanel>,
    )
    expect(html).toContain('data-lab-nf26="true"')
    expect(html).toContain('data-nf26-harmony="scroll-lock"')
    expect(html).toContain('data-lab-nf26-scroll="true"')
    expect(html).toContain('data-lab-nf25="true"')
    expect(html).toContain('data-nf25-harmony="m175"')
    expect(html).toContain('board-filter-panel-scroll')
  })

  it('declares scroll region + mobile clear of bottom nav (NF-26)', () => {
    expect(css).toMatch(/\.board-filter-panel-scroll[\s\S]*?overflow-y:\s*auto/)
    expect(css).toMatch(/\.board-filter-panel-scroll[\s\S]*?overscroll-behavior:\s*contain/)
    expect(css).toMatch(/\.board-filter-panel-scroll[\s\S]*?touch-action:\s*pan-y/)
    expect(css).toMatch(
      /@media\s*\(max-width:\s*768px\)[\s\S]*?bottom:\s*calc\(64px\s*\+\s*env\(safe-area-inset-bottom/,
    )
    expect(css).toMatch(/\.board-filter-panel-body[\s\S]*?z-index:\s*30/)
  })

  it('holds NF-25 M175 usable width clamp (no invent filter keys)', () => {
    expect(css).toMatch(/NF-25[\s\S]*?min\(440px/)
    expect(css).toMatch(/\.board-filter-panel-footer[\s\S]*?justify-content:\s*space-between/)
  })

  it('locks document body overflow while panel open and restores on close', () => {
    const { rerender } = render(
      <FilterPanel open title="Filters" onToggle={() => {}} footer={<span>f</span>}>
        <div>row</div>
      </FilterPanel>,
    )
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.touchAction).toBe('none')
    expect(document.documentElement.getAttribute('data-nf26-body-lock')).toBe('true')

    rerender(
      <FilterPanel open={false} title="Filters" onToggle={() => {}} footer={<span>f</span>}>
        <div>row</div>
      </FilterPanel>,
    )
    expect(document.body.style.overflow).not.toBe('hidden')
    expect(document.documentElement.getAttribute('data-nf26-body-lock')).toBeNull()
  })
})
