/**
 * Shared Button (DS-BTN) — hierarchy × intent × size × state.
 * Spec: docs/UX/design-system-buttons-spec.md §6–§13
 */
import { Link } from 'react-router-dom'
import { DEFAULT_HIERARCHY, DEFAULT_SIZE } from './buttonTypes.js'
import {
  cx,
  isDevEnv,
  normalizeHierarchy,
  normalizeSize,
  resolveLinkRel,
  resolveLinkTarget,
  warnDev,
} from './buttonUtils.js'
import './Button.css'

function ButtonSpinner() {
  return (
    <span className="ds-btn__spinner" aria-hidden="true" data-testid="ds-btn-spinner">
      <span className="ds-btn__spinner-dot" />
    </span>
  )
}

/**
 * @param {{
 *   hierarchy?: import('./buttonTypes.js').ButtonHierarchy
 *   intent?: import('./buttonTypes.js').ButtonIntent
 *   size?: import('./buttonTypes.js').ButtonSize
 *   type?: 'button' | 'submit' | 'reset'
 *   disabled?: boolean
 *   loading?: boolean
 *   fullWidth?: boolean
 *   leadingIcon?: import('react').ReactNode
 *   trailingIcon?: import('react').ReactNode
 *   loadingLabel?: string
 *   href?: string
 *   external?: boolean
 *   target?: string
 *   rel?: string
 *   onClick?: import('react').MouseEventHandler
 *   className?: string
 *   ariaLabel?: string
 *   children?: import('react').ReactNode
 *   [key: string]: unknown
 * }} props
 */
export function Button({
  hierarchy = DEFAULT_HIERARCHY,
  intent,
  size = DEFAULT_SIZE,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  loadingLabel,
  href,
  external = false,
  target,
  rel,
  onClick,
  className,
  ariaLabel,
  children,
  ...rest
}) {
  const resolvedHierarchy = normalizeHierarchy(hierarchy)
  const resolvedSize = normalizeSize(size)
  const isDestructive = intent === 'destructive'
  const isDisabled = Boolean(disabled || loading)
  const isExternal = Boolean(external || intent === 'external')
  const isDev = isDevEnv()

  if (isDev && loading && !ariaLabel && !loadingLabel && (children == null || children === '')) {
    warnDev(isDev, 'Loading button has no accessible label.')
  }
  if (isDev && isExternal && href && !trailingIcon) {
    warnDev(isDev, 'External button has no visible trailing indicator (optional icon recommended).')
  }
  if (isDev && resolvedHierarchy === 'primary' && isDestructive) {
    warnDev(isDev, 'Destructive primary button used — prefer secondary + destructive intent.')
  }
  if (isDev && href && typeof onClick === 'function') {
    warnDev(isDev, 'Button has both href and onClick — confirm navigation intent.')
  }

  const classNames = cx(
    className,
    'ds-btn',
    `ds-btn--${resolvedHierarchy}`,
    `ds-btn--${resolvedSize}`,
    fullWidth && 'ds-btn--full-width',
    isDestructive && 'ds-btn--destructive',
    loading && 'ds-btn--loading',
  )

  const content = (
    <>
      {loading ? <ButtonSpinner /> : null}
      {!loading && leadingIcon ? (
        <span className="ds-btn__icon ds-btn__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="ds-btn__label">{loading && loadingLabel ? loadingLabel : children}</span>
      {!loading && trailingIcon ? (
        <span className="ds-btn__icon ds-btn__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </>
  )

  const sharedProps = {
    className: classNames,
    'data-hierarchy': resolvedHierarchy,
    'data-size': resolvedSize,
    'data-intent': intent || undefined,
    'data-loading': loading ? 'true' : undefined,
    'aria-busy': loading || undefined,
    'aria-disabled': isDisabled || undefined,
    'aria-label': ariaLabel,
    ...rest,
  }

  if (href) {
    const resolvedTarget = resolveLinkTarget({ href, external: isExternal, target })
    const resolvedRel = resolveLinkRel({ href, external: isExternal, target: resolvedTarget, rel })
    const handleClick = (event) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    if (isExternal || /^https?:\/\//i.test(href) || href.startsWith('mailto:')) {
      return (
        <a
          {...sharedProps}
          href={isDisabled ? undefined : href}
          target={resolvedTarget}
          rel={resolvedRel}
          onClick={handleClick}
          role={isDisabled ? 'link' : undefined}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {content}
        </a>
      )
    }

    return (
      <Link
        {...sharedProps}
        to={href}
        onClick={handleClick}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      {...sharedProps}
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
    >
      {content}
    </button>
  )
}
