/**
 * DS §7 ComposerActionRow — attach + secondary + primary submit slot.
 */
export function ComposerActionRow({ children }) {
  return (
    <div className="composer-action-row" data-ds-surface="ComposerActionRow" role="group">
      {children}
    </div>
  )
}
