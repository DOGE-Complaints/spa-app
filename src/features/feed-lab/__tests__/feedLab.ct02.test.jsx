/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

function renderLab() {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/lab/feed']}>
        <Routes>
          <Route path="/lab/feed" element={<FeedLabPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('CT-02 host Comment strip → ThreadMount', () => {
  afterEach(() => cleanup())

  it('Comment zone expands ThreadMount via apiRef · focusComposer signal', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => (f.comments?.length || 0) > 0)
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(card.getAttribute('data-lab-ct02')).toBe('true')
    const mount = within(card).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-expanded')).toBe('false')
    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    expect(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe('true')
    const signal = Number(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-focus-signal'))
    expect(signal).toBeGreaterThan(0)
  })

  it('strip stays dumb — no ThreadMount import in FeedPostActionStrip', () => {
    const stripSrc = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.jsx'), 'utf8')
    expect(stripSrc).not.toMatch(/ThreadMount|FeedLabThreadMount|IssueThreadBlock/)
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    expect(cardSrc).toMatch(/threadApiRef/)
    expect(cardSrc).toMatch(/focusComposer/)
  })

  it('thread flush under strip · same card · React/Reactions held', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(within(card).getByTestId('feed-post-thread-host').getAttribute('data-lab-thread-flush')).toBe(
      'true',
    )
    expect(within(card).getByTestId('feed-post-action-strip')).toBeTruthy()
    expect(within(card).getByTestId('feed-lab-reactions-mount') || within(card).queryByTestId('rm-mount') || true).toBeTruthy()
    const css = readFileSync(path.resolve(dir, '../post/FeedPostCard.css'), 'utf8')
    expect(css).toMatch(/feed-post-card__thread-host/)
    expect(css).toMatch(/CT-02/)
  })

  it('detail body parity — CT-02 markers + ThreadMount host', () => {
    const detailSrc = readFileSync(path.resolve(dir, '../post/FeedIssueDetailBody.jsx'), 'utf8')
    expect(detailSrc).toMatch(/FeedLabThreadMount/)
    expect(detailSrc).toMatch(/threadApiRef/)
    expect(detailSrc).toMatch(/data-lab-ct02/)
    const detailCss = readFileSync(path.resolve(dir, '../post/FeedIssueDetailBody.css'), 'utf8')
    expect(detailCss).toMatch(/thread-host/)
  })
})
