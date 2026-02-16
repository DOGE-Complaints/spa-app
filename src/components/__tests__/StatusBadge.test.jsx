import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ISSUE_STATUS } from '../../domain/types.js'
import { StatusBadge } from '../StatusBadge.jsx'

describe('StatusBadge', () => {
  it('renders canonical EN label for IN_REVIEW', () => {
    const html = renderToStaticMarkup(<StatusBadge status={ISSUE_STATUS.IN_REVIEW} locale="en" />)
    expect(html).toContain('IN REVIEW')
    expect(html).toContain('status-badge-in-review')
  })

  it('renders VERIFIED status label with icon', () => {
    const html = renderToStaticMarkup(<StatusBadge status={ISSUE_STATUS.VERIFIED} locale="en" />)
    expect(html).toContain('VERIFIED')
    expect(html).toContain('status-badge-icon')
    expect(html).toContain('favicon.svg')
  })

  it('falls back to UNKNOWN variant for unexpected value', () => {
    const html = renderToStaticMarkup(<StatusBadge status="INVALID" locale="en" />)
    expect(html).toContain('status-badge-unknown')
    expect(html).toContain('UNKNOWN')
  })
})
