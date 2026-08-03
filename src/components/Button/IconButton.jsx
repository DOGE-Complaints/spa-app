/**
 * Icon-only control (DS-BTN). `label` is mandatory for a11y.
 * Spec: docs/UX/design-system-buttons-spec.md §14–§15
 */
import { DEFAULT_HIERARCHY, DEFAULT_SIZE } from './buttonTypes.js'
import { cx, isDevEnv, normalizeHierarchy, normalizeSize, warnDev } from './buttonUtils.js'
import './IconButton.css'

function IconSpinner() {
  return (
    <span className="ds-icon-btn__spinner" aria-hidden="true" data-testid="ds-icon-btn-spinner">
      <span className="ds-icon-btn__spinner-dot" />
    </span>
  )
}

/**
 * @param {{
 *   icon: import('react').ReactNode
 *   label: string
 *   hierarchy?: import('./buttonTypes.js').ButtonHierarchy
 *   intent?: import('./buttonTypes.js').ButtonIntent
 *   size?: import('./buttonTypes.js').ButtonSize
 *   type?: 'button' | 'submit' | 'reset'
 *   disabled?: boolean
 *   loading?: boolean
 *   pressed?: boolean
 *   expanded?: boolean
 *   controls?: string
 *   onClick?: import('react').MouseEventHandler
 *   className?: string
 *   [key: string]: unknown
 * }} props
 */
export function IconButton({
  icon,
  label,
  hierarchy = DEFAULT_HIERARCHY,
  intent,
  size = DEFAULT_SIZE,
  type = 'button',
  disabled = false,
  loading = false,
  pressed,
  expanded,
  controls,
  onClick,
  className,
  ...rest
}) {
  const isDev = isDevEnv()
  if (!label) {
    warnDev(isDev, 'IconButton rendered without label.')
  }

  const resolvedHierarchy = normalizeHierarchy(hierarchy)
  const resolvedSize = normalizeSize(size)
  const isDisabled = Boolean(disabled || loading)
  const isDestructive = intent === 'destructive'

  return (
    <button
      type={type}
      className={cx(
        className,
        'ds-icon-btn',
        `ds-icon-btn--${resolvedHierarchy}`,
        `ds-icon-btn--${resolvedSize}`,
        isDestructive && 'ds-icon-btn--destructive',
        loading && 'ds-icon-btn--loading',
      )}
      disabled={isDisabled}
      aria-label={label || undefined}
      aria-busy={loading || undefined}
      aria-pressed={pressed}
      aria-expanded={expanded}
      aria-controls={controls}
      data-hierarchy={resolvedHierarchy}
      data-size={resolvedSize}
      data-intent={intent || undefined}
      data-loading={loading ? 'true' : undefined}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {loading ? <IconSpinner /> : <span className="ds-icon-btn__icon" aria-hidden="true">{icon}</span>}
    </button>
  )
}
