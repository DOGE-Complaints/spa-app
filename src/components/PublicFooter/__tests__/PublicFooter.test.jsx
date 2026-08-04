/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PublicFooter } from '../PublicFooter.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import {
  PUBLIC_HOME_DICTIONARY_BY_LOCALE,
  PUBLIC_HOME_FLAT_KEYS,
} from '../../../i18n/publicHomeDictionary.js'

function renderFooter() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <PublicFooter />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('PublicFooter (PH-03)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
  })

  it('renders brand, TAGLINE_TBD, and About/Privacy/Contact links', () => {
    renderFooter()
    expect(screen.getByTestId('public-footer')).toBeTruthy()
    expect(screen.getByTestId('public-footer-brand').textContent).toContain('DOGEstonia')
    expect(screen.getByTestId('public-footer-tagline').textContent).toBe('[TAGLINE_TBD]')
    expect(screen.getByTestId('public-footer-about').textContent).toBe('About')
    expect(screen.getByTestId('public-footer-privacy').textContent).toBe('Privacy')
    expect(screen.getByTestId('public-footer-contact').textContent).toBe('Contact')
  })

  it('uses hash placeholders for utility links (no CMS routes yet)', () => {
    renderFooter()
    expect(screen.getByTestId('public-footer-about').getAttribute('href')).toBe('#about')
    expect(screen.getByTestId('public-footer-privacy').getAttribute('href')).toBe('#privacy')
    expect(screen.getByTestId('public-footer-contact').getAttribute('href')).toBe('#contact')
  })

  it('does not render social icon clusters', () => {
    const { container } = renderFooter()
    expect(container.querySelectorAll('img[src*="social"], a[aria-label*="Twitter"], a[aria-label*="Instagram"]').length).toBe(0)
    expect(container.querySelectorAll('[data-testid^="public-footer-social"]').length).toBe(0)
  })

  it('keeps TAGLINE_TBD in et and ru', () => {
    for (const locale of ['et', 'ru']) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      cleanup()
      renderFooter()
      expect(screen.getByTestId('public-footer-tagline').textContent).toBe('[TAGLINE_TBD]')
    }
  })
})

describe('publicHome.footer key parity', () => {
  const footerKeys = PUBLIC_HOME_FLAT_KEYS.filter((key) => key.startsWith('publicHome.footer.'))

  it('lists five footer FLAT_KEYS', () => {
    expect(footerKeys).toEqual([
      'publicHome.footer.brand',
      'publicHome.footer.tagline',
      'publicHome.footer.about',
      'publicHome.footer.privacy',
      'publicHome.footer.contact',
    ])
  })

  it('has matching tagline TBD across locales', () => {
    for (const locale of ['en', 'et', 'ru']) {
      expect(PUBLIC_HOME_DICTIONARY_BY_LOCALE[locale].publicHome.footer.tagline).toBe('[TAGLINE_TBD]')
      expect(PUBLIC_HOME_DICTIONARY_BY_LOCALE[locale].publicHome.footer.brand).toBe('DOGEstonia')
    }
  })
})
