/**
 * @vitest-environment jsdom
 * NF-25 — Filters popover UX redesign (M175): width · active dates · Apply/Reset hierarchy.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { FilterPanel } from '../FilterPanel.jsx'
import { DateRangeFilter } from '../DateRangeFilter.jsx'
import { LocalizedDateInput } from '../LocalizedDateInput.jsx'
import { ResetFiltersControl } from '../ResetFiltersControl.jsx'

const t = (key) => {
  const map = {
    resetFilters: 'Reset Filters',
    filterDateCreated: 'Created',
    filterDateFrom: 'From',
    filterDateTo: 'To',
    filterDatePlaceholder: 'Select date',
    filterApply: 'Apply',
  }
  return map[key] || key
}

describe('Filters NF-25 popover UX redesign (M175)', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/components/Filters/Filters.css'), 'utf8')

  it('marks panel body with nf25 / m175 lab attrs when open', () => {
    const html = renderToStaticMarkup(
      <FilterPanel open title="Filters" footer={<span>footer</span>}>
        <div>row</div>
      </FilterPanel>,
    )
    expect(html).toContain('data-lab-nf25="true"')
    expect(html).toContain('data-nf25-harmony="m175"')
  })

  it('declares usable width clamp and 44px date/action targets (M175)', () => {
    expect(css).toMatch(/NF-25[\s\S]*?min\(440px/)
    expect(css).toMatch(/\.board-filter-date-input-wrap[\s\S]*?min-height:\s*44px/)
    expect(css).toMatch(/\.board-filter-date-display[\s\S]*?min-height:\s*44px/)
    expect(css).toMatch(
      /\.board-filter-panel-footer[\s\S]*?justify-content:\s*space-between/,
    )
  })

  it('keeps date display on theme surface (not washed disabled opacity)', () => {
    expect(css).toMatch(
      /\.board-filter-date-display\s*\{[^}]*background:\s*var\(--color-bg-primary\)/,
    )
    const displayBlock = css.match(/\.board-filter-date-display\s*\{[^}]+\}/)?.[0] || ''
    expect(displayBlock).not.toMatch(/rgba\(0,\s*0,\s*0,\s*0\.2\)/)
    expect(displayBlock).not.toMatch(/opacity:\s*0\.[0-6]/)
  })

  it('preserves NF-21 color-scheme theme bind on native date', () => {
    expect(css).toMatch(
      /\[data-theme=['"]light['"]\]\s+\.board-filter-date-native[\s\S]*?color-scheme:\s*light/,
    )
    expect(css).toMatch(
      /\[data-theme=['"]dark['"]\]\s+\.board-filter-date-native[\s\S]*?color-scheme:\s*dark/,
    )
  })

  it('renders date active markers without disabled attr on enabled field', () => {
    const wrap = renderToStaticMarkup(
      <LocalizedDateInput value="" onChange={() => {}} t={t} ariaLabel="From" />,
    )
    expect(wrap).toContain('data-lab-nf25-date-active="true"')
    expect(wrap).not.toMatch(/disabled/)
    const panel = renderToStaticMarkup(
      <DateRangeFilter
        createdAfter=""
        createdBefore=""
        onChangeAfter={() => {}}
        onChangeBefore={() => {}}
        t={t}
        variant="panel"
      />,
    )
    expect(panel).toContain('data-lab-nf25-dates="true"')
  })

  it('footer order Reset then Apply (M175 hierarchy left→right)', () => {
    const html = renderToStaticMarkup(
      <FilterPanel
        open
        title="Filters"
        footer={
          <>
            <ResetFiltersControl hasActiveFilters={true} isDirty={false} onReset={() => {}} t={t} />
            <button type="button" className="board-filter-apply">
              Apply
            </button>
          </>
        }
      >
        <div>row</div>
      </FilterPanel>,
    )
    const footer = html.match(/board-filter-panel-footer[\s\S]*?<\/div><\/div>/)?.[0] || html
    const resetIdx = footer.indexOf('board-filter-reset')
    const applyIdx = footer.indexOf('board-filter-apply')
    expect(resetIdx).toBeGreaterThan(-1)
    expect(applyIdx).toBeGreaterThan(-1)
    expect(resetIdx).toBeLessThan(applyIdx)
  })
})
