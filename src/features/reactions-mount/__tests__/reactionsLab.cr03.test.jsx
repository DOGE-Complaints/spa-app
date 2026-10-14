/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ReactionsLabPage } from '../../../pages/ReactionsLabPage.jsx'
import {
  createFixtureAdapter,
  createLiveAdapter,
  ReactionsLabCanvas,
} from '../index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const appSrc = readFileSync(path.resolve(dir, '../../../App.jsx'), 'utf8')

describe('CR-03 lab reactions page', () => {
  afterEach(() => cleanup())

  it('registers #/lab/reactions under shell Routes (pattern lab/feed)', () => {
    expect(appSrc).toMatch(/path="\/lab\/feed"/)
    expect(appSrc).toMatch(/path="\/lab\/reactions"/)
    expect(appSrc).toMatch(/ReactionsLabPage/)
    // Lab route is sibling to next/feed — not a cutover of product feed.
    expect(appSrc).toMatch(/path="\/next\/feed"/)
    expect(appSrc.indexOf('path="/lab/reactions"')).toBeGreaterThan(
      appSrc.indexOf('path="/lab/feed"'),
    )
  })

  it('lab page renders with FixtureAdapter default and M155 OOS', () => {
    render(
      <MemoryRouter initialEntries={['/lab/reactions']}>
        <Routes>
          <Route path="/lab/reactions" element={<ReactionsLabPage />} />
        </Routes>
      </MemoryRouter>,
    )
    const page = screen.getByTestId('reactions-lab-page')
    expect(page.getAttribute('data-rm-adapter-default')).toBe('fixture')
    expect(page.getAttribute('data-m155-oos')).toBe('true')
    expect(page.getAttribute('data-lab-visual-done')).toBe('false')
    expect(page.getAttribute('data-next-feed-cutover')).toBe('oos')
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )
  })

  it('two fixture hosts: thread-root + comment', () => {
    render(<ReactionsLabCanvas />)
    expect(screen.getByTestId('rm-lab-host-root')).toBeTruthy()
    expect(screen.getByTestId('rm-lab-host-comment')).toBeTruthy()
    const rootMount = screen
      .getByTestId('rm-lab-host-root')
      .querySelector('[data-testid="reactions-mount"]')
    const commentMount = screen
      .getByTestId('rm-lab-host-comment')
      .querySelector('[data-testid="reactions-mount"]')
    expect(rootMount?.getAttribute('data-rm-target')).toBe('thread-root')
    expect(commentMount?.getAttribute('data-rm-target')).toBe('comment')
    expect(rootMount?.getAttribute('data-rm-moderation')).toBe('absent')
    expect(commentMount?.getAttribute('data-rm-moderation')).toBe('eligible')
  })

  it('FixtureAdapter kind=fixture · LiveAdapter wraps ThreadsSocialClient only', async () => {
    const fixture = createFixtureAdapter({ initialState: 'populated' })
    expect(fixture.kind).toBe('fixture')
    const snap = fixture.snapshot()
    expect(snap.selected).toContain('acknowledge')

    const react = vi.fn(async () => ({
      status: 'ok',
      data: { selected: ['support'], summary_marks: [], aggregate_count: 1 },
    }))
    const getKnobs = vi.fn(async () => ({
      status: 'ok',
      data: { max_reactions_per_actor: 3 },
    }))
    const live = createLiveAdapter({
      client: { react, getKnobs },
      issueId: 'issue-1',
    })
    expect(live.kind).toBe('live')
    await live.loadKnobs()
    expect(getKnobs).toHaveBeenCalled()
    const result = await live.onReact({
      reactionId: 'support',
      op: 'add',
      target: 'thread-root',
    })
    expect(react).toHaveBeenCalledWith(
      expect.objectContaining({
        issueId: 'issue-1',
        targetKind: 'thread_root',
        reactionId: 'support',
        op: 'add',
      }),
    )
    expect(result.status).toBe('ok')
  })

  it('adapter toggle can select live but default remains fixture until clicked', () => {
    render(<ReactionsLabCanvas />)
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )
    fireEvent.click(screen.getByTestId('rm-lab-adapter-live'))
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe('live')
    fireEvent.click(screen.getByTestId('rm-lab-adapter-fixture'))
    expect(screen.getByTestId('reactions-lab-canvas').getAttribute('data-rm-adapter')).toBe(
      'fixture',
    )
  })
})
