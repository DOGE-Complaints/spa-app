import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResetFiltersControl } from '../ResetFiltersControl.jsx'

const t = (key) => (key === 'resetFilters' ? 'Reset Filters' : key)

describe('ResetFiltersControl', () => {
  it('renders Reset Filters button', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} onReset={() => {}} t={t} />,
    )
    expect(html).toContain('Reset Filters')
    expect(html).toContain('ds-btn--link')
    expect(html).toContain('board-filter-reset')
  })

  it('includes disabled attribute when neither dirty nor active', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} isDirty={false} onReset={() => {}} t={t} />,
    )
    expect(html).toContain('disabled')
  })

  it('does not include disabled when has active filters', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={true} isDirty={false} onReset={() => {}} t={t} />,
    )
    expect(html).not.toContain('disabled')
  })

  it('does not include disabled when panel is dirty only', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} isDirty={true} onReset={() => {}} t={t} />,
    )
    expect(html).not.toContain('disabled')
  })
})
