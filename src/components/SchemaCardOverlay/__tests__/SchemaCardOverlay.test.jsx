import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { SchemaCardOverlay } from '../SchemaCardOverlay.jsx'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'

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

describe('SchemaCardOverlay', () => {
  beforeEach(() => {
    vi.stubGlobal('import', { meta: { env: { DEV: false } } })
  })

  it('renders nothing when schema_card absent or empty', () => {
    expect(renderToStaticMarkup(<SchemaCardOverlay t={makeT()} />)).toBe('')
    expect(renderToStaticMarkup(<SchemaCardOverlay schemaCard={{}} t={makeT()} />)).toBe('')
  })

  it('renders Additional details rows for non-empty schema_card', () => {
    const html = renderToStaticMarkup(
      <SchemaCardOverlay
        density="compact"
        t={makeT('en')}
        schemaCard={{
          'signals.desired_outcome': 'fix lighting',
          'signals.affected_group': 'residents',
        }}
      />,
    )
    expect(html).toContain('data-testid="schema-card-overlay"')
    expect(html).toContain('Additional details')
    expect(html).toContain('Desired outcome')
    expect(html).toContain('fix lighting')
    expect(html).toContain('Affected group')
    expect(html).not.toContain('structured_payload')
  })

  it('does not invent keys beyond schema_card object', () => {
    const html = renderToStaticMarkup(
      <SchemaCardOverlay
        t={makeT()}
        schemaCard={{ 'signals.service_object': 'streetlamp' }}
      />,
    )
    expect(html).toContain('Service object')
    expect(html).not.toContain('Desired outcome')
  })

  it('compact collapse@4 shows schema-card-overlay-more when leaves > 4', () => {
    const schemaCard = {
      'signals.desired_outcome': 'a',
      'signals.affected_group': 'b',
      'signals.service_object': 'c',
      'signals.urgency': 'd',
      'signals.location_hint': 'e',
    }
    const html = renderToStaticMarkup(
      <SchemaCardOverlay density="compact" t={makeT('en')} schemaCard={schemaCard} />,
    )
    expect(html).toContain('data-testid="schema-card-overlay-more"')
    expect(html).toContain('Show more details')
  })

  it('compact ≤4 leaves omits schema-card-overlay-more', () => {
    const html = renderToStaticMarkup(
      <SchemaCardOverlay
        density="compact"
        t={makeT('en')}
        schemaCard={{
          'signals.desired_outcome': 'a',
          'signals.affected_group': 'b',
          'signals.service_object': 'c',
          'signals.urgency': 'd',
        }}
      />,
    )
    expect(html).not.toContain('schema-card-overlay-more')
  })
})
