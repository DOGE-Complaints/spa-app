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

describe('CR-15 lab feed M154 composition wire', () => {
  afterEach(() => cleanup())

  it('page marks CR-15 wire · stress · M155 OOS · visual not Done', () => {
    renderLab()
    const page = screen.getByTestId('feed-lab-page')
    expect(page.getAttribute('data-lab-cr15-wire')).toBe('true')
    expect(page.getAttribute('data-lab-stress')).toBe('m160')
    expect(page.getAttribute('data-m155-oos')).toBe('true')
    expect(page.getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getByTestId('rm-lab-stress-controls')).toBeTruthy()
  })

  it('populated card: 4-zone + aggregate + React-always + picker portal', () => {
    renderLab()
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    expect(populated).toBeTruthy()
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(card.getAttribute('data-lab-cr15-wire')).toBe('true')
    expect(card.getAttribute('data-lab-aggregate')).toBe('below')
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-strip-zones')).toBe('4')
    expect(within(card).getByTestId('reaction-summary-react')).toBeTruthy()
    const host = within(card).getByTestId('feed-post-aggregate-host')
    expect(host.contains(within(card).getByTestId('reaction-aggregate-row'))).toBe(true)
    expect(within(card).getByTestId('feed-lab-reactions-mount').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )

    fireEvent.click(within(card).getByTestId('reaction-summary-react'))
    expect(screen.getByTestId('rm-reaction-picker')).toBeTruthy()
  })

  it('stress theme/locale/viewport still drive page attrs', () => {
    renderLab()
    const page = screen.getByTestId('feed-lab-page')
    fireEvent.click(screen.getByTestId('rm-lab-theme-dark'))
    expect(page.getAttribute('data-lab-theme')).toBe('dark')
    fireEvent.click(screen.getByTestId('rm-lab-locale-et'))
    expect(page.getAttribute('data-lab-locale')).toBe('et')
    fireEvent.click(screen.getByTestId('rm-lab-viewport-320'))
    expect(page.getAttribute('data-lab-viewport')).toBe('320')
    // CR-15 wire held under stress
    expect(page.getAttribute('data-lab-cr15-wire')).toBe('true')
    const populated = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    const card = screen.getByTestId(`feed-post-card-${populated.publicId}`)
    expect(within(card).getByTestId('feed-post-action-strip').getAttribute('data-lab-strip-zones')).toBe(
      '4',
    )
  })

  it('source: FixtureAdapter · no dual discussion slot · no next/feed invent', () => {
    const cardSrc = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    const mountSrc = readFileSync(
      path.resolve(dir, '../post/reactions/FeedLabReactionsMount.jsx'),
      'utf8',
    )
    const pageSrc = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
    expect(cardSrc).toMatch(/data-lab-cr15-wire/)
    expect(cardSrc).toMatch(/aggregatePlacement="below"/)
    expect(cardSrc).not.toMatch(/feed-post-discussion-reaction-slot/)
    expect(mountSrc).toMatch(/createFixtureAdapter/)
    expect(mountSrc).toMatch(/reactAlways/)
    expect(pageSrc).toMatch(/data-lab-cr15-wire/)
    expect(pageSrc).not.toMatch(/#\/next\/feed/)
  })
})
