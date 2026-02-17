import './EmptyState.css'

/**
 * Empty state block: icon + text, no CTA.
 * Used for no-issues, no-results placeholder per design system.
 *
 * @param {{ message: string }} props
 */
export function EmptyState({ message }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <img src="/favicon.svg" alt="" className="empty-state-icon" aria-hidden />
      <p className="empty-state-message">{message}</p>
    </div>
  )
}
