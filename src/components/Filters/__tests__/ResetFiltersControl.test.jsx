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
  })

  it('includes disabled attribute when no active filters', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={false} onReset={() => {}} t={t} />,
    )
    expect(html).toContain('disabled')
  })

  it('does not include disabled when has active filters', () => {
    const html = renderToStaticMarkup(
      <ResetFiltersControl hasActiveFilters={true} onReset={() => {}} t={t} />,
    )
    expect(html).not.toContain('disabled')
  })
})
