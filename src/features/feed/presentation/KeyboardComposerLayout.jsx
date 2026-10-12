/**
 * DS §2 KeyboardComposerLayout — keeps composer (+ reply context) above keyboard / safe area.
 * Web translate of keyboard inset; does not invent native keyboard APIs.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.active]
 */
export function KeyboardComposerLayout({ children, className = '', active = true }) {
  if (!children) return null
  return (
    <div
      className={`keyboard-composer-layout${active ? ' is-active' : ''}${
        className ? ` ${className}` : ''
      }`}
      data-ds-surface="KeyboardComposerLayout"
      data-vl-done-surface="KeyboardComposerLayout"
      data-testid="keyboard-composer-layout"
      data-keyboard-inset={active ? 'true' : 'false'}
      style={
        active
          ? {
              paddingBottom:
                'max(0px, env(safe-area-inset-bottom, 0px), var(--keyboard-inset, 0px))',
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}
