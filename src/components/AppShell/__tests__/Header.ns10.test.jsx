/**
 * @vitest-environment jsdom
 * NS-10 band CSS held · brand src supersede NS-15 tip PNG dual.
 */
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { Header } from '../Header.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

const LIGHT_SRC = '/assets/dogestonia-brand-light.png'
const DARK_SRC = '/assets/dogestonia-brand-dark.png'

function renderHeader(initialPath = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<Header accountSlot={null} />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('Public Header NS-10 brand logo light/scale', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
    document.documentElement.removeAttribute('data-theme')
  })

  it('wires light tip PNG brand and home /next/feed (NS-15 supersede)', () => {
    renderHeader()
    const brand = screen.getByTestId('public-header-brand')
    expect(brand.getAttribute('href')).toBe('/next/feed')
    expect(brand.getAttribute('data-ns10')).toBe('brand')
    const logo = brand.querySelector('img.header-brand-logo')
    expect(logo?.getAttribute('src')).toBe(LIGHT_SRC)
    expect(logo?.getAttribute('data-ns10-logo')).toBe('light')
    expect(logo?.getAttribute('src')).not.toMatch(/DOGEstonia-logo-horizontal\.png$/)
  })

  it('switches to dark tip PNG on continuous dark theme', async () => {
    renderHeader()
    document.documentElement.setAttribute('data-theme', 'dark')
    await waitFor(() => {
      const logo = screen.getByTestId('public-header-brand').querySelector('img.header-brand-logo')
      expect(logo?.getAttribute('src')).toBe(DARK_SRC)
      expect(logo?.getAttribute('data-ns10-logo')).toBe('dark')
    })
  })

  it('keeps ~44px brand band CSS and tip PNG masters Present', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/AppShell/Header.css'), 'utf8')
    expect(css).toMatch(/\.public-header\s+\.header-brand-logo[\s\S]*height:\s*44px/)
    expect(css).toMatch(/background:\s*transparent/)
    for (const name of ['dogestonia-brand-light.png', 'dogestonia-brand-dark.png']) {
      expect(existsSync(resolve(process.cwd(), 'public/assets', name))).toBe(true)
    }
  })
})
