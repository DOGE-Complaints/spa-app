import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { HOW_IT_WORKS_FLAT_KEYS } from '../../i18n/howItWorksDictionary.js'
import { HowItWorksPage } from '../HowItWorksPage.jsx'

const pageSource = readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../HowItWorksPage.jsx'),
  'utf8',
)

const localeStorage = new Map()

function renderPage(initialPath = '/how-it-works') {
  localeStorage.set(LOCALE_STORAGE_KEY, 'en')
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[initialPath]}>
      <I18nProvider>
        <HowItWorksPage />
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('HowItWorksPage PH-05', () => {
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
    expect(html).not.toContain('how-it-works-stub')
    expect(html.match(/data-testid="how-it-works-step"/g)?.length).toBe(4)
    expect(html).toContain('How It Works')
    expect(html).toContain('Understand Civic Issues')
  })

  it('wires dashboard CTAs to /board and submit to env GPT pattern', () => {
    expect(pageSource).toContain("href=\"/board\"")
    expect(pageSource).toContain('VITE_STORY_GPT_URL')
    expect(pageSource).toContain('howItWorks.cta.submitAccessibleLabel')
    expect(pageSource).not.toMatch(/chatgpt\.com\/g\/g-RkVU9xLWN/i)
    const html = renderPage()
    expect(html).toContain('data-testid="how-it-works-cta-dashboard"')
    expect(html).toContain('data-testid="how-it-works-cta-submit"')
    expect(html).toContain('data-testid="how-it-works-inline-dashboard"')
  })

  it('uses catalog icon paths for steps', () => {
    expect(pageSource).toContain('/icons/story-handoff/ic-doc-new.png')
    expect(pageSource).toContain('/icons/story-handoff/ic-field-summary.png')
  })

  it('lists howItWorks.* flat keys for parity', () => {
    expect(HOW_IT_WORKS_FLAT_KEYS.length).toBeGreaterThan(30)
    expect(HOW_IT_WORKS_FLAT_KEYS).toContain('howItWorks.cta.submitAccessibleLabel')
  })
})
