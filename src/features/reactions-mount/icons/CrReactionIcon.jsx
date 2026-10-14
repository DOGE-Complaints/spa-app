import './CrReactionIcon.css'

/**
 * Theme-safe reaction/chrome icon — SVG Runtime URL via CSS mask + currentColor.
 * External <img> cannot inherit currentColor; mask keeps CR-icon paths unchanged.
 */
export function CrReactionIcon({ src, className, size = 18, title }) {
  if (!src) return null
  const style = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    width: size,
    height: size,
  }
  return (
    <span
      className={['rm-icon', className].filter(Boolean).join(' ')}
      style={style}
      role={title ? 'img' : undefined}
      title={title}
      aria-hidden={title ? undefined : 'true'}
      data-testid="rm-icon"
      data-rm-icon-src={src}
    />
  )
}
