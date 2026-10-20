/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedLabCt22Stands } from '../post/thread/FeedLabCt22Stands.jsx'
import { LAB_CT22_STANDS } from '../fixtures/labCt22Stands.js'

describe('CT-22 Path A stands on feed lab', () => {
  afterEach(() => cleanup())

  it('FeedLabPage mounts CT-22 stands', () => {
    render(
      <MemoryRouter>
        <FeedLabPage />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('feed-lab-ct22-stands')).toBeTruthy()
    for (const stand of LAB_CT22_STANDS) {
      expect(screen.getByTestId(`feed-lab-ct22-stand-${stand.id}`)).toBeTruthy()
    }
  })

  it('A local image · E denied omit · C markdown cue', () => {
    render(<FeedLabCt22Stands />)
    const a = screen.getByTestId('feed-lab-ct22-stand-A-image-local')
    expect(a.querySelector('[data-tm-attach-kind="image"]')).toBeTruthy()
    expect(a.querySelector('[data-tm-attach-local="true"]')).toBeTruthy()

    const c = screen.getByTestId('feed-lab-ct22-stand-C-markdown')
    expect(c.querySelector('[data-tm-attach-kind="markdown"]')).toBeTruthy()

    const e = screen.getByTestId('feed-lab-ct22-stand-E-denied-omit')
    expect(e.querySelector('[data-testid="tm-comment-attach-ct22-att-denied"]')).toBeNull()
    expect(e.querySelector('[data-testid="tm-comment-attach-ct22-att-ready-only"]')).toBeTruthy()
  })
})
