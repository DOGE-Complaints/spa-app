/**
 * @vitest-environment jsdom
 * SPA-ES-04 — Help CTA uses PH-06 env helper; no Offers.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { HelpCompleteBlock, HELP_ICONS } from '../HelpCompleteBlock.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../../../config/storyGptUrl.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

vi.mock('../../../config/storyGptUrl.js', () => ({
  getStoryGptHref: vi.fn(),
  hasStoryGptUrl: vi.fn(),
}))

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

function renderHelp() {
  return render(
    <I18nProvider>
      <MemoryRouter>
        <HelpCompleteBlock />
      </MemoryRouter>
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('HelpCompleteBlock PH-06 CTA', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    getStoryGptHref.mockReset()
    hasStoryGptUrl.mockReset()
  })

  it('uses helper href and catalog icons — no Offers or hardcoded GPT-id', () => {
    getStoryGptHref.mockReturnValue('https://example.test/gpt')
    hasStoryGptUrl.mockReturnValue(true)
    renderHelp()

    const cta = screen.getByTestId('help-complete-cta')
    expect(cta.getAttribute('href')).toBe('https://example.test/gpt')
    expect(screen.getByText('Submit a story')).toBeTruthy()
    expect(screen.getByText('Share a civic Story to strengthen what the network can see.')).toBeTruthy()
    expect(screen.queryByText(/Offer/i)).toBeNull()
    expect(screen.queryByText(/Voices/i)).toBeNull()
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(HELP_ICONS.mascot)
    expect(srcs).toContain(HELP_ICONS.share)
    expect(srcs).toContain(HELP_ICONS.together)
    expect(srcs).toContain(HELP_ICONS.see)
    expect(srcs).toContain(HELP_ICONS.external)
    expect(srcs).toContain(HELP_ICONS.chevron)
    expect(srcs).not.toContain(HELP_ICONS.lock)
  })

  it('calm # href + lock when env unset', () => {
    getStoryGptHref.mockReturnValue('#')
    hasStoryGptUrl.mockReturnValue(false)
    renderHelp()

    const href = screen.getByTestId('help-complete-cta').getAttribute('href')
    expect(href === '#' || href === '/').toBe(true)
    expect(href).not.toMatch(/chatgpt\.com/i)
    const srcs = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(srcs).toContain(HELP_ICONS.lock)
    expect(srcs).not.toContain(HELP_ICONS.external)
  })

  it('source uses getStoryGptHref / hasStoryGptUrl — no GPT-id fallback', () => {
    const src = readFileSync(path.join(root, 'components/earlySignal/HelpCompleteBlock.jsx'), 'utf8')
    expect(src).toContain('getStoryGptHref')
    expect(src).toContain('hasStoryGptUrl')
    expect(src).not.toMatch(/g-RkVU9xLWN|chatgpt\.com\/g\/g-/i)
    expect(src).not.toContain('VITE_STORY_GPT_URL')
  })
})
