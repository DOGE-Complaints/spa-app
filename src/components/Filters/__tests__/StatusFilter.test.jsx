import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { StatusFilter } from '../StatusFilter.jsx'

const t = (key) => {
  const map = {
    filterStatus: 'Status',
    filterAny: 'Any',
    clear: 'Clear',
    'status.NEW': 'NEW',
    'status.PUBLISHED': 'PUBLISHED',
  }
  return map[key] ?? key
}

describe('StatusFilter', () => {
  it('renders trigger with Status label and Any when empty', () => {
    const html = renderToStaticMarkup(
      <StatusFilter status={[]} onChange={() => {}} locale="en" t={t} />,
    )
    expect(html).toContain('Status')
    expect(html).toContain('Any')
    expect(html).toContain('board-filter-trigger')
  })

  it('renders selected status in value when status is set', () => {
    const html = renderToStaticMarkup(
      <StatusFilter status={['NEW']} onChange={() => {}} locale="en" t={t} />,
    )
    expect(html).toContain('NEW')
  })
})
