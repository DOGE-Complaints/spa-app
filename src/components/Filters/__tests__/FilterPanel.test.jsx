import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { FilterPanel } from '../FilterPanel.jsx'
import { ResetFiltersControl } from '../ResetFiltersControl.jsx'

const t = (key) => key

describe('FilterPanel', () => {
  it('renders Apply and Reset in footer when open', () => {
    const html = renderToStaticMarkup(
      <FilterPanel
        open={true}
        onToggle={() => {}}
        title="Filters"
        footer={
          <>
            <button type="button" className="board-filter-apply">
              Apply
            </button>
            <ResetFiltersControl hasActiveFilters={true} onReset={() => {}} t={t} />
          </>
        }
      >
        <div>controls</div>
      </FilterPanel>,
    )

    expect(html).toContain('board-filter-apply')
    expect(html).toContain('Apply')
    expect(html).toContain('board-filter-reset')
    expect(html).toContain('data-slot="institution"')
    expect(html).toContain('data-slot="date"')
    expect(html).toContain('data-slot="geo"')
  })
})
