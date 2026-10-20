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
import { FeedPostActionStrip } from '../post/FeedPostActionStrip.jsx'

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

describe('CR-16 strip chip hover + media flush', () => {
  afterEach(() => cleanup())

  it('strip marks chip polish · 4 zones held', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(card.getAttribute('data-lab-cr16-polish')).toBe('true')
    expect(card.getAttribute('data-lab-media-flush')).toBe('true')
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-strip-zones')).toBe('4')
    expect(strip.getAttribute('data-lab-react-chip')).toBe('true')
    expect(strip.getAttribute('data-lab-cr16-polish')).toBe('true')
    expect(within(strip).getByTestId('reaction-summary-react')).toBeTruthy()
  })

  it('media segment is outside padded body · flush marker Present', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    const body = card.querySelector('.feed-post-card__body')
    const mediaSeg = within(card).getByTestId('feed-card-media-flush')
    expect(mediaSeg.getAttribute('data-lab-media-flush')).toBe('true')
    expect(body.contains(mediaSeg)).toBe(false)
    expect(within(mediaSeg).getByTestId('feed-post-media')).toBeTruthy()
    // strip follows media segment (CT-24: may be wrapped in strip-share-wrap)
    const afterMedia = mediaSeg.nextElementSibling
    const strip =
      afterMedia?.getAttribute('data-testid') === 'feed-post-action-strip'
        ? afterMedia
        : afterMedia?.querySelector?.('[data-testid="feed-post-action-strip"]')
    expect(strip).toBeTruthy()
  })

  it('fallback React zone uses inner chip wrapper (not bare icon+label)', () => {
    render(<FeedPostActionStrip reactState="hover" />)
    const strip = screen.getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-react-chip')).toBe('true')
    const zone = within(strip).getByTestId('feed-post-action-react')
    expect(within(zone).getByTestId('feed-post-action-react-chip')).toBeTruthy()
    expect(zone.querySelector('.feed-post-action-strip__chip')).toBeTruthy()
  })

  it('CSS: chip hover selectors Present · full-cell zone hover neutralized', () => {
    const css = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.css'), 'utf8')
    expect(css).toMatch(/feed-post-action-strip__chip/)
    expect(css).toMatch(/zone--slot:hover \.rm-summary-strip__react/)
    expect(css).toMatch(/never the full 56px cell|zone cell never paints full-cell/i)
    // full-cell paint on zone hover must not set accent background on the zone itself
    expect(css).not.toMatch(
      /\.feed-post-action-strip__zone--slot:hover\s*,\s*\n\.feed-post-action-strip__zone--slot\[data-rm-react-state='hover'\]\s*\{[\s\S]*?background:\s*var\(--color-accent-soft/,
    )
  })

  it('card CSS moves media flush · source no invent HTTP/M155', () => {
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    const cardCss = readFileSync(path.resolve(dir, '../post/FeedPostCard.css'), 'utf8')
    const detailSrc = readFileSync(path.resolve(dir, '../post/FeedIssueDetailBody.jsx'), 'utf8')
    expect(cardSrc).toMatch(/feed-post-card__media/)
    expect(cardSrc).toMatch(/data-lab-media-flush/)
    expect(cardCss).toMatch(/feed-post-card__media/)
    expect(detailSrc).toMatch(/feed-issue-detail-body__media/)
    expect(cardSrc).not.toMatch(/#\/next\/feed/)
    expect(cardSrc).not.toMatch(/fetch\(|\/threads\//)
  })

  it('populated card still opens picker from React chip path', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    const strip = within(card).getByTestId('feed-post-action-strip')
    fireEvent.click(within(strip).getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
  })
})
