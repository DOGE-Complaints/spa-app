/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_FEED_FIXTURES } from '../fixtures/labFeedFixtures.js'
import { fixtureNeedsBranchDisclosure } from '../post/thread/FeedLabThreadMount.jsx'

function renderLab() {
  return render(
    <MemoryRouter>
      <FeedLabPage />
    </MemoryRouter>,
  )
}

describe('CT-15 lab host residual on #/lab/feed', () => {
  afterEach(() => cleanup())

  it('fixtureNeedsBranchDisclosure · nest card 002', () => {
    const card002 = LAB_FEED_FIXTURES.find((f) => f.publicId.includes('002'))
    expect(fixtureNeedsBranchDisclosure(card002.comments)).toBe(true)
    expect(fixtureNeedsBranchDisclosure(LAB_FEED_FIXTURES[0].comments)).toBe(false)
  })

  it('greenfield card wires narrow · not only CT08 E', () => {
    renderLab()
    const narrowFx = LAB_FEED_FIXTURES.find((f) => f.narrow)
    expect(narrowFx).toBeTruthy()
    const card = screen.getByTestId(`feed-post-card-${narrowFx.publicId}`)
    expect(card.getAttribute('data-lab-narrow')).toBe('true')
    const host = within(card).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-narrow')).toBe('true')
    expect(host.getAttribute('data-lab-ct15')).toBe('true')
    const mount = within(card).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-narrow')).toBe('true')
  })

  it('nest fixture card passes branchDisclosure · issue id · CT-21 no heading', () => {
    renderLab()
    const card002 = LAB_FEED_FIXTURES.find((f) => f.publicId.includes('002'))
    const card = screen.getByTestId(`feed-post-card-${card002.publicId}`)
    const host = within(card).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-branch-disclosure')).toBe('true')
    expect(host.getAttribute('data-lab-issue-id')).toBe(card002.publicId)
    expect(within(card).queryByTestId('tm-thread-heading')).toBeNull()
    expect(within(card).queryByTestId('tm-thread-heading-title')).toBeNull()
  })

  it('CT-21 default expanded · residents row omitted on first paint · aggregate marker held', () => {
    renderLab()
    const withAgg = LAB_FEED_FIXTURES.find((f) => f.reactionStripState === 'populated')
    const without = LAB_FEED_FIXTURES.find((f) => f.reactionStripState !== 'populated')
    expect(withAgg).toBeTruthy()
    expect(without).toBeTruthy()

    const cardAgg = screen.getByTestId(`feed-post-card-${withAgg.publicId}`)
    expect(within(cardAgg).getByTestId('tm-thread-mount').getAttribute('data-tm-expanded')).toBe(
      'true',
    )
    expect(within(cardAgg).queryByTestId('tm-thread-residents-row')).toBeNull()
    expect(
      within(cardAgg).getByTestId('feed-lab-thread-mount').getAttribute('data-lab-residents-aggregate'),
    ).toBe('confirmed')

    const cardPlain = screen.getByTestId(`feed-post-card-${without.publicId}`)
    expect(within(cardPlain).queryByTestId('tm-thread-residents-row')).toBeNull()
    expect(
      within(cardPlain)
        .getByTestId('feed-lab-thread-mount')
        .getAttribute('data-lab-residents-aggregate'),
    ).toBe('absent')
  })
})
