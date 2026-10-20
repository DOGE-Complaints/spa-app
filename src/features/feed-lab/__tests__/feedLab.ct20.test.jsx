/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { LAB_CT20_STANDS } from '../fixtures/labCt20Stands.js'

function renderLab() {
  return render(
    <MemoryRouter>
      <FeedLabPage />
    </MemoryRouter>,
  )
}

describe('CT-20 lab audit fixtures LAB-1…4 on #/lab/feed', () => {
  afterEach(() => cleanup())

  it('exposes LAB_CT20_STANDS for LAB-1…4', () => {
    const labs = new Set(LAB_CT20_STANDS.map((s) => s.lab))
    expect([...labs].sort()).toEqual(['LAB-1', 'LAB-2', 'LAB-3', 'LAB-4'])
    expect(LAB_CT20_STANDS.some((s) => s.status === 'loading')).toBe(true)
    expect(LAB_CT20_STANDS.some((s) => s.status === 'empty')).toBe(true)
    expect(LAB_CT20_STANDS.some((s) => s.status === 'unavailable')).toBe(true)
    expect(LAB_CT20_STANDS.some((s) => s.forcePostFail)).toBe(true)
    expect(LAB_CT20_STANDS.some((s) => s.attachmentsAvailable === false)).toBe(true)
    expect(LAB_CT20_STANDS.some((s) => s.maxDepth === 2)).toBe(true)
  })

  it('LAB-1 loading / empty / unavailable stands reachable', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-ct20-stands')).toBeTruthy()
    const load = screen.getByTestId('feed-lab-ct20-stand-LAB1-load')
    expect(within(load).getByTestId('feed-lab-thread-mount').getAttribute('data-lab-thread-status')).toBe(
      'loading',
    )
    const empty = screen.getByTestId('feed-lab-ct20-stand-LAB1-empty')
    expect(within(empty).getByTestId('feed-lab-thread-mount').getAttribute('data-lab-thread-status')).toBe(
      'empty',
    )
    const unavail = screen.getByTestId('feed-lab-ct20-stand-LAB1-unavail')
    expect(
      within(unavail).getByTestId('feed-lab-thread-mount').getAttribute('data-lab-thread-status'),
    ).toBe('unavailable')
  })

  it('LAB-2 forcePostFail keeps draft · soft-fail', async () => {
    renderLab()
    const stand = screen.getByTestId('feed-lab-ct20-stand-LAB2-fail')
    const host = within(stand).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-force-post-fail')).toBe('true')
    const mount = within(stand).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-force-post-fail')).toBe('true')
    const composer = within(stand).getByTestId('tm-thread-composer')
    const textarea = within(composer).getByRole('textbox')
    expect(textarea.value.length).toBeGreaterThan(0)
    const before = textarea.value
    const post = within(composer).getByTestId('tm-composer-post')
    fireEvent.click(post)
    expect(textarea.value).toBe(before)
  })

  it('LAB-3 attachmentsAvailable=false omits Attach + file input', () => {
    renderLab()
    const stand = screen.getByTestId('feed-lab-ct20-stand-LAB3-attach-off')
    const host = within(stand).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-attachments-available')).toBe('false')
    const mount = within(stand).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-attachments-available')).toBe('false')
    expect(within(stand).queryByTestId('tm-composer-attach')).toBeNull()
    expect(within(stand).queryByTestId('tm-composer-file-input')).toBeNull()
  })

  it('LAB-4 maxDepth=2 blocks Reply at depth 2', () => {
    renderLab()
    const stand = screen.getByTestId('feed-lab-ct20-stand-LAB4-maxdepth')
    const host = within(stand).getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-max-depth')).toBe('2')
    const deep = within(stand).getByTestId('tm-comment-node-ct20-t-a1a')
    expect(deep.getAttribute('data-tm-depth')).toBe('2')
    expect(within(deep).queryByTestId('tm-comment-reply')).toBeNull()
    const mid = within(stand).getByTestId('tm-comment-node-ct20-t-a1')
    expect(within(mid).getByTestId('tm-comment-reply')).toBeTruthy()
  })
})
