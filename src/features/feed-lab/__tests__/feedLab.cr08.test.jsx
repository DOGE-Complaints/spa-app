/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { THREADS_FEED_DICTIONARY_BY_LOCALE } from '../../../i18n/threadsFeedDictionary.js'
import { makeLabFeedT } from '../labI18n.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

function renderFeedLab() {
  return render(
    <MemoryRouter initialEntries={['/lab/feed']}>
      <Routes>
        <Route path="/lab/feed" element={<FeedLabPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CR-08 lab feed theme + stress', () => {
  afterEach(() => {
    cleanup()
    document.documentElement.removeAttribute('data-theme')
  })

  it('exposes M160 stress controls on #/lab/feed (locale × theme × 320 × 200%)', () => {
    renderFeedLab()
    const page = screen.getByTestId('feed-lab-page')
    expect(page.getAttribute('data-lab-stress')).toBe('m160')
    expect(screen.getByTestId('rm-lab-stress-controls')).toBeTruthy()

    fireEvent.click(screen.getByTestId('rm-lab-locale-et'))
    expect(page.getAttribute('data-lab-locale')).toBe('et')

    fireEvent.click(screen.getByTestId('rm-lab-locale-ru'))
    expect(page.getAttribute('data-lab-locale')).toBe('ru')

    fireEvent.click(screen.getByTestId('rm-lab-theme-dark'))
    expect(page.getAttribute('data-lab-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireEvent.click(screen.getByTestId('rm-lab-theme-light'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    fireEvent.click(screen.getByTestId('rm-lab-viewport-320'))
    expect(page.getAttribute('data-lab-viewport')).toBe('320')

    fireEvent.click(screen.getByTestId('rm-lab-text-200'))
    expect(page.getAttribute('data-lab-text-zoom')).toBe('200')
  })

  it('theme toggle uses setThemeAttribute path without invent persist', () => {
    const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
    expect(pageSrc).toMatch(/setThemeAttribute/)
    expect(pageSrc).toMatch(/persist:\s*false/)
    expect(pageSrc).toMatch(/rm-lab-stress-controls/)
  })

  it('locale stress passes dictionary t into FeedLabReactionsMount (not EN-only labT lock)', () => {
    renderFeedLab()
    fireEvent.click(screen.getByTestId('rm-lab-locale-et'))
    const firstCard = screen.getByTestId('feed-post-card-DOGEstonia-UusVeerenni-001')
    fireEvent.click(within(firstCard).getByTestId('feed-post-action-react'))
    const mounts = within(firstCard).getAllByTestId('feed-lab-reactions-mount')
    expect(mounts[0].getAttribute('data-lab-locale')).toBe('et')
    const picker = within(firstCard).getByTestId('rm-reaction-picker')
    const etChoose = THREADS_FEED_DICTIONARY_BY_LOCALE.et.threadsFeed.reactions.chooseUpTo
    expect(within(picker).getByText(etChoose, { exact: false })).toBeTruthy()
  })

  it('makeLabFeedT covers ET/RU/EN reaction stress keys', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const t = makeLabFeedT(locale)
      expect(t('threadsFeed.reactions.lab.stressLocale')).toBeTruthy()
      expect(t('threadsFeed.reactions.id.support')).toBeTruthy()
      expect(t('threadsFeed.reactions.chooseUpTo').length).toBeGreaterThan(10)
    }
  })

  it('feed-lab greenfield CSS primary surfaces use --color-* tokens', () => {
    const card = readFileSync(path.resolve(dir, '../post/FeedPostCard.css'), 'utf8')
    const strip = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.css'), 'utf8')
    expect(card).toMatch(/--color-surface-elevated/)
    expect(card).toMatch(/--color-border-default/)
    expect(strip).toMatch(/--color-border-default/)
    expect(strip).toMatch(/--color-text-secondary/)
  })
})
