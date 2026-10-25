/**
 * @vitest-environment jsdom
 * NS-19 — Mobile bottom nav density + frozen Wallet (M179).
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { MobileBottomNav } from '../MobileBottomNav.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function wrap(ui, initial = '/next/feed') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initial]}>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('NS-19 MobileBottomNav density + frozen Wallet (M179)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('marks lab harmony m179 · three equal slots · Feed Profile live · Wallet frozen', () => {
    wrap(<MobileBottomNav />)
    const nav = screen.getByTestId('mobile-bottom-nav')
    expect(nav.getAttribute('data-lab-ns19')).toBe('true')
    expect(nav.getAttribute('data-ns19-harmony')).toBe('m179')
    expect(nav.getAttribute('data-ns19-cab08')).toBe('held')

    const feed = screen.getByTestId('mobile-bottom-nav-board')
    const profile = screen.getByTestId('mobile-bottom-nav-profile')
    const wallet = screen.getByTestId('mobile-bottom-nav-wallet')

    expect(feed.getAttribute('href')).toBe('/next/feed')
    expect(profile.getAttribute('href')).toBe('/profile')
    expect(wallet.getAttribute('href')).toBeNull()
    expect(wallet.getAttribute('data-ns19-wallet')).toBe('frozen')
    expect(wallet.getAttribute('aria-disabled')).toBe('true')
    expect(wallet.className).toMatch(/frozen/)
  })

  it('reuses cabinet Wallet / comingSoon copy · no invent Wallet route', () => {
    wrap(<MobileBottomNav />)
    const wallet = screen.getByTestId('mobile-bottom-nav-wallet')
    expect(wallet.textContent).toMatch(/Wallet/i)
    expect(wallet.getAttribute('aria-label')).toMatch(/coming soon/i)
    expect(wallet.tagName.toLowerCase()).not.toBe('a')
  })

  it('declares compact CSS · ≥44 tap · soft doge glyph path', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/AppShell/MobileBottomNav.css'), 'utf8')
    expect(css).toMatch(/NS-19/)
    expect(css).toMatch(/min-height:\s*52px/)
    expect(css).toMatch(/min-height:\s*44px/)
    expect(css).toMatch(/min-width:\s*44px/)
    expect(css).toMatch(/item--frozen/)

    const glyph = resolve(process.cwd(), 'public/icons/next-shell/navigation/wallet-doge.svg')
    expect(existsSync(glyph)).toBe(true)
    const svg = readFileSync(glyph, 'utf8')
    expect(svg).toMatch(/<svg/)
    expect(svg).not.toMatch(/<image/)
  })

  it('Feed active route emphasis class when on feed', () => {
    wrap(<MobileBottomNav />, '/next/feed')
    expect(screen.getByTestId('mobile-bottom-nav-board').className).toMatch(/--active/)
    expect(screen.getByTestId('mobile-bottom-nav-wallet').className).not.toMatch(/--active/)
  })
})
