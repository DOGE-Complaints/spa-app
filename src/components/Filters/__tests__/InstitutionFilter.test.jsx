/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { InstitutionFilter } from '../InstitutionFilter.jsx'

const t = (key) => {
  const map = {
    filterInstitution: 'Institution',
    filterAny: 'Any',
    clear: 'Clear',
  }
  return map[key] ?? key
}

describe('InstitutionFilter', () => {
  it('is disabled when no institutions are available', () => {
    const html = renderToStaticMarkup(
      <InstitutionFilter
        institution=""
        availableInstitutions={[]}
        onChange={() => {}}
        formatInstitution={(value) => value}
        t={t}
        variant="panel"
      />,
    )

    expect(html).toContain('disabled')
  })

  it('shows selected institution label', () => {
    const html = renderToStaticMarkup(
      <InstitutionFilter
        institution="Haigekassa"
        availableInstitutions={['Haigekassa', 'Riigikantselei']}
        onChange={() => {}}
        formatInstitution={(value) => `Label:${value}`}
        t={t}
        variant="panel"
      />,
    )

    expect(html).toContain('Label:Haigekassa')
  })
})
