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
  HOW_IT_WORKS_RU,
  HOW_IT_WORKS_ET,
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

describe('HowItWorksPage PH-14 (M171)', () => {
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

  it('renders four M171 steps with visuals · no GPT submit', () => {
    const html = renderPage()
    expect(html).toContain('data-testid="how-it-works-page"')
    expect(html).toContain('data-ph14="true"')
    expect(html).not.toContain('how-it-works-stub')
    expect(html.match(/data-testid="how-it-works-step"/g)?.length).toBe(4)
    expect(html).toContain('How It Works')
    expect(html).toContain('Notice what matters')
    expect(html).toContain('Tell your story to the Telegram bot')
    expect(html).toContain('data-testid="how-it-works-visual-observation"')
    expect(html).toContain('data-testid="how-it-works-cta-telegram"')
    expect(html).not.toContain('data-testid="how-it-works-cta-submit"')
    expect(pageSource).not.toMatch(/DOGEstonia GPT|getStoryGptHref/)
    expect(html).not.toContain('Understand Civic Issues')
  })

  it('PH-14: feed → /next/feed · landing FAQ · telegram helper · no board/GPT invent', () => {
    expect(pageSource).toContain('href="/next/feed"')
    expect(pageSource).not.toContain('href="/board"')
    expect(pageSource).toContain('HOW_IT_WORKS_LANDING_FAQ_HREF')
    expect(pageSource).toContain('getTelegramInterviewHref')
    expect(pageSource).not.toContain('getStoryGptHref')
    expect(pageSource).toContain('howItWorks.cta.telegramAccessibleLabel')
    expect(pageSource).toContain('ic-external-link.png')
    expect(pageSource).not.toMatch(/chatgpt\.com\/g\/g-RkVU9xLWN/i)
    expect(pageSource).not.toMatch(/t\.me\//i)
    expect(dictSource).not.toMatch(/Opens\s*`?\/board/)
    expect(HOW_IT_WORKS_EN.cta.feed).toBe('Go to Feed')
    expect(HOW_IT_WORKS_EN.cta.landing).toBe('Concept & FAQ on landing')
    expect(HOW_IT_WORKS_EN.cta.telegram).toBe('Start interview in Telegram')
    expect(HOW_IT_WORKS_LANDING_FAQ_HREF).toContain(
      'uus-veerenni-civic.dogestonia.me/#how-it-works',
    )

    const html = renderPage()
    expect(html).toContain('data-testid="how-it-works-cta-feed"')
    expect(html).toContain('data-testid="how-it-works-inline-feed"')
    expect(html).toContain('data-testid="how-it-works-cta-landing"')
    expect(html).toContain('data-testid="how-it-works-cta-row"')
    expect(html).toContain('how-it-works-cta-row--left')
    expect(html).toContain('Go to Feed')
    expect(html).toContain('Concept &amp; FAQ on landing')
    expect(html).toContain(HOW_IT_WORKS_LANDING_FAQ_HREF)
    expect(html).not.toMatch(/Opens\s*`?\/board/)
    expect(html).not.toContain('Go to Dashboard')
  })

  it('PH-14: RU step titles + seven body paragraphs match M171 §3 verbatim', () => {
    expect(HOW_IT_WORKS_RU.steps.observation.title).toBe('Заметьте то, что важно')
    expect(HOW_IT_WORKS_RU.steps.observation.body1).toContain('даже если пока трудно подобрать слова')
    expect(HOW_IT_WORKS_RU.steps.telegramStory.title).toBe(
      'Расскажите свою историю Telegram-боту',
    )
    expect(HOW_IT_WORKS_RU.steps.telegramStory.body2).toContain('останется приватной')
    expect(HOW_IT_WORKS_RU.steps.publicIssue.body2).toContain('сохраняя анонимность авторов')
    expect(HOW_IT_WORKS_RU.steps.profileDialogue.body2).toContain(
      'включиться в разговор о том, что с ней делать дальше',
    )
  })

  it('PH-14: EN steps match M171 §4 · ET is EN structural fill (no invent ET)', () => {
    expect(HOW_IT_WORKS_EN.steps.observation.title).toBe('Notice what matters')
    expect(HOW_IT_WORKS_EN.intro).toBe(
      'Your experience can help bring shared problems and ideas into view.',
    )
    expect(HOW_IT_WORKS_ET.steps.observation.title).toBe(
      HOW_IT_WORKS_EN.steps.observation.title,
    )
    expect(dictSource).toMatch(/no invent ET/)
  })

  it('PH-14: compact step-head CSS · left CTA row · step visuals', () => {
    const css = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../HowItWorksPage.css'),
      'utf8',
    )
    expect(css).toMatch(/\.how-it-works-step-number\s*\{[^}]*width:\s*40px/s)
    expect(css).toMatch(/\.how-it-works-step-number\s*\{[^}]*height:\s*40px/s)
    expect(css).toMatch(/\.how-it-works-step-head\s*\{[^}]*gap:\s*12px/s)
    expect(css).toMatch(/\.how-it-works-cta-row\s*\{[^}]*justify-content:\s*flex-start/s)
    expect(css).toMatch(/\.how-it-works-step-grid\s*\{/s)
    expect(pageSource).toContain('how-it-works-step-visual')
  })

  it('lists howItWorks.* flat keys for parity (M171 keys · no board hints)', () => {
    expect(HOW_IT_WORKS_FLAT_KEYS.length).toBeGreaterThan(20)
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.feed')
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.landing')
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.telegram')
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.steps.observation.body1')
    expect(HOW_IT_WORKS_FLAT_KEYS).not.toContain('howItWorks.cta.dashboardHint')
    expect(HOW_IT_WORKS_FLAT_KEYS).not.toContain('howItWorks.steps.civicIssues.title')
  })

  it('PH-08 first-class shell classes; layout owns PUBLIC_SHELL_SHOW_SIDEBAR', () => {
    const html = renderPage()
    expect(html).toContain('how-it-works-shell')
    expect(html).toContain('how-it-works-route')
    expect(layoutSource).toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
    expect(pageSource).not.toContain('PUBLIC_SHELL_SHOW_SIDEBAR')
    expect(pageSource).not.toMatch(/from ['"].*AppShell/)
    expect(html).toContain('data-testid="how-it-works-cta-feed"')
    expect(html).toContain('data-testid="how-it-works-cta-telegram"')
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
