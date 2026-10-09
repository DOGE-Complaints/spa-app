/**
 * @vitest-environment jsdom
 * NS-06: `/` and `*` → `/next/feed` after shell wave.
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

function renderApp(initialPath) {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('App NS-06 default entry flip', () => {
  beforeEach(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  afterEach(() => {
    cleanup()
    window.localStorage.removeItem(LOCALE_STORAGE_KEY)
  })

  it('routes `/` to `/next/feed` host', async () => {
    renderApp('/')
    await waitFor(() => {
      expect(screen.getByTestId('next-feed-host')).toBeTruthy()
    })
  })

  it('routes unknown `*` to `/next/feed` host', async () => {
    renderApp('/does-not-exist-ns06')
    await waitFor(() => {
      expect(screen.getByTestId('next-feed-host')).toBeTruthy()
    })
  })

  it('keeps classic shelter `/board` reachable (not retired)', async () => {
    renderApp('/board')
    await waitFor(() => {
      expect(document.querySelector('.next-shell-classic-shelter')).toBeTruthy()
    })
  })

  it('App.jsx Navigate targets point at /next/feed for / and *', () => {
    const appSrc = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../App.jsx'),
      'utf8',
    )
    expect(appSrc).toMatch(/path="\/"\s+element=\{<Navigate to="\/next\/feed"/)
    expect(appSrc).toMatch(/path="\*"\s+element=\{<Navigate to="\/next\/feed"/)
    expect(appSrc).not.toMatch(/path="\/"\s+element=\{<Navigate to="\/board"/)
  })
})
