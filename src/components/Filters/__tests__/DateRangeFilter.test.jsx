/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DateRangeFilter } from '../DateRangeFilter.jsx'

const t = (key) => {
  const map = {
    filterDateCreated: 'Created date',
    filterDateFrom: 'From',
    filterDateTo: 'To',
    filterDatePlaceholder: 'dd.mm.yyyy',
  }
  return map[key] ?? key
}

describe('DateRangeFilter', () => {
  it('renders localized display inputs with placeholder and native date layer', () => {
    const html = renderToStaticMarkup(
      <DateRangeFilter
        createdAfter="2025-01-15"
        createdBefore="2025-02-01"
        onChangeAfter={() => {}}
        onChangeBefore={() => {}}
        t={t}
        locale="ru"
        variant="panel"
      />,
    )

    expect(html).toContain('board-filter-date-display')
    expect(html).toContain('board-filter-date-native')
    expect(html).toContain('lang="ru"')
    expect(html).toContain('placeholder="dd.mm.yyyy"')
    expect(html).toContain('type="date"')
    expect(html).toContain('value="2025-01-15"')
    expect(html).toContain('value="2025-02-01"')
  })
})
