import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ActiveFilterChips } from '../ActiveFilterChips.jsx'

describe('ActiveFilterChips', () => {
  it('renders removable chips', () => {
    const html = renderToStaticMarkup(
      <ActiveFilterChips
        chips={[
          {
            id: 'status:NEW',
            field: 'status',
            value: 'NEW',
            label: 'Status: NEW',
            removeAriaLabel: 'Clear Status NEW',
          },
        ]}
        onRemove={() => {}}
      />,
    )

    expect(html).toContain('board-filter-chip')
    expect(html).toContain('Status: NEW')
    expect(html).toContain('board-filter-chip-remove')
  })

  it('renders nothing when chips empty', () => {
    const html = renderToStaticMarkup(<ActiveFilterChips chips={[]} onRemove={() => {}} />)
    expect(html).toBe('')
  })
})
