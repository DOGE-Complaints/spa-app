/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ThreadMount } from '../ThreadMount.jsx'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import {
  M152_ILLUSTRATIVE_BODIES,
  THREAD_STATE_FIXTURES,
  createFixtureAdapter,
} from '../adapters/FixtureAdapter.js'
import { ThreadLabPage } from '../../../pages/ThreadLabPage.jsx'
import { FeedLabThreadMount } from '../../feed-lab/post/thread/FeedLabThreadMount.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CT-01 IssueThreadBlock / ThreadMount states', () => {
  afterEach(() => cleanup())

  it('loading shows skeleton only · no fake comment bodies', () => {
    render(<IssueThreadBlock status="loading" comments={THREAD_STATE_FIXTURES.populated.comments} />)
    const block = screen.getByTestId('tm-issue-thread-block')
    expect(block.getAttribute('data-tm-status')).toBe('loading')
    expect(screen.getByTestId('tm-thread-skeleton')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-previews')).toBeNull()
    expect(screen.queryByText(M152_ILLUSTRATIVE_BODIES[0])).toBeNull()
  })

  it('empty shows invitation · composer entry when capability', () => {
    render(<IssueThreadBlock status="empty" composerEntry />)
    expect(screen.getByTestId('tm-thread-empty')).toBeTruthy()
    expect(screen.getByText('No comments yet')).toBeTruthy()
    expect(screen.getByTestId('tm-thread-composer-entry')).toBeTruthy()
  })

  it('populated-collapsed shows literal bodies · never skeleton bars', () => {
    const { comments } = THREAD_STATE_FIXTURES.populated
    render(<IssueThreadBlock status="populated" comments={comments} composerEntry />)
    const previews = screen.getByTestId('tm-thread-previews')
    const bodies = within(previews).getAllByTestId('tm-thread-preview-body')
    expect(bodies).toHaveLength(2)
    expect(bodies[0].textContent).toBe(M152_ILLUSTRATIVE_BODIES[0])
    expect(bodies[1].textContent).toBe(M152_ILLUSTRATIVE_BODIES[1])
    expect(screen.queryByTestId('tm-thread-skeleton')).toBeNull()
    expect(screen.getByTestId('tm-thread-view-discussion')).toBeTruthy()
  })

  it('unavailable shows Try again · no fake comments', () => {
    render(<IssueThreadBlock status="unavailable" onRetry={() => {}} />)
    expect(screen.getByTestId('tm-thread-unavailable')).toBeTruthy()
    expect(screen.getByTestId('tm-thread-retry')).toBeTruthy()
    expect(screen.queryByTestId('tm-thread-previews')).toBeNull()
  })

  it('ThreadMount owns status markers · FixtureAdapter snapshots A–D', () => {
    for (const status of /** @type {const} */ (['loading', 'empty', 'populated', 'unavailable'])) {
      cleanup()
      const snap = createFixtureAdapter(status).snapshot()
      render(
        <ThreadMount
          status={snap.status}
          comments={snap.comments}
          writeCapability={THREAD_STATE_FIXTURES[status].writeCapability}
         previewNodeBudget={99} />,
      )
      const mount = screen.getByTestId('tm-thread-mount')
      expect(mount.getAttribute('data-tm-status')).toBe(status)
      expect(mount.getAttribute('data-lab-ct01')).toBe('true')
    }
  })

  it('narrow stress sets lab-narrow · no invent author fields in fixtures', () => {
    const populated = THREAD_STATE_FIXTURES.populated
    for (const c of populated.comments) {
      expect(c).not.toHaveProperty('author')
      expect(c).not.toHaveProperty('avatar')
      expect(c).not.toHaveProperty('createdAt')
    }
    render(
      <ThreadMount
        status="populated"
        comments={populated.comments}
        writeCapability="allowed"
        narrow
       previewNodeBudget={99} />,
    )
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-lab-narrow')).toBe('true')
  })

  it('FeedLabThreadMount thin host Present', () => {
    render(<FeedLabThreadMount status="empty" />)
    expect(screen.getByTestId('feed-lab-thread-mount')).toBeTruthy()
    expect(screen.getByTestId('tm-thread-empty')).toBeTruthy()
  })

  it('#/lab/thread registers · stands A–E Present · civic Open issue interactive', () => {
    const appSrc = readFileSync(path.resolve(dir, '../../../App.jsx'), 'utf8')
    expect(appSrc).toMatch(/path="\/lab\/thread"/)
    expect(appSrc).toMatch(/ThreadLabPage/)

    render(
      <MemoryRouter initialEntries={['/lab/thread']}>
        <Routes>
          <Route path="/lab/thread" element={<ThreadLabPage />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByTestId('thread-lab-page')).toBeTruthy()
    expect(screen.getByTestId('tm-lab-stand-A')).toBeTruthy()
    expect(screen.getByTestId('tm-lab-stand-B')).toBeTruthy()
    expect(screen.getByTestId('tm-lab-stand-C')).toBeTruthy()
    expect(screen.getByTestId('tm-lab-stand-D')).toBeTruthy()
    expect(screen.getByTestId('tm-lab-stand-E').getAttribute('data-lab-narrow')).toBe('true')
    const open = screen.getByTestId('tm-lab-open-issue-C')
    expect(open.tagName).toBe('BUTTON')
    expect(/** @type {HTMLButtonElement} */ (open).disabled).toBe(false)
  })

  it('package files Present · CSS has skeleton only under loading context (structure)', () => {
    expect(existsSync(path.resolve(dir, '../IssueThreadBlock.jsx'))).toBe(true)
    expect(existsSync(path.resolve(dir, '../ThreadMount.jsx'))).toBe(true)
    expect(existsSync(path.resolve(dir, '../adapters/FixtureAdapter.js'))).toBe(true)
    const css = readFileSync(path.resolve(dir, '../IssueThreadBlock.css'), 'utf8')
    expect(css).toMatch(/tm-issue-thread-block__skeleton/)
    expect(css).toMatch(/Skeletons only for loading/)
  })
})
