/**
 * @vitest-environment jsdom
 * NF-23: `#/board` → `#/next/feed` replace · soft CTA source asserts.
 */
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import App from '../../App.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'

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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function readSrc(rel) {
  return readFileSync(path.join(root, rel), 'utf8')
}

function renderApp(initialPath) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('App NF-23 board deprecate redirect', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('routes `/board` to next-feed host (replace Navigate)', async () => {
    renderApp('/board')
    await waitFor(() => {
      expect(screen.getByTestId('next-feed-host')).toBeTruthy()
    })
    expect(document.querySelector('.board-page')).toBeNull()
  })

  it('App.jsx /board is Navigate replace to /next/feed, not BoardPage', () => {
    const appSrc = readSrc('App.jsx')
    expect(appSrc).toMatch(/path="\/board"\s+element=\{<Navigate to="\/next\/feed" replace/)
    expect(appSrc).not.toMatch(/path="\/board"\s+element=\{<BoardPage/)
    expect(appSrc).not.toMatch(/import \{ BoardPage \}/)
  })

  it('soft Header / HowItWorks / Footer brand CTAs target /next/feed', () => {
    const header = readSrc('components/AppShell/Header.jsx')
    const how = readSrc('pages/HowItWorksPage.jsx')
    const footer = readSrc('components/PublicFooter/PublicFooter.jsx')
    expect(header).toMatch(/data-testid="public-nav-dashboard"[\s\S]*?to="\/next\/feed"|to="\/next\/feed"[\s\S]*?data-testid="public-nav-dashboard"/)
    expect(header).toContain('to="/next/feed"')
    expect(how).toContain('href="/next/feed"')
    expect(how).not.toContain('href="/board"')
    expect(footer).toContain('to="/next/feed"')
    expect(footer).not.toMatch(/to="\/board"/)
  })
})
