import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
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

describe('IssueThreadBlock', () => {
  it('projects issue-thread-block testid', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="empty" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-block"')
  })

  it('loading shows restrained chrome without fake comments', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="loading" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-loading"')
    expect(html).toContain('Loading discussion')
    expect(html).not.toContain('data-testid="issue-thread-composer"')
  })

  it('empty shows honest empty + composer', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="empty" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-empty"')
    expect(html).toContain('No comments yet')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-testid="issue-thread-actions"')
  })

  it('unavailable fail-soft keeps message without inventing HTTP', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="unavailable" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-unavailable"')
    expect(html).toContain('Discussion unavailable')
    expect(html).not.toContain('data-testid="issue-thread-actions"')
  })

  it('populated projects summary + open-tree + reaction + composer slots', () => {
    const html = renderToStaticMarkup(<IssueThreadBlock status="populated" t={makeT()} />)
    expect(html).toContain('data-testid="issue-thread-populated"')
    expect(html).toContain('data-testid="issue-thread-summary"')
    expect(html).toContain('data-testid="issue-thread-open-tree"')
    expect(html).toContain('data-testid="issue-thread-reaction-slot"')
    expect(html).toContain('data-testid="issue-thread-composer"')
    expect(html).toContain('data-testid="issue-thread-actions"')
  })
})
