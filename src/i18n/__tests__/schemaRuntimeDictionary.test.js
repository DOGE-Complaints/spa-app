import { describe, expect, it, vi } from 'vitest'
import {
  SCHEMA_RUNTIME_FLAT_KEYS,
  formatSchemaCardValue,
  hasSchemaCardOverlay,
  listSchemaCardEntries,
  resolveSchemaCardFieldLabel,
} from '../schemaRuntimeDictionary.js'
import { UI_DICTIONARY } from '../dictionaries.js'

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

describe('schemaRuntimeDictionary', () => {
  it('exposes MVP flat keys in et/ru/en', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const t = makeT(locale)
      for (const key of SCHEMA_RUNTIME_FLAT_KEYS) {
        expect(t(key)).not.toBe(key)
      }
    }
  })

  it('hasSchemaCardOverlay requires non-empty object', () => {
    expect(hasSchemaCardOverlay(undefined)).toBe(false)
    expect(hasSchemaCardOverlay({})).toBe(false)
    expect(hasSchemaCardOverlay({ 'signals.desired_outcome': 'fix' })).toBe(true)
  })

  it('resolveSchemaCardFieldLabel uses 1:1 glue; falls back to dotted-path', () => {
    const t = makeT('en')
    expect(resolveSchemaCardFieldLabel(t, 'signals.desired_outcome')).toBe('Desired outcome')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(resolveSchemaCardFieldLabel(t, 'signals.unknown_leaf')).toBe('signals.unknown_leaf')
    warn.mockRestore()
  })

  it('listSchemaCardEntries preserves gateway keys only', () => {
    const entries = listSchemaCardEntries({
      'signals.service_object': 'streetlamp',
      'signals.desired_outcome': 'fix lighting',
    })
    expect(entries.map((e) => e.path)).toEqual([
      'signals.service_object',
      'signals.desired_outcome',
    ])
    expect(formatSchemaCardValue(null)).toBe('—')
    expect(formatSchemaCardValue(1)).toBe('1')
  })
})
