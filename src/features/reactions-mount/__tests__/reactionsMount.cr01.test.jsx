/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import {
  ReactionsMount,
  ReactionSummaryStrip,
  CR_REACTION_ICON_PACK,
  CR_SELECTABLE_MARK_IDS,
  CR_OMIT_SELECTABLE_IDS,
  createFixtureAdapter,
  STRIP_STATE_FIXTURES,
  POST_ACTION_STRIP_ZONES,
  resolveReactionsMountTargetConfig,
  REACTIONS_MOUNT_SLOT_KINDS,
} from '../index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))

function t(key) {
  const parts = String(key).split('.')
  let cur = THREADS_FEED_DICTIONARY_EN
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return key
    cur = cur[p]
  }
  return typeof cur === 'string' ? cur : key
}

describe('CR-01 reactions-mount package', () => {
  afterEach(() => cleanup())

  it('ships 13 CR-icon mark Runtime URLs under /icons/next-feed/reactions/', () => {
    expect(CR_SELECTABLE_MARK_IDS).toHaveLength(13)
    for (const id of CR_SELECTABLE_MARK_IDS) {
      expect(CR_REACTION_ICON_PACK[id]).toMatch(/^\/icons\/next-feed\/reactions\//)
    }
    expect(CR_REACTION_ICON_PACK.react).toBe('/icons/next-feed/actions/react.svg')
    expect(CR_REACTION_ICON_PACK.retry).toBe('/icons/next-feed/actions/retry.svg')
    expect(CR_REACTION_ICON_PACK.unavailable).toBe('/icons/next-feed/status/unavailable.svg')
    expect(CR_OMIT_SELECTABLE_IDS).toEqual(['hopeful', 'amused'])
  })

  it('empty strip has React affordance and no theatrical zero count', () => {
    render(
      <ReactionSummaryStrip
        stripStatus="ready"
        summaryMarks={[]}
        aggregateCount={0}
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-strip').getAttribute('data-rm-strip-status')).toBe(
      'empty',
    )
    expect(screen.getByTestId('reaction-summary-react')).toBeTruthy()
    expect(screen.queryByTestId('reaction-summary-count')).toBeNull()
  })

  it('loading and unavailable states stay scoped to the strip slot', () => {
    const { rerender } = render(
      <ReactionSummaryStrip stripStatus="loading" t={t} />,
    )
    expect(screen.getByTestId('reaction-summary-strip').getAttribute('data-rm-strip-status')).toBe(
      'loading',
    )
    rerender(
      <ReactionSummaryStrip stripStatus="error" t={t} onRetry={() => {}} />,
    )
    expect(screen.getByTestId('reaction-summary-strip').getAttribute('data-rm-strip-status')).toBe(
      'unavailable',
    )
    expect(screen.getByText(t('threadsFeed.reactions.unavailable'))).toBeTruthy()
    expect(screen.getByTestId('reaction-summary-retry')).toBeTruthy()
  })

  it('populated strip renders CR-icon mark URLs (no emoji interim)', () => {
    const { container } = render(
      <ReactionSummaryStrip
        stripStatus="ready"
        summaryMarks={STRIP_STATE_FIXTURES.populated.summaryMarks}
        aggregateCount={7}
        t={t}
      />,
    )
    expect(screen.getByTestId('reaction-summary-strip').getAttribute('data-rm-strip-status')).toBe(
      'populated',
    )
    expect(screen.getByTestId('reaction-summary-count').textContent).toBe('7')
    const html = container.innerHTML
    expect(html).toContain('/icons/next-feed/reactions/acknowledge.svg')
    expect(html).toContain('/icons/next-feed/reactions/support.svg')
    expect(html).toContain('/icons/next-feed/actions/react.svg')
    expect(html).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
  })

  it('mount props: target root omits moderation; comment keeps eligibility', () => {
    const { rerender } = render(
      <ReactionsMount target="thread-root" t={t} stripStatus="ready" summaryMarks={[]} />,
    )
    const root = screen.getByTestId('reactions-mount')
    expect(root.getAttribute('data-rm-target')).toBe('thread-root')
    expect(root.getAttribute('data-rm-moderation')).toBe('absent')
    expect(root.getAttribute('data-rm-slot')).toBe(REACTIONS_MOUNT_SLOT_KINDS.POST_ACTION_STRIP)
    const rootIds = screen.getByTestId('reactions-mount-enabled-ids').textContent
    expect(rootIds).not.toContain('off_topic')
    expect(rootIds).not.toContain('aggressive')
    expect(rootIds).not.toContain('hopeful')
    expect(rootIds).not.toContain('amused')

    rerender(
      <ReactionsMount
        target="comment"
        slot={REACTIONS_MOUNT_SLOT_KINDS.COMMENT_NODE}
        t={t}
        stripStatus="ready"
        summaryMarks={[]}
      />,
    )
    const comment = screen.getByTestId('reactions-mount')
    expect(comment.getAttribute('data-rm-moderation')).toBe('eligible')
    const commentIds = screen.getByTestId('reactions-mount-enabled-ids').textContent
    expect(commentIds).toContain('off_topic')
    expect(commentIds).toContain('aggressive')
  })

  it('PostActionStrip slot contract documents four zones · no fifth strip', () => {
    expect(POST_ACTION_STRIP_ZONES).toEqual(['react', 'comment', 'share', 'reactions'])
    expect(resolveReactionsMountTargetConfig('thread-root').moderationSelectable).toBe(false)
    expect(resolveReactionsMountTargetConfig('comment').moderationSelectable).toBe(true)
  })

  it('FixtureAdapter onReact matches Chrome result shape · no HTTP', async () => {
    const adapter = createFixtureAdapter({ initialState: 'empty', target: 'thread-root' })
    const result = await adapter.onReact({
      reactionId: 'acknowledge',
      op: 'add',
      target: 'thread-root',
      commentId: null,
    })
    expect(result.status).toBe('ok')
    expect(result.data.selected).toContain('acknowledge')
    expect(result.data.summary_marks).toEqual(
      expect.arrayContaining([expect.objectContaining({ reaction_id: 'acknowledge' })]),
    )
    expect(adapter.onAggregateActivate().data.oos).toBe('M155')
  })

  it('onOpen seam fires from React affordance', () => {
    const onOpen = vi.fn()
    render(
      <ReactionsMount
        target="thread-root"
        t={t}
        stripStatus="ready"
        summaryMarks={[]}
        onOpen={onOpen}
      />,
    )
    fireEvent.click(screen.getByTestId('reaction-summary-react'))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen.mock.calls[0][0].target).toBe('thread-root')
  })

  it('package source lives under features/reactions-mount (greenfield)', () => {
    const mountSrc = readFileSync(path.resolve(dir, '../ReactionsMount.jsx'), 'utf8')
    expect(mountSrc).toContain('data-rm-package="reactions-mount"')
    expect(mountSrc).not.toMatch(/ReactionControls/)
  })
})
