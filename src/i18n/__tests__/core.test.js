import { describe, expect, it } from 'vitest'
import { normalizeLocale, resolveLanguage, resolveLocalizedText } from '../core.js'

describe('i18n core helpers', () => {
  it('normalizes locale prefixes to supported set', () => {
    expect(normalizeLocale('et-EE')).toBe('et')
    expect(normalizeLocale('ru_RU')).toBe('ru')
    expect(normalizeLocale('en-US')).toBe('en')
  })

  it('resolves browser language with fallback to et', () => {
    expect(resolveLanguage(['ru-RU', 'en-US'])).toBe('ru')
    expect(resolveLanguage(['de-DE', 'fr-FR'])).toBe('et')
  })

  it('resolves localized object by active locale and fallback chain', () => {
    const field = { ru: 'Привет', en: 'Hello' }
    expect(resolveLocalizedText(field, 'ru')).toBe('Привет')
    expect(resolveLocalizedText(field, 'et')).toBe('Привет')
  })

  it('supports transitional string format', () => {
    expect(resolveLocalizedText('Legacy plain text', 'et')).toBe('Legacy plain text')
  })
})
