/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { ThreadComposer } from '../composer/ThreadComposer.jsx'
import { THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const nodeCss = readFileSync(path.resolve(dir, '../tree/CommentNode.css'), 'utf8')
const tokensCss = readFileSync(path.resolve(dir, '../../../styles/tokens.css'), 'utf8')
const treeCss = readFileSync(path.resolve(dir, '../tree/CommentTree.css'), 'utf8')
const attachCss = readFileSync(path.resolve(dir, '../composer/AttachmentRef.css'), 'utf8')

describe('CT-26 density v2 · M153d borderless fill', () => {
  afterEach(() => cleanup())

  it('T01 bubble · no outer stroke · fill · pad 8v/12h', () => {
    /* CT-32: light cream in tokens.css · cascade via var */
    expect(nodeCss).toMatch(/background:\s*var\(--tm-bubble-fill/i)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--tm-bubble-fill:\s*#f7f6f2/i)
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*padding:\s*8px\s+12px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*border:\s*0/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*border-radius:\s*12px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__bubble\s*\{[^}]*box-shadow:\s*none/s)
    expect(nodeCss).not.toMatch(
      /\.tm-comment-node__bubble\s*\{[^}]*border:\s*1px\s+solid/s,
    )
  })

  it('T02 action pills · no outer stroke · 4v/8h · min-height 44 · sep held', () => {
    expect(nodeCss).toMatch(/var\(--tm-action-group-fill/i)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--tm-action-group-fill:\s*#fffdf8/i)
    expect(nodeCss).toMatch(/\.tm-comment-node__action-pills\s*\{[^}]*border:\s*0/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__action-pills\s*\{[^}]*box-shadow:\s*none/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__pill\s*\{[^}]*padding:\s*4px\s+8px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__pill\s*\{[^}]*min-height:\s*44px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__action-sep\s*\{[^}]*height:\s*16px/s)
    expect(nodeCss).not.toMatch(
      /\.tm-comment-node__action-pills\s*\{[^}]*border:\s*1px\s+solid/s,
    )
  })

  it('T03 gaps · bubble→actions 4 · node→next 8', () => {
    expect(nodeCss).toMatch(/\.tm-comment-node__actions\s*\{[^}]*margin-top:\s*4px/s)
    expect(nodeCss).toMatch(/\.tm-comment-node__children\s*\{[^}]*gap:\s*8px/s)
    expect(treeCss).toMatch(/\.tm-comment-tree\s*\{[^}]*gap:\s*8px/s)
    expect(treeCss).toMatch(/\.tm-comment-tree__list\s*\{[^}]*gap:\s*8px/s)
  })

  it('T04 spine + reply-parent stripe Present', () => {
    /* CT-32: spine/marker hex in tokens.css light · cascade via var */
    expect(nodeCss).toMatch(/var\(--tm-spine-color/i)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--tm-spine-color:\s*#667085/i)
    expect(nodeCss).toMatch(/\.tm-comment-node__children--spine\s*\{[^}]*border-left:\s*1px\s+solid/s)
    expect(nodeCss).toMatch(
      /\.tm-comment-node__bubble--reply-parent::before\s*\{[^}]*width:\s*3px/s,
    )
    expect(nodeCss).toMatch(/var\(--tm-reply-parent-marker/i)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\][\s\S]*--tm-reply-parent-marker:\s*#b54708/i)
  })

  it('T04 AttachmentRef chip borders unchanged (M153b §7 / M153c)', () => {
    expect(attachCss).toMatch(/\.tm-attachment-ref\s*\{[^}]*border:\s*1px\s+solid\s*#e7e4dc/s)
    expect(attachCss).toMatch(/\.tm-attachment-ref--denied[\s\S]*border-color:\s*#b54708/i)
    expect(attachCss).toMatch(/\.tm-attachment-ref--ready[\s\S]*background:\s*#fffdf8/i)
  })

  it('runtime density-v2 markers Present', () => {
    render(
      <IssueThreadBlock status="populated" comments={THREAD_NEST_COMMENTS} expanded={true} />,
    )
    const block = screen.getByTestId('tm-issue-thread-block')
    expect(block.getAttribute('data-lab-ct26')).toBe('true')
    expect(block.getAttribute('data-tm-density')).toBe('m153d')
    expect(document.querySelector('.tm-comment-node__bubble')).toBeTruthy()
    expect(document.querySelector('.tm-comment-node__action-pills')).toBeTruthy()
  })

  it('composer shell still mounts (AttachmentRef borders CSS-held)', () => {
    render(<ThreadComposer maxAttachments={3} draft="" onDraftChange={() => {}} />)
    expect(screen.getByTestId('tm-thread-composer')).toBeTruthy()
  })
})
