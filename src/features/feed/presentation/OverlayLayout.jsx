/**
 * DS §2 OverlayLayout — shared geometry: scrim + panel (centered dialog / full-screen sheet).
 *
 * @param {object} props
 * @param {'centeredDialog'|'fullScreenSheet'} [props.variant]
 * @param {string} [props.scrimLabel]
 * @param {() => void} [props.onScrimClick]
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.panelClassName]
 * @param {object} [props.panelProps]
 */
export function OverlayLayout({
  variant = 'centeredDialog',
  scrimLabel,
  onScrimClick,
  children,
  className = '',
  panelClassName = '',
  panelProps = {},
}) {
  const presentation = variant === 'fullScreenSheet' ? 'sheet' : 'modal'
  return (
    <div
      className={`overlay-layout overlay-layout--${variant} feed-issue-mount-root feed-issue-mount-root--${presentation}${
        className ? ` ${className}` : ''
      }`}
      data-ds-surface="OverlayLayout"
      data-vl-done-surface="OverlayLayout"
      data-testid="feed-issue-mount-root"
      data-overlay-layout="true"
      data-overlay-variant={variant}
      data-presentation={presentation}
    >
      <button
        type="button"
        className="overlay-layout__scrim feed-issue-mount-scrim"
        data-testid="feed-issue-mount-scrim"
        aria-label={scrimLabel}
        onClick={onScrimClick}
      />
      <div
        className={`overlay-layout__panel feed-issue-mount feed-issue-mount--${presentation}${
          panelClassName ? ` ${panelClassName}` : ''
        }`}
        data-testid="feed-issue-mount"
        data-presentation={presentation}
        {...panelProps}
      >
        {children}
      </div>
    </div>
  )
}

/** Map product mount presentation → OverlayLayout variant. */
export function toOverlayLayoutVariant(presentation) {
  return presentation === 'sheet' ? 'fullScreenSheet' : 'centeredDialog'
}
