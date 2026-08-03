/**
 * Layout wrapper for related actions (DS-BTN).
 * Spec: docs/UX/design-system-buttons-spec.md §16
 */
import { Children, isValidElement } from 'react'
import { cx, isDevEnv, warnDev } from './buttonUtils.js'
import './ButtonGroup.css'

/**
 * @param {{
 *   orientation?: import('./buttonTypes.js').ButtonGroupOrientation
 *   align?: import('./buttonTypes.js').ButtonGroupAlign
 *   mobileStack?: boolean
 *   className?: string
 *   children?: import('react').ReactNode
 * }} props
 */
export function ButtonGroup({
  orientation = 'horizontal',
  align = 'start',
  mobileStack = false,
  className,
  children,
}) {
  const isDev = isDevEnv()
  if (isDev) {
    let primaryCount = 0
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return
      const hierarchy = child.props?.hierarchy
      if (hierarchy === 'primary') primaryCount += 1
    })
    if (primaryCount > 1) {
      warnDev(
        isDev,
        'ButtonGroup contains multiple primary actions. Confirm that the product defines equal action priority.',
      )
    }
  }

  return (
    <div
      className={cx(
        className,
        'ds-btn-group',
        `ds-btn-group--${orientation}`,
        `ds-btn-group--align-${align}`,
        mobileStack && 'ds-btn-group--mobile-stack',
      )}
      data-orientation={orientation}
      role="group"
    >
      {children}
    </div>
  )
}
