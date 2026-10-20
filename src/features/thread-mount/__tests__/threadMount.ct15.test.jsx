/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { ThreadMount } from '../ThreadMount.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

describe('CT-15 lab host residual · IssueThreadBlock chrome', () => {
  afterEach(() => cleanup())

  it('heading shows Discussion · Issue {id} when issueId provided', () => {
    render(
      <IssueThreadBlock
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        issueId="DOGEstonia-UusVeerenni-002"
      />,
    )
    const title = screen.getByTestId('tm-thread-heading-title')
    expect(title.textContent).toBe('Discussion · Issue DOGEstonia-UusVeerenni-002')
    expect(screen.getByTestId('tm-issue-thread-block').getAttribute('data-tm-issue-id')).toBe(
      'DOGEstonia-UusVeerenni-002',
    )
  })

  it('heading stays Discussion when issueId Absent', () => {
    render(<IssueThreadBlock status="populated" comments={THREAD_NEST_COMMENTS} />)
    expect(screen.getByTestId('tm-thread-heading-title').textContent).toBe('Discussion')
  })

  it('residents row Present only when aggregate confirmed · collapsed', () => {
    const { rerender } = render(
      <IssueThreadBlock
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        expanded={false}
        reactionsAggregateConfirmed={false}
      />,
    )
    expect(screen.queryByTestId('tm-thread-residents-row')).toBeNull()

    rerender(
      <IssueThreadBlock
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        expanded={false}
        reactionsAggregateConfirmed
      />,
    )
    const row = screen.getByTestId('tm-thread-residents-row')
    expect(row.textContent).toMatch(/Reactions from residents/i)
    expect(row.getAttribute('data-tm-residents')).toBe('confirmed')
  })

  it('residents row omitted when expanded even if aggregate confirmed', () => {
    render(
      <IssueThreadBlock
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        expanded
        reactionsAggregateConfirmed
      />,
    )
    expect(screen.queryByTestId('tm-thread-residents-row')).toBeNull()
  })

  it('ThreadMount wires narrow · sticky · ct15 markers', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        narrow
        issueId="fx-issue"
        reactionsAggregateConfirmed
        branchDisclosure
      />,
    )
    const mount = screen.getByTestId('tm-thread-mount')
    expect(mount.getAttribute('data-lab-ct15')).toBe('true')
    expect(mount.getAttribute('data-lab-narrow')).toBe('true')
    expect(mount.getAttribute('data-tm-branch-disclosure')).toBe('true')
    expect(mount.getAttribute('data-tm-issue-id')).toBe('fx-issue')
    expect(mount.getAttribute('data-tm-residents-aggregate')).toBe('confirmed')
    expect(within(mount).getByTestId('tm-thread-residents-row')).toBeTruthy()
  })
})
