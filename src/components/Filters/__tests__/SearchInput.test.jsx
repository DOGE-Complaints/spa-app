import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { SearchInput } from '../SearchInput.jsx'

describe('SearchInput', () => {
  it('renders search input with icon, placeholder and controlled value', () => {
    const html = renderToStaticMarkup(
      <SearchInput
        value="bridge"
        onChange={() => {}}
        placeholder="Search issues…"
        ariaLabel="Search issues"
      />,
    )

    expect(html).toContain('class="board-search-input-wrap"')
    expect(html).toContain('class="board-search-icon"')
    expect(html).toContain('type="search"')
    expect(html).toContain('class="board-search-input"')
    expect(html).toContain('value="bridge"')
    expect(html).toContain('placeholder="Search issues…"')
    expect(html).toContain('aria-label="Search issues"')
  })

  it('invokes onChange with next value', () => {
    let next = 'initial'
    const onChange = (value) => {
      next = value
    }
    onChange('pension')
    expect(next).toBe('pension')
    renderToStaticMarkup(
      <SearchInput value="" onChange={onChange} placeholder="Search" ariaLabel="Search" />,
    )
  })
})
