import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../../domain/types.js'
import { IssueCard } from '../IssueCard.jsx'

function resolveLocalizedText(field, locale = 'en') {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[locale] ?? field.et ?? field.ru ?? field.en ?? ''
}

const minimalIssue = {
  id: 'DE-042',
  type: ISSUE_TYPE.COMPLAINT,
  status: ISSUE_STATUS.NEW,
  title: { et: 'Silla remondi viivitus', ru: 'Задержка ремонта моста', en: 'Bridge repair delay' },
  labels: ['bureaucracy', 'infrastructure'],
}

describe('IssueCard', () => {
  it('renders id, title, status badge, labels, type', () => {
    const html = renderToStaticMarkup(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('DE-042')
    expect(html).toContain('Bridge repair delay')
    expect(html).toContain('NEW')
    expect(html).toContain('status-badge')
    expect(html).toContain('COMPLAINT')
    expect(html).toContain('BUREAUCRACY')
    expect(html).toContain('INFRASTRUCTURE')
    expect(html).toContain('Footer')
  })

  it('does not render description, arweave_txid, image_txid', () => {
    const issueWithExtra = {
      ...minimalIssue,
      description: { en: 'Hidden description' },
      arweave_txid: 'arweave-123',
      image_txid: 'img-456',
      image_hash: 'hash789',
    }
    const html = renderToStaticMarkup(
      <IssueCard
        issue={issueWithExtra}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        footerText="Footer"
      />,
    )
    expect(html).not.toContain('Hidden description')
    expect(html).not.toContain('arweave-123')
    expect(html).not.toContain('img-456')
    expect(html).not.toContain('hash789')
  })

  it('renders without created_at without layout break', () => {
    const html = renderToStaticMarkup(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('issue-card')
    expect(html).toContain('DE-042')
  })

  it('renders created_at when present', () => {
    const issueWithDate = { ...minimalIssue, created_at: '2025-02-01T12:00:00Z' }
    const html = renderToStaticMarkup(
      <IssueCard
        issue={issueWithDate}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('issue-card-date')
    expect(html).toMatch(/Feb|2025/)
  })

  it('uses resolveLocalizedText for title locale', () => {
    const html = renderToStaticMarkup(
      <IssueCard
        issue={minimalIssue}
        locale="ru"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'ru')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('Задержка ремонта моста')
  })

  it('renders as Link when to prop provided', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <IssueCard
          issue={minimalIssue}
          locale="en"
          resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
          footerText="Footer"
          to="/issue/DE-042"
        />
      </MemoryRouter>,
    )
    expect(html).toContain('href="/issue/DE-042"')
  })

  it('renders as article when to not provided', () => {
    const html = renderToStaticMarkup(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('<article')
  })
})
