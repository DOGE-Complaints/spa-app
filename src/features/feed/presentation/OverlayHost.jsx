import { useEffect, useRef } from 'react'

/**
 * DS §2 OverlayHost — open overlay stack owner: Escape dismiss, scroll lock, focus-return.
 * Single top surface for issue mounts (nested pickers remain child concern).
 *
 * On open, captures `document.activeElement` (or `restoreFocusRef.current`) and restores
 * focus to that opener when the host unmounts / closes (FR-VL-07.2).
 *
 * @param {object} props
 * @param {boolean} [props.open]
 * @param {() => void} [props.onDismiss]
 * @param {boolean} [props.lockScroll]
 * @param {import('react').RefObject<HTMLElement|null>} [props.restoreFocusRef]
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props['data-presentation']]
 */
export function OverlayHost({
  open = true,
  onDismiss,
  lockScroll = true,
  restoreFocusRef = null,
  children,
  className = '',
  'data-presentation': dataPresentation,
}) {
  const openerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const explicit = restoreFocusRef?.current
    const active = document.activeElement
    openerRef.current =
      explicit && typeof explicit.focus === 'function'
        ? explicit
        : active instanceof HTMLElement
          ? active
          : null
    return () => {
      const target = openerRef.current
      openerRef.current = null
      if (!target || typeof target.focus !== 'function') return
      if (typeof document.contains === 'function' && !document.contains(target)) return
      try {
        target.focus({ preventScroll: true })
      } catch {
        try {
          target.focus()
        } catch {
          /* ignore detached / non-focusable */
        }
      }
    }
  }, [open, restoreFocusRef])

  useEffect(() => {
    if (!open || !lockScroll) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, lockScroll])

  useEffect(() => {
    if (!open || typeof onDismiss !== 'function') return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onDismiss()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onDismiss])

  if (!open) return null

  return (
    <div
      className={`overlay-host${className ? ` ${className}` : ''}`}
      data-ds-surface="OverlayHost"
      data-vl-done-surface="OverlayHost"
      data-testid="overlay-host"
      data-focus-return="true"
      data-presentation={dataPresentation}
    >
      {children}
    </div>
  )
}
