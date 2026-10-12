/**
 * DS §4 BoardFeedState — composite slot for loading / empty / filtered-empty / error.
 * Aligns named surface; does not invent list semantics.
 *
 * @param {object} props
 * @param {'loading'|'empty'|'filtered-empty'|'error'|'custom'} props.kind
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function BoardFeedState({ kind = 'custom', children, className = '' }) {
  return (
    <div
      className={`board-feed-state board-feed-state--${kind}${className ? ` ${className}` : ''}`}
      data-ds-surface="BoardFeedState"
      data-vl-done-surface="BoardFeedState"
      data-testid="board-feed-state"
      data-feed-state={kind}
    >
      {children}
    </div>
  )
}
