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

  it('renders VERIFIED status label without prefix marker', () => {
    const html = renderToStaticMarkup(<StatusBadge status={ISSUE_STATUS.VERIFIED} locale="en" />)
    expect(html).toContain('VERIFIED')
    expect(html).not.toContain('status-badge-marker')
  })

  it('falls back to UNKNOWN variant for unexpected value', () => {
    const html = renderToStaticMarkup(<StatusBadge status="INVALID" locale="en" />)
    expect(html).toContain('status-badge-unknown')
    expect(html).toContain('UNKNOWN')
  })
})
