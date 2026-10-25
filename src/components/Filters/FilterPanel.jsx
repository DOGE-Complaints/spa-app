import { useEffect } from 'react'
import './Filters.css'

/**
 * @param {{
 *   open: boolean,
 *   onToggle: () => void,
 *   title: string,
 *   children: import('react').ReactNode,
 *   footer?: import('react').ReactNode,
 *   institutionSlot?: import('react').ReactNode,
 *   dateSlot?: import('react').ReactNode,
 *   geoSlot?: import('react').ReactNode,
 *   extensionSlot?: import('react').ReactNode,
 * }} props
 */
export function FilterPanel({
  open,
  onToggle,
  title,
  children,
  footer,
  institutionSlot,
  dateSlot,
  geoSlot,
  extensionSlot,
}) {
  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    const prevTouch = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.documentElement.setAttribute('data-nf26-body-lock', 'true')
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouch
      document.documentElement.removeAttribute('data-nf26-body-lock')
    }
  }, [open])

  return (
    <div className="board-filter-panel" data-open={open ? 'yes' : 'no'}>
      {/* DS-BTN: filter chip toggle exception (G10 T10) */}
      <button
        type="button"
        className="board-filter-panel-toggle"
        aria-expanded={open}
        aria-controls="board-filter-panel-body"
        onClick={onToggle}
      >
        {title}
      </button>

      {open ? (
        <>
          <div
            className="board-filter-panel-backdrop"
            aria-hidden="true"
            onClick={onToggle}
          />
          <div
            id="board-filter-panel-body"
            className="board-filter-panel-body"
            role="region"
            aria-label={title}
            data-lab-nf25="true"
            data-nf25-harmony="m175"
            data-lab-nf26="true"
            data-nf26-harmony="scroll-lock"
          >
            <div
              className="board-filter-panel-scroll"
              data-lab-nf26-scroll="true"
            >
              <div className="board-filter-panel-primary">{children}</div>
              <div className="board-filter-panel-extension" data-slot="institution">
                {institutionSlot}
              </div>
              <div className="board-filter-panel-extension" data-slot="date">
                {dateSlot}
              </div>
              <div className="board-filter-panel-extension" data-slot="geo">
                {geoSlot ?? extensionSlot}
              </div>
            </div>
            {footer ? <div className="board-filter-panel-footer">{footer}</div> : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
