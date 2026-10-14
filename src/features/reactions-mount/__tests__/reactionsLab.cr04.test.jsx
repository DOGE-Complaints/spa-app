/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ReactionsLabCanvas, CrReactionIcon, CR_OMIT_SELECTABLE_IDS } from '../index.js'
import { THREADS_FEED_DICTIONARY_BY_LOCALE } from '../../../i18n/threadsFeedDictionary.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CR-04 L10N + theme stress', () => {
  afterEach(() => {
    cleanup()
    document.documentElement.removeAttribute('data-theme')
  })

  it('exposes M160 stress controls: locale × theme × 320 × 200%', () => {
    render(<ReactionsLabCanvas />)
    const canvas = screen.getByTestId('reactions-lab-canvas')
    expect(canvas.getAttribute('data-lab-stress')).toBe('m160')
    expect(canvas.getAttribute('data-rm-adapter-default')).toBe('fixture')
    expect(screen.getByTestId('rm-lab-stress-controls')).toBeTruthy()

    fireEvent.click(screen.getByTestId('rm-lab-locale-et'))
    expect(canvas.getAttribute('data-lab-locale')).toBe('et')
    expect(screen.getByTestId('rm-lab-title').textContent).toMatch(/Reaktsioon/i)

    fireEvent.click(screen.getByTestId('rm-lab-locale-ru'))
    expect(canvas.getAttribute('data-lab-locale')).toBe('ru')
    expect(screen.getByTestId('rm-lab-title').textContent).toMatch(/Лаборатория|реакц/i)

    fireEvent.click(screen.getByTestId('rm-lab-theme-dark'))
    expect(canvas.getAttribute('data-lab-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireEvent.click(screen.getByTestId('rm-lab-viewport-320'))
    expect(canvas.getAttribute('data-lab-viewport')).toBe('320')

    fireEvent.click(screen.getByTestId('rm-lab-text-200'))
    expect(canvas.getAttribute('data-lab-text-zoom')).toBe('200')
  })

  it('CrReactionIcon uses mask + currentColor (not bare img fill)', () => {
    const { container } = render(
      <CrReactionIcon src="/icons/next-feed/reactions/support.svg" size={18} />,
    )
    const icon = container.querySelector('[data-testid="rm-icon"]')
    expect(icon).toBeTruthy()
    expect(icon.tagName.toLowerCase()).toBe('span')
    expect(String(icon.style.maskImage || icon.style.webkitMaskImage)).toMatch(
      /support\.svg/,
    )
    const css = readFileSync(path.resolve(dir, '../icons/CrReactionIcon.css'), 'utf8')
    expect(css).toMatch(/currentColor/)
    expect(css).toMatch(/mask-image|mask-size/)
  })

  it('ET/RU/EN dictionaries cover stress + never expose hopeful/amused as selectable', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const r = THREADS_FEED_DICTIONARY_BY_LOCALE[locale].threadsFeed.reactions
      expect(r.lab.stressLocale).toBeTruthy()
      expect(r.chooseUpTo.length).toBeGreaterThan(10)
      expect(r.id.support).toBeTruthy()
      expect(r.id.needs_evidence).toBeTruthy()
    }
    expect(CR_OMIT_SELECTABLE_IDS).toEqual(expect.arrayContaining(['hopeful', 'amused']))
  })

  it('FixtureAdapter remains lab default under stress (no invent Live default)', () => {
    render(<ReactionsLabCanvas />)
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )
    fireEvent.click(screen.getByTestId('rm-lab-locale-et'))
    fireEvent.click(screen.getByTestId('rm-lab-theme-dark'))
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )
  })
})
