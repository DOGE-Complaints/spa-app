/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { CommentTree } from '../tree/CommentTree.jsx'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { ThreadMount } from '../ThreadMount.jsx'
import {
  DEFAULT_PREVIEW_NODE_BUDGET,
  SHOW_MORE_COMMENTS_COPY,
  collectDfsPreviewIds,
  countForestNodes,
  resolvePreviewNodeBudget,
} from '../config/threadMountConfig.js'
import { buildCommentForest } from '../tree/buildCommentForest.js'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'
import { FeedLabThreadMount } from '../../feed-lab/post/thread/FeedLabThreadMount.jsx'
import {
  CT21_OVER_BUDGET,
  CT21_WITHIN_BUDGET,
} from '../../feed-lab/fixtures/labCt21Stands.js'

describe('CT-21 previewNodeBudget · default expanded · omit heading', () => {
  afterEach(() => cleanup())

  it('DEFAULT_PREVIEW_NODE_BUDGET is 3 · resolve named knob', () => {
    expect(DEFAULT_PREVIEW_NODE_BUDGET).toBe(3)
    expect(resolvePreviewNodeBudget(undefined)).toBe(3)
    expect(resolvePreviewNodeBudget(5)).toBe(5)
    expect(resolvePreviewNodeBudget('x')).toBe(3)
  })

  it('DFS collect parent → children → next root', () => {
    const forest = buildCommentForest(CT21_OVER_BUDGET)
    expect(forest.mode).toBe('tree')
    expect(countForestNodes(forest.roots)).toBe(5)
    const ids = [...collectDfsPreviewIds(forest.roots, 3)]
    expect(ids).toEqual(['ct21-b0', 'ct21-b1', 'ct21-b2'])
  })

  it('within budget · no Show more · all 3 nodes', () => {
    render(<CommentTree comments={CT21_WITHIN_BUDGET} previewNodeBudget={3} />)
    const tree = screen.getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-preview-budget')).toBe('3')
    expect(tree.getAttribute('data-tm-preview-truncated')).toBe('false')
    expect(screen.queryByTestId('tm-show-more-comments')).toBeNull()
    expect(screen.getByTestId('tm-comment-node-ct21-a')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-ct21-a1')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-ct21-a1a')).toBeTruthy()
  })

  it('over budget · Show more one-shot reveals all · control omitted', () => {
    render(<CommentTree comments={CT21_OVER_BUDGET} previewNodeBudget={3} />)
    const tree = screen.getByTestId('tm-comment-tree')
    expect(tree.getAttribute('data-tm-preview-truncated')).toBe('true')
    expect(screen.getByTestId('tm-comment-node-ct21-b0')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-ct21-b1')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-ct21-b2')).toBeTruthy()
    expect(screen.queryByTestId('tm-comment-node-ct21-b3')).toBeNull()
    const more = screen.getByTestId('tm-show-more-comments')
    expect(more.textContent).toBe(SHOW_MORE_COMMENTS_COPY)
    fireEvent.click(more)
    expect(screen.queryByTestId('tm-show-more-comments')).toBeNull()
    expect(screen.getByTestId('tm-comment-tree').getAttribute('data-tm-preview-truncated')).toBe(
      'false',
    )
    expect(screen.getByTestId('tm-comment-node-ct21-b3')).toBeTruthy()
    expect(screen.getByTestId('tm-comment-node-ct21-b4')).toBeTruthy()
  })

  it('IssueThreadBlock omits Discussion heading · empty honest', () => {
    const { rerender } = render(
      <IssueThreadBlock
        status="populated"
        comments={CT21_WITHIN_BUDGET}
        expanded
        issueId="DOGEstonia-UusVeerenni-002"
      />,
    )
    expect(screen.queryByTestId('tm-thread-heading')).toBeNull()
    expect(screen.queryByTestId('tm-thread-heading-title')).toBeNull()
    expect(screen.queryByText(/Discussion · Issue/)).toBeNull()

    rerender(<IssueThreadBlock status="empty" composerEntry />)
    expect(screen.queryByTestId('tm-thread-heading')).toBeNull()
    expect(screen.getByTestId('tm-thread-empty')).toBeTruthy()
    expect(screen.getByText('No comments yet')).toBeTruthy()
  })

  it('ThreadMount wires preview budget · FeedLab populated default expanded', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        expanded
      />,
    )
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-preview-budget')).toBe('3')
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-lab-ct21')).toBe('true')
    expect(screen.getByTestId('tm-show-more-comments')).toBeTruthy()

    cleanup()
    render(<FeedLabThreadMount comments={CT21_OVER_BUDGET} writeCapability="allowed" />)
    const host = screen.getByTestId('feed-lab-thread-mount')
    expect(host.getAttribute('data-lab-ct21')).toBe('true')
    const mount = within(host).getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-tm-expanded')).toBe('true')
    expect(within(host).getByTestId('tm-comment-tree')).toBeTruthy()
    expect(within(host).getByTestId('tm-show-more-comments')).toBeTruthy()
  })
})
