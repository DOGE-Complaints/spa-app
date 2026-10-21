import { ShellChromeIcon } from '../../../components/AppShell/ShellChromeIcon.jsx'
import './IssueTypeIcon.css'

/**
 * Civic category icon slot (DS §5 · M161 / NF-13 · CT-32 theme-safe mask).
 * Present only when `src` Closed; else honest omit — no invent glyph.
 * Geometry: slot 48×48 · radius 12 · glyph 24×24 centered.
 *
 * @param {{
 *   src?: string | null,
 *   type?: string,
 *   lockState?: 'present' | 'omit' | 'absent',
 * }} props
 */
export function IssueTypeIcon({ src = null, type = '', lockState }) {
  const hasSrc = typeof src === 'string' && src.trim().length > 0
  const state = lockState ?? (hasSrc ? 'present' : 'omit')
  return (
    <span
      className="issue-type-icon"
      data-testid="issue-type-icon"
      data-icon-state={state}
      data-civic-identity-icon={hasSrc ? 'present' : 'omit-catalog-gap'}
      data-ct32-type="mask"
      data-issue-type={type || undefined}
      aria-hidden={hasSrc ? undefined : true}
      role={hasSrc ? 'img' : undefined}
      aria-label={hasSrc ? `Issue type ${type}` : undefined}
    >
      {hasSrc ? (
        <ShellChromeIcon src={src} size={24} className="issue-type-icon-img" testId="issue-type-icon-glyph" />
      ) : null}
    </span>
  )
}
