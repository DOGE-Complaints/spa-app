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

describe('CR-12 lab feed react-always + aggregate under strip', () => {
  afterEach(() => cleanup())

  it('empty card: React visible · no aggregate row · opens picker', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-aggregate')).toBe('below')
    const zone1 = within(card).getByTestId('feed-post-action-react')
    expect(within(zone1).getByTestId('reaction-summary-react')).toBeTruthy()
    expect(within(card).queryByTestId('reaction-aggregate-row')).toBeNull()
    expect(within(card).getByTestId('feed-post-aggregate-host')).toBeTruthy()
    expect(within(card).queryByTestId('feed-post-discussion-reaction-slot')).toBeNull()

    fireEvent.click(within(zone1).getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
  })

  it('populated card: React + aggregate under strip · Reactions zone wires', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    expect(populated).toBeTruthy()
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(within(card).getByTestId('reaction-summary-react')).toBeTruthy()
    const host = within(card).getByTestId('feed-post-aggregate-host')
    const row = within(card).getByTestId('reaction-aggregate-row')
    expect(host.contains(row)).toBe(true)
    // aggregate not inside strip zone
    expect(
      within(card)
        .getByTestId('feed-post-action-react')
        .querySelector('[data-testid="reaction-aggregate-row"]'),
    ).toBeNull()

    fireEvent.click(within(card).getByTestId('feed-post-action-reactions'))
    expect(screen.getByTestId('rm-reactors-popover')).toBeTruthy()
    expect(screen.queryByTestId('rm-reaction-picker')).toBeNull()
  })

  it('source: no dual under-strip mount · below placement · Reactions zone', () => {
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    const stripSrc = readFileSync(
      path.resolve(dir, '../../reactions-mount/ReactionSummaryStrip.jsx'),
      'utf8',
    )
    expect(cardSrc).toMatch(/aggregatePlacement="below"/)
    expect(cardSrc).toMatch(/feed-post-aggregate-host/)
    expect(cardSrc).toMatch(/activateAggregate/)
    expect(cardSrc).not.toMatch(/feed-post-discussion-reaction-slot/)
    expect(stripSrc).toMatch(/reactAlways/)
    expect(stripSrc).toMatch(/aggregatePlacement/)
  })
})
