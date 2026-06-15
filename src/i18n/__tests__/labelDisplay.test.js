import { describe, expect, it } from 'vitest'
import { UI_DICTIONARY } from '../dictionaries.js'
import { AVAILABLE_LABELS } from '../labelKeys.js'
import { formatLabelKey, humanizeLabelSlug } from '../labelDisplay.js'

function makeT(locale) {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.et
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) {
      current = current?.[part]
    }
    return typeof current === 'string' ? current : key
  }
}

describe('labelDisplay', () => {
  it('humanizes slug with underscores', () => {
    expect(humanizeLabelSlug('road_safety')).toBe('Road Safety')
  })

  it('resolves labels.* from dictionary for et/ru/en', () => {
    expect(formatLabelKey(makeT('et'), 'bureaucracy')).toBe('Bürokraatia')
    expect(formatLabelKey(makeT('ru'), 'bureaucracy')).toBe('Бюрократия')
    expect(formatLabelKey(makeT('en'), 'bureaucracy')).toBe('Bureaucracy')
  })

  it('falls back to humanize when dictionary miss', () => {
    expect(formatLabelKey(makeT('en'), 'road_safety')).toBe('Road Safety')
  })

  it('resolves every AVAILABLE_LABELS key in et/ru/en (dictionary completeness guard)', () => {
    const locales = ['et', 'ru', 'en']
    for (const locale of locales) {
      const t = makeT(locale)
      for (const key of AVAILABLE_LABELS) {
        const dictKey = `labels.${key}`
        expect(t(dictKey), `${locale}:${key} missing in UI_DICTIONARY`).not.toBe(dictKey)
        expect(formatLabelKey(t, key), `${locale}:${key} should use dictionary`).toBe(t(dictKey))
      }
    }
  })
})
