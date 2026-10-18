/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
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

describe('CR-22 media–strip flush residual', () => {
  afterEach(() => cleanup())

  it('feed card keeps media-flush marker · CR-22 flush marker · chip polish held', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(card.getAttribute('data-lab-media-flush')).toBe('true')
    expect(card.getAttribute('data-lab-cr22-flush')).toBe('true')
    expect(card.getAttribute('data-lab-cr16-polish')).toBe('true')
    const mediaSeg = within(card).getByTestId('feed-card-media-flush')
    expect(mediaSeg.getAttribute('data-lab-media-flush')).toBe('true')
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-cr16-polish')).toBe('true')
    expect(strip.getAttribute('data-lab-reactions-chip')).toBe('true')
  })

  it('card CSS removes media plate bg · keeps flush locks (measure cause)', () => {
    const cardCss = readFileSync(path.resolve(dir, '../post/FeedPostCard.css'), 'utf8')
    expect(cardCss).toMatch(/background:\s*transparent/)
    expect(cardCss).toMatch(/feed-post-card__media/)
    expect(cardCss).toMatch(/CR-22/)
    const detailCss = readFileSync(path.resolve(dir, '../post/FeedIssueDetailBody.css'), 'utf8')
    expect(detailCss).toMatch(/background:\s*transparent/)
    expect(detailCss).toMatch(/CR-22/)
  })

  it('no invent full-cell hover regression — chip CSS still Present', () => {
    const stripCss = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.css'), 'utf8')
    expect(stripCss).toMatch(/feed-post-action-strip__chip/)
    expect(stripCss).toMatch(/chip only|never the full 56px cell/i)
  })
})
