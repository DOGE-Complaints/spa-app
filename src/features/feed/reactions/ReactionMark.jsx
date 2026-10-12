/**
 * DS §8 ReactionMark — catalog glyph or Closed emoji; no invent SVG.
 * Icon lock: SVG only when path Present in iconPack; else emoji from catalog entry.
 */
export function ReactionMark({ entry, icons, className = 'reaction-mark' }) {
  const src = icons && entry?.id ? icons[entry.id] : null
  if (src) {
    return (
      <img
        className={`${className}-icon`}
        data-testid="reaction-mark"
        data-reaction-surface="ReactionMark"
        data-icon-state="catalog"
        data-reaction-id={entry.id}
        src={src}
        alt=""
        aria-hidden="true"
      />
    )
  }
  return (
    <span
      className={`${className}-emoji`}
      data-testid="reaction-mark"
      data-reaction-surface="ReactionMark"
      data-icon-state="omit-emoji-catalog"
      data-reaction-id={entry?.id || ''}
      aria-hidden="true"
    >
      {entry?.emoji || ''}
    </span>
  )
}
