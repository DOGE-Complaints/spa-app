import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../../domain/types.js'
import { UI_DICTIONARY } from '../../../i18n/dictionaries.js'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { IssueCard } from '../IssueCard.jsx'

function makeT(locale = 'en') {
  const dict = UI_DICTIONARY[locale] ?? UI_DICTIONARY.en
  return (key) => {
    const parts = String(key).split('.')
    let current = dict
    for (const part of parts) {
      current = current?.[part]
    }
    return typeof current === 'string' ? current : key
  }
}

function resolveLocalizedText(field, locale = 'en') {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[locale] ?? field.et ?? field.ru ?? field.en ?? ''
}

const minimalIssue = {
  id: 'DE-042',
  type: ISSUE_TYPE.INCIDENT,
  status: ISSUE_STATUS.NEW,
  title: { et: 'Silla remondi viivitus', ru: 'Задержка ремонта моста', en: 'Bridge repair delay' },
  labels: ['waste', 'infrastructure'],
}

const localeStorage = new Map()

function renderIssueCard(node, locale = 'en') {
  localeStorage.set(LOCALE_STORAGE_KEY, locale)
  return renderToStaticMarkup(<I18nProvider>{node}</I18nProvider>)
}

describe('IssueCard', () => {
  beforeEach(() => {
    localeStorage.clear()
    vi.stubGlobal('localStorage', {
      getItem: (key) => (localeStorage.has(key) ? localeStorage.get(key) : null),
      setItem: (key, value) => {
        localeStorage.set(key, value)
      },
      removeItem: (key) => {
        localeStorage.delete(key)
      },
    })
  })

  it('renders id, title, status badge, labels, type', () => {
    const html = renderIssueCard(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('DE-042')
    expect(html).toContain('Bridge repair delay')
    expect(html).toContain('NEW')
    expect(html).toContain('status-badge')
    expect(html).toContain('INCIDENT')
    expect(html).toContain('Waste')
    expect(html).toContain('Infrastructure')
    expect(html).not.toContain('WASTE')
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
    const html = renderIssueCard(
      <IssueCard
        issue={issueWithExtra}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).not.toContain('Hidden description')
    expect(html).not.toContain('arweave-123')
    expect(html).not.toContain('img-456')
    expect(html).not.toContain('hash789')
  })

  it('renders without created_at without layout break', () => {
    const html = renderIssueCard(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('issue-card')
    expect(html).toContain('DE-042')
  })

  it('renders created_at when present', () => {
    const issueWithDate = { ...minimalIssue, created_at: '2025-02-01T12:00:00Z' }
    const html = renderIssueCard(
      <IssueCard
        issue={issueWithDate}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('issue-card-date')
    expect(html).toMatch(/Feb|2025/)
  })

  it('renders summary when present (card shows summary, not full description)', () => {
    const issueWithSummary = {
      ...minimalIssue,
      summary: { et: 'Lühike', ru: 'Краткое', en: 'Short summary for card' },
      description: { en: 'Full long description for details page' },
    }
    const html = renderIssueCard(
      <IssueCard
        issue={issueWithSummary}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('Short summary for card')
    expect(html).not.toContain('Full long description for details page')
  })

  it('uses resolveLocalizedText for title locale', () => {
    const html = renderIssueCard(
      <IssueCard
        issue={minimalIssue}
        locale="ru"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'ru')}
        t={makeT('ru')}
        footerText="Footer"
      />,
      'ru',
    )
    expect(html).toContain('Задержка ремонта моста')
  })

  it('renders as Link when to prop provided', () => {
    const html = renderIssueCard(
      <MemoryRouter>
        <IssueCard
          issue={minimalIssue}
          locale="en"
          resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
          t={makeT('en')}
          footerText="Footer"
          to="/issue/DE-042"
        />
      </MemoryRouter>,
    )
    expect(html).toContain('href="/issue/DE-042"')
  })

  it('renders as article when to not provided', () => {
    const html = renderIssueCard(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('<article')
  })

  it('renders MT marker when locale is outside original_locale', () => {
    const issueWithMt = {
      ...minimalIssue,
      original_locale: ['ru'],
    }
    const html = renderIssueCard(
      <IssueCard
        issue={issueWithMt}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('translation-marker-mt')
    expect(html).toContain('Machine translation')
  })

  it('does not render MT marker when original_locale is absent', () => {
    const html = renderIssueCard(
      <IssueCard
        issue={minimalIssue}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).not.toContain('translation-marker-mt')
  })

  it('renders untranslated label marker for humanized label keys', () => {
    const issueWithOutsideLabel = {
      ...minimalIssue,
      labels: ['road_safety'],
    }
    const html = renderIssueCard(
      <IssueCard
        issue={issueWithOutsideLabel}
        locale="en"
        resolveLocalizedText={(f) => resolveLocalizedText(f, 'en')}
        t={makeT('en')}
        footerText="Footer"
      />,
    )
    expect(html).toContain('translation-marker-untranslated-label')
    expect(html).toContain('No translation')
  })
})
