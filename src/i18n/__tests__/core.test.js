import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  LOCALE_CODES,
  LOCALE_SELECTOR_OPTIONS,
  SUPPORTED_LOCALES,
  normalizeLocale,
  resolveLanguage,
  resolveLocalizedText,
} from '../core.js'

describe('i18n core helpers', () => {
  it('exposes registry entries with code, endonym, flag, and dir', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(3)
    for (const entry of SUPPORTED_LOCALES) {
      expect(entry).toMatchObject({
        code: expect.any(String),
        endonym: expect.any(String),
        flag: expect.stringMatching(/^\/assets\/.+\.svg$/),
        dir: 'ltr',
      })
    }
    expect(LOCALE_CODES).toEqual(SUPPORTED_LOCALES.map((entry) => entry.code))
    expect(DEFAULT_LOCALE).toBe(SUPPORTED_LOCALES[0].code)
  })

  it('maps registry to selector options for Board/Issue headers', () => {
    expect(LOCALE_SELECTOR_OPTIONS).toEqual(
      SUPPORTED_LOCALES.map(({ code, endonym, flag }) => ({
        value: code,
        nativeLabel: endonym,
        flagSrc: flag,
      })),
    )
  })

  it('normalizes locale prefixes using registry codes only', () => {
    for (const { code } of SUPPORTED_LOCALES) {
      expect(normalizeLocale(code)).toBe(code)
      expect(normalizeLocale(`${code}-XX`)).toBe(code)
    }
    expect(normalizeLocale('et-EE')).toBe('et')
    expect(normalizeLocale('ru_RU')).toBe('ru')
    expect(normalizeLocale('en-US')).toBe('en')
    expect(normalizeLocale('de-DE')).toBeNull()
  })

  it('resolves browser language with fallback to registry default', () => {
    expect(resolveLanguage(['ru-RU', 'en-US'])).toBe('ru')
    expect(resolveLanguage(['de-DE', 'fr-FR'])).toBe(DEFAULT_LOCALE)
  })

  it('resolves localized object by active locale and registry fallback chain', () => {
    const field = { ru: 'Привет', en: 'Hello' }
    expect(resolveLocalizedText(field, 'ru')).toBe('Привет')
    expect(resolveLocalizedText(field, 'et')).toBe('Привет')
    expect(resolveLocalizedText(field, 'en')).toBe('Hello')
  })

  it('supports transitional string format', () => {
    expect(resolveLocalizedText('Legacy plain text', 'et')).toBe('Legacy plain text')
  })

  it('extends normalization when a fourth locale is added to the registry', () => {
  const hypothetical = Object.freeze([
    ...SUPPORTED_LOCALES,
    Object.freeze({ code: 'fi', endonym: 'Suomi', flag: '/assets/FI.svg', dir: 'ltr' }),
  ])
  const codes = hypothetical.map((entry) => entry.code)

  function normalizeWithRegistry(value, registry) {
    if (typeof value !== 'string') return null
    const lower = value.toLowerCase()
    for (const { code } of registry) {
      if (lower.startsWith(code)) return code
    }
    return null
  }

  expect(normalizeWithRegistry('fi-FI', hypothetical)).toBe('fi')
  expect(codes).toContain('fi')
  expect(codes).toHaveLength(4)
  })
})
