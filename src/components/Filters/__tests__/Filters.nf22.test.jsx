/**
 * @vitest-environment jsdom
 * NF-22 — Reset Filters actionable when dirty∨active · pointer when enabled.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResetFiltersControl } from '../ResetFiltersControl.jsx'

const t = (key) => (key === 'resetFilters' ? 'Reset Filters' : key)

describe('Filters NF-22 reset actionable', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/components/Filters/Filters.css'), 'utf8')

  it('enables when dirty or active and disables only when neither', () => {
    const clean = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} isDirty={false} onReset={() => {}} t={t} />,
    )
    const dirtyOnly = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} isDirty={true} onReset={() => {}} t={t} />,
    )
    const activeOnly = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={true} isDirty={false} onReset={() => {}} t={t} />,
    )
    expect(clean).toContain('disabled')
    expect(dirtyOnly).not.toContain('disabled')
    expect(activeOnly).not.toContain('disabled')
  })

  it('declares pointer cursor for actionable board-filter-reset', () => {
    expect(css).toMatch(
      /\.board-filter-reset\.ds-btn:not\(:disabled\):not\(\[aria-disabled=['"]true['"]\]\)[\s\S]*?cursor:\s*pointer/,
    )
    expect(css).toMatch(/NF-22|pointer whenever Reset is actionable/i)
  })
})
