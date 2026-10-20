/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { SHOW_MORE_COMMENTS_COPY } from '../../thread-mount/config/threadMountConfig.js'

function renderLab() {
  return render(
    <MemoryRouter>
      <FeedLabPage />
    </MemoryRouter>,
  )
}

describe('CT-21 M152c stands on #/lab/feed', () => {
  afterEach(() => cleanup())

  it('CT-21 stands Present · panels A–E', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-ct21-stands')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-ct21-stand-A-within')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-ct21-stand-B-trunc')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-ct21-stand-C-reveal')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-ct21-stand-D-empty')).toBeTruthy()
    expect(screen.getByTestId('feed-lab-ct21-stand-E-narrow')).toBeTruthy()
  })

  it('A within budget · no Show more · expanded · no heading', () => {
    renderLab()
    const stand = screen.getByTestId('feed-lab-ct21-stand-A-within')
    const mount = within(stand).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-expanded')).toBe('true')
    expect(within(stand).queryByTestId('tm-thread-heading')).toBeNull()
    const tree = within(stand).getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-preview-truncated')).toBe('false')
    expect(within(stand).queryByTestId('tm-show-more-comments')).toBeNull()
  })

  it('B truncated · Show more · C one-shot reveal', () => {
    renderLab()
    const b = screen.getByTestId('feed-lab-ct21-stand-B-trunc')
    expect(within(b).getByTestId('tm-show-more-comments').textContent).toBe(SHOW_MORE_COMMENTS_COPY)
    expect(within(b).getByTestId('tm-comment-tree').getAttribute('data-tm-preview-truncated')).toBe(
      'true',
    )

    const c = screen.getByTestId('feed-lab-ct21-stand-C-reveal')
    fireEvent.click(within(c).getByTestId('tm-show-more-comments'))
    expect(within(c).queryByTestId('tm-show-more-comments')).toBeNull()
    expect(within(c).getByTestId('tm-comment-tree').getAttribute('data-tm-preview-truncated')).toBe(
      'false',
    )
    expect(within(c).getByTestId('tm-comment-node-ct21-b4')).toBeTruthy()
  })

  it('D empty · no Discussion heading · E narrow truncate', () => {
    renderLab()
    const d = screen.getByTestId('feed-lab-ct21-stand-D-empty')
    expect(within(d).queryByTestId('tm-thread-heading')).toBeNull()
    expect(within(d).getByTestId('tm-thread-empty')).toBeTruthy()

    const e = screen.getByTestId('feed-lab-ct21-stand-E-narrow')
    expect(within(e).getByTestId('feed-lab-thread-mount').getAttribute('data-lab-narrow')).toBe(
      'true',
    )
    expect(within(e).getByTestId('tm-show-more-comments')).toBeTruthy()
  })
})
