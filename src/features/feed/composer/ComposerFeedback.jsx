/**
 * DS §7 ComposerFeedback — attach denied / post fail / max-depth local honesty.
 */
export function ComposerFeedback({ variant = 'warning', children, testId, role = 'alert' }) {
  return (
    <div
      className={`composer-feedback composer-feedback--${variant}`}
      data-ds-surface="ComposerFeedback"
      data-testid={testId}
      role={role}
    >
      {children}
    </div>
  )
}
