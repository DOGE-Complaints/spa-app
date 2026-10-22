/** @vitest-environment jsdom */
/**
 * NS-08 — locale chevron icon + ES frozen tooltip · no invent OP PASS / ES dictionary
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import {
  FROZEN_LOCALE_SELECTOR_OPTIONS,
  LOCALE_CODES,
  LOCALE_SELECTOR_MENU_OPTIONS,
  LOCALE_SELECTOR_OPTIONS,
  normalizeLocale,
  SUPPORTED_LOCALES,
} from '../../../i18n/core.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { LocaleSelector } from '../LocaleSelector.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))
const src = readFileSync(path.resolve(dir, '../LocaleSelector.jsx'), 'utf8')

function wrap(ui) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

describe('NS-08 LocaleSelector chevron + ES frozen', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('T01 · trailing chevron is ShellChromeIcon mask · not literal v/^', () => {
    expect(src).not.toMatch(/trailingIcon=\{<\s*span[^>]*>\{isOpen \? ['"]\^['"] : ['"]v['"]\}/)
    expect(src).toMatch(/ShellChromeIcon/)
    expect(src).toMatch(/chevron-down\.svg/)
    wrap(<LocaleSelector variant="header" />)
    const chevron = screen.getByTestId('locale-selector-chevron')
    expect(chevron.getAttribute('data-ns07')).toBe('mask')
    expect(chevron.getAttribute('data-ns07-icon-src')).toBe('/icons/next-shell/actions/chevron-down.svg')
    expect(chevron.tagName).toBe('SPAN')
  })

  it('T02 · menu lists et/ru/en + frozen es · SUPPORTED_LOCALES unchanged', () => {
    expect(SUPPORTED_LOCALES.map((l) => l.code)).toEqual(['et', 'ru', 'en'])
    expect(LOCALE_CODES).toEqual(['et', 'ru', 'en'])
    expect(normalizeLocale('es')).toBeNull()
    expect(LOCALE_SELECTOR_OPTIONS.map((o) => o.value)).toEqual(['et', 'ru', 'en'])
    expect(FROZEN_LOCALE_SELECTOR_OPTIONS[0].value).toBe('es')
    expect(FROZEN_LOCALE_SELECTOR_OPTIONS[0].frozen).toBe(true)
    expect(LOCALE_SELECTOR_MENU_OPTIONS.map((o) => o.value)).toEqual(['et', 'ru', 'en', 'es'])

    wrap(<LocaleSelector variant="header" />)
    fireEvent.click(screen.getByTestId('locale-selector-trigger'))
    expect(screen.getByTestId('locale-option-et')).toBeTruthy()
    expect(screen.getByTestId('locale-option-ru')).toBeTruthy()
    expect(screen.getByTestId('locale-option-en')).toBeTruthy()
    const frozen = screen.getByTestId('locale-option-es-frozen')
    expect(frozen.disabled || frozen.getAttribute('aria-disabled') === 'true').toBe(true)
    expect(frozen.getAttribute('title')).toMatch(/Request this language|language/i)
  })

  it('T02 · frozen ES does not change active locale', () => {
    wrap(<LocaleSelector variant="header" />)
    fireEvent.click(screen.getByTestId('locale-selector-trigger'))
    fireEvent.click(screen.getByTestId('locale-option-es-frozen'))
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(screen.getByTestId('locale-selector-menu')).toBeTruthy()
  })
})
