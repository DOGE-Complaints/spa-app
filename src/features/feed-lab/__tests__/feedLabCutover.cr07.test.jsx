/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

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

describe('CR-07 `#/lab/feed` cutover → ReactionsMount', () => {
  afterEach(() => cleanup())

  it('root + comment slots use ReactionsMount · no live FeedReactionPlane', () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    const rootMount = within(card).getByTestId('reactions-mount')
    expect(rootMount.getAttribute('data-rm-target')).toBe('thread-root')
    expect(rootMount.getAttribute('data-m155-oos')).toBe('true')
    expect(within(card).queryByTestId('feed-reaction-plane')).toBeNull()

    fireEvent.click(within(card).getByTestId('feed-post-action-comment'))
    const commentNode = within(card).getByTestId('feed-post-comment-node-lab-c-001-a')
    const commentMount = within(commentNode).getByTestId('reactions-mount')
    expect(commentMount.getAttribute('data-rm-target')).toBe('comment')
    expect(commentMount.getAttribute('data-rm-moderation')).toBe('eligible')

    fireEvent.click(within(commentNode).getByTestId('reaction-summary-react'))
    expect(within(commentNode).getByTestId('rm-reaction-picker')).toBeTruthy()
    expect(within(commentNode).getByTestId('rm-picker-layer-moderation')).toBeTruthy()
  })

  it('CR-05/06 chrome: strip opens picker · icon-only close · root hint footer', async () => {
    renderLab()
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    fireEvent.click(within(card).getByTestId('feed-post-action-react'))
    const picker = within(card).getByTestId('rm-reaction-picker')
    expect(within(picker).getByTestId('rm-picker-close')).toBeTruthy()
    expect(within(picker).queryByText(/^Close$/i)).toBeNull()
    expect(within(picker).getByTestId('rm-picker-root-scope-hint')).toBeTruthy()
  })
})
