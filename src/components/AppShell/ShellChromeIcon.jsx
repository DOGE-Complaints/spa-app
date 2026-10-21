import './ShellChromeIcon.css'

/**
 * Theme-safe next-shell chrome glyph — SVG Runtime URL via CSS mask + currentColor.
 * External <img> cannot inherit button/text color on dark; mask reuses CrReactionIcon pattern.
 * NS-07 · data-ns07 markers · no invent per-file black SVG masters.
 */
export function ShellChromeIcon({ src, className, size = 20, title, testId = 'shell-chrome-icon' }) {
  if (!src) return null
  const style = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    width: size,
    height: size,
  }
  return (
    <span
      className={['shell-chrome-icon', className].filter(Boolean).join(' ')}
      style={style}
      role={title ? 'img' : undefined}
      title={title}
      aria-hidden={title ? undefined : 'true'}
      data-testid={testId}
      data-ns07-icon-src={src}
      data-ns07="mask"
    />
  )
}
