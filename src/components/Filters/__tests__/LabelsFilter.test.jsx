import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'
import { LabelsFilter } from '../LabelsFilter.jsx'

function makeT(locale = 'en') {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.en
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) {
      current = current?.[part]
    }
    return typeof current === 'string' ? current : key
  }
}

describe('LabelsFilter', () => {
  it('shows localized label in trigger when one label selected', () => {
    const html = renderToStaticMarkup(
      <LabelsFilter
        labels={['bureaucracy']}
        availableLabels={['bureaucracy', 'healthcare']}
        onChange={() => {}}
        t={makeT('en')}
      />,
    )
    expect(html).toContain('Bureaucracy')
    expect(html).not.toContain('BUREAUCRACY')
  })
})
