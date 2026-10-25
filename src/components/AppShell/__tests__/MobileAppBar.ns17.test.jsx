/**
 * @vitest-environment jsdom
 * NS-17 — Mobile AppBar brand + burger drawer (M177).
 */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MobileAppBar } from '../MobileAppBar.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function wrap(ui, initial = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initial]}>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('NS-17 MobileAppBar brand + drawer (M177)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
    document.body.style.overflow = ''
  })

  it('shows brand PNG instead of WIP title · lab markers', () => {
    wrap(<MobileAppBar leadingAction="menu" />)
    const bar = screen.getByTestId('mobile-app-bar')
    expect(bar.getAttribute('data-lab-ns17')).toBe('true')
    expect(bar.getAttribute('data-ns17-harmony')).toBe('m177')
    expect(screen.getByTestId('mobile-app-bar-brand')).toBeTruthy()
    expect(screen.queryByTestId('mobile-app-bar-title')).toBeNull()
    const logo = screen.getByTestId('mobile-app-bar-brand').querySelector('img')
    expect(logo?.getAttribute('src')).toMatch(/dogestonia-brand-(light|dark)\.png$/)
    expect(logo?.getAttribute('src')).not.toMatch(/logo-big/)
  })

  it('opens drawer with Account · Feed · My stories · static · Submit · no Wallet', () => {
    wrap(<MobileAppBar leadingAction="menu" />)
    fireEvent.click(screen.getByTestId('mobile-app-bar-leading'))
    expect(screen.getByTestId('mobile-app-bar-drawer')).toBeTruthy()
    expect(screen.getByTestId('mobile-drawer-nav-account').getAttribute('href')).toBe('/profile')
    expect(screen.getByTestId('mobile-drawer-nav-feed').getAttribute('href')).toBe('/next/feed')
    expect(screen.getByTestId('mobile-drawer-nav-my-stories').getAttribute('href')).toBe('/profile')
    expect(screen.getByTestId('mobile-drawer-nav-how-it-works').getAttribute('href')).toBe('/how-it-works')
    expect(screen.getByTestId('mobile-drawer-nav-about').getAttribute('href')).toBe('/about')
    expect(screen.getByTestId('mobile-drawer-nav-privacy').getAttribute('href')).toBe('/privacy')
    expect(screen.getByTestId('mobile-drawer-nav-contact').getAttribute('href')).toBe('/contact')
    expect(screen.getByTestId('mobile-drawer-cta-submit')).toBeTruthy()
    const drawerHtml = screen.getByTestId('mobile-app-bar-drawer').textContent || ''
    expect(drawerHtml).not.toMatch(/Wallet/i)
  })

  it('declares drawer width clamp and 44px targets in CSS', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/AppShell/MobileAppBar.css'), 'utf8')
    expect(css).toMatch(/min\(320px/)
    expect(css).toMatch(/min-height:\s*44px/)
    expect(css).toMatch(/NS-17/)
  })

  it('AppShell default header no longer references logo-big', () => {
    const src = readFileSync(resolve(process.cwd(), 'src/components/AppShell/AppShell.jsx'), 'utf8')
    expect(src).not.toMatch(/DOGEstonia-logo-big\.png/)
    expect(src).toMatch(/dogestonia-brand-dark\.png/)
  })
})
