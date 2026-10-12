import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { FeedReactionsStrip } from '../FeedReactionsStrip.jsx'
import {
  ReactionAggregateStrip,
  ReactionChrome,
  ReactionMark,
} from '../reactions/index.js'
import { listReactionsV1 } from '../semantics/reactionsV1.js'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

function makeT() {
  return (key) =>
    ({
      'threadsFeed.reactions.react': 'React',
      'threadsFeed.reactions.viewReactions': 'View reactions',
      'threadsFeed.reactions.close': 'Close',
      'threadsFeed.reactions.chooseUpTo': 'Choose up to 3 reactions',
      'threadsFeed.reactions.layer.emotional': 'Emotional',
      'threadsFeed.reactions.layer.epistemic': 'Epistemic',
      'threadsFeed.reactions.layer.moderation': 'Moderation',
      'threadsFeed.reactions.id.acknowledge': 'Acknowledge',
      'threadsFeed.reactions.id.agree': 'Agree',
    })[key] || key
}

describe('NF-VL-03 reactions chrome atoms (AD-VL-01/02/03 · DS §8)', () => {
  it('exports named DS surfaces', () => {
    const html = renderToStaticMarkup(
      <ReactionMark
        entry={{ id: 'acknowledge', emoji: '👀' }}
        icons={NEXT_FEED_THREAD_ICONS}
      />,
    )
    expect(html).toContain('data-reaction-surface="ReactionMark"')
    expect(html).toContain('/icons/next-feed/reactions/acknowledge.svg')
  })

  it('ReactionChrome mounts aggregate strip without classic ReactionControls', () => {
    const html = renderUi(
      <ReactionChrome
        t={makeT()}
        target="thread-root"
        iconPack={NEXT_FEED_THREAD_ICONS}
        summaryMarks={[{ reaction_id: 'acknowledge', count: 2 }]}
        aggregateCount={2}
        hideZeroCount
      />,
    )
    expect(html).toContain('data-testid="reaction-chrome"')
    expect(html).toContain('data-testid="reaction-aggregate-strip"')
    expect(html).toContain('data-reaction-surface="ReactionAggregateStrip"')
    expect(html).toContain('data-catalog="reactions.v1"')
    expect(html).not.toContain('data-testid="reaction-controls"')
  })

  it('FeedReactionsStrip Done path uses ReactionChrome', () => {
    const html = renderUi(
      <FeedReactionsStrip
        t={makeT()}
        target="thread-root"
        iconPack={NEXT_FEED_THREAD_ICONS}
        aggregateCount={0}
        summaryMarks={[]}
      />,
    )
    expect(html).toContain('data-vl-done-surface="ReactionChrome"')
    expect(html).toContain('data-testid="reaction-aggregate-strip"')
    expect(html).not.toContain('data-testid="reaction-controls"')
    expect(html).not.toContain('people-list')
  })

  it('semantics seam lists Closed reactions.v1 without invent ids', () => {
    const ids = listReactionsV1({ target: 'comment' }).map((e) => e.id)
    expect(ids).toContain('acknowledge')
    expect(ids).not.toContain('invent-orb')
  })

  it('ReactionAggregateStrip empty honesty', () => {
    const html = renderToStaticMarkup(
      <ReactionAggregateStrip
        marks={[]}
        count={0}
        showCount={false}
        open={false}
        busy={false}
        panelId="p1"
        icons={NEXT_FEED_THREAD_ICONS}
        t={makeT()}
        labelFor={(id) => id}
        onToggleOpen={() => {}}
      />,
    )
    expect(html).toContain('data-empty="true"')
  })
})
