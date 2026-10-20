/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'

describe('CT-23 Path A density on feed lab', () => {
  afterEach(() => cleanup())

  it('greenfield card thread-host · no nested plate markers · ct23 Present', async () => {
    render(
      <MemoryRouter>
        <FeedLabPage />
      </MemoryRouter>,
    )
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    const host = within(card).getByTestId('feed-post-thread-host')
    expect(host.getAttribute('data-lab-ct23')).toBe('true')
    expect(host.getAttribute('data-lab-thread-flush')).toBe('true')

    const strip = within(card).getByTestId('feed-post-action-strip')
    const comment = within(strip).queryByTestId('feed-post-action-comment')
    if (comment) fireEvent.click(comment)

    const mount = within(card).getByTestId('feed-lab-thread-mount')
    expect(mount.getAttribute('data-lab-ct23')).toBe('true')
    const block = within(card).getByTestId('tm-issue-thread-block')
    expect(block.getAttribute('data-tm-density')).toBe('artboard')
  })
})
