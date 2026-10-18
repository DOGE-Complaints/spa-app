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

describe('CR-09 strip slot composition A+C+B', () => {
  afterEach(() => cleanup())

  it('strip hosts mount in zone 1 · CR-11 supersedes 3-zone → 4 zones Present', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-strip-composition')).toBe('a-c-b')
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-strip-zones')).toBe('4')
    expect(strip.getAttribute('data-lab-strip-slot')).toBe('react')
    expect(strip.querySelectorAll('[data-zone]')).toHaveLength(4)
    expect(within(card).getByTestId('feed-post-action-reactions')).toBeTruthy()
    expect(strip.querySelector('[data-zone="reactions"]')).toBeTruthy()

    const zone1 = within(card).getByTestId('feed-post-action-react')
    expect(zone1.getAttribute('data-lab-react-slot')).toBe('true')
    expect(within(zone1).getByTestId('feed-lab-reactions-mount')).toBeTruthy()
    expect(within(zone1).getByTestId('reaction-summary-strip')).toBeTruthy()
    expect(within(zone1).getByTestId('reaction-summary-react')).toBeTruthy()
  })

  it('no under-strip root duplicate · CT-02 ThreadMount expand (comment-node reactions → CT-09)', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(within(card).queryByTestId('feed-post-discussion-reaction-slot')).toBeNull()
    expect(within(card).getByTestId('feed-lab-thread-mount')).toBeTruthy()
    expect(within(card).getAllByTestId('feed-lab-reactions-mount')).toHaveLength(1)

    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    expect(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe('true')
    // comment-target ReactionsMount lands with CT-09 plug — root strip mount remains sole Present mount
    expect(within(card).getAllByTestId('feed-lab-reactions-mount')).toHaveLength(1)
  })

  it('picker opens from zone-1 summary React · Comment/Share still work', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    fireEvent.click(within(card).getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()

    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    expect(within(card).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe('true')
    expect(within(card).getByTestId('feed-post-action-share')).toBeTruthy()
  })

  it('source: reactSlot wire · ThreadMount host · plane module keeps no root mount', () => {
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    const stripSrc = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.jsx'), 'utf8')
    const planeSrc = readFileSync(path.resolve(dir, '../post/discussion/FeedDiscussionPlane.jsx'), 'utf8')
    expect(stripSrc).toMatch(/reactSlot/)
    expect(stripSrc).toMatch(/data-lab-strip-zones="4"/)
    expect(stripSrc).toMatch(/id:\s*'reactions'/)
    expect(cardSrc).toMatch(/reactSlot=/)
    expect(cardSrc).toMatch(/FeedLabReactionsMount/)
    expect(cardSrc).toMatch(/FeedLabThreadMount/)
    expect(planeSrc).not.toMatch(/FeedLabReactionsMount/)
    expect(planeSrc).not.toMatch(/feed-post-discussion-reaction-slot/)
  })
})
