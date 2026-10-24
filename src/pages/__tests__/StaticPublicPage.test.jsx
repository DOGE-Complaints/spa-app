/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { AboutPage, ContactPage, PrivacyPage } from '../StaticPublicPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import {
  STATIC_PAGES_DOCS,
  STATIC_PAGES_LINKS,
  STATIC_PAGES_RU,
  STATIC_PAGES_EN,
} from '../../i18n/staticPagesDictionary.js'

const pageSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../StaticPublicPage.jsx'),
  'utf8',
)

const cssSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../StaticPublicPage.css'),
  'utf8',
)

function renderAt(pathName) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[pathName]}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('StaticPublicPage PH-15 (M172)', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
  })

  it('About: M172 sections · no pending stub', () => {
    renderAt('/about')
    expect(screen.getByTestId('public-static-about')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('About DOGEstonia')
    expect(screen.queryByTestId('public-static-about-pending')).toBeNull()
    expect(screen.getByTestId('public-static-about-local')).toBeTruthy()
    expect(screen.getByTestId('public-static-about-dogeos').getAttribute('href')).toBe(
      STATIC_PAGES_LINKS.dogeos,
    )
    expect(pageSource).not.toMatch(/OP to supply|placeholder/i)
  })

  it('Privacy: three PDF cards · no invent legal body', () => {
    renderAt('/privacy')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Privacy')
    expect(screen.getByTestId('public-static-privacy-docs')).toBeTruthy()
    expect(screen.getByTestId('public-static-privacy-download-privacy').getAttribute('href')).toBe(
      STATIC_PAGES_DOCS.privacy.href,
    )
    expect(screen.getByTestId('public-static-privacy-download-terms').getAttribute('href')).toBe(
      STATIC_PAGES_DOCS.terms.href,
    )
    expect(
      screen.getByTestId('public-static-privacy-download-participation').getAttribute('href'),
    ).toBe(STATIC_PAGES_DOCS.participation.href)
    expect(screen.getByText('Privacy Notice')).toBeTruthy()
    expect(screen.getAllByText('Download PDF').length).toBe(3)
    expect(screen.queryByTestId('public-static-privacy-pending')).toBeNull()
    expect(pageSource).not.toMatch(/\bGDPR\b/)
  })

  it('Contact: outline + direct links · no form POST invent', () => {
    renderAt('/contact')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Contact')
    expect(screen.getByTestId('public-static-contact-site').getAttribute('href')).toBe(
      STATIC_PAGES_LINKS.site,
    )
    expect(screen.getByTestId('public-static-contact-telegram').getAttribute('href')).toBe(
      STATIC_PAGES_LINKS.telegram,
    )
    expect(screen.getByTestId('public-static-contact-email').getAttribute('href')).toBe(
      STATIC_PAGES_LINKS.email,
    )
    expect(screen.getByTestId('public-static-contact-story-hint')).toBeTruthy()
    expect(pageSource).not.toMatch(/\bonSubmit\b|\bfetch\s*\(|method=["']post["']/i)
    expect(pageSource).not.toContain('<form')
  })

  it('PH-17: Privacy dark icon CSS · Contact story CTA via storyGpt helper', () => {
    expect(cssSource).toMatch(
      /\[data-theme=['"]dark['"]\][\s\S]*\.public-static-privacy-card__icon[\s\S]*filter:\s*invert\(1\)/,
    )
    expect(cssSource).toMatch(
      /\[data-theme=['"]dark['"]\][\s\S]*\.public-static-privacy-card__dl-icon/,
    )
    expect(pageSource).toContain('getStoryGptHref')
    expect(pageSource).toContain('publicHome.nav.submitStory')
    expect(pageSource).toContain('howItWorks.cta.submitAccessibleLabel')
    expect(pageSource).not.toMatch(/chatgpt\.com\/g\/g-RkVU9xLWN/i)

    renderAt('/privacy')
    expect(screen.getByTestId('public-static-page').getAttribute('data-ph17')).toBe(
      'privacy-icons',
    )
    expect(screen.getAllByTestId(/^public-static-privacy-card-/).length).toBe(3)

    cleanup()
    vi.stubEnv('VITE_STORY_GPT_URL', 'https://example.test/gpt-contact')
    renderAt('/contact')
    expect(screen.getByTestId('public-static-page').getAttribute('data-ph17')).toBe(
      'contact-cta',
    )
    const cta = screen.getByTestId('public-static-contact-story-cta')
    expect(cta).toBeTruthy()
    expect(cta.getAttribute('href')).toBeTruthy()
    expect(cta.textContent).toMatch(/Submit a story/i)
    expect(screen.getByTestId('public-static-contact-story-hint')).toBeTruthy()
    vi.unstubAllEnvs()
  })

  it('RU About title + Web3 rewards sentence verbatim (M172)', () => {
    expect(STATIC_PAGES_RU.about.title).toBe('О DOGEstonia')
    expect(STATIC_PAGES_RU.about.rewards.p2).toBe(
      'Для этого мы и планируем использовать технологии Web3 — как инструменты для прозрачного учёта и совместных правил.',
    )
    expect(STATIC_PAGES_EN.privacy.downloads.downloadCta).toBe('Download PDF')
  })
})
