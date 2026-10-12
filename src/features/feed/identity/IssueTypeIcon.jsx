import './IssueTypeIcon.css'

/**
 * Civic category icon slot (DS §5 IssueTypeIcon).
 * No invent SVG masters — Present only when `src` Closed; else honest omit (Q6 lock Absent).
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
      data-issue-type={type || undefined}
      aria-hidden={hasSrc ? undefined : true}
      role={hasSrc ? 'img' : undefined}
      aria-label={hasSrc ? `Issue type ${type}` : undefined}
    >
      {hasSrc ? (
        <img className="issue-type-icon-img" src={src} alt="" width={28} height={28} />
      ) : null}
    </span>
  )
}
