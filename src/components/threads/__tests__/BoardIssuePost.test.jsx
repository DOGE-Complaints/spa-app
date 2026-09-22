import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { BoardIssuePost } from '../BoardIssuePost.jsx'
import { IssueThreadBlock } from '../IssueThreadBlock.jsx'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'

function makeT(locale = 'en') {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.en
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) current = current?.[part]
    return typeof current === 'string' ? current : key
  }
}

describe('BoardIssuePost', () => {
  it('wraps civic children + thread with board-issue-post', () => {
    const html = renderToStaticMarkup(
      <BoardIssuePost thread={<IssueThreadBlock status="empty" t={makeT()} />}>
        <div data-testid="civic-stub">Civic</div>
      </BoardIssuePost>,
    )
    expect(html).toContain('data-testid="board-issue-post"')
    expect(html).toContain('data-testid="civic-stub"')
    expect(html).toContain('data-testid="issue-thread-block"')
  })
})
