import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { NEXT_FEED_FLAT_KEYS } from '../../../i18n/nextFeedDictionary.js'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { makeFeedThreadT } from '../feedThreadT.js'
import { IssueThreadBlock } from '../../../components/threads/IssueThreadBlock.jsx'

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

describe('NF-04 feed thread + composer', () => {
  it('exposes nextFeed.thread.* flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.thread.empty')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.thread.attachDenied')
    expect(NEXT_FEED_FLAT_KEYS).toContain('nextFeed.thread.maxDepth')
  })

  it('makeFeedThreadT remaps empty/attach/maxDepth gaps', () => {
    const t = (k) =>
      ({
        'nextFeed.thread.empty': 'No comments yet',
        'threadsFeed.post.empty.title': 'fallback',
      })[k] || k
    const ft = makeFeedThreadT(t)
    expect(ft('threadsFeed.post.empty.title')).toBe('No comments yet')
  })

  it('renders next-feed catalog icons and literal comment bodies', () => {
    const t = (k) => k
    const html = renderUi(
      <IssueThreadBlock
        status="populated"
        t={t}
        showInviteStub={false}
        iconPack={NEXT_FEED_THREAD_ICONS}
        comments={[
          {
            id: 'c1',
            depth: 0,
            body: 'I can help coordinate a shared pet-care group for neighbours.',
            label: 'preview',
          },
        ]}
      />,
    )
    expect(html).toContain('data-testid="issue-thread-block"')
    expect(html).toContain('/icons/next-feed/actions/reply.svg')
    expect(html).toContain('/icons/next-feed/actions/attach.svg')
    expect(html).toContain('/icons/next-feed/actions/send.svg')
    expect(html).toContain('I can help coordinate a shared pet-care group for neighbours.')
    expect(html).not.toContain('data-testid="invite-organization-stub"')
    expect(html).toContain('data-testid="issue-thread-composer"')
  })

  it('catalog icon pack points at next-feed / next-shell URLs', () => {
    expect(NEXT_FEED_THREAD_ICONS.reply).toBe('/icons/next-feed/actions/reply.svg')
    expect(NEXT_FEED_THREAD_ICONS.close).toBe('/icons/next-shell/actions/close.svg')
  })
})
