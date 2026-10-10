import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { makeFeedThreadT } from '../feedThreadT.js'
import { IssueThreadBlock } from '../../../components/threads/IssueThreadBlock.jsx'
import { ReactionControls } from '../../../components/threads/ReactionControls.jsx'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('NF-05 reactions + invite stub + write gate', () => {
  it('exposes nextFeed.gate.* flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.gate.verifyRequired')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.gate.deniedGeneric')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.gate.draftPreserved')
  })

  it('makeFeedThreadT remaps verify gate gaps', () => {
    const t = (k) =>
      ({
        'nextFeed.gate.verifyRequired': 'Verify your identity to post',
        'threadsFeed.verify.cta': 'fallback',
      })[k] || k
    const ft = makeFeedThreadT(t)
    expect(ft('threadsFeed.verify.cta')).toBe('Verify your identity to post')
  })

  it('wires next-feed reaction/invite icons and invite stub', () => {
    const t = (k) => k
    const html = renderUi(
      <IssueThreadBlock
        status="empty"
        t={t}
        showInviteStub
        iconPack={NEXT_FEED_THREAD_ICONS}
        identityVerified={false}
      />,
    )
    expect(html).toContain('data-testid="invite-organization-stub"')
    expect(html).toContain('/icons/next-feed/actions/collaboration-invite.svg')
    expect(html).toContain('/icons/next-feed/actions/react.svg')
    expect(html).toContain('data-testid="reaction-controls"')
    expect(html).not.toContain('people-list')
    expect(html).not.toContain('data-testid="reaction-people"')
  })

  it('reaction pack uses catalog SVGs for acknowledge/support/agree', () => {
    expect(NEXT_FEED_THREAD_ICONS.acknowledge).toBe('/icons/next-feed/reactions/acknowledge.svg')
    expect(NEXT_FEED_THREAD_ICONS.support).toBe('/icons/next-feed/reactions/support.svg')
    expect(NEXT_FEED_THREAD_ICONS.agree).toBe('/icons/next-feed/reactions/agree.svg')
    expect(NEXT_FEED_THREAD_ICONS.off_topic).toBe('/icons/next-feed/reactions/off-topic.svg')
    const t = (k) => k
    const html = renderUi(
      <ReactionControls
        t={t}
        target="thread-root"
        iconPack={NEXT_FEED_THREAD_ICONS}
        summaryMarks={[{ reaction_id: 'acknowledge', count: 2 }]}
        aggregateCount={2}
      />,
    )
    expect(html).toContain('/icons/next-feed/reactions/acknowledge.svg')
    expect(html).toContain('/icons/next-feed/actions/react.svg')
  })
})
