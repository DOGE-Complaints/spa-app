/** DS §8 ReactionScopeHint — knobs / exclusivity honesty. */
export function ReactionScopeHint({ children, testId = 'reaction-scope-hint', role = 'status' }) {
  if (!children) return null
  return (
    <p
      className="reaction-scope-hint"
      data-testid={testId}
      data-reaction-surface="ReactionScopeHint"
      role={role}
    >
      {children}
    </p>
  )
}
