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
import { FEED_POST_ACTION_ICON_URLS } from '../post/FeedPostActionStrip.jsx'

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

describe('CR-11 four-zone strip chrome', () => {
  afterEach(() => cleanup())

  it('strip is 4 zones · icon+label · Runtime URLs wired', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-strip-zones')).toBe('4')
    expect(strip.querySelectorAll('[data-zone]')).toHaveLength(4)

    for (const id of ['react', 'comment', 'share', 'reactions']) {
      const zone = within(card).getByTestId(`feed-post-action-${id}`)
      expect(zone.getAttribute('data-zone')).toBe(id)
      expect(zone.getAttribute('data-lab-icon-src')).toBe(FEED_POST_ACTION_ICON_URLS[id])
    }

    expect(within(card).getByTestId('feed-post-action-icon-comment').getAttribute('src')).toBe(
      '/icons/next-feed/actions/comment.svg',
    )
    expect(within(card).getByTestId('feed-post-action-icon-share').getAttribute('src')).toBe(
      '/icons/next-feed/actions/share.svg',
    )
    expect(within(card).getByTestId('feed-post-action-icon-reactions').getAttribute('src')).toBe(
      '/icons/next-feed/actions/reactions.svg',
    )
    expect(within(card).getByTestId('feed-post-action-reactions').textContent).toMatch(/Reactions/i)

    const zone1 = within(card).getByTestId('feed-post-action-react')
    expect(zone1.getAttribute('data-lab-react-slot')).toBe('true')
    expect(zone1.getAttribute('data-rm-react-state')).toBeTruthy()
    expect(within(zone1).getByTestId('feed-lab-reactions-mount')).toBeTruthy()
    expect(within(zone1).getByTestId('reaction-summary-react')).toBeTruthy()
  })

  it('narrow stress attrs drive 2×2 CSS contract', () => {
    renderLab()
    const page = screen.getByTestId('feed-lab-page')
    fireEvent.click(screen.getByTestId('rm-lab-viewport-320'))
    expect(page.getAttribute('data-lab-viewport')).toBe('320')
    fireEvent.click(screen.getByTestId('rm-lab-text-200'))
    expect(page.getAttribute('data-lab-text-zoom')).toBe('200')

    const css = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.css'), 'utf8')
    expect(css).toMatch(/data-lab-viewport='320'/)
    expect(css).toMatch(/data-lab-text-zoom='200'/)
    expect(css).toMatch(/grid-template-columns:\s*repeat\(2/)
    expect(css).toMatch(/grid-template-columns:\s*repeat\(4/)
  })

  it('source: zones×4 · icon URLs · Gap v2 reactions URL · no invent SVG body', () => {
    const stripSrc = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.jsx'), 'utf8')
    const cssSrc = readFileSync(path.resolve(dir, '../post/FeedPostActionStrip.css'), 'utf8')
    expect(stripSrc).toMatch(/data-lab-strip-zones="4"/)
    expect(stripSrc).toMatch(/id:\s*'reactions'/)
    expect(stripSrc).toContain('/icons/next-feed/actions/react.svg')
    expect(stripSrc).toContain('/icons/next-feed/actions/comment.svg')
    expect(stripSrc).toContain('/icons/next-feed/actions/share.svg')
    expect(stripSrc).toContain('/icons/next-feed/actions/reactions.svg')
    expect(stripSrc).toMatch(/data-rm-react-state/)
    expect(cssSrc).toMatch(/data-rm-react-state='selected'/)
    expect(cssSrc).toMatch(/--color-accent/)
    expect(stripSrc).not.toMatch(/<svg[\s>]/)
  })
})
