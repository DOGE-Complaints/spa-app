/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle.jsx'
import { Header } from '../../AppShell/Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import {
  THEME_STORAGE_KEY,
  applyDefaultTheme,
  getDocumentTheme,
  setThemeAttribute,
} from '../../../theme/bootTheme.js'

function renderToggle() {
  return renderToStaticMarkup(
    <I18nProvider>
      <ThemeToggle />
    </I18nProvider>,
  )
}

function renderHeader() {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route path="*" element={<Header accountSlot={null} />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('REQ21-04 ThemeToggle + Header slot', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
    localStorage.clear()
    applyDefaultTheme(document)
  })

  it('renders ThemeToggle with a11y attrs (AC-03)', () => {
    const html = renderToggle()
    expect(html).toContain('data-testid="public-header-theme-toggle"')
    expect(html).toContain('aria-pressed=')
    expect(html).toContain('aria-label=')
  })

  it('Header mounts ThemeToggle after locale slot order (AC-01)', () => {
    const html = renderHeader()
    expect(html).toContain('data-testid="public-header-theme-toggle"')
    const localeIdx = html.indexOf('header-locale')
    const themeIdx = html.indexOf('public-header-theme-toggle')
    const accountIdx = html.indexOf('header-account-slot')
    expect(localeIdx).toBeGreaterThan(-1)
    expect(themeIdx).toBeGreaterThan(localeIdx)
    expect(accountIdx).toBeGreaterThan(themeIdx)
  })

  it('persist toggle survives applyDefaultTheme reload (AC-02)', () => {
    setThemeAttribute('light', document, { persist: true })
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    document.documentElement.removeAttribute('data-theme')
    expect(applyDefaultTheme(document)).toBe('light')
    expect(getDocumentTheme()).toBe('light')
  })
})
