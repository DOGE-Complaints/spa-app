/**
 * Full-width menu row action (DS-BTN).
 * Spec: docs/UX/design-system-buttons-spec.md §17
 */
import { Link } from 'react-router-dom'
import { cx, isDevEnv, resolveLinkRel, resolveLinkTarget, warnDev } from './buttonUtils.js'
import './MenuAction.css'

/**
 * @param {{
 *   icon?: import('react').ReactNode
 *   intent?: 'navigate' | 'action' | 'logout' | 'destructive' | string
 *   href?: string
 *   external?: boolean
 *   disabled?: boolean
 *   onSelect?: () => void
 *   onClick?: import('react').MouseEventHandler
 *   className?: string
 *   children?: import('react').ReactNode
 *   trailing?: import('react').ReactNode
 *   [key: string]: unknown
 * }} props
 */
export function MenuAction({
  icon = null,
  intent = 'action',
  href,
  external = false,
  disabled = false,
  onSelect,
  onClick,
  className,
  children,
  trailing = null,
  ...rest
}) {
  const isDestructive = intent === 'destructive'
  const isDev = isDevEnv()
  if (isDev && !children) {
    warnDev(isDev, 'MenuAction rendered without label children.')
  }

  const classNames = cx(
    className,
    'ds-menu-action',
    isDestructive && 'ds-menu-action--destructive',
    intent === 'logout' && 'ds-menu-action--logout',
  )

  const content = (
    <>
      {icon ? (
        <span className="ds-menu-action__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="ds-menu-action__label">{children}</span>
      {trailing ? <span className="ds-menu-action__trailing">{trailing}</span> : null}
    </>
  )

  const handleActivate = (event) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
    onSelect?.()
  }

  const shared = {
    className: classNames,
    'data-intent': intent,
    'aria-disabled': disabled || undefined,
    ...rest,
  }

  if (href) {
    const resolvedTarget = resolveLinkTarget({ href, external, target: rest.target })
    const resolvedRel = resolveLinkRel({
      href,
      external,
      target: resolvedTarget,
      rel: rest.rel,
    })
    if (external || /^https?:\/\//i.test(href)) {
      return (
        <a
          {...shared}
          href={disabled ? undefined : href}
          target={resolvedTarget}
          rel={resolvedRel}
          onClick={handleActivate}
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
        >
          {content}
        </a>
      )
    }
    return (
      <Link
        {...shared}
        to={href}
        onClick={handleActivate}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      {...shared}
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleActivate}
    >
      {content}
    </button>
  )
}
