import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ISSUE_STATUS } from '../../domain/types.js'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { StatusBadge } from '../StatusBadge.jsx'

const localeStorage = new Map()

function renderBadge(status) {
  return renderToStaticMarkup(
    <I18nProvider>
      <StatusBadge status={status} />
    </I18nProvider>,
  )
}

describe('StatusBadge', () => {
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
    localeStorage.set(LOCALE_STORAGE_KEY, 'en')
  })

  it('renders canonical EN label for IN_REVIEW', () => {
    const html = renderBadge(ISSUE_STATUS.IN_REVIEW)
    expect(html).toContain('IN REVIEW')
    expect(html).toContain('status-badge-in-review')
  })

  it('renders PUBLISHED status label', () => {
    const html = renderBadge(ISSUE_STATUS.PUBLISHED)
    expect(html).toContain('PUBLISHED')
    expect(html).toContain('status-badge-published')
    expect(html).not.toContain('status-badge-icon')
  })

  it('falls back to UNKNOWN variant for unexpected value', () => {
    const html = renderBadge('INVALID')
    expect(html).toContain('status-badge-unknown')
    expect(html).toContain('UNKNOWN')
  })
})
