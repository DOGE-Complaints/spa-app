import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ListMapToggle } from '../ListMapToggle.jsx'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'

function makeT(locale = 'en') {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.en
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) current = current?.[part]
    return typeof current === 'string' ? current : key
  }
}

describe('ListMapToggle', () => {
  it('renders List and Map text labels; Map disabled when ineligible', () => {
    const html = renderToStaticMarkup(
      <ListMapToggle view="list" onChange={() => {}} mapEligible={false} t={makeT('en')} />,
    )
    expect(html).toContain('data-testid="list-map-toggle"')
    expect(html).toContain('List')
    expect(html).toContain('Map')
    expect(html).toContain('disabled')
    expect(html).toContain('board-map-ineligible')
    expect(html).toContain('ic-view-list.png')
    expect(html).toContain('ic-view-map.png')
  })

  it('enables Map when eligible and omits ineligible helper', () => {
    const html = renderToStaticMarkup(
      <ListMapToggle view="map" onChange={() => {}} mapEligible t={makeT('en')} />,
    )
    expect(html).not.toContain('board-map-ineligible')
    expect(html).toContain('aria-pressed="true"')
  })
})
