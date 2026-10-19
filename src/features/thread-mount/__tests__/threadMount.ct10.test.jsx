/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ThreadMount } from '../ThreadMount.jsx'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { FeedLabThreadMount } from '../../feed-lab/post/thread/FeedLabThreadMount.jsx'

describe('CT-10 empty entry-only · speech icon · activate', () => {
  afterEach(() => cleanup())

  it('empty + writeAllowed · first paint = entry only · no full composer', () => {
    render(<ThreadMount status="empty" writeCapability="allowed" comments={[]} />)
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-ct10')).toBe('true')
    expect(mount.getAttribute('data-tm-empty-entry')).toBe('true')
    expect(mount.getAttribute('data-tm-composer-open')).toBe('false')
    expect(screen.getByTestId('tm-thread-empty')).toBeTruthy()
    expect(screen.getByTestId('tm-thread-empty-icon')).toBeTruthy()
    expect(screen.getByTestId('tm-thread-composer-entry')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-composer')).toBeNull()
  })

  it('entry activate opens composer · entry leaves first-paint path', () => {
    render(<ThreadMount status="empty" writeCapability="allowed" comments={[]} />)
    fireEvent.click(screen.getByTestId('tm-thread-composer-entry'))
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-expanded')).toBe('true')
    expect(mount.getAttribute('data-tm-empty-entry')).toBe('false')
    expect(mount.getAttribute('data-tm-composer-open')).toBe('true')
    expect(screen.getByTestId('tm-thread-composer')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-composer-entry')).toBeNull()
  })

  it('IssueThreadBlock empty shows speech icon + lead/helper', () => {
    render(<IssueThreadBlock status="empty" composerEntry />)
    const icon = screen.getByTestId('tm-thread-empty-icon')
    const img = icon.querySelector('img')
    expect(img?.getAttribute('src')).toContain('/icons/next-feed/actions/comment.svg')
    expect(screen.getByText('No comments yet')).toBeTruthy()
    expect(screen.getByText(/constructive discussion/i)).toBeTruthy()
  })

  it('populated collapsed entry still Present · unchanged CT-01 path', () => {
    render(
      <ThreadMount
        status="populated"
        writeCapability="allowed"
        comments={[{ id: 'a', body: 'hello', parentId: null, depth: 0 }]}
      />,
    )
    expect(screen.getByTestId('tm-thread-composer-entry')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-composer')).toBeNull()
    expect(screen.queryByTestId('tm-thread-empty-icon')).toBeNull()
  })

  it('FeedLabThreadMount empty · entry marker · no composer until expand', () => {
    render(<FeedLabThreadMount status="empty" writeCapability="allowed" />)
    expect(screen.getByTestId('feed-lab-thread-mount').getAttribute('data-lab-ct10')).toBe('true')
    expect(screen.getByTestId('tm-thread-composer-entry')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-composer')).toBeNull()
  })
})
