import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import {
  HOW_IT_WORKS_FLAT_KEYS,
  HOW_IT_WORKS_EN,
  HOW_IT_WORKS_LANDING_FAQ_HREF,
} from '../../i18n/howItWorksDictionary.js'
import { HowItWorksPage } from '../HowItWorksPage.jsx'
import { AppShellLayout } from '../../layout/AppShellLayout.jsx'

vi.mock('../../auth/SessionShellContext.jsx', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSessionShell: () => ({
      shellState: 'logged_out',
      retry: () => {},
      profile: null,
    }),
    useOptionalSessionShell: () => null,
  }
})

const pageSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../HowItWorksPage.jsx'),
  'utf8',
)

const dictSource = readFileSync(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../i18n/howItWorksDictionary.js',
  ),
  'utf8',
)

const layoutSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../layout/AppShellLayout.jsx'),
  'utf8',
)

const localeStorage = new Map()

function renderPage(initialPath = '/how-it-works') {
  localeStorage.set(LOCALE_STORAGE_KEY, 'en')
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[initialPath]}>
      <I18nProvider>
        <Routes>
          <Route element={<AppShellLayout />}>
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Route>
        </Routes>
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('HowItWorksPage PH-05/PH-08/PH-13', () => {
  beforeEach(() => {
    localeStorage.clear()
    vi.stubGlobal('localStorage', {
      getItem: (key) => (localeStorage.has(key) ? localeStorage.get(key) : null),
      setItem: (key, value) => {
        localeStorage.set(key, value)
      },
      removeItem: (key) => {
        localeStorage.delete(key)
      },
    })
  })

  it('renders tutorial page shell with four steps (no stub)', () => {
    const html = renderPage()
    expect(html).toContain('data-testid="how-it-works-page"')
    expect(html).toContain('data-ph13="true"')
    expect(html).not.toContain('how-it-works-stub')
    expect(html.match(/data-testid="how-it-works-step"/g)?.length).toBe(4)
    expect(html).toContain('How It Works')
    expect(html).toContain('Understand Civic Issues')
    expect(html).toContain('Explore the Public Feed')
  })

  it('PH-13: feed CTAs → /next/feed · landing FAQ · no board hints', () => {
    expect(pageSource).toContain('href="/next/feed"')
    expect(pageSource).not.toContain('href="/board"')
    expect(pageSource).toContain('HOW_IT_WORKS_LANDING_FAQ_HREF')
    expect(pageSource).toContain('getStoryGptHref')
    expect(pageSource).toContain('howItWorks.cta.submitAccessibleLabel')
    expect(pageSource).toContain('ic-external-link.png')
    expect(pageSource).not.toMatch(/chatgpt\.com\/g\/g-RkVU9xLWN/i)
    expect(pageSource).not.toContain('inlineActionHint')
    expect(pageSource).not.toContain('dashboardHint')
    expect(dictSource).not.toMatch(/Opens\s*`?\/board/)
    expect(dictSource).not.toMatch(/Internal navigation to/)
    expect(HOW_IT_WORKS_EN.cta.feed).toBe('Go to Feed')
    expect(HOW_IT_WORKS_EN.cta.landing).toBe('Concept & FAQ on landing')
    expect(HOW_IT_WORKS_LANDING_FAQ_HREF).toContain(
      'uus-veerenni-civic.dogestonia.me/#how-it-works',
    )

    const html = renderPage()
    expect(html).toContain('data-testid="how-it-works-cta-feed"')
    expect(html).toContain('data-testid="how-it-works-inline-feed"')
    expect(html).toContain('data-testid="how-it-works-cta-landing"')
    expect(html).toContain('data-testid="how-it-works-cta-submit"')
    expect(html).toContain('Go to Feed')
    expect(html).toContain('Concept &amp; FAQ on landing')
    expect(html).toContain(HOW_IT_WORKS_LANDING_FAQ_HREF)
    expect(html).not.toMatch(/Opens\s*`?\/board/)
    expect(html).not.toContain('Go to Dashboard')
    expect(html).not.toContain('how-it-works-hint')
  })

  it('PH-13: compact step-head CSS (40×40 badge · 12 gap proposal)', () => {
    const css = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../HowItWorksPage.css'),
      'utf8',
    )
    expect(css).toMatch(/\.how-it-works-step-number\s*\{[^}]*width:\s*40px/s)
    expect(css).toMatch(/\.how-it-works-step-number\s*\{[^}]*height:\s*40px/s)
    expect(css).toMatch(/\.how-it-works-step-head\s*\{[^}]*gap:\s*12px/s)
    expect(pageSource).not.toContain('how-it-works-step-icon')
  })

  it('lists howItWorks.* flat keys for parity (no board-hint keys)', () => {
    expect(HOW_IT_WORKS_FLAT_KEYS.length).toBeGreaterThan(25)
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.feed')
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.landing')
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.submitAccessibleLabel')
    expect(HOW_IT_WORKS_FLAT_KEYS).not.toContain('howItWorks.cta.dashboardHint')
    expect(HOW_IT_WORKS_FLAT_KEYS).not.toContain(
      'howItWorks.steps.dashboard.inlineActionHint',
    )
  })

  it('PH-08 first-class shell classes; layout owns PUBLIC_SHELL_SHOW_SIDEBAR (REQ21-01)', () => {
    const html = renderPage()
    expect(html).toContain('how-it-works-shell')
    expect(html).toContain('how-it-works-route')
    expect(layoutSource).toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
    expect(pageSource).not.toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
    expect(pageSource).not.toMatch(/from ['"].*AppShell/)
    expect(html).toContain('data-testid="how-it-works-cta-feed"')
    expect(html).toContain('data-testid="how-it-works-cta-submit"')
  })

  it('PH-08 step CSS is not filled marketing cards', () => {
    const css = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../HowItWorksPage.css'),
      'utf8',
    )
    expect(css).toMatch(/\.how-it-works-step\s*\{[^}]*background:\s*transparent/s)
    expect(css).toMatch(/\.how-it-works-step\s*\{[^}]*border-bottom:/s)
    expect(css).not.toMatch(/\.how-it-works-step\s*\{[^}]*border-radius:\s*14px/s)
  })
})
