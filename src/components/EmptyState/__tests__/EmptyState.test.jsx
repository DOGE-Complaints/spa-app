import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { EmptyState } from '../EmptyState.jsx'

describe('EmptyState', () => {
  it('renders message and icon', () => {
    const html = renderToStaticMarkup(<EmptyState message="No issues recorded." />)
    expect(html).toContain('No issues recorded.')
    expect(html).toContain('empty-state')
    expect(html).toContain('favicon.svg')
  })

  it('does not render CTA', () => {
    const html = renderToStaticMarkup(<EmptyState message="Empty" />)
    expect(html).not.toContain('button')
    expect(html).not.toContain('href=')
  })
})
