/** @vitest-environment jsdom */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedPostCard } from '../post/FeedPostCard.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CR-23 lab Fixture path held', () => {
  afterEach(() => {
    cleanup()
  })

  it('lab FeedPostCard still uses FeedLabReactionsMount FixtureAdapter', () => {
    const fixture = LAB_FEED_FIXTURES[0] || {
      id: 'lab-1',
      title: 'Lab',
      summary: 'Hold',
      media: null,
      comments: [],
      reactionStripState: 'empty',
      publicId: 'LAB-1',
    }
    render(
      <MemoryRouter>
        <FeedPostCard fixture={fixture} t={(k) => k} locale="en" />
      </MemoryRouter>,
    )
    const strip = screen.getByTestId('feed-post-action-strip')
    const lab = within(strip).getByTestId('feed-lab-reactions-mount')
    expect(lab.getAttribute('data-rm-adapter')).toBe('fixture')
    expect(within(strip).getByTestId('reactions-mount')).toBeTruthy()
    expect(within(strip).queryByTestId('feed-reactions-mount')).toBeNull()
  })

  it('source: FeedLabReactionsMount Fixture · FeedLabPage has CR-23 Path A stand import seam', () => {
    const labRm = readFileSync(path.resolve(dir, '../post/reactions/FeedLabReactionsMount.jsx'), 'utf8')
    expect(labRm).toMatch(/createFixtureAdapter/)
    expect(labRm).not.toMatch(/createLiveAdapter/)
    const page = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
    expect(page).toMatch(/FeedLabCt23Stand/)
    expect(page).toMatch(/FeedLabCt28Stand/)
  })
})
