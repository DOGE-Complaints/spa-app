/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const nodeCss = readFileSync(path.resolve(dir, '../tree/CommentNode.css'), 'utf8')
const blockCss = readFileSync(path.resolve(dir, '../IssueThreadBlock.css'), 'utf8')
const composerCss = readFileSync(path.resolve(dir, '../composer/ThreadComposer.css'), 'utf8')
const treeCss = readFileSync(path.resolve(dir, '../tree/CommentTree.css'), 'utf8')
const cardCss = readFileSync(
  path.resolve(dir, '../../feed-lab/post/FeedPostCard.css'),
  'utf8',
)

describe('CT-23 thread density · artboard frames only', () => {
  afterEach(() => cleanup())

  it('T04 spine/fill held · CT-26 supersedes bubble/pill outer borders', () => {
    expect(nodeCss).toMatch(/--tm-bubble-fill:\s*#f7f6f2/i)
    expect(nodeCss).toMatch(/--tm-spine-color:\s*#667085/i)
    expect(nodeCss).toMatch(/--tm-action-group-fill:\s*#fffdf8/i)
    /* CT-26 M153d · borderless bubble + pills · pad 8v/12h */
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*padding:\s*8px\s+12px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*border:\s*0/s)
    expect(nodeCss).not.toMatch(/#2[Ee]90[Ff][Aa]/)
  })

  it('T02/T05 · IssueThreadBlock · no nested plate · top hairline only', () => {
    expect(blockCss).toMatch(/border-top:\s*1px\s+solid/)
    expect(blockCss).toMatch(/box-shadow:\s*none/)
    expect(blockCss).toMatch(/background:\s*transparent/)
    expect(blockCss).toMatch(/padding:\s*12px\s+16px\s+16px/)
    expect(blockCss).toMatch(/gap:\s*12px/)
    expect(blockCss).toMatch(/min-height:\s*0/)
    expect(blockCss).not.toMatch(/min-height:\s*4\.5rem/)
    /* no full-box invent */
    expect(blockCss).not.toMatch(/\.tm-issue-thread-block\s*\{[^}]*border:\s*1px\s+solid/s)
  })

  it('T03 spacing · tree M153d 8px · composer artboard held · no denser invent', () => {
    expect(treeCss).toMatch(/gap:\s*8px/)
    expect(treeCss).not.toMatch(/gap:\s*0\.65rem/)
    expect(composerCss).toMatch(/gap:\s*12px/)
    expect(composerCss).toMatch(/padding:\s*12px\s+16px\s+16px/)
    expect(composerCss).toMatch(/background:\s*transparent/)
    expect(composerCss).toMatch(/border-top:\s*1px\s+solid/)
    expect(composerCss).toMatch(/box-shadow:\s*none/)
  })

  it('T02 host · thread-host no nested discussion card', () => {
    expect(cardCss).toMatch(/\.feed-post-card__thread-host\s*\{[\s\S]*?border:\s*0/)
    expect(cardCss).toMatch(/\.feed-post-card__thread-host\s*\{[\s\S]*?background:\s*transparent/)
    expect(cardCss).toMatch(/\.feed-post-card__thread-host\s*\{[\s\S]*?box-shadow:\s*none/)
  })

  it('runtime density markers Present', () => {
    render(
      <IssueThreadBlock status="populated" comments={THREAD_NEST_COMMENTS} expanded={true} />,
    )
    const block = screen.getByTestId('tm-issue-thread-block')
    expect(block.getAttribute('data-lab-ct23')).toBe('true')
    expect(block.getAttribute('data-lab-ct26')).toBe('true')
    expect(block.getAttribute('data-tm-density')).toBe('m153d')
  })
})
